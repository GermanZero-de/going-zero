# pyright: strict

from dataclasses import dataclass

from ...inputs import Inputs
from ...utils import div
from ...common.g import G


@dataclass(kw_only=True)
class GStorage(G):
    ratio_wage_to_emplo: float

    @classmethod
    def calc(cls, inputs: Inputs, p_heatnet_energy: float) -> "GStorage":
        entries = inputs.entries
        fact = inputs.fact

        energy = p_heatnet_energy
        pct_energy = fact("Fact_H_P_storage_specific_volume")
        power_to_be_installed = energy * pct_energy

        invest_per_x = fact("Fact_H_P_storage_specific_cost")
        invest = invest_per_x * power_to_be_installed
        invest_pa = invest / entries.m_duration_target

        invest_com = invest
        invest_pa_com = invest_pa

        pct_of_wage = fact("Fact_B_P_constr_main_revenue_pct_of_wage_2017")
        cost_wage = pct_of_wage * invest_pa

        ratio_wage_to_emplo = fact("Fact_B_P_constr_main_ratio_wage_to_emplo_2017")
        demand_emplo = div(cost_wage, ratio_wage_to_emplo)
        demand_emplo_new = demand_emplo

        return cls(
            cost_wage=cost_wage,
            demand_emplo=demand_emplo,
            demand_emplo_com=0,
            demand_emplo_new=demand_emplo_new,
            invest=invest,
            invest_com=invest_com,
            invest_pa=invest_pa,
            invest_pa_com=invest_pa_com,
            ratio_wage_to_emplo=ratio_wage_to_emplo,
        )
