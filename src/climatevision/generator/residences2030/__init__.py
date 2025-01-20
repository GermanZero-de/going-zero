"""
Documentation:
https://localzero-generator.readthedocs.io/de/latest/sectors/hh_ghd.html
"""

# pyright: strict

from ..makeentries import Entries
from ..refdata import Facts, Assumptions
from ..utils import div, MILLION
from ..residences2018.r18 import R18
from ..business2018.b18 import B18

from .r30 import R30
from .dataclasses import (
    Vars2,
    Vars3,
    Vars4,
    Vars5,
    Vars6,
    Vars7,
    Vars8,
    Vars9,
    Vars10,
    Vars11,
    Vars12,
    Vars13,
    Vars14,
    Vars15,
    Vars16,
    Vars17,
    Vars18,
)
from . import energy_general


def calc(
    entries: Entries, facts: Facts, assumptions: Assumptions, *, r18: R18, b18: B18
) -> R30:
    fact = facts.fact
    ass = assumptions.ass

    ### P - Section ###
    p = Vars2()
    r = Vars8()

    duration_until_target_year = entries.m_duration_target
    duration_CO2e_neutral_years = entries.m_duration_neutral

    population_commune_2018 = entries.m_population_com_2018
    population_germany_2018 = entries.m_population_nat

    p_buildings_total = Vars3()
    p_buildings_until_1919 = Vars4()
    p_buildings_1919_1948 = Vars4()
    p_buildings_1949_1978 = Vars4()
    p_buildings_1979_1995 = Vars4()
    p_buildings_1996_2004 = Vars4()
    p_buildings_2005_2011 = Vars5()
    p_buildings_2011_today = Vars5()
    p_buildings_new = Vars6()
    p_buildings_area_m2_com = Vars7()

    p_elec_elcon = Vars16()
    p_elec_heatpump = Vars16()
    p_other = Vars17()
    p_vehicles = Vars18()

    p_buildings_total.rate_rehab_pa = entries.r_rehab_rate_pa

    p_buildings_until_1919.area_m2 = r18.p_buildings_until_1919.area_m2
    p_buildings_1919_1948.area_m2 = r18.p_buildings_1919_1948.area_m2
    p_buildings_1949_1978.area_m2 = r18.p_buildings_1949_1978.area_m2
    p_buildings_1979_1995.area_m2 = r18.p_buildings_1979_1995.area_m2
    p_buildings_1996_2004.area_m2 = r18.p_buildings_1996_2004.area_m2

    p_buildings_total.area_m2 = (
        p_buildings_until_1919.area_m2
        + p_buildings_1919_1948.area_m2
        + p_buildings_1949_1978.area_m2
        + p_buildings_1979_1995.area_m2
        + p_buildings_1996_2004.area_m2
    )  # SUM(p_buildings_until_1919.area_m2:p_buildings_1996_2004.area_m2)

    p_buildings_until_1919.pct_rehab = min(
        1.0,
        fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
        + p_buildings_total.rate_rehab_pa
        * duration_until_target_year
        * r18.p_buildings_until_1919.relative_heat_ratio_buildings_until_2004
        * div(p_buildings_total.area_m2, p_buildings_until_1919.area_m2),
    )
    p_buildings_1919_1948.pct_rehab = min(
        1.0,
        fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
        + p_buildings_total.rate_rehab_pa
        * duration_until_target_year
        * r18.p_buildings_1919_1948.relative_heat_ratio_buildings_until_2004
        * div(p_buildings_total.area_m2, p_buildings_1919_1948.area_m2),
    )
    p_buildings_1919_1948.pct_rehab = min(
        1.0,
        fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
        + p_buildings_total.rate_rehab_pa
        * duration_until_target_year
        * p_buildings_total.area_m2
        * div(
            r18.p_buildings_1919_1948.relative_heat_ratio_buildings_until_2004,
            p_buildings_1919_1948.area_m2,
        ),
    )

    p_buildings_1949_1978.pct_rehab = min(
        1.0,
        fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
        + p_buildings_total.rate_rehab_pa
        * duration_until_target_year
        * r18.p_buildings_1949_1978.relative_heat_ratio_buildings_until_2004
        * div(p_buildings_total.area_m2, p_buildings_1949_1978.area_m2),
    )
    p_buildings_1949_1978.pct_rehab = min(
        1.0,
        fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
        + p_buildings_total.rate_rehab_pa
        * duration_until_target_year
        * p_buildings_total.area_m2
        * div(
            r18.p_buildings_1949_1978.relative_heat_ratio_buildings_until_2004,
            p_buildings_1949_1978.area_m2,
        ),
    )
    p_buildings_1979_1995.pct_rehab = min(
        1.0,
        fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
        + p_buildings_total.rate_rehab_pa
        * duration_until_target_year
        * r18.p_buildings_1979_1995.relative_heat_ratio_buildings_until_2004
        * div(p_buildings_total.area_m2, p_buildings_1979_1995.area_m2),
    )
    p_buildings_1996_2004.pct_rehab = min(
        1.0,
        fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
        + p_buildings_total.rate_rehab_pa
        * duration_until_target_year
        * r18.p_buildings_1996_2004.relative_heat_ratio_buildings_until_2004
        * div(p_buildings_total.area_m2, p_buildings_1996_2004.area_m2),
    )
    p_buildings_2005_2011.pct_nonrehab = 0
    p_buildings_2011_today.pct_nonrehab = 0
    p_buildings_2005_2011.pct_rehab = 1 - p_buildings_2005_2011.pct_nonrehab
    p_buildings_2011_today.pct_rehab = 1 - p_buildings_2011_today.pct_nonrehab

    p_buildings_new.pct_x = max(
        div(entries.m_population_com_203X, population_commune_2018) - 1, 0
    )

    p_buildings_new.area_m2 = p_buildings_total.area_m2 * p_buildings_new.pct_x

    p_buildings_until_1919.area_m2_rehab = (
        p_buildings_until_1919.pct_rehab * p_buildings_until_1919.area_m2
    )
    p_buildings_1919_1948.area_m2_rehab = (
        p_buildings_1919_1948.pct_rehab * p_buildings_1919_1948.area_m2
    )
    p_buildings_1949_1978.area_m2_rehab = (
        p_buildings_1949_1978.pct_rehab * p_buildings_1949_1978.area_m2
    )
    p_buildings_1979_1995.area_m2_rehab = (
        p_buildings_1979_1995.pct_rehab * p_buildings_1979_1995.area_m2
    )
    p_buildings_1996_2004.area_m2_rehab = (
        p_buildings_1996_2004.pct_rehab * p_buildings_1996_2004.area_m2
    )
    p_buildings_2005_2011.area_m2_rehab = (
        p_buildings_2005_2011.pct_rehab * r18.p_buildings_2005_2011.area_m2
    )
    p_buildings_2011_today.area_m2_rehab = (
        p_buildings_2011_today.pct_rehab * r18.p_buildings_2011_today.area_m2
    )

    p_buildings_total.area_m2_rehab = (
        p_buildings_until_1919.area_m2_rehab
        + p_buildings_1919_1948.area_m2_rehab
        + p_buildings_1949_1978.area_m2_rehab
        + p_buildings_1979_1995.area_m2_rehab
        + p_buildings_1996_2004.area_m2_rehab
        + p_buildings_2005_2011.area_m2_rehab
        + p_buildings_2011_today.area_m2_rehab
    )

    p_buildings_area_m2_com.area_m2_rehab = (
        p_buildings_total.area_m2_rehab * r18.p_buildings_area_m2_com.pct_x
    )

    p_buildings_total.pct_rehab = div(
        p_buildings_total.area_m2_rehab, r18.p_buildings_total.area_m2
    )

    p_buildings_total.pct_nonrehab = 1 - p_buildings_total.pct_rehab
    p_buildings_until_1919.pct_nonrehab = 1 - p_buildings_until_1919.pct_rehab
    p_buildings_1919_1948.pct_nonrehab = 1 - p_buildings_1919_1948.pct_rehab
    p_buildings_1949_1978.pct_nonrehab = 1 - p_buildings_1949_1978.pct_rehab
    p_buildings_1979_1995.pct_nonrehab = 1 - p_buildings_1979_1995.pct_rehab
    p_buildings_1996_2004.pct_nonrehab = 1 - p_buildings_1996_2004.pct_rehab

    p_buildings_until_1919.area_m2_nonrehab = (
        p_buildings_until_1919.pct_nonrehab * p_buildings_until_1919.area_m2
    )
    p_buildings_1919_1948.area_m2_nonrehab = (
        p_buildings_1919_1948.pct_nonrehab * p_buildings_1919_1948.area_m2
    )
    p_buildings_1949_1978.area_m2_nonrehab = (
        p_buildings_1949_1978.pct_nonrehab * p_buildings_1949_1978.area_m2
    )
    p_buildings_1979_1995.area_m2_nonrehab = (
        p_buildings_1979_1995.pct_nonrehab * p_buildings_1979_1995.area_m2
    )
    p_buildings_1996_2004.area_m2_nonrehab = (
        p_buildings_1996_2004.pct_nonrehab * p_buildings_1996_2004.area_m2
    )
    p_buildings_2005_2011.area_m2_nonrehab = (
        p_buildings_2005_2011.pct_nonrehab * r18.p_buildings_2005_2011.area_m2
    )
    p_buildings_2011_today.area_m2_nonrehab = (
        p_buildings_2011_today.pct_nonrehab * r18.p_buildings_2011_today.area_m2
    )

    p_buildings_total.area_m2_nonrehab = (
        p_buildings_until_1919.area_m2_nonrehab
        + p_buildings_1919_1948.area_m2_nonrehab
        + p_buildings_1949_1978.area_m2_nonrehab
        + p_buildings_1979_1995.area_m2_nonrehab
        + p_buildings_1996_2004.area_m2_nonrehab
        + p_buildings_2005_2011.area_m2_nonrehab
        + p_buildings_2011_today.area_m2_nonrehab
    )

    p_buildings_until_1919.demand_heat_nonrehab = (
        p_buildings_until_1919.area_m2_nonrehab
        * r18.p_buildings_until_1919.ratio_energy_to_m2
    )
    p_buildings_1919_1948.demand_heat_nonrehab = (
        p_buildings_1919_1948.area_m2_nonrehab
        * r18.p_buildings_1919_1948.ratio_energy_to_m2
    )
    p_buildings_1949_1978.demand_heat_nonrehab = (
        p_buildings_1949_1978.area_m2_nonrehab
        * r18.p_buildings_1949_1978.ratio_energy_to_m2
    )
    p_buildings_1979_1995.demand_heat_nonrehab = (
        p_buildings_1979_1995.area_m2_nonrehab
        * r18.p_buildings_1979_1995.ratio_energy_to_m2
    )
    p_buildings_1996_2004.demand_heat_nonrehab = (
        p_buildings_1996_2004.area_m2_nonrehab
        * r18.p_buildings_1996_2004.ratio_energy_to_m2
    )
    p_buildings_2005_2011.demand_heat_nonrehab = (
        p_buildings_2005_2011.area_m2_nonrehab
        * r18.p_buildings_2005_2011.fec_factor_BMWi
    )
    p_buildings_2011_today.demand_heat_nonrehab = (
        p_buildings_2011_today.area_m2_nonrehab
        * r18.p_buildings_2011_today.fec_factor_BMWi
    )
    p_buildings_total.demand_heat_nonrehab = (
        p_buildings_until_1919.demand_heat_nonrehab
        + p_buildings_1919_1948.demand_heat_nonrehab
        + p_buildings_1949_1978.demand_heat_nonrehab
        + p_buildings_1979_1995.demand_heat_nonrehab
        + p_buildings_1996_2004.demand_heat_nonrehab
        + p_buildings_2005_2011.demand_heat_nonrehab
        + p_buildings_2011_today.demand_heat_nonrehab
    )

    p_buildings_until_1919.demand_heat_rehab = (
        p_buildings_until_1919.area_m2_rehab
        * ass("Ass_R_P_heat_consumption_after_renovation_per_area")
    )
    p_buildings_1919_1948.demand_heat_rehab = p_buildings_1919_1948.area_m2_rehab * ass(
        "Ass_R_P_heat_consumption_after_renovation_per_area"
    )
    p_buildings_1949_1978.demand_heat_rehab = p_buildings_1949_1978.area_m2_rehab * ass(
        "Ass_R_P_heat_consumption_after_renovation_per_area"
    )
    p_buildings_1979_1995.demand_heat_rehab = p_buildings_1979_1995.area_m2_rehab * ass(
        "Ass_R_P_heat_consumption_after_renovation_per_area"
    )
    p_buildings_1996_2004.demand_heat_rehab = p_buildings_1996_2004.area_m2_rehab * ass(
        "Ass_R_P_heat_consumption_after_renovation_per_area"
    )
    p_buildings_2005_2011.demand_heat_rehab = (
        p_buildings_2005_2011.area_m2_rehab
        * r18.p_buildings_2005_2011.ratio_energy_to_m2
    )
    p_buildings_2011_today.demand_heat_rehab = (
        p_buildings_2011_today.area_m2_rehab
        * r18.p_buildings_2011_today.ratio_energy_to_m2
    )
    p_buildings_total.demand_heat_rehab = (
        p_buildings_until_1919.demand_heat_rehab
        + p_buildings_1919_1948.demand_heat_rehab
        + p_buildings_1949_1978.demand_heat_rehab
        + p_buildings_1979_1995.demand_heat_rehab
        + p_buildings_1996_2004.demand_heat_rehab
        + p_buildings_2005_2011.demand_heat_rehab
        + p_buildings_2011_today.demand_heat_rehab
    )

    p_buildings_until_1919.energy = (
        p_buildings_until_1919.demand_heat_nonrehab
        + p_buildings_until_1919.demand_heat_rehab
    )
    p_buildings_1919_1948.energy = (
        p_buildings_1919_1948.demand_heat_nonrehab
        + p_buildings_1919_1948.demand_heat_rehab
    )
    p_buildings_1949_1978.energy = (
        p_buildings_1949_1978.demand_heat_nonrehab
        + p_buildings_1949_1978.demand_heat_rehab
    )
    p_buildings_1979_1995.energy = (
        p_buildings_1979_1995.demand_heat_nonrehab
        + p_buildings_1979_1995.demand_heat_rehab
    )
    p_buildings_1996_2004.energy = (
        p_buildings_1996_2004.demand_heat_nonrehab
        + p_buildings_1996_2004.demand_heat_rehab
    )
    p_buildings_2005_2011.energy = (
        p_buildings_2005_2011.demand_heat_nonrehab
        + p_buildings_2005_2011.demand_heat_rehab
    )
    p_buildings_2011_today.energy = (
        p_buildings_2011_today.demand_heat_nonrehab
        + p_buildings_2011_today.demand_heat_rehab
    )

    p_buildings_total.fec_factor_averaged = div(
        p_buildings_total.demand_heat_rehab + p_buildings_total.demand_heat_nonrehab,
        r18.p_buildings_total.area_m2,
    )

    p_buildings_until_1919.fec_factor_averaged = div(
        p_buildings_until_1919.demand_heat_rehab
        + p_buildings_until_1919.demand_heat_nonrehab,
        p_buildings_until_1919.area_m2,
    )
    p_buildings_1919_1948.fec_factor_averaged = div(
        p_buildings_1919_1948.demand_heat_rehab
        + p_buildings_1919_1948.demand_heat_nonrehab,
        p_buildings_1919_1948.area_m2,
    )
    p_buildings_1949_1978.fec_factor_averaged = div(
        p_buildings_1949_1978.demand_heat_rehab
        + p_buildings_1949_1978.demand_heat_nonrehab,
        p_buildings_1949_1978.area_m2,
    )
    p_buildings_1979_1995.fec_factor_averaged = div(
        p_buildings_1979_1995.demand_heat_rehab
        + p_buildings_1979_1995.demand_heat_nonrehab,
        p_buildings_1979_1995.area_m2,
    )
    p_buildings_1996_2004.fec_factor_averaged = div(
        p_buildings_1996_2004.demand_heat_rehab
        + p_buildings_1996_2004.demand_heat_nonrehab,
        p_buildings_1996_2004.area_m2,
    )
    p_buildings_2005_2011.fec_factor_averaged = div(
        p_buildings_2005_2011.demand_heat_rehab
        + p_buildings_2005_2011.demand_heat_nonrehab,
        r18.p_buildings_2005_2011.area_m2,
    )
    p_buildings_2011_today.fec_factor_averaged = div(
        p_buildings_2011_today.demand_heat_rehab
        + p_buildings_2011_today.demand_heat_nonrehab,
        r18.p_buildings_2011_today.area_m2,
    )

    p_buildings_area_m2_com.fec_factor_averaged = p_buildings_total.fec_factor_averaged
    p_buildings_new.fec_factor_averaged = ass(
        "Ass_R_P_heat_consumption_new_building_2021"
    )

    p_buildings_area_m2_com.area_m2 = (
        p_buildings_total.area_m2 * r18.p_buildings_area_m2_com.pct_x
    )
    p_buildings_area_m2_com.energy = (
        p_buildings_area_m2_com.area_m2 * p_buildings_area_m2_com.fec_factor_averaged
    )
    p_buildings_new.energy = (
        p_buildings_new.area_m2 * p_buildings_new.fec_factor_averaged
    )

    p_buildings_total.energy = (
        p_buildings_until_1919.energy
        + p_buildings_1919_1948.energy
        + p_buildings_1949_1978.energy
        + p_buildings_1979_1995.energy
        + p_buildings_1996_2004.energy
        + p_buildings_2005_2011.energy
        + p_buildings_2011_today.energy
    )  # SUM(p_buildings_until_1919.energy:p_buildings_2011_today.energy)

    p_elec_elcon.demand_change = ass("Ass_R_D_fec_elec_elcon_change")
    p_elec_elcon.energy = r18.p_elec_elcon.energy * (1 + p_elec_elcon.demand_change)
    p_elec_elcon.demand_electricity = p_elec_elcon.energy

    p_buildings_area_m2_com.pct_x = r18.p_buildings_area_m2_com.pct_x

    p_buildings_until_1919.pct_nonrehab = 1 - p_buildings_until_1919.pct_rehab
    p_buildings_1919_1948.pct_nonrehab = 1 - p_buildings_1919_1948.pct_rehab
    p_buildings_1949_1978.pct_nonrehab = 1 - p_buildings_1949_1978.pct_rehab
    p_buildings_1979_1995.pct_nonrehab = 1 - p_buildings_1979_1995.pct_rehab
    p_buildings_1996_2004.pct_nonrehab = 1 - p_buildings_1996_2004.pct_rehab

    p_buildings_total.number_of_buildings_rehab = (
        p_buildings_total.pct_rehab * r18.p_buildings_total.number_of_buildings
    )
    p_buildings_until_1919.number_of_buildings_rehab = (
        p_buildings_until_1919.pct_rehab
        * r18.p_buildings_until_1919.number_of_buildings
    )
    p_buildings_1919_1948.number_of_buildings_rehab = (
        p_buildings_1919_1948.pct_rehab * r18.p_buildings_1919_1948.number_of_buildings
    )
    p_buildings_1949_1978.number_of_buildings_rehab = (
        p_buildings_1949_1978.pct_rehab * r18.p_buildings_1949_1978.number_of_buildings
    )
    p_buildings_1979_1995.number_of_buildings_rehab = (
        p_buildings_1979_1995.pct_rehab * r18.p_buildings_1979_1995.number_of_buildings
    )
    p_buildings_1996_2004.number_of_buildings_rehab = (
        p_buildings_1996_2004.pct_rehab * r18.p_buildings_1996_2004.number_of_buildings
    )
    p_buildings_2005_2011.number_of_buildings_rehab = (
        p_buildings_2005_2011.pct_rehab * r18.p_buildings_2005_2011.number_of_buildings
    )
    p_buildings_2011_today.number_of_buildings_rehab = (
        p_buildings_2011_today.pct_rehab
        * r18.p_buildings_2011_today.number_of_buildings
    )
    p_buildings_area_m2_com.number_of_buildings_rehab = (
        r18.p_buildings_area_m2_com.pct_x * p_buildings_total.number_of_buildings_rehab
    )

    p_buildings_until_1919.rate_rehab_pa = (
        p_buildings_until_1919.pct_rehab
        - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
    ) / duration_until_target_year
    p_buildings_1919_1948.rate_rehab_pa = (
        p_buildings_1919_1948.pct_rehab
        - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
    ) / duration_until_target_year
    p_buildings_1949_1978.rate_rehab_pa = (
        p_buildings_1949_1978.pct_rehab
        - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
    ) / duration_until_target_year
    p_buildings_1979_1995.rate_rehab_pa = (
        p_buildings_1979_1995.pct_rehab
        - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
    ) / duration_until_target_year
    p_buildings_1996_2004.rate_rehab_pa = (
        p_buildings_1996_2004.pct_rehab
        - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021")
    ) / duration_until_target_year

    ### S - Section ###

    # Definitions
    s = Vars9()
    s_fueloil = Vars10()
    s_lpg = Vars10()
    s_biomass = Vars10()
    s_coal = Vars10()
    s_petrol = Vars10()
    s_heatnet = Vars10()
    s_solarth = Vars11()
    s_heatpump = Vars12()
    s_gas = Vars13()
    s_elec_heating = Vars14()
    s_emethan = Vars15()
    s_elec = Vars14()

    s_gas.energy = 0

    # formula from e30 not still calc here
    s_solarth.area_ha_available = (
        (4 / 3)
        * (
            (
                entries.r_area_m2_1flat
                / 100
                * ass("Ass_E_P_local_pv_roof_area_building1")
                + entries.r_area_m2_2flat
                / 100
                * ass("Ass_E_P_local_pv_roof_area_building2")
                + entries.r_area_m2_3flat
                / 100
                * ass("Ass_E_P_local_pv_roof_area_building3")
                + entries.r_area_m2_dorm
                / 100
                * ass("Ass_E_P_local_pv_roof_area_buildingD")
            )
        )
        / 10000
    )
    s_solarth.area_ha_available_pct_of_action = ass("Ass_E_P_local_pv_roof_potential")
    s_solarth.energy_installable = (
        s_solarth.area_ha_available
        * s_solarth.area_ha_available_pct_of_action
        * ass("Ass_R_P_soltherm_specific_yield_per_sqm")
        * 10000
    )
    s_solarth.power_to_be_installed_pct = entries.h_solartherm_to_be_inst

    s_solarth.energy = max(
        div(
            r18.p_buildings_total.number_of_buildings,
            r18.p_buildings_total.number_of_buildings
            + b18.p_nonresi.number_of_buildings,
        )
        * s_solarth.energy_installable
        * s_solarth.power_to_be_installed_pct,
        r18.s_solarth.energy,
    )

    s_heatpump.energy = min(
        p_buildings_total.demand_heat_rehab - s_solarth.energy,
        (
            r18.p_buildings_total.energy
            - r18.s_biomass.energy
            - r18.s_heatnet.energy
            - r18.s_elec_heating.energy
        )
        * div(
            ass("Ass_R_P_heat_consumption_after_renovation_per_area"),
            r18.p_buildings_total.ratio_energy_to_m2,
        )
        - s_solarth.energy,
    )

    if (
        p_buildings_total.energy - s_solarth.energy - s_heatpump.energy
        < r18.s_biomass.energy + r18.s_heatnet.energy + r18.s_elec_heating.energy
    ):
        s_biomass.energy = r18.s_biomass.energy * div(
            p_buildings_total.energy - s_solarth.energy - s_heatpump.energy,
            r18.s_biomass.energy + r18.s_heatnet.energy + r18.s_elec_heating.energy,
        )
    else:
        s_biomass.energy = r18.s_biomass.energy

    p_elec_heatpump.demand_electricity = s_heatpump.energy / fact(
        "Fact_R_S_heatpump_mean_annual_performance_factor_all"
    )
    p_elec_heatpump.energy = p_elec_heatpump.demand_electricity
    p_vehicles.demand_change = ass("Ass_R_D_fec_vehicles_change")
    p_vehicles.energy = r18.p_vehicles.energy * (1 + p_vehicles.demand_change)
    p_other.energy = p_elec_heatpump.energy + p_elec_elcon.energy + p_vehicles.energy
    p.energy = p_buildings_total.energy + p_other.energy
    p_other.demand_electricity = (
        p_elec_heatpump.demand_electricity + p_elec_elcon.demand_electricity
    )  # SUM(p_elec_heatpump.demand_electricity:p_elec_elcon.demand_electricity)

    if (
        p_buildings_total.energy - s_solarth.energy - s_heatpump.energy
        < r18.s_biomass.energy + r18.s_heatnet.energy + r18.s_elec_heating.energy
    ):
        s_elec_heating.energy = r18.s_elec_heating.energy * div(
            p_buildings_total.energy - s_solarth.energy - s_heatpump.energy,
            r18.s_biomass.energy + r18.s_heatnet.energy + r18.s_elec_heating.energy,
        )
    else:
        s_elec_heating.energy = r18.s_elec_heating.energy

    p_buildings_total.demand_electricity = s_elec_heating.energy
    p.demand_electricity = (
        p_other.demand_electricity + p_buildings_total.demand_electricity
    )
    s_elec.energy = p.demand_electricity
    s.energy = p_buildings_total.energy + p_other.energy

    s_fueloil.energy = 0
    s_lpg.energy = 0
    s_coal.energy = 0
    s_petrol.energy = 0

    if (
        p_buildings_total.energy - s_solarth.energy - s_heatpump.energy
        < r18.s_biomass.energy + r18.s_heatnet.energy + r18.s_elec_heating.energy
    ):
        s_heatnet.energy = r18.s_heatnet.energy * div(
            p_buildings_total.energy - s_solarth.energy - s_heatpump.energy,
            r18.s_biomass.energy + r18.s_heatnet.energy + r18.s_elec_heating.energy,
        )
    else:
        s_heatnet.energy = r18.s_heatnet.energy

    sum_fueloil_to_heatpump_energy = (
        s_fueloil.energy
        + s_lpg.energy
        + s_biomass.energy
        + s_coal.energy
        + s_petrol.energy
        + s_heatnet.energy
        + s_solarth.energy
        + s_heatpump.energy
    )

    s_emethan.energy = max(
        0,
        p_buildings_total.energy
        - (sum_fueloil_to_heatpump_energy + s_elec_heating.energy),
    )

    s.demand_heat_nonrehab = p_buildings_total.demand_heat_nonrehab
    s.demand_heat_rehab = p_buildings_total.demand_heat_rehab

    s_fueloil.cost_fuel_per_MWh = ass("Ass_R_S_fueloil_energy_cost_factor_2035")
    s_lpg.cost_fuel_per_MWh = 0
    s_coal.cost_fuel_per_MWh = ass("Ass_R_S_coal_energy_cost_factor_2035")
    s_biomass.cost_fuel_per_MWh = 48  # €/MWh
    s_petrol.cost_fuel_per_MWh = 0
    s_heatnet.cost_fuel_per_MWh = 0
    s_solarth.cost_fuel_per_MWh = 0
    s_heatpump.cost_fuel_per_MWh = 0

    s_fueloil.cost_fuel = s_fueloil.energy * s_fueloil.cost_fuel_per_MWh / MILLION
    s_lpg.cost_fuel = s_lpg.energy * s_lpg.cost_fuel_per_MWh / MILLION
    s_biomass.cost_fuel = s_biomass.energy * s_biomass.cost_fuel_per_MWh / MILLION
    s_coal.cost_fuel = s_coal.energy * s_coal.cost_fuel_per_MWh / MILLION
    s_petrol.cost_fuel = s_petrol.energy * s_petrol.cost_fuel_per_MWh / MILLION
    s_heatnet.cost_fuel = s_heatnet.energy * s_heatnet.cost_fuel_per_MWh / MILLION
    s_solarth.cost_fuel = s_solarth.energy * s_solarth.cost_fuel_per_MWh / MILLION
    s_heatpump.cost_fuel = s_heatpump.energy * s_heatpump.cost_fuel_per_MWh / MILLION
    s_emethan.cost_fuel = 0
    s.cost_fuel = (
        s_fueloil.cost_fuel
        + s_lpg.cost_fuel
        + s_biomass.cost_fuel
        + s_coal.cost_fuel
        + s_petrol.cost_fuel
        + s_heatnet.cost_fuel
        + s_solarth.cost_fuel
    )  # SUM(s_fueloil.cost_fuel:s_solarth.cost_fuel)

    s_fueloil.CO2e_combustion_based_per_MWh = (
        r18.s_fueloil.CO2e_combustion_based_per_MWh
    )
    s_lpg.CO2e_combustion_based_per_MWh = r18.s_lpg.CO2e_combustion_based_per_MWh
    s_biomass.CO2e_combustion_based_per_MWh = (
        r18.s_biomass.CO2e_combustion_based_per_MWh
    )
    s_coal.CO2e_combustion_based_per_MWh = r18.s_coal.CO2e_combustion_based_per_MWh
    s_petrol.CO2e_combustion_based_per_MWh = r18.s_petrol.CO2e_combustion_based_per_MWh
    s_heatnet.CO2e_combustion_based_per_MWh = 0
    s_solarth.CO2e_combustion_based_per_MWh = 0
    s_heatpump.CO2e_combustion_based_per_MWh = 0
    s_gas.CO2e_combustion_based_per_MWh = r18.s_gas.CO2e_combustion_based_per_MWh

    s_emethan.CO2e_combustion_based_per_MWh = fact(
        "Fact_T_S_methan_EmFa_tank_wheel_2018"
    )
    s_elec.CO2e_combustion_based = 0
    s_fueloil.CO2e_combustion_based = (
        s_fueloil.energy * s_fueloil.CO2e_combustion_based_per_MWh
    )
    s_lpg.CO2e_combustion_based = s_lpg.energy * s_lpg.CO2e_combustion_based_per_MWh
    s_biomass.CO2e_combustion_based = (
        s_biomass.energy * s_biomass.CO2e_combustion_based_per_MWh
    )
    s_coal.CO2e_combustion_based = s_coal.energy * s_coal.CO2e_combustion_based_per_MWh
    s_petrol.CO2e_combustion_based = (
        s_petrol.energy * s_petrol.CO2e_combustion_based_per_MWh
    )
    s_heatnet.CO2e_combustion_based = (
        s_heatnet.energy * s_heatnet.CO2e_combustion_based_per_MWh
    )
    s_solarth.CO2e_combustion_based = (
        s_solarth.energy * s_solarth.CO2e_combustion_based_per_MWh
    )
    s_heatpump.CO2e_combustion_based = (
        s_heatpump.energy * s_heatpump.CO2e_combustion_based_per_MWh
    )
    s_gas.CO2e_combustion_based = s_gas.energy * s_gas.CO2e_combustion_based_per_MWh
    s_emethan.CO2e_combustion_based = (
        s_emethan.energy * s_emethan.CO2e_combustion_based_per_MWh
    )

    s.CO2e_combustion_based = (
        s_fueloil.CO2e_combustion_based
        + s_lpg.CO2e_combustion_based
        + s_biomass.CO2e_combustion_based
        + s_coal.CO2e_combustion_based
        + s_petrol.CO2e_combustion_based
        + s_heatnet.CO2e_combustion_based
        + s_solarth.CO2e_combustion_based
        + s_heatpump.CO2e_combustion_based
        + s_gas.CO2e_combustion_based
        + s_emethan.CO2e_combustion_based
        + s_elec.CO2e_combustion_based
    )

    s.change_energy_MWh = s.energy - r18.s.energy
    s_fueloil.change_energy_MWh = s_fueloil.energy - r18.s_fueloil.energy
    s_lpg.change_energy_MWh = s_lpg.energy - r18.s_lpg.energy
    s_biomass.change_energy_MWh = s_biomass.energy - r18.s_biomass.energy
    s_coal.change_energy_MWh = s_coal.energy - r18.s_coal.energy
    s_petrol.change_energy_MWh = s_petrol.energy - r18.s_petrol.energy
    s_heatnet.change_energy_MWh = s_heatnet.energy - r18.s_heatnet.energy
    s_solarth.change_energy_MWh = s_solarth.energy - r18.s_solarth.energy
    s_heatpump.change_energy_MWh = s_heatpump.energy - r18.s_heatpump.energy
    s_elec_heating.change_energy_MWh = s_elec_heating.energy - r18.s_elec_heating.energy
    s_emethan.change_energy_MWh = s_emethan.energy - 0
    s_elec.change_energy_MWh = s_elec.energy - r18.s_elec.energy

    p_buildings_total.change_energy_MWh = (
        p_buildings_total.energy - r18.p_buildings_total.energy
    )
    p_buildings_total.change_energy_pct = div(
        p_buildings_total.change_energy_MWh, r18.p_buildings_total.energy
    )

    s.change_energy_pct = div(s.change_energy_MWh, r18.s.energy)
    s_fueloil.change_energy_pct = div(s_fueloil.change_energy_MWh, r18.s_fueloil.energy)
    s_lpg.change_energy_pct = div(s_lpg.change_energy_MWh, r18.s_lpg.energy)
    s_biomass.change_energy_pct = div(s_biomass.change_energy_MWh, r18.s_biomass.energy)
    s_coal.change_energy_pct = div(s_coal.change_energy_MWh, r18.s_coal.energy)
    s_petrol.change_energy_pct = div(s_petrol.change_energy_MWh, r18.s_petrol.energy)
    s_heatnet.change_energy_pct = div(s_heatnet.change_energy_MWh, r18.s_heatnet.energy)
    s_solarth.change_energy_pct = div(s_solarth.change_energy_MWh, r18.s_solarth.energy)
    s_heatpump.change_energy_pct = div(
        s_heatpump.change_energy_MWh, r18.s_heatpump.energy
    )
    s_elec.change_energy_pct = div(s_elec.change_energy_MWh, r18.s_elec.energy)
    s_elec_heating.change_energy_pct = div(
        s_elec_heating.change_energy_MWh, r18.s_elec_heating.energy
    )
    s_emethan.change_energy_pct = div(s_emethan.change_energy_MWh, r18.s_gas.energy)

    s.change_CO2e_t = s.CO2e_combustion_based - r18.s.CO2e_combustion_based
    s_fueloil.change_CO2e_t = (
        s_fueloil.CO2e_combustion_based - r18.s_fueloil.CO2e_combustion_based
    )
    s_lpg.change_CO2e_t = s_lpg.CO2e_combustion_based - r18.s_lpg.CO2e_combustion_based
    s_biomass.change_CO2e_t = (
        s_biomass.CO2e_combustion_based - r18.s_biomass.CO2e_combustion_based
    )
    s_coal.change_CO2e_t = (
        s_coal.CO2e_combustion_based - r18.s_coal.CO2e_combustion_based
    )
    s_petrol.change_CO2e_t = (
        s_petrol.CO2e_combustion_based - r18.s_petrol.CO2e_combustion_based
    )

    # not set in r18
    r18.s_heatnet.CO2e_combustion_based = (
        r18.s_solarth.CO2e_combustion_based
    ) = r18.s_heatpump.CO2e_combustion_based = 0
    s_heatnet.change_CO2e_t = (
        s_heatnet.CO2e_combustion_based - r18.s_heatnet.CO2e_combustion_based
    )
    s_solarth.change_CO2e_t = (
        s_solarth.CO2e_combustion_based - r18.s_solarth.CO2e_combustion_based
    )

    s_elec_heating.change_CO2e_t = 0
    s_emethan.change_CO2e_t = s_emethan.CO2e_combustion_based - 0
    s_heatpump.change_CO2e_t = (
        s_heatpump.CO2e_combustion_based - r18.s_heatpump.CO2e_combustion_based
    )

    s_fueloil.CO2e_total_2021_estimated = r18.s_fueloil.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_lpg.CO2e_total_2021_estimated = r18.s_lpg.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_biomass.CO2e_total_2021_estimated = r18.s_biomass.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_coal.CO2e_total_2021_estimated = r18.s_coal.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_petrol.CO2e_total_2021_estimated = r18.s_petrol.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_heatnet.CO2e_total_2021_estimated = r18.s_heatnet.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_solarth.CO2e_total_2021_estimated = r18.s_solarth.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_heatpump.CO2e_total_2021_estimated = r18.s_heatpump.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_gas.CO2e_total_2021_estimated = r18.s_gas.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_emethan.CO2e_total_2021_estimated = 0 * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )

    s.CO2e_total_2021_estimated = r18.s.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )

    s_fueloil.CO2e_production_based = 0
    s_lpg.CO2e_production_based = 0
    s_biomass.CO2e_production_based = 0
    s_coal.CO2e_production_based = 0
    s_petrol.CO2e_production_based = 0
    s_heatnet.CO2e_production_based = 0
    s_solarth.CO2e_production_based = 0
    s_heatpump.CO2e_production_based = 0

    s_fueloil.cost_climate_saved = (
        (
            s_fueloil.CO2e_total_2021_estimated
            - (s_fueloil.CO2e_production_based + s_fueloil.CO2e_combustion_based)
        )
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )

    s_lpg.cost_climate_saved = (
        (
            s_lpg.CO2e_total_2021_estimated
            - (s_lpg.CO2e_production_based + s_lpg.CO2e_combustion_based)
        )
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )

    s_biomass.cost_climate_saved = (
        (
            s_biomass.CO2e_total_2021_estimated
            - (s_biomass.CO2e_production_based + s_biomass.CO2e_combustion_based)
        )
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )

    s_coal.cost_climate_saved = (
        (
            s_coal.CO2e_total_2021_estimated
            - (s_coal.CO2e_production_based + s_coal.CO2e_combustion_based)
        )
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )

    s_petrol.cost_climate_saved = (
        (
            s_petrol.CO2e_total_2021_estimated
            - (s_petrol.CO2e_production_based + s_petrol.CO2e_combustion_based)
        )
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )

    s_heatnet.cost_climate_saved = (
        (
            s_heatnet.CO2e_total_2021_estimated
            - (s_heatnet.CO2e_production_based + s_heatnet.CO2e_combustion_based)
        )
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )

    s_solarth.cost_climate_saved = (
        (
            s_solarth.CO2e_total_2021_estimated
            - (s_solarth.CO2e_production_based + s_solarth.CO2e_combustion_based)
        )
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )

    s_heatpump.cost_climate_saved = (
        (
            s_heatpump.CO2e_total_2021_estimated
            - (s_heatpump.CO2e_production_based + s_heatpump.CO2e_combustion_based)
        )
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )

    s_gas.cost_climate_saved = (
        (s_gas.CO2e_total_2021_estimated - (0 + s_gas.CO2e_combustion_based))
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )

    s_emethan.cost_climate_saved = (
        (s_emethan.CO2e_total_2021_estimated - s_emethan.CO2e_combustion_based)
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )
    s_elec_heating.cost_climate_saved = 0

    s.cost_climate_saved = (
        (s.CO2e_total_2021_estimated - s.CO2e_combustion_based)
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )

    s.change_cost_energy = s.cost_fuel - r18.s.cost_fuel
    s_fueloil.change_cost_energy = s_fueloil.cost_fuel - r18.s_fueloil.cost_fuel
    s_lpg.change_cost_energy = s_lpg.cost_fuel - r18.s_lpg.cost_fuel
    s_biomass.change_cost_energy = s_biomass.cost_fuel - r18.s_biomass.cost_fuel
    s_coal.change_cost_energy = s_coal.cost_fuel - r18.s_coal.cost_fuel
    s_petrol.change_cost_energy = s_petrol.cost_fuel - r18.s_petrol.cost_fuel
    s_heatnet.change_cost_energy = s_heatnet.cost_fuel - r18.s_heatnet.cost_fuel
    s_solarth.change_cost_energy = s_solarth.cost_fuel - r18.s_solarth.cost_fuel
    s_heatpump.change_cost_energy = s_heatpump.cost_fuel - r18.s_heatpump.cost_fuel
    s_gas.change_cost_energy = 0 - r18.s_gas.cost_fuel  # no more gas in target year
    s_emethan.change_cost_energy = s_emethan.cost_fuel - 0  # no emethan in 2018

    p_buildings_until_1919.invest_per_x = fact(
        "Fact_R_P_energetical_renovation_cost_detached_house_until_1949"
    ) * div(
        entries.r_area_m2_1flat + entries.r_area_m2_2flat, entries.r_area_m2
    ) + fact(
        "Fact_R_P_energetical_renovation_cost_apartm_building_until_1949"
    ) * div(
        entries.r_area_m2_3flat + entries.r_area_m2_dorm, entries.r_area_m2
    )

    p_buildings_1919_1948.invest_per_x = p_buildings_until_1919.invest_per_x
    p_buildings_1949_1978.invest_per_x = fact(
        "Fact_R_P_energetical_renovation_cost_detached_house_1949_1979"
    ) * div(
        entries.r_area_m2_1flat + entries.r_area_m2_2flat, entries.r_area_m2
    ) + fact(
        "Fact_R_P_energetical_renovation_cost_apartm_building_1949_1979"
    ) * div(
        entries.r_area_m2_3flat + entries.r_area_m2_dorm, entries.r_area_m2
    )

    p_buildings_1979_1995.invest_per_x = fact(
        "Fact_R_P_energetical_renovation_cost_detached_house_1980+"
    ) * div(
        entries.r_area_m2_1flat + entries.r_area_m2_2flat, entries.r_area_m2
    ) + fact(
        "Fact_R_P_energetical_renovation_cost_apartm_building_1980+"
    ) * div(
        entries.r_area_m2_3flat + entries.r_area_m2_dorm, entries.r_area_m2
    )
    p_buildings_1996_2004.invest_per_x = p_buildings_1979_1995.invest_per_x
    p_buildings_area_m2_com.invest_per_x = fact(
        "Fact_R_P_energetical_renovation_cost_housing_complex"
    )
    s_solarth.invest_per_x = ass("Ass_R_P_soltherm_cost_per_sqm")
    s_heatpump.invest_per_x = fact("Fact_R_S_heatpump_cost")

    s_solarth.invest = (
        div(
            r18.p_buildings_total.area_m2,
            r18.p_buildings_total.area_m2 + b18.p_nonresi.area_m2,
        )
        * s_solarth.area_ha_available
        * entries.h_solartherm_to_be_inst
        * s_solarth.invest_per_x
        * 10000
    )

    p_buildings_until_1919.invest = (
        p_buildings_until_1919.area_m2_rehab
        * (1 - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021"))
        * p_buildings_until_1919.invest_per_x
    )
    p_buildings_1919_1948.invest = (
        p_buildings_1919_1948.area_m2_rehab
        * (1 - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021"))
        * p_buildings_1919_1948.invest_per_x
    )
    p_buildings_1949_1978.invest = (
        p_buildings_1949_1978.area_m2_rehab
        * (1 - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021"))
        * p_buildings_1949_1978.invest_per_x
    )
    p_buildings_1979_1995.invest = (
        p_buildings_1979_1995.area_m2_rehab
        * (1 - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021"))
        * p_buildings_1979_1995.invest_per_x
    )
    p_buildings_1996_2004.invest = (
        p_buildings_1996_2004.area_m2_rehab
        * (1 - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021"))
        * p_buildings_1996_2004.invest_per_x
    )

    s_heatpump.full_load_hour = fact("Fact_R_S_fhou")
    s_heatpump.power_installed = div(r18.s_heatpump.energy, s_heatpump.full_load_hour)
    s_heatpump.power_to_be_installed = (
        p_buildings_total.area_m2_rehab
        * ass("Ass_R_S_heating_power_renovated")
        / MILLION
        - s_heatpump.power_installed
    )
    s_heatpump.invest = (
        s_heatpump.invest_per_x * s_heatpump.power_to_be_installed * 1000
    )

    p_buildings_total.invest = (
        p_buildings_until_1919.invest
        + p_buildings_1919_1948.invest
        + p_buildings_1949_1978.invest
        + p_buildings_1979_1995.invest
        + p_buildings_1996_2004.invest
    )  # SUM(p_buildings_until_1919.invest:p_buildings_1996_2004.invest)
    p_buildings_total.cost_mro = 0

    s.invest = s_solarth.invest + s_heatpump.invest

    s_solarth.invest_pa = s_solarth.invest / duration_until_target_year
    s_heatpump.invest_pa = s_heatpump.invest / duration_until_target_year

    s_solarth.pct_of_wage = fact("Fact_B_P_renovations_ratio_wage_to_main_revenue_2018")
    s_heatpump.pct_of_wage = fact(
        "Fact_B_P_renovations_ratio_wage_to_main_revenue_2018"
    )
    p_buildings_total.pct_of_wage = fact(
        "Fact_B_P_renovations_ratio_wage_to_main_revenue_2018"
    )

    s_solarth.cost_wage = s_solarth.invest_pa * s_solarth.pct_of_wage
    s_heatpump.cost_wage = s_heatpump.invest_pa * s_heatpump.pct_of_wage
    p_buildings_total.cost_wage = (
        p_buildings_total.invest
        / duration_until_target_year
        * p_buildings_total.pct_of_wage
    )

    s_solarth.ratio_wage_to_emplo = fact(
        "Fact_B_P_heating_wage_per_person_per_year_2018"
    )
    s_heatpump.ratio_wage_to_emplo = fact(
        "Fact_B_P_heating_wage_per_person_per_year_2018"
    )
    p_buildings_total.ratio_wage_to_emplo = fact(
        "Fact_B_P_renovations_wage_per_person_per_year_2018"
    )

    s_solarth.demand_emplo = div(s_solarth.cost_wage, s_solarth.ratio_wage_to_emplo)
    s_heatpump.demand_emplo = div(s_heatpump.cost_wage, s_heatpump.ratio_wage_to_emplo)
    s.demand_emplo = s_solarth.demand_emplo + s_heatpump.demand_emplo
    p_buildings_total.demand_emplo = div(
        p_buildings_total.cost_wage, p_buildings_total.ratio_wage_to_emplo
    )
    s_solarth.emplo_existing = (
        fact("Fact_B_P_install_heating_emplo_2018")
        * population_commune_2018
        / population_germany_2018
        * ass("Ass_B_D_install_heating_emplo_pct_of_R_solarth")
    )
    s_heatpump.emplo_existing = (
        fact("Fact_B_P_install_heating_emplo_2018")
        * population_commune_2018
        / population_germany_2018
        * ass("Ass_B_D_install_heating_emplo_pct_of_R_heatpump")
    )

    p_buildings_total.emplo_existing = (
        fact("Fact_B_P_renovation_emplo_2018")
        * ass("Ass_B_D_renovation_emplo_pct_of_R")
        * population_commune_2018
        / population_germany_2018
    )
    p_buildings_total.demand_emplo_new = max(
        0, p_buildings_total.demand_emplo - p_buildings_total.emplo_existing
    )
    s_solarth.demand_emplo_new = max(
        0, s_solarth.demand_emplo - s_solarth.emplo_existing
    )
    s_heatpump.demand_emplo_new = max(
        0, s_heatpump.demand_emplo - s_heatpump.emplo_existing
    )
    s.demand_emplo_new = s_solarth.demand_emplo_new + s_heatpump.demand_emplo_new

    # s_solarth.base_unit € / qm
    # s_heatpump.base_unit € / kW

    p_buildings_area_m2_com.invest_com = (
        (
            p_buildings_until_1919.area_m2_rehab
            + p_buildings_1919_1948.area_m2_rehab
            + p_buildings_1949_1978.area_m2_rehab
            + p_buildings_1979_1995.area_m2_rehab
            + p_buildings_1996_2004.area_m2_rehab
        )
        * (1 - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021"))
        * r18.p_buildings_area_m2_com.pct_x
        * p_buildings_area_m2_com.invest_per_x
    )
    p_buildings_total.invest_com = p_buildings_area_m2_com.invest_com

    s_solarth.invest_com = s_solarth.invest * entries.r_pct_of_area_m2_com
    s_heatpump.invest_com = s_heatpump.invest * entries.r_pct_of_area_m2_com
    s.invest_com = s_solarth.invest_com + s_heatpump.invest_com

    p_buildings_total.invest_pa_com = (
        p_buildings_total.invest_com / duration_until_target_year
    )
    s_solarth.invest_pa_com = s_solarth.invest_com / duration_until_target_year
    s_heatpump.invest_pa_com = s_heatpump.invest_com / duration_until_target_year

    s_gas.cost_fuel_per_MWh = ass("Ass_R_S_gas_energy_cost_factor_2035")
    s_gas.cost_fuel = s_gas.energy * s_gas.cost_fuel_per_MWh / MILLION
    s_gas.change_energy_MWh = s_gas.energy - r18.s_gas.energy
    s_gas.change_energy_pct = div(s_gas.change_energy_MWh, r18.s_gas.energy)
    s_gas.change_CO2e_t = s_gas.CO2e_combustion_based - r18.s_gas.CO2e_combustion_based
    s_gas.change_cost_energy = s_gas.cost_fuel - r18.s_gas.cost_fuel
    p_buildings_total.invest_pa = p_buildings_total.invest / duration_until_target_year

    general = energy_general.calc_general(entries, facts, assumptions)

    p.demand_heatnet = s_heatnet.energy
    p.demand_biomass = s_biomass.energy
    p.demand_solarth = s_solarth.energy
    p.demand_heatpump = s_heatpump.energy
    p.demand_emethan = s_emethan.energy
    p.change_energy_MWh = p.energy - r18.p.energy
    p.change_energy_pct = div(p.change_energy_MWh, r18.p.energy)
    p.invest_pa = p_buildings_total.invest_pa
    p.invest_pa_com = p_buildings_total.invest_pa_com
    p.invest = p_buildings_total.invest
    p.invest_com = p_buildings_total.invest_com
    p.invest_com = p_buildings_total.invest_com
    p.cost_wage = p_buildings_total.cost_wage
    p.demand_emplo = p_buildings_total.demand_emplo
    p.demand_emplo_new = p_buildings_total.demand_emplo_new
    p.demand_emplo_new = p_buildings_total.demand_emplo_new
    p_buildings_until_1919.change_energy_MWh = (
        p_buildings_until_1919.energy - r18.p_buildings_until_1919.energy
    )
    p_buildings_until_1919.change_energy_pct = div(
        p_buildings_until_1919.change_energy_MWh, r18.p_buildings_until_1919.energy
    )
    p_buildings_1919_1948.change_energy_MWh = (
        p_buildings_1919_1948.energy - r18.p_buildings_1919_1948.energy
    )
    p_buildings_1919_1948.change_energy_pct = div(
        p_buildings_1919_1948.change_energy_MWh, r18.p_buildings_1919_1948.energy
    )
    p_buildings_1949_1978.change_energy_MWh = (
        p_buildings_1949_1978.energy - r18.p_buildings_1949_1978.energy
    )
    p_buildings_1949_1978.change_energy_pct = div(
        p_buildings_1949_1978.change_energy_MWh, r18.p_buildings_1949_1978.energy
    )
    p_buildings_1979_1995.change_energy_MWh = (
        p_buildings_1979_1995.energy - r18.p_buildings_1979_1995.energy
    )
    p_buildings_1979_1995.change_energy_pct = div(
        p_buildings_1979_1995.change_energy_MWh, r18.p_buildings_1979_1995.energy
    )
    p_buildings_1996_2004.change_energy_MWh = (
        p_buildings_1996_2004.energy - r18.p_buildings_1996_2004.energy
    )
    p_buildings_1996_2004.change_energy_pct = div(
        p_buildings_1996_2004.change_energy_MWh, r18.p_buildings_1996_2004.energy
    )
    p_buildings_2005_2011.change_energy_MWh = (
        p_buildings_2005_2011.energy - r18.p_buildings_2005_2011.energy
    )
    p_buildings_2005_2011.change_energy_pct = div(
        p_buildings_2005_2011.change_energy_MWh, r18.p_buildings_2005_2011.energy
    )
    p_buildings_2011_today.change_energy_MWh = (
        p_buildings_2011_today.energy - r18.p_buildings_2011_today.energy
    )
    p_buildings_2011_today.change_energy_pct = div(
        p_buildings_2011_today.change_energy_MWh, r18.p_buildings_2011_today.energy
    )
    p_buildings_area_m2_com.change_energy_MWh = (
        p_buildings_area_m2_com.energy - r18.p_buildings_area_m2_com.energy
    )
    p_buildings_area_m2_com.change_energy_pct = div(
        p_buildings_area_m2_com.change_energy_MWh, r18.p_buildings_area_m2_com.energy
    )
    p_buildings_area_m2_com.invest_per_x = fact(
        "Fact_R_P_energetical_renovation_cost_housing_complex"
    )
    p_buildings_area_m2_com.invest = (
        (
            p_buildings_until_1919.area_m2_rehab
            + p_buildings_1919_1948.area_m2_rehab
            + p_buildings_1949_1978.area_m2_rehab
            + p_buildings_1979_1995.area_m2_rehab
            + p_buildings_1996_2004.area_m2_rehab
        )
        * (1 - fact("Fact_R_P_ratio_renovated_buildings to_not_renovated_2021"))
        * r18.p_buildings_area_m2_com.pct_x
        * p_buildings_area_m2_com.invest_per_x
    )
    p_buildings_area_m2_com.invest_com = p_buildings_area_m2_com.invest
    p_buildings_area_m2_com.invest_pa = (
        p_buildings_area_m2_com.invest / duration_until_target_year
    )
    p_buildings_area_m2_com.invest_pa_com = (
        p_buildings_area_m2_com.invest_com / duration_until_target_year
    )
    p_buildings_area_m2_com.invest_pa = (
        p_buildings_area_m2_com.invest / duration_until_target_year
    )
    p_buildings_area_m2_com.invest_pa_com = (
        p_buildings_area_m2_com.invest_com / duration_until_target_year
    )
    p_buildings_area_m2_com.invest_pa_com = (
        p_buildings_area_m2_com.invest_com / duration_until_target_year
    )
    p_buildings_new.change_energy_MWh = p_buildings_new.energy - 0
    p_other.change_energy_MWh = p_other.energy - r18.p_other.energy
    p_other.change_energy_pct = div(p_other.change_energy_MWh, r18.p_other.energy)
    p_elec_heatpump.demand_change = (
        div(p_elec_heatpump.energy, r18.p_elec_heatpump.energy) - 1
    )
    p_elec_heatpump.change_energy_MWh = (
        p_elec_heatpump.energy - r18.p_elec_heatpump.energy
    )
    p_elec_heatpump.change_energy_pct = div(
        p_elec_heatpump.change_energy_MWh, r18.p_elec_heatpump.energy
    )
    p_elec_elcon.change_energy_MWh = p_elec_elcon.energy - r18.p_elec_elcon.energy
    p_elec_elcon.change_energy_pct = div(
        p_elec_elcon.change_energy_MWh, r18.p_elec_elcon.energy
    )
    p_vehicles.change_energy_MWh = p_vehicles.energy - r18.p_vehicles.energy
    p_vehicles.change_energy_pct = div(
        p_vehicles.change_energy_MWh, r18.p_vehicles.energy
    )
    s_fueloil.CO2e_total = s_fueloil.CO2e_combustion_based
    s.CO2e_total_2021_estimated = r18.s.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s.change_CO2e_pct = div(s.change_CO2e_t, r18.s.CO2e_combustion_based)
    s.invest_pa = s_solarth.invest_pa + s_heatpump.invest_pa
    s.invest_pa_com = s_solarth.invest_pa_com + s_heatpump.invest_pa_com
    s.cost_wage = s_solarth.cost_wage + s_heatpump.cost_wage
    s.emplo_existing = s_solarth.emplo_existing + s_heatpump.emplo_existing
    s_lpg.CO2e_total = s_lpg.CO2e_combustion_based
    s_fueloil.CO2e_total_2021_estimated = r18.s_fueloil.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_fueloil.change_CO2e_pct = div(
        s_fueloil.change_CO2e_t, r18.s_fueloil.CO2e_combustion_based
    )
    s_biomass.CO2e_total = s_biomass.CO2e_combustion_based
    s_lpg.CO2e_total_2021_estimated = r18.s_lpg.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_lpg.change_CO2e_pct = div(s_lpg.change_CO2e_t, r18.s_lpg.CO2e_combustion_based)
    s_coal.CO2e_total = s_coal.CO2e_combustion_based
    s_biomass.CO2e_total_2021_estimated = r18.s_biomass.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_biomass.change_CO2e_pct = div(
        s_biomass.change_CO2e_t, r18.s_biomass.CO2e_combustion_based
    )
    s_petrol.CO2e_total = s_petrol.CO2e_combustion_based
    s_coal.CO2e_total_2021_estimated = r18.s_coal.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_coal.change_CO2e_pct = div(s_coal.change_CO2e_t, r18.s_coal.CO2e_combustion_based)
    s_heatnet.CO2e_total = s_heatnet.CO2e_combustion_based
    s_petrol.CO2e_total_2021_estimated = r18.s_petrol.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_petrol.change_CO2e_pct = div(
        s_petrol.change_CO2e_t, r18.s_petrol.CO2e_combustion_based
    )
    s_solarth.CO2e_total = s_solarth.CO2e_combustion_based
    s_heatnet.CO2e_total_2021_estimated = r18.s_heatnet.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_heatpump.CO2e_total = s_heatpump.CO2e_combustion_based
    s_solarth.CO2e_total_2021_estimated = r18.s_solarth.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_gas.CO2e_total = s_gas.CO2e_combustion_based
    s_heatpump.CO2e_total_2021_estimated = r18.s_heatpump.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_emethan.CO2e_total = s_emethan.CO2e_combustion_based
    s_gas.CO2e_total_2021_estimated = r18.s_gas.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_gas.change_CO2e_pct = div(s_gas.change_CO2e_t, r18.s_gas.CO2e_combustion_based)
    s_elec.CO2e_total = s_elec.CO2e_combustion_based
    s_emethan.CO2e_total_2021_estimated = 0 * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_elec.CO2e_combustion_based_per_MWh = r18.s_elec.CO2e_combustion_based_per_MWh
    s.CO2e_total = (
        s_fueloil.CO2e_total
        + s_lpg.CO2e_total
        + s_biomass.CO2e_total
        + s_coal.CO2e_total
        + s_petrol.CO2e_total
        + s_heatnet.CO2e_total
        + s_solarth.CO2e_total
        + s_heatpump.CO2e_total
        + s_gas.CO2e_total
        + s_emethan.CO2e_total
        + s_elec.CO2e_total
    )
    s_elec.CO2e_total_2021_estimated = r18.s_elec.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_elec.change_CO2e_t = (
        s_elec.CO2e_combustion_based - r18.s_elec.CO2e_combustion_based
    )
    s_elec.CO2e_total_2021_estimated = r18.s_elec.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
    )
    s_elec.cost_climate_saved = (
        (s_elec.CO2e_total_2021_estimated - s_elec.CO2e_combustion_based)
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )
    s_elec.change_cost_energy = 0
    s_elec_heating.CO2e_combustion_based_per_MWh = (
        r18.s_elec_heating.CO2e_combustion_based_per_MWh
    )
    s_elec_heating.CO2e_combustion_based_per_MWh = (
        r18.s_elec_heating.CO2e_combustion_based_per_MWh
    )
    s_elec_heating.CO2e_combustion_based = (
        s_elec_heating.energy * s_elec_heating.CO2e_combustion_based_per_MWh
    )
    s_elec_heating.CO2e_total = s_elec_heating.CO2e_combustion_based
    s_elec_heating.CO2e_total_2021_estimated = (
        r18.s_elec_heating.CO2e_combustion_based
        * fact("Fact_M_CO2e_wo_lulucf_2021_vs_year_ref")
    )
    s_elec_heating.CO2e_total_2021_estimated = (
        r18.s_elec_heating.CO2e_combustion_based
        * fact("Fact_M_CO2e_wo_lulucf_2021_vs_year_ref")
    )
    s_elec_heating.change_cost_energy = 0 - r18.s_elec_heating.cost_fuel

    r.CO2e_combustion_based = s.CO2e_combustion_based
    r.CO2e_total = s.CO2e_total
    r.change_energy_MWh = s.change_energy_MWh
    r.change_energy_pct = s.change_energy_pct
    r.change_CO2e_t = s.change_CO2e_t
    r.change_CO2e_pct = s.change_CO2e_pct
    r.CO2e_total_2021_estimated = s.CO2e_total_2021_estimated
    r.cost_climate_saved = s.cost_climate_saved
    r.invest_pa = general.g.invest_pa + p.invest_pa + s.invest_pa

    r.invest_pa_com = general.g.invest_pa_com + p.invest_pa_com + s.invest_pa_com

    r.invest = general.g.invest + p.invest + s.invest
    r.invest_com = general.g.invest_com + p.invest_com + s.invest_com

    r.cost_wage = general.g.cost_wage + p.cost_wage + s.cost_wage
    r.demand_emplo = general.g.demand_emplo + p.demand_emplo + s.demand_emplo
    r.demand_emplo_new = (
        general.g.demand_emplo_new + p.demand_emplo_new + s.demand_emplo_new
    )

    r.demand_emplo_com = general.g.demand_emplo_com

    p_buildings_area_m2_com.invest_pa = (
        p_buildings_area_m2_com.invest / duration_until_target_year
    )
    p_buildings_until_1919.invest_pa = (
        p_buildings_until_1919.invest / duration_until_target_year
    )
    p_buildings_1919_1948.invest_pa = (
        p_buildings_1919_1948.invest / duration_until_target_year
    )
    p_buildings_1949_1978.invest_pa = (
        p_buildings_1949_1978.invest / duration_until_target_year
    )
    p_buildings_1979_1995.invest_pa = (
        p_buildings_1979_1995.invest / duration_until_target_year
    )
    p_buildings_1996_2004.invest_pa = (
        p_buildings_1996_2004.invest / duration_until_target_year
    )

    s_emethan.change_CO2e_pct = div(
        s_emethan.change_CO2e_t, 0
    )  # r18.s_emethan.CO2e_total)
    s_heatnet.change_CO2e_pct = div(s_heatnet.change_CO2e_t, r18.s_heatnet.CO2e_total)
    s_solarth.change_CO2e_pct = div(s_solarth.change_CO2e_t, r18.s_solarth.CO2e_total)
    s_heatpump.change_CO2e_pct = div(
        s_heatpump.change_CO2e_t, r18.s_heatpump.CO2e_total
    )
    s_elec.change_CO2e_pct = div(s_elec.change_CO2e_t, r18.s_elec.CO2e_total)
    s_elec_heating.change_CO2e_pct = div(
        s_elec_heating.change_CO2e_t, r18.s_elec_heating.CO2e_total
    )

    return R30(
        g=general.g,
        p=p,
        r=r,
        g_consult=general.g_consult,
        p_buildings_total=p_buildings_total,
        p_buildings_until_1919=p_buildings_until_1919,
        p_buildings_1919_1948=p_buildings_1919_1948,
        p_buildings_1949_1978=p_buildings_1949_1978,
        p_buildings_1979_1995=p_buildings_1979_1995,
        p_buildings_1996_2004=p_buildings_1996_2004,
        p_buildings_2005_2011=p_buildings_2005_2011,
        p_buildings_2011_today=p_buildings_2011_today,
        p_buildings_new=p_buildings_new,
        p_buildings_area_m2_com=p_buildings_area_m2_com,
        p_elec_elcon=p_elec_elcon,
        p_elec_heatpump=p_elec_heatpump,
        p_other=p_other,
        p_vehicles=p_vehicles,
        s=s,
        s_fueloil=s_fueloil,
        s_lpg=s_lpg,
        s_biomass=s_biomass,
        s_coal=s_coal,
        s_petrol=s_petrol,
        s_heatnet=s_heatnet,
        s_solarth=s_solarth,
        s_heatpump=s_heatpump,
        s_elec_heating=s_elec_heating,
        s_gas=s_gas,
        s_emethan=s_emethan,
        s_elec=s_elec,
    )
