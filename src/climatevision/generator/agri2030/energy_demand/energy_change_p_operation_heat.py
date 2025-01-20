# pyright: strict

from dataclasses import dataclass, InitVar

from ...refdata import Facts, Assumptions
from ...utils import div
from ...common.invest import Invest
from ...agri2018.a18 import A18

from .energy_change_agri import EnergyChangeAgri


@dataclass(kw_only=True)
class EnergyChangePOperationHeat(EnergyChangeAgri, Invest):
    area_m2: float = 0
    area_m2_nonrehab: float = 0
    area_m2_rehab: float = 0
    demand_biomass: float = 0
    demand_ediesel: float = 0
    demand_electricity: float = 0
    demand_emethan: float = 0
    demand_epetrol: float = 0
    demand_heat_nonrehab: float = 0
    demand_heat_rehab: float = 0
    demand_heatpump: float = 0
    emplo_existing: float = 0
    fec_factor_averaged: float = 0
    invest_per_x: float = 0
    pct_nonrehab: float = 0
    pct_of_wage: float = 0
    pct_rehab: float = 0
    rate_rehab_pa: float
    ratio_wage_to_emplo: float = 0

    what: InitVar[str]
    a18: InitVar[A18]
    facts: InitVar[Facts]
    assumptions: InitVar[Assumptions]
    duration_until_target_year: InitVar[int]
    population_commune_2018: InitVar[int]
    population_germany_2018: InitVar[int]

    def __post_init__(  # type: ignore[override]
        self,
        what: str,
        a18: A18,
        facts: Facts,
        assumptions: Assumptions,
        duration_until_target_year: int,
        population_commune_2018: int,
        population_germany_2018: int,
    ):
        fact = facts.fact
        ass = assumptions.ass

        self.pct_rehab = (
            fact("Fact_B_P_ratio_renovated_to_not_renovated_2021")
            + self.rate_rehab_pa * duration_until_target_year
        )
        self.pct_nonrehab = 1 - self.pct_rehab

        self.area_m2 = getattr(a18, what).area_m2
        self.area_m2_rehab = self.pct_rehab * getattr(a18, what).area_m2
        self.area_m2_nonrehab = self.pct_nonrehab * getattr(a18, what).area_m2

        self.invest_per_x = fact("Fact_R_P_energetical_renovation_cost_business")
        self.invest = (
            self.area_m2_rehab
            * (1 - fact("Fact_B_P_ratio_renovated_to_not_renovated_2021"))
            * self.invest_per_x
        )
        self.invest_pa = self.invest / duration_until_target_year

        self.pct_of_wage = fact("Fact_B_P_renovations_ratio_wage_to_main_revenue_2018")
        self.cost_wage = div(self.invest, duration_until_target_year) * self.pct_of_wage

        self.ratio_wage_to_emplo = fact(
            "Fact_B_P_renovations_wage_per_person_per_year_2018"
        )
        self.emplo_existing = (
            fact("Fact_B_P_renovation_emplo_2018")
            * ass("Ass_B_D_renovation_emplo_pct_of_A")
            * population_commune_2018
            / population_germany_2018
        )

        self.demand_electricity = 0
        self.demand_epetrol = 0
        self.demand_ediesel = 0
        self.demand_heat_rehab = self.area_m2_rehab * ass(
            "Ass_B_D_ratio_fec_to_area_2050"
        )
        self.demand_heat_nonrehab = (
            self.area_m2_nonrehab
            * (
                getattr(a18, what).ratio_energy_to_m2
                - fact("Fact_B_P_ratio_renovated_to_not_renovated_2021")
                * ass("Ass_B_D_ratio_fec_to_area_2050")
            )
            / (1 - fact("Fact_B_P_ratio_renovated_to_not_renovated_2021"))
        )
        self.demand_heatpump = self.demand_heat_rehab
        self.demand_emplo = div(self.cost_wage, self.ratio_wage_to_emplo)
        self.demand_emplo_new = max(0, self.demand_emplo - self.emplo_existing)

        self.energy = self.demand_heat_nonrehab + self.demand_heat_rehab

        self.demand_biomass = min(
            a18.s_biomass.energy, self.energy - self.demand_heatpump
        )
        self.demand_emethan = self.energy - self.demand_biomass - self.demand_heatpump

        self.fec_factor_averaged = div(self.energy, getattr(a18, what).area_m2)

        EnergyChangeAgri.__post_init__(self, what=what, a18=a18)
