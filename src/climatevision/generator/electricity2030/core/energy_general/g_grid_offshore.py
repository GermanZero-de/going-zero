# pyright: strict

from dataclasses import dataclass

from ....refdata import Facts, Assumptions
from ....utils import div, MILLION

from .g_grid_onshore_or_pv import GGridOnshoreOrPV


@dataclass(kw_only=True)
class GGridOffshore(GGridOnshoreOrPV):
    invest_outside: float = 0
    invest_pa_outside: float = 0

    @classmethod
    def calc_commune(
        cls,
        facts: Facts,
        assumptions: Assumptions,
        duration_until_target_year: int,
        power_to_be_installed: float,
        d_energy: float,
    ) -> "GGridOffshore":
        fact = facts.fact
        ass = assumptions.ass

        invest_per_x = ass("Ass_E_G_grid_offshore_ratio_invest_to_power")
        pct_of_wage = fact("Fact_B_P_constr_main_revenue_pct_of_wage_2018")
        ratio_wage_to_emplo = fact("Fact_B_P_constr_main_ratio_wage_to_emplo_2017")

        invest = 0
        invest_outside = (
            power_to_be_installed
            * invest_per_x
            * d_energy
            / ass("Ass_E_P_renew_nep_total_2035")
        )
        invest_pa_outside = invest_outside / duration_until_target_year
        cost_mro = invest * ass("Ass_E_G_grid_offshore_mro") / MILLION
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
            invest_outside=invest_outside,
            invest_pa_outside=invest_pa_outside,
        )

    @classmethod
    def calc_germany(
        cls,
        facts: Facts,
        assumptions: Assumptions,
        duration_until_target_year: int,
        power_to_be_installed: float,
    ) -> "GGridOffshore":
        fact = facts.fact
        ass = assumptions.ass

        invest_per_x = ass("Ass_E_G_grid_offshore_ratio_invest_to_power")
        pct_of_wage = fact("Fact_B_P_constr_main_revenue_pct_of_wage_2018")
        ratio_wage_to_emplo = fact("Fact_B_P_constr_main_ratio_wage_to_emplo_2017")

        invest_outside = 0
        invest_pa_outside = invest_outside / duration_until_target_year
        invest = power_to_be_installed * invest_per_x
        cost_mro = invest * ass("Ass_E_G_grid_offshore_mro") / MILLION
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
            invest_outside=invest_outside,
            invest_pa_outside=invest_pa_outside,
        )
