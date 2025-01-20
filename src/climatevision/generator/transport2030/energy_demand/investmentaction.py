# pyright: strict

from dataclasses import dataclass

from ...refdata import Facts, Assumptions
from ...utils import div
from ...common.invest import InvestCommune


@dataclass(kw_only=True)
class InvestmentAction(InvestCommune):
    """For some transport mechanism additional investments are needed."""

    invest_per_x: float
    pct_of_wage: float
    ratio_wage_to_emplo: float

    @classmethod
    def calc_rail_action_invest_infra(
        cls,
        facts: Facts,
        assumptions: Assumptions,
        duration_until_target_year: int,
        population_commune_203X: int,
    ) -> "InvestmentAction":
        fact = facts.fact
        ass = assumptions.ass

        invest_per_x = ass("Ass_T_C_cost_per_trnsprt_rail_infrstrctr")
        invest = invest_per_x * population_commune_203X
        invest_pa = invest / duration_until_target_year
        pct_of_wage = fact("Fact_T_D_constr_roadrail_revenue_pct_of_wage_2018")
        cost_wage = invest_pa * pct_of_wage
        ratio_wage_to_emplo = fact("Fact_T_D_constr_roadrail_ratio_wage_to_emplo_2018")
        demand_emplo = div(
            cost_wage,
            ratio_wage_to_emplo,
        )
        invest_com = invest * ass("Ass_T_C_ratio_public_sector_100")
        demand_emplo_new = demand_emplo
        invest_pa_com = invest_com / duration_until_target_year

        return cls(
            cost_wage=cost_wage,
            demand_emplo=demand_emplo,
            demand_emplo_new=demand_emplo_new,
            invest=invest,
            invest_com=invest_com,
            invest_pa=invest_pa,
            invest_pa_com=invest_pa_com,
            invest_per_x=invest_per_x,
            pct_of_wage=pct_of_wage,
            ratio_wage_to_emplo=ratio_wage_to_emplo,
        )

    @classmethod
    def calc_rail_action_invest_station(
        cls,
        facts: Facts,
        assumptions: Assumptions,
        duration_until_target_year: int,
        population_commune_203X: int,
    ) -> "InvestmentAction":
        fact = facts.fact
        ass = assumptions.ass

        invest_per_x = ass("Ass_T_C_cost_per_trnsprt_rail_train_station")
        invest = invest_per_x * population_commune_203X
        invest_com = invest * ass("Ass_T_C_ratio_public_sector_100")
        invest_pa_com = invest_com / duration_until_target_year
        invest_pa = invest / duration_until_target_year
        pct_of_wage = fact("Fact_T_D_constr_roadrail_revenue_pct_of_wage_2018")
        cost_wage = invest_pa * pct_of_wage
        ratio_wage_to_emplo = fact("Fact_T_D_constr_roadrail_ratio_wage_to_emplo_2018")
        demand_emplo = div(
            cost_wage,
            ratio_wage_to_emplo,
        )
        demand_emplo_new = demand_emplo

        return cls(
            cost_wage=cost_wage,
            demand_emplo=demand_emplo,
            demand_emplo_new=demand_emplo_new,
            invest=invest,
            invest_com=invest_com,
            invest_pa=invest_pa,
            invest_pa_com=invest_pa_com,
            invest_per_x=invest_per_x,
            pct_of_wage=pct_of_wage,
            ratio_wage_to_emplo=ratio_wage_to_emplo,
        )

    @classmethod
    def calc_other_foot_action_infra(
        cls,
        facts: Facts,
        assumptions: Assumptions,
        duration_until_target_year: int,
        population_commune_203X: int,
    ) -> "InvestmentAction":
        fact = facts.fact
        ass = assumptions.ass

        invest_per_x = ass("Ass_T_D_invest_pedestrians")
        invest_pa = invest_per_x * population_commune_203X
        invest = invest_pa * duration_until_target_year
        invest_com = invest
        invest_pa_com = invest_pa
        pct_of_wage = fact("Fact_T_D_constr_roadrail_revenue_pct_of_wage_2018")
        cost_wage = invest_pa * pct_of_wage
        ratio_wage_to_emplo = fact("Fact_T_D_constr_roadrail_ratio_wage_to_emplo_2018")
        demand_emplo = div(cost_wage, ratio_wage_to_emplo)
        demand_emplo_new = demand_emplo

        return cls(
            cost_wage=cost_wage,
            demand_emplo=demand_emplo,
            demand_emplo_new=demand_emplo_new,
            invest=invest,
            invest_com=invest_com,
            invest_pa=invest_pa,
            invest_pa_com=invest_pa_com,
            invest_per_x=invest_per_x,
            pct_of_wage=pct_of_wage,
            ratio_wage_to_emplo=ratio_wage_to_emplo,
        )

    @classmethod
    def calc_other_cycl_action_infra(
        cls,
        facts: Facts,
        assumptions: Assumptions,
        duration_until_target_year: int,
        cycle_transport_capacity_pkm: float,
    ) -> "InvestmentAction":
        fact = facts.fact
        ass = assumptions.ass

        invest_per_x = ass("Ass_T_C_cost_per_trnsprt_ppl_cycle")
        invest = cycle_transport_capacity_pkm * invest_per_x
        invest_com = invest * ass("Ass_T_C_ratio_public_sector_100")
        invest_pa_com = invest_com / duration_until_target_year
        ratio_wage_to_emplo = fact("Fact_T_D_constr_roadrail_ratio_wage_to_emplo_2018")
        pct_of_wage = fact("Fact_T_D_constr_roadrail_revenue_pct_of_wage_2018")
        invest_pa = invest / duration_until_target_year
        cost_wage = invest_pa * pct_of_wage
        demand_emplo = div(
            cost_wage,
            ratio_wage_to_emplo,
        )
        demand_emplo_new = demand_emplo

        return cls(
            cost_wage=cost_wage,
            demand_emplo=demand_emplo,
            demand_emplo_new=demand_emplo_new,
            invest=invest,
            invest_com=invest_com,
            invest_pa=invest_pa,
            invest_pa_com=invest_pa_com,
            invest_per_x=invest_per_x,
            pct_of_wage=pct_of_wage,
            ratio_wage_to_emplo=ratio_wage_to_emplo,
        )


@dataclass(kw_only=True)
class RoadInvestmentAction(InvestmentAction):
    base_unit: float

    @classmethod
    def calc_car_action_charger(
        cls,
        facts: Facts,
        assumptions: Assumptions,
        duration_until_target_year: int,
        area_kind: str,
        car_base_unit: float,
    ) -> "RoadInvestmentAction":
        fact = facts.fact
        ass = assumptions.ass

        # Divide cars by chargers/car => chargers
        base_unit = car_base_unit / (
            ass("Ass_S_ratio_bev_car_per_charge_point_city")
            if area_kind == "city"
            else ass("Ass_S_ratio_bev_car_per_charge_point_smcity_rural")
            if area_kind == "smcty"
            else ass("Ass_S_ratio_bev_car_per_charge_point_smcity_rural")
            if area_kind == "rural"
            else ass("Ass_S_ratio_bev_car_per_charge_point_nat")
        )
        invest_per_x = ass("Ass_T_C_cost_per_charge_point")
        invest = base_unit * invest_per_x
        invest_pa = invest / duration_until_target_year
        pct_of_wage = fact("Fact_T_D_constr_roadrail_revenue_pct_of_wage_2018")
        invest_com = invest * ass("Ass_T_C_invest_state_charge_point_prctg")
        cost_wage = invest_pa * pct_of_wage
        ratio_wage_to_emplo = fact("Fact_T_D_constr_roadrail_ratio_wage_to_emplo_2018")
        demand_emplo = div(cost_wage, ratio_wage_to_emplo)
        invest_pa_com = invest_com / duration_until_target_year
        demand_emplo_new = demand_emplo
        return cls(
            base_unit=base_unit,
            cost_wage=cost_wage,
            demand_emplo=demand_emplo,
            demand_emplo_new=demand_emplo_new,
            invest=invest,
            invest_com=invest_com,
            invest_pa=invest_pa,
            invest_pa_com=invest_pa_com,
            invest_per_x=invest_per_x,
            pct_of_wage=pct_of_wage,
            ratio_wage_to_emplo=ratio_wage_to_emplo,
        )
