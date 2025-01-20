# pyright: strict

from ...makeentries import Entries
from ...refdata import Facts, Assumptions
from ...utils import div, MILLION
from ...electricity2018.e18 import E18
from ...residences2018.r18 import R18
from ...business2018.b18 import B18
from ...agri2030.a30 import A30
from ...business2030.b30 import B30
from ...fuels2030.f30 import F30
from ...heat2030.h30 import H30
from ...industry2030.i30 import I30
from ...residences2030.r30 import R30
from ...transport2030.t30 import T30
from ...waste2030 import WasteLines

from ..e30 import E30
from ..core.energy import Energy
from ..core.e_col_vars_2030 import EColVars2030
from ..core.energy_production.fossil_fuels_production import FossilFuelsProduction
from ..core.energy_production.geothermal import calc_production_renewable_geothermal
from ..core.energy_production.fossil_fuels import calc_stop_production_by_fossil_fuels
from ..core.energy_production.pv import (
    calc_production_local_pv_agri,
    calc_production_local_pv_facade,
    calc_production_local_pv_park,
    calc_production_local_pv_roof,
)
from ..core.energy_production.hydro import calc_production_local_hydro
from ..core.energy_production.local_wind_onshore import (
    calc_production_local_wind_onshore,
)
from ..core.energy_production.renew_hydro import calc_production_renew_hydro
from ..core.energy_production.renew_pv_agri import calc_production_renew_pv_agri
from ..core.energy_production.renew_pv_facade import calc_production_renew_pv_facade
from ..core.energy_production.renew_pv_park import calc_production_renew_pv_park
from ..core.energy_production.renew_pv_roof import calc_production_renew_pv_roof
from ..core.energy_production.renew_wind_offshore import calc_renew_wind_offshore
from ..core import energy_demand

from .energy_production.calc_production_renewable_reverse import (
    calc_production_renewable_reverse,
)
from .energy_production.calc_production_renewable_biomass import (
    calc_production_renewable_biomass,
)
from . import energy_general


# Berechnungsfunktion im Sektor E für 203X
def calc(
    entries: Entries,
    facts: Facts,
    assumptions: Assumptions,
    *,
    e18: E18,
    r18: R18,
    b18: B18,
    a30: A30,
    b30: B30,
    f30: F30,
    h30: H30,
    i30: I30,
    r30: R30,
    t30: T30,
    wastelines: WasteLines,
    p_local_biomass_cogen: EColVars2030,
    p_local_biomass: EColVars2030,
) -> E30:
    fact = facts.fact
    ass = assumptions.ass

    duration_until_target_year = entries.m_duration_target
    duration_CO2e_neutral_years = entries.m_duration_neutral

    population_commune_2018 = entries.m_population_com_2018
    population_germany_2018 = entries.m_population_nat

    p = EColVars2030()
    p_renew = EColVars2030()
    p_renew_wind = EColVars2030()

    p_renew_wind_offshore = calc_renew_wind_offshore(
        facts, assumptions, duration_until_target_year, d_energy=0
    )

    p_renew_wind_onshore = EColVars2030()
    p_renew_wind_onshore.cost_mro_per_MWh = (
        ass("Ass_E_P_local_wind_onshore_ratio_invest_to_power_2020")
        * ass("Ass_E_P_local_wind_onshore_mro_per_year")
        / fact("Fact_E_P_wind_onshore_full_load_hours")
        * 1000
    )
    p_renew_wind_onshore.energy = 0
    p_renew_wind_onshore.cost_mro = (
        p_renew_wind_onshore.energy * p_renew_wind_onshore.cost_mro_per_MWh / MILLION
    )
    p_renew_wind_onshore.change_energy_MWh = (
        p_renew_wind_onshore.energy - e18.p_renew_wind_onshore.energy
    )
    p_renew_wind_onshore.change_cost_mro = (
        p_renew_wind_onshore.cost_mro - e18.p_renew_wind_onshore.cost_mro
    )
    p_renew_wind_onshore.change_energy_pct = div(
        p_renew_wind_onshore.change_energy_MWh, e18.p_renew_wind_onshore.energy
    )
    p_renew_wind_onshore.change_CO2e_pct = 0
    p_renew_wind_onshore.cost_climate_saved = 0

    p_local = EColVars2030()
    p_local_pv = EColVars2030()
    p_local_pv_roof = calc_production_local_pv_roof(
        entries, assumptions, e18=e18, b18=b18, r18=r18
    )
    p_local_pv_facade = calc_production_local_pv_facade(
        entries, assumptions, e18=e18, b18=b18, r18=r18
    )
    p_local_pv_park = calc_production_local_pv_park(
        entries,
        assumptions,
        e18=e18,
        local_pv_roof_full_load_hour=p_local_pv_roof.full_load_hour,
    )
    p_local_pv_agri = calc_production_local_pv_agri(
        entries,
        assumptions,
        e18=e18,
        local_pv_park_full_load_hour=p_local_pv_park.full_load_hour,
        local_pv_roof_full_load_hour=p_local_pv_roof.full_load_hour,
    )
    p_local_hydro = calc_production_local_hydro(entries, facts, assumptions, e18=e18)
    p_local_surplus = Energy()
    p_local_wind_onshore = calc_production_local_wind_onshore(
        entries, facts, assumptions, e18=e18
    )

    p_renew_hydro = calc_production_renew_hydro(facts, assumptions, e18=e18, energy=0)
    p_renew_biomass = calc_production_renewable_biomass(
        facts, assumptions, duration_CO2e_neutral_years, e18=e18
    )

    """S T A R T"""
    demand = energy_demand.calc_demand(
        facts, e18, a30, b30, f30, h30, i30, r30, t30, wastelines
    )

    p_renew_pv_roof = calc_production_renew_pv_roof(
        assumptions,
        e18=e18,
        p_local_pv_roof_full_load_hour=p_local_pv_roof.full_load_hour,
        energy=0,
    )

    p_renew.invest_pa_com = 0
    p_renew.invest_com = 0
    p_fossil_nuclear = calc_stop_production_by_fossil_fuels(
        facts, duration_CO2e_neutral_years, e18_production=e18.p_fossil_nuclear
    )
    p_fossil_coal_brown = calc_stop_production_by_fossil_fuels(
        facts, duration_CO2e_neutral_years, e18_production=e18.p_fossil_coal_brown
    )
    p_fossil_coal_black = calc_stop_production_by_fossil_fuels(
        facts, duration_CO2e_neutral_years, e18_production=e18.p_fossil_coal_black
    )
    p_fossil_gas = calc_stop_production_by_fossil_fuels(
        facts, duration_CO2e_neutral_years, e18_production=e18.p_fossil_gas
    )
    p_fossil_ofossil = calc_stop_production_by_fossil_fuels(
        facts, duration_CO2e_neutral_years, e18_production=e18.p_fossil_ofossil
    )
    p_renew_pv = EColVars2030()
    p_renew_pv.CO2e_total = 0
    p_renew_pv.CO2e_combustion_based_per_MWh = fact(
        "Fact_E_P_climate_neutral_ratio_CO2e_cb_to_fec"
    )
    p_renew_pv.energy = 0
    p_renew_pv.CO2e_combustion_based = (
        p_renew_pv.energy * p_renew_pv.CO2e_combustion_based_per_MWh
    )

    p_renew_wind.CO2e_total = 0

    p_renew_geoth = calc_production_renewable_geothermal(
        facts, assumptions, duration_until_target_year, d_energy=0
    )
    # Not all values are calculated in the function, so we need to calculate them here
    p_renew_geoth.energy = (
        (p_renew_geoth.power_to_be_installed + p_renew_geoth.power_installed)
        * p_renew_geoth.full_load_hour
        * (1 - ass("Ass_E_P_renew_loss_brutto_to_netto"))
    )
    p_renew_geoth.cost_mro = (
        p_renew_geoth.energy * p_renew_geoth.cost_mro_per_MWh / MILLION
    )
    p_renew_geoth.change_energy_MWh = p_renew_geoth.energy - e18.p_renew_geoth.energy
    p_renew_geoth.invest = (
        p_renew_geoth.power_to_be_installed * p_renew_geoth.invest_per_x
    )
    p_renew_geoth.invest_pa = p_renew_geoth.invest / duration_until_target_year
    p_renew_geoth.change_cost_mro = p_renew_geoth.cost_mro - e18.p_renew_geoth.cost_mro
    p_renew_geoth.change_energy_pct = div(
        p_renew_geoth.change_energy_MWh, e18.p_renew_geoth.energy
    )
    p_renew_geoth.cost_wage = p_renew_geoth.invest_pa * p_renew_geoth.pct_of_wage
    p_renew_geoth.demand_emplo = div(
        p_renew_geoth.cost_wage, p_renew_geoth.ratio_wage_to_emplo
    )

    p_renew_reverse = calc_production_renewable_reverse(
        facts,
        assumptions,
        duration_until_target_year,
        demand=demand,
        p_renew_geoth_demand_emplo=p_renew_geoth.demand_emplo,
    )

    p_renew_wind.CO2e_combustion_based_per_MWh = fact(
        "Fact_E_P_climate_neutral_ratio_CO2e_cb_to_fec"
    )

    p_renew_wind_offshore.emplo_existing = fact("Fact_E_P_wind_offshore_emplo_2018")
    p_local_biomass.CO2e_total_2021_estimated = (
        e18.p_local_biomass.CO2e_combustion_based
        * fact("Fact_M_CO2e_wo_lulucf_2021_vs_year_ref")
    )
    p_local_biomass.cost_fuel_per_MWh = ass(
        "Ass_E_P_local_biomass_material_costs"
    ) / ass("Ass_E_P_local_biomass_efficiency")
    p_local_biomass.cost_mro_per_MWh = ass("Ass_E_P_local_biomass_mro_per_MWh")
    p_local_biomass.CO2e_combustion_based_per_MWh = fact(
        "Fact_E_P_biomass_ratio_CO2e_cb_nonCO2_to_gep_2018"
    ) / (1 - ass("Ass_E_P_renew_loss_brutto_to_netto"))
    p_local_biomass.invest_per_x = ass(
        "Ass_E_P_local_biomass_ratio_invest_to_power"
    )  # invest
    p_local_biomass.pct_of_wage = ass(
        "Ass_E_P_constr_plant_invest_pct_of_wage_2017"
    )  # cost_wage
    p_local_biomass.ratio_wage_to_emplo = ass(
        "Ass_E_P_constr_elec_ratio_wage_to_emplo_2017"
    )  # demand_emplo
    p_local_biomass.emplo_existing = (
        fact("Fact_E_P_biomass_emplo_2018")
        * population_commune_2018
        / population_germany_2018
    )

    p_fossil_ofossil.change_energy_MWh = (
        p_fossil_ofossil.energy - e18.p_fossil_ofossil.energy
    )
    p_renew.CO2e_total_2021_estimated = p_renew_biomass.CO2e_total_2021_estimated

    p_renew_pv_facade = calc_production_renew_pv_facade(
        assumptions,
        e18=e18,
        p_local_pv_facade_full_load_hour=p_local_pv_facade.full_load_hour,
        energy=0,
    )

    p_renew_pv_park = calc_production_renew_pv_park(
        assumptions,
        e18=e18,
        p_local_pv_park_full_load_hour=p_local_pv_park.full_load_hour,
        energy=0,
    )

    p_renew_pv_agri = calc_production_renew_pv_agri(
        assumptions,
        e18=e18,
        p_local_pv_agri_full_load_hour=p_local_pv_agri.full_load_hour,
        energy=0,
    )

    p_renew_wind.invest_pa_outside = p_renew_wind_offshore.invest_pa_outside
    p_renew_wind.invest_outside = p_renew_wind_offshore.invest_outside
    p_renew_wind.emplo_existing = p_renew_wind_offshore.emplo_existing

    p_local.CO2e_total_2021_estimated = p_local_biomass.CO2e_total_2021_estimated
    p_local_biomass.energy_installable = (
        p_local_biomass.power_installable
        * p_local_biomass.full_load_hour
        * (1 - ass("Ass_E_P_renew_loss_brutto_to_netto"))
    )

    p_renew.invest_pa_outside = (
        p_renew_wind.invest_pa_outside
        + p_renew_geoth.invest_pa_outside
        + p_renew_reverse.invest_pa_outside
    )
    p_renew.invest_outside = (
        p_renew_wind.invest_outside
        + p_renew_geoth.invest_outside
        + p_renew_reverse.invest_outside
    )
    p_renew_wind_offshore.invest = (
        p_renew_wind_offshore.power_to_be_installed * p_renew_wind_offshore.invest_per_x
    )
    p_local_biomass.invest = (
        p_local_biomass.power_to_be_installed * p_local_biomass.invest_per_x
    )
    p_fossil_coal_brown.change_CO2e_t = (
        p_fossil_coal_brown.CO2e_total - e18.p_fossil_coal_brown.CO2e_total
    )
    p_fossil_coal_black.change_CO2e_t = (
        p_fossil_coal_black.CO2e_total - e18.p_fossil_coal_black.CO2e_total
    )
    p_renew_pv.change_energy_MWh = (
        p_renew_pv_roof.change_energy_MWh
        + p_renew_pv_facade.change_energy_MWh
        + p_renew_pv_park.change_energy_MWh
        + p_renew_pv_agri.change_energy_MWh
    )
    p_renew_wind_offshore.energy = (
        (
            p_renew_wind_offshore.power_to_be_installed
            + p_renew_wind_offshore.power_installed
        )
        * p_renew_wind_offshore.full_load_hour
        * (1 - ass("Ass_E_P_renew_loss_brutto_to_netto"))
    )
    p_renew_wind_offshore.cost_mro = (
        p_renew_wind_offshore.energy * p_renew_wind_offshore.cost_mro_per_MWh / MILLION
    )
    p_renew_wind_offshore.change_energy_MWh = (
        p_renew_wind_offshore.energy - e18.p_renew_wind_offshore.energy
    )
    p_renew_wind.invest = p_renew_wind_offshore.invest
    p_renew_wind_offshore.invest_pa = (
        p_renew_wind_offshore.invest / duration_until_target_year
    )

    p_local_biomass.cost_fuel = (
        p_local_biomass.cost_fuel_per_MWh * p_local_biomass.energy / MILLION
    )
    p_local_biomass.cost_mro = (
        p_local_biomass.energy * p_local_biomass.cost_mro_per_MWh / MILLION
    )
    p_local_biomass.CO2e_combustion_based = (
        p_local_biomass.energy * p_local_biomass.CO2e_combustion_based_per_MWh
    )
    p_local_biomass.change_energy_MWh = (
        p_local_biomass.energy - e18.p_local_biomass.energy
    )
    p_local_biomass.invest_pa = p_local_biomass.invest / duration_until_target_year

    p_renew_pv.cost_mro = (
        p_renew_pv_roof.cost_mro
        + p_renew_pv_facade.cost_mro
        + p_renew_pv_park.cost_mro
        + p_renew_pv_agri.cost_mro
    )
    p_renew_pv.change_energy_pct = div(
        p_renew_pv.change_energy_MWh, e18.p_renew_pv.energy
    )
    p_renew_wind_offshore.change_cost_mro = (
        p_renew_wind_offshore.cost_mro - e18.p_renew_wind_offshore.cost_mro
    )
    p_renew_wind_offshore.change_energy_pct = div(
        p_renew_wind_offshore.change_energy_MWh, e18.p_renew_wind_offshore.energy
    )
    p_renew.invest = p_renew_wind.invest + p_renew_geoth.invest + p_renew_reverse.invest
    p_renew_wind.invest_pa = p_renew_wind_offshore.invest_pa
    p_renew_wind_offshore.cost_wage = (
        p_renew_wind_offshore.invest_pa
        * p_renew_wind_offshore.pct_of_wage
        / duration_until_target_year
    )
    p_renew.energy = (
        p_renew_wind_offshore.energy + p_renew_geoth.energy + p_renew_reverse.energy
    )
    p_renew.change_energy_MWh = p_renew.energy - e18.p_renew.energy

    p_local.cost_fuel = p_local_biomass.cost_fuel
    p_local_biomass.change_cost_energy = (
        p_local_biomass.cost_fuel - e18.p_local_biomass.cost_fuel
    )
    p_local_biomass.change_cost_mro = (
        p_local_biomass.cost_mro - e18.p_local_biomass.cost_mro
    )
    p_local_biomass.CO2e_total = p_local_biomass.CO2e_combustion_based
    p_local_biomass.cost_climate_saved = (
        (
            p_local_biomass.CO2e_total_2021_estimated
            - p_local_biomass.CO2e_combustion_based
        )
        * duration_CO2e_neutral_years
        * fact("Fact_M_cost_per_CO2e_2020")
    )
    p_local_biomass.cost_wage = (
        p_local_biomass.invest_pa
        * p_local_biomass.pct_of_wage
        / duration_until_target_year
    )  # ratio_wage_to_emplo
    p_renew_pv.change_cost_mro = (
        p_renew_pv_roof.change_cost_mro
        + p_renew_pv_facade.change_cost_mro
        + p_renew_pv_park.change_cost_mro
        + p_renew_pv_agri.change_cost_mro
    )
    p_local_pv_agri.energy = max(
        0,
        demand.total.energy
        - (
            p_local_pv_roof.energy
            + p_local_pv_facade.energy
            + p_local_pv_park.energy
            + p_local_wind_onshore.energy
            + p_local_biomass.energy
            + p_local_hydro.energy
            + p_renew.energy
        ),
    )
    p_local_pv_agri.power_to_be_installed_pct = div(
        p_local_pv_agri.energy, p_local_pv_agri.energy_installable
    )
    p_local_pv_agri.power_to_be_installed = max(
        0,
        p_local_pv_agri.power_installable * p_local_pv_agri.power_to_be_installed_pct
        - p_local_pv_agri.power_installed,
    )

    p_local_pv.CO2e_combustion_based_per_MWh = fact(
        "Fact_E_P_climate_neutral_ratio_CO2e_cb_to_fec"
    )
    p_local_pv.emplo_existing = (
        fact("Fact_B_P_install_elec_emplo_2018")
        * population_commune_2018
        / population_germany_2018
    )
    p_local_pv.power_installed = (
        p_local_pv_roof.power_installed
        + p_local_pv_facade.power_installed
        + p_local_pv_park.power_installed
        + p_local_pv_agri.power_installed
    )  #
    p_local_pv.power_installable = (
        p_local_pv_roof.power_installable
        + p_local_pv_facade.power_installable
        + p_local_pv_park.power_installable
        + p_local_pv_agri.power_installable
    )
    p_local_pv.energy_installable = (
        p_local_pv_roof.energy_installable
        + p_local_pv_facade.energy_installable
        + p_local_pv_park.energy_installable
        + p_local_pv_agri.energy_installable
    )
    p_local_pv.power_to_be_installed = (
        p_local_pv_roof.power_to_be_installed
        + p_local_pv_facade.power_to_be_installed
        + p_local_pv_park.power_to_be_installed
        + p_local_pv_agri.power_to_be_installed
    )

    general = energy_general.calc_general(
        facts,
        assumptions,
        entries.m_duration_target,
        p_renew_wind_offshore.power_to_be_installed,
        p_local_wind_onshore.power_to_be_installed,
        p_local_pv.power_to_be_installed,
    )

    p_renew.invest_pa = (
        p_renew_wind.invest_pa + p_renew_geoth.invest_pa + p_renew_reverse.invest_pa
    )
    p_renew_wind.cost_wage = p_renew_wind_offshore.cost_wage
    p_renew_wind_offshore.demand_emplo = div(
        p_renew_wind_offshore.cost_wage,
        p_renew_wind_offshore.ratio_wage_to_emplo,
    )
    p_renew.change_energy_pct = div(p_renew.change_energy_MWh, e18.p_renew.energy)
    p_renew_wind.energy = p_renew_wind_onshore.energy + p_renew_wind_offshore.energy

    p_local_pv.invest_com = p_local_pv_roof.invest_com + p_local_pv_facade.invest_com
    p_local_pv.energy = (
        p_local_pv_roof.energy
        + p_local_pv_facade.energy
        + p_local_pv_park.energy
        + p_local_pv_agri.energy
    )  #
    p_local_pv_agri.cost_mro = (
        p_local_pv_agri.energy * p_local_pv_agri.cost_mro_per_MWh / MILLION
    )
    p_local_pv_agri.change_energy_MWh = (
        p_local_pv_agri.energy - e18.p_local_pv_agri.energy
    )
    p_local.change_cost_energy = p_local_biomass.change_cost_energy
    p_local.change_cost_mro = p_local_biomass.change_cost_mro
    p_local_biomass.change_CO2e_t = p_local_biomass.CO2e_total - 0
    p_local.cost_climate_saved = p_local_biomass.cost_climate_saved
    p_local_biomass.demand_emplo = div(
        p_local_biomass.cost_wage, p_local_biomass.ratio_wage_to_emplo
    )
    p_renew.cost_wage = (
        p_renew_wind.cost_wage + p_renew_geoth.cost_wage + p_renew_reverse.cost_wage
    )
    p_renew_wind.demand_emplo = p_renew_wind_offshore.demand_emplo
    p_renew_wind_offshore.demand_emplo_new = max(
        0, p_renew_wind_offshore.demand_emplo - p_renew_wind_offshore.emplo_existing
    )
    p_renew_wind.CO2e_combustion_based = (
        p_renew_wind.energy * p_renew_wind.CO2e_combustion_based_per_MWh
    )
    p_renew_wind.cost_mro = (
        p_renew_wind_onshore.cost_mro + p_renew_wind_offshore.cost_mro
    )
    p_renew_wind.change_energy_MWh = (
        p_renew_wind_onshore.change_energy_MWh + p_renew_wind_offshore.change_energy_MWh
    )
    p_renew.cost_fuel = p_renew_biomass.cost_fuel

    p_renew_geoth.emplo_existing = (
        fact("Fact_E_P_geoth_emplo_2018")
        * p_renew_geoth.demand_emplo
        / (p_renew_geoth.demand_emplo + p_renew_reverse.demand_emplo)
    )

    p_local_pv_roof.demand_emplo = div(
        p_local_pv_roof.cost_wage, p_local_pv_roof.ratio_wage_to_emplo
    )
    p_local.invest_com = p_local_pv.invest_com
    p_local_pv_park.invest_pa_com = 0
    p_local_pv_agri.invest_pa_com = 0
    p_local.invest_pa_com = (
        p_local_pv_roof.invest_pa_com
        + p_local_pv_facade.invest_pa_com
        + p_local_pv_park.invest_pa_com
        + p_local_pv_agri.invest_pa_com
    )  #
    p_local_pv.invest_pa_com = (
        p_local_pv_roof.invest_pa_com
        + p_local_pv_facade.invest_pa_com
        + p_local_pv_park.invest_pa_com
        + p_local_pv_agri.invest_pa_com
    )  #
    p_local_pv_park.demand_emplo = div(
        p_local_pv_park.cost_wage, p_local_pv_park.ratio_wage_to_emplo
    )
    p_local.energy = (
        p_local_pv.energy
        + p_local_wind_onshore.energy
        + p_local_biomass.energy
        + p_local_hydro.energy
    )
    p_local_pv.CO2e_combustion_based = (
        p_local_pv.energy * p_local_pv.CO2e_combustion_based_per_MWh
    )
    p_local_pv.CO2e_total = p_local_pv.CO2e_combustion_based
    p_local_pv.change_CO2e_t = p_local_pv.CO2e_total - e18.p_local_pv.CO2e_total
    p_local_pv.change_energy_MWh = p_local_pv.energy - e18.p_local_pv.energy
    p_local_pv_roof.pet_sites = div(p_local_pv_roof.energy, p_local_pv.energy)
    p_local_pv_facade.pet_sites = div(p_local_pv_facade.energy, p_local_pv.energy)
    p_local_pv_park.pet_sites = div(p_local_pv_park.energy, p_local_pv.energy)
    p_local_pv_agri.pet_sites = div(p_local_pv_agri.energy, p_local_pv.energy)
    p_local_pv.cost_mro = (
        p_local_pv_roof.cost_mro
        + p_local_pv_facade.cost_mro
        + p_local_pv_park.cost_mro
        + p_local_pv_agri.cost_mro
    )  #
    p_local_pv_agri.change_cost_mro = (
        p_local_pv_agri.cost_mro - e18.p_local_pv_agri.cost_mro
    )
    p_local_pv_agri.change_energy_pct = div(
        p_local_pv_agri.change_energy_MWh, e18.p_local_pv_agri.energy
    )
    p_local_wind_onshore.demand_emplo = div(
        p_local_wind_onshore.cost_wage, p_local_wind_onshore.ratio_wage_to_emplo
    )
    p_local.change_CO2e_t = p_local_biomass.change_CO2e_t
    p_local_biomass.demand_emplo_new = max(
        0, p_local_biomass.demand_emplo - p_local_biomass.emplo_existing
    )
    p_renew.demand_emplo = (
        p_renew_wind.demand_emplo
        + p_renew_geoth.demand_emplo
        + p_renew_reverse.demand_emplo
    )
    p_renew_wind.demand_emplo_new = max(
        0, p_renew_wind.demand_emplo - p_renew_wind.emplo_existing
    )
    p_renew.CO2e_combustion_based = (
        p_renew_pv.CO2e_combustion_based
        + p_renew_wind.CO2e_combustion_based
        + p_renew_biomass.CO2e_combustion_based
        + p_renew_geoth.CO2e_combustion_based
        + p_renew_hydro.CO2e_combustion_based
        + p_renew_reverse.CO2e_combustion_based
    )
    p_renew.cost_mro = (
        p_renew_pv.cost_mro
        + p_renew_wind.cost_mro
        + p_renew_biomass.cost_mro
        + p_renew_geoth.cost_mro
        + p_renew_hydro.cost_mro
        + p_renew_reverse.cost_mro
    )
    p_renew_wind.change_cost_mro = p_renew_wind.cost_mro - e18.p_renew_wind.cost_mro
    p_renew_wind.change_energy_pct = div(
        p_renew_wind.change_energy_MWh, e18.p_renew_wind.energy
    )
    p_renew.change_cost_energy = p_renew_biomass.change_cost_energy
    p_renew.change_cost_mro = p_renew_biomass.change_cost_mro
    p_renew.CO2e_total = (
        p_renew_pv.CO2e_total
        + p_renew_wind.CO2e_total
        + p_renew_biomass.CO2e_total
        + p_renew_geoth.CO2e_total
        + p_renew_hydro.CO2e_total
        + p_renew_reverse.CO2e_total
    )
    p_renew.cost_climate_saved = p_renew_biomass.cost_climate_saved
    p_renew_geoth.demand_emplo_new = max(
        0, p_renew_geoth.demand_emplo - p_renew_geoth.emplo_existing
    )

    p_fossil = FossilFuelsProduction.sum(
        p_fossil_nuclear,
        p_fossil_coal_brown,
        p_fossil_coal_black,
        p_fossil_gas,
        p_fossil_ofossil,
        energy_18=e18.p_fossil.energy,
        CO2e_total_18=e18.p_fossil.CO2e_total,
    )
    p_fossil.CO2e_total = 0

    p_fossil_and_renew = EColVars2030()
    p_fossil_and_renew.invest_pa_com = p_renew.invest_pa_com
    p_fossil_and_renew.invest_com = p_renew.invest_com
    p_fossil_and_renew.CO2e_total_2021_estimated = (
        p_fossil.CO2e_total_2021_estimated + p_renew.CO2e_total_2021_estimated
    )
    p_fossil_and_renew.invest_pa_outside = p_renew.invest_pa_outside
    p_fossil_and_renew.invest_outside = p_renew.invest_outside
    p_fossil_and_renew.energy = p_renew.energy
    p_fossil_and_renew.invest = p_renew.invest
    p_fossil_and_renew.change_energy_MWh = (
        p_fossil_and_renew.energy - e18.p_fossil_and_renew.energy
    )
    p_fossil_and_renew.invest_pa = p_renew.invest_pa
    p_fossil_and_renew.change_energy_pct = div(
        p_fossil_and_renew.change_energy_MWh, e18.p_fossil_and_renew.energy
    )
    p_fossil_and_renew.cost_wage = p_renew.cost_wage
    p_fossil_and_renew.cost_fuel = p_fossil.cost_fuel + p_renew.cost_fuel
    p.CO2e_total_2021_estimated = (
        p_fossil_and_renew.CO2e_total_2021_estimated + p_local.CO2e_total_2021_estimated
    )
    p.invest_pa_outside = p_fossil_and_renew.invest_pa_outside
    p.invest_outside = p_fossil_and_renew.invest_outside
    p.invest_com = p_fossil_and_renew.invest_com + p_local.invest_com
    p.invest_pa_com = p_fossil_and_renew.invest_pa_com + p_local.invest_pa_com
    p.energy = p_fossil_and_renew.energy + p_local.energy
    p_renew_reverse.pct_x = div(p_renew_reverse.energy, p.energy)
    p_local.change_energy_MWh = p_local.energy - e18.p_local.energy
    p_local_surplus.energy = p_local.energy - demand.total.energy
    p_local.CO2e_combustion_based = (
        p_local_pv.CO2e_combustion_based
        + p_local_wind_onshore.CO2e_combustion_based
        + p_local_biomass.CO2e_combustion_based
        + p_local_hydro.CO2e_combustion_based
    )
    p_local_pv.change_energy_pct = div(
        p_local_pv.change_energy_MWh, e18.p_local_pv.energy
    )
    p_local.cost_mro = (
        p_local_pv.cost_mro
        + p_local_wind_onshore.cost_mro
        + p_local_biomass.cost_mro
        + p_local_hydro.cost_mro
    )
    p_local_pv.change_cost_mro = p_local_pv.cost_mro - e18.p_local_pv.cost_mro
    p_local_pv_agri.invest = (
        p_local_pv_agri.power_to_be_installed * p_local_pv_agri.invest_per_x
    )
    p_local_wind_onshore.demand_emplo_new = max(
        0, p_local_wind_onshore.demand_emplo - p_local_wind_onshore.emplo_existing
    )
    p_fossil_and_renew.demand_emplo = p_renew.demand_emplo
    p_fossil_and_renew.CO2e_combustion_based = (
        p_fossil.CO2e_combustion_based + p_renew.CO2e_combustion_based
    )
    p_renew.CO2e_combustion_based_per_MWh = div(
        p_renew.CO2e_combustion_based, p_renew.energy
    )
    p_fossil_and_renew.cost_mro = p_fossil.cost_mro + p_renew.cost_mro
    p.cost_fuel = p_fossil_and_renew.cost_fuel + p_local.cost_fuel
    p_fossil_and_renew.change_cost_energy = (
        p_fossil.change_cost_energy + p_renew.change_cost_energy
    )
    p_fossil_and_renew.change_cost_mro = (
        p_fossil.change_cost_mro + p_renew.change_cost_mro
    )
    p_renew.change_CO2e_t = p_renew_biomass.change_CO2e_t
    p_fossil_and_renew.cost_climate_saved = (
        p_fossil.cost_climate_saved + p_renew.cost_climate_saved
    )
    p_renew.demand_emplo_new = (
        p_renew_wind.demand_emplo_new
        + p_renew_geoth.demand_emplo_new
        + p_renew_reverse.demand_emplo_new
    )
    demand.residences.cost_fuel = (
        demand.residences.energy
        * demand.residences.cost_fuel_per_MWh
        * p_fossil_and_renew.energy
        / p.energy
        / MILLION
    )
    demand.business.cost_fuel = (
        demand.business.energy
        * demand.business.cost_fuel_per_MWh
        * p_fossil_and_renew.energy
        / p.energy
        / MILLION
    )
    demand.industry.cost_fuel = (
        demand.industry.energy
        * demand.industry.cost_fuel_per_MWh
        * p_fossil_and_renew.energy
        / p.energy
        / MILLION
    )
    demand.transport.cost_fuel = (
        demand.transport.energy
        * demand.transport.cost_fuel_per_MWh
        * p_fossil_and_renew.energy
        / p.energy
        / MILLION
    )
    demand.agri.cost_fuel = (
        demand.agri.energy
        * demand.agri.cost_fuel_per_MWh
        * p_fossil_and_renew.energy
        / p.energy
        / MILLION
    )
    p.change_energy_MWh = p.energy - e18.p.energy
    p_renew_wind_offshore.pct_x = div(p_renew_wind_offshore.energy, p.energy)
    p_renew_geoth.pct_x = div(p_renew_geoth.energy, p.energy)
    p_local_pv.pct_x = div(p_local_pv.energy, p.energy)
    p_local_wind_onshore.pct_x = div(p_local_wind_onshore.energy, p.energy)
    p_local_biomass.pct_x = div(p_local_biomass.energy, p.energy)
    p_local_hydro.pct_x = div(p_local_hydro.energy, p.energy)  #
    p_local.change_energy_pct = div(p_local.change_energy_MWh, e18.p_local.energy)

    p_local_pv_roof.pct_x = div(p_local_pv_roof.energy, p.energy)

    p_local.CO2e_combustion_based_per_MWh = div(
        p_local.CO2e_combustion_based, p_local.energy
    )
    p_local.CO2e_total = p_local.CO2e_combustion_based  # change_energy_MWh
    p_local.invest = (
        p_local_pv_roof.invest
        + p_local_pv_facade.invest
        + p_local_pv_park.invest
        + p_local_pv_agri.invest
        + p_local_wind_onshore.invest
        + p_local_biomass.invest
    )
    p_local_pv.invest = (
        p_local_pv_roof.invest
        + p_local_pv_facade.invest
        + p_local_pv_park.invest
        + p_local_pv_agri.invest
    )  #
    p_local_pv_agri.invest_pa = p_local_pv_agri.invest / duration_until_target_year
    p.CO2e_combustion_based = (
        p_fossil_and_renew.CO2e_combustion_based + p_local.CO2e_combustion_based
    )
    p_fossil_and_renew.CO2e_combustion_based_per_MWh = div(
        p_fossil_and_renew.CO2e_combustion_based, p_fossil_and_renew.energy
    )
    p_fossil_and_renew.CO2e_total = p_fossil_and_renew.CO2e_combustion_based
    p.cost_mro = p_fossil_and_renew.cost_mro + p_local.cost_mro
    p.change_cost_energy = (
        p_fossil_and_renew.change_cost_energy + p_local.change_cost_energy
    )
    p.change_cost_mro = p_fossil_and_renew.change_cost_mro + p_local.change_cost_mro
    p.change_CO2e_t = (
        p_fossil.change_CO2e_t + p_renew.change_CO2e_t + p_local.change_CO2e_t
    )
    p_fossil_and_renew.change_CO2e_t = p_fossil.change_CO2e_t + p_renew.change_CO2e_t
    p_renew.change_CO2e_pct = div(p_renew.change_CO2e_t, e18.p_renew.CO2e_total)
    p.cost_climate_saved = (
        p_fossil_and_renew.cost_climate_saved + p_local.cost_climate_saved
    )
    p_fossil_and_renew.demand_emplo_new = p_renew.demand_emplo_new
    p.change_energy_pct = div(p.change_energy_MWh, e18.p.energy)
    p.invest = p_fossil_and_renew.invest + p_local.invest
    p_local.invest_pa = (
        p_local_pv_roof.invest_pa
        + p_local_pv_facade.invest_pa
        + p_local_pv_park.invest_pa
        + p_local_pv_agri.invest_pa
        + p_local_wind_onshore.invest_pa
        + p_local_biomass.invest_pa
    )  #
    p_local_pv.invest_pa = (
        p_local_pv_roof.invest_pa
        + p_local_pv_facade.invest_pa
        + p_local_pv_park.invest_pa
        + p_local_pv_agri.invest_pa
    )  # (
    p_local_pv_agri.cost_wage = p_local_pv_agri.invest_pa * p_local_pv_agri.pct_of_wage
    p.CO2e_combustion_based_per_MWh = div(p.CO2e_combustion_based, p.energy)
    p.CO2e_total = p.CO2e_combustion_based
    p.change_CO2e_pct = div(p.change_CO2e_t, e18.p.CO2e_combustion_based)
    p_fossil_and_renew.change_CO2e_pct = div(
        p_fossil_and_renew.change_CO2e_t, e18.p_fossil_and_renew.CO2e_total
    )
    p.invest_pa = p_fossil_and_renew.invest_pa + p_local.invest_pa
    p_local_pv.cost_wage = (
        p_local_pv_roof.cost_wage
        + p_local_pv_facade.cost_wage
        + p_local_pv_park.cost_wage
        + p_local_pv_agri.cost_wage
    )
    p_local_pv_agri.demand_emplo = div(
        p_local_pv_agri.cost_wage, p_local_pv_agri.ratio_wage_to_emplo
    )
    p_local.cost_wage = (
        p_local_pv.cost_wage
        + p_local_wind_onshore.cost_wage
        + p_local_biomass.cost_wage
    )
    p_local_pv.demand_emplo = (
        p_local_pv_roof.demand_emplo
        + p_local_pv_facade.demand_emplo
        + p_local_pv_park.demand_emplo
        + p_local_pv_agri.demand_emplo
    )
    p.cost_wage = p_fossil_and_renew.cost_wage + p_local.cost_wage
    p_local.demand_emplo = (
        p_local_pv.demand_emplo
        + p_local_wind_onshore.demand_emplo
        + p_local_biomass.demand_emplo
    )  # emplo_existing
    p_local_pv.demand_emplo_new = max(
        0, p_local_pv.demand_emplo - p_local_pv.emplo_existing
    )
    p.demand_emplo = p_fossil_and_renew.demand_emplo + p_local.demand_emplo
    p_local.demand_emplo_new = (
        p_local_pv.demand_emplo_new
        + p_local_wind_onshore.demand_emplo_new
        + p_local_biomass.demand_emplo_new
    )
    p.demand_emplo_new = p_fossil_and_renew.demand_emplo_new + p_local.demand_emplo_new

    p_local.power_installed = (
        p_local_pv.power_installed
        + p_local_wind_onshore.power_installed
        + p_local_biomass.power_installed
        + p_local_hydro.power_installed
    )

    p_local.power_installable = (
        p_local_pv.power_installable
        + p_local_wind_onshore.power_installable
        + p_local_biomass.power_installable
        # p_local_hydro.power_installable
    )

    p_local.power_to_be_installed = (
        p_local_pv.power_to_be_installed
        + p_local_wind_onshore.power_to_be_installed
        + p_local_biomass.power_to_be_installed
        # p_local_hydro.power_to_be_installed
    )

    # TODO: correct excel calculations and reimport these somehow missing variabels to python
    p_local_pv.cost_climate_saved = 0
    # p_local_pv_roof.change_CO2e_t = 0
    # p_local_pv_roof.cost_climate_saved = 0

    p_local_wind_onshore.CO2e_total = 0
    p_local_wind_onshore.cost_climate_saved = 0

    p_renew_wind.change_CO2e_t = 0
    p_renew_wind.cost_climate_saved = 0

    p_renew_wind_onshore.CO2e_total = 0
    p_renew_wind_onshore.cost_climate_saved = 0
    p_renew_wind_onshore.change_CO2e_t = 0
    p_renew_wind_offshore.change_CO2e_t = 0
    p_renew_wind_offshore.CO2e_total = 0
    p_renew_wind_offshore.cost_climate_saved = 0

    p_renew_pv.cost_climate_saved = 0
    p_renew_pv.change_CO2e_t = 0

    p_renew_geoth.change_CO2e_t = 0
    p_renew_geoth.cost_climate_saved = 0

    # ---copy
    p_renew_pv.change_CO2e_pct = 0

    p_renew_wind.change_CO2e_pct = 0
    p_renew_wind_offshore.change_CO2e_pct = 0

    p_renew_geoth.change_CO2e_pct = 0

    p_local.change_CO2e_pct = 0
    p_local_pv.change_CO2e_pct = 0
    p_local_wind_onshore.change_CO2e_pct = 0
    p_local_biomass.change_CO2e_pct = div(
        p_local_biomass.change_CO2e_t, e18.p_local_biomass.CO2e_total
    )

    p_renew_pv.cost_climate_saved = 0

    p_renew_wind.cost_climate_saved = 0
    p_renew_wind_offshore.cost_climate_saved = 0

    p_renew_geoth.cost_climate_saved = 0

    p_local.cost_climate_saved = 0
    p_local_pv.cost_climate_saved = 0
    p_local_pv_agri.cost_climate_saved = 0
    p_local_pv_facade.cost_climate_saved = 0
    p_local_pv_park.cost_climate_saved = 0
    p_local_wind_onshore.cost_climate_saved = 0

    p_renew_reverse.change_CO2e_pct = 0

    e = EColVars2030()
    e.CO2e_total_2021_estimated = p.CO2e_total_2021_estimated
    e.invest_pa_outside = general.g.invest_pa_outside + p.invest_pa_outside
    e.invest_outside = general.g.invest_outside + p.invest_outside
    e.invest_com = 0 + p.invest_com
    e.invest_pa_com = 0 + p.invest_pa_com
    e.CO2e_combustion_based = p.CO2e_combustion_based
    e.change_CO2e_t = p.change_CO2e_t
    e.cost_climate_saved = p.cost_climate_saved
    e.change_energy_pct = p.change_energy_pct
    e.CO2e_total = p.CO2e_total
    e.change_CO2e_pct = p.change_CO2e_pct
    e.invest = general.g.invest + p.invest
    e.invest_pa = general.g.invest_pa + p.invest_pa
    e.cost_wage = general.g.cost_wage + p.cost_wage
    e.demand_emplo = general.g.demand_emplo + p.demand_emplo
    e.demand_emplo_new = general.g.demand_emplo_new + p.demand_emplo_new
    e.change_energy_MWh = p.change_energy_MWh

    return E30(
        e=e,
        g=general.g,
        g_grid_offshore=general.g_grid_offshore,
        g_grid_onshore=general.g_grid_onshore,
        g_grid_pv=general.g_grid_pv,
        d=demand.total,
        d_r=demand.residences,
        d_b=demand.business,
        d_h=demand.heat,
        d_i=demand.industry,
        d_t=demand.transport,
        d_a=demand.agri,
        d_w=demand.waste,
        d_f_hydrogen_reconv=demand.fuels_hydrogen_reconv,
        d_f_wo_hydrogen=demand.fuels_wo_hydrogen,
        p=p,
        p_fossil_and_renew=p_fossil_and_renew,
        p_fossil=p_fossil,
        p_fossil_nuclear=p_fossil_nuclear,
        p_fossil_coal_brown=p_fossil_coal_brown,
        p_fossil_coal_black=p_fossil_coal_black,
        p_fossil_gas=p_fossil_gas,
        p_fossil_ofossil=p_fossil_ofossil,
        p_renew=p_renew,
        p_renew_pv=p_renew_pv,
        p_renew_pv_roof=p_renew_pv_roof,
        p_renew_pv_facade=p_renew_pv_facade,
        p_renew_pv_park=p_renew_pv_park,
        p_renew_pv_agri=p_renew_pv_agri,
        p_renew_wind=p_renew_wind,
        p_renew_wind_onshore=p_renew_wind_onshore,
        p_renew_wind_offshore=p_renew_wind_offshore,
        p_renew_biomass=p_renew_biomass,
        p_renew_geoth=p_renew_geoth,
        p_renew_hydro=p_renew_hydro,
        p_renew_reverse=p_renew_reverse,
        p_local=p_local,
        p_local_pv=p_local_pv,
        p_local_pv_roof=p_local_pv_roof,
        p_local_pv_facade=p_local_pv_facade,
        p_local_pv_park=p_local_pv_park,
        p_local_pv_agri=p_local_pv_agri,
        p_local_wind_onshore=p_local_wind_onshore,
        p_local_biomass=p_local_biomass,
        p_local_biomass_cogen=p_local_biomass_cogen,
        p_local_hydro=p_local_hydro,
        p_local_surplus=p_local_surplus,
    )
