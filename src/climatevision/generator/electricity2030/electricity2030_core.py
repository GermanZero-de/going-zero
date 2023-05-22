# pyright: strict

from dataclasses import dataclass

from climatevision.generator.inputs import Inputs

from climatevision.generator import electricity2018
from climatevision.generator.utils import MILLION, div

from climatevision.generator.business2018.b18 import B18
from climatevision.generator.electricity2018.e18 import E18
from climatevision.generator.residences2018.r18 import R18

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


def calc_production_renewable_geothermal(
    inputs: Inputs,
    *,
    d_energy: float,
) -> RenewableGeothermalProduction:
    ass = inputs.ass
    fact = inputs.fact
    entries = inputs.entries

    Kalkulationszeitraum = entries.m_duration_target

    CO2e_total = 0
    invest = 0
    demand_emplo = 0
    cost_mro_per_MWh = ass("Ass_E_P_renew_geoth_mro_per_MWh")
    CO2e_combustion_based_per_MWh = fact(
        "Fact_E_P_climate_neutral_ratio_CO2e_cb_to_fec"
    )
    invest_per_x = ass("Ass_E_P_renew_geoth_invest") * 1000
    pct_of_wage = ass("Ass_E_P_constr_plant_invest_pct_of_wage_2017")
    ratio_wage_to_emplo = ass("Ass_E_P_constr_elec_ratio_wage_to_emplo_2017")
    emplo_existing = 0
    power_installable = ass("Ass_E_P_renew_geoth_power_installable")
    power_to_be_installed_pct = ass("Ass_E_P_renew_geoth_power_to_be_installed_2035")
    power_installed = fact("Fact_E_P_geoth_power_installed_2018")
    full_load_hour = fact("Fact_E_P_geoth_full_load_hours")

    invest_pa = invest / Kalkulationszeitraum
    demand_emplo_new = max(0, demand_emplo - emplo_existing)
    power_to_be_installed = max(
        0,
        power_installable * power_to_be_installed_pct - power_installed,
    )
    energy_installable = (
        full_load_hour
        * power_installable
        * (1 - ass("Ass_E_P_renew_loss_brutto_to_netto"))
    )
    invest_outside = invest * d_energy / ass("Ass_E_P_renew_nep_total_2035")
    cost_wage = invest_pa * pct_of_wage
    invest_pa_outside = (
        power_to_be_installed
        * invest_per_x
        / Kalkulationszeitraum
        * d_energy
        / ass("Ass_E_P_renew_nep_total_2035")
    )
    change_CO2e_pct = 0
    cost_climate_saved = 0

    # For now the below are actually computed at a later stage
    # TODO: Figure out if we can move the calculations up
    energy = 0
    CO2e_combustion_based = 0
    cost_mro = 0
    change_energy_MWh = 0
    change_energy_pct = 0
    change_CO2e_t = 0
    change_cost_mro = 0
    pct_x = 0
    return RenewableGeothermalProduction(
        energy=energy,
        energy_installable=energy_installable,
        CO2e_combustion_based_per_MWh=CO2e_combustion_based_per_MWh,
        CO2e_combustion_based=CO2e_combustion_based,
        cost_climate_saved=cost_climate_saved,
        cost_mro=cost_mro,
        CO2e_total=CO2e_total,
        demand_emplo=demand_emplo,
        power_installed=power_installed,
        power_to_be_installed_pct=power_to_be_installed_pct,
        power_to_be_installed=power_to_be_installed,
        power_installable=power_installable,
        change_energy_MWh=change_energy_MWh,
        change_energy_pct=change_energy_pct,
        change_CO2e_t=change_CO2e_t,
        change_CO2e_pct=change_CO2e_pct,
        change_cost_mro=change_cost_mro,
        invest=invest,
        invest_pa=invest_pa,
        invest_outside=invest_outside,
        invest_pa_outside=invest_pa_outside,
        invest_per_x=invest_per_x,
        pct_of_wage=pct_of_wage,
        pct_x=pct_x,
        ratio_wage_to_emplo=ratio_wage_to_emplo,
        cost_wage=cost_wage,
        cost_mro_per_MWh=cost_mro_per_MWh,
        emplo_existing=emplo_existing,
        demand_emplo_new=demand_emplo_new,
        full_load_hour=full_load_hour,
    )


def calc_stop_production_by_fossil_fuels(
    inputs: Inputs, *, e18_production: electricity2018.dataclasses.FossilFuelsProduction
) -> FossilFuelsProduction:
    """Compute what happens if we stop producing electricity from a fossil fuel."""
    fact = inputs.fact
    entries = inputs.entries

    KlimaneutraleJahre = entries.m_duration_neutral

    energy = 0
    CO2e_total_2021_estimated = e18_production.CO2e_combustion_based * fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_2018"
    )
    cost_fuel_per_MWh = e18_production.cost_fuel_per_MWh
    cost_mro_per_MWh = e18_production.cost_mro_per_MWh
    CO2e_combustion_based_per_MWh = e18_production.CO2e_combustion_based_per_MWh
    change_energy_MWh = energy - e18_production.energy
    cost_fuel = cost_fuel_per_MWh * energy / 1000000
    cost_mro = cost_mro_per_MWh * energy / 1000000
    CO2e_combustion_based = energy * CO2e_combustion_based_per_MWh
    change_energy_pct = div(change_energy_MWh, e18_production.energy)
    change_cost_energy = cost_fuel - e18_production.cost_fuel
    change_cost_mro = cost_mro - e18_production.cost_mro
    CO2e_total = CO2e_combustion_based
    cost_climate_saved = (
        (CO2e_total_2021_estimated - CO2e_combustion_based)
        * KlimaneutraleJahre
        * fact("Fact_M_cost_per_CO2e_2020")
    )
    change_CO2e_t = CO2e_total - e18_production.CO2e_total
    change_CO2e_pct = div(change_CO2e_t, e18_production.CO2e_total)

    return FossilFuelsProduction(
        energy=energy,
        cost_fuel_per_MWh=cost_fuel_per_MWh,
        cost_fuel=cost_fuel,
        CO2e_combustion_based_per_MWh=CO2e_combustion_based_per_MWh,
        CO2e_combustion_based=CO2e_combustion_based,
        cost_climate_saved=cost_climate_saved,
        cost_mro=cost_mro,
        CO2e_total=CO2e_total,
        CO2e_total_2021_estimated=CO2e_total_2021_estimated,
        change_energy_MWh=change_energy_MWh,
        change_energy_pct=change_energy_pct,
        change_CO2e_t=change_CO2e_t,
        change_CO2e_pct=change_CO2e_pct,
        change_cost_energy=change_cost_energy,
        change_cost_mro=change_cost_mro,
        cost_mro_per_MWh=cost_mro_per_MWh,
    )


def calc_production_local_pv_roof(
    inputs: Inputs,
    *,
    e18: E18,
    b18: B18,
    r18: R18,
):
    entries = inputs.entries
    ass = inputs.ass
    Kalkulationszeitraum = entries.m_duration_target

    # TODO: Change the below
    p_local_pv_roof = EColVars2030()

    p_local_pv_roof.full_load_hour = entries.e_pv_full_load_hours_sta
    p_local_pv_roof.power_installed = entries.e_PV_power_inst_roof
    p_local_pv_roof.invest_per_x = (
        ass("Ass_E_P_local_pv_roof_ratio_invest_to_power_2030") * 1000
    )
    p_local_pv_roof.pct_of_wage = ass("Ass_E_P_pv_invest_pct_of_wage")
    p_local_pv_roof.ratio_wage_to_emplo = ass(
        "Ass_E_P_constr_elec_ratio_wage_to_emplo_2017"
    )
    p_local_pv_roof.power_to_be_installed_pct = entries.e_PV_power_to_be_inst_roof
    p_local_pv_roof.area_ha_available = (
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
                * ass("Ass_E_P_local_pv_roof_area_buildingD")
                + entries.r_area_m2_dorm
                / 100
                * ass("Ass_E_P_local_pv_roof_area_buildingD")
            )
        )
        / 10000
    )
    p_local_pv_roof.area_ha_available_pct_of_action = ass(
        "Ass_E_P_local_pv_roof_potential"
    )
    p_local_pv_roof.ratio_power_to_area_ha = ass(
        "Ass_E_P_local_pv_roof_ratio_power_to_area_ha"
    )
    p_local_pv_roof.power_installable = (
        p_local_pv_roof.area_ha_available
        * p_local_pv_roof.area_ha_available_pct_of_action
        * p_local_pv_roof.ratio_power_to_area_ha
    )
    p_local_pv_roof.power_to_be_installed = max(
        0,
        p_local_pv_roof.power_installable * p_local_pv_roof.power_to_be_installed_pct
        - p_local_pv_roof.power_installed,
    )
    p_local_pv_roof.energy_installable = (
        p_local_pv_roof.power_installable
        * p_local_pv_roof.full_load_hour
        * (1 - ass("Ass_E_P_renew_loss_brutto_to_netto"))
    )
    p_local_pv_roof.cost_mro_per_MWh = (
        ass("Ass_E_P_local_pv_roof_ratio_invest_to_power_2030")
        * ass("Ass_E_P_local_pv_roof_mro_per_year")
        / p_local_pv_roof.full_load_hour
        * 1000
    )
    p_local_pv_roof.energy = (
        (p_local_pv_roof.power_to_be_installed + p_local_pv_roof.power_installed)
        * p_local_pv_roof.full_load_hour
        * (1 - ass("Ass_E_P_renew_loss_brutto_to_netto"))
    )
    p_local_pv_roof.invest = (
        p_local_pv_roof.power_to_be_installed * p_local_pv_roof.invest_per_x
    )
    p_local_pv_roof.cost_mro = (
        p_local_pv_roof.energy * p_local_pv_roof.cost_mro_per_MWh / MILLION
    )
    p_local_pv_roof.change_energy_MWh = (
        p_local_pv_roof.energy - e18.p_local_pv_roof.energy
    )
    p_local_pv_roof.invest_pa = p_local_pv_roof.invest / Kalkulationszeitraum
    p_local_pv_roof.invest_com = div(
        p_local_pv_roof.invest
        * (r18.p_buildings_area_m2_com.area_m2 + b18.p_nonresi_com.area_m2),
        b18.p_nonresi.area_m2 + r18.p_buildings_total.area_m2,
    )
    p_local_pv_roof.change_cost_mro = (
        p_local_pv_roof.cost_mro - e18.p_local_pv_roof.cost_mro
    )
    p_local_pv_roof.change_energy_pct = div(
        p_local_pv_roof.change_energy_MWh, e18.p_local_pv_roof.energy
    )
    p_local_pv_roof.cost_wage = p_local_pv_roof.invest_pa * p_local_pv_roof.pct_of_wage
    p_local_pv_roof.invest_pa_com = p_local_pv_roof.invest_com / Kalkulationszeitraum
    p_local_pv_roof.change_CO2e_t = 0
    p_local_pv_roof.cost_climate_saved = 0
    p_local_pv_roof.CO2e_total = 0
    p_local_pv_roof.change_CO2e_pct = 0

    return p_local_pv_roof
