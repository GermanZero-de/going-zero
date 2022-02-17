"""Module refdata -- tools to read the reference data used by the generator.

"""
from dataclasses import dataclass
import os
import json
import sys
import math
import pandas as pd
from typing import Any, Sequence

# TODO: Write small wrappers classes for each data source so that we can document
# the columns and get better type checking from pylance.

# The traffic dataset was paid for by GermanZero and therefore can only
# be used when the generator is run by members of GermanZero
PROPRIETARY_DATA_SOURCES = frozenset(["traffic"])


def _load(datadir: str, what: str, filename: str = "2018") -> pd.DataFrame:
    repo = "proprietary" if what in PROPRIETARY_DATA_SOURCES else "public"
    res = pd.read_csv(
        os.path.join(datadir, repo, what, filename + ".csv"), dtype={"ags": "str"}
    )
    # Remember the source name for debugging
    setattr(res, "refdata_dataset", what)
    return res  # type: ignore


def set_nans_to_0(data: pd.DataFrame, *, columns):
    for c in columns:
        data[c] = data[c].fillna(0)


def get_dataset(df: pd.DataFrame) -> str:
    return getattr(df, "refdata_dataset", "BUG-IN-DATAREF")


def append_rows(df: pd.DataFrame, rows: Sequence[list[Any]]) -> pd.DataFrame:
    res = pd.concat(
        [df, pd.DataFrame(data=rows, columns=df.columns)], ignore_index=True
    )
    try:
        # Keep the source name for debugging
        setattr(res, "refdata_dataset", getattr(df, "refdata_dataset"))
    except:
        pass
    return res


@dataclass
class LookupFailure(Exception):
    key_column: str
    key_value: object
    dataset: str

    def __init__(self, *, key_column: str, key_value, dataset: str):
        self.key_column = key_column
        self.key_value = key_value
        self.dataset = dataset


@dataclass
class RowNotFound(LookupFailure):
    def __init__(self, *, key_column, key_value, df: pd.DataFrame):
        super().__init__(
            key_column=key_column, key_value=key_value, dataset=get_dataset(df)
        )


@dataclass
class FieldNotPopulated(LookupFailure):
    data_column: str

    def __init__(
        self,
        key_column: str,
        key_value,
        data_column: str,
        dataset: str,
    ):
        super().__init__(key_column=key_column, key_value=key_value, dataset=dataset)
        self.data_column = data_column


@dataclass
class ExpectedIntGotFloat(LookupFailure):
    data_column: str

    def __init__(
        self,
        key_column: str,
        key_value,
        data_column: str,
        dataset: str,
    ):
        super().__init__(key_column=key_column, key_value=key_value, dataset=dataset)
        self.data_column = data_column


class Row:
    def __init__(self, df: pd.DataFrame, key_value, *, key_column="ags"):
        self.key_column = key_column
        self.key_value = key_value
        self.dataset = get_dataset(df)
        try:
            # Basically this reduces the dataframe to a single row dataframe
            # and then takes the only dataframe row (a series object)
            # TODO: When we have time figure out what the actually best way
            # to go about all this is. Maybe we should consider dropping
            # pandas as a requirement? I mean all we do is load a few csvs
            # and extract a very small number of rows. pandas is total overkill
            # in particular when we are publishing a package for others to use
            # it's nice to have a small list of dependencies
            self.series = df[df[key_column] == key_value].iloc[0]  # type: ignore
        except:
            raise RowNotFound(key_column=key_column, key_value=key_value, df=df)

    def float(self, attr: str) -> float:
        """Access a float attribute."""
        f = float(self.series[attr])
        if math.isnan(f):
            raise FieldNotPopulated(
                key_column=self.key_column,
                key_value=self.key_value,
                data_column=attr,
                dataset=self.dataset,
            )
        return f

    def int(self, attr: str) -> int:
        """Access an integer attribute."""
        f = self.float(attr)
        if f.is_integer():
            return int(f)
        else:
            raise ExpectedIntGotFloat(
                key_column=self.key_column,
                key_value=self.key_value,
                data_column=attr,
                dataset=self.dataset,
            )

    def str(self, attr: str) -> str:
        """Access a str attribute."""
        return str(self.series[attr])

    def __str__(self):
        return self.series.to_string()


class FactsAndAssumptions:
    def __init__(self, facts: pd.DataFrame, assumptions: pd.DataFrame):
        self._facts = facts
        self._assumptions = assumptions

    def fact(self, keyname: str) -> float:
        """Statistics about the past. Must be able to give a source for each fact."""
        # TODO: Kill the exception handler
        try:
            value = float(self._facts[self._facts["label"] == keyname]["value"])  # type: ignore
            return value

        except:
            print("could not find " + keyname, file=sys.stderr)
            return 1.0

    def ass(self, keyname: str) -> float:
        """Similar to fact, but these try to describe the future. And are therefore based on various assumptions."""
        # TODO: Kill the exception handler
        try:
            value = float(self._assumptions[self._assumptions["label"] == keyname]["value"])  # type: ignore
            return value

        except:
            print("could not find " + keyname, file=sys.stderr)
            return 1.0


def datadir_or_default(datadir: str | None = None) -> str:
    """Return the normalized absolute path to the data directory."""
    if datadir is None:
        return os.path.normpath(os.path.join(os.getcwd(), "data"))
    else:
        return os.path.abspath(datadir)


def _add_derived_rows_for_summable(df: pd.DataFrame) -> pd.DataFrame:
    """Add a bunch of rows by computing the sum over all columns but the first column (which must contain the AGS).
    This is done over for all rows that contain a federal state or administrative district level AGS (by summing
    up the corresponding municipal district level entries).

    If however an entry for the federal state or administrative district level AGS is contained in the
    data, we do NOT override or duplicate it.
    """
    # Note that this implementation does not make use of all the good stuff in pandas.
    # Why? Because I still suspect that all in we are better of if we get rid of the
    # pandas requirement -- we are not actually using it inside the generator.
    def add_to(d, ags, e):
        if ags in d:
            for column in range(1, len(e)):
                d[ags][column] += e[column]
        else:
            d[ags] = e
        d[ags][0] = ags

    sums_by_sta = {}
    sums_by_dis = {}
    already_in_raw_data = set()

    for e in df.values.tolist():
        ags = e[0]
        ags_sta = ags[:2] + "000000"
        ags_dis = ags[:5] + "000"
        if ags == ags_sta or ags == ags_dis:
            # Some rows look like aggregates but are actually in
            # the raw data (and therefore we do not need to
            # compute them (e.g. Berlin)
            # If so remember that we have seen them, so we
            # can delete any potentially created rows later.
            already_in_raw_data.add(ags)
        add_to(sums_by_dis, ags_dis, e)
        add_to(sums_by_sta, ags_sta, e)

    for a in already_in_raw_data:
        if a in sums_by_dis:
            del sums_by_dis[a]
        if a in sums_by_sta:
            del sums_by_sta[a]

    additional_rows = list(sums_by_dis.values()) + list(sums_by_sta.values())
    return append_rows(df, additional_rows)


@dataclass
class Version:
    """This classes identifies a particular version of the reference data."""

    public: str  # The git hash of the public repository
    proprietary: str  # The git hash of the proprietary repository

    @classmethod
    def load(cls, name: str, datadir: str | None = None) -> "Version":
        fname = os.path.join(datadir_or_default(datadir), name + ".json")
        with open(fname) as fp:
            d = json.load(fp)
            return cls(public=d["public"], proprietary=d["proprietary"])


class RefData:
    """This class gives you a single handle around all the reference data."""

    def __init__(
        self,
        *,
        ags_master: pd.DataFrame,
        area: pd.DataFrame,
        area_kinds: pd.DataFrame,
        assumptions: pd.DataFrame,
        buildings: pd.DataFrame,
        co2path: pd.DataFrame,
        destatis: pd.DataFrame,
        facts: pd.DataFrame,
        flats: pd.DataFrame,
        nat_agri: pd.DataFrame,
        nat_organic_agri: pd.DataFrame,
        nat_energy: pd.DataFrame,
        nat_res_buildings: pd.DataFrame,
        population: pd.DataFrame,
        renewable_energy: pd.DataFrame,
        traffic: pd.DataFrame,
        fix_missing_entries: bool,
    ):
        self._area = area
        self._ags_master = ags_master.set_index(keys="ags").to_dict()["description"]
        self._area_kinds = area_kinds
        self._facts_and_assumptions = FactsAndAssumptions(facts, assumptions)
        self._buildings = buildings
        self._co2path = co2path
        self._destatis = destatis
        self._flats = flats
        self._nat_agri = nat_agri
        self._nat_organic_agri = nat_organic_agri
        self._nat_energy = nat_energy
        self._nat_res_buildings = nat_res_buildings
        self._population = population
        self._renewable_energy = renewable_energy
        self._traffic = traffic

        if fix_missing_entries:
            self._fix_missing_entries_in_area()
            self._fix_missing_entries_in_flats()
            self._fix_missing_entries_in_population()
            self._fix_missing_gemfr_ags()
            self._fix_add_derived_rows_for_renewables()
            self._fix_add_derived_rows_for_traffic()

    def _fix_missing_gemfr_ags(self):
        all_gemfr = []
        for (k, v) in self._ags_master.items():
            if (
                v.find("gemfr. Geb") != -1
                or v.find("gemeindefreies Gebiet") != -1
                or v.find("gemfr.Geb.") != -1
            ):
                all_gemfr.append(k)

        def add_zero_rows(df: pd.DataFrame):
            num_columns = len(df.columns)
            missing_ags = [ags for ags in all_gemfr if not df["ags"].isin([ags]).any()]
            new_rows = map(lambda ags: [ags] + [0] * (num_columns - 1), missing_ags)
            return append_rows(df, list(new_rows))

        # Some gemeindefreie Communes are not listed in the buildings list.
        # Gemeindefreie Communes are usueally forests ore lakes and do not have any
        # (they may have some, but we are going to ignore that) buildings.
        # Therefore we just add them with 0 to the buildings list.
        self._buildings = add_zero_rows(self._buildings)
        self._renewable_energy = add_zero_rows(self._renewable_energy)

    def _fix_missing_entries_in_area(self):
        """Here we assume that the missing entries in the area sheet should actually be 0."""
        set_nans_to_0(
            self._area,
            columns=[
                "land_settlement",
                "land_traffic",
                "veg_forrest",
                "veg_agri",
                "veg_wood",
                "veg_heath",
                "veg_moor",
                "veg_marsh",
                "veg_plant_uncover_com",
                "settlement_ghd",
                "water_total",
            ],
        )

    def _fix_missing_entries_in_flats(self):
        set_nans_to_0(
            self._flats,
            columns=[
                "residential_buildings_total",
                "buildings_1flat",
                "buildings_2flats",
                "buildings_3flats",
                "buildings_dorms",
                "residential_buildings_area_total",
            ],
        )

    def _fix_missing_entries_in_population(self):
        set_nans_to_0(self._population, columns=["total"])

    def _fix_add_derived_rows_for_renewables(self):
        self._renewable_energy = _add_derived_rows_for_summable(self._renewable_energy)

    def _fix_add_derived_rows_for_traffic(self):
        self._traffic = _add_derived_rows_for_summable(self._traffic)

    def ags_master(self) -> dict[str, str]:
        """Returns the complete dictionary of AGS, where no big
        changes have happened to the relevant commune. Key is AGS value is description"""
        return self._ags_master

    def facts_and_assumptions(self) -> FactsAndAssumptions:
        return self._facts_and_assumptions

    def fact(self, keyname: str) -> float:
        return self._facts_and_assumptions.fact(keyname)

    def ass(self, keyname: str) -> float:
        return self._facts_and_assumptions.ass(keyname)

    def area(self, ags: str):
        """How many hectare of land are used for what (e.g. farmland, traffic, ...) in each community / administrative district and federal state."""
        return Row(self._area, ags)

    def area_kinds(self, ags: str):
        return Row(self._area_kinds, ags)

    def buildings(self, ags: str):
        """Number of flats. Number of buildings of different age brackets. Connections to heatnet."""
        return Row(self._buildings, ags)

    def co2path(self, year: int):
        return Row(self._co2path, year, key_column="year")

    def destatis(self, ags: str):
        """TODO"""
        return Row(self._destatis, ags)

    def flats(self, ags: str):
        """TODO"""
        return Row(self._flats, ags)

    def nat_agri(self, ags: str):
        """TODO"""
        return Row(self._nat_agri, ags)

    def nat_organic_agri(self, ags: str):
        """TODO"""
        return Row(self._nat_organic_agri, ags)

    def nat_energy(self, ags: str):
        """TODO"""
        return Row(self._nat_energy, ags)

    def nat_res_buildings(self, ags: str):
        """TODO"""
        return Row(self._nat_res_buildings, ags)

    def population(self, ags: str):
        """How many residents live in each commmunity / administrative district and federal state."""
        return Row(self._population, ags)

    def renewable_energy(self, ags: str):
        """TODO"""
        return Row(self._renewable_energy, ags)

    def traffic(self, ags: str):
        """TODO"""
        return Row(self._traffic, ags)

    @classmethod
    def load(cls, datadir: str | None = None, *, fix_missing_entries=True) -> "RefData":
        """Load all the reference data into memory.  This assumes that the working directory has a subdirectory
        called 'data' that contains the reference data in two subfolders one called 'public' and the other
        'proprietary'.

        If your data directory is somewhere else provide the full path to it.

        TODO: Provide a way to run this even when no proprietary data is available. As of right now unnecessary
        as we can't yet run the generator without the data.
        """
        datadir = datadir_or_default(datadir)
        d = cls(
            ags_master=_load(datadir, "ags", filename="master"),
            area=_load(datadir, "area"),
            area_kinds=_load(datadir, "area_kinds"),
            assumptions=_load(datadir, "assumptions"),
            buildings=_load(datadir, "buildings"),
            co2path=_load(datadir, "co2path"),
            destatis=_load(datadir, "destatis"),
            facts=_load(datadir, "facts"),
            flats=_load(datadir, "flats"),
            nat_agri=_load(datadir, "nat_agri"),
            nat_organic_agri=_load(datadir, "nat_organic_agri", filename="2016"),
            nat_energy=_load(datadir, "nat_energy"),
            nat_res_buildings=_load(datadir, "nat_res_buildings"),
            population=_load(datadir, "population"),
            renewable_energy=_load(datadir, "renewable_energy"),
            traffic=_load(datadir, "traffic"),
            fix_missing_entries=fix_missing_entries,
        )
        return d
