# pyright: strict

from dataclasses import dataclass

from ....refdata import Facts
from ....utils import div, MILLION
from ....common.invest import Invest


@dataclass(kw_only=True)
class GGridOnshoreOrPV(Invest):
    invest_per_x: float = 0
    pct_of_wage: float = 0
    ratio_wage_to_emplo: float = 0
    power_to_be_installed: float = 0
    cost_mro: float = 0

    @classmethod
    def calc(
        cls,
        facts: Facts,
        duration_until_target_year: int,
        power_to_be_installed: float,
        invest_per_x: float,
        mro: float,
    ) -> "GGridOnshoreOrPV":
        fact = facts.fact

        pct_of_wage = fact("Fact_B_P_constr_main_revenue_pct_of_wage_2018")
        ratio_wage_to_emplo = fact("Fact_B_P_constr_main_ratio_wage_to_emplo_2017")
        invest = power_to_be_installed * invest_per_x
        cost_mro = invest * mro / MILLION
        invest_pa = invest / duration_until_target_year
        cost_wage = invest_pa * pct_of_wage
        demand_emplo = div(cost_wage, ratio_wage_to_emplo)
        demand_emplo_new = demand_emplo

        return cls(
            cost_wage=cost_wage,
            demand_emplo=demand_emplo,
            demand_emplo_new=demand_emplo_new,
            invest=invest,
            invest_pa=invest_pa,
            invest_per_x=invest_per_x,
            pct_of_wage=pct_of_wage,
            ratio_wage_to_emplo=ratio_wage_to_emplo,
            power_to_be_installed=power_to_be_installed,
            cost_mro=cost_mro,
        )
