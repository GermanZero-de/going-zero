"""
Documentation:
    - missing :-(
    - This primarily models organic waste treatment and landfilling, we do not
      model industrial waste treatment.
"""

# pyright: strict

from dataclasses import dataclass

from ..makeentries import Entries
from ..refdata import Facts, Assumptions
from ..utils import div
from ..waste2018 import W18

from ..lulucf2030.l30 import L30
from ..agri2030.a30 import A30
from ..business2030.b30 import B30
from ..electricity2030.e30 import E30
from ..fuels2030.f30 import F30
from ..heat2030.h30 import H30
from ..industry2030.i30 import I30
from ..residences2030.r30 import R30
from ..transport2030.t30 import T30

from .wastelines import (
    EnergySupplyDetail,
    WasteLines,
    Wastewater,
    Organic_treatment,
    Landfilling,
)


@dataclass(kw_only=True)
class EnergySupply:
    energy: float
    CO2e_combustion_based: float
    CO2e_total: float
    change_energy_MWh: float
    change_energy_pct: float
    change_CO2e_t: float
    change_CO2e_pct: float
    CO2e_total_2021_estimated: float
    cost_climate_saved: float

    @classmethod
    def calc(cls, w18: W18, energy_supplies: list[EnergySupplyDetail]):
        energy = sum([supply.energy for supply in energy_supplies])
        CO2e_cb = sum([supply.CO2e_combustion_based for supply in energy_supplies])
        CO2e_total = sum([supply.CO2e_total for supply in energy_supplies])

        change_energy_MWh = sum(
            [supply.change_energy_MWh for supply in energy_supplies]
        )
        change_energy_pct = div(change_energy_MWh, w18.s.energy)
        change_CO2e_t = sum([supply.change_CO2e_t for supply in energy_supplies])
        change_CO2e_pct = div(change_CO2e_t, w18.s.CO2e_total)
        CO2e_total_2021_estimated = sum(
            [supply.CO2e_total_2021_estimated for supply in energy_supplies]
        )
        cost_climate_saved = sum(
            [supply.cost_climate_saved for supply in energy_supplies]
        )

        return cls(
            energy=energy,
            CO2e_combustion_based=CO2e_cb,
            CO2e_total=CO2e_total,
            change_energy_MWh=change_energy_MWh,
            change_energy_pct=change_energy_pct,
            change_CO2e_t=change_CO2e_t,
            change_CO2e_pct=change_CO2e_pct,
            CO2e_total_2021_estimated=CO2e_total_2021_estimated,
            cost_climate_saved=cost_climate_saved,
        )


@dataclass(kw_only=True)
class Pyrolysis:
    """This is our escape hatch. If we can't find a better way to deal with CO2e."""

    prod_volume: float = None  # type: ignore
    CO2e_production_based: float = None  # type: ignore
    CO2e_production_based_per_t: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    change_CO2e_t: float = None  # type: ignore
    change_CO2e_pct: float = None  # type: ignore
    CO2e_total_2021_estimated: float = None  # type: ignore
    cost_climate_saved: float = None  # type: ignore
    invest: float = None  # type: ignore
    invest_pa: float = None  # type: ignore
    invest_per_CO2e: float = None  # type: ignore
    pct_of_wage: float = None  # type: ignore
    cost_wage: float = None  # type: ignore
    ratio_wage_to_emplo: float = None  # type: ignore
    demand_emplo: float = None  # type: ignore
    demand_emplo_new: float = None  # type: ignore
    invest_per_x: float = None  # type: ignore

    @classmethod
    def calc(
        cls,
        entries: Entries,
        facts: Facts,
        assumptions: Assumptions,
        *,
        l30: L30,
        a30: A30,
        b30: B30,
        e30: E30,
        f30: F30,
        h30: H30,
        i30: I30,
        r30: R30,
        t30: T30,
        wastelines: WasteLines,
    ):
        """This updates the l and pyr sections in l30 inplace."""

        fact = facts.fact
        ass = assumptions.ass

        duration_until_target_year = entries.m_duration_target
        duration_CO2e_neutral_years = entries.m_duration_neutral

        CO2e_total = min(
            -(
                h30.h.CO2e_total
                + e30.e.CO2e_total
                + f30.f.CO2e_total
                + r30.r.CO2e_total
                + b30.b.CO2e_total
                + i30.i.CO2e_total
                + t30.t.transport.CO2e_total
                + a30.a.CO2e_total
                + l30.g.CO2e_total
                + wastelines.p_landfilling.CO2e_total
                + wastelines.p_organic_treatment.CO2e_total
                + wastelines.p_wastewater.CO2e_total
            ),
            0,
        )

        CO2e_production_based = CO2e_total
        CO2e_production_based_per_t = fact("Fact_L_P_biochar_ratio_CO2e_pb_to_prodvol")
        prod_volume = div(CO2e_production_based, CO2e_production_based_per_t)

        change_CO2e_t = CO2e_production_based

        change_CO2e_pct = 0
        CO2e_total_2021_estimated = 0

        cost_climate_saved = (
            (CO2e_total_2021_estimated - CO2e_total)
            * duration_CO2e_neutral_years
            * fact("Fact_M_cost_per_CO2e_2020")
        )

        invest_per_x = ass("Ass_L_P_pyrolysis_plant_ratio_invest_to_biochar_pa")
        invest = prod_volume * invest_per_x
        invest_pa = div(invest, duration_until_target_year)
        pct_of_wage = fact("Fact_B_P_constr_main_revenue_pct_of_wage_2018")
        cost_wage = invest_pa * pct_of_wage

        ratio_wage_to_emplo = fact("Fact_B_P_constr_main_ratio_wage_to_emplo_2017")
        demand_emplo = div(cost_wage, ratio_wage_to_emplo)
        demand_emplo_new = demand_emplo

        invest_per_CO2e = div(invest, CO2e_total)

        return cls(
            prod_volume=prod_volume,
            CO2e_production_based=CO2e_production_based,
            CO2e_production_based_per_t=CO2e_production_based_per_t,
            CO2e_total=CO2e_total,
            change_CO2e_t=change_CO2e_t,
            change_CO2e_pct=change_CO2e_pct,
            CO2e_total_2021_estimated=CO2e_total_2021_estimated,
            cost_climate_saved=cost_climate_saved,
            invest=invest,
            invest_pa=invest_pa,
            invest_per_CO2e=invest_per_CO2e,
            pct_of_wage=pct_of_wage,
            cost_wage=cost_wage,
            ratio_wage_to_emplo=ratio_wage_to_emplo,
            demand_emplo=demand_emplo,
            demand_emplo_new=demand_emplo_new,
            invest_per_x=invest_per_x,
        )


@dataclass(kw_only=True)
class EnergyProduction:
    energy: float
    prod_volume: float
    CO2e_production_based: float
    CO2e_total: float
    change_energy_MWh: float
    change_energy_pct: float
    change_CO2e_t: float
    change_CO2e_pct: float
    CO2e_total_2021_estimated: float
    cost_climate_saved: float
    invest_pa: float
    invest_pa_com: float
    invest: float
    invest_com: float
    cost_wage: float
    demand_emplo: float
    demand_emplo_new: float

    @classmethod
    def calc(
        cls,
        w18: W18,
        landfilling: Landfilling,
        organic_treatment: Organic_treatment,
        wastewater: Wastewater,
        pyr: Pyrolysis,
    ):
        energy = wastewater.energy
        prod_vol = (
            organic_treatment.prod_volume + wastewater.prod_volume + pyr.prod_volume
        )
        CO2e_pb = (
            landfilling.CO2e_production_based
            + organic_treatment.CO2e_production_based
            + wastewater.CO2e_production_based
            + pyr.CO2e_production_based
        )
        CO2e_total = (
            landfilling.CO2e_total
            + organic_treatment.CO2e_total
            + wastewater.CO2e_total
            + pyr.CO2e_total
        )
        change_energy_MWh = wastewater.change_energy_MWh
        change_energy_pct = change_energy_MWh / w18.p.energy
        change_CO2e_t = (
            landfilling.change_CO2e_t
            + organic_treatment.change_CO2e_t
            + wastewater.change_CO2e_t
            + pyr.change_CO2e_t
        )
        change_CO2e_pct = change_CO2e_t / w18.p.CO2e_total
        CO2e_total_2021_estimated = (
            landfilling.CO2e_total_2021_estimated
            + organic_treatment.CO2e_total_2021_estimated
            + wastewater.CO2e_total_2021_estimated
        )
        cost_climate_saved = (
            landfilling.cost_climate_saved
            + organic_treatment.cost_climate_saved
            + wastewater.cost_climate_saved
            + pyr.cost_climate_saved
        )
        invest_pa = organic_treatment.invest_pa + pyr.invest_pa
        invest_pa_com = organic_treatment.invest_pa_com
        invest = organic_treatment.invest + pyr.invest
        invest_com = organic_treatment.invest_com
        cost_wage = organic_treatment.cost_wage + pyr.cost_wage
        demand_emplo = organic_treatment.demand_emplo + pyr.demand_emplo
        demand_emplo_new = organic_treatment.demand_emplo_new + pyr.demand_emplo_new

        return cls(
            energy=energy,
            prod_volume=prod_vol,
            CO2e_production_based=CO2e_pb,
            CO2e_total=CO2e_total,
            change_energy_MWh=change_energy_MWh,
            change_energy_pct=change_energy_pct,
            change_CO2e_t=change_CO2e_t,
            change_CO2e_pct=change_CO2e_pct,
            CO2e_total_2021_estimated=CO2e_total_2021_estimated,
            cost_climate_saved=cost_climate_saved,
            invest_pa=invest_pa,
            invest_pa_com=invest_pa_com,
            invest=invest,
            invest_com=invest_com,
            cost_wage=cost_wage,
            demand_emplo=demand_emplo,
            demand_emplo_new=demand_emplo_new,
        )


@dataclass(kw_only=True)
class W30:
    p_landfilling: Landfilling
    p_organic_treatment: Organic_treatment
    p_wastewater: Wastewater

    pyrolysis: Pyrolysis

    w: EnergyProduction
    p: EnergyProduction

    s: EnergySupply
    s_elec: EnergySupplyDetail

    @classmethod
    def calc(cls, w18: W18, wastelines: WasteLines, pyrolysis: Pyrolysis):
        s = EnergySupply.calc(w18=w18, energy_supplies=[wastelines.s_elec])
        p = EnergyProduction.calc(
            w18=w18,
            landfilling=wastelines.p_landfilling,
            organic_treatment=wastelines.p_organic_treatment,
            wastewater=wastelines.p_wastewater,
            pyr=pyrolysis,
        )

        w = p

        return cls(
            s=s,
            s_elec=wastelines.s_elec,
            p=p,
            p_landfilling=wastelines.p_landfilling,
            p_organic_treatment=wastelines.p_organic_treatment,
            p_wastewater=wastelines.p_wastewater,
            pyrolysis=pyrolysis,
            w=w,
        )
