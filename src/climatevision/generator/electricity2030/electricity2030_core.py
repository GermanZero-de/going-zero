# pyright: strict

from dataclasses import dataclass

from ..inputs import Inputs
from ..utils import div


@dataclass(kw_only=True)
class FossilFuelsProduction:
    """This describes energy produced by fossil fuels. Which we do not do in 2030, so this
    just describes the effect of shutting those energy providers down."""

    energy: float = None  # type: ignore
    cost_fuel_per_MWh: float = None  # type: ignore
    cost_fuel: float = None  # type: ignore
    CO2e_combustion_based_per_MWh: float = None  # type: ignore
    CO2e_combustion_based: float = None  # type: ignore
    cost_climate_saved: float = None  # type: ignore
    cost_mro: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    CO2e_total_2021_estimated: float = None  # type: ignore
    change_energy_MWh: float = None  # type: ignore
    change_energy_pct: float = None  # type: ignore
    change_CO2e_t: float = None  # type: ignore
    change_CO2e_pct: float = None  # type: ignore
    change_cost_energy: float = None  # type: ignore
    change_cost_mro: float = None  # type: ignore
    cost_mro_per_MWh: float = None  # type: ignore

    @classmethod
    def sum(
        cls,
        *ffs: "FossilFuelsProduction",
        energy_18: float,
        CO2e_total_18: float,
    ) -> "FossilFuelsProduction":
        energy = sum(ff.energy for ff in ffs)
        CO2e_total_2021_estimated = sum(ff.CO2e_total_2021_estimated for ff in ffs)
        cost_fuel = sum(ff.cost_fuel for ff in ffs)
        cost_mro = sum(ff.cost_mro for ff in ffs)
        CO2e_combustion_based = sum(ff.CO2e_combustion_based for ff in ffs)
        change_cost_energy = sum(ff.change_cost_energy for ff in ffs)
        change_cost_mro = sum(ff.change_cost_mro for ff in ffs)
        cost_climate_saved = sum(ff.cost_climate_saved for ff in ffs)
        change_CO2e_t = sum(ff.change_CO2e_t for ff in ffs)

        change_energy_MWh = energy - energy_18

        return FossilFuelsProduction(
            energy=energy,
            CO2e_total_2021_estimated=CO2e_total_2021_estimated,
            change_energy_MWh=change_energy_MWh,
            change_energy_pct=div(change_energy_MWh, energy_18),
            cost_fuel=cost_fuel,
            cost_mro=cost_mro,
            CO2e_combustion_based=CO2e_combustion_based,
            change_cost_energy=change_cost_energy,
            change_cost_mro=change_cost_mro,
            cost_climate_saved=cost_climate_saved,
            change_CO2e_t=change_CO2e_t,
            change_CO2e_pct=div(change_CO2e_t, CO2e_total_18),
        )


@dataclass(kw_only=True)
class Energy:
    energy: float = None  # type: ignore


@dataclass(kw_only=True)
class EnergyDemand(Energy):
    change_energy_MWh: float = None  # type: ignore
    change_energy_pct: float = None  # type: ignore
    # Percent of total energy demand
    pct_energy: float = None  # type: ignore


@dataclass(kw_only=True)
class RenewableGeothermalProduction(EnergyDemand):
    """Energy production using geothermal."""

    energy_installable: float = None  # type: ignore
    CO2e_combustion_based_per_MWh: float = None  # type: ignore
    CO2e_combustion_based: float = None  # type: ignore
    cost_climate_saved: float = None  # type: ignore
    cost_mro: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_emplo: float = None  # type: ignore
    power_installed: float = None  # type: ignore
    power_to_be_installed_pct: float = None  # type: ignore
    power_to_be_installed: float = None  # type: ignore
    power_installable: float = None  # type: ignore
    change_CO2e_t: float = None  # type: ignore
    change_CO2e_pct: float = None  # type: ignore
    change_cost_mro: float = None  # type: ignore
    invest: float = None  # type: ignore
    invest_pa: float = None  # type: ignore
    invest_outside: float = None  # type: ignore
    invest_pa_outside: float = None  # type: ignore
    invest_per_x: float = None  # type: ignore
    pct_of_wage: float = None  # type: ignore
    pct_x: float = None  # type: ignore
    ratio_wage_to_emplo: float = None  # type: ignore
    cost_wage: float = None  # type: ignore
    cost_mro_per_MWh: float = None  # type: ignore
    emplo_existing: float = None  # type: ignore
    demand_emplo_new: float = None  # type: ignore
    full_load_hour: float = None  # type: ignore


@dataclass(kw_only=True)
class EnergyDemandWithCostFuel(EnergyDemand):
    cost_fuel_per_MWh: float = None  # type: ignore
    cost_fuel: float = None  # type: ignore


# Definition der relevanten Spaltennamen für den Sektor E
@dataclass(kw_only=True)
class EColVars2030(EnergyDemandWithCostFuel):
    pet_sites: float = None  # type: ignore
    energy_installable: float = None  # type: ignore
    cost_fuel_per_MWh: float = None  # type: ignore
    mro_per_MWh: float = None  # type: ignore
    mro: float = None  # type: ignore
    CO2e_combustion_based_per_MWh: float = None  # type: ignore
    CO2e_combustion_based: float = None  # type: ignore
    cost_certificate_per_MWh: float = None  # type: ignore
    cost_certificate: float = None  # type: ignore
    cost_climate_saved: float = None  # type: ignore
    cost_mro: float = None  # type: ignore
    cost_mro_pa_com: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    CO2e_total_2021_estimated: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    demand_emplo: float = None  # type: ignore
    demand_emplo_com: float = None  # type: ignore
    power_installed: float = None  # type: ignore
    power_to_be_installed_pct: float = None  # type: ignore
    power_to_be_installed: float = None  # type: ignore
    power_installable: float = None  # type: ignore
    area_ha_available: float = None  # type: ignore
    area_ha_available_pct_of_action: float = None  # type: ignore
    ratio_power_to_area_ha: float = None  # type: ignore
    cost_mro_pa: float = None  # type: ignore
    change_CO2e_t: float = None  # type: ignore
    change_CO2e_pct: float = None  # type: ignore
    change_cost_energy: float = None  # type: ignore
    change_cost_mro: float = None  # type: ignore
    invest: float = None  # type: ignore
    invest_pa: float = None  # type: ignore
    invest_com: float = None  # type: ignore
    invest_pa_com: float = None  # type: ignore
    invest_outside: float = None  # type: ignore
    invest_pa_outside: float = None  # type: ignore
    invest_per_x: float = None  # type: ignore
    pct_of_wage: float = None  # type: ignore
    pct_x: float = None  # type: ignore
    ratio_wage_to_emplo: float = None  # type: ignore
    cost_wage: float = None  # type: ignore
    cost_mro_per_MWh: float = None  # type: ignore
    emplo_existing: float = None  # type: ignore
    demand_emplo_new: float = None  # type: ignore
    full_load_hour: float = None  # type: ignore
    lifecycle: float = None  # type: ignore


def calc_biomass(inputs: Inputs) -> EColVars2030:
    fact = inputs.fact
    ass = inputs.ass
    entries = inputs.entries

    p_local_biomass = EColVars2030()

    p_local_biomass.full_load_hour = fact("Fact_E_P_biomass_full_load_hours")

    p_local_biomass.power_installed = entries.e_PV_power_inst_biomass
    p_local_biomass.power_to_be_installed_pct = (
        entries.e_PV_power_to_be_inst_local_biomass
    )

    p_local_biomass.power_installable = entries.e_biomass_local_power_installable_sta
    p_local_biomass.power_to_be_installed = max(
        0,
        p_local_biomass.power_installable * p_local_biomass.power_to_be_installed_pct
        - p_local_biomass.power_installed,
    )
    p_local_biomass.energy = (
        (p_local_biomass.power_to_be_installed + p_local_biomass.power_installed)
        * p_local_biomass.full_load_hour
        * (1 - ass("Ass_E_P_renew_loss_brutto_to_netto"))
    )

    return p_local_biomass


def calc_biomass_cogen(
    inputs: Inputs, *, p_local_biomass: EColVars2030
) -> EColVars2030:
    fact = inputs.fact

    p_local_biomass_cogen = EColVars2030()

    p_local_biomass_cogen.energy = p_local_biomass.energy * fact(
        "Fact_E_P_renew_cogen_ratio_2018"
    )

    return p_local_biomass_cogen
