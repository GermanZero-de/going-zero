# pyright: strict
from dataclasses import dataclass, InitVar

from ...refdata import Facts, Assumptions
from ...utils import div, MILLION
from ...common.invest import Invest
from ...agri2018.a18 import A18

from .co2e_change_energy_per_mwh import CO2eChangeEnergyPerMWh


@dataclass(kw_only=True)
class CO2eChangeFuelHeatpump(CO2eChangeEnergyPerMWh, Invest):
    cost_fuel: float = 0
    cost_fuel_per_MWh: float = 0
    emplo_existing: float = 0
    full_load_hour: float = 0
    invest_per_x: float = 0
    pct_of_wage: float = 0
    power_installed: float = 0
    power_to_be_installed: float = 0
    ratio_wage_to_emplo: float = 0

    facts: InitVar[Facts]
    duration_CO2e_neutral_years: InitVar[float]
    assumptions: InitVar[Assumptions]
    duration_until_target_year: InitVar[int]
    population_commune_2018: InitVar[int]
    population_germany_2018: InitVar[int]
    what: InitVar[str]
    a18: InitVar[A18]

    def __post_init__(  # type: ignore[override]
        self,
        facts: Facts,
        duration_CO2e_neutral_years: float,
        what: str,
        a18: A18,
        assumptions: Assumptions,
        duration_until_target_year: int,
        population_commune_2018: int,
        population_germany_2018: int,
    ):
        fact = facts.fact
        ass = assumptions.ass

        self.CO2e_combustion_based = 0
        self.CO2e_production_based = 0

        self.cost_fuel_per_MWh = fact("Fact_R_S_gas_energy_cost_factor_2018")
        self.cost_fuel = self.energy * self.cost_fuel_per_MWh / MILLION

        self.full_load_hour = fact("Fact_B_S_full_usage_hours_buildings")
        self.power_installed = div(getattr(a18, what).energy, self.full_load_hour)
        self.power_to_be_installed = max(
            div(self.energy, self.full_load_hour) - self.power_installed, 0
        )

        self.invest_per_x = fact("Fact_R_S_heatpump_cost")
        self.invest = self.invest_per_x * self.power_to_be_installed * 1000
        self.invest_pa = self.invest / duration_until_target_year

        self.pct_of_wage = fact("Fact_B_P_renovations_ratio_wage_to_main_revenue_2018")
        self.cost_wage = self.invest_pa * self.pct_of_wage
        self.ratio_wage_to_emplo = fact(
            "Fact_B_P_heating_wage_per_person_per_year_2018"
        )
        self.demand_emplo = div(self.cost_wage, self.ratio_wage_to_emplo)

        self.emplo_existing = (
            fact("Fact_B_P_install_heating_emplo_2018")
            * population_commune_2018
            / population_germany_2018
            * ass("Ass_B_D_install_heating_emplo_pct_of_A_heatpump")
        )

        self.demand_emplo_new = max(0, self.demand_emplo - self.emplo_existing)

        CO2eChangeEnergyPerMWh.__post_init__(
            self,
            facts=facts,
            duration_CO2e_neutral_years=duration_CO2e_neutral_years,
            what=what,
            a18=a18,
        )

        # override value from CO2eChangeEnergyPerMWh!
        self.change_CO2e_pct = div(
            self.change_CO2e_t, 1.0  # always 0
        )  # getattr(a18, what).CO2e_total)
