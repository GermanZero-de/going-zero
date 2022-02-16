from dataclasses import dataclass, make_dataclass
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
    b_CO2e_cb: float
    b_CO2e_pb: float
    b_CO2e_total: float
    p_energy: float
    p_nonresi_energy: float
    p_nonresi_area_m2: float
    p_nonresi_factor_adapted_to_fec: float
    p_nonresi_number_of_buildings: float
    p_nonresi_com_energy: float
    p_nonresi_com_pct_x: float
    p_nonresi_com_area_m2: float
    p_nonresi_com_factor_adapted_to_fec: float
    p_elec_elcon_energy: float
    p_elec_heatpump_energy: float
    p_vehicles_energy: float
    p_other_energy: float
    s_energy: float
    s_pct_energy: float
    s_cost_fuel: float
    s_CO2e_cb: float
    s_CO2e_total: float
    s_gas_energy: float
    s_gas_pct_energy: float
    s_gas_cost_fuel: float
    s_gas_cost_fuel_per_MWh: float
    s_gas_CO2e_cb: float
    s_gas_CO2e_cb_per_MWh: float
    s_gas_CO2e_total: float
    s_lpg_energy: float
    s_lpg_pct_energy: float
    s_lpg_cost_fuel: float
    s_lpg_cost_fuel_per_MWh: float
    s_lpg_CO2e_cb: float
    s_lpg_CO2e_cb_per_MWh: float
    s_lpg_CO2e_total: float
    s_petrol_energy: float
    s_petrol_pct_energy: float
    s_petrol_cost_fuel: float
    s_petrol_cost_fuel_per_MWh: float
    s_petrol_CO2e_cb: float
    s_petrol_CO2e_cb_per_MWh: float
    s_petrol_CO2e_total: float
    s_jetfuel_energy: float
    s_jetfuel_pct_energy: float
    s_jetfuel_cost_fuel: float
    s_jetfuel_cost_fuel_per_MWh: float
    s_jetfuel_CO2e_cb: float
    s_jetfuel_CO2e_cb_per_MWh: float
    s_jetfuel_CO2e_total: float
    s_diesel_energy: float
    s_diesel_pct_energy: float
    s_diesel_cost_fuel: float
    s_diesel_cost_fuel_per_MWh: float
    s_diesel_CO2e_cb: float
    s_diesel_CO2e_cb_per_MWh: float
    s_diesel_CO2e_total: float
    s_fueloil_energy: float
    s_fueloil_pct_energy: float
    s_fueloil_cost_fuel: float
    s_fueloil_cost_fuel_per_MWh: float
    s_fueloil_CO2e_cb: float
    s_fueloil_CO2e_cb_per_MWh: float
    s_fueloil_CO2e_total: float
    s_biomass_energy: float
    s_biomass_pct_energy: float
    s_biomass_cost_fuel: float
    s_biomass_cost_fuel_per_MWh: float
    s_biomass_CO2e_cb: float
    s_biomass_CO2e_cb_per_MWh: float
    s_biomass_CO2e_total: float
    s_biomass_number_of_buildings: float
    s_coal_energy: float
    s_coal_pct_energy: float
    s_coal_cost_fuel: float
    s_coal_cost_fuel_per_MWh: float
    s_coal_CO2e_cb: float
    s_coal_CO2e_cb_per_MWh: float
    s_coal_CO2e_total: float
    s_heatnet_energy: float
    s_heatnet_pct_energy: float
    s_heatnet_cost_fuel: float
    s_heatnet_cost_fuel_per_MWh: float
    s_heatnet_CO2e_cb: float
    s_heatnet_CO2e_cb_per_MWh: float
    s_heatnet_CO2e_total: float
    s_elec_heating_energy: float
    s_elec_heating_pct_energy: float
    s_elec_heating_CO2e_cb: float
    s_elec_heating_CO2e_cb_per_MWh: float
    s_elec_heating_CO2e_total: float
    s_heatpump_energy: float
    s_heatpump_pct_energy: float
    s_heatpump_cost_fuel: float
    s_heatpump_cost_fuel_per_MWh: float
    s_heatpump_CO2e_cb: float
    s_heatpump_CO2e_cb_per_MWh: float
    s_heatpump_CO2e_total: float
    s_solarth_energy: float
    s_solarth_pct_energy: float
    s_solarth_cost_fuel: float
    s_solarth_cost_fuel_per_MWh: float
    s_solarth_CO2e_cb: float
    s_solarth_CO2e_cb_per_MWh: float
    s_solarth_CO2e_total: float
    s_elec_energy: float
    s_elec_pct_energy: float
    s_elec_CO2e_cb: float
    s_elec_CO2e_cb_per_MWh: float
    s_elec_CO2e_total: float
    rb_energy: float
    rb_CO2e_cb: float
    rb_CO2e_total: float
    rp_p_CO2e_cb: float
    rp_p_CO2e_total: float

    def dict(self):
        """Create the dict in the old style. No particular reason other than
        making it easy to transition."""
        if not hasattr(self, "_dict_cache"):
            suffixes = BColVars.__dataclass_fields__.keys()
            long_names = self.__dataclass_fields__.keys()
            res = {}
            for name in long_names:
                for suffix in suffixes:
                    if name.endswith("_" + suffix):
                        prefix = name.removesuffix("_" + suffix)
                        res.setdefault(prefix, {})[suffix] = getattr(self, name)
            self._dict_cache = res
        return self._dict_cache

    def __getattr__(self, name: str):
        """This is just here as a shim, to avoid having to change anything outside this module."""
        if name == "_dict_cache":
            raise AttributeError()
        return BColVars(**self.dict()[name])


# Berechnungsfunktion im Sektor GHD für 2018


def calc(inputs: Inputs, *, r18: residences2018.R18) -> B18:
    def fact(n):
        return inputs.fact(n)

    def ass(n):
        return inputs.ass(n)

    def entry(n):
        return inputs.entry(n)

    Million = 1000000.0

    b18_s_gas_energy = entry("In_B_gas_fec")  # 98.602.500 MWh

    b18_s_lpg_energy = entry("In_B_lpg_fec")  # 3.007.222 MWh

    b18_s_petrol_energy = entry("In_B_petrol_fec")  # 1.667.778 MWh

    b18_s_jetfuel_energy = entry("In_B_jetfuel_fec")  # 284.722 MWh

    b18_s_diesel_energy = entry("In_B_diesel_fec")  # 9.033.056 MWh

    b18_s_fueloil_energy = entry("In_B_fueloil_fec")  # 33.370.278 MWh

    b18_s_biomass_energy = entry("In_B_biomass_fec")  # 20.860.278 MWh

    b18_s_coal_energy = entry("In_B_coal_fec")  # 232.778 MWh

    b18_s_heatnet_energy = entry("In_B_heatnet_fec")  # 6.521.944 MWh

    b18_s_elec_heating_energy = (
        fact("Fact_B_S_elec_heating_fec_2018")
        * entry("In_R_flats_wo_heatnet")
        / fact("Fact_R_P_flats_wo_heatnet_2011")
    )  # 13.027.778 MWh

    b18_s_heatpump_energy = entry("In_B_orenew_fec") * fact(
        "Fact_R_S_ratio_heatpump_to_orenew_2018"
    )  # 1.262.040 MWh

    b18_s_solarth_energy = entry("In_B_orenew_fec") * (
        1 - fact("Fact_R_S_ratio_heatpump_to_orenew_2018")
    )  # 1.262.040 MWh

    b18_s_elec_energy = entry("In_B_elec_fec")
    # 856.293 MWh

    b18_s_energy = (
        b18_s_gas_energy
        + b18_s_lpg_energy
        + b18_s_petrol_energy
        + b18_s_jetfuel_energy
        + b18_s_diesel_energy
        + b18_s_fueloil_energy
        + b18_s_biomass_energy
        + b18_s_coal_energy
        + b18_s_heatnet_energy
        + b18_s_heatpump_energy
        + b18_s_solarth_energy
        + b18_s_elec_energy
    )  # 187.870.374 MWh

    b18_s_gas_pct_energy = div(b18_s_gas_energy, b18_s_energy)  # 52,5%

    b18_s_lpg_pct_energy = div(b18_s_lpg_energy, b18_s_energy)  # 1,6%

    b18_s_petrol_pct_energy = div(b18_s_petrol_energy, b18_s_energy)  # 0,9%

    b18_s_jetfuel_pct_energy = div(b18_s_jetfuel_energy, b18_s_energy)  # 0,2%

    b18_s_diesel_pct_energy = div(b18_s_diesel_energy, b18_s_energy)  # 4,8%

    b18_s_fueloil_pct_energy = div(b18_s_fueloil_energy, b18_s_energy)  # 17,8%

    b18_s_biomass_pct_energy = div(b18_s_biomass_energy, b18_s_energy)  # 11,1%

    b18_s_coal_pct_energy = div(b18_s_coal_energy, b18_s_energy)  # 0,1%

    b18_s_heatnet_pct_energy = div(b18_s_heatnet_energy, b18_s_energy)  # 3,5%

    b18_s_elec_heating_pct_energy = div(
        b18_s_elec_heating_energy, b18_s_elec_energy
    )  # 6,9%

    b18_s_heatpump_pct_energy = div(b18_s_heatpump_energy, b18_s_energy)  # 0,7%

    b18_s_solarth_pct_energy = div(b18_s_solarth_energy, b18_s_energy)  # 0,5%

    b18_s_elec_pct_energy = div(b18_s_elec_energy, b18_s_energy)

    b18_s_pct_energy = (
        b18_s_gas_pct_energy
        + b18_s_lpg_pct_energy
        + b18_s_petrol_pct_energy
        + b18_s_jetfuel_pct_energy
        + b18_s_diesel_pct_energy
        + b18_s_fueloil_pct_energy
        + b18_s_biomass_pct_energy
        + b18_s_coal_pct_energy
        + b18_s_heatnet_pct_energy
        + b18_s_heatpump_pct_energy
        + b18_s_solarth_pct_energy
        + b18_s_elec_pct_energy
    )

    # NACHFRAGE:
    b18_p_nonresi_area_m2 = (
        entry("In_R_area_m2")
        * fact("Fact_B_P_ratio_buisness_buildings_to_all_buildings_area_2016")
        / (1 - fact("Fact_B_P_ratio_buisness_buildings_to_all_buildings_area_2016"))
        * (1 - fact("Fact_A_P_energy_buildings_ratio_A_to_B"))
    )

    b18_p_nonresi_com_pct_x = ass(
        "Ass_H_ratio_municipal_non_res_buildings_to_all_non_res_buildings_2050"
    )
    b18_p_nonresi_com_area_m2 = b18_p_nonresi_area_m2 * b18_p_nonresi_com_pct_x
    b18_p_nonresi_energy = (
        b18_s_gas_energy
        + b18_s_lpg_energy
        + b18_s_fueloil_energy
        + b18_s_biomass_energy
        + b18_s_coal_energy
        + b18_s_heatnet_energy
        + b18_s_heatpump_energy
        + b18_s_solarth_energy
        + b18_s_elec_heating_energy
    )
    # 187.870.374 MWh

    b18_p_nonresi_com_energy = b18_p_nonresi_energy * b18_p_nonresi_com_pct_x
    # 38.712.683 MWh

    b18_p_nonresi_number_of_buildings = (
        fact("Fact_B_P_number_business_buildings_2016")
        * entry("In_M_population_com_2018")
        / entry("In_M_population_nat")
    )

    b18_p_nonresi_com_factor_adapted_to_fec = div(
        b18_p_nonresi_com_energy, b18_p_nonresi_com_area_m2
    )

    # Elektrische Energie / Bisherige elektrische Verbraucher

    # Wärmepumpen
    b18_p_elec_heatpump_energy = b18_s_heatpump_energy / fact(
        "Fact_R_S_heatpump_mean_annual_performance_factor_all"
    )

    b18_p_elec_elcon_energy = b18_p_elec_elcon_energy = (
        b18_s_elec_energy - b18_p_elec_heatpump_energy - b18_s_elec_heating_energy
    )
    b18_p_vehicles_energy = (
        b18_s_petrol_energy + b18_s_jetfuel_energy + b18_s_diesel_energy
    )
    b18_p_other_energy = (
        b18_p_elec_elcon_energy + b18_p_elec_heatpump_energy + b18_p_vehicles_energy
    )  # SUM(p_elec_elcon.energy:p_vehicles.energy)
    b18_p_energy = b18_p_nonresi_energy + b18_p_other_energy
    b18_p_nonresi_factor_adapted_to_fec = div(
        b18_p_nonresi_energy, b18_p_nonresi_area_m2
    )

    b18_p_elec_elcon_demand_change = ass("Ass_R_D_fec_elec_elcon_change")

    b18_p_vehicles_demand_change = ass("Ass_B_D_fec_vehicles_change")

    b18_p_vehicles_demand_ediesel = b18_p_vehicles_energy * (
        1 + b18_p_vehicles_demand_change
    )

    # Primärenergiekosten
    b18_s_gas_cost_fuel_per_MWh = fact("Fact_R_S_gas_energy_cost_factor_2018")
    b18_s_lpg_cost_fuel_per_MWh = fact("Fact_R_S_lpg_energy_cost_factor_2018")
    b18_s_petrol_cost_fuel_per_MWh = fact("Fact_R_S_petrol_energy_cost_factor_2018")
    b18_s_jetfuel_cost_fuel_per_MWh = fact("Fact_R_S_kerosine_energy_cost_factor_2018")
    b18_s_diesel_cost_fuel_per_MWh = fact("Fact_R_S_fueloil_energy_cost_factor_2018")
    b18_s_fueloil_cost_fuel_per_MWh = fact("Fact_R_S_fueloil_energy_cost_factor_2018")
    b18_s_biomass_cost_fuel_per_MWh = fact("Fact_R_S_wood_energy_cost_factor_2018")
    b18_s_coal_cost_fuel_per_MWh = fact("Fact_R_S_coal_energy_cost_factor_2018")
    b18_s_heatnet_cost_fuel_per_MWh = fact("Fact_R_S_heatnet_energy_cost_factor_2018")
    b18_s_heatpump_cost_fuel_per_MWh = (
        fact("Fact_E_D_R_cost_fuel_per_MWh_2018")
        / (
            fact("Fact_R_S_ground_heatpump_mean_annual_performance_factor_stock_2018")
            + fact("Fact_R_S_air_heatpump_mean_annual_performance_factor_stock_2018")
        )
        * 2
    )

    b18_s_solarth_cost_fuel_per_MWh = 0

    b18_s_gas_cost_fuel = b18_s_gas_energy * b18_s_gas_cost_fuel_per_MWh / Million

    b18_s_lpg_cost_fuel = b18_s_lpg_energy * b18_s_lpg_cost_fuel_per_MWh / Million
    b18_s_petrol_cost_fuel = (
        b18_s_petrol_energy * b18_s_petrol_cost_fuel_per_MWh / Million
    )
    b18_s_jetfuel_cost_fuel = (
        b18_s_jetfuel_energy * b18_s_jetfuel_cost_fuel_per_MWh / Million
    )
    b18_s_diesel_cost_fuel = (
        b18_s_diesel_energy * b18_s_diesel_cost_fuel_per_MWh / Million
    )
    b18_s_fueloil_cost_fuel = (
        b18_s_fueloil_energy * b18_s_fueloil_cost_fuel_per_MWh / Million
    )
    b18_s_biomass_cost_fuel = (
        b18_s_biomass_energy * b18_s_biomass_cost_fuel_per_MWh / Million
    )
    b18_s_coal_cost_fuel = b18_s_coal_energy * b18_s_coal_cost_fuel_per_MWh / Million
    b18_s_heatnet_cost_fuel = (
        b18_s_heatnet_energy * b18_s_heatnet_cost_fuel_per_MWh / Million
    )
    b18_s_heatpump_cost_fuel = (
        b18_s_heatpump_energy * b18_s_heatpump_cost_fuel_per_MWh / Million
    )
    b18_s_solarth_cost_fuel = 0

    b18_s_cost_fuel = (
        b18_s_gas_cost_fuel
        + b18_s_lpg_cost_fuel
        + b18_s_petrol_cost_fuel
        + b18_s_jetfuel_cost_fuel
        + b18_s_diesel_cost_fuel
        + b18_s_fueloil_cost_fuel
        + b18_s_biomass_cost_fuel
        + b18_s_coal_cost_fuel
        + b18_s_heatnet_cost_fuel
        + b18_s_heatpump_cost_fuel
        + b18_s_solarth_cost_fuel
    )

    # Energiebedingte THG-Emissionen
    b18_s_gas_CO2e_cb_per_MWh = fact("Fact_H_P_ngas_cb_EF")
    b18_s_lpg_CO2e_cb_per_MWh = fact("Fact_H_P_LPG_cb_EF")
    b18_s_petrol_CO2e_cb_per_MWh = fact("Fact_H_P_petrol_cb_EF")
    b18_s_jetfuel_CO2e_cb_per_MWh = fact("Fact_H_P_kerosene_cb_EF")
    b18_s_diesel_CO2e_cb_per_MWh = fact("Fact_H_P_fueloil_cb_EF")
    b18_s_fueloil_CO2e_cb_per_MWh = fact("Fact_H_P_fueloil_cb_EF")
    b18_s_biomass_CO2e_cb_per_MWh = fact("Fact_RB_S_biomass_CO2e_EF")
    b18_s_coal_CO2e_cb_per_MWh = fact("Fact_R_S_coal_CO2e_EF")

    b18_s_gas_CO2e_cb = b18_s_gas_energy * b18_s_gas_CO2e_cb_per_MWh
    b18_s_lpg_CO2e_cb = b18_s_lpg_energy * b18_s_lpg_CO2e_cb_per_MWh
    b18_s_petrol_CO2e_cb = b18_s_petrol_energy * b18_s_petrol_CO2e_cb_per_MWh
    b18_s_jetfuel_CO2e_cb = b18_s_jetfuel_energy * b18_s_jetfuel_CO2e_cb_per_MWh
    b18_s_diesel_CO2e_cb = b18_s_diesel_energy * b18_s_diesel_CO2e_cb_per_MWh
    b18_s_fueloil_CO2e_cb = b18_s_fueloil_energy * b18_s_fueloil_CO2e_cb_per_MWh
    b18_s_biomass_CO2e_cb = b18_s_biomass_energy * b18_s_biomass_CO2e_cb_per_MWh
    b18_s_coal_CO2e_cb = b18_s_coal_energy * b18_s_coal_CO2e_cb_per_MWh

    b18_s_CO2e_cb = (
        b18_s_gas_CO2e_cb
        + b18_s_lpg_CO2e_cb
        + b18_s_petrol_CO2e_cb
        + b18_s_jetfuel_CO2e_cb
        + b18_s_diesel_CO2e_cb
        + b18_s_fueloil_CO2e_cb
        + b18_s_biomass_CO2e_cb
        + b18_s_coal_CO2e_cb
    )
    b18_s_CO2e_total = b18_s_CO2e_cb

    b18_p_elec_elcon_demand_electricity = (
        b18_p_elec_elcon_energy
        * (entry("In_M_population_com_203X") / entry("In_M_population_com_2018"))
        * (1 + b18_p_elec_elcon_demand_change)
    )

    b18_CO2e_cb_ = b18_s_CO2e_cb
    b18_CO2e_total_ = b18_s_CO2e_total
    b18_s_gas_CO2e_total = b18_s_gas_CO2e_cb
    b18_s_lpg_CO2e_total = b18_s_lpg_CO2e_cb
    b18_s_petrol_CO2e_total = b18_s_petrol_CO2e_cb
    b18_s_jetfuel_CO2e_total = b18_s_jetfuel_CO2e_cb
    b18_s_diesel_CO2e_total = b18_s_diesel_CO2e_cb
    b18_s_fueloil_CO2e_total = b18_s_fueloil_CO2e_cb
    b18_s_biomass_CO2e_total = b18_s_biomass_CO2e_cb
    b18_s_coal_CO2e_total = b18_s_coal_CO2e_cb
    b18_s_biomass_number_of_buildings = (
        b18_s_biomass_energy
        * b18_p_nonresi_number_of_buildings
        / (b18_p_nonresi_factor_adapted_to_fec * b18_p_nonresi_area_m2)
    )
    b18_rp_p_CO2e_cb = (
        r18.s.CO2e_cb
        - r18.s_petrol.CO2e_cb
        + b18_s_CO2e_cb
        - b18_s_petrol_CO2e_cb
        - b18_s_jetfuel_CO2e_cb
        - b18_s_diesel_CO2e_cb
    )
    b18_rp_p_CO2e_total = r18.s.CO2e_cb + b18_s_CO2e_cb
    b18_rb_energy = r18.p.energy + b18_p_energy
    b18_b_CO2e_cb = b18_s_CO2e_cb
    b18_rb_CO2e_cb = r18.r.CO2e_cb + b18_b_CO2e_cb
    b18_rb_CO2e_total = b18_rb_CO2e_cb
    b18_b_CO2e_total = b18_s_CO2e_total

    b18_b_CO2e_pb = 0
    b18_s_heatnet_CO2e_cb = 0
    b18_s_heatnet_CO2e_cb_per_MWh = 0
    b18_s_heatnet_CO2e_total = 0
    b18_s_heatpump_CO2e_cb = 0
    b18_s_heatpump_CO2e_cb_per_MWh = 0
    b18_s_heatpump_CO2e_total = 0
    b18_s_solarth_CO2e_cb = 0
    b18_s_solarth_CO2e_cb_per_MWh = 0
    b18_s_solarth_CO2e_total = 0
    b18_s_elec_CO2e_cb = 0
    b18_s_elec_CO2e_cb_per_MWh = 0
    b18_s_elec_CO2e_total = 0
    b18_s_elec_heating_CO2e_cb = 0
    b18_s_elec_heating_CO2e_cb_per_MWh = 0
    b18_s_elec_heating_CO2e_total = 0

    return B18(
        b_CO2e_cb=b18_b_CO2e_cb,
        b_CO2e_pb=b18_b_CO2e_pb,
        b_CO2e_total=b18_b_CO2e_total,
        p_energy=b18_p_energy,
        p_nonresi_energy=b18_p_nonresi_energy,
        p_nonresi_area_m2=b18_p_nonresi_area_m2,
        p_nonresi_factor_adapted_to_fec=b18_p_nonresi_factor_adapted_to_fec,
        p_nonresi_number_of_buildings=b18_p_nonresi_number_of_buildings,
        p_nonresi_com_energy=b18_p_nonresi_com_energy,
        p_nonresi_com_pct_x=b18_p_nonresi_com_pct_x,
        p_nonresi_com_area_m2=b18_p_nonresi_com_area_m2,
        p_nonresi_com_factor_adapted_to_fec=b18_p_nonresi_com_factor_adapted_to_fec,
        p_elec_elcon_energy=b18_p_elec_elcon_energy,
        p_elec_heatpump_energy=b18_p_elec_heatpump_energy,
        p_vehicles_energy=b18_p_vehicles_energy,
        p_other_energy=b18_p_other_energy,
        s_energy=b18_s_energy,
        s_pct_energy=b18_s_pct_energy,
        s_cost_fuel=b18_s_cost_fuel,
        s_CO2e_cb=b18_s_CO2e_cb,
        s_CO2e_total=b18_s_CO2e_total,
        s_gas_energy=b18_s_gas_energy,
        s_gas_pct_energy=b18_s_gas_pct_energy,
        s_gas_cost_fuel=b18_s_gas_cost_fuel,
        s_gas_cost_fuel_per_MWh=b18_s_gas_cost_fuel_per_MWh,
        s_gas_CO2e_cb=b18_s_gas_CO2e_cb,
        s_gas_CO2e_cb_per_MWh=b18_s_gas_CO2e_cb_per_MWh,
        s_gas_CO2e_total=b18_s_gas_CO2e_total,
        s_lpg_energy=b18_s_lpg_energy,
        s_lpg_pct_energy=b18_s_lpg_pct_energy,
        s_lpg_cost_fuel=b18_s_lpg_cost_fuel,
        s_lpg_cost_fuel_per_MWh=b18_s_lpg_cost_fuel_per_MWh,
        s_lpg_CO2e_cb=b18_s_lpg_CO2e_cb,
        s_lpg_CO2e_cb_per_MWh=b18_s_lpg_CO2e_cb_per_MWh,
        s_lpg_CO2e_total=b18_s_lpg_CO2e_total,
        s_petrol_energy=b18_s_petrol_energy,
        s_petrol_pct_energy=b18_s_petrol_pct_energy,
        s_petrol_cost_fuel=b18_s_petrol_cost_fuel,
        s_petrol_cost_fuel_per_MWh=b18_s_petrol_cost_fuel_per_MWh,
        s_petrol_CO2e_cb=b18_s_petrol_CO2e_cb,
        s_petrol_CO2e_cb_per_MWh=b18_s_petrol_CO2e_cb_per_MWh,
        s_petrol_CO2e_total=b18_s_petrol_CO2e_total,
        s_jetfuel_energy=b18_s_jetfuel_energy,
        s_jetfuel_pct_energy=b18_s_jetfuel_pct_energy,
        s_jetfuel_cost_fuel=b18_s_jetfuel_cost_fuel,
        s_jetfuel_cost_fuel_per_MWh=b18_s_jetfuel_cost_fuel_per_MWh,
        s_jetfuel_CO2e_cb=b18_s_jetfuel_CO2e_cb,
        s_jetfuel_CO2e_cb_per_MWh=b18_s_jetfuel_CO2e_cb_per_MWh,
        s_jetfuel_CO2e_total=b18_s_jetfuel_CO2e_total,
        s_diesel_energy=b18_s_diesel_energy,
        s_diesel_pct_energy=b18_s_diesel_pct_energy,
        s_diesel_cost_fuel=b18_s_diesel_cost_fuel,
        s_diesel_cost_fuel_per_MWh=b18_s_diesel_cost_fuel_per_MWh,
        s_diesel_CO2e_cb=b18_s_diesel_CO2e_cb,
        s_diesel_CO2e_cb_per_MWh=b18_s_diesel_CO2e_cb_per_MWh,
        s_diesel_CO2e_total=b18_s_diesel_CO2e_total,
        s_fueloil_energy=b18_s_fueloil_energy,
        s_fueloil_pct_energy=b18_s_fueloil_pct_energy,
        s_fueloil_cost_fuel=b18_s_fueloil_cost_fuel,
        s_fueloil_cost_fuel_per_MWh=b18_s_fueloil_cost_fuel_per_MWh,
        s_fueloil_CO2e_cb=b18_s_fueloil_CO2e_cb,
        s_fueloil_CO2e_cb_per_MWh=b18_s_fueloil_CO2e_cb_per_MWh,
        s_fueloil_CO2e_total=b18_s_fueloil_CO2e_total,
        s_biomass_energy=b18_s_biomass_energy,
        s_biomass_pct_energy=b18_s_biomass_pct_energy,
        s_biomass_cost_fuel=b18_s_biomass_cost_fuel,
        s_biomass_cost_fuel_per_MWh=b18_s_biomass_cost_fuel_per_MWh,
        s_biomass_CO2e_cb=b18_s_biomass_CO2e_cb,
        s_biomass_CO2e_cb_per_MWh=b18_s_biomass_CO2e_cb_per_MWh,
        s_biomass_CO2e_total=b18_s_biomass_CO2e_total,
        s_biomass_number_of_buildings=b18_s_biomass_number_of_buildings,
        s_coal_energy=b18_s_coal_energy,
        s_coal_pct_energy=b18_s_coal_pct_energy,
        s_coal_cost_fuel=b18_s_coal_cost_fuel,
        s_coal_cost_fuel_per_MWh=b18_s_coal_cost_fuel_per_MWh,
        s_coal_CO2e_cb=b18_s_coal_CO2e_cb,
        s_coal_CO2e_cb_per_MWh=b18_s_coal_CO2e_cb_per_MWh,
        s_coal_CO2e_total=b18_s_coal_CO2e_total,
        s_heatnet_energy=b18_s_heatnet_energy,
        s_heatnet_pct_energy=b18_s_heatnet_pct_energy,
        s_heatnet_cost_fuel=b18_s_heatnet_cost_fuel,
        s_heatnet_cost_fuel_per_MWh=b18_s_heatnet_cost_fuel_per_MWh,
        s_heatnet_CO2e_cb=b18_s_heatnet_CO2e_cb,
        s_heatnet_CO2e_cb_per_MWh=b18_s_heatnet_CO2e_cb_per_MWh,
        s_heatnet_CO2e_total=b18_s_heatnet_CO2e_total,
        s_elec_heating_energy=b18_s_elec_heating_energy,
        s_elec_heating_pct_energy=b18_s_elec_heating_pct_energy,
        s_elec_heating_CO2e_cb=b18_s_elec_heating_CO2e_cb,
        s_elec_heating_CO2e_cb_per_MWh=b18_s_elec_heating_CO2e_cb_per_MWh,
        s_elec_heating_CO2e_total=b18_s_elec_heating_CO2e_total,
        s_heatpump_energy=b18_s_heatpump_energy,
        s_heatpump_pct_energy=b18_s_heatpump_pct_energy,
        s_heatpump_cost_fuel=b18_s_heatpump_cost_fuel,
        s_heatpump_cost_fuel_per_MWh=b18_s_heatpump_cost_fuel_per_MWh,
        s_heatpump_CO2e_cb=b18_s_heatpump_CO2e_cb,
        s_heatpump_CO2e_cb_per_MWh=b18_s_heatpump_CO2e_cb_per_MWh,
        s_heatpump_CO2e_total=b18_s_heatpump_CO2e_total,
        s_solarth_energy=b18_s_solarth_energy,
        s_solarth_pct_energy=b18_s_solarth_pct_energy,
        s_solarth_cost_fuel=b18_s_solarth_cost_fuel,
        s_solarth_cost_fuel_per_MWh=b18_s_solarth_cost_fuel_per_MWh,
        s_solarth_CO2e_cb=b18_s_solarth_CO2e_cb,
        s_solarth_CO2e_cb_per_MWh=b18_s_solarth_CO2e_cb_per_MWh,
        s_solarth_CO2e_total=b18_s_solarth_CO2e_total,
        s_elec_energy=b18_s_elec_energy,
        s_elec_pct_energy=b18_s_elec_pct_energy,
        s_elec_CO2e_cb=b18_s_elec_CO2e_cb,
        s_elec_CO2e_cb_per_MWh=b18_s_elec_CO2e_cb_per_MWh,
        s_elec_CO2e_total=b18_s_elec_CO2e_total,
        rb_energy=b18_rb_energy,
        rb_CO2e_cb=b18_rb_CO2e_cb,
        rb_CO2e_total=b18_rb_CO2e_total,
        rp_p_CO2e_cb=b18_rp_p_CO2e_cb,
        rp_p_CO2e_total=b18_rp_p_CO2e_total,
    )
