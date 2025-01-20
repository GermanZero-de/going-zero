# pyright: strict

from dataclasses import dataclass, InitVar

from ...refdata import Facts, Assumptions
from ...utils import div, MILLION
from ...heat2018.h18 import H18
from ...common.energy import EnergyChange
from ...common.energy_with_co2e_per_mwh import EnergyWithCO2ePerMWh
from ...common.energy_with_co2e import EnergyWithCO2e
from ...common.co2e_change import CO2eChange
from ...common.invest import InvestCommune


@dataclass(kw_only=True)
class CO2eChangeHeatProduction(EnergyWithCO2e, CO2eChange, EnergyChange):
    facts: InitVar[Facts]
    duration_CO2e_neutral_years: InitVar[float]
    what: InitVar[str]
    h18: InitVar[H18]

    def __post_init__(  # type: ignore[override]
        self,
        facts: Facts,
        duration_CO2e_neutral_years: float,
        what: str,
        h18: H18,
    ):
        fact = facts.fact

        if what == "":
            h18_p_what = getattr(h18, "p" + what)
        else:
            h18_p_what = getattr(h18, "p_" + what)

        EnergyWithCO2e.__post_init__(self)

        self.change_energy_MWh = self.energy - h18_p_what.energy
        self.change_energy_pct = div(self.change_energy_MWh, h18_p_what.energy)

        self.change_CO2e_t = self.CO2e_total - h18_p_what.CO2e_total
        self.change_CO2e_pct = div(self.change_CO2e_t, h18_p_what.CO2e_total)

        self.CO2e_total_2021_estimated = h18_p_what.CO2e_total * fact(
            "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref"
        )

        self.cost_climate_saved = (
            (self.CO2e_total_2021_estimated - self.CO2e_total)
            * duration_CO2e_neutral_years
            * fact("Fact_M_cost_per_CO2e_2020")
        )


@dataclass(kw_only=True)
class InvestPerX:
    invest_per_x: float


@dataclass(kw_only=True)
class InvestHeatProduction(InvestCommune):
    pct_of_wage: float = 0
    ratio_wage_to_emplo: float = 0

    facts: InitVar[Facts]
    duration_until_target_year: InitVar[int]
    what: InitVar[str]
    h18: InitVar[H18]

    def __post_init__(  # type: ignore[override]
        self, facts: Facts, duration_until_target_year: int
    ):
        fact = facts.fact

        self.pct_of_wage = fact("Fact_B_P_constr_main_revenue_pct_of_wage_2018")
        self.ratio_wage_to_emplo = fact("Fact_B_P_constr_main_ratio_wage_to_emplo_2017")

        self.invest_com = self.invest

        self.invest_pa = self.invest / duration_until_target_year
        self.invest_pa_com = self.invest_pa

        self.cost_wage = self.pct_of_wage * self.invest_pa

        self.demand_emplo = div(self.cost_wage, self.ratio_wage_to_emplo)
        self.demand_emplo_new = self.demand_emplo


@dataclass(kw_only=True)
class HeatProduction(EnergyWithCO2ePerMWh, CO2eChangeHeatProduction):  # type: ignore[override]
    facts: InitVar[Facts]
    duration_CO2e_neutral_years: InitVar[float]
    what: InitVar[str]
    h18: InitVar[H18]

    def __post_init__(  # type: ignore[override]
        self,
        facts: Facts,
        duration_CO2e_neutral_years: float,
        what: str,
        h18: H18,
    ):
        EnergyWithCO2ePerMWh.__post_init__(self)
        CO2eChangeHeatProduction.__post_init__(
            self,
            facts=facts,
            duration_CO2e_neutral_years=duration_CO2e_neutral_years,
            what=what,
            h18=h18,
        )


@dataclass(kw_only=True)
class HeatProductionWithCostFuel(HeatProduction):
    cost_fuel: float = 0
    cost_fuel_per_MWh: float = 0

    facts: InitVar[Facts]
    assumptions: InitVar[Assumptions]
    duration_CO2e_neutral_years: InitVar[float]
    what: InitVar[str]
    h18: InitVar[H18]

    def __post_init__(  # type: ignore[override]
        self,
        facts: Facts,
        duration_CO2e_neutral_years: float,
        what: str,
        h18: H18,
        assumptions: Assumptions,
    ):
        fact = facts.fact
        ass = assumptions.ass

        HeatProduction.__post_init__(
            self,
            facts=facts,
            duration_CO2e_neutral_years=duration_CO2e_neutral_years,
            what=what,
            h18=h18,
        )

        if what == "biomass":
            self.cost_fuel_per_MWh = fact("Fact_R_S_wood_energy_cost_factor_2018")
        else:
            self.cost_fuel_per_MWh = ass("Ass_R_S_" + what + "_energy_cost_factor_2035")

        self.cost_fuel = self.energy * self.cost_fuel_per_MWh / MILLION


@dataclass(kw_only=True)
class HeatnetPlantProduction(HeatProduction, InvestHeatProduction, InvestPerX):
    area_ha_available: float = 0

    facts: InitVar[Facts]
    duration_CO2e_neutral_years: InitVar[float]
    what: InitVar[str]
    h18: InitVar[H18]
    duration_until_target_year: InitVar[int]

    def __post_init__(  # type: ignore[override]
        self,
        facts: Facts,
        duration_until_target_year: int,
        what: str,
        h18: H18,
        duration_CO2e_neutral_years: float,
    ):
        fact = facts.fact

        HeatProduction.__post_init__(
            self,
            facts=facts,
            duration_CO2e_neutral_years=duration_CO2e_neutral_years,
            what=what,
            h18=h18,
        )

        self.area_ha_available = self.energy / fact(
            "Fact_H_P_heatnet_solarth_park_yield_2025"
        )
        self.invest = self.invest_per_x * self.area_ha_available

        InvestHeatProduction.__post_init__(
            self, facts=facts, duration_until_target_year=duration_until_target_year
        )


@dataclass(kw_only=True)
class HeatnetGeothProduction(HeatProduction, InvestHeatProduction, InvestPerX):
    full_load_hour: float
    power_to_be_installed: float = 0

    facts: InitVar[Facts]
    duration_until_target_year: InitVar[int]
    what: InitVar[str]
    h18: InitVar[H18]
    duration_CO2e_neutral_years: InitVar[float]

    def __post_init__(  # type: ignore[override]
        self,
        facts: Facts,
        duration_until_target_year: int,
        what: str,
        h18: H18,
        duration_CO2e_neutral_years: float,
    ):
        HeatProduction.__post_init__(
            self,
            facts=facts,
            duration_CO2e_neutral_years=duration_CO2e_neutral_years,
            what=what,
            h18=h18,
        )

        self.power_to_be_installed = div(self.energy, self.full_load_hour)
        self.invest = self.invest_per_x * self.power_to_be_installed

        InvestHeatProduction.__post_init__(
            self, facts=facts, duration_until_target_year=duration_until_target_year
        )


@dataclass(kw_only=True)
class HeatnetLheatpumpProduction(HeatnetGeothProduction):
    demand_electricity: float = 0

    facts: InitVar[Facts]
    duration_until_target_year: InitVar[int]
    what: InitVar[str]
    h18: InitVar[H18]
    duration_CO2e_neutral_years: InitVar[float]

    def __post_init__(
        self,
        facts: Facts,
        duration_until_target_year: int,
        what: str,
        h18: H18,
        duration_CO2e_neutral_years: float,
    ):
        fact = facts.fact

        HeatnetGeothProduction.__post_init__(
            self,
            facts=facts,
            duration_CO2e_neutral_years=duration_CO2e_neutral_years,
            what=what,
            h18=h18,
            duration_until_target_year=duration_until_target_year,
        )

        self.demand_electricity = self.energy / fact("Fact_H_P_heatnet_lheatpump_apf")


@dataclass(kw_only=True)
class HeatnetProduction(InvestHeatProduction, CO2eChangeHeatProduction):
    facts: InitVar[Facts]
    duration_CO2e_neutral_years: InitVar[float]
    what: InitVar[str]
    h18: InitVar[H18]
    duration_until_target_year: InitVar[int]

    def __post_init__(  # type: ignore[override]
        self,
        facts: Facts,
        duration_CO2e_neutral_years: float,
        what: str,
        h18: H18,
        duration_until_target_year: int,
    ):
        CO2eChangeHeatProduction.__post_init__(
            self,
            facts=facts,
            what=what,
            duration_CO2e_neutral_years=duration_CO2e_neutral_years,
            h18=h18,
        )
        InvestHeatProduction.__post_init__(
            self, facts=facts, duration_until_target_year=duration_until_target_year
        )


@dataclass(kw_only=True)
class TotalHeatProduction(HeatnetProduction):
    cost_fuel: float = 0
    demand_electricity: float = 0

    facts: InitVar[Facts]
    duration_CO2e_neutral_years: InitVar[float]
    what: InitVar[str]
    h18: InitVar[H18]
    facts: InitVar[Facts]
    duration_until_target_year: InitVar[int]

    def __post_init__(
        self,
        facts: Facts,
        duration_CO2e_neutral_years: float,
        what: str,
        h18: H18,
        duration_until_target_year: int,
    ):
        HeatnetProduction.__post_init__(
            self,
            facts=facts,
            duration_CO2e_neutral_years=duration_CO2e_neutral_years,
            what=what,
            h18=h18,
            duration_until_target_year=duration_until_target_year,
        )
