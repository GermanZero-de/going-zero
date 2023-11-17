# pyright: strict

from dataclasses import dataclass


@dataclass(kw_only=True, frozen=True)
class Entries:
    a_area_agri_com_pct_of_organic: float
    a_biomass_fec: float
    a_diesel_fec: float
    a_elec_fec: float
    a_farm_amount: float
    a_fermen_dairycow_amount: float
    a_fermen_nondairy_amount: float
    a_fermen_oanimal_amount: float
    a_fermen_pig_amount: float
    a_fermen_poultry_amount: float
    a_fueloil_fec: float
    a_gas_fec: float
    a_lpg_fec: float
    a_manure_dairycow_ratio_CO2e_to_amount: float
    a_manure_deposition_ratio_CO2e_to_amount: float
    a_manure_nondairy_ratio_CO2e_to_amount: float
    a_manure_oanimal_ratio_CO2e_to_amount: float
    a_manure_poultry_ratio_CO2e_to_amount: float
    a_manure_swine_ratio_CO2e_to_amount: float
    a_other_ecrop_prod_volume: float
    a_other_kas_prod_volume: float
    a_other_liming_calcit_prod_volume: float
    a_other_liming_dolomite_prod_volume: float
    a_other_urea_prod_volume: float
    a_petrol_fec: float
    a_soil_crazing_ratio_CO2e_to_ha: float
    a_soil_deposition_ratio_CO2e_to_ha: float
    a_soil_ecrop_ratio_CO2e_to_ha: float
    a_soil_fertilizer_ratio_CO2e_to_ha: float
    a_soil_leaching_ratio_CO2e_to_ha: float
    a_soil_manure_ratio_CO2e_to_ha: float
    a_soil_orgfarm_ratio_CO2e_to_ha: float
    a_soil_orgloss_ratio_CO2e_to_ha: float
    a_soil_residue_ratio_CO2e_to_ha: float
    a_soil_sludge_ratio_CO2e_to_ha: float
    b_biomass_fec: float
    b_coal_fec: float
    b_diesel_fec: float
    b_elec_fec: float
    b_fueloil_fec: float
    b_gas_fec: float
    b_heatnet_fec: float
    b_jetfuel_fec: float
    b_lpg_fec: float
    b_orenew_fec: float
    b_petrol_fec: float
    e_local_wind_onshore_ratio_power_to_area_sta: float
    e_biomass_local_power_installable_sta: float
    e_PV_power_inst_agripv: float
    e_PV_power_inst_biomass: float
    e_PV_power_inst_facade: float
    e_PV_power_inst_park: float
    e_PV_power_inst_roof: float
    e_PV_power_inst_water: float
    e_PV_power_inst_wind_on: float
    e_PV_power_to_be_inst_agri: float
    e_PV_power_to_be_inst_facade: float
    e_PV_power_to_be_inst_local_biomass: float
    e_PV_power_to_be_inst_local_wind_onshore: float
    e_PV_power_to_be_inst_park: float
    e_PV_power_to_be_inst_roof: float
    e_pv_full_load_hours_sta: float
    h_solartherm_to_be_inst: float
    i_dehst_miner_cement: float
    i_dehst_miner_chalk: float
    i_dehst_miner_glas: float
    i_dehst_miner_ceram: float
    i_dehst_chem_basic: float
    i_dehst_chem_ammonia: float
    i_dehst_chem_other: float
    i_dehst_metal_steel_primary: float
    i_dehst_metal_steel_secondary: float
    i_dehst_metal_nonfe: float
    i_dehst_other_paper: float
    i_dehst_other_food: float
    i_dehst_other_further: float
    m_AGS_com: str
    m_AGS_dis: str
    m_AGS_sta: str
    m_GHG_budget_2016_to_year_target: float
    m_area_agri_com: int
    m_area_agri_nat: int
    m_area_agri_sta: int
    m_area_industry_com: float
    m_area_industry_nat: float
    m_area_settlement_com: float
    m_area_total_com: int
    m_area_total_dis: int
    m_area_total_nat: int
    m_area_total_sta: int
    m_area_transport_com: float
    m_area_veg_grove_com: float
    m_area_veg_heath_com: float
    m_area_veg_marsh_com: float
    m_area_veg_moor_com: float
    m_area_veg_plant_uncover_com: float
    m_area_veg_wood_com: float
    m_area_water_com: float
    m_area_wood_com: float
    m_duration_neutral: float  # duration of CO2 neutrality in years until 2050
    m_duration_target: int  # duration from today until target year
    m_nonCO2_budget_2016_to_year_target: float
    m_population_com_2018: int  # population of commune in 2018
    m_population_com_203X: int
    m_population_dis: int  # population of district in 2018
    m_population_nat: int  # population of germany in 2018
    m_population_sta: int  # population of state in 2018
    m_year_target: int
    m_year_today: int
    m_year_ref: int  # reference year for data (i.e RefData.year_ref() )
    r_area_m2: float
    r_area_m2_1flat: float
    r_area_m2_2flat: float
    r_area_m2_3flat: float
    r_area_m2_dorm: float
    r_biomass_fec: float
    r_buildings_1919_1948: float
    r_buildings_1949_1978: float
    r_buildings_1979_1986: float
    r_buildings_1987_1990: float
    r_buildings_1991_1995: float
    r_buildings_1996_2000: float
    r_buildings_2001_2004: float
    r_buildings_2005_2008: float
    r_buildings_2009_2011: float
    r_buildings_2011_today: float
    r_buildings_com: float
    r_buildings_ge_3_apts: float
    r_buildings_le_2_apts: float
    r_buildings_nat: float
    r_buildings_until_1919: float
    r_coal_fec: float
    r_elec_fec: float
    r_energy_total: float
    r_flats_com: float
    r_flats_w_heatnet: float  # mit Fernwärme
    r_flats_wo_heatnet: float  # ohne Fernwärme
    r_fueloil_fec: float
    r_gas_fec: float
    r_heatnet_fec: float
    r_heatnet_ratio_year_target: float
    r_lpg_fec: float
    r_orenew_fec: float
    r_pct_of_area_m2_com: float
    r_petrol_fec: float
    r_rehab_rate_pa: float
    r_new_buildings_gas: float
    r_new_buildings_lpg: float
    r_new_buildings_fueloil: float
    r_new_buildings_coal: float
    r_new_buildings_heatnet: float  # Fernwärme
    r_new_buildings_biomass: float
    r_new_buildings_elec_heating: float  # Nachtspeicherheizung
    r_new_buildings_elec_heatpump: float  # Wärmepumpe
    r_new_buildings_without_heating: float
    r_new_flats_gas: float
    r_new_flats_lpg: float
    r_new_flats_fueloil: float
    r_new_flats_coal: float
    r_new_flats_heatnet: float  # Fernwärme = r_flats_w_heatnet
    r_new_flats_biomass: float
    r_new_flats_elec_heating: float  # Nachtspeicherheizung
    r_new_flats_elec_heatpump: float  # Wärmepumpe
    r_new_flats_wo_heating: float  # ohne Heitung (without)
    r_new_buildings_2001_2004: float
    r_new_buildings_2005_2008: float
    r_new_buildings_2009_2011: float
    r_new_buildings_2011_today: float
    r_new_buildings_2001_today: float
    r_new_flats: float
    r_new_area_m2: float
    r_new_ratio_area_m2_to_flat: float
    t_bus_mega_km_dis: float
    t_ec_rail_gds_diesel: float
    t_ec_rail_gds_elec: float
    t_ec_rail_ppl_diesel: float
    t_ec_rail_ppl_elec: float
    t_metro_mega_km_dis: float
    t_mil_car_ab: float
    t_mil_car_it_ot: float
    t_mil_ldt_ab: float
    t_mil_ldt_it_ot: float
    t_mil_mhd_ab: float
    t_mil_mhd_it_ot: float
    t_rt3: str
    t_rt7: str
    w_elec_fec: float
    ags: str
