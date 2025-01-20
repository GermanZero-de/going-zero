# pyright: strict

from dataclasses import dataclass, InitVar

from ...refdata import Facts, Assumptions
from ...utils import div
from ...common.invest import Invest


@dataclass(kw_only=True)
class CO2eChangeGOrganic(Invest):
    area_ha_available: float = 0
    invest_per_x: float = 0
    pct_of_wage: float = 0
    power_installed: float = 0
    power_to_be_installed: float = 0
    power_to_be_installed_pct: float = 0
    ratio_wage_to_emplo: float = 0

    facts: InitVar[Facts]
    assumptions: InitVar[Assumptions]
    duration_until_target_year: InitVar[int]
    area_agri_commune: InitVar[int]
    area_agri_commune_pct_of_organic: InitVar[float]

    def __post_init__(
        self,
        facts: Facts,
        assumptions: Assumptions,
        duration_until_target_year: int,
        area_agri_commune: int,
        area_agri_commune_pct_of_organic: float,
    ):
        fact = facts.fact
        ass = assumptions.ass

        self.area_ha_available = area_agri_commune

        self.power_installed = area_agri_commune_pct_of_organic
        self.power_to_be_installed_pct = ass("Ass_A_G_area_agri_pct_of_organic_2050")
        self.power_to_be_installed = self.area_ha_available * (
            self.power_to_be_installed_pct - self.power_installed
        )

        self.invest_per_x = ass("Ass_A_G_area_agri_organic_ratio_invest_to_ha")
        self.invest = self.power_to_be_installed * self.invest_per_x
        self.invest_pa = self.invest / duration_until_target_year

        self.pct_of_wage = fact("Fact_B_P_constr_main_revenue_pct_of_wage_2018")
        self.cost_wage = self.invest_pa * self.pct_of_wage

        self.ratio_wage_to_emplo = fact("Fact_B_P_constr_main_ratio_wage_to_emplo_2017")
        self.demand_emplo = div(self.cost_wage, self.ratio_wage_to_emplo)
        self.demand_emplo_new = self.demand_emplo
