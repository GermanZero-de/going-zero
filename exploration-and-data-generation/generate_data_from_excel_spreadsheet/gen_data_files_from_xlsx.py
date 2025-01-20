#!/usr/bin/env python

"""
This is the script that was used to convert the excel spreadsheets data sheets into csv files.

There is no need to keep this code up to date. The file is checked into the repository, primarily
as documentation of how the data was initially populated.
"""

import sys
import pandas as pd
import os
import datetime


def do_not_keep_upper(s: str) -> bool:
    for c in s:
        if c.isupper():
            return False
    return True


def remove_rows_with_na(d: pd.DataFrame, *, column) -> None:
    d.drop(d[d[column].isna()].index, inplace=True)  # type: ignore


def remove_rows_with(d: pd.DataFrame, *, column: str, eq) -> None:
    d.drop(d[d[column] == eq].index, inplace=True)  # type: ignore


def replace_value(d: pd.DataFrame, *, column: str, pattern, replacement) -> None:
    d.where(d[column] != pattern, other=replacement, inplace=True)


def convert_population(xls: pd.ExcelFile) -> pd.DataFrame:
    population = pd.read_excel(
        xls,  # type: ignore
        dtype={"ags": "str"},
        sheet_name="Einwohner",
        skiprows=5,
        usecols=["8-stellige AGS", "Insgesamt"],
        na_values=["-"],
    )
    population.rename(
        columns={"8-stellige AGS": "ags", "Insgesamt": "total"}, inplace=True
    )
    remove_rows_with_na(population, column="ags")
    remove_rows_with(population, column="ags", eq=False)
    population.set_index(keys="ags", inplace=True, verify_integrity=True)
    return population


def convert_area(xls: pd.ExcelFile) -> pd.DataFrame:
    area = pd.read_excel(
        xls,  # type: ignore
        sheet_name="Flächen",
        skiprows=8,
        header=None,
        usecols="C:E,G:N,W,AG",
        dtype={"ags": "str"},
        names=[
            "land_total",  # land_ges
            "land_settlement",
            "land_traffic",
            # 'veg_total',
            "veg_agri",
            "veg_forrest",
            "veg_wood",
            "veg_heath",
            "veg_moor",
            "veg_marsh",
            "veg_plant_uncover_com",
            "water_total",  # water_ges
            # 'water_river',
            # 'water_harbour',
            # 'water_standing',
            # 'water_ocean',
            # 'land_total2',
            # 'settlement_total',
            # 'settlement_residential',
            # 'settlement_industry_ges',
            "settlement_ghd",
            # 'settlement_heap',
            # 'settlement_mining', 'settlement_pit', 'settlement_mixeduse', 'settlement_specialfunc',
            # 'settlement_recreation_total', 'settlement_recreation_green', 'settlement_cemetery',
            "ags",
        ],
        na_values=["-"],
    )
    remove_rows_with_na(area, column="ags")
    remove_rows_with(area, column="ags", eq="False")
    area.set_index(keys="ags", inplace=True, verify_integrity=True)
    return area


def convert_flats(xls: pd.ExcelFile) -> pd.DataFrame:
    flats = pd.read_excel(
        xls,  # type: ignore
        sheet_name="Wohnungen",
        skiprows=7,
        header=None,
        usecols="C:H,S",
        dtype={"ags": "str"},
        names=[
            "residential_buildings_total",
            "buildings_1flat",
            "buildings_2flats",
            "buildings_3flats",
            "buildings_dorms",
            "residential_buildings_area_total",
            "ags",
        ],
    )
    remove_rows_with_na(flats, column="ags")
    remove_rows_with(flats, column="ags", eq="False")
    flats.set_index(keys="ags", inplace=True, verify_integrity=True)
    return flats


def convert_area_kinds(xls: pd.ExcelFile) -> pd.DataFrame:
    area_kinds = pd.read_excel(
        xls,  # type: ignore
        dtype={"ags": "str"},
        sheet_name="Raumtypen",
        usecols="I:J,L",
        names=["rt7", "rt3", "ags"],
    )
    remove_rows_with_na(area_kinds, column="ags")
    area_kinds.set_index(keys="ags", inplace=True, verify_integrity=True)
    return area_kinds


def convert_renewable_energy(xls: pd.ExcelFile) -> pd.DataFrame:
    renewable_energy = pd.read_excel(
        xls,  # type: ignore
        sheet_name="EE-Anlagen",
        skiprows=2,
        header=None,
        usecols="D:E,I:M",
        dtype={"ags": "str"},
        names=["ags", "ort", "pv", "wind_on", "biomass", "geothermal", "water"],
    )
    # there are a bunch of rows that contain computed data. We don't want those in our data layer
    renewable_energy.drop(
        renewable_energy[renewable_energy["ort"].isna()].index, inplace=True
    )
    renewable_energy.drop("ort", axis=1, inplace=True)

    renewable_energy.set_index(keys="ags", inplace=True, verify_integrity=True)
    return renewable_energy


def convert_buildings(xls: pd.ExcelFile) -> pd.DataFrame:
    # Todo: update names and drop unwanted columns
    buildings = pd.read_excel(
        xls,  # type: ignore
        sheet_name="Gebäudezensus",
        skiprows=8,
        usecols="A,I:S,U,AA:AK,AM",
        dtype={"ags": "str"},
        names=[
            "ags",
            # 'total',
            # 'Wohngebäude',
            # 'Wohngebäude (ohne Wohnheime)',
            # 'Wohnheime',
            # 'Sonstige Gebäude mit Wohnraum',
            "buildings_total",  # Gebäude ges
            "buildings_until_1919",  # 'Gebäude vor 1919',
            "buildings_1919_1948",  # 'Gebäude 1919-1948',
            "buildings_1949_1978",  # 'Gebäude 1949-1978',
            "buildings_1979_1986",  # 'Gebäude 1979-1986',
            "buildings_1987_1990",  # 'Gebäude 1987-1990',
            "buildings_1991_1995",  # 'Gebäude 1991-1995',
            "buildings_1996_2000",  # 'Gebäude 1996-2000',
            "buildings_2001_2004",  # 'Gebäude 2001-2004',
            "buildings_2005_2008",  # 'Gebäude 2005-2008',
            "buildings_2009_2011",  # 'Gebäude 2009 und später',
            # 'Gebäude ges',
            "buildings_heatnet",
            # 'Gebäude Etagenheizung',
            # 'Gebäude Blockheizung',
            # 'Gebäude Zentralheizung',
            # 'Gebäude Einzel- oder Mehrraumöfen (auch Nachtspeicher)',
            # 'Gebäude Keine Heizung im Gebäude oder in den Wohnungen',
            "flats_total",  # 'Wohnungen ges',
            "flats_until_1919",
            "flats_1919_1948",
            "flats_1949_1978",
            "flats_1979_1986",
            "flats_1987_1990",
            "flats_1991_1995",
            "flats_1996_2000",
            "flats_2001_2004",
            "flats_2005_2008",
            "flats_2009_today",
            # 'Wohnungen ges',
            "flats_heatnet",  # 'Wohnungen Fernheizung',
            # 'Wohnungen Etagenheizung',
            # 'Wohnungen Blockheizung',
            # 'Wohnungen Zentralheizung',
            # 'Wohnungen Einzel- oder Mehrraumöfen (auch Nachtspeicher)',
            # 'Wohnungen Keine Heizung im Gebäude oder in den Wohnungen',
            # 'Wohnungen ges',
            # 'Wohnungen unter 40',
            # 'Wohnungen 40 - 59',
            # 'Wohnungen 60 - 79',
            # 'Wohnungen 80 - 99',
            # 'Wohnungen 100 - 119',
            # 'Wohnungen 120 - 139',
            # 'Wohnungen 140 - 159',
            # 'Wohnungen 160 - 179',
            # 'Wohnungen 180 - 199',
            # 'Wohnungen 200 und mehr'
        ],
    )

    buildings.set_index(keys="ags", inplace=True, verify_integrity=True)
    return buildings


def convert_traffic(xls: pd.ExcelFile) -> pd.DataFrame:
    traffic = pd.read_excel(
        xls,  # type: ignore
        sheet_name="Verkehr_Verkehrsleistung",
        skiprows=1,
        usecols="B,F:K,M:P",
        dtype={"ags": "str"},
        names=[
            "ags",
            "car_it_at",
            "car_ab",
            "ldt_it_at",
            "ldt_ab",
            "mhd_it_at",
            "mhd_ab",
            "rail_ppl_elec",  # 'Personen Elektro',
            "rail_ppl_diesel",  # 'Personen Diesel',
            "gds_elec",  # 'Güter Elektro',
            "gds_diesel",  # 'Güter Diesel'])
        ],
    )

    traffic.set_index(keys="ags", inplace=True, verify_integrity=True)
    return traffic


def convert_nat_res_buildings(xls: pd.ExcelFile) -> pd.DataFrame:
    nat_res_buildings = pd.read_excel(
        xls,  # type: ignore
        sheet_name="kommWohn",
        skiprows=2,
        usecols="B,G",
        dtype={"ags": "str"},
        names=["ags", "communal"],
    )

    nat_res_buildings.set_index(keys="ags", inplace=True, verify_integrity=True)
    return nat_res_buildings


def convert_nat_energy(xls: pd.ExcelFile) -> pd.DataFrame:
    nat_energy = pd.read_excel(
        xls,  # type: ignore
        sheet_name="StromBL",
        skiprows=5,
        usecols="B,I,K,W,X,Y,AB",
        dtype={"ags": "str"},
        names=[
            "ags",
            # 'onshore_2018',
            # 'onshore_2030',
            # 'onshore_2018_percent',
            # 'onshore_2030_percent',
            # 'target_percent',
            "demand_2018",
            "PV_average_flh",  #
            # 'biogas_potential',
            # 'energy_from_Biogas',
            # 'biogas_installed_capacity_2018',
            # 'onshore_energy_fec_2017',
            # 'onshore_potential_fec',
            # 'onshore_potential_capacity',
            # 'onshore_installed_capacity_2020',
            # 'offshore_potential_fec',
            # 'PV_installed_capacity_2018',
            # 'PV_fec_2018',
            "PV_roof_2017",  # W
            "PV_land_2017",  # X
            "PV_others",  # Y
            # 'biomass_installed_capacity_2018',
            # 'biomass_flh_2015',
            "bioenergy_potential",  # AB
            # 'energy_from_bioenergy',
            # 'bioenergy_installable_capacity',  = Potential_strom_aus_bioenergy(bionergy_potential * 1000/3.6* Ass_E_P_BHKW_efficiency_electric) /Fact_E_P_biomass_full_load_hours
            # 'geothermal_potential',
            # 'geothermal_potential_8000_flh'
        ],
    )

    remove_rows_with_na(nat_energy, column="ags")
    nat_energy.set_index(keys="ags", inplace=True, verify_integrity=True)
    return nat_energy


def convert_nat_organic_agri(xls: pd.ExcelFile) -> pd.DataFrame:
    agri = pd.read_excel(
        xls,  # type: ignore
        sheet_name="LandwirtschaftBL",
        skiprows=9,
        header=None,
        usecols="B,CF,CG",
        dtype={"ags": "str"},
        names=["ags", "organic_farms", "organic_farms_area"],
    )
    remove_rows_with_na(agri, column="ags")
    agri.set_index(keys="ags", inplace=True, verify_integrity=True)
    return agri


def convert_nat_agri(xls: pd.ExcelFile) -> pd.DataFrame:
    agri = pd.read_excel(
        xls,  # type: ignore
        sheet_name="LandwirtschaftBL",
        skiprows=9,
        header=None,
        usecols="B,I,K,L,O,Q,R,U,W,X,AA,AC,AD,AG,AI,AJ,AN,AP,AQ,AR,AS,AT,AU,AX,BA,BD,BG,BJ,BM,BP,BS,BV,CB",
        dtype={"ags": "str"},
        names=[
            "ags",
            # "agri_area_total",  # D
            # "farmland",  # E
            # "farmland_organic",  # F
            # "greenland",  # G
            # "greenland_organic",  # H
            "cows",  # I
            # "cows_density",  cows / area_agri_total
            "cows_ch4e",  # K
            "cows_n2oe",  # L
            # "cows_co2e = (cows_ch4e*25+cows_n2oe*298)*1000
            # "cows_efactor" = if cows > 0 then cows_co2e/cows else cows_efactor_germany
            "cattle",  # O
            # cattle_density, cattle / area_agri_total
            "cattle_ch4e",  # Q
            "cattle_n2oe",  # R
            "pigs",  # U
            # pigs_density, pigs / area_agri_total
            "pigs_ch4e",  # W
            "pigs_n2oe",  # X
            "poultry",  # AA
            # poultry_density, poultry / area_agri_total
            "poultry_ch4e",  # AC
            "poultry_n2oe",  # AD
            "other_animals",  # AG
            # other_animals_density, oani_density, other_animals / area_agri_total
            "other_animals_ch4e",  # AI
            "other_animals_n2oe",  # AJ
            # "animal_wo_poultry_deposition" cows + cattle + pigs + other_animals
            "animal_wo_poultry_deposition_co2e",  # AN
            # ani_wo_poultry_deposition_efactor = if animal_wo_poultry_deposition > 0 then animal_wo_poultry_deposition_co2e / animal_wo_poultry_deposition else animal_wo_poultry_deposition_efactor_germany
            "amount_sale_calcit",
            "amount_sale_dolomite",
            "amount_sale_kas",
            "amount_sale_urea",
            "drymass_ecrop",
            "fertilizer_mineral_n2o",  # AU
            # "fertilizer_mineral_co2e = fertilizer_mineral_n2o * 298
            # fertilizer_mineral_efactor = fertilizer_mineral_co2e / farmland_area_total
            "fertilizer_economy_n2o",  # AX
            "sewage_sludge_n2o",  # BA
            "fermentation_ecrop_n2o",  # BD
            "pasturage_n2o",  # BG
            "crop_residues_n2o",  # BJ
            "farmed_soil_n2o",  # BM
            # farmed_soil_efactor = farmed_soil_n2o * 298 / (farmland_organic+greenland_organic)
            "farmed_soil_loss_organic_n2o",  # BP
            # farmed_soil_loss_organic_efactor =  ... / farmland_organic
            "diffuse_nitrate_emissions_n2o",  # BS
            # diffuse_nitrate_emissions_efactor = ... /  (farmland+greenland)
            "diffuse_emissions_n2o",  # BV
            # diffuse_n2o_emissions_efactor = ... / (farmland+greenland)
            "farms",  # CB
        ],
    )
    remove_rows_with_na(agri, column="ags")
    agri.set_index(keys="ags", inplace=True, verify_integrity=True)
    return agri


def rename_it_at_to_it_ot(df: pd.DataFrame) -> None:
    df["label"] = df["label"].apply(lambda n: n.replace("_it_at_", "_it_ot_"))


def convert_facts(xls: pd.ExcelFile) -> pd.DataFrame:
    facts = pd.read_excel(
        xls,  # type: ignore
        sheet_name="Fakten",
        skiprows=7,
        usecols="A:H",
        names=[
            "group",
            "description",
            "label",
            "value",
            "unit",
            "rationale",
            "reference",
            "link",
        ],
    )
    remove_rows_with_na(facts, column="label")
    remove_rows_with(facts, column="group", eq="nu")
    rename_it_at_to_it_ot(facts)
    facts.set_index(keys="label", inplace=True, verify_integrity=True)
    return facts


def convert_assumptions(xls: pd.ExcelFile) -> pd.DataFrame:
    assumptions = pd.read_excel(
        xls,  # type: ignore
        sheet_name="Annahmen",
        skiprows=6,
        usecols="A:H",
        names=[
            "group",
            "description",
            "label",
            "value",
            "unit",
            "rationale",
            "reference",
            "link",
        ],
    )
    remove_rows_with_na(assumptions, column="label")
    remove_rows_with(assumptions, column="group", eq="nu")
    rename_it_at_to_it_ot(assumptions)
    assumptions.set_index(keys="label", inplace=True, verify_integrity=True)
    return assumptions


def convert_destatis(xls: pd.ExcelFile) -> pd.DataFrame:
    destatis = pd.read_excel(
        xls,  # type: ignore
        sheet_name="Verkehr_DestatisDaten",
        skiprows=1,
        usecols="B,F:I",
        names=["ags", "total_mega_km", "rail_mega_km", "metro_mega_km", "bus_mega_km"],
        dtype={"ags": "str"},
    )
    remove_rows_with_na(destatis, column="ags")
    destatis.set_index(keys="ags", inplace=True, verify_integrity=True)
    return destatis


def save_as_csv(d: pd.DataFrame, folder: str, file: str) -> None:
    os.makedirs(folder, exist_ok=True)
    d.to_csv(os.path.join(folder, file))


def load(what: str, year: int = 2018) -> pd.DataFrame:
    repo = "public" if what != "traffic" else "proprietary"
    return pd.read_csv(
        os.path.join(os.path.join(repo, what, str(year) + ".csv")), dtype={"ags": "str"}
    )


class DataNotFound(Exception):
    ags: str
    df: pd.DataFrame

    def __init__(self, ags, df):
        self.ags = ags
        self.df = df

    def __str__(self):
        return f"Could not find ags={self.ags} in dataframe\n{self.df}"


# TODO: Good error messages when field is not populated
# TODO: Good error messages when field name is mistyped


class DataRow:
    def __init__(self, df: pd.DataFrame, ags: str):
        try:
            # Basically this reduces the dataframe to a single row dataframe
            # and then takes the only dataframe row (a series object)
            # TODO: When we have time figure out what the actually best way
            # to go about all this is. Maybe we should consider dropping
            # pandas as a requirement? I mean all we do is load a few csvs
            # and extract a very small number of rows. pandas is total overkill
            # in particular when we are publishing a package for others to use
            # it's nice to have a small list of dependencies
            self._series = df[df["ags"] == ags].iloc[0]
        except:
            raise DataNotFound(ags=ags, df=df)

    # TODO: All of the accessors below should not cast so forcefully but
    # only convert into the python type when the pandas type matches

    def float(self, attr: str) -> float:
        return float(self._series[attr])  # type: ignore

    def int(self, attr: str) -> int:
        return int(self._series[attr])  # type: ignore

    def str(self, attr: str) -> str:
        return str(self._series[attr])


class Data:
    def __init__(
        self,
        area: pd.DataFrame,
        area_kinds: pd.DataFrame,
        assumptions: pd.DataFrame,
        buildings: pd.DataFrame,
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
    ):
        self._area = area
        self._area_kinds = area_kinds
        self._assumptions = assumptions
        self._buildings = buildings
        self._destatis = destatis
        self._facts = facts
        self._flats = flats
        self._nat_agri = nat_agri
        self._nat_organic_agri = nat_organic_agri
        self._nat_energy = nat_energy
        self._nat_res_buildings = nat_res_buildings
        self._population = population
        self._renewable_energy = renewable_energy
        self._traffic = traffic

    def area(self, ags: str):
        return DataRow(self._area, ags)

    def area_kinds(self, ags: str):
        return DataRow(self._area_kinds, ags)

    def buildings(self, ags: str):
        return DataRow(self._buildings, ags)

    def destatis(self, ags: str):
        return DataRow(self._destatis, ags)

    def flats(self, ags: str):
        return DataRow(self._flats, ags)

    def nat_agri(self, ags: str):
        return DataRow(self._nat_agri, ags)

    def nat_organic_agri(self, ags: str):
        return DataRow(self._nat_organic_agri, ags)

    def nat_energy(self, ags: str):
        return DataRow(self._nat_energy, ags)

    def nat_res_buildings(self, ags: str):
        return DataRow(self._nat_res_buildings, ags)

    def population(self, ags: str):
        return DataRow(self._population, ags)

    def renewable_energy(self, ags: str):
        return DataRow(self._renewable_energy, ags)

    def traffic(self, ags: str):
        return DataRow(self._traffic, ags)

    def fact(self, keyname: str) -> float:
        value = float(self._facts[self._facts["label"] == keyname]["value"])  # type: ignore
        return value

    def ass(self, keyname: str) -> float:
        value = float(self._assumptions[self._assumptions["label"] == keyname]["value"])  # type: ignore
        return value

    @classmethod
    def load(cls) -> "Data":
        d = cls(
            area=load("area"),
            area_kinds=load("area_kinds"),
            assumptions=load("assumptions"),
            buildings=load("buildings"),
            destatis=load("destatis"),
            facts=load("facts"),
            flats=load("flats"),
            nat_agri=load("nat_agri"),
            nat_organic_agri=load("nat_organic_agri", 2016),
            nat_energy=load("nat_energy"),
            nat_res_buildings=load("nat_res_buildings"),
            population=load("population"),
            renewable_energy=load("renewable_energy"),
            traffic=load("traffic"),
        )
        return d


# This global should die and we should just pass the data class
# around. But we will do that in a separate patch for ease of code review
data: Data


def fact(keyname: str) -> int | float:
    return data.fact(keyname)


def ass(keyname: str) -> int | float:
    return data.ass(keyname)


def make_entry(ags: str, year: int):
    # ags identifies the community (Kommune)
    ags_dis = ags[:5]  # This identifies the administrative district (Landkreis)
    ags_sta = ags[:2]  # This identifies the federal state (Bundesland)

    ags_dis_padded = ags_dis + "000"
    ags_sta_padded = ags_sta + "000000"
    ags_germany = "DG000000"

    entry = {}

    entry["ags"] = ags

    currentDateTime = datetime.datetime.now()
    date = currentDateTime.date()

    entry["In_M_year_baseline"] = 2022  # int(date.strftime("%Y"))

    entry["In_M_AGS_com"] = ags
    entry["In_M_AGS_dis"] = ags_dis
    entry["In_M_AGS_sta"] = ags_sta

    entry["In_M_year_target"] = year

    entry["In_M_duration_target"] = (
        entry["In_M_year_target"] - entry["In_M_year_baseline"]
    )
    entry["In_M_duration_target_until_2050"] = 2050 - entry["In_M_year_target"]
    entry["In_M_duration_neutral"] = float(
        entry["In_M_duration_target_until_2050"] + entry["In_M_duration_target"] / 2
    )

    entry["In_M_population_com_2018"] = data.population(ags).int("total")
    entry["In_M_population_com_203X"] = entry["In_M_population_com_2018"]
    entry["In_M_population_dis"] = data.population(ags_dis_padded).int("total")
    entry["In_M_population_sta"] = data.population(ags_sta_padded).int("total")
    entry["In_M_population_nat"] = data.population(ags_germany).int("total")

    data_area_com = data.area(ags)
    data_area_dis = data.area(ags_dis_padded)
    data_area_sta = data.area(ags_sta_padded)
    data_area_nat = data.area(ags_germany)
    entry["In_M_area_total_com"] = data_area_com.int("land_total")
    entry["In_M_area_total_dis"] = data_area_dis.int("land_total")
    entry["In_M_area_total_sta"] = data_area_sta.int("land_total")
    entry["In_M_area_total_nat"] = data_area_nat.int("land_total")

    entry["In_M_area_wood_com"] = data_area_com.int("veg_forrest")
    entry["In_M_area_agri_com"] = data_area_com.int("veg_agri")
    entry["In_M_area_agri_sta"] = data_area_sta.int("veg_agri")
    entry["In_M_area_agri_nat"] = data_area_nat.int("veg_agri")

    entry["In_M_area_veg_grove_com"] = data_area_com.float(
        "veg_wood"
    )  # TODO double check this
    entry["In_M_area_transport_com"] = data_area_com.float("land_traffic")
    entry["In_M_area_settlement_com"] = data_area_com.float("land_settlement")
    entry["In_M_area_veg_heath_com"] = data_area_com.float("veg_heath")
    entry["In_M_area_veg_moor_com"] = data_area_com.float("veg_moor")
    entry["In_M_area_veg_marsh_com"] = data_area_com.float("veg_marsh")
    entry["In_M_area_veg_plant_uncover_com"] = data_area_com.float(
        "veg_plant_uncover_com"
    )
    entry["In_M_area_veg_wood_com"] = data_area_com.float("veg_wood")

    entry["In_M_area_water_com"] = data_area_com.float("water_total")
    entry["In_M_area_industry_com"] = data_area_com.float("settlement_ghd")
    entry["In_M_area_industry_nat"] = data_area_nat.float("settlement_ghd")

    data_flats_com = data.flats(ags)
    entry["In_R_buildings_le_2_apts"] = data_flats_com.float(
        "buildings_2flats"
    ) + data_flats_com.float("buildings_1flat")
    entry["In_R_buildings_ge_3_apts"] = data_flats_com.float(
        "buildings_3flats"
    ) + data_flats_com.float("buildings_dorms")

    data_buildings_com = data.buildings(ags)
    entry["In_R_buildings_until_1919"] = data_buildings_com.float(
        "buildings_until_1919"
    )
    entry["In_R_buildings_1919_1948"] = data_buildings_com.float("buildings_1919_1948")
    entry["In_R_buildings_1949_1978"] = data_buildings_com.float("buildings_1949_1978")
    entry["In_R_buildings_1979_1986"] = data_buildings_com.float("buildings_1979_1986")
    entry["In_R_buildings_1987_1990"] = data_buildings_com.float("buildings_1987_1990")
    entry["In_R_buildings_1991_1995"] = data_buildings_com.float("buildings_1991_1995")
    entry["In_R_buildings_1996_2000"] = data_buildings_com.float("buildings_1996_2000")
    entry["In_R_buildings_2001_2004"] = data_buildings_com.float("buildings_2001_2004")
    entry["In_R_buildings_2005_2008"] = data_buildings_com.float("buildings_2005_2008")
    entry["In_R_buildings_2009_2011"] = data_buildings_com.float("buildings_2009_2011")
    entry["In_R_buildings_2011_today"] = (
        fact("Fact_R_P_newbuilt_2011_year_ref")
        * entry["In_M_population_com_2018"]
        / entry["In_M_population_nat"]
    )
    entry["In_R_buildings_com"] = (
        entry["In_R_buildings_until_1919"]
        + entry["In_R_buildings_1919_1948"]
        + entry["In_R_buildings_1949_1978"]
        + entry["In_R_buildings_1979_1986"]
        + entry["In_R_buildings_1987_1990"]
        + entry["In_R_buildings_1991_1995"]
        + entry["In_R_buildings_1996_2000"]
        + entry["In_R_buildings_2001_2004"]
        + entry["In_R_buildings_2005_2008"]
        + entry["In_R_buildings_2009_2011"]
        + entry["In_R_buildings_2011_today"]
    )
    entry["In_R_buildings_nat"] = data.buildings(ags_germany).float(
        "buildings_total"
    ) + fact("Fact_R_P_newbuilt_2011_year_ref")

    entry["In_R_flats_com"] = data_buildings_com.float("flats_total")
    entry["In_R_flats_w_heatnet"] = data_buildings_com.float("flats_heatnet")
    entry["In_R_flats_wo_heatnet"] = (
        entry["In_R_flats_com"] - entry["In_R_flats_w_heatnet"]
    )
    entry["In_R_area_m2"] = (
        data_flats_com.float("residential_buildings_area_total") * 1000.0
    )
    entry["In_R_area_m2_1flat"] = data_flats_com.float("buildings_1flat") * fact(
        "Fact_R_buildings_livingspace_oneflat"
    )
    entry["In_R_area_m2_2flat"] = data_flats_com.float("buildings_2flats") * fact(
        "Fact_R_buildings_livingspace_twoflat"
    )
    entry["In_R_area_m2_3flat"] = data_flats_com.float("buildings_3flats") * fact(
        "Fact_R_buildings_livingspace_moreflat"
    )
    entry["In_R_area_m2_dorm"] = data_flats_com.float("buildings_dorms") * fact(
        "Fact_R_buildings_livingspace_dorm"
    )
    entry["In_R_pct_of_area_m2_com"] = data.nat_res_buildings(ags_sta_padded).float(
        "communal"
    )
    entry["In_R_rehab_rate_pa"] = ass("Ass_R_B_P_renovation_rate")
    entry["In_R_heatnet_ratio_year_target"] = (
        data_buildings_com.float("buildings_heatnet") / entry["In_R_buildings_com"]
    )

    if ags == ags_germany:
        entry["In_T_rt7"] = "nd"
        entry["In_T_rt3"] = "nd"
    else:
        # entry['In_T_rt7'] = list(raumtypen[raumtypen['ags'] == entry['In_M_AGS_com']]['RegioStaR7'])[0]
        # entry['In_T_rt3'] = list(raumtypen[raumtypen['ags'] == entry['In_M_AGS_com']]['Raumtyp3'])[0]
        entry["In_T_rt7"] = data.area_kinds(ags).int("rt7")
        entry["In_T_rt3"] = data.area_kinds(ags).str("rt3")

    data_renewable_energy_com = data.renewable_energy(ags)
    data_nat_energy_sta = data.nat_energy(ags_sta_padded)
    entry["In_E_PV_power_inst_roof"] = (
        data_renewable_energy_com.float("pv")
        / 1000.0
        * data_nat_energy_sta.float("PV_roof_2017")
    )
    entry["In_E_PV_power_inst_facade"] = (
        data_renewable_energy_com.float("pv")
        / 1000.0
        * data_nat_energy_sta.float("PV_others")
        / 2.0
    )
    entry["In_E_PV_power_inst_park"] = (
        data_renewable_energy_com.float("pv")
        / 1000.0
        * data_nat_energy_sta.float("PV_land_2017")
    )
    entry["In_E_PV_power_inst_agripv"] = (
        data_renewable_energy_com.float("pv")
        / 1000.0
        * data_nat_energy_sta.float("PV_others")
        / 2.0
    )
    entry["In_E_PV_power_inst_wind_on"] = (
        data_renewable_energy_com.float("wind_on") / 1000.0
    )
    entry["In_E_PV_power_inst_biomass"] = (
        data_renewable_energy_com.float("biomass") / 1000.0
    )
    entry["In_E_PV_power_inst_water"] = (
        data_renewable_energy_com.float("water") / 1000.0
    )

    entry["In_E_PV_power_to_be_inst_roof"] = ass(
        "Ass_E_P_local_pv_roof_power_to_be_installed_2035"
    )
    entry["In_H_solartherm_to_be_inst"] = ass(
        "Ass_R_B_P_roof_area_fraction_solar_thermal"
    )
    entry["In_E_PV_power_to_be_inst_facade"] = ass(
        "Ass_E_P_local_pv_roof_facade_to_be_installed_2035"
    )
    entry["In_E_PV_power_to_be_inst_park"] = ass(
        "Ass_E_P_local_pv_park_power_to_be_installed_2035"
    )
    entry["In_E_PV_power_to_be_inst_agri"] = ass(
        "Ass_E_P_local_pv_agri_power_to_be_installed_2035"
    )
    entry["In_E_PV_power_to_be_inst_local_wind_onshore"] = ass(
        "Ass_E_P_local_wind_onshore_power_to_be_installed_2035"
    )
    entry["In_E_PV_power_to_be_inst_local_biomass"] = ass(
        "Ass_E_P_local_biomass_power_to_be_installed_2035"
    )

    entry["In_E_pv_full_load_hours_sta"] = data_nat_energy_sta.float("PV_average_flh")
    entry[
        "In_E_local_wind_onshore_ratio_power_to_area_sta"
    ] = data_nat_energy_sta.float("demand_2018")
    potential_electricity_from_bioenergy_sta = (
        data_nat_energy_sta.float("bioenergy_potential")
        * 1000.0
        / 3.6
        * ass("Ass_E_P_BHKW_efficiency_electric")
    )
    bioenergy_installable_capacity_sta = (
        potential_electricity_from_bioenergy_sta
        / fact("Fact_E_P_biomass_full_load_hours")
    )
    entry[
        "In_E_biomass_local_power_installable_sta"
    ] = bioenergy_installable_capacity_sta * (
        entry["In_M_area_agri_com"] / entry["In_M_area_agri_sta"]
    )

    entry["In_R_coal_fec"] = (
        fact("Fact_R_S_coal_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_R_petrol_fec"] = (
        fact("Fact_R_S_petrol_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_R_fueloil_fec"] = (
        fact("Fact_R_S_fueloil_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_R_lpg_fec"] = (
        fact("Fact_R_S_lpg_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_R_gas_fec"] = (
        fact("Fact_R_S_gas_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_R_biomass_fec"] = (
        fact("Fact_R_S_biomass_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_R_orenew_fec"] = (
        fact("Fact_R_S_orenew_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_R_elec_fec"] = (
        fact("Fact_R_S_elec_fec_2018")
        * entry["In_M_population_com_2018"]
        / entry["In_M_population_nat"]
    )
    entry["In_R_heatnet_fec"] = (
        fact("Fact_R_S_heatnet_fec_2018")
        * entry["In_R_flats_w_heatnet"]
        / fact("Fact_R_P_flats_w_heatnet_2011")
    )
    entry["In_R_energy_total"] = (
        entry["In_R_coal_fec"]
        + entry["In_R_petrol_fec"]
        + entry["In_R_fueloil_fec"]
        + entry["In_R_lpg_fec"]
        + entry["In_R_gas_fec"]
        + entry["In_R_biomass_fec"]
        + entry["In_R_orenew_fec"]
        + entry["In_R_elec_fec"]
        + entry["In_R_heatnet_fec"]
    )

    entry["In_B_coal_fec"] = (
        fact("Fact_B_S_coal_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_B_petrol_fec"] = (
        fact("Fact_B_S_petrol_fec_2018")
        * entry["In_M_population_com_2018"]
        / entry["In_M_population_nat"]
    )
    entry["In_B_jetfuel_fec"] = (
        fact("Fact_B_S_jetfuel_fec_2018")
        * entry["In_M_population_com_2018"]
        / entry["In_M_population_nat"]
    )
    entry["In_B_diesel_fec"] = (
        fact("Fact_B_S_diesel_fec_2018")
        * entry["In_M_population_com_2018"]
        / entry["In_M_population_nat"]
    )
    entry["In_B_fueloil_fec"] = (
        fact("Fact_B_S_fueloil_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_B_lpg_fec"] = (
        fact("Fact_B_S_lpg_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_B_gas_fec"] = (
        fact("Fact_B_S_gas_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_B_biomass_fec"] = (
        fact("Fact_B_S_biomass_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_B_orenew_fec"] = (
        fact("Fact_B_S_orenew_fec_2018")
        * entry["In_R_flats_wo_heatnet"]
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    entry["In_B_elec_fec"] = (
        fact("Fact_B_S_elec_fec_2018")
        * entry["In_M_population_com_2018"]
        / entry["In_M_population_nat"]
    )
    entry["In_B_heatnet_fec"] = (
        fact("Fact_B_S_heatnet_fec_2018")
        * entry["In_R_flats_w_heatnet"]
        / fact("Fact_R_P_flats_w_heatnet_2011")
    )

    entry["In_I_coal_fec"] = (
        fact("Fact_I_S_coal_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )
    entry["In_I_diesel_fec"] = (
        fact("Fact_I_S_diesel_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )
    entry["In_I_fueloil_fec"] = (
        fact("Fact_I_S_fueloil_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )
    entry["In_I_lpg_fec"] = (
        fact("Fact_I_S_lpg_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )
    entry["In_I_gas_fec"] = (
        fact("Fact_I_S_gas_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )
    entry["In_I_opetpro_fec"] = (
        fact("Fact_I_S_opetpro_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )
    entry["In_I_biomass_fec"] = (
        fact("Fact_I_S_biomass_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )
    entry["In_I_orenew_fec"] = (
        fact("Fact_I_S_orenew_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )
    entry["In_I_ofossil_fec"] = (
        fact("Fact_I_S_ofossil_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )
    entry["In_I_elec_fec"] = (
        fact("Fact_I_S_elec_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )
    entry["In_I_heatnet_fec"] = (
        fact("Fact_I_S_heatnet_fec_2018")
        * entry["In_M_area_industry_com"]
        / entry["In_M_area_industry_nat"]
    )

    entry["In_I_energy_total"] = (
        entry["In_I_coal_fec"]
        + entry["In_I_diesel_fec"]
        + entry["In_I_fueloil_fec"]
        + entry["In_I_lpg_fec"]
        + entry["In_I_gas_fec"]
        + entry["In_I_opetpro_fec"]
        + entry["In_I_biomass_fec"]
        + entry["In_I_orenew_fec"]
        + entry["In_I_ofossil_fec"]
        + entry["In_I_elec_fec"]
        + entry["In_I_heatnet_fec"]
    )

    entry["In_I_fec_pct_of_miner"] = data.fact(
        "Fact_I_P_miner_ratio_fec_to_industry_2018"
    )
    entry["In_I_fec_pct_of_chem"] = data.fact(
        "Fact_I_S_chem_fec_ratio_to_industrie_2018"
    )
    entry["In_I_fec_pct_of_metal"] = data.fact("Fact_I_P_fec_pct_of_metal_2018")
    entry["In_I_fec_pct_of_other"] = data.fact(
        "Fact_I_P_other_ratio_fec_to_industry_2018"
    )

    data_traffic_com = data.traffic(ags)
    entry["In_T_ec_rail_ppl_elec"] = data_traffic_com.float("rail_ppl_elec")
    entry["In_T_ec_rail_ppl_diesel"] = data_traffic_com.float("rail_ppl_diesel")
    entry["In_T_ec_rail_gds_elec"] = data_traffic_com.float("gds_elec")
    entry["In_T_ec_rail_gds_diesel"] = data_traffic_com.float("gds_diesel")

    entry["In_T_mil_car_it_at"] = data_traffic_com.float("car_it_at")
    entry["In_T_mil_car_ab"] = data_traffic_com.float("car_ab")
    entry["In_T_mil_ldt_it_at"] = data_traffic_com.float("ldt_it_at")
    entry["In_T_mil_ldt_ab"] = data_traffic_com.float("ldt_ab")
    entry["In_T_mil_mhd_it_at"] = data_traffic_com.float("mhd_it_at")
    entry["In_T_mil_mhd_ab"] = data_traffic_com.float("mhd_ab")

    entry["In_A_petrol_fec"] = (
        fact("Fact_A_S_petrol_fec_2018")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_nat"]
    )
    entry["In_A_diesel_fec"] = (
        fact("Fact_A_S_diesel_fec_2018")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_nat"]
    )
    entry["In_A_fueloil_fec"] = (
        fact("Fact_A_S_fueloil_fec_2018")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_nat"]
    )
    entry["In_A_lpg_fec"] = (
        fact("Fact_A_S_lpg_fec_2018")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_nat"]
    )
    entry["In_A_gas_fec"] = (
        fact("Fact_A_S_gas_fec_2018")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_nat"]
    )
    entry["In_A_biomass_fec"] = (
        fact("Fact_A_S_biomass_fec_2018")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_nat"]
    )
    entry["In_A_elec_fec"] = (
        fact("Fact_A_S_elec_fec_2018")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_nat"]
    )

    data_nat_agri_sta = data.nat_agri(ags_sta_padded)
    entry["In_A_other_liming_calcit_prod_volume"] = (
        data_nat_agri_sta.float("amount_sale_calcit")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_sta"]
    )
    entry["In_A_other_liming_dolomite_prod_volume"] = (
        data_nat_agri_sta.float("amount_sale_dolomite")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_sta"]
    )
    entry["In_A_other_kas_prod_volume"] = (
        data_nat_agri_sta.float("amount_sale_kas")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_sta"]
    )
    entry["In_A_other_urea_prod_volume"] = (
        data_nat_agri_sta.float("amount_sale_urea")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_sta"]
    )
    entry["In_A_other_ecrop_prod_volume"] = (
        data_nat_agri_sta.float("drymass_ecrop")
        * entry["In_M_area_agri_com"]
        / entry["In_M_area_agri_sta"]
    )

    cows_density_sta = data_nat_agri_sta.float("cows") / entry["In_M_area_agri_sta"]
    entry["In_A_fermen_dairycow_amount"] = (
        cows_density_sta * entry["In_M_area_agri_com"]
    )

    cattle_density_sta = data_nat_agri_sta.float("cattle") / entry["In_M_area_agri_sta"]
    entry["In_A_fermen_nondairy_amount"] = (
        cattle_density_sta * entry["In_M_area_agri_com"]
    )

    pig_density_sta = data_nat_agri_sta.float("pigs") / entry["In_M_area_agri_sta"]
    entry["In_A_fermen_pig_amount"] = pig_density_sta * entry["In_M_area_agri_com"]

    poultry_density_sta = (
        data_nat_agri_sta.float("poultry") / entry["In_M_area_agri_sta"]
    )
    entry["In_A_fermen_poultry_amount"] = (
        poultry_density_sta * entry["In_M_area_agri_com"]
    )

    other_animals_density_sta = (
        data_nat_agri_sta.float("other_animals") / entry["In_M_area_agri_sta"]
    )
    entry["In_A_fermen_oanimal_amount"] = (
        other_animals_density_sta * entry["In_M_area_agri_com"]
    )

    def compute_animal_efactor(what: str):
        ch4e = data_nat_agri_sta.float(what + "_ch4e")
        n2oe = data_nat_agri_sta.float(what + "_n2oe")
        co2e = (ch4e * 25.0 + n2oe * 298.0) * 1000.0
        count = data_nat_agri_sta.float(what)
        if count > 0:
            return co2e / count
        else:
            # TODO: compute national equivalent
            assert False, "Here we should return the national efactor instead"

    entry["In_A_manure_dairycow_ratio_CO2e_to_amount"] = compute_animal_efactor("cows")
    entry["In_A_manure_nondairy_ratio_CO2e_to_amount"] = compute_animal_efactor(
        "cattle"
    )
    entry["In_A_manure_swine_ratio_CO2e_to_amount"] = compute_animal_efactor("pigs")
    entry["In_A_manure_poultry_ratio_CO2e_to_amount"] = compute_animal_efactor(
        "poultry"
    )
    entry["In_A_manure_oanimal_ratio_CO2e_to_amount"] = compute_animal_efactor(
        "other_animals"
    )
    animal_wo_poultry_deposition_sta = (
        data_nat_agri_sta.float("cows")
        + data_nat_agri_sta.float("cattle")
        + data_nat_agri_sta.float("pigs")
        + data_nat_agri_sta.float("other_animals")
    )
    if animal_wo_poultry_deposition_sta > 0:
        entry["In_A_manure_deposition_ratio_CO2e_to_amount"] = (
            data_nat_agri_sta.float("animal_wo_poultry_deposition_co2e")
            / animal_wo_poultry_deposition_sta
        )
    else:
        assert False, "TODO here we should compute the natoional factor instead"

    def compute_efactor_from_n2o(
        what: str, area: float, data_nat_agri: DataRow = data_nat_agri_sta
    ):
        n2o = data_nat_agri.float(what + "_n2o")
        co2e = n2o * 298.0
        return co2e / area

    farmland_area_total_sta = entry["In_M_area_agri_sta"] * fact(
        "Fact_L_G_area_veg_agri_pct_of_crop"
    )
    entry["In_A_soil_fertilizer_ratio_CO2e_to_ha"] = compute_efactor_from_n2o(
        "fertilizer_mineral", farmland_area_total_sta
    )
    entry["In_A_soil_manure_ratio_CO2e_to_ha"] = compute_efactor_from_n2o(
        "fertilizer_economy", farmland_area_total_sta
    )
    entry["In_A_soil_sludge_ratio_CO2e_to_ha"] = compute_efactor_from_n2o(
        "sewage_sludge", farmland_area_total_sta
    )
    entry["In_A_soil_ecrop_ratio_CO2e_to_ha"] = compute_efactor_from_n2o(
        "fermentation_ecrop", farmland_area_total_sta
    )
    greenland_area_total_sta = (
        entry["In_M_area_agri_sta"] * fact("Fact_L_G_area_veg_agri_pct_of_grass")
        + data_area_sta.float("veg_heath")
        + data_area_sta.float("veg_marsh")
        + data_area_sta.float("veg_plant_uncover_com")
        * fact("Fact_L_G_area_plant_uncover_pct_grass")
    )
    entry["In_A_soil_crazing_ratio_CO2e_to_ha"] = compute_efactor_from_n2o(
        "pasturage", greenland_area_total_sta
    )
    entry["In_A_soil_residue_ratio_CO2e_to_ha"] = compute_efactor_from_n2o(
        "crop_residues", farmland_area_total_sta
    )
    farmland_area_organic_sta = farmland_area_total_sta * (
        fact("Fact_L_G_fraction_org_soil_fen_crop")
        + fact("Fact_L_G_fraction_org_soil_bog_crop")
    )
    farmland_area_organic_germany = (
        entry["In_M_area_agri_nat"]
        * fact("Fact_L_G_area_veg_agri_pct_of_crop")
        * (
            fact("Fact_L_G_fraction_org_soil_fen_crop")
            + fact("Fact_L_G_fraction_org_soil_bog_crop")
        )
    )
    greenland_area_organic_sta = greenland_area_total_sta * (
        fact("Fact_L_G_fraction_org_soil_fen_grass_strict")
        + fact("Fact_L_G_fraction_org_soil_bog_grass_strict")
    )
    entry["In_A_soil_orgfarm_ratio_CO2e_to_ha"] = compute_efactor_from_n2o(
        "farmed_soil", farmland_area_organic_sta + greenland_area_organic_sta
    )
    # unlike the other factors we don't have the n2o levels below the national level available :-(
    data_nat_agri_germany = data.nat_agri(ags_germany)
    entry["In_A_soil_orgloss_ratio_CO2e_to_ha"] = compute_efactor_from_n2o(
        "farmed_soil_loss_organic",
        area=farmland_area_organic_germany,
        data_nat_agri=data_nat_agri_germany,
    )
    entry["In_A_soil_leaching_ratio_CO2e_to_ha"] = compute_efactor_from_n2o(
        "diffuse_nitrate_emissions",
        area=farmland_area_total_sta + greenland_area_total_sta,
    )
    entry["In_A_soil_deposition_ratio_CO2e_to_ha"] = compute_efactor_from_n2o(
        "diffuse_emissions", area=farmland_area_total_sta + greenland_area_total_sta
    )

    farming_density_sta = data_nat_agri_sta.float("farms") / entry["In_M_area_agri_sta"]
    # We would like 2018 data here but we only have 2016, so we assume the ratio stayed constant
    data_nat_organic_agri_sta = data.nat_organic_agri(ags_sta_padded)

    entry["In_A_farm_amount"] = farming_density_sta * entry["In_M_area_agri_com"]
    entry["In_A_area_agri_com_pct_of_organic"] = (
        data_nat_organic_agri_sta.float("organic_farms_area")
        / entry["In_M_area_agri_sta"]
    )

    return entry


def convert(excel_generator_filename: str):
    with pd.ExcelFile(excel_generator_filename) as xls:
        all = [
            ("public/area", convert_area),
            ("public/area_kinds", convert_area_kinds),
            ("public/assumptions", convert_assumptions),
            ("public/buildings", convert_buildings),
            ("public/destatis", convert_destatis),
            ("public/facts", convert_facts),
            ("public/flats", convert_flats),
            ("public/nat_agri", convert_nat_agri),
            ("public/nat_organic_agri", convert_nat_organic_agri),
            ("public/nat_energy", convert_nat_energy),
            ("public/nat_res_buildings", convert_nat_res_buildings),
            ("public/population", convert_population),
            ("public/renewable_energy", convert_renewable_energy),
            ("proprietary/traffic", convert_traffic),
        ]

        for (folder, convert) in all:
            print(f"Converting {folder}")
            df = convert(xls)
            print(f"Saving {folder}")
            save_as_csv(
                df,
                folder,
                "2018.csv" if folder != "public/nat_organic_agri" else "2016.csv",
            )


def test_make_entry(ags):
    global data
    data = Data.load()
    entry = make_entry(ags, 2030)
    import json

    json.dump(entry, sys.stdout)


if __name__ == "__main__":
    match sys.argv:
        case [cmd, "convert", excel_file]:
            convert(excel_file)

        case [cmd, "test_make_entry", ags]:
            test_make_entry(ags)

        case _:
            print(
                f"""USAGE: {sys.argv[0]} <cmd> [<args>]
commands:
    convert GENERATOR.xlsx  -- Convert the spreadsheet into data files
    test_make_entry AGS     -- test the updated make_entry function
"""
            )
            exit(1)
