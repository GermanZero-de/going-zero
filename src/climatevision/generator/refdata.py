"""Module refdata -- tools to read the reference data used by the generator.

"""

# pyright: strict

import csv
import json
from dataclasses import dataclass
from os import getcwd, path
from typing import Callable, Generic, Iterable, TypeVar

from .years import YEAR_REF_CHOICES

# TODO: Write small wrappers classes for each data source so that we can document
# the columns and get better type checking from pylance.

# The traffic dataset was paid for by GermanZero and therefore can only
# be used when the generator is run by members of GermanZero
PROPRIETARY_DATA_SOURCES = frozenset(["traffic"])

KeyT = TypeVar("KeyT")


@dataclass(kw_only=True)
class MalformedCsv(Exception):
    dataset: str
    row_key: str
    logical_row_number: int
    header_columns: int
    row_columns: int
    data: list[str]

    def __init__(
        self,
        *,
        row_key: str,
        logical_row_number: int,
        header_columns: int,
        row_columns: int,
        dataset: str,
        data: list[str],
    ):
        self.header_columns = header_columns
        self.row_key = row_key
        self.row_columns = row_columns
        self.logical_row_number = logical_row_number
        self.dataset = dataset
        self.data = data

    def __str__(self) -> str:
        return f"Bad data: header row has {self.header_columns} cells, data row has {self.row_columns}\nkey: {self.row_key}\ndata: {self.data}\nlogical row number: {self.logical_row_number}\nWARNING LOGICAL ROW NUMBER MIGHT NOT BE EQUAL TO ACTUAL ROW\n This happens when newlines are in quoted cell data (e.g. assumptions)"


class DataFrame(Generic[KeyT]):
    _rows: dict[KeyT, list[str]]  # the list does NOT contain the reference value
    header: dict[str, int]
    dataset: str
    key_column: str

    @classmethod
    def load(
        cls,
        datadir: str,
        what: str,
        key_column: str,
        key_from_raw: Callable[[str], KeyT],
        filename: str = "2018",
        set_nans_to_0_in_columns: list[str] = [],
    ) -> "DataFrame[KeyT]":
        repo = "proprietary" if what in PROPRIETARY_DATA_SOURCES else "public"
        with open(
            path.join(datadir, repo, what, filename + ".csv"),
            "r",
            encoding="utf-8",
            newline="",
        ) as file:
            reader = csv.reader(file)
            header = {}
            rows = {}
            set_nans_to_0_in_columns_indices = []
            key_column_ndx = 0  # in the original row without the key removed
            for logical_row_number, r in enumerate(reader):
                if logical_row_number == 0:
                    header = {k: ndx for ndx, k in enumerate(r)}
                    key_column_ndx = header[key_column]
                    header = {
                        k: ndx if ndx < key_column_ndx else ndx - 1
                        for k, ndx in header.items()
                        if k != key_column
                    }
                    set_nans_to_0_in_columns_indices = [
                        header[k] for k in set_nans_to_0_in_columns
                    ]
                else:
                    raw_key = r[key_column_ndx]
                    del r[key_column_ndx]
                    # Check that number of columns matches number of columns in header
                    if len(r) != len(header):
                        raise MalformedCsv(
                            header_columns=len(header),
                            row_columns=len(r),
                            logical_row_number=logical_row_number,
                            row_key=raw_key,
                            dataset=what,
                            data=r,
                        )
                    key = key_from_raw(raw_key)
                    rows[key] = r
                    for c in set_nans_to_0_in_columns_indices:
                        if r[c] == "":
                            r[c] = "0"

        res = cls()
        res._rows = rows
        if header is not {}:
            res.header = header
        else:
            assert False, "Loading DataFrame failed. File was empty"
        res.dataset = what
        res.key_column = key_column
        return res

    def rows(self) -> Iterable[tuple[KeyT, list[str]]]:
        return self._rows.items()

    def column_ags(self) -> list[KeyT]:
        """Return list of all ags in dataframe"""
        lst = list(self._rows.keys())
        return lst

    @classmethod
    def load_ags(
        cls,
        datadir: str,
        what: str,
        filename: str = "2018",
        set_nans_to_0_in_columns: list[str] = [],
    ):
        return cls.load(
            datadir=datadir,
            what=what,
            key_column="ags",
            key_from_raw=lambda i: i,  # type: ignore
            filename=filename,
            set_nans_to_0_in_columns=set_nans_to_0_in_columns,
        )

    def get(self, key: KeyT) -> list[str]:
        return self._rows[key]

    def to_dict(self) -> dict[KeyT, dict[str, str]]:
        return {
            key: {k: row[ndx] for k, ndx in self.header.items()}
            for (key, row) in self._rows.items()
        }

    def append_rows(self, rows: dict[KeyT, list[str]]):
        self._rows.update(rows)


def _add_derived_rows_for_summable(df: DataFrame[str]) -> None:
    """Add a bunch of rows by computing the sum over all columns but the first column (which must contain the AGS).
    This is done over for all rows that contain a federal state or administrative district level AGS (by summing
    up the corresponding municipal district level entries).

    If however an entry for the federal state or administrative district level AGS is contained in the
    data, we do NOT override or duplicate it.
    """

    def add_to(d: dict[str, list[float]], ags: str, e: list[str]):
        if ags in d:
            for column, value in enumerate(e):
                d[ags][column] += float(value)
        else:
            d[ags] = [float(x) for x in e]

    sums_by_sta: dict[str, list[float]] = {}
    sums_by_dis: dict[str, list[float]] = {}
    already_in_raw_data: set[str] = set()

    for ags, row in df.rows():
        ags_sta = ags[:2] + "000000"
        ags_dis = ags[:5] + "000"
        if ags == ags_sta or ags == ags_dis:
            # Some rows look like aggregates but are actually in
            # the raw data (and therefore we do not need to
            # compute them (e.g. Berlin)
            # If so remember that we have seen them, so we
            # can delete any potentially created rows later.
            already_in_raw_data.add(ags)
        add_to(sums_by_dis, ags_dis, row)
        add_to(sums_by_sta, ags_sta, row)

    for a in already_in_raw_data:
        if a in sums_by_dis:
            del sums_by_dis[a]
        if a in sums_by_sta:
            del sums_by_sta[a]

    def values_as_strs(d: dict[str, list[float]]):
        return {k: [str(v) for v in r] for (k, r) in d.items()}

    df.append_rows(values_as_strs(sums_by_dis))
    df.append_rows(values_as_strs(sums_by_sta))


@dataclass(kw_only=True)
class LookupFailure(Exception):
    key_column: str
    key_value: object
    dataset: str

    def __init__(self, *, key_column: str, key_value: object, dataset: str):
        self.key_column = key_column
        self.key_value = key_value
        self.dataset = dataset


@dataclass(kw_only=True)
class RowNotFound(Generic[KeyT], LookupFailure):
    def __init__(self, *, key_column: str, key_value: object, df: DataFrame[KeyT]):
        super().__init__(key_column=key_column, key_value=key_value, dataset=df.dataset)


@dataclass(kw_only=True)
class FieldNotPopulated(LookupFailure):
    data_column: str

    def __init__(
        self,
        key_column: str,
        key_value: object,
        data_column: str,
        dataset: str,
    ):
        super().__init__(key_column=key_column, key_value=key_value, dataset=dataset)
        self.data_column = data_column


@dataclass(kw_only=True)
class ExpectedIntGotFloat(LookupFailure):
    data_column: str

    def __init__(
        self,
        key_column: str,
        key_value: object,
        data_column: str,
        dataset: str,
    ):
        super().__init__(key_column=key_column, key_value=key_value, dataset=dataset)
        self.data_column = data_column


@dataclass(kw_only=True)
class Row(Generic[KeyT]):
    def __init__(self, df: DataFrame[KeyT], key_value: KeyT):
        self.key_column = df.key_column
        self.key_value = key_value
        self.dataset = df.dataset
        self.header = df.header
        try:
            self.data = df.get(key_value)
        except:
            raise RowNotFound(key_column=self.key_column, key_value=key_value, df=df)

    def float(self, attr: str) -> float:
        """Access a float attribute."""
        value = self.data[self.header[attr]]
        if value == "":
            raise FieldNotPopulated(
                key_column=self.key_column,
                key_value=self.key_value,
                data_column=attr,
                dataset=self.dataset,
            )
        return float(value)

    def int(self, attr: str) -> int:
        """Access an integer attribute."""
        f = self.float(attr)
        if f.is_integer():
            if isinstance(f, float):  # type: ignore When we monkey patch this for tracing it might actually not be a float
                return int(f)
            else:
                return f
        else:
            raise ExpectedIntGotFloat(
                key_column=self.key_column,
                key_value=self.key_value,
                data_column=attr,
                dataset=self.dataset,
            )

    def str(self, attr: str) -> str:
        """Access a str attribute."""
        return str(self.data[self.header[attr]])

    def __str__(self):
        max_key_length = max((len(k) for k in self.header.keys()))
        return "\n".join(
            (
                k.rjust(max_key_length) + "  " + str(self.data[ndx])
                for (k, ndx) in self.header.items()
            )
        )


@dataclass(kw_only=True)
class OptRow(Generic[KeyT]):
    def __init__(self, df: DataFrame[KeyT], key_value: KeyT):
        try:
            self.row = Row(df, key_value)
        except RowNotFound:
            self.row = None

    def float_or_zero(self, attr: str) -> float:
        """Access a float attribute."""
        if self.row is None:
            return 0.0
        else:
            return self.row.float(attr)

    def __str__(self):
        if self.row is None:
            return "No entry"
        else:
            return self.row.__str__()


@dataclass(kw_only=True)
class FactOrAssumptionCompleteRow:
    label: str
    group: str
    description: str
    value: float
    unit: str
    rationale: str
    reference: str
    link: str

    @classmethod
    def of_row(cls, label: str, row: Row[str]) -> "FactOrAssumptionCompleteRow":
        return cls(
            label=label,
            group=row.str("group"),
            description=row.str("description").strip(),
            value=row.float("value"),
            unit=row.str("unit").strip(),
            rationale=row.str("rationale").strip(),
            reference=row.str("reference").strip(),
            link=row.str("link").strip(),
        )

    @classmethod
    def create_derived(cls, label: str, value: float, other_data: dict[str, str]):
        return cls(
            label=label,
            group=other_data["group"],
            description=other_data["description"].strip(),
            value=value,
            unit=other_data["unit"].strip(),
            rationale=other_data["rationale"].strip(),
            reference=other_data["reference"].strip(),
            link=other_data["link"].strip(),
        )


@dataclass
class NotEqual(Exception):
    label: str
    previous: float
    value: float


@dataclass(kw_only=True)
class Facts:
    _derived_facts: dict[str, FactOrAssumptionCompleteRow]
    _facts: DataFrame[str]

    def __init__(self, facts: DataFrame[str]):
        self._facts = facts
        self._derived_facts = {}

    def fact(self, keyname: str) -> float:
        """Statistics about the past. Must be able to give a source for each fact."""
        df = self._derived_facts.get(keyname)
        if df is not None:
            return df.value
        else:
            return Row(self._facts, keyname).float("value")

    def complete_fact(self, keyname: str) -> FactOrAssumptionCompleteRow:
        df = self._derived_facts.get(keyname)
        if df is not None:
            return df
        else:
            r = Row(self._facts, keyname)
            return FactOrAssumptionCompleteRow.of_row(keyname, r)

    def add_derived_fact(self, label: str, value: float, other_data: dict[str, str]):
        self._derived_facts[label] = FactOrAssumptionCompleteRow.create_derived(
            label, value, other_data
        )


@dataclass(kw_only=True)
class Assumptions:
    _derived_assumptions: dict[str, FactOrAssumptionCompleteRow]
    _assumptions: DataFrame[str]

    def __init__(self, assumptions: DataFrame[str]):
        self._assumptions = assumptions
        self._derived_assumptions = {}

    def complete_ass(self, keyname: str) -> FactOrAssumptionCompleteRow:
        da = self._derived_assumptions.get(keyname)
        if da is not None:
            return da
        else:
            r = Row(self._assumptions, keyname)
            return FactOrAssumptionCompleteRow.of_row(keyname, r)

    def ass(self, keyname: str) -> float:
        """Similar to fact, but these try to describe the future. And are therefore based on various assumptions."""
        da = self._derived_assumptions.get(keyname)
        if da is not None:
            return da.value
        else:
            return Row(self._assumptions, keyname).float("value")

    def add_derived_assumption(
        self, label: str, value: float, other_data: dict[str, str]
    ):
        self._derived_assumptions[label] = FactOrAssumptionCompleteRow.create_derived(
            label, value, other_data
        )


def datadir_or_default(datadir: str | None = None) -> str:
    """Return the normalized absolute path to the data directory."""
    if datadir is None:
        return path.normpath(path.join(getcwd(), "data"))
    else:
        return path.abspath(datadir)


@dataclass(kw_only=True)
class Version:
    """This classes identifies a particular version of the reference data."""

    public: str  # The git hash of the public repository
    proprietary: str  # The git hash of the proprietary repository

    @classmethod
    def load(cls, name: str, datadir: str | None = None) -> "Version":
        fname = path.join(datadir_or_default(datadir), name + ".json")
        with open(fname) as fp:
            d = json.load(fp)
            return cls(public=d["public"], proprietary=d["proprietary"])


def filename(year_ref: int, what: str) -> str:
    """Return the filename of the given data set for the current year_ref."""
    # Most of the time the name is identical to the refyear (e.g. 2018)
    # But sometimes we only got older data and have stored the file accordingly
    # (or similarly couldn't get an update of the data and are using 2018 data
    # for 2021)
    exceptions: dict[int, dict[str, str]] = {
        2018: {
            "ags": "master",  # This is a bit stupid, we should have named that file by year as well.
            "nat_organic_agri": "2016",
            "renewable_energy": "2021",
        },
        2021: {
            "ags": "2021",  # FINISHED
            "area": "2021",  # FINISHED
            "area_kinds": "2021",  # FINISHED
            "assumptions": "2018",  # NO CHANGES - FINISHED
            "buildings": "2021",  # AGS TRANSPLANT 2018 to 2021 FINISHED
            "co2path": "2018",  # NO CHANGES NEEDED (IF CO2 BUDGET STAYS "CONSTANT")
            "destatis": "2021",  # AGS TRANSPLANT 2018 TO 2021 FINISHED
            "facts": "2021",  # FINISHED
            "flats": "2021",  # FROM DESTATIS 2021 - FINISHED
            "industry_facilites": "2021",  # FINISHED
            "nat_agri": "2021",  # FINISHED
            "nat_energy": "2021",  # FINISHED
            "nat_organic_agri": "2020",  # FINISHED
            "nat_res_buildings": "2018",  # WE ARE USING THIS UNCHANGED (ONLY STATES AND NO NEW DATA)
            "population": "2021",  # FINISHED
            "renewable_energy": "2024",  # FINISHED
            "traffic": "2021",  # AGS TRANSPLANT 2018 to 2021 FINISHED
            "traffic_air": "2021",  # AGS TRANSPLANT 2018 to 2021 FINISHED
            "traffic_rail": "2021",  # AGS TRANSPLANT 2018 to 2021 FINISHED
        },
    }
    return exceptions.get(year_ref, {}).get(what, str(year_ref))


def load_data_frame_ags(
    datadir: str, year_ref: int, what: str, set_nans_to_0_in_columns: list[str] = []
) -> DataFrame[str]:
    """Load a data frame for the given data set for the current refyear."""
    return DataFrame.load_ags(  # type: ignore
        datadir,
        what,
        filename=filename(year_ref, what),
        set_nans_to_0_in_columns=set_nans_to_0_in_columns,
    )


def load_data_frame(
    datadir: str,
    year_ref: int,
    what: str,
    key_column: str,
    key_from_raw: Callable[[str], KeyT],
    set_nans_to_0_in_columns: list[str] = [],
) -> DataFrame[KeyT]:
    """Load a data frame for the given data set for the current refyear."""
    return DataFrame.load(  # type: ignore
        datadir,
        what,
        key_column,
        key_from_raw,
        filename=filename(year_ref, what),
        set_nans_to_0_in_columns=set_nans_to_0_in_columns,
    )


@dataclass(kw_only=True)
class RefData:
    """This class gives you a single handle around all the reference data."""

    _ags_master: dict[str, str]
    _area: DataFrame[str]
    _area_kinds: DataFrame[str]
    _assumptions: Assumptions
    _buildings: DataFrame[str]
    _co2path: DataFrame[int]
    _destatis: DataFrame[str]
    _facts: Facts
    _flats: DataFrame[str]
    _nat_agri: DataFrame[str]
    _nat_organic_agri: DataFrame[str]
    _nat_energy: DataFrame[str]
    _nat_res_buildings: DataFrame[str]
    _population: DataFrame[str]
    _renewable_energy: DataFrame[str]
    _traffic: DataFrame[str]
    _traffic_air: DataFrame[str]
    _traffic_ships: DataFrame[str]
    _industry_dehst: DataFrame[str]
    _year_ref: int

    def __init__(
        self,
        *,
        year_ref: int,
        ags_master: DataFrame[str],
        area: DataFrame[str],
        area_kinds: DataFrame[str],
        assumptions: DataFrame[str],
        buildings: DataFrame[str],
        co2path: DataFrame[int],
        destatis: DataFrame[str],
        facts: DataFrame[str],
        flats: DataFrame[str],
        nat_agri: DataFrame[str],
        nat_organic_agri: DataFrame[str],
        nat_energy: DataFrame[str],
        nat_res_buildings: DataFrame[str],
        population: DataFrame[str],
        renewable_energy: DataFrame[str],
        traffic: DataFrame[str],
        traffic_air: DataFrame[str],
        traffic_ships: DataFrame[str],
        industry_dehst: DataFrame[str],
        fix_missing_entries: bool,
    ):
        self._area = area
        self._ags_master = {  # type: ignore
            k: r["description"] for (k, r) in ags_master.to_dict().items()
        }
        self._area_kinds = area_kinds
        self._facts = Facts(facts)
        self._assumptions = Assumptions(assumptions)
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
        self._traffic_air = traffic_air
        self._traffic_ships = traffic_ships
        self._industry_dehst = industry_dehst
        self._year_ref = year_ref

        if fix_missing_entries:
            self._fix_missing_gemfr_ags()
            self._fix_add_derived_rows_for_renewables()
            self._fix_add_derived_rows_for_traffic()
            self._fix_add_derived_rows_for_industry_dehst()

    def _fix_missing_gemfr_ags(self):
        all_gemfr: set[str] = set()
        for k, v in self._ags_master.items():
            if (
                v.find("gemfr. Geb") != -1
                or v.find("gemeindefreies Gebiet") != -1
                or v.find("gemfr.Geb.") != -1
            ):
                all_gemfr.add(k)

        def add_zero_rows(df: DataFrame[str]):
            num_columns = len(df.header)
            missing_ags = all_gemfr - frozenset(df.to_dict().keys())
            new_rows = {ags: ["0"] * num_columns for ags in missing_ags}
            df.append_rows(new_rows)

        # Some gemeindefreie Communes are not listed in the buildings list.
        # Gemeindefreie Communes are usueally forests ore lakes and do not have any
        # (they may have some, but we are going to ignore that) buildings.
        # Therefore we just add them with 0 to the buildings list.
        add_zero_rows(self._buildings)
        # Similar logic to renewable installations. If they are not listed in the
        # reference data they are probably unlikely to actually have anything.
        # which seems like a big pity.
        add_zero_rows(self._renewable_energy)

    def _fix_add_derived_rows_for_renewables(self):
        _add_derived_rows_for_summable(self._renewable_energy)

    def _fix_add_derived_rows_for_traffic(self):
        _add_derived_rows_for_summable(self._traffic)

    def _fix_add_derived_rows_for_industry_dehst(self):
        _add_derived_rows_for_summable(self._industry_dehst)

    def year_ref(self) -> int:
        """Returns the reference year for the reference data.
        Note individual data sets might sometimes use a slightly different
        year (e.g. for 2018 we use 2016 nat_organic_agri as that is the best
        available data for that year).
        """
        return self._year_ref

    def ags_master(self) -> dict[str, str]:
        """Returns the complete dictionary of AGS, where no big
        changes have happened to the relevant commune. Key is AGS value is description
        """
        return self._ags_master

    def facts(self) -> Facts:
        return self._facts

    def assumptions(self) -> Assumptions:
        return self._assumptions

    def fact(self, keyname: str) -> float:
        return self._facts.fact(keyname)

    def ass(self, keyname: str) -> float:
        return self._assumptions.ass(keyname)

    def area(self, ags: str):
        """How many hectare of land are used for what (e.g. farmland, traffic, ...) in each community / administrative district and federal state."""
        return Row(self._area, ags)

    def area_kinds(self, ags: str):
        return Row(self._area_kinds, ags)

    def buildings(self, ags: str):
        """Number of flats. Number of buildings of different age brackets. Connections to heatnet."""
        return Row(self._buildings, ags)

    def co2path(self, year: int):
        return Row(self._co2path, year)

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

    def industry_dehst(self, ags: str):
        """Function to read CO2e for each ags from DEHST Table."""
        return OptRow(self._industry_dehst, ags)

    def traffic_air(self, ags: str):
        return Row(self._traffic_air, ags)

    def traffic_ships(self, ags: str):
        return Row(self._traffic_ships, ags)

    def get_df_traffic_ships(self):
        return self._traffic_ships

    def get_df_traffic_air(self):
        return self._traffic_air

    @classmethod
    def load(
        cls,
        year_ref: int,
        datadir: str | None = None,
        *,
        fix_missing_entries: bool = True,
    ) -> "RefData":
        """Load all the reference data into memory.  This assumes that the working directory has a subdirectory
        called 'data' that contains the reference data in two subfolders one called 'public' and the other
        'proprietary'.

        If your data directory is somewhere else provide the full path to it.

        TODO: Provide a way to run this even when no proprietary data is available. As of right now unnecessary
        as we can't yet run the generator without the data.
        """

        assert year_ref in YEAR_REF_CHOICES

        datadir = datadir_or_default(datadir)

        area_0_columns = (
            [
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
            ]
            if fix_missing_entries
            else []
        )
        flats_0_columns = (
            [
                "residential_buildings_total",
                "buildings_1flat",
                "buildings_2flats",
                "buildings_3flats",
                "buildings_dorms",
                "residential_buildings_area_total",
            ]
            if fix_missing_entries
            else []
        )
        population_0_columns = ["total"] if fix_missing_entries else []
        d = cls(
            year_ref=year_ref,
            ags_master=DataFrame.load_ags(datadir, "ags", filename=filename(year_ref, "ags")),  # type: ignore
            area=load_data_frame_ags(
                datadir, year_ref, "area", set_nans_to_0_in_columns=area_0_columns
            ),
            area_kinds=load_data_frame_ags(datadir, year_ref, "area_kinds"),
            assumptions=load_data_frame(
                datadir,
                year_ref,
                "assumptions",
                key_column="label",
                key_from_raw=lambda k: k,
            ),
            buildings=load_data_frame_ags(datadir, year_ref, "buildings"),
            co2path=load_data_frame(
                datadir, year_ref, "co2path", key_column="year", key_from_raw=int
            ),
            destatis=load_data_frame_ags(datadir, year_ref, "destatis"),
            facts=load_data_frame(
                datadir,
                year_ref,
                "facts",
                key_column="label",
                key_from_raw=lambda k: k,
            ),
            flats=load_data_frame_ags(
                datadir, year_ref, "flats", set_nans_to_0_in_columns=flats_0_columns
            ),
            nat_agri=load_data_frame_ags(datadir, year_ref, "nat_agri"),
            nat_organic_agri=load_data_frame_ags(datadir, year_ref, "nat_organic_agri"),
            nat_energy=load_data_frame_ags(datadir, year_ref, "nat_energy"),
            nat_res_buildings=load_data_frame_ags(
                datadir, year_ref, "nat_res_buildings"
            ),
            population=load_data_frame_ags(
                datadir,
                year_ref,
                "population",
                set_nans_to_0_in_columns=population_0_columns,
            ),
            renewable_energy=load_data_frame_ags(datadir, year_ref, "renewable_energy"),
            traffic=load_data_frame_ags(datadir, year_ref, "traffic"),
            traffic_air=load_data_frame_ags(datadir, 2018, "traffic_air"),
            traffic_ships=load_data_frame_ags(datadir, 2018, "traffic_ships"),
            industry_dehst=load_data_frame_ags(datadir, year_ref, "industry_facilites"),
            fix_missing_entries=fix_missing_entries,
        )
        from . import calculate_derived_assumptions, calculate_derived_facts

        calculate_derived_facts.calculate_derived_facts(d)
        calculate_derived_assumptions.calculate_derived_assumptions(d)
        return d
