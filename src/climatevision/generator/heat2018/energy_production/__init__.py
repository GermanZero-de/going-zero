# pyright: strict

from dataclasses import dataclass

from ...inputs import Inputs
from ...transport2018.t18 import T18
from ...electricity2018.e18 import E18
from ...industry2018.i18 import I18

from ...common.energy_with_co2e_per_mwh import EnergyWithCO2ePerMWh


@dataclass(kw_only=True)
class Production:
    total: EnergyWithCO2ePerMWh
    gas: EnergyWithCO2ePerMWh
    lpg: EnergyWithCO2ePerMWh
    fueloil: EnergyWithCO2ePerMWh
    opetpro: EnergyWithCO2ePerMWh
    coal: EnergyWithCO2ePerMWh
    heatnet: EnergyWithCO2ePerMWh
    heatnet_cogen: EnergyWithCO2ePerMWh
    heatnet_plant: EnergyWithCO2ePerMWh
    heatnet_geoth: EnergyWithCO2ePerMWh
    heatnet_lheatpump: EnergyWithCO2ePerMWh
    biomass: EnergyWithCO2ePerMWh
    ofossil: EnergyWithCO2ePerMWh
    orenew: EnergyWithCO2ePerMWh
    solarth: EnergyWithCO2ePerMWh
    heatpump: EnergyWithCO2ePerMWh


def calc_production(
    inputs: Inputs,
    t18: T18,
    e18: E18,
    i18: I18,
) -> Production:

    entries = inputs.entries
    fact = inputs.fact

    p_heatnet_energy = (
        entries.r_heatnet_fec + entries.b_heatnet_fec + i18.s_renew_heatnet.energy
    )

    gas = EnergyWithCO2ePerMWh(
        energy=entries.r_gas_fec
        + entries.b_gas_fec
        + i18.s_fossil_gas.energy
        + entries.a_gas_fec
        + t18.t.demand_gas,
        CO2e_production_based_per_MWh=fact("Fact_H_P_gas_ratio_CO2e_pb_to_fec_2018"),
        CO2e_combustion_based_per_MWh=fact("Fact_H_P_gas_ratio_CO2e_cb_to_fec_2018"),
    )

    lpg = EnergyWithCO2ePerMWh(
        energy=entries.r_lpg_fec
        + entries.b_lpg_fec
        + i18.s_fossil_lpg.energy
        + entries.a_lpg_fec
        + t18.s_lpg.energy,
        CO2e_combustion_based_per_MWh=fact("Fact_H_P_lpg_ratio_CO2e_cb_to_fec_2018"),
    )

    fueloil = EnergyWithCO2ePerMWh(
        energy=entries.r_fueloil_fec
        + entries.b_fueloil_fec
        + i18.s_fossil_fueloil.energy
        + entries.a_fueloil_fec
        + t18.s_fueloil.energy,
        CO2e_combustion_based_per_MWh=fact(
            "Fact_H_P_fueloil_ratio_CO2e_cb_to_fec_2018"
        ),
    )

    opetpro = EnergyWithCO2ePerMWh(
        energy=i18.s_fossil_opetpro.energy,
        CO2e_production_based_per_MWh=fact(
            "Fact_H_P_opetpro_ratio_CO2e_pb_to_fec_2018"
        ),
        CO2e_combustion_based_per_MWh=fact(
            "Fact_H_P_opetpro_ratio_CO2e_cb_to_fec_2018"
        ),
    )

    coal = EnergyWithCO2ePerMWh(
        energy=entries.r_coal_fec + entries.b_coal_fec + i18.s_fossil_coal.energy,
        CO2e_production_based_per_MWh=fact("Fact_H_P_coal_ratio_CO2e_pb_to_fec_2018"),
        CO2e_combustion_based_per_MWh=fact("Fact_H_P_coal_ratio_CO2e_cb_to_fec_2018"),
    )

    if (
        e18.p_fossil_coal_brown_cogen.energy
        + e18.p_fossil_coal_black_cogen.energy
        + e18.p_fossil_gas_cogen.energy
        + e18.p_fossil_ofossil_cogen.energy
        + e18.p_renew_biomass_cogen.energy
        < p_heatnet_energy
    ):
        heatnet_cogen_energy = (
            e18.p_fossil_coal_brown_cogen.energy
            + e18.p_fossil_coal_black_cogen.energy
            + e18.p_fossil_gas_cogen.energy
            + e18.p_fossil_ofossil_cogen.energy
            + e18.p_renew_biomass_cogen.energy
        )
    else:
        heatnet_cogen_energy = p_heatnet_energy

    heatnet_cogen = EnergyWithCO2ePerMWh(
        energy=heatnet_cogen_energy,
        CO2e_combustion_based_per_MWh=fact(
            "Fact_H_P_heatnet_cogen_ratio_CO2e_cb_to_fec_2018"
        ),
    )

    heatnet_plant = EnergyWithCO2ePerMWh(
        energy=p_heatnet_energy - heatnet_cogen.energy,
        CO2e_combustion_based_per_MWh=fact(
            "Fact_H_P_heatnet_plant_ratio_CO2e_cb_to_fec_2018"
        ),
    )

    # TODO: Check, why heatnet_geoth is completely 0
    heatnet_geoth = EnergyWithCO2ePerMWh(energy=0)
    # TODO: Check, why heatnet_lheatpump is completely 0
    heatnet_lheatpump = EnergyWithCO2ePerMWh(energy=0)

    heatnet = EnergyWithCO2ePerMWh.sum(heatnet_cogen, heatnet_plant)

    biomass = EnergyWithCO2ePerMWh(
        energy=entries.r_biomass_fec
        + entries.b_biomass_fec
        + i18.s_renew_biomass.energy
        + entries.a_biomass_fec,
        CO2e_production_based_per_MWh=fact(
            "Fact_H_P_biomass_ratio_CO2e_pb_to_fec_2018"
        ),
    )

    ofossil = EnergyWithCO2ePerMWh(
        energy=i18.s_fossil_ofossil.energy,
        CO2e_production_based_per_MWh=fact(
            "Fact_H_P_ofossil_ratio_CO2e_pb_to_fec_2018"
        ),
    )

    orenew_energy = (
        entries.r_orenew_fec + entries.b_orenew_fec + i18.s_renew_orenew.energy
    )

    solarth = EnergyWithCO2ePerMWh(
        energy=orenew_energy * fact("Fact_R_S_ratio_solarth_to_orenew_2018"),
        CO2e_production_based_per_MWh=fact("Fact_H_P_orenew_ratio_CO2e_pb_to_fec_2018"),
    )

    heatpump = EnergyWithCO2ePerMWh(
        energy=orenew_energy * fact("Fact_R_S_ratio_heatpump_to_orenew_2018"),
        CO2e_production_based_per_MWh=fact("Fact_H_P_orenew_ratio_CO2e_pb_to_fec_2018"),
    )

    orenew = EnergyWithCO2ePerMWh.sum(solarth, heatpump)

    total = EnergyWithCO2ePerMWh.sum(
        gas,
        lpg,
        fueloil,
        opetpro,
        coal,
        heatnet,
        biomass,
        ofossil,
        orenew,
    )

    return Production(
        total=total,
        gas=gas,
        lpg=lpg,
        fueloil=fueloil,
        opetpro=opetpro,
        coal=coal,
        heatnet=heatnet,
        heatnet_cogen=heatnet_cogen,
        heatnet_plant=heatnet_plant,
        heatnet_geoth=heatnet_geoth,
        heatnet_lheatpump=heatnet_lheatpump,
        biomass=biomass,
        ofossil=ofossil,
        orenew=orenew,
        solarth=solarth,
        heatpump=heatpump,
    )
