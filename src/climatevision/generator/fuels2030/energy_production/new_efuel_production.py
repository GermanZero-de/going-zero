# pyright: strict

from dataclasses import dataclass

from ...refdata import Facts, Assumptions
from ...utils import div
from ...common.co2e_change import CO2eChange
from ...common.invest import Invest


@dataclass(kw_only=True)
class NewEFuelProduction(CO2eChange, Invest):
    """Production of new style of efuels that are not yet used (at an industrial scale)."""

    CO2e_production_based: float
    CO2e_production_based_per_MWh: float
    CO2e_total: float
    change_energy_MWh: float
    demand_electricity: float
    energy: float
    full_load_hour: float
    invest_outside: float
    invest_pa_outside: float
    invest_per_x: float
    pct_of_wage: float
    power_to_be_installed: float
    ratio_wage_to_emplo: float

    @classmethod
    def calc(
        cls,
        facts: Facts,
        assumptions: Assumptions,
        duration_CO2e_neutral_years: float,
        duration_until_target_year: int,
        energy: float,
        CO2e_emission_factor: float,
        invest_per_power: float,
        full_load_hour: float,
        fuel_efficiency: float,
    ) -> "NewEFuelProduction":
        fact = facts.fact

        CO2e_total_2021_estimated = 0
        # We assume that we take as much CO2e out of the air when the E-Fuel
        # is produced, as we later emit when it is burned.
        CO2e_production_based_per_MWh = -1 * CO2e_emission_factor
        CO2e_production_based = CO2e_production_based_per_MWh * energy
        CO2e_total = CO2e_production_based
        change_CO2e_t = CO2e_total
        change_CO2e_pct = 0

        pct_of_wage = fact("Fact_B_P_constr_main_revenue_pct_of_wage_2018")
        ratio_wage_to_emplo = fact("Fact_B_P_constr_main_ratio_wage_to_emplo_2017")
        demand_electricity = energy / fuel_efficiency
        change_energy_MWh = energy
        power_to_be_installed = demand_electricity / full_load_hour
        invest = power_to_be_installed * invest_per_power
        cost_climate_saved = (
            -CO2e_total
            * duration_CO2e_neutral_years
            * fact("Fact_M_cost_per_CO2e_2020")
        )
        invest_pa = invest / duration_until_target_year
        invest_outside = invest
        invest_pa_outside = invest_pa
        cost_wage = invest_pa * pct_of_wage
        demand_emplo = div(cost_wage, ratio_wage_to_emplo)
        demand_emplo_new = demand_emplo
        return cls(
            CO2e_production_based=CO2e_production_based,
            CO2e_production_based_per_MWh=CO2e_production_based_per_MWh,
            CO2e_total=CO2e_total,
            CO2e_total_2021_estimated=CO2e_total_2021_estimated,
            change_CO2e_pct=change_CO2e_pct,
            change_CO2e_t=change_CO2e_t,
            change_energy_MWh=change_energy_MWh,
            cost_climate_saved=cost_climate_saved,
            cost_wage=cost_wage,
            demand_electricity=demand_electricity,
            demand_emplo=demand_emplo,
            demand_emplo_new=demand_emplo_new,
            energy=energy,
            full_load_hour=full_load_hour,
            invest=invest,
            invest_outside=invest_outside,
            invest_pa=invest_pa,
            invest_pa_outside=invest_pa_outside,
            invest_per_x=invest_per_power,
            pct_of_wage=pct_of_wage,
            power_to_be_installed=power_to_be_installed,
            ratio_wage_to_emplo=ratio_wage_to_emplo,
        )
