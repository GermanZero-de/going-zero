# pyright: strict

from dataclasses import dataclass

from ...inputs import Inputs
from ...common.energy import Energy, EnergyPerM2PctCommune, EnergyPerM2WithBuildings


@dataclass(kw_only=True)
class Production:
    total: Energy
    nonresi: EnergyPerM2WithBuildings
    nonresi_commune: EnergyPerM2PctCommune
    elec_elcon: Energy
    elec_heatpump: Energy
    vehicles: Energy
    other: Energy


def calc_production(
    inputs: Inputs,
    s_heatpump_energy: float,
    s_elec_energy: float,
    s_elec_heating_energy: float,
    s_petrol_energy: float,
    s_jetfuel_energy: float,
    s_diesel_energy: float,
    s_gas_energy: float,
    s_lpg_energy: float,
    s_fueloil_energy: float,
    s_biomass_energy: float,
    s_coal_energy: float,
    s_heatnet_energy: float,
    s_solarth_energy: float,
) -> Production:

    fact = inputs.fact
    ass = inputs.ass
    entries = inputs.entries

    elec_heatpump = Energy(
        energy=s_heatpump_energy
        / fact("Fact_R_S_heatpump_mean_annual_performance_factor_all")
    )

    elec_elcon = Energy(
        energy=s_elec_energy - elec_heatpump.energy - s_elec_heating_energy
    )

    vehicles = Energy(energy=s_petrol_energy + s_jetfuel_energy + s_diesel_energy)

    other = Energy(energy=elec_elcon.energy + elec_heatpump.energy + vehicles.energy)

    nonresi = EnergyPerM2WithBuildings(
        area_m2=(
            entries.r_area_m2
            * fact("Fact_B_P_ratio_buisness_buildings_to_all_buildings_area_2016")
            / (1 - fact("Fact_B_P_ratio_buisness_buildings_to_all_buildings_area_2016"))
            * (1 - fact("Fact_A_P_energy_buildings_ratio_A_to_B"))
        ),
        energy=(
            s_gas_energy
            + s_lpg_energy
            + s_fueloil_energy
            + s_biomass_energy
            + s_coal_energy
            + s_heatnet_energy
            + s_heatpump_energy
            + s_solarth_energy
            + s_elec_heating_energy
        ),
        number_of_buildings=(
            fact("Fact_B_P_number_business_buildings_2016")
            * entries.m_population_com_2018
            / entries.m_population_nat
        ),
    )

    nonresi_commune = EnergyPerM2PctCommune(
        pct_x=ass(
            "Ass_H_ratio_municipal_non_res_buildings_to_all_non_res_buildings_2050"
        ),
        total=nonresi,
    )

    total = Energy(energy=nonresi.energy + other.energy)

    return Production(
        total=total,
        nonresi=nonresi,
        nonresi_commune=nonresi_commune,
        elec_elcon=elec_elcon,
        elec_heatpump=elec_heatpump,
        vehicles=vehicles,
        other=other,
    )
