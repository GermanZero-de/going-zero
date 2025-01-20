# pyright: strict

from ....refdata import Facts, Assumptions
from ....utils import div, MILLION

from ...core.e_col_vars_2030 import EColVars2030
from ...core.energy_demand import Demand


def calc_production_renewable_reverse(
    facts: Facts,
    assumptions: Assumptions,
    duration_until_target_year: int,
    *,
    demand: Demand,
    p_renew_geoth_demand_emplo: float,
):
    fact = facts.fact
    ass = assumptions.ass

    p_renew_reverse = EColVars2030()

    p_renew_reverse.CO2e_total = 0
    p_renew_reverse.invest_pa_outside = 0
    p_renew_reverse.invest_outside = 0
    p_renew_reverse.cost_mro_per_MWh = ass(
        "Ass_E_P_renew_reverse_gud_cost_mro_per_MW"
    ) / ass("Ass_E_P_renew_reverse_full_load_hours")
    p_renew_reverse.CO2e_combustion_based_per_MWh = fact(
        "Fact_E_P_climate_neutral_ratio_CO2e_cb_to_fec"
    )
    p_renew_reverse.invest_per_x = (
        ass("Ass_E_P_renew_reverse_gud_ratio_invest_to_power") * 1000
    )
    p_renew_reverse.pct_of_wage = ass("Ass_E_P_constr_plant_invest_pct_of_wage_2017")
    p_renew_reverse.ratio_wage_to_emplo = ass(
        "Ass_E_P_constr_elec_ratio_wage_to_emplo_2017"
    )
    p_renew_reverse.power_installed = fact("Fact_E_P_gas_power_installed_2018")
    p_renew_reverse.full_load_hour = ass("Ass_E_P_renew_reverse_full_load_hours")
    p_renew_reverse.energy = (
        (
            demand.heat.energy
            + demand.residences.energy
            + demand.business.energy
            + demand.industry.energy
            + demand.transport.energy
            + demand.agri.energy
            + demand.fuels_wo_hydrogen.energy
        )
        * ass("Ass_E_P_renew_reverse_addon_to_demand_2035")
        * (1 - ass("Ass_E_P_renew_loss_brutto_to_netto"))
    )
    p_renew_reverse.power_to_be_installed = max(
        0,
        ass("Ass_E_P_renew_reverse_addon_to_demand_2035")
        * ass("Ass_E_P_renew_nep_total_2035")
        / ass("Ass_E_P_renew_reverse_full_load_hours")
        - p_renew_reverse.power_installed,
    )
    p_renew_reverse.cost_mro = (
        p_renew_reverse.energy * p_renew_reverse.cost_mro_per_MWh / MILLION
    )
    p_renew_reverse.CO2e_combustion_based = (
        p_renew_reverse.energy * p_renew_reverse.CO2e_combustion_based_per_MWh
    )
    p_renew_reverse.change_energy_MWh = p_renew_reverse.energy
    p_renew_reverse.invest = (
        p_renew_reverse.power_to_be_installed * p_renew_reverse.invest_per_x
    )
    p_renew_reverse.change_cost_mro = p_renew_reverse.cost_mro - 0
    p_renew_reverse.invest_pa = p_renew_reverse.invest / duration_until_target_year
    p_renew_reverse.cost_wage = p_renew_reverse.invest_pa * p_renew_reverse.pct_of_wage
    p_renew_reverse.demand_emplo = div(
        p_renew_reverse.cost_wage, p_renew_reverse.ratio_wage_to_emplo
    )
    p_renew_reverse.emplo_existing = (
        fact("Fact_E_P_geoth_emplo_2018")
        * p_renew_reverse.demand_emplo
        / (p_renew_geoth_demand_emplo + p_renew_reverse.demand_emplo)
    )
    p_renew_reverse.demand_emplo_new = p_renew_reverse.demand_emplo
    p_renew_reverse.change_CO2e_t = 0
    p_renew_reverse.cost_climate_saved = 0

    return p_renew_reverse
