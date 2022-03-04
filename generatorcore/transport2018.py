# # Laden der Datentabellen und deren Suchfunktionen

from dataclasses import dataclass, field, asdict, fields
from .inputs import Inputs
import typing

MILLION = 1000000


@dataclass
class Vars0:
    # Used by t
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_biodiesel: float = None  # type: ignore
    demand_bioethanol: float = None  # type: ignore
    demand_biogas: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    demand_fueloil: float = None  # type: ignore
    demand_gas: float = None  # type: ignore
    demand_jetfuel: float = None  # type: ignore
    demand_lpg: float = None  # type: ignore
    demand_petrol: float = None  # type: ignore
    energy: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass
class Vars1:
    # Used by g, g_planning, road_action_charger, road_bus_action_infra, rail_ppl_metro_action_infra, rail_action_invest_infra, rail_action_invest_station
    CO2e_total: float = None  # type: ignore


@dataclass
class Vars2:
    # Used by air_inter
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_jetfuel: float = None  # type: ignore
    energy: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass
class Vars3:
    # Used by air_dmstc, air
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_jetfuel: float = None  # type: ignore
    demand_petrol: float = None  # type: ignore
    energy: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass
class Vars4:
    # Used by road
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_biodiesel: float = None  # type: ignore
    demand_bioethanol: float = None  # type: ignore
    demand_biogas: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    demand_gas: float = None  # type: ignore
    demand_lpg: float = None  # type: ignore
    demand_petrol: float = None  # type: ignore
    energy: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


T = typing.TypeVar("T")


def element_wise_plus(a: T, b: T) -> T:
    return type(a)(*(getattr(a, f.name) + getattr(b, f.name) for f in fields(a)))


@dataclass
class RoadCar:
    # Used by road_car, road_car_it_ot, road_car_ab, road_ppl
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_biodiesel: float = None  # type: ignore
    demand_bioethanol: float = None  # type: ignore
    demand_biogas: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    demand_gas: float = None  # type: ignore
    demand_lpg: float = None  # type: ignore
    demand_petrol: float = None  # type: ignore
    energy: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore

    def __add__(self: "RoadCar", other: "RoadCar") -> "RoadCar":
        return element_wise_plus(self, other)

    @classmethod
    def calc(cls, inputs: Inputs, section: typing.Literal["it_at", "ab"]) -> "RoadCar":
        def fact(n: str) -> float:
            return inputs.fact(n)

        res = cls()
        res.mileage = getattr(inputs.entries, "t_mil_car_" + section) * MILLION
        res.transport_capacity_pkm = res.mileage * fact("Fact_T_D_lf_ppl_Car_2018")
        res.demand_biodiesel = (
            res.mileage
            * fact("Fact_T_S_Car_frac_diesel_mlg_2018")
            * fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018")
            * fact(f"Fact_T_S_Car_SEC_diesel_{section}_2018")
        )
        res.demand_bioethanol = (
            res.mileage
            * fact("Fact_T_S_Car_frac_petrol_with_phev_mlg_2018")
            * fact("Fact_T_S_Rl_Rd_benzin_bio_frac_2018")
            * fact(f"Fact_T_S_Car_SEC_petrol_{section}_2018")
        )
        res.demand_biogas = (
            res.mileage
            * fact("Fact_T_S_Car_frac_cng_mlg_2018")
            * fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018")
            * fact("Fact_T_S_Car_SEC_petrol_it_at_2018")
        )
        res.demand_diesel = (
            res.mileage
            * fact("Fact_T_S_Car_frac_diesel_mlg_2018")
            * (1 - fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018"))
            * fact(f"Fact_T_S_Car_SEC_diesel_{section}_2018")
        )
        res.demand_electricity = (
            res.mileage
            * fact("Fact_T_S_Car_frac_bev_with_phev_mlg_2018")
            * fact(f"Fact_T_S_Car_SEC_elec_{section}_2018")
        )
        res.demand_gas = (
            res.mileage
            * fact("Fact_T_S_Car_frac_cng_mlg_2018")
            * (1 - fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018"))
            * fact("Fact_T_S_Car_SEC_petrol_it_at_2018")
        )
        res.demand_lpg = (
            res.mileage
            * fact("Fact_T_S_Car_frac_lpg_mlg_2018")
            * fact(f"Fact_T_S_Car_SEC_petrol_{section}_2018")
        )
        res.demand_petrol = (
            res.mileage
            * fact("Fact_T_S_Car_frac_petrol_with_phev_mlg_2018")
            * (1 - fact("Fact_T_S_Rl_Rd_benzin_bio_frac_2018"))
            * fact(f"Fact_T_S_Car_SEC_petrol_{section}_2018")
        )
        res.CO2e_cb = (
            res.demand_petrol * fact("Fact_T_S_petrol_EmFa_tank_wheel_2018")
            + res.demand_diesel * fact("Fact_T_S_diesel_EmFa_tank_wheel_2018")
            + res.demand_lpg * fact("Fact_T_S_lpg_EmFa_tank_wheel_2018")
            + res.demand_gas * fact("Fact_T_S_cng_EmFa_tank_wheel_2018")
            + res.demand_biogas * inputs.ass("Ass_T_S_biogas_EmFa_tank_wheel")
            + res.demand_bioethanol * inputs.ass("Ass_T_S_bioethanol_EmFa_tank_wheel")
            + res.demand_biodiesel * inputs.ass("Ass_T_S_biodiesel_EmFa_tank_wheel")
            + res.demand_electricity * fact("Fact_T_S_electricity_EmFa_tank_wheel_2018")
        )
        res.energy = (
            res.demand_petrol
            + res.demand_diesel
            + res.demand_lpg
            + res.demand_gas
            + res.demand_biogas
            + res.demand_bioethanol
            + res.demand_biodiesel
            + res.demand_electricity
        )
        res.CO2e_total = res.CO2e_cb
        return res


@dataclass
class Vars6:
    # Used by road_bus
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_biodiesel: float = None  # type: ignore
    demand_biogas: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    demand_gas: float = None  # type: ignore
    energy: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore


@dataclass
class Vars7:
    # Used by road_gds
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_biodiesel: float = None  # type: ignore
    demand_bioethanol: float = None  # type: ignore
    demand_biogas: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    demand_gas: float = None  # type: ignore
    demand_lpg: float = None  # type: ignore
    demand_petrol: float = None  # type: ignore
    energy: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass(frozen=True)
class RoadGoodsLightWeight:
    # Used by road_gds_ldt, road_gds_ldt_it_ot, road_gds_ldt_ab
    CO2e_cb: float
    CO2e_total: float
    demand_biodiesel: float
    demand_bioethanol: float
    demand_diesel: float
    demand_electricity: float
    demand_lpg: float
    demand_petrol: float
    energy: float
    mileage: float
    transport_capacity_tkm: float

    def __add__(
        self: "RoadGoodsLightWeight", other: "RoadGoodsLightWeight"
    ) -> "RoadGoodsLightWeight":
        return element_wise_plus(self, other)

    @classmethod
    def calc(
        cls, inputs: Inputs, section: typing.Literal["it_at", "ab"]
    ) -> "RoadGoodsLightWeight":
        def fact(n: str) -> float:
            return inputs.fact(n)

        mileage = getattr(inputs.entries, "t_mil_ldt_" + section) * MILLION
        transport_capacity_tkm = mileage * fact("Fact_T_D_lf_gds_LDT_2018")

        demand_biodiesel = (
            mileage
            * fact("Fact_T_S_LDT_frac_diesel_mlg_2018")
            * fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018")
            * fact(f"Fact_T_S_LDT_SEC_diesel_{section}_2018")
        )
        demand_bioethanol = (
            mileage
            * fact("Fact_T_S_LDT_frac_petrol_mlg_2018")
            * fact("Fact_T_S_Rl_Rd_benzin_bio_frac_2018")
            * fact(f"Fact_T_S_LDT_SEC_petrol_{section}_2018")
        )
        demand_diesel = (
            mileage
            * fact("Fact_T_S_LDT_frac_diesel_mlg_2018")
            * (1 - fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018"))
            * fact(f"Fact_T_S_LDT_SEC_diesel_{section}_2018")
        )
        demand_electricity = (
            mileage
            * fact("Fact_T_S_LDT_frac_bev_mlg_2018")
            * fact(f"Fact_T_S_LDT_SEC_elec_{section}_2018")
        )
        demand_lpg = (
            mileage
            * fact("Fact_T_S_LDT_frac_lpg_mlg_2018")
            * fact(f"Fact_T_S_LDT_SEC_petrol_{section}_2018")
        )
        demand_petrol = (
            mileage
            * fact("Fact_T_S_LDT_frac_petrol_mlg_2018")
            * (1 - fact("Fact_T_S_Rl_Rd_benzin_bio_frac_2018"))
            * fact(f"Fact_T_S_LDT_SEC_petrol_{section}_2018")
        )
        CO2e_cb = (
            demand_petrol * fact("Fact_T_S_petrol_EmFa_tank_wheel_2018")
            + demand_diesel * fact("Fact_T_S_diesel_EmFa_tank_wheel_2018")
            + demand_lpg * fact("Fact_T_S_lpg_EmFa_tank_wheel_2018")
            + demand_bioethanol * inputs.ass("Ass_T_S_bioethanol_EmFa_tank_wheel")
            + demand_biodiesel * inputs.ass("Ass_T_S_biodiesel_EmFa_tank_wheel")
            + demand_electricity * fact("Fact_T_S_electricity_EmFa_tank_wheel_2018")
        )
        CO2e_total = CO2e_cb

        energy = (
            demand_petrol
            + demand_diesel
            + demand_lpg
            + demand_bioethanol
            + demand_biodiesel
            + demand_electricity
        )

        return cls(
            CO2e_cb=CO2e_cb,
            CO2e_total=CO2e_total,
            demand_biodiesel=demand_biodiesel,
            demand_bioethanol=demand_bioethanol,
            demand_diesel=demand_diesel,
            demand_electricity=demand_electricity,
            demand_lpg=demand_lpg,
            demand_petrol=demand_petrol,
            energy=energy,
            mileage=mileage,
            transport_capacity_tkm=transport_capacity_tkm,
        )


@dataclass
class Vars9:
    # Used by road_gds_mhd, road_gds_mhd_it_ot, road_gds_mhd_ab
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_biodiesel: float = None  # type: ignore
    demand_biogas: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    demand_gas: float = None  # type: ignore
    energy: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass
class Vars10:
    # Used by rail_ppl, rail_ppl_distance
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_biodiesel: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    energy: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore


@dataclass
class Vars11:
    # Used by rail_ppl_metro
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    energy: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore


@dataclass
class Vars12:
    # Used by rail_gds
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_biodiesel: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    energy: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass
class Vars13:
    # Used by ship_dmstc
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    energy: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass
class Vars14:
    # Used by ship_inter
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_fueloil: float = None  # type: ignore
    energy: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass
class Vars15:
    # Used by other_foot, other_cycl
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore


@dataclass
class Vars16:
    # Used by road_gds_mhd_action_wire, ship_dmstc_action_infra, other_foot_action_infra, other_cycl_action_infra, s_hydrogen, s_emethan
    pass


@dataclass
class Vars17:
    # Used by rail
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_biodiesel: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    demand_electricity: float = None  # type: ignore
    energy: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass
class Vars18:
    # Used by ship
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    demand_diesel: float = None  # type: ignore
    demand_fueloil: float = None  # type: ignore
    energy: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass
class Vars19:
    # Used by other
    CO2e_cb: float = None  # type: ignore
    CO2e_total: float = None  # type: ignore
    mileage: float = None  # type: ignore
    transport_capacity_pkm: float = None  # type: ignore
    transport_capacity_tkm: float = None  # type: ignore


@dataclass
class Vars20:
    # Used by s, s_petrol, s_jetfuel, s_diesel, s_fueloil, s_lpg, s_gas, s_biogas, s_bioethanol, s_biodiesel, s_elec
    energy: float = None  # type: ignore


@dataclass
class T18:
    t: Vars0 = field(default_factory=Vars0)
    g: Vars1 = field(default_factory=Vars1)
    g_planning: Vars1 = field(default_factory=Vars1)
    air_inter: Vars2 = field(default_factory=Vars2)
    air_dmstc: Vars3 = field(default_factory=Vars3)
    road: Vars4 = field(default_factory=Vars4)
    road_action_charger: Vars1 = field(default_factory=Vars1)
    road_car: RoadCar = None  # type: ignore
    road_car_it_ot: RoadCar = None  # type: ignore
    road_car_ab: RoadCar = None  # type: ignore
    road_bus: Vars6 = field(default_factory=Vars6)
    road_bus_action_infra: Vars1 = field(default_factory=Vars1)
    road_gds: Vars7 = field(default_factory=Vars7)
    road_gds_ldt: RoadGoodsLightWeight = None  # type: ignore
    road_gds_ldt_it_ot: RoadGoodsLightWeight = None  # type: ignore
    # field(
    #   default_factory=RoadGoodsLightWeight
    # )
    road_gds_ldt_ab: RoadGoodsLightWeight = None  # type: ignore field(default_factory=RoadGoodsLightWeight)
    road_gds_mhd: Vars9 = field(default_factory=Vars9)
    road_ppl: RoadCar = field(default_factory=RoadCar)
    road_gds_mhd_it_ot: Vars9 = field(default_factory=Vars9)
    road_gds_mhd_ab: Vars9 = field(default_factory=Vars9)
    rail_ppl: Vars10 = field(default_factory=Vars10)
    rail_ppl_metro: Vars11 = field(default_factory=Vars11)
    rail_ppl_metro_action_infra: Vars1 = field(default_factory=Vars1)
    rail_ppl_distance: Vars10 = field(default_factory=Vars10)
    rail_gds: Vars12 = field(default_factory=Vars12)
    rail_action_invest_infra: Vars1 = field(default_factory=Vars1)
    rail_action_invest_station: Vars1 = field(default_factory=Vars1)
    ship_dmstc: Vars13 = field(default_factory=Vars13)
    ship_inter: Vars14 = field(default_factory=Vars14)
    other_foot: Vars15 = field(default_factory=Vars15)
    other_cycl: Vars15 = field(default_factory=Vars15)
    road_gds_mhd_action_wire: Vars16 = field(default_factory=Vars16)
    ship_dmstc_action_infra: Vars16 = field(default_factory=Vars16)
    other_foot_action_infra: Vars16 = field(default_factory=Vars16)
    other_cycl_action_infra: Vars16 = field(default_factory=Vars16)
    air: Vars3 = field(default_factory=Vars3)
    rail: Vars17 = field(default_factory=Vars17)
    ship: Vars18 = field(default_factory=Vars18)
    other: Vars19 = field(default_factory=Vars19)
    s: Vars20 = field(default_factory=Vars20)
    s_petrol: Vars20 = field(default_factory=Vars20)
    s_jetfuel: Vars20 = field(default_factory=Vars20)
    s_diesel: Vars20 = field(default_factory=Vars20)
    s_fueloil: Vars20 = field(default_factory=Vars20)
    s_lpg: Vars20 = field(default_factory=Vars20)
    s_gas: Vars20 = field(default_factory=Vars20)
    s_biogas: Vars20 = field(default_factory=Vars20)
    s_bioethanol: Vars20 = field(default_factory=Vars20)
    s_biodiesel: Vars20 = field(default_factory=Vars20)
    s_elec: Vars20 = field(default_factory=Vars20)
    s_hydrogen: Vars16 = field(default_factory=Vars16)
    s_emethan: Vars16 = field(default_factory=Vars16)

    def dict(self):
        return asdict(self)


def calc(inputs: Inputs) -> T18:
    def fact(n):
        return inputs.fact(n)

    def ass(n):
        return inputs.ass(n)

    entries = inputs.entries

    t18 = T18()
    # abbreviations
    t = t18.t
    g = t18.g
    g_planning = t18.g_planning
    air_inter = t18.air_inter
    air_dmstc = t18.air_dmstc
    road = t18.road
    road_action_charger = t18.road_action_charger
    road_bus = t18.road_bus
    road_bus_action_infra = t18.road_bus_action_infra
    road_gds = t18.road_gds
    road_gds_mhd = t18.road_gds_mhd
    road_ppl = t18.road_ppl
    road_gds_mhd_it_ot = t18.road_gds_mhd_it_ot
    road_gds_mhd_ab = t18.road_gds_mhd_ab
    rail_ppl = t18.rail_ppl
    rail_ppl_distance = t18.rail_ppl_distance
    rail_ppl_metro = t18.rail_ppl_metro
    rail_ppl_metro_action_infra = t18.rail_ppl_metro_action_infra
    rail_gds = t18.rail_gds
    rail_action_invest_infra = t18.rail_action_invest_infra
    rail_action_invest_station = t18.rail_action_invest_station
    ship_dmstc = t18.ship_dmstc
    ship_inter = t18.ship_inter
    other_foot = t18.other_foot
    other_cycl = t18.other_cycl
    air = t18.air
    rail = t18.rail
    ship = t18.ship
    other = t18.other
    s = t18.s
    s_petrol = t18.s_petrol
    s_jetfuel = t18.s_jetfuel
    s_diesel = t18.s_diesel
    s_fueloil = t18.s_fueloil
    s_lpg = t18.s_lpg
    s_gas = t18.s_gas
    s_biogas = t18.s_biogas
    s_bioethanol = t18.s_bioethanol
    s_biodiesel = t18.s_biodiesel
    s_elec = t18.s_elec

    ags = entries.m_AGS_com
    air_inter.transport_capacity_pkm = (
        fact("Fact_T_D_Air_nat_trnsprt_ppl_2019")
        * entries.m_population_com_2018
        / entries.m_population_nat
    )

    air_inter.transport_capacity_tkm = (
        fact("Fact_T_D_Air_dmstc_nat_trnsprt_gds_2019")
        * fact("Fact_T_D_Air_inter_nat_ratio_2018")
        * entries.m_population_com_2018
        / entries.m_population_nat
    )

    air_inter.demand_jetfuel = (
        fact("Fact_T_S_Air_nat_EB_inter_2018")
        * entries.m_population_com_2018
        / entries.m_population_nat
    )

    air_dmstc.demand_petrol = (
        fact("Fact_T_S_Air_petrol_fec_2018")
        * entries.m_population_com_2018
        / entries.m_population_nat
    )
    air_inter.CO2e_cb = (
        air_dmstc.demand_petrol * fact("Fact_T_S_petrol_EmFa_tank_wheel_2018")
        + air_inter.demand_jetfuel * fact("Fact_T_S_jetfuel_EmFa_tank_wheel_2018")
        + 0 * fact("Fact_T_S_diesel_EmFa_tank_wheel_2018")
        + 0 * fact("Fact_T_S_lpg_EmFa_tank_wheel_2018")
        + 0 * fact("Fact_T_S_cng_EmFa_tank_wheel_2018")
    )

    air_inter.energy = air_inter.demand_jetfuel

    # -------------------

    air_dmstc.transport_capacity_pkm = (
        fact("Fact_T_D_Air_dmstc_nat_trnsprt_ppl_2019")
        * entries.m_population_com_2018
        / entries.m_population_nat
    )

    air_dmstc.transport_capacity_tkm = (
        fact("Fact_T_D_Air_dmstc_nat_trnsprt_gds_2019")
        * fact("Fact_T_D_Air_dmstc_nat_ratio_2018")
        * entries.m_population_com_2018
        / entries.m_population_nat
    )

    air_dmstc.demand_jetfuel = (
        fact("Fact_T_S_Air_nat_EB_dmstc_2018")
        * entries.m_population_com_2018
        / entries.m_population_nat
    )

    air_dmstc.CO2e_cb = air_dmstc.demand_jetfuel * fact(
        "Fact_T_S_jetfuel_EmFa_tank_wheel_2018"
    ) + air_dmstc.demand_petrol * fact("Fact_T_S_petroljet_EmFa_tank_wheel_2018")

    air_dmstc.energy = air_dmstc.demand_jetfuel + air_dmstc.demand_petrol

    air.energy = air_inter.energy + air_dmstc.energy

    road_car_it_ot = RoadCar.calc(inputs, "it_at")
    road_car_ab = RoadCar.calc(inputs, "ab")
    road_car = road_car_it_ot + road_car_ab

    t18.road_car_it_ot = road_car_it_ot
    t18.road_car_ab = road_car_ab
    t18.road_car = road_car

    road_bus.mileage = (
        entries.t_bus_mega_km_dis
        * MILLION
        * entries.m_population_com_2018
        / entries.m_population_dis
    )

    road_gds_mhd_it_ot.mileage = entries.t_mil_mhd_it_at * MILLION - road_bus.mileage

    road_gds_mhd_it_ot.demand_electricity = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_bev_stock_2018")
        * fact("Fact_T_S_MHD_SEC_elec_it_at_2018")
    )

    road_gds_mhd_ab.mileage = entries.t_mil_mhd_ab * MILLION

    road_gds_mhd_ab.demand_electricity = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_bev_stock_2018")
        * fact("Fact_T_S_MHD_SEC_elec_ab_2018")
    )
    rail_ppl_metro.mileage = (
        entries.t_metro_mega_km_dis
        * MILLION
        * entries.m_population_com_2018
        / entries.m_population_dis
    )
    rail_ppl_metro.demand_electricity = rail_ppl_metro.mileage * fact(
        "Fact_T_S_Rl_Metro_SEC_fzkm_2018"
    )

    # --------------------

    # ----------------

    road_bus.transport_capacity_pkm = road_bus.mileage * fact(
        "Fact_T_D_lf_ppl_Bus_2018"
    )

    road_bus.demand_diesel = (
        road_bus.mileage
        * fact("Fact_T_S_Bus_frac_diesel_with_hybrid_stock_2018")
        * (1 - fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018"))
        * fact("Fact_T_S_Bus_SEC_diesel_2018")
    )

    road_bus.demand_gas = (
        road_bus.mileage
        * fact("Fact_T_S_Bus_frac_cng_stock_2018")
        * (1 - fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018"))
        * fact("Fact_T_S_Bus_SEC_diesel_2018")
    )

    road_bus.demand_biogas = (
        road_bus.mileage
        * fact("Fact_T_S_Bus_frac_cng_stock_2018")
        * fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018")
        * fact("Fact_T_S_Bus_SEC_diesel_2018")
    )

    road_bus.demand_biodiesel = (
        road_bus.mileage
        * fact("Fact_T_S_Bus_frac_diesel_stock_2018")
        * fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018")
        * fact("Fact_T_S_Bus_SEC_diesel_2018")
    )

    road_bus.demand_electricity = (
        road_bus.mileage
        * fact("Fact_T_S_Bus_frac_bev_stock_2018")
        * fact("Fact_T_S_Bus_SEC_elec_2018")
    )

    road_bus.CO2e_cb = (
        road_bus.demand_diesel * fact("Fact_T_S_diesel_EmFa_tank_wheel_2018")
        + road_bus.demand_gas * fact("Fact_T_S_cng_EmFa_tank_wheel_2018")
        + road_bus.demand_biogas * ass("Ass_T_S_biogas_EmFa_tank_wheel")
        + road_bus.demand_biodiesel * ass("Ass_T_S_biodiesel_EmFa_tank_wheel")
        + road_bus.demand_electricity
        * fact("Fact_T_S_electricity_EmFa_tank_wheel_2018")
    )

    road_bus.energy = (
        road_bus.demand_diesel
        + road_bus.demand_gas
        + road_bus.demand_biogas
        + road_bus.demand_biodiesel
        + road_bus.demand_electricity
    )

    # Why is this it at and then it_ot in other places?
    road_gds_ldt_it_ot = RoadGoodsLightWeight.calc(inputs, "it_at")
    t18.road_gds_ldt_it_ot = road_gds_ldt_it_ot

    road_gds_ldt_ab = RoadGoodsLightWeight.calc(inputs, "ab")
    t18.road_gds_ldt_ab = road_gds_ldt_ab
    road_gds_ldt = road_gds_ldt_it_ot + road_gds_ldt_ab
    t18.road_gds_ldt = road_gds_ldt

    road_gds_mhd_it_ot.transport_capacity_tkm = road_gds_mhd_it_ot.mileage * fact(
        "Fact_T_D_lf_gds_MHD_2018"
    )

    road_gds_mhd_it_ot.demand_diesel = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_diesel_stock_2018")
        * (1 - fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018"))
        * fact("Fact_T_S_MHD_SEC_diesel_it_at_2018")
    )

    road_gds_mhd_it_ot.demand_gas = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_cng_lngl_stock_2018")
        * (1 - fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018"))
        * fact("Fact_T_S_MHD_SEC_diesel_it_at_2018")
    )

    road_gds_mhd_it_ot.demand_biogas = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_cng_lngl_stock_2018")
        * fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018")
        * fact("Fact_T_S_MHD_SEC_diesel_it_at_2018")
    )

    road_gds_mhd_it_ot.demand_biodiesel = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_diesel_stock_2018")
        * fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018")
        * fact("Fact_T_S_MHD_SEC_diesel_it_at_2018")
    )

    road_gds_mhd_it_ot.demand_electricity = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_bev_stock_2018")
        * fact("Fact_T_S_MHD_SEC_elec_it_at_2018")
    )

    road_gds_mhd_it_ot.CO2e_cb = road_gds_mhd_it_ot.demand_diesel * fact(
        "Fact_T_S_diesel_EmFa_tank_wheel_2018"
    ) + road_gds_mhd_it_ot.demand_gas * fact("Fact_T_S_cng_EmFa_tank_wheel_2018")

    road_gds_mhd_it_ot.energy = (
        road_gds_mhd_it_ot.demand_diesel
        + road_gds_mhd_it_ot.demand_gas
        + road_gds_mhd_it_ot.demand_biogas
        + road_gds_mhd_it_ot.demand_biodiesel
        + road_gds_mhd_it_ot.demand_electricity
    )

    # --------------

    road_gds_mhd_ab.transport_capacity_tkm = road_gds_mhd_ab.mileage * fact(
        "Fact_T_D_lf_gds_MHD_2018"
    )

    road_gds_mhd_ab.demand_diesel = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_diesel_stock_2018")
        * (1 - fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018"))
        * fact("Fact_T_S_MHD_SEC_diesel_ab_2018")
    )

    road_gds_mhd_ab.demand_gas = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_cng_lngl_stock_2018")
        * (1 - fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018"))
        * fact("Fact_T_S_MHD_SEC_diesel_ab_2018")
    )

    road_gds_mhd_ab.demand_biogas = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_cng_lngl_stock_2018")
        * fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018")
        * fact("Fact_T_S_MHD_SEC_diesel_ab_2018")
    )

    road_gds_mhd_ab.demand_biodiesel = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_diesel_stock_2018")
        * fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018")
        * fact("Fact_T_S_MHD_SEC_diesel_ab_2018")
    )

    road_gds_mhd_ab.demand_electricity = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_bev_stock_2018")
        * fact("Fact_T_S_MHD_SEC_elec_ab_2018")
    )

    road_gds_mhd_ab.CO2e_cb = road_gds_mhd_ab.demand_diesel * fact(
        "Fact_T_S_diesel_EmFa_tank_wheel_2018"
    ) + road_gds_mhd_ab.demand_gas * fact("Fact_T_S_cng_EmFa_tank_wheel_2018")

    road_gds_mhd_ab.energy = (
        road_gds_mhd_ab.demand_diesel
        + road_gds_mhd_ab.demand_gas
        + road_gds_mhd_ab.demand_biogas
        + road_gds_mhd_ab.demand_biodiesel
        + road_gds_mhd_ab.demand_electricity
    )

    # -----------------

    rail_ppl_metro.demand_electricity = rail_ppl_metro.mileage * fact(
        "Fact_T_S_Rl_Metro_SEC_fzkm_2018"
    )
    #
    rail_ppl_distance.demand_electricity = entries.t_ec_rail_ppl_elec
    rail_ppl.demand_electricity = (
        rail_ppl_distance.demand_electricity + rail_ppl_metro.demand_electricity
    )

    rail_ppl.demand_diesel = entries.t_ec_rail_ppl_diesel * (
        1 - fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018")
    )

    rail_ppl.demand_biodiesel = entries.t_ec_rail_ppl_diesel * fact(
        "Fact_T_S_Rl_Rd_diesel_bio_frac_2018"
    )
    rail_ppl_distance.demand_diesel = entries.t_ec_rail_ppl_diesel * (
        1 - fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018")
    )
    rail_ppl_distance.demand_biodiesel = entries.t_ec_rail_ppl_diesel * fact(
        "Fact_T_S_Rl_Rd_diesel_bio_frac_2018"
    )

    rail_ppl_distance.transport_capacity_pkm = (
        rail_ppl_distance.demand_diesel + rail_ppl_distance.demand_biodiesel
    ) / fact(
        "Fact_T_S_Rl_Train_ppl_long_diesel_SEC_2018"
    ) + rail_ppl_distance.demand_electricity / fact(
        "Fact_T_S_Rl_Train_ppl_long_elec_SEC_2018"
    )
    rail_ppl_metro.transport_capacity_pkm = rail_ppl_metro.mileage * fact(
        "Fact_T_D_lf_Rl_Metro_2018"
    )
    rail_ppl.transport_capacity_pkm = (
        rail_ppl_distance.transport_capacity_pkm + rail_ppl_metro.transport_capacity_pkm
    )
    rail.transport_capacity_pkm = rail_ppl.transport_capacity_pkm

    rail_ppl.CO2e_cb = rail_ppl.demand_diesel * fact(
        "Fact_T_S_diesel_EmFa_tank_wheel_2018"
    )

    rail_ppl.energy = (
        +rail_ppl.demand_diesel
        + rail_ppl.demand_biodiesel
        + rail_ppl.demand_electricity
    )

    # --------------

    rail_ppl_metro.demand_electricity = rail_ppl_metro.mileage * fact(
        "Fact_T_S_Rl_Metro_SEC_fzkm_2018"
    )

    rail_ppl_metro.energy = rail_ppl_metro.demand_electricity
    # --------------

    rail_gds.demand_electricity = entries.t_ec_rail_gds_elec

    rail_gds.demand_diesel = entries.t_ec_rail_gds_diesel * (
        1 - fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018")
    )

    rail_gds.demand_biodiesel = entries.t_ec_rail_gds_diesel * fact(
        "Fact_T_S_Rl_Rd_diesel_bio_frac_2018"
    )

    rail_gds.transport_capacity_tkm = (
        rail_gds.demand_diesel + rail_gds.demand_biodiesel
    ) / fact(
        "Fact_T_S_Rl_Train_gds_diesel_SEC_2018"
    ) + rail_gds.demand_electricity / fact(
        "Fact_T_S_Rl_Train_gds_elec_SEC_2018"
    )

    rail_gds.CO2e_cb = rail_gds.demand_diesel * fact(
        "Fact_T_S_diesel_EmFa_tank_wheel_2018"
    )

    rail_gds.energy = (
        +rail_gds.demand_diesel
        + rail_gds.demand_biodiesel
        + rail_gds.demand_electricity
    )

    # -------------

    ship_dmstc.transport_capacity_tkm = (
        fact("Fact_T_D_Shp_dmstc_trnsprt_gds_2018")
        * entries.m_population_com_2018
        / entries.m_population_nat
    )
    ship_dmstc.demand_diesel = (
        entries.m_population_com_2018
        / entries.m_population_nat
        * fact("Fact_T_S_Shp_diesel_fec_2018")
    )
    ship_dmstc.energy = ship_dmstc.demand_diesel

    ship_dmstc.CO2e_cb = ship_dmstc.demand_diesel * fact(
        "Fact_T_S_diesel_EmFa_tank_wheel_2018"
    )
    # ---------------------

    ship_inter.transport_capacity_tkm = (
        fact("Fact_T_D_Shp_sea_nat_mlg_2013")
        * entries.m_population_com_2018
        / entries.m_population_nat
    )
    ship_inter.demand_fueloil = (
        entries.m_population_com_2018 / entries.m_population_nat
    ) * fact("Fact_T_D_Shp_sea_nat_EC_2018")

    ship_inter.energy = ship_inter.demand_fueloil
    ship_inter.CO2e_cb = ship_inter.demand_fueloil * fact(
        "Fact_T_S_fueloil_EmFa_tank_wheel_2018"
    )
    # ------------------------

    if entries.t_rt7 in ["71", "72", "73", "74", "75", "76", "77"]:

        other_foot.transport_capacity_pkm = (
            entries.m_population_com_2018
            * 365
            * fact("Fact_T_D_modal_split_foot_rt" + entries.t_rt7)
        )

        other_cycl.transport_capacity_pkm = (
            entries.m_population_com_2018
            * 365
            * fact("Fact_T_D_modal_split_cycl_rt" + entries.t_rt7)
        )

    # This happens if we run Local Zero for a Landkreis a Bundesland or Germany.
    # We do not have a area_kind entry in this case and just use the mean mean modal split of germany.
    elif entries.t_rt7 == "nd":

        other_cycl.transport_capacity_pkm = (
            365 * entries.m_population_com_2018 * fact("Fact_T_D_modal_split_cycl_nat")
        )

        other_foot.transport_capacity_pkm = (
            entries.m_population_com_2018 * 365 * fact("Fact_T_D_modal_split_foot_nat")
        )

    # TODO: Throw a more suffisticated error message if we ?

    air.energy = air_inter.energy + air_dmstc.energy
    air.transport_capacity_pkm = (
        air_inter.transport_capacity_pkm + air_dmstc.transport_capacity_pkm
    )
    air.transport_capacity_tkm = (
        air_inter.transport_capacity_tkm + air_dmstc.transport_capacity_tkm
    )
    # International air travel does not use petrol but jetfuel
    air.demand_petrol = air_dmstc.demand_petrol
    air.demand_jetfuel = air_inter.demand_jetfuel + air_dmstc.demand_jetfuel
    air.CO2e_cb = air_inter.CO2e_cb + air_dmstc.CO2e_cb

    ship.energy = ship_inter.energy + ship_dmstc.energy
    ship.transport_capacity_tkm = (
        ship_inter.transport_capacity_tkm + ship_dmstc.transport_capacity_tkm
    )
    # Basically domestic ships are small and use primarily diesel
    # International ships are really really big and use fueloil.
    # Yes there are exceptions but for our purposes they roughly do not
    # matter.
    ship.demand_diesel = ship_dmstc.demand_diesel
    ship.demand_fueloil = ship_inter.demand_fueloil
    ship.CO2e_cb = ship_inter.CO2e_cb + ship_dmstc.CO2e_cb

    # ----------------------------------------------------
    air.demand_petrol = air_dmstc.demand_petrol

    road_ppl.demand_petrol = road_car.demand_petrol
    road_gds.demand_petrol = road_gds_ldt.demand_petrol

    road.demand_petrol = road_ppl.demand_petrol + road_gds.demand_petrol
    t.demand_petrol = air.demand_petrol + road.demand_petrol
    s_petrol.energy = t.demand_petrol
    s_jetfuel.energy = air_inter.demand_jetfuel + air_dmstc.demand_jetfuel
    s_diesel.energy = t.demand_diesel

    s_fueloil.energy = ship_inter.demand_fueloil

    s_gas.energy = t.demand_gas

    s_biogas.energy = t.demand_biogas

    s_bioethanol.energy = t.demand_bioethanol

    s_biodiesel.energy = t.demand_biodiesel

    s_elec.energy = t.demand_electricity

    g.CO2e_total = 0

    g_planning.CO2e_total = 0

    air.CO2e_total = air.CO2e_cb

    air_inter.CO2e_total = air_inter.CO2e_cb

    air_dmstc.CO2e_total = air_dmstc.CO2e_cb

    rail_ppl_metro.energy = rail_ppl_metro.demand_electricity
    rail_ppl_distance.mileage = rail_ppl_distance.transport_capacity_pkm / fact(
        "Fact_T_D_rail_ppl_ratio_pkm_to_fzkm_2018"
    )
    rail_ppl.mileage = rail_ppl_distance.mileage + rail_ppl_metro.mileage

    rail.transport_capacity_pkm = rail_ppl.transport_capacity_pkm

    rail.transport_capacity_tkm = rail_gds.transport_capacity_tkm
    rail.CO2e_cb = rail_ppl.CO2e_cb + rail_gds.CO2e_cb

    road_action_charger.CO2e_total = 0
    road_gds_mhd_it_ot.demand_biogas = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_cng_lngl_stock_2018")
        * fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018")
        * fact("Fact_T_S_MHD_SEC_diesel_it_at_2018")
    )
    road_ppl.mileage = road_car.mileage + road_bus.mileage
    road_ppl.demand_lpg = road_car.demand_lpg

    road_ppl.CO2e_cb = road_car.CO2e_cb + road_bus.CO2e_cb
    road_ppl.CO2e_total = road_ppl.CO2e_cb

    road_ppl.transport_capacity_pkm = (
        road_car.transport_capacity_pkm + road_bus.transport_capacity_pkm
    )
    road_ppl.demand_gas = road_car.demand_gas + road_bus.demand_gas
    road_ppl.demand_bioethanol = road_car.demand_bioethanol

    road_ppl.energy = road_car.energy + road_bus.energy
    road.transport_capacity_pkm = road_ppl.transport_capacity_pkm
    road_ppl.demand_diesel = road_car.demand_diesel + road_bus.demand_diesel
    road_ppl.demand_biogas = road_car.demand_biogas + road_bus.demand_biogas
    road_ppl.demand_biodiesel = road_car.demand_biodiesel + road_bus.demand_biodiesel
    road_ppl.demand_electricity = (
        road_car.demand_electricity + road_bus.demand_electricity
    )

    road_bus.CO2e_total = road_bus.CO2e_cb

    road_bus_action_infra.CO2e_total = 0

    road_gds_mhd_ab.mileage = entries.t_mil_mhd_ab * MILLION
    road_gds_mhd_it_ot.demand_gas = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_cng_lngl_stock_2018")
        * (1 - fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018"))
        * fact("Fact_T_S_MHD_SEC_diesel_it_at_2018")
    )
    road_gds_mhd_ab.demand_biogas = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_cng_lngl_stock_2018")
        * fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018")
        * fact("Fact_T_S_MHD_SEC_diesel_ab_2018")
    )
    other_foot.CO2e_cb = other_cycl.CO2e_cb = 0

    other.CO2e_cb = other_foot.CO2e_cb + other_cycl.CO2e_cb
    road_gds_mhd_it_ot.demand_diesel = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_diesel_stock_2018")
        * (1 - fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018"))
        * fact("Fact_T_S_MHD_SEC_diesel_it_at_2018")
    )
    road_gds_mhd_it_ot.demand_biodiesel = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_diesel_stock_2018")
        * fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018")
        * fact("Fact_T_S_MHD_SEC_diesel_it_at_2018")
    )
    road_gds_mhd_ab.demand_gas = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_cng_lngl_stock_2018")
        * (1 - fact("Fact_T_S_Rl_Rd_cng_bio_frac_2018"))
        * fact("Fact_T_S_MHD_SEC_diesel_ab_2018")
    )
    road_gds_mhd_it_ot.transport_capacity_tkm = road_gds_mhd_it_ot.mileage * fact(
        "Fact_T_D_lf_gds_MHD_2018"
    )
    road_gds_mhd_ab.demand_diesel = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_diesel_stock_2018")
        * (1 - fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018"))
        * fact("Fact_T_S_MHD_SEC_diesel_ab_2018")
    )
    road_gds_mhd_it_ot.demand_electricity = (
        road_gds_mhd_it_ot.mileage
        * fact("Fact_T_S_MHD_frac_bev_stock_2018")
        * fact("Fact_T_S_MHD_SEC_elec_it_at_2018")
    )
    road_gds_mhd_it_ot.CO2e_cb = (
        road_gds_mhd_it_ot.demand_diesel * fact("Fact_T_S_diesel_EmFa_tank_wheel_2018")
        + road_gds_mhd_it_ot.demand_gas * fact("Fact_T_S_cng_EmFa_tank_wheel_2018")
        + road_gds_mhd_it_ot.demand_biogas * ass("Ass_T_S_biogas_EmFa_tank_wheel")
        + road_gds_mhd_it_ot.demand_biodiesel * ass("Ass_T_S_biodiesel_EmFa_tank_wheel")
        + road_gds_mhd_it_ot.demand_electricity
        * fact("Fact_T_S_electricity_EmFa_tank_wheel_2018")
    )
    road_gds_mhd_ab.demand_biodiesel = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_diesel_stock_2018")
        * fact("Fact_T_S_Rl_Rd_diesel_bio_frac_2018")
        * fact("Fact_T_S_MHD_SEC_diesel_ab_2018")
    )
    road_gds.demand_lpg = road_gds_ldt.demand_lpg

    road.demand_lpg = road_ppl.demand_lpg + road_gds.demand_lpg
    road_gds.demand_bioethanol = road_gds_ldt.demand_bioethanol
    road_gds_mhd_ab.demand_electricity = (
        road_gds_mhd_ab.mileage
        * fact("Fact_T_S_MHD_frac_bev_stock_2018")
        * fact("Fact_T_S_MHD_SEC_elec_ab_2018")
    )
    road_gds_mhd_it_ot.energy = (
        road_gds_mhd_it_ot.demand_diesel
        + road_gds_mhd_it_ot.demand_gas
        + road_gds_mhd_it_ot.demand_biogas
        + road_gds_mhd_it_ot.demand_biodiesel
        + road_gds_mhd_it_ot.demand_electricity
    )
    road_gds_mhd_ab.transport_capacity_tkm = road_gds_mhd_ab.mileage * fact(
        "Fact_T_D_lf_gds_MHD_2018"
    )
    road_gds_mhd.demand_diesel = (
        road_gds_mhd_it_ot.demand_diesel + road_gds_mhd_ab.demand_diesel
    )
    road.demand_bioethanol = road_ppl.demand_bioethanol + road_gds.demand_bioethanol
    road_gds_mhd_ab.CO2e_cb = (
        road_gds_mhd_ab.demand_diesel * fact("Fact_T_S_diesel_EmFa_tank_wheel_2018")
        + road_gds_mhd_ab.demand_gas * fact("Fact_T_S_cng_EmFa_tank_wheel_2018")
        + road_gds_mhd_ab.demand_biogas * ass("Ass_T_S_biogas_EmFa_tank_wheel")
        + road_gds_mhd_ab.demand_biodiesel * ass("Ass_T_S_biodiesel_EmFa_tank_wheel")
        + road_gds_mhd_ab.demand_electricity
        * fact("Fact_T_S_electricity_EmFa_tank_wheel_2018")
    )
    road_gds_mhd.CO2e_cb = road_gds_mhd_it_ot.CO2e_cb + road_gds_mhd_ab.CO2e_cb
    road_gds.CO2e_cb = road_gds_ldt.CO2e_cb + road_gds_mhd.CO2e_cb
    road_gds_mhd_ab.energy = (
        road_gds_mhd_ab.demand_diesel
        + road_gds_mhd_ab.demand_gas
        + road_gds_mhd_ab.demand_biogas
        + road_gds_mhd_ab.demand_biodiesel
        + road_gds_mhd_ab.demand_electricity
    )
    road_gds_mhd.mileage = road_gds_mhd_it_ot.mileage + road_gds_mhd_ab.mileage
    road_gds_mhd.transport_capacity_tkm = (
        road_gds_mhd_it_ot.transport_capacity_tkm
        + road_gds_mhd_ab.transport_capacity_tkm
    )
    road_gds.demand_diesel = road_gds_ldt.demand_diesel + road_gds_mhd.demand_diesel
    road_gds_mhd.demand_gas = road_gds_mhd_it_ot.demand_gas + road_gds_mhd_ab.demand_gas
    road_gds_mhd.demand_biogas = (
        road_gds_mhd_it_ot.demand_biogas + road_gds_mhd_ab.demand_biogas
    )
    road_gds_mhd.demand_biodiesel = (
        road_gds_mhd_it_ot.demand_biodiesel + road_gds_mhd_ab.demand_biodiesel
    )
    road_gds_mhd.demand_electricity = (
        road_gds_mhd_it_ot.demand_electricity + road_gds_mhd_ab.demand_electricity
    )
    road.CO2e_cb = road_ppl.CO2e_cb + road_gds.CO2e_cb
    road_gds_mhd.CO2e_total = road_gds_mhd.CO2e_cb

    road_gds.demand_gas = road_gds_mhd.demand_gas

    road_gds.mileage = road_gds_ldt.mileage + road_gds_mhd.mileage
    road_gds.transport_capacity_tkm = (
        road_gds_ldt.transport_capacity_tkm + road_gds_mhd.transport_capacity_tkm
    )
    road_gds_mhd.energy = road_gds_mhd_it_ot.energy + road_gds_mhd_ab.energy
    road.demand_gas = road_ppl.demand_gas + road_gds.demand_gas
    road_gds.demand_biogas = road_gds_mhd.demand_biogas

    road_gds.demand_biodiesel = (
        road_gds_ldt.demand_biodiesel + road_gds_mhd.demand_biodiesel
    )
    road_gds.demand_electricity = (
        road_gds_ldt.demand_electricity + road_gds_mhd.demand_electricity
    )
    road_gds.CO2e_total = road_gds.CO2e_cb

    road_gds_mhd_it_ot.CO2e_total = road_gds_mhd_it_ot.CO2e_cb

    road_gds.energy = road_gds_ldt.energy + road_gds_mhd.energy
    road.mileage = road_ppl.mileage + road_gds.mileage
    road.transport_capacity_tkm = road_gds.transport_capacity_tkm

    road.demand_diesel = road_ppl.demand_diesel + road_gds.demand_diesel
    road.energy = road_ppl.energy + road_gds.energy
    road.demand_biogas = road_ppl.demand_biogas + road_gds.demand_biogas
    road.demand_biodiesel = road_ppl.demand_biodiesel + road_gds.demand_biodiesel
    road.demand_electricity = road_ppl.demand_electricity + road_gds.demand_electricity
    road.CO2e_total = road.CO2e_cb

    road_gds_mhd_ab.CO2e_total = road_gds_mhd_ab.CO2e_cb

    rail_ppl_distance.energy = (
        rail_ppl_distance.demand_diesel
        + rail_ppl_distance.demand_biodiesel
        + rail_ppl_distance.demand_electricity
    )
    rail.energy = rail_ppl_distance.energy + rail_ppl_metro.energy + rail_gds.energy
    other.mileage = 0
    other_foot.transport_capacity_pkm = (
        365 * entries.m_population_com_2018 * fact("Fact_T_D_modal_split_foot_nat")
        if (ags == "DG000000")
        else entries.m_population_com_2018 * 365
    )  # todo lookup list
    other.transport_capacity_tkm = 0

    rail.demand_diesel = rail_ppl.demand_diesel + rail_gds.demand_diesel
    rail.demand_biodiesel = rail_ppl.demand_biodiesel + rail_gds.demand_biodiesel
    rail.demand_electricity = rail_ppl.demand_electricity + rail_gds.demand_electricity
    t.CO2e_cb = air.CO2e_cb + road.CO2e_cb + rail.CO2e_cb + ship.CO2e_cb + other.CO2e_cb
    rail.CO2e_total = rail.CO2e_cb

    rail_action_invest_infra.CO2e_total = 0

    rail_action_invest_station.CO2e_total = 0

    rail_gds.mileage = rail_gds.transport_capacity_tkm / fact(
        "Fact_T_D_rail_gds_ratio_tkm_to_fzkm_2018"
    )
    rail_ppl.CO2e_total = rail_ppl.CO2e_cb

    t.energy = air.energy + road.energy + rail.energy + ship.energy
    t.demand_electricity = road.demand_electricity + rail.demand_electricity

    rail_ppl_metro.transport_capacity_pkm = rail_ppl_metro.mileage * fact(
        "Fact_T_D_lf_Rl_Metro_2018"
    )
    rail_ppl_metro.CO2e_cb = rail_ppl_metro.demand_electricity * fact(
        "Fact_T_S_electricity_EmFa_tank_wheel_2018"
    )
    rail_ppl_metro.CO2e_total = rail_ppl_metro.CO2e_cb

    rail_ppl_metro_action_infra.CO2e_total = 0

    rail.mileage = rail_ppl.mileage + rail_gds.mileage
    rail_gds.CO2e_total = rail_gds.CO2e_cb
    rail.CO2e_cb = rail_ppl.CO2e_cb + rail_gds.CO2e_cb

    ship.CO2e_total = ship.CO2e_cb

    ship_dmstc.CO2e_total = ship_dmstc.CO2e_cb

    ship_inter.CO2e_total = ship_inter.CO2e_cb
    t.mileage = road.mileage + rail.mileage + other.mileage

    t.transport_capacity_tkm = (
        air.transport_capacity_tkm
        + road.transport_capacity_tkm
        + rail.transport_capacity_tkm
        + ship.transport_capacity_tkm
        + other.transport_capacity_tkm
    )
    t.CO2e_total = t.CO2e_cb
    other.CO2e_total = other.CO2e_cb
    other.transport_capacity_pkm = (
        other_foot.transport_capacity_pkm + other_cycl.transport_capacity_pkm
    )
    other_foot.CO2e_total = other_foot.CO2e_cb

    t.transport_capacity_pkm = (
        air.transport_capacity_pkm
        + road.transport_capacity_pkm
        + rail.transport_capacity_pkm
        + other.transport_capacity_pkm
    )

    other_cycl.CO2e_total = other_cycl.CO2e_cb
    s_diesel.energy = t.demand_diesel
    s_gas.energy = t.demand_gas
    s_biogas.energy = t.demand_biogas

    t.demand_petrol = air.demand_petrol + road.demand_petrol
    t.demand_jetfuel = air.demand_jetfuel

    t.demand_diesel = road.demand_diesel + rail.demand_diesel + ship.demand_diesel
    ship.demand_fueloil = ship_inter.demand_fueloil

    t.demand_fueloil = ship.demand_fueloil

    t.demand_lpg = road.demand_lpg

    s_lpg.energy = t.demand_lpg

    t.demand_gas = road.demand_gas

    t.demand_biogas = road.demand_biogas

    t.demand_bioethanol = road.demand_bioethanol

    t.demand_biodiesel = road.demand_biodiesel + rail.demand_biodiesel

    t.demand_biogas = road.demand_biogas
    t.demand_bioethanol = road.demand_bioethanol
    t.demand_biodiesel = road.demand_biodiesel + rail.demand_biodiesel

    s_diesel.energy = t.demand_diesel
    s_gas.energy = t.demand_gas
    s_biogas.energy = t.demand_biogas
    s_bioethanol.energy = t.demand_bioethanol
    s_biodiesel.energy = t.demand_biodiesel
    s_elec.energy = t.demand_electricity

    s_biogas.energy = t.demand_biogas
    s_bioethanol.energy = t.demand_bioethanol
    s_biodiesel.energy = t.demand_biodiesel

    s.energy = (
        s_petrol.energy
        + s_jetfuel.energy
        + s_diesel.energy
        + s_fueloil.energy
        + s_lpg.energy
        + s_gas.energy
        + s_biogas.energy
        + s_bioethanol.energy
        + s_biodiesel.energy
        + s_elec.energy
    )

    t.energy = air.energy + road.energy + rail.energy + ship.energy
    t.mileage = road.mileage + rail.mileage + other.mileage
    t.transport_capacity_pkm = (
        air.transport_capacity_pkm
        + road.transport_capacity_pkm
        + rail.transport_capacity_pkm
        + other.transport_capacity_pkm
    )
    t.transport_capacity_tkm = (
        air.transport_capacity_tkm
        + road.transport_capacity_tkm
        + rail.transport_capacity_tkm
        + ship.transport_capacity_tkm
        + other.transport_capacity_tkm
    )
    t.demand_petrol = air.demand_petrol + road.demand_petrol
    t.demand_jetfuel = air.demand_jetfuel
    t.demand_diesel = road.demand_diesel + rail.demand_diesel + ship.demand_diesel
    t.demand_fueloil = ship.demand_fueloil
    t.demand_lpg = road.demand_lpg
    t.demand_gas = road.demand_gas
    t.demand_biogas = road.demand_biogas
    t.demand_bioethanol = road.demand_bioethanol
    t.demand_biodiesel = road.demand_biodiesel + rail.demand_biodiesel
    t.demand_electricity = road.demand_electricity + rail.demand_electricity
    t.CO2e_cb = air.CO2e_cb + road.CO2e_cb + rail.CO2e_cb + ship.CO2e_cb + other.CO2e_cb
    t.CO2e_total = t.CO2e_cb
    rail_ppl_distance.CO2e_cb = (
        0 * fact("Fact_T_S_petrol_EmFa_tank_wheel_2018")
        + 0 * fact("Fact_T_S_jetfuel_EmFa_tank_wheel_2018")
        + rail_ppl_distance.demand_diesel * fact("Fact_T_S_diesel_EmFa_tank_wheel_2018")
        + 0 * fact("Fact_T_S_lpg_EmFa_tank_wheel_2018")
        + 0 * fact("Fact_T_S_cng_EmFa_tank_wheel_2018")
        + 0 * ass("Ass_T_S_biogas_EmFa_tank_wheel")
        + 0 * ass("Ass_T_S_bioethanol_EmFa_tank_wheel")
        + rail_ppl_distance.demand_biodiesel * ass("Ass_T_S_biodiesel_EmFa_tank_wheel")
        + rail_ppl_distance.demand_electricity
        * fact("Fact_T_S_electricity_EmFa_tank_wheel_2018")
    )
    rail_ppl_distance.CO2e_total = rail_ppl_distance.CO2e_cb

    return t18
