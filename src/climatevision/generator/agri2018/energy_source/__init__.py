# pyright: strict

from dataclasses import dataclass

from ...refdata import Facts
from ...common.energy_with_co2e import EnergyWithCO2e
from ...common.energy_with_co2e_per_mwh import EnergyWithCO2ePerMWh

from ..energy_base import Energies


@dataclass(kw_only=True)
class EnergySupply:
    total: EnergyWithCO2e
    petrol: EnergyWithCO2ePerMWh
    diesel: EnergyWithCO2ePerMWh
    fueloil: EnergyWithCO2ePerMWh
    lpg: EnergyWithCO2ePerMWh
    gas: EnergyWithCO2ePerMWh
    biomass: EnergyWithCO2ePerMWh
    elec: EnergyWithCO2ePerMWh
    heatpump: EnergyWithCO2ePerMWh


def calc_supply(facts: Facts, energies: Energies) -> EnergySupply:
    fact = facts.fact

    heatpump = EnergyWithCO2ePerMWh(
        energy=energies.heatpump.energy,
        CO2e_combustion_based_per_MWh=fact("Fact_RB_S_heatpump_ratio_CO2e_to_fec"),
    )
    petrol = EnergyWithCO2ePerMWh(
        energy=energies.petrol.energy,
        CO2e_combustion_based_per_MWh=fact("Fact_T_S_petrol_EmFa_tank_wheel_2018"),
    )
    diesel = EnergyWithCO2ePerMWh(
        energy=energies.diesel.energy,
        CO2e_combustion_based_per_MWh=fact("Fact_T_S_diesel_EmFa_tank_wheel_2018"),
    )
    fueloil = EnergyWithCO2ePerMWh(
        energy=energies.fueloil.energy,
        CO2e_combustion_based_per_MWh=fact("Fact_RB_S_fueloil_ratio_CO2e_to_fec"),
    )
    lpg = EnergyWithCO2ePerMWh(
        energy=energies.lpg.energy,
        CO2e_combustion_based_per_MWh=fact("Fact_T_S_lpg_EmFa_tank_wheel_2018"),
    )
    gas = EnergyWithCO2ePerMWh(
        energy=energies.gas.energy,
        CO2e_combustion_based_per_MWh=fact("Fact_RB_S_gas_ratio_CO2e_to_fec"),
    )
    biomass = EnergyWithCO2ePerMWh(
        energy=energies.biomass.energy,
        CO2e_combustion_based_per_MWh=fact("Fact_RB_S_biomass_ratio_CO2e_to_fec"),
    )
    elec = EnergyWithCO2ePerMWh(
        energy=energies.elec.energy,
        CO2e_combustion_based_per_MWh=fact("Fact_RB_S_elec_ratio_CO2e_to_fec"),
    )
    total = EnergyWithCO2e.sum(petrol, diesel, fueloil, lpg, gas, biomass, elec)

    return EnergySupply(
        petrol=petrol,
        diesel=diesel,
        fueloil=fueloil,
        lpg=lpg,
        gas=gas,
        biomass=biomass,
        elec=elec,
        heatpump=heatpump,
        total=total,
    )
