from dataclasses import dataclass, asdict, field
from .inputs import Inputs
from .utils import div
from . import residences2018

# Definition der relevanten Spaltennamen für den Sektor E


@dataclass
class BColVars:
    energy: float = None
    pct_x: float = None
    pct_energy: float = None
    area_m2: float = None
    factor_adapted_to_fec: float = None
    cost_fuel: float = None
    cost_fuel_per_MWh: float = None
    CO2e_cb: float = None
    CO2e_cb_per_MWh: float = None
    CO2e_pb: float = None
    CO2e_total: float = None
    number_of_buildings: float = None


@dataclass
class B18:
    b: BColVars = field(default_factory=BColVars)
    g: BColVars = field(default_factory=BColVars)
    g_consult: BColVars = field(default_factory=BColVars)
    p: BColVars = field(default_factory=BColVars)
    p_nonresi: BColVars = field(default_factory=BColVars)
    p_nonresi_com: BColVars = field(default_factory=BColVars)
    p_elec_elcon: BColVars = field(default_factory=BColVars)
    p_elec_heatpump: BColVars = field(default_factory=BColVars)
    p_vehicles: BColVars = field(default_factory=BColVars)
    p_other: BColVars = field(default_factory=BColVars)
    s: BColVars = field(default_factory=BColVars)
    s_gas: BColVars = field(default_factory=BColVars)
    s_emethan: BColVars = field(default_factory=BColVars)
    s_lpg: BColVars = field(default_factory=BColVars)
    s_petrol: BColVars = field(default_factory=BColVars)
    s_jetfuel: BColVars = field(default_factory=BColVars)
    s_diesel: BColVars = field(default_factory=BColVars)
    s_fueloil: BColVars = field(default_factory=BColVars)
    s_biomass: BColVars = field(default_factory=BColVars)
    s_coal: BColVars = field(default_factory=BColVars)
    s_heatnet: BColVars = field(default_factory=BColVars)
    s_elec_heating: BColVars = field(default_factory=BColVars)
    s_heatpump: BColVars = field(default_factory=BColVars)
    s_solarth: BColVars = field(default_factory=BColVars)
    s_elec: BColVars = field(default_factory=BColVars)
    rb: BColVars = field(default_factory=BColVars)
    rp_p: BColVars = field(default_factory=BColVars)

    def dict(self):
        return asdict(self)


# Berechnungsfunktion im Sektor GHD für 2018


def calc(inputs: Inputs, *, r18: residences2018.R18) -> B18:
    def fact(n):
        return inputs.fact(n)

    def ass(n):
        return inputs.ass(n)

    def entry(n):
        return inputs.entry(n)

    Million = 1000000.0

    b18 = B18()

    b18.s_gas.energy = entry("In_B_gas_fec")  # 98.602.500 MWh

    b18.s_lpg.energy = entry("In_B_lpg_fec")  # 3.007.222 MWh

    b18.s_petrol.energy = entry("In_B_petrol_fec")  # 1.667.778 MWh

    b18.s_jetfuel.energy = entry("In_B_jetfuel_fec")  # 284.722 MWh

    b18.s_diesel.energy = entry("In_B_diesel_fec")  # 9.033.056 MWh

    b18.s_fueloil.energy = entry("In_B_fueloil_fec")  # 33.370.278 MWh

    b18.s_biomass.energy = entry("In_B_biomass_fec")  # 20.860.278 MWh

    b18.s_coal.energy = entry("In_B_coal_fec")  # 232.778 MWh

    b18.s_heatnet.energy = entry("In_B_heatnet_fec")  # 6.521.944 MWh

    b18.s_elec_heating.energy = (
        fact("Fact_B_S_elec_heating_fec_2018")
        * entry("In_R_flats_wo_heatnet")
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )  # 13.027.778 MWh

    b18.s_heatpump.energy = entry("In_B_orenew_fec") * fact(
        "Fact_R_S_ratio_heatpump_to_orenew_2018"
    )  # 1.262.040 MWh

    b18.s_solarth.energy = entry("In_B_orenew_fec") * (
        1 - fact("Fact_R_S_ratio_heatpump_to_orenew_2018")
    )  # 1.262.040 MWh

    b18.s_elec.energy = entry("In_B_elec_fec")
    # 856.293 MWh

    b18.s.energy = (
        b18.s_gas.energy
        + b18.s_lpg.energy
        + b18.s_petrol.energy
        + b18.s_jetfuel.energy
        + b18.s_diesel.energy
        + b18.s_fueloil.energy
        + b18.s_biomass.energy
        + b18.s_coal.energy
        + b18.s_heatnet.energy
        + b18.s_heatpump.energy
        + b18.s_solarth.energy
        + b18.s_elec.energy
    )  # 187.870.374 MWh

    b18.s_gas.pct_energy = div(b18.s_gas.energy, b18.s.energy)  # 52,5%

    b18.s_lpg.pct_energy = div(b18.s_lpg.energy, b18.s.energy)  # 1,6%

    b18.s_petrol.pct_energy = div(b18.s_petrol.energy, b18.s.energy)  # 0,9%

    b18.s_jetfuel.pct_energy = div(b18.s_jetfuel.energy, b18.s.energy)  # 0,2%

    b18.s_diesel.pct_energy = div(b18.s_diesel.energy, b18.s.energy)  # 4,8%

    b18.s_fueloil.pct_energy = div(b18.s_fueloil.energy, b18.s.energy)  # 17,8%

    b18.s_biomass.pct_energy = div(b18.s_biomass.energy, b18.s.energy)  # 11,1%

    b18.s_coal.pct_energy = div(b18.s_coal.energy, b18.s.energy)  # 0,1%

    b18.s_heatnet.pct_energy = div(b18.s_heatnet.energy, b18.s.energy)  # 3,5%

    b18.s_elec_heating.pct_energy = div(
        b18.s_elec_heating.energy, b18.s_elec.energy
    )  # 6,9%

    b18.s_heatpump.pct_energy = div(b18.s_heatpump.energy, b18.s.energy)  # 0,7%

    b18.s_solarth.pct_energy = div(b18.s_solarth.energy, b18.s.energy)  # 0,5%

    b18.s_elec.pct_energy = div(b18.s_elec.energy, b18.s.energy)

    b18.s.pct_energy = (
        b18.s_gas.pct_energy
        + b18.s_lpg.pct_energy
        + b18.s_petrol.pct_energy
        + b18.s_jetfuel.pct_energy
        + b18.s_diesel.pct_energy
        + b18.s_fueloil.pct_energy
        + b18.s_biomass.pct_energy
        + b18.s_coal.pct_energy
        + b18.s_heatnet.pct_energy
        + b18.s_heatpump.pct_energy
        + b18.s_solarth.pct_energy
        + b18.s_elec.pct_energy
    )

    # NACHFRAGE:
    b18.p_nonresi.area_m2 = (
        entry("In_R_area_m2")
        * fact("Fact_B_P_ratio_buisness_buildings_to_all_buildings_area_2016")
        / (1 - fact("Fact_B_P_ratio_buisness_buildings_to_all_buildings_area_2016"))
        * (1 - fact("Fact_A_P_energy_buildings_ratio_A_to_B"))
    )

    b18.p_nonresi_com.pct_x = ass(
        "Ass_H_ratio_municipal_non_res_buildings_to_all_non_res_buildings_2050"
    )
    b18.p_nonresi_com.area_m2 = b18.p_nonresi.area_m2 * b18.p_nonresi_com.pct_x
    b18.p_nonresi.energy = (
        b18.s_gas.energy
        + b18.s_lpg.energy
        + b18.s_fueloil.energy
        + b18.s_biomass.energy
        + b18.s_coal.energy
        + b18.s_heatnet.energy
        + b18.s_heatpump.energy
        + b18.s_solarth.energy
        + b18.s_elec_heating.energy
    )
    # 187.870.374 MWh

    b18.p_nonresi_com.energy = b18.p_nonresi.energy * b18.p_nonresi_com.pct_x
    # 38.712.683 MWh

    b18.p_nonresi.number_of_buildings = (
        fact("Fact_B_P_number_business_buildings_2016")
        * entry("In_M_population_com_2018")
        / entry("In_M_population_nat")
    )

    b18.p_nonresi_com.factor_adapted_to_fec = div(
        b18.p_nonresi_com.energy, b18.p_nonresi_com.area_m2
    )

    # Elektrische Energie / Bisherige elektrische Verbraucher

    # Wärmepumpen
    b18.p_elec_heatpump.energy = b18.s_heatpump.energy / fact(
        "Fact_R_S_heatpump_mean_annual_performance_factor_all"
    )

    b18.p_elec_elcon.energy = b18.p_elec_elcon.energy = (
        b18.s_elec.energy - b18.p_elec_heatpump.energy - b18.s_elec_heating.energy
    )
    b18.p_vehicles.energy = (
        b18.s_petrol.energy + b18.s_jetfuel.energy + b18.s_diesel.energy
    )
    b18.p_other.energy = (
        b18.p_elec_elcon.energy + b18.p_elec_heatpump.energy + b18.p_vehicles.energy
    )  # SUM(p_elec_elcon.energy:p_vehicles.energy)
    b18.p.energy = b18.p_nonresi.energy + b18.p_other.energy
    b18.p_nonresi.factor_adapted_to_fec = div(
        b18.p_nonresi.energy, b18.p_nonresi.area_m2
    )

    # Primärenergiekosten
    b18.s_gas.cost_fuel_per_MWh = fact("Fact_R_S_gas_energy_cost_factor_2018")
    b18.s_lpg.cost_fuel_per_MWh = fact("Fact_R_S_lpg_energy_cost_factor_2018")
    b18.s_petrol.cost_fuel_per_MWh = fact("Fact_R_S_petrol_energy_cost_factor_2018")
    b18.s_jetfuel.cost_fuel_per_MWh = fact("Fact_R_S_kerosine_energy_cost_factor_2018")
    b18.s_diesel.cost_fuel_per_MWh = fact("Fact_R_S_fueloil_energy_cost_factor_2018")
    b18.s_fueloil.cost_fuel_per_MWh = fact("Fact_R_S_fueloil_energy_cost_factor_2018")
    b18.s_biomass.cost_fuel_per_MWh = fact("Fact_R_S_wood_energy_cost_factor_2018")
    b18.s_coal.cost_fuel_per_MWh = fact("Fact_R_S_coal_energy_cost_factor_2018")
    b18.s_heatnet.cost_fuel_per_MWh = fact("Fact_R_S_heatnet_energy_cost_factor_2018")
    b18.s_heatpump.cost_fuel_per_MWh = (
        fact("Fact_E_D_R_cost_fuel_per_MWh_2018")
        / (
            fact("Fact_R_S_ground_heatpump_mean_annual_performance_factor_stock_2018")
            + fact("Fact_R_S_air_heatpump_mean_annual_performance_factor_stock_2018")
        )
        * 2
    )

    b18.s_solarth.cost_fuel_per_MWh = 0

    b18.s_gas.cost_fuel = b18.s_gas.energy * b18.s_gas.cost_fuel_per_MWh / Million

    b18.s_lpg.cost_fuel = b18.s_lpg.energy * b18.s_lpg.cost_fuel_per_MWh / Million
    b18.s_petrol.cost_fuel = (
        b18.s_petrol.energy * b18.s_petrol.cost_fuel_per_MWh / Million
    )
    b18.s_jetfuel.cost_fuel = (
        b18.s_jetfuel.energy * b18.s_jetfuel.cost_fuel_per_MWh / Million
    )
    b18.s_diesel.cost_fuel = (
        b18.s_diesel.energy * b18.s_diesel.cost_fuel_per_MWh / Million
    )
    b18.s_fueloil.cost_fuel = (
        b18.s_fueloil.energy * b18.s_fueloil.cost_fuel_per_MWh / Million
    )
    b18.s_biomass.cost_fuel = (
        b18.s_biomass.energy * b18.s_biomass.cost_fuel_per_MWh / Million
    )
    b18.s_coal.cost_fuel = b18.s_coal.energy * b18.s_coal.cost_fuel_per_MWh / Million
    b18.s_heatnet.cost_fuel = (
        b18.s_heatnet.energy * b18.s_heatnet.cost_fuel_per_MWh / Million
    )
    b18.s_heatpump.cost_fuel = (
        b18.s_heatpump.energy * b18.s_heatpump.cost_fuel_per_MWh / Million
    )
    b18.s_solarth.cost_fuel = 0

    b18.s.cost_fuel = (
        b18.s_gas.cost_fuel
        + b18.s_lpg.cost_fuel
        + b18.s_petrol.cost_fuel
        + b18.s_jetfuel.cost_fuel
        + b18.s_diesel.cost_fuel
        + b18.s_fueloil.cost_fuel
        + b18.s_biomass.cost_fuel
        + b18.s_coal.cost_fuel
        + b18.s_heatnet.cost_fuel
        + b18.s_heatpump.cost_fuel
        + b18.s_solarth.cost_fuel
    )

    # Energiebedingte THG-Emissionen
    b18.s_gas.CO2e_cb_per_MWh = fact("Fact_H_P_ngas_cb_EF")
    b18.s_lpg.CO2e_cb_per_MWh = fact("Fact_H_P_LPG_cb_EF")
    b18.s_petrol.CO2e_cb_per_MWh = fact("Fact_H_P_petrol_cb_EF")
    b18.s_jetfuel.CO2e_cb_per_MWh = fact("Fact_H_P_kerosene_cb_EF")
    b18.s_diesel.CO2e_cb_per_MWh = fact("Fact_H_P_fueloil_cb_EF")
    b18.s_fueloil.CO2e_cb_per_MWh = fact("Fact_H_P_fueloil_cb_EF")
    b18.s_biomass.CO2e_cb_per_MWh = fact("Fact_RB_S_biomass_CO2e_EF")
    b18.s_coal.CO2e_cb_per_MWh = fact("Fact_R_S_coal_CO2e_EF")

    b18.s_gas.CO2e_cb = b18.s_gas.energy * b18.s_gas.CO2e_cb_per_MWh
    b18.s_lpg.CO2e_cb = b18.s_lpg.energy * b18.s_lpg.CO2e_cb_per_MWh
    b18.s_petrol.CO2e_cb = b18.s_petrol.energy * b18.s_petrol.CO2e_cb_per_MWh
    b18.s_jetfuel.CO2e_cb = b18.s_jetfuel.energy * b18.s_jetfuel.CO2e_cb_per_MWh
    b18.s_diesel.CO2e_cb = b18.s_diesel.energy * b18.s_diesel.CO2e_cb_per_MWh
    b18.s_fueloil.CO2e_cb = b18.s_fueloil.energy * b18.s_fueloil.CO2e_cb_per_MWh
    b18.s_biomass.CO2e_cb = b18.s_biomass.energy * b18.s_biomass.CO2e_cb_per_MWh
    b18.s_coal.CO2e_cb = b18.s_coal.energy * b18.s_coal.CO2e_cb_per_MWh

    b18.s.CO2e_cb = (
        b18.s_gas.CO2e_cb
        + b18.s_lpg.CO2e_cb
        + b18.s_petrol.CO2e_cb
        + b18.s_jetfuel.CO2e_cb
        + b18.s_diesel.CO2e_cb
        + b18.s_fueloil.CO2e_cb
        + b18.s_biomass.CO2e_cb
        + b18.s_coal.CO2e_cb
    )
    b18.s.CO2e_total = b18.s.CO2e_cb

    b18.s_gas.CO2e_total = b18.s_gas.CO2e_cb
    b18.s_lpg.CO2e_total = b18.s_lpg.CO2e_cb
    b18.s_petrol.CO2e_total = b18.s_petrol.CO2e_cb
    b18.s_jetfuel.CO2e_total = b18.s_jetfuel.CO2e_cb
    b18.s_diesel.CO2e_total = b18.s_diesel.CO2e_cb
    b18.s_fueloil.CO2e_total = b18.s_fueloil.CO2e_cb
    b18.s_biomass.CO2e_total = b18.s_biomass.CO2e_cb
    b18.s_coal.CO2e_total = b18.s_coal.CO2e_cb
    b18.s_biomass.number_of_buildings = b18.s_biomass.energy * div(
        b18.p_nonresi.number_of_buildings,
        (b18.p_nonresi.factor_adapted_to_fec * b18.p_nonresi.area_m2),
    )
    b18.rp_p.CO2e_cb = (
        r18.s.CO2e_cb
        - r18.s_petrol.CO2e_cb
        + b18.s.CO2e_cb
        - b18.s_petrol.CO2e_cb
        - b18.s_jetfuel.CO2e_cb
        - b18.s_diesel.CO2e_cb
    )
    b18.rp_p.CO2e_total = r18.s.CO2e_cb + b18.s.CO2e_cb
    b18.rb.energy = r18.p.energy + b18.p.energy
    b18.b.CO2e_cb = b18.s.CO2e_cb
    b18.rb.CO2e_cb = r18.r.CO2e_cb + b18.b.CO2e_cb
    b18.rb.CO2e_total = b18.rb.CO2e_cb
    b18.b.CO2e_total = b18.s.CO2e_total

    b18.b.CO2e_pb = 0
    b18.s_heatnet.CO2e_cb = 0
    b18.s_heatnet.CO2e_cb_per_MWh = 0
    b18.s_heatnet.CO2e_total = 0
    b18.s_heatpump.CO2e_cb = 0
    b18.s_heatpump.CO2e_cb_per_MWh = 0
    b18.s_heatpump.CO2e_total = 0
    b18.s_solarth.CO2e_cb = 0
    b18.s_solarth.CO2e_cb_per_MWh = 0
    b18.s_solarth.CO2e_total = 0
    b18.s_elec.CO2e_cb = 0
    b18.s_elec.CO2e_cb_per_MWh = 0
    b18.s_elec.CO2e_total = 0
    b18.s_elec_heating.CO2e_cb = 0
    b18.s_elec_heating.CO2e_cb_per_MWh = 0
    b18.s_elec_heating.CO2e_total = 0

    return b18
