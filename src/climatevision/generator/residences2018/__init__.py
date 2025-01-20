"""
Documentation:
https://localzero-generator.readthedocs.io/de/latest/sectors/hh_ghd.html
"""

# pyright: strict

from ..makeentries import Entries
from ..refdata import Facts
from ..utils import div, MILLION
from ..common.energy import EnergyPerM2PctCommune

from .r18 import R18
from .dataclasses import Vars1, Vars2, Vars3, Vars4, Vars6, Vars7, Vars8, Vars9


def calc(entries: Entries, facts: Facts) -> R18:
    fact = facts.fact

    ### P - Section ###
    r = Vars1()
    p = Vars2()
    p_vehicles = Vars2()
    p_other = Vars2()

    p_buildings_until_1919 = Vars3(number_of_buildings=entries.r_buildings_until_1919)
    p_buildings_1919_1948 = Vars3(number_of_buildings=entries.r_buildings_1919_1948)
    p_buildings_1949_1978 = Vars3(number_of_buildings=entries.r_buildings_1949_1978)
    p_buildings_1979_1995 = Vars3(
        number_of_buildings=(
            entries.r_buildings_1979_1986
            + entries.r_buildings_1987_1990
            + entries.r_buildings_1991_1995
        )
    )
    p_buildings_1996_2004 = Vars3(
        number_of_buildings=(
            entries.r_buildings_1996_2000 + entries.r_buildings_2001_2004
        )
    )
    p_buildings_2005_2011 = Vars4(
        number_of_buildings=(
            entries.r_buildings_2005_2008 + entries.r_buildings_2009_2011
        )
    )
    p_buildings_2011_today = Vars4(number_of_buildings=entries.r_buildings_2011_today)

    p_buildings_total = Vars3(
        number_of_buildings=(
            p_buildings_until_1919.number_of_buildings
            + p_buildings_1919_1948.number_of_buildings
            + p_buildings_1949_1978.number_of_buildings
            + p_buildings_1979_1995.number_of_buildings
            + p_buildings_1996_2004.number_of_buildings
            + p_buildings_2005_2011.number_of_buildings
            + p_buildings_2011_today.number_of_buildings
        )
    )

    p_buildings_until_1919.relative_building_ratio = div(
        p_buildings_until_1919.number_of_buildings,
        p_buildings_total.number_of_buildings,
    )
    p_buildings_1919_1948.relative_building_ratio = div(
        p_buildings_1919_1948.number_of_buildings, p_buildings_total.number_of_buildings
    )
    p_buildings_1949_1978.relative_building_ratio = div(
        p_buildings_1949_1978.number_of_buildings, p_buildings_total.number_of_buildings
    )
    p_buildings_1979_1995.relative_building_ratio = div(
        p_buildings_1979_1995.number_of_buildings, p_buildings_total.number_of_buildings
    )
    p_buildings_1996_2004.relative_building_ratio = div(
        p_buildings_1996_2004.number_of_buildings, p_buildings_total.number_of_buildings
    )
    p_buildings_2005_2011.relative_building_ratio = div(
        p_buildings_2005_2011.number_of_buildings, p_buildings_total.number_of_buildings
    )
    p_buildings_2011_today.relative_building_ratio = div(
        p_buildings_2011_today.number_of_buildings,
        p_buildings_total.number_of_buildings,
    )

    p_buildings_total.relative_building_ratio = (
        p_buildings_until_1919.relative_building_ratio
        + p_buildings_1919_1948.relative_building_ratio
        + p_buildings_1949_1978.relative_building_ratio
        + p_buildings_1979_1995.relative_building_ratio
        + p_buildings_1996_2004.relative_building_ratio
        + p_buildings_2005_2011.relative_building_ratio
        + p_buildings_2011_today.relative_building_ratio
    )

    p_buildings_total.area_m2 = entries.r_area_m2
    p_buildings_until_1919.area_m2 = (
        p_buildings_until_1919.relative_building_ratio * p_buildings_total.area_m2
    )
    p_buildings_1919_1948.area_m2 = (
        p_buildings_1919_1948.relative_building_ratio * p_buildings_total.area_m2
    )
    p_buildings_1949_1978.area_m2 = (
        p_buildings_1949_1978.relative_building_ratio * p_buildings_total.area_m2
    )
    p_buildings_1979_1995.area_m2 = (
        p_buildings_1979_1995.relative_building_ratio * p_buildings_total.area_m2
    )
    p_buildings_1996_2004.area_m2 = (
        p_buildings_1996_2004.relative_building_ratio * p_buildings_total.area_m2
    )
    p_buildings_2005_2011.area_m2 = (
        p_buildings_2005_2011.relative_building_ratio * p_buildings_total.area_m2
    )
    p_buildings_2011_today.area_m2 = (
        p_buildings_2011_today.relative_building_ratio * p_buildings_total.area_m2
    )

    p_buildings_until_1919.fec_factor_BMWi = fact(
        "Fact_R_P_ratio_fec_to_area_until_1919_2014"
    )
    p_buildings_1919_1948.fec_factor_BMWi = fact(
        "Fact_R_P_ratio_fec_to_area_1919_1948_2014"
    )
    p_buildings_1949_1978.fec_factor_BMWi = fact(
        "Fact_R_P_ratio_fec_to_area_1949_1978_2014"
    )
    p_buildings_1979_1995.fec_factor_BMWi = fact(
        "Fact_R_P_ratio_fec_to_area_1979_1995_2014"
    )
    p_buildings_1996_2004.fec_factor_BMWi = fact(
        "Fact_R_P_ratio_fec_to_area_1996_2002_2014"
    )
    p_buildings_2005_2011.fec_factor_BMWi = fact(
        "Fact_R_P_ratio_fec_to_area_2003_2009_2014"
    )
    p_buildings_2011_today.fec_factor_BMWi = fact(
        "Fact_R_P_ratio_fec_to_area_2010_2014_2014"
    )

    p_buildings_until_1919.fec_after_BMWi = (
        p_buildings_until_1919.fec_factor_BMWi * p_buildings_until_1919.area_m2
    )
    p_buildings_1919_1948.fec_after_BMWi = (
        p_buildings_1919_1948.fec_factor_BMWi * p_buildings_1919_1948.area_m2
    )
    p_buildings_1949_1978.fec_after_BMWi = (
        p_buildings_1949_1978.fec_factor_BMWi * p_buildings_1949_1978.area_m2
    )
    p_buildings_1979_1995.fec_after_BMWi = (
        p_buildings_1979_1995.fec_factor_BMWi * p_buildings_1979_1995.area_m2
    )
    p_buildings_1996_2004.fec_after_BMWi = (
        p_buildings_1996_2004.fec_factor_BMWi * p_buildings_1996_2004.area_m2
    )
    p_buildings_2005_2011.fec_after_BMWi = (
        p_buildings_2005_2011.fec_factor_BMWi * p_buildings_2005_2011.area_m2
    )
    p_buildings_2011_today.fec_after_BMWi = (
        p_buildings_2011_today.fec_factor_BMWi * p_buildings_2011_today.area_m2
    )

    p_buildings_total.fec_after_BMWi = (
        p_buildings_until_1919.fec_after_BMWi
        + p_buildings_1919_1948.fec_after_BMWi
        + p_buildings_1949_1978.fec_after_BMWi
        + p_buildings_1979_1995.fec_after_BMWi
        + p_buildings_1996_2004.fec_after_BMWi
        + p_buildings_2005_2011.fec_after_BMWi
        + p_buildings_2011_today.fec_after_BMWi
    )
    p_buildings_total.fec_factor_BMWi = div(
        p_buildings_total.fec_after_BMWi, p_buildings_total.area_m2
    )

    p_buildings_until_1919.relative_heat_ratio_BMWi = div(
        p_buildings_until_1919.fec_after_BMWi, p_buildings_total.fec_after_BMWi
    )
    p_buildings_1919_1948.relative_heat_ratio_BMWi = div(
        p_buildings_1919_1948.fec_after_BMWi, p_buildings_total.fec_after_BMWi
    )
    p_buildings_1949_1978.relative_heat_ratio_BMWi = div(
        p_buildings_1949_1978.fec_after_BMWi, p_buildings_total.fec_after_BMWi
    )
    p_buildings_1979_1995.relative_heat_ratio_BMWi = div(
        p_buildings_1979_1995.fec_after_BMWi, p_buildings_total.fec_after_BMWi
    )
    p_buildings_1996_2004.relative_heat_ratio_BMWi = div(
        p_buildings_1996_2004.fec_after_BMWi, p_buildings_total.fec_after_BMWi
    )
    p_buildings_2005_2011.relative_heat_ratio_BMWi = div(
        p_buildings_2005_2011.fec_after_BMWi, p_buildings_total.fec_after_BMWi
    )
    p_buildings_2011_today.relative_heat_ratio_BMWi = div(
        p_buildings_2011_today.fec_after_BMWi, p_buildings_total.fec_after_BMWi
    )

    p_buildings_total.relative_heat_ratio_BMWi = (
        p_buildings_until_1919.relative_heat_ratio_BMWi
        + p_buildings_1919_1948.relative_heat_ratio_BMWi
        + p_buildings_1949_1978.relative_heat_ratio_BMWi
        + p_buildings_1979_1995.relative_heat_ratio_BMWi
        + p_buildings_1996_2004.relative_heat_ratio_BMWi
        + p_buildings_2005_2011.relative_heat_ratio_BMWi
        + p_buildings_2011_today.relative_heat_ratio_BMWi
    )

    p_buildings_until_1919.relative_heat_ratio_buildings_until_2004 = div(
        p_buildings_until_1919.fec_after_BMWi,
        (
            p_buildings_total.fec_after_BMWi
            - p_buildings_2005_2011.fec_after_BMWi
            - p_buildings_2011_today.fec_after_BMWi
        ),
    )
    p_buildings_1919_1948.relative_heat_ratio_buildings_until_2004 = div(
        p_buildings_1919_1948.fec_after_BMWi,
        (
            p_buildings_total.fec_after_BMWi
            - p_buildings_2005_2011.fec_after_BMWi
            - p_buildings_2011_today.fec_after_BMWi
        ),
    )
    p_buildings_1949_1978.relative_heat_ratio_buildings_until_2004 = div(
        p_buildings_1949_1978.fec_after_BMWi,
        (
            p_buildings_total.fec_after_BMWi
            - p_buildings_2005_2011.fec_after_BMWi
            - p_buildings_2011_today.fec_after_BMWi
        ),
    )
    p_buildings_1979_1995.relative_heat_ratio_buildings_until_2004 = div(
        p_buildings_1979_1995.fec_after_BMWi,
        (
            p_buildings_total.fec_after_BMWi
            - p_buildings_2005_2011.fec_after_BMWi
            - p_buildings_2011_today.fec_after_BMWi
        ),
    )
    p_buildings_1996_2004.relative_heat_ratio_buildings_until_2004 = div(
        p_buildings_1996_2004.fec_after_BMWi,
        (
            p_buildings_total.fec_after_BMWi
            - p_buildings_2005_2011.fec_after_BMWi
            - p_buildings_2011_today.fec_after_BMWi
        ),
    )

    p_buildings_total.relative_heat_ratio_buildings_until_2004 = (
        p_buildings_until_1919.relative_heat_ratio_buildings_until_2004
        + p_buildings_1919_1948.relative_heat_ratio_buildings_until_2004
        + p_buildings_1949_1978.relative_heat_ratio_buildings_until_2004
        + p_buildings_1979_1995.relative_heat_ratio_buildings_until_2004
        + p_buildings_1996_2004.relative_heat_ratio_buildings_until_2004
    )
    p_buildings_until_1919.area_m2_relative_heat_ratio = (
        p_buildings_until_1919.area_m2
        * p_buildings_until_1919.relative_heat_ratio_buildings_until_2004
    )
    p_buildings_1919_1948.area_m2_relative_heat_ratio = (
        p_buildings_1919_1948.area_m2
        * p_buildings_1919_1948.relative_heat_ratio_buildings_until_2004
    )
    p_buildings_1949_1978.area_m2_relative_heat_ratio = (
        p_buildings_1949_1978.area_m2
        * p_buildings_1949_1978.relative_heat_ratio_buildings_until_2004
    )
    p_buildings_1979_1995.area_m2_relative_heat_ratio = (
        p_buildings_1979_1995.area_m2
        * p_buildings_1979_1995.relative_heat_ratio_buildings_until_2004
    )
    p_buildings_1996_2004.area_m2_relative_heat_ratio = (
        p_buildings_1996_2004.area_m2
        * p_buildings_1996_2004.relative_heat_ratio_buildings_until_2004
    )

    p_buildings_total.area_m2_relative_heat_ratio = (
        p_buildings_until_1919.area_m2_relative_heat_ratio
        + p_buildings_1919_1948.area_m2_relative_heat_ratio
        + p_buildings_1949_1978.area_m2_relative_heat_ratio
        + p_buildings_1979_1995.area_m2_relative_heat_ratio
        + p_buildings_1996_2004.area_m2_relative_heat_ratio
    )

    ### S - Section ###

    # Definitions
    s = Vars6()
    s_fueloil = Vars7()
    s_lpg = Vars7()
    s_biomass = Vars8()
    s_coal = Vars7()
    s_petrol = Vars7()
    s_heatnet = Vars7()
    s_solarth = Vars7()
    s_heatpump = Vars7()
    s_elec_heating = Vars7()
    s_gas = Vars7()
    s_elec = Vars9()
    p_elec_elcon = Vars2()
    p_elec_heatpump = Vars2()

    # Energy
    s_fueloil.energy = entries.r_fueloil_fec
    s_lpg.energy = entries.r_lpg_fec
    s_biomass.energy = entries.r_biomass_fec
    s_coal.energy = entries.r_coal_fec
    s_petrol.energy = entries.r_petrol_fec
    s_heatnet.energy = entries.r_heatnet_fec
    s_solarth.energy = entries.r_orenew_fec * fact(
        "Fact_R_S_ratio_solarth_to_orenew_2018"
    )
    s_heatpump.energy = entries.r_orenew_fec * fact(
        "Fact_R_S_ratio_heatpump_to_orenew_2018"
    )
    s_gas.energy = entries.r_gas_fec
    s_elec.energy = entries.r_elec_fec
    s_elec_heating.energy = (
        fact("Fact_R_S_elec_heating_fec_2018")
        * entries.r_flats_wo_heatnet
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )

    p_buildings_total.energy = (
        s_fueloil.energy
        + s_lpg.energy
        + s_biomass.energy
        + s_coal.energy
        + s_heatnet.energy
        + s_solarth.energy
        + s_heatpump.energy
        + s_gas.energy
        + s_elec_heating.energy
    )

    p_buildings_until_1919.energy = (
        p_buildings_total.energy * p_buildings_until_1919.relative_heat_ratio_BMWi
    )
    p_buildings_1919_1948.energy = (
        p_buildings_total.energy * p_buildings_1919_1948.relative_heat_ratio_BMWi
    )
    p_buildings_1949_1978.energy = (
        p_buildings_total.energy * p_buildings_1949_1978.relative_heat_ratio_BMWi
    )
    p_buildings_1979_1995.energy = (
        p_buildings_total.energy * p_buildings_1979_1995.relative_heat_ratio_BMWi
    )
    p_buildings_1996_2004.energy = (
        p_buildings_total.energy * p_buildings_1996_2004.relative_heat_ratio_BMWi
    )
    p_buildings_2005_2011.energy = (
        p_buildings_total.energy * p_buildings_2005_2011.relative_heat_ratio_BMWi
    )
    p_buildings_2011_today.energy = (
        p_buildings_total.energy * p_buildings_2011_today.relative_heat_ratio_BMWi
    )

    p_buildings_total.ratio_energy_to_m2 = div(
        p_buildings_total.energy, p_buildings_total.area_m2
    )
    p_buildings_until_1919.ratio_energy_to_m2 = div(
        p_buildings_until_1919.energy, p_buildings_until_1919.area_m2
    )
    p_buildings_1919_1948.ratio_energy_to_m2 = div(
        p_buildings_1919_1948.energy, p_buildings_1919_1948.area_m2
    )
    p_buildings_1949_1978.ratio_energy_to_m2 = div(
        p_buildings_1949_1978.energy, p_buildings_1949_1978.area_m2
    )
    p_buildings_1979_1995.ratio_energy_to_m2 = div(
        p_buildings_1979_1995.energy, p_buildings_1979_1995.area_m2
    )
    p_buildings_1996_2004.ratio_energy_to_m2 = div(
        p_buildings_1996_2004.energy, p_buildings_1996_2004.area_m2
    )
    p_buildings_2005_2011.ratio_energy_to_m2 = div(
        p_buildings_2005_2011.energy, p_buildings_2005_2011.area_m2
    )
    p_buildings_2011_today.ratio_energy_to_m2 = div(
        p_buildings_2011_today.energy, p_buildings_2011_today.area_m2
    )

    p_buildings_area_m2_com = EnergyPerM2PctCommune(
        pct_x=entries.r_pct_of_area_m2_com,
        total=p_buildings_total,
    )

    s.energy = (
        s_fueloil.energy
        + s_lpg.energy
        + s_biomass.energy
        + s_coal.energy
        + s_petrol.energy
        + s_heatnet.energy
        + s_solarth.energy
        + s_heatpump.energy
        + s_gas.energy
        + s_elec.energy
    )

    # CO2e_cb_per_MWh
    s_lpg.CO2e_combustion_based_per_MWh = fact("Fact_RB_S_LPG_ratio_CO2e_to_fec")
    s_fueloil.CO2e_combustion_based_per_MWh = fact(
        "Fact_RB_S_fueloil_ratio_CO2e_to_fec"
    )
    s_biomass.CO2e_combustion_based_per_MWh = fact(
        "Fact_RB_S_biomass_ratio_CO2e_to_fec"
    )
    s_coal.CO2e_combustion_based_per_MWh = fact("Fact_RB_S_coal_ratio_CO2e_to_fec")
    s_petrol.CO2e_combustion_based_per_MWh = fact("Fact_RB_S_petrol_ratio_CO2e_to_fec")
    s_heatnet.CO2e_combustion_based_per_MWh = fact(
        "Fact_RB_S_heatnet_ratio_CO2e_to_fec"
    )
    s_solarth.CO2e_combustion_based_per_MWh = fact(
        "Fact_RB_S_solarth_ratio_CO2e_to_fec"
    )
    s_heatpump.CO2e_combustion_based_per_MWh = fact(
        "Fact_RB_S_heatpump_ratio_CO2e_to_fec"
    )
    s_gas.CO2e_combustion_based_per_MWh = fact("Fact_RB_S_gas_ratio_CO2e_to_fec")
    s_elec.CO2e_combustion_based_per_MWh = fact("Fact_RB_S_elec_ratio_CO2e_to_fec")
    s_elec_heating.CO2e_combustion_based_per_MWh = fact(
        "Fact_RB_S_elec_ratio_CO2e_to_fec"
    )

    # CO2e_cb
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
    s.CO2e_combustion_based = (
        s_fueloil.CO2e_combustion_based
        + s_lpg.CO2e_combustion_based
        + s_biomass.CO2e_combustion_based
        + s_coal.CO2e_combustion_based
        + s_petrol.CO2e_combustion_based
        + s_gas.CO2e_combustion_based
    )

    s_elec.CO2e_combustion_based = s_elec.energy * s_elec.CO2e_combustion_based_per_MWh
    s_elec_heating.CO2e_combustion_based = (
        s_elec_heating.energy * s_elec_heating.CO2e_combustion_based_per_MWh
    )
    r.CO2e_combustion_based = s.CO2e_combustion_based

    # CO2e_total

    s.CO2e_total = s.CO2e_combustion_based
    r.CO2e_total = s.CO2e_total

    s_fueloil.CO2e_total = s_fueloil.CO2e_combustion_based
    s_lpg.CO2e_total = s_lpg.CO2e_combustion_based
    s_biomass.CO2e_total = s_biomass.CO2e_combustion_based
    s_coal.CO2e_total = s_coal.CO2e_combustion_based
    s_petrol.CO2e_total = s_petrol.CO2e_combustion_based
    s_heatnet.CO2e_total = s_heatnet.CO2e_combustion_based
    s_solarth.CO2e_total = s_solarth.CO2e_combustion_based
    s_heatpump.CO2e_total = s_heatpump.CO2e_combustion_based
    s_gas.CO2e_total = s_gas.CO2e_combustion_based
    s_elec.CO2e_total = s_elec.CO2e_combustion_based
    s_elec_heating.CO2e_total = s_elec_heating.CO2e_combustion_based

    # cost_fuel_per_MW
    s_fueloil.cost_fuel_per_MWh = fact("Fact_R_S_fueloil_energy_cost_factor_2018")
    s_lpg.cost_fuel_per_MWh = fact("Fact_R_S_lpg_energy_cost_factor_2018")
    s_biomass.cost_fuel_per_MWh = fact("Fact_R_S_wood_energy_cost_factor_2018")
    s_coal.cost_fuel_per_MWh = fact("Fact_R_S_coal_energy_cost_factor_2018")
    s_petrol.cost_fuel_per_MWh = fact("Fact_R_S_petrol_energy_cost_factor_2018")
    s_heatnet.cost_fuel_per_MWh = fact("Fact_R_S_heatnet_energy_cost_factor_2018")
    s_solarth.cost_fuel_per_MWh = 0
    s_heatpump.cost_fuel_per_MWh = (
        fact("Fact_E_D_R_cost_fuel_per_MWh_2018")
        / (
            fact("Fact_R_S_ground_heatpump_mean_annual_performance_factor_stock_2018")
            + fact("Fact_R_S_air_heatpump_mean_annual_performance_factor_stock_2018")
        )
        * 2
    )
    s_elec_heating.cost_fuel_per_MWh = fact("Fact_E_D_R_cost_fuel_per_MWh_2018")
    s_gas.cost_fuel_per_MWh = fact("Fact_R_S_gas_energy_cost_factor_2018")

    # cost_fuel
    s_fueloil.cost_fuel = s_fueloil.energy * s_fueloil.cost_fuel_per_MWh / MILLION
    s_lpg.cost_fuel = s_lpg.energy * s_lpg.cost_fuel_per_MWh / MILLION
    s_biomass.cost_fuel = s_biomass.energy * s_biomass.cost_fuel_per_MWh / MILLION
    s_coal.cost_fuel = s_coal.energy * s_coal.cost_fuel_per_MWh / MILLION
    s_petrol.cost_fuel = s_petrol.energy * s_petrol.cost_fuel_per_MWh / MILLION
    s_heatnet.cost_fuel = s_heatnet.energy * s_heatnet.cost_fuel_per_MWh / MILLION
    s_solarth.cost_fuel = s_solarth.energy * s_solarth.cost_fuel_per_MWh / MILLION
    s_heatpump.cost_fuel = s_heatpump.energy * s_heatpump.cost_fuel_per_MWh / MILLION
    s_elec_heating.cost_fuel = (
        s_elec_heating.energy * s_elec_heating.cost_fuel_per_MWh / MILLION
    )
    s_gas.cost_fuel = s_gas.energy * s_gas.cost_fuel_per_MWh / MILLION

    s.cost_fuel = (
        s_fueloil.cost_fuel
        + s_lpg.cost_fuel
        + s_biomass.cost_fuel
        + s_coal.cost_fuel
        + s_petrol.cost_fuel
        + s_heatnet.cost_fuel
        + s_solarth.cost_fuel
        + s_heatpump.cost_fuel
        + s_gas.cost_fuel
    )

    p_elec_heatpump.energy = s_heatpump.energy / fact(
        "Fact_R_S_heatpump_mean_annual_performance_factor_all"
    )

    p_elec_elcon.energy = s_elec.energy - p_elec_heatpump.energy - s_elec_heating.energy
    p_vehicles.energy = s_petrol.energy
    p_other.energy = p_elec_heatpump.energy + p_elec_elcon.energy + p_vehicles.energy

    p.energy = p_buildings_total.energy + p_other.energy

    s_biomass.number_of_buildings = div(
        s_biomass.energy * p_buildings_total.number_of_buildings,
        (p_buildings_total.ratio_energy_to_m2 * p_buildings_total.area_m2),
    )

    return R18(
        r=r,
        p=p,
        p_buildings_total=p_buildings_total,
        p_buildings_until_1919=p_buildings_until_1919,
        p_buildings_1919_1948=p_buildings_1919_1948,
        p_buildings_1949_1978=p_buildings_1949_1978,
        p_buildings_1979_1995=p_buildings_1979_1995,
        p_buildings_1996_2004=p_buildings_1996_2004,
        p_buildings_2005_2011=p_buildings_2005_2011,
        p_buildings_2011_today=p_buildings_2011_today,
        p_buildings_area_m2_com=p_buildings_area_m2_com,
        p_elec_elcon=p_elec_elcon,
        p_elec_heatpump=p_elec_heatpump,
        p_vehicles=p_vehicles,
        p_other=p_other,
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
        s_elec=s_elec,
    )
