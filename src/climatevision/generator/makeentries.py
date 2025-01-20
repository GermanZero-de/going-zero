# pyright: strict

from .entries import Entries
from .refdata import RefData, Row
from .utils import div
from .years import YEAR_BASELINE_CHOICES, YEAR_TARGET_CHOICES


def make_entries(
    data: RefData, ags: str, year_baseline: int, year_target: int
) -> Entries:
    assert year_baseline in YEAR_BASELINE_CHOICES
    assert year_target in YEAR_TARGET_CHOICES
    assert ags in data.ags_master()

    # ags identifies the community (Kommune)
    ags_dis = ags[:5]  # This identifies the administrative district (Landkreis)
    ags_sta = ags[:2]  # This identifies the federal state (Bundesland)

    ags_dis_padded = ags_dis + "000"
    ags_sta_padded = ags_sta + "000000"
    ags_germany = "DG000000"

    ags = ags

    m_AGS_com = ags
    m_AGS_dis = ags_dis
    m_AGS_sta = ags_sta

    m_year_baseline = year_baseline
    m_year_target = year_target
    m_year_ref = data.year_ref()

    duration_baseline_until_target = m_year_target - m_year_baseline
    duration_target_until_2050 = 2050 - m_year_target
    m_duration_neutral = float(
        duration_target_until_2050 + duration_baseline_until_target / 2
    )

    m_population_com_2018 = data.population(ags).int("total")
    m_population_com_203X = m_population_com_2018
    m_population_dis = data.population(ags_dis_padded).int("total")
    m_population_sta = data.population(ags_sta_padded).int("total")
    m_population_nat = data.population(ags_germany).int("total")

    data_area_com = data.area(ags)
    data_area_dis = data.area(ags_dis_padded)
    data_area_sta = data.area(ags_sta_padded)
    data_area_nat = data.area(ags_germany)
    m_area_total_com = data_area_com.int("land_total")
    m_area_total_dis = data_area_dis.int("land_total")
    m_area_total_sta = data_area_sta.int("land_total")
    m_area_total_nat = data_area_nat.int("land_total")

    m_area_wood_com = data_area_com.int("veg_forrest")
    m_area_agri_com = data_area_com.int("veg_agri")
    m_area_agri_sta = data_area_sta.int("veg_agri")
    m_area_agri_nat = data_area_nat.int("veg_agri")

    m_area_veg_grove_com = data_area_com.float("veg_wood")  # TODO double check this
    m_area_transport_com = data_area_com.float("land_traffic")
    m_area_settlement_com = data_area_com.float("land_settlement")
    m_area_veg_heath_com = data_area_com.float("veg_heath")
    m_area_veg_moor_com = data_area_com.float("veg_moor")
    m_area_veg_marsh_com = data_area_com.float("veg_marsh")
    m_area_veg_plant_uncover_com = data_area_com.float("veg_plant_uncover_com")
    m_area_veg_wood_com = data_area_com.float("veg_wood")

    m_area_water_com = data_area_com.float("water_total")
    m_area_industry_com = data_area_com.float("settlement_ghd")
    m_area_industry_nat = data_area_nat.float("settlement_ghd")

    data_flats_com = data.flats(ags)
    r_buildings_le_2_apts = data_flats_com.float(
        "buildings_2flats"
    ) + data_flats_com.float("buildings_1flat")
    r_buildings_ge_3_apts = data_flats_com.float(
        "buildings_3flats"
    ) + data_flats_com.float("buildings_dorms")

    data_buildings_com = data.buildings(ags)
    r_buildings_until_1919 = data_buildings_com.float("buildings_until_1919")
    r_buildings_1919_1948 = data_buildings_com.float("buildings_1919_1948")
    r_buildings_1949_1978 = data_buildings_com.float("buildings_1949_1978")
    r_buildings_1979_1986 = data_buildings_com.float("buildings_1979_1986")
    r_buildings_1987_1990 = data_buildings_com.float("buildings_1987_1990")
    r_buildings_1991_1995 = data_buildings_com.float("buildings_1991_1995")
    r_buildings_1996_2000 = data_buildings_com.float("buildings_1996_2000")
    r_buildings_2001_2004 = data_buildings_com.float("buildings_2001_2004")
    r_buildings_2005_2008 = data_buildings_com.float("buildings_2005_2008")
    r_buildings_2009_2011 = data_buildings_com.float("buildings_2009_2011")
    r_buildings_2011_today = (
        data.fact("Fact_R_P_newbuilt_2011_year_ref")
        * m_population_com_2018
        / m_population_nat
    )
    r_buildings_com = (
        r_buildings_until_1919
        + r_buildings_1919_1948
        + r_buildings_1949_1978
        + r_buildings_1979_1986
        + r_buildings_1987_1990
        + r_buildings_1991_1995
        + r_buildings_1996_2000
        + r_buildings_2001_2004
        + r_buildings_2005_2008
        + r_buildings_2009_2011
        + r_buildings_2011_today
    )
    r_buildings_nat = data.buildings(ags_germany).float("buildings_total") + data.fact(
        "Fact_R_P_newbuilt_2011_year_ref"
    )

    r_flats_com = data_buildings_com.float("flats_total")
    r_flats_w_heatnet = data_buildings_com.float("flats_heatnet")
    r_flats_wo_heatnet = r_flats_com - r_flats_w_heatnet
    r_area_m2 = data_flats_com.float("residential_buildings_area_total") * 1000.0
    r_area_m2_1flat = data_flats_com.float("buildings_1flat") * data.fact(
        "Fact_R_buildings_livingspace_oneflat"
    )
    r_area_m2_2flat = data_flats_com.float("buildings_2flats") * data.fact(
        "Fact_R_buildings_livingspace_twoflat"
    )
    r_area_m2_3flat = data_flats_com.float("buildings_3flats") * data.fact(
        "Fact_R_buildings_livingspace_moreflat"
    )
    r_area_m2_dorm = data_flats_com.float("buildings_dorms") * data.fact(
        "Fact_R_buildings_livingspace_dorm"
    )
    r_pct_of_area_m2_com = data.nat_res_buildings(ags_sta_padded).float("communal")
    r_rehab_rate_pa = data.ass("Ass_R_B_P_renovation_rate")
    r_heatnet_ratio_year_target = div(r_flats_w_heatnet, r_flats_com)

    if ags == ags_germany or ags == ags_sta_padded or ags == ags_dis_padded:
        t_rt7 = "nd"
        t_rt3 = "nd"
    else:
        t_rt7 = data.area_kinds(ags).str("rt7")
        t_rt3 = data.area_kinds(ags).str("rt3")

    data_renewable_energy_com = data.renewable_energy(ags)
    data_nat_energy_sta = data.nat_energy(ags_sta_padded)
    e_PV_power_inst_roof = (
        data_renewable_energy_com.float("pv")
        / 1000.0
        * data_nat_energy_sta.float("PV_roof_2017")
    )
    e_PV_power_inst_facade = (
        data_renewable_energy_com.float("pv")
        / 1000.0
        * data_nat_energy_sta.float("PV_others")
        / 2.0
    )
    e_PV_power_inst_park = (
        data_renewable_energy_com.float("pv")
        / 1000.0
        * data_nat_energy_sta.float("PV_land_2017")
    )
    e_PV_power_inst_agripv = (
        data_renewable_energy_com.float("pv")
        / 1000.0
        * data_nat_energy_sta.float("PV_others")
        / 2.0
    )
    e_PV_power_inst_wind_on = data_renewable_energy_com.float("wind_on") / 1000.0
    e_PV_power_inst_biomass = data_renewable_energy_com.float("biomass") / 1000.0
    e_PV_power_inst_water = data_renewable_energy_com.float("water") / 1000.0

    e_PV_power_to_be_inst_roof = data.ass(
        "Ass_E_P_local_pv_roof_power_to_be_installed_2035"
    )
    h_solartherm_to_be_inst = data.ass("Ass_R_B_P_roof_area_fraction_solar_thermal")
    e_PV_power_to_be_inst_facade = data.ass(
        "Ass_E_P_local_pv_roof_facade_to_be_installed_2035"
    )
    e_PV_power_to_be_inst_park = data.ass(
        "Ass_E_P_local_pv_park_power_to_be_installed_2035"
    )
    e_PV_power_to_be_inst_agri = data.ass(
        "Ass_E_P_local_pv_agri_power_to_be_installed_2035"
    )
    e_PV_power_to_be_inst_local_wind_onshore = data.ass(
        "Ass_E_P_local_wind_onshore_power_to_be_installed_2035"
    )
    e_PV_power_to_be_inst_local_biomass = data.ass(
        "Ass_E_P_local_biomass_power_to_be_installed_2035"
    )

    e_pv_full_load_hours_sta = data_nat_energy_sta.float("PV_average_flh")
    e_local_wind_onshore_ratio_power_to_area_sta = data_nat_energy_sta.float(
        "demand_2018"
    )
    potential_electricity_from_bioenergy_sta = (
        data_nat_energy_sta.float("bioenergy_potential")
        * 1000.0
        / 3.6
        * data.ass("Ass_E_P_BHKW_efficiency_electric")
    )
    bioenergy_installable_capacity_sta = div(
        potential_electricity_from_bioenergy_sta,
        data.fact("Fact_E_P_biomass_full_load_hours"),
    )
    e_biomass_local_power_installable_sta = bioenergy_installable_capacity_sta * (
        div(m_area_agri_com, m_area_agri_sta)
    )

    r_coal_fec = data.fact("Fact_R_S_coal_fec_2018") * div(
        r_flats_wo_heatnet, data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    r_petrol_fec = data.fact("Fact_R_S_petrol_fec_2018") * div(
        r_flats_wo_heatnet, data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    r_fueloil_fec = data.fact("Fact_R_S_fueloil_fec_2018") * div(
        r_flats_wo_heatnet, data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    r_lpg_fec = data.fact("Fact_R_S_lpg_fec_2018") * div(
        r_flats_wo_heatnet, data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    r_gas_fec = data.fact("Fact_R_S_gas_fec_2018") * div(
        r_flats_wo_heatnet, data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    r_biomass_fec = data.fact("Fact_R_S_biomass_fec_2018") * div(
        r_flats_wo_heatnet, data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    r_orenew_fec = data.fact("Fact_R_S_orenew_fec_2018") * div(
        r_flats_wo_heatnet, data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    r_elec_fec = data.fact("Fact_R_S_elec_fec_2018") * div(
        m_population_com_2018, m_population_nat
    )
    r_heatnet_fec = data.fact("Fact_R_S_heatnet_fec_2018") * div(
        r_flats_w_heatnet, data.fact("Fact_R_P_flats_w_heatnet_2011")
    )
    r_energy_total = (
        r_coal_fec
        + r_petrol_fec
        + r_fueloil_fec
        + r_lpg_fec
        + r_gas_fec
        + r_biomass_fec
        + r_orenew_fec
        + r_elec_fec
        + r_heatnet_fec
    )

    b_coal_fec = (
        data.fact("Fact_B_S_coal_fec_2018")
        * r_flats_wo_heatnet
        / data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    b_petrol_fec = (
        data.fact("Fact_B_S_petrol_fec_2018") * m_population_com_2018 / m_population_nat
    )
    b_jetfuel_fec = (
        data.fact("Fact_B_S_jetfuel_fec_2018")
        * m_population_com_2018
        / m_population_nat
    )
    b_diesel_fec = (
        data.fact("Fact_B_S_diesel_fec_2018") * m_population_com_2018 / m_population_nat
    )
    b_fueloil_fec = (
        data.fact("Fact_B_S_fueloil_fec_2018")
        * r_flats_wo_heatnet
        / data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    b_lpg_fec = (
        data.fact("Fact_B_S_lpg_fec_2018")
        * r_flats_wo_heatnet
        / data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    b_gas_fec = (
        data.fact("Fact_B_S_gas_fec_2018")
        * r_flats_wo_heatnet
        / data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    b_biomass_fec = (
        data.fact("Fact_B_S_biomass_fec_2018")
        * r_flats_wo_heatnet
        / data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    b_orenew_fec = (
        data.fact("Fact_B_S_orenew_fec_2018")
        * r_flats_wo_heatnet
        / data.fact("Fact_R_P_flats_wo_heatnet_2011")
    )
    b_elec_fec = (
        data.fact("Fact_B_S_elec_fec_2018") * m_population_com_2018 / m_population_nat
    )
    b_heatnet_fec = (
        data.fact("Fact_B_S_heatnet_fec_2018")
        * r_flats_w_heatnet
        / data.fact("Fact_R_P_flats_w_heatnet_2011")
    )

    data_industry = data.industry_dehst(ags)
    i_dehst_miner_cement = data_industry.float_or_zero("miner_cement")
    i_dehst_miner_chalk = data_industry.float_or_zero("miner_chalk")
    i_dehst_miner_glas = data_industry.float_or_zero("miner_glas")
    i_dehst_miner_ceram = data_industry.float_or_zero("miner_ceram")
    i_dehst_chem_basic = data_industry.float_or_zero("chem_basic")
    i_dehst_chem_ammonia = data_industry.float_or_zero("chem_ammonia")
    i_dehst_chem_other = data_industry.float_or_zero("chem_other")
    i_dehst_metal_steel_primary = data_industry.float_or_zero("metal_steel_primary")
    i_dehst_metal_steel_secondary = data_industry.float_or_zero("metal_steel_secondary")
    i_dehst_metal_nonfe = data_industry.float_or_zero("metal_nonfe")
    i_dehst_other_paper = data_industry.float_or_zero("other_paper")
    i_dehst_other_food = data_industry.float_or_zero("other_food")
    i_dehst_other_further = data_industry.float_or_zero("other_further")

    data_traffic_com = data.traffic(ags)
    t_ec_rail_ppl_elec = data_traffic_com.float("rail_ppl_elec")
    t_ec_rail_ppl_diesel = data_traffic_com.float("rail_ppl_diesel")
    t_ec_rail_gds_elec = data_traffic_com.float("gds_elec")
    t_ec_rail_gds_diesel = data_traffic_com.float("gds_diesel")

    t_mil_car_it_ot = data_traffic_com.float("car_it_ot")
    t_mil_car_ab = data_traffic_com.float("car_ab")
    t_mil_ldt_it_ot = data_traffic_com.float("ldt_it_ot")
    t_mil_ldt_ab = data_traffic_com.float("ldt_ab")
    t_mil_mhd_it_ot = data_traffic_com.float("mhd_it_ot")
    t_mil_mhd_ab = data_traffic_com.float("mhd_ab")

    data_destatis_com = data.destatis(ags_dis_padded)
    t_metro_mega_km_dis = data_destatis_com.float("metro_mega_km")
    t_bus_mega_km_dis = data_destatis_com.float("bus_mega_km")

    # traffic air
    traffic_air_df = data.get_df_traffic_air()
    # lookup total german kerosene overseas
    traffic_air_row_germany = Row(traffic_air_df, "DG000000")
    t_a_eev_kerosene_overseas_total = traffic_air_row_germany.float(
        "eev_kerosene_overseas_mwh"
    )

    # lookup municipality specific data for traffic_air
    # lookup data for ags to be evaluated
    traffic_air_ags = traffic_air_df.column_ags()
    if ags in traffic_air_ags:
        data_destatis_traffic_air = data.traffic_air(ags)
        t_a_conveyance_capa_inland_pkm_com = data_destatis_traffic_air.float(
            "conveyance_capacity_inland_pkm"
        )
        t_a_transport_capa_inland_tkm_com = data_destatis_traffic_air.float(
            "transport_capacity_inland_tkm"
        )
        t_a_flight_kilometer_inland_km_com = data_destatis_traffic_air.float(
            "flight_kilometer_inland_km"
        )

        t_a_eev_kerosene_inland_com = data_destatis_traffic_air.float(
            "eev_kerosene_inland_mwh"
        )
        t_a_eev_petrol_inland_com = data_destatis_traffic_air.float(
            "eev_petrol_inland_mwh"
        )
        t_a_ghg_inland_com = data_destatis_traffic_air.float("ghg_inland_tco2e")
        t_a_conveyance_capa_overseas_pkm_com = data_destatis_traffic_air.float(
            "conveyance_capacity_overseas_pkm"
        )
        t_a_transport_capa_overseas_tkm_com = data_destatis_traffic_air.float(
            "transport_capacity_overseas_tkm"
        )
        t_a_flight_kilometer_overseas_km_com = data_destatis_traffic_air.float(
            "flight_kilometer_overseas_km"
        )
        t_a_eev_kerosene_overseas_com = data_destatis_traffic_air.float(
            "eev_kerosene_overseas_mwh"
        )
        t_a_ghg_overseas_com = data_destatis_traffic_air.float("ghg_overseas_tco2e")
        t_a_sum_ghg_com = data_destatis_traffic_air.float("sum_ghg_tco2e")
    else:
        t_a_conveyance_capa_inland_pkm_com = 0
        t_a_transport_capa_inland_tkm_com = 0
        t_a_flight_kilometer_inland_km_com = 0
        t_a_eev_kerosene_inland_com = 0
        t_a_eev_petrol_inland_com = 0
        t_a_ghg_inland_com = 0
        t_a_conveyance_capa_overseas_pkm_com = 0
        t_a_transport_capa_overseas_tkm_com = 0
        t_a_flight_kilometer_overseas_km_com = 0
        t_a_eev_kerosene_overseas_com = 0
        t_a_ghg_overseas_com = 0
        t_a_sum_ghg_com = 0

    # traffic ships
    traffic_ships_df = data.get_df_traffic_ships()
    # lookup total german inland eev diesel and overseas eev fuel
    traffic_ships_row_germany = Row(traffic_ships_df, "DG000000")
    t_s_eev_diesel_inland_mwh_total = traffic_ships_row_germany.float(
        "inland_eev_diesel_mwh"
    )
    t_s_eev_fuel_overseas_mwh_total = traffic_ships_row_germany.float(
        "overseas_eev_fuel_mwh"
    )

    # lookup municipality specific data for traffic_ships
    # lookup data for ags to be evaluated
    traffic_ships_ags = traffic_ships_df.column_ags()
    if ags in traffic_ships_ags:
        data_destatis_traffic_ships = data.traffic_ships(ags)
        t_s_eev_diesel_inland_mwh_com = data_destatis_traffic_ships.float(
            "inland_eev_diesel_mwh"
        )
        t_s_eev_fuel_overseas_mwh_com = data_destatis_traffic_ships.float(
            "overseas_eev_fuel_mwh"
        )
        t_s_ghg_inland_com = data_destatis_traffic_ships.float("inland_ghg_tco2e")
        t_s_ghg_overseas_com = data_destatis_traffic_ships.float("overseas_ghg_tco2e")
        t_s_ghg_sum_com = data_destatis_traffic_ships.float("sum_ghg_tco2e")
    else:
        t_s_eev_diesel_inland_mwh_com = 0
        t_s_eev_fuel_overseas_mwh_com = 0
        t_s_ghg_inland_com = 0
        t_s_ghg_overseas_com = 0
        t_s_ghg_sum_com = 0

    a_petrol_fec = (
        data.fact("Fact_A_S_petrol_fec_2018") * m_area_agri_com / m_area_agri_nat
    )
    a_diesel_fec = (
        data.fact("Fact_A_S_diesel_fec_2018") * m_area_agri_com / m_area_agri_nat
    )
    a_fueloil_fec = (
        data.fact("Fact_A_S_fueloil_fec_2018") * m_area_agri_com / m_area_agri_nat
    )
    a_lpg_fec = data.fact("Fact_A_S_lpg_fec_2018") * m_area_agri_com / m_area_agri_nat
    a_gas_fec = data.fact("Fact_A_S_gas_fec_2018") * m_area_agri_com / m_area_agri_nat
    a_biomass_fec = (
        data.fact("Fact_A_S_biomass_fec_2018") * m_area_agri_com / m_area_agri_nat
    )
    a_elec_fec = data.fact("Fact_A_S_elec_fec_2018") * m_area_agri_com / m_area_agri_nat

    data_nat_agri_sta = data.nat_agri(ags_sta_padded)
    a_other_liming_calcit_prod_volume = data_nat_agri_sta.float(
        "amount_sale_calcit"
    ) * div(m_area_agri_com, m_area_agri_sta)
    a_other_liming_dolomite_prod_volume = data_nat_agri_sta.float(
        "amount_sale_dolomite"
    ) * div(m_area_agri_com, m_area_agri_sta)
    a_other_kas_prod_volume = data_nat_agri_sta.float("amount_sale_kas") * div(
        m_area_agri_com, m_area_agri_sta
    )
    a_other_urea_prod_volume = data_nat_agri_sta.float("amount_sale_urea") * div(
        m_area_agri_com, m_area_agri_sta
    )
    a_other_ecrop_prod_volume = data_nat_agri_sta.float("drymass_ecrop") * div(
        m_area_agri_com, m_area_agri_sta
    )

    cows_density_sta = data_nat_agri_sta.float("cows") / m_area_agri_sta
    a_fermen_dairycow_amount = cows_density_sta * m_area_agri_com

    cattle_density_sta = data_nat_agri_sta.float("cattle") / m_area_agri_sta
    a_fermen_nondairy_amount = cattle_density_sta * m_area_agri_com

    pig_density_sta = data_nat_agri_sta.float("pigs") / m_area_agri_sta
    a_fermen_pig_amount = pig_density_sta * m_area_agri_com

    poultry_density_sta = data_nat_agri_sta.float("poultry") / m_area_agri_sta
    a_fermen_poultry_amount = poultry_density_sta * m_area_agri_com

    other_animals_density_sta = (
        data_nat_agri_sta.float("other_animals") / m_area_agri_sta
    )
    a_fermen_oanimal_amount = other_animals_density_sta * m_area_agri_com

    def compute_animal_efactor(what: str):
        ch4e = data_nat_agri_sta.float(what + "_ch4e")
        n2oe = data_nat_agri_sta.float(what + "_n2oe")
        co2e = (ch4e * 25.0 + n2oe * 298.0) * 1000.0
        count = data_nat_agri_sta.float(what)
        return co2e / count

    a_manure_dairycow_ratio_CO2e_to_amount = compute_animal_efactor("cows")
    a_manure_nondairy_ratio_CO2e_to_amount = compute_animal_efactor("cattle")
    a_manure_swine_ratio_CO2e_to_amount = compute_animal_efactor("pigs")
    a_manure_poultry_ratio_CO2e_to_amount = compute_animal_efactor("poultry")
    a_manure_oanimal_ratio_CO2e_to_amount = compute_animal_efactor("other_animals")
    animal_wo_poultry_deposition_sta = (
        data_nat_agri_sta.float("cows")
        + data_nat_agri_sta.float("cattle")
        + data_nat_agri_sta.float("pigs")
        + data_nat_agri_sta.float("other_animals")
    )
    a_manure_deposition_ratio_CO2e_to_amount = (
        data_nat_agri_sta.float("animal_wo_poultry_deposition_co2e")
        / animal_wo_poultry_deposition_sta
    )

    def compute_efactor_from_n2o(
        what: str, area: float, data_nat_agri: Row = data_nat_agri_sta  # type: ignore
    ):
        n2o = data_nat_agri.float(what + "_n2o")
        co2e = n2o * 298.0
        return co2e / area

    farmland_area_total_sta = m_area_agri_sta * data.fact(
        "Fact_L_G_area_veg_agri_pct_of_crop"
    )
    a_soil_fertilizer_ratio_CO2e_to_ha = compute_efactor_from_n2o(
        "fertilizer_mineral", farmland_area_total_sta
    )
    a_soil_manure_ratio_CO2e_to_ha = compute_efactor_from_n2o(
        "fertilizer_economy", farmland_area_total_sta
    )
    a_soil_sludge_ratio_CO2e_to_ha = compute_efactor_from_n2o(
        "sewage_sludge", farmland_area_total_sta
    )
    a_soil_ecrop_ratio_CO2e_to_ha = compute_efactor_from_n2o(
        "fermentation_ecrop", farmland_area_total_sta
    )
    greenland_area_total_sta = (
        m_area_agri_sta * data.fact("Fact_L_G_area_veg_agri_pct_of_grass")
        + data_area_sta.float("veg_heath")
        + data_area_sta.float("veg_marsh")
        + data_area_sta.float("veg_plant_uncover_com")
        * data.fact("Fact_L_G_area_plant_uncover_pct_grass")
    )
    a_soil_crazing_ratio_CO2e_to_ha = compute_efactor_from_n2o(
        "pasturage", greenland_area_total_sta
    )
    a_soil_residue_ratio_CO2e_to_ha = compute_efactor_from_n2o(
        "crop_residues", farmland_area_total_sta
    )
    farmland_area_organic_sta = farmland_area_total_sta * (
        data.fact("Fact_L_G_fraction_org_soil_fen_crop")
        + data.fact("Fact_L_G_fraction_org_soil_bog_crop")
    )
    farmland_area_organic_germany = (
        m_area_agri_nat
        * data.fact("Fact_L_G_area_veg_agri_pct_of_crop")
        * (
            data.fact("Fact_L_G_fraction_org_soil_fen_crop")
            + data.fact("Fact_L_G_fraction_org_soil_bog_crop")
        )
    )
    greenland_area_organic_sta = greenland_area_total_sta * (
        data.fact("Fact_L_G_fraction_org_soil_fen_grass_strict")
        + data.fact("Fact_L_G_fraction_org_soil_bog_grass_strict")
    )
    a_soil_orgfarm_ratio_CO2e_to_ha = compute_efactor_from_n2o(
        "farmed_soil", farmland_area_organic_sta + greenland_area_organic_sta
    )
    data_nat_agri_germany = data.nat_agri(ags_germany)
    if m_year_ref == 2018:
        # unlike the other factors we don't have the n2o levels below the national level available
        # in 2018 :-(
        a_soil_orgloss_ratio_CO2e_to_ha = compute_efactor_from_n2o(
            "farmed_soil_loss_organic",
            area=farmland_area_organic_germany,
            data_nat_agri=data_nat_agri_germany,
        )
    else:
        # But in 2021 we do
        a_soil_orgloss_ratio_CO2e_to_ha = compute_efactor_from_n2o(
            "farmed_soil_loss_organic", area=farmland_area_organic_sta
        )
    a_soil_leaching_ratio_CO2e_to_ha = compute_efactor_from_n2o(
        "diffuse_nitrate_emissions",
        area=farmland_area_total_sta + greenland_area_total_sta,
    )
    a_soil_deposition_ratio_CO2e_to_ha = compute_efactor_from_n2o(
        "diffuse_emissions", area=farmland_area_total_sta + greenland_area_total_sta
    )

    farming_density_sta = data_nat_agri_sta.float("farms") / m_area_agri_sta
    # We would like 2018 data here but we only have 2016, so we assume the ratio stayed constant
    data_nat_organic_agri_sta = data.nat_organic_agri(ags_sta_padded)

    a_farm_amount = farming_density_sta * m_area_agri_com
    a_area_agri_com_pct_of_organic = (
        data_nat_organic_agri_sta.float("organic_farms_area") / m_area_agri_sta
    )

    m_GHG_budget_2016_to_year_target = data.co2path(m_year_target).float(
        "GHG_budget_2016_to_year"
    )
    m_nonCO2_budget_2016_to_year_target = data.co2path(m_year_target).float(
        "nonCO2_budget_2016_to_year"
    )

    w_elec_fec = (
        data.fact("Fact_W_S_elec_fec_2018") * m_population_com_2018 / m_population_nat
    )

    return Entries(
        a_area_agri_com_pct_of_organic=a_area_agri_com_pct_of_organic,
        a_biomass_fec=a_biomass_fec,
        a_diesel_fec=a_diesel_fec,
        a_elec_fec=a_elec_fec,
        a_farm_amount=a_farm_amount,
        a_fermen_dairycow_amount=a_fermen_dairycow_amount,
        a_fermen_nondairy_amount=a_fermen_nondairy_amount,
        a_fermen_oanimal_amount=a_fermen_oanimal_amount,
        a_fermen_pig_amount=a_fermen_pig_amount,
        a_fermen_poultry_amount=a_fermen_poultry_amount,
        a_fueloil_fec=a_fueloil_fec,
        a_gas_fec=a_gas_fec,
        a_lpg_fec=a_lpg_fec,
        a_manure_dairycow_ratio_CO2e_to_amount=a_manure_dairycow_ratio_CO2e_to_amount,
        a_manure_deposition_ratio_CO2e_to_amount=a_manure_deposition_ratio_CO2e_to_amount,
        a_manure_nondairy_ratio_CO2e_to_amount=a_manure_nondairy_ratio_CO2e_to_amount,
        a_manure_oanimal_ratio_CO2e_to_amount=a_manure_oanimal_ratio_CO2e_to_amount,
        a_manure_poultry_ratio_CO2e_to_amount=a_manure_poultry_ratio_CO2e_to_amount,
        a_manure_swine_ratio_CO2e_to_amount=a_manure_swine_ratio_CO2e_to_amount,
        a_other_ecrop_prod_volume=a_other_ecrop_prod_volume,
        a_other_kas_prod_volume=a_other_kas_prod_volume,
        a_other_liming_calcit_prod_volume=a_other_liming_calcit_prod_volume,
        a_other_liming_dolomite_prod_volume=a_other_liming_dolomite_prod_volume,
        a_other_urea_prod_volume=a_other_urea_prod_volume,
        a_petrol_fec=a_petrol_fec,
        a_soil_crazing_ratio_CO2e_to_ha=a_soil_crazing_ratio_CO2e_to_ha,
        a_soil_deposition_ratio_CO2e_to_ha=a_soil_deposition_ratio_CO2e_to_ha,
        a_soil_ecrop_ratio_CO2e_to_ha=a_soil_ecrop_ratio_CO2e_to_ha,
        a_soil_fertilizer_ratio_CO2e_to_ha=a_soil_fertilizer_ratio_CO2e_to_ha,
        a_soil_leaching_ratio_CO2e_to_ha=a_soil_leaching_ratio_CO2e_to_ha,
        a_soil_manure_ratio_CO2e_to_ha=a_soil_manure_ratio_CO2e_to_ha,
        a_soil_orgfarm_ratio_CO2e_to_ha=a_soil_orgfarm_ratio_CO2e_to_ha,
        a_soil_orgloss_ratio_CO2e_to_ha=a_soil_orgloss_ratio_CO2e_to_ha,
        a_soil_residue_ratio_CO2e_to_ha=a_soil_residue_ratio_CO2e_to_ha,
        a_soil_sludge_ratio_CO2e_to_ha=a_soil_sludge_ratio_CO2e_to_ha,
        b_biomass_fec=b_biomass_fec,
        b_coal_fec=b_coal_fec,
        b_diesel_fec=b_diesel_fec,
        b_elec_fec=b_elec_fec,
        b_fueloil_fec=b_fueloil_fec,
        b_gas_fec=b_gas_fec,
        b_heatnet_fec=b_heatnet_fec,
        b_jetfuel_fec=b_jetfuel_fec,
        b_lpg_fec=b_lpg_fec,
        b_orenew_fec=b_orenew_fec,
        b_petrol_fec=b_petrol_fec,
        e_local_wind_onshore_ratio_power_to_area_sta=e_local_wind_onshore_ratio_power_to_area_sta,
        e_biomass_local_power_installable_sta=e_biomass_local_power_installable_sta,
        e_PV_power_inst_agripv=e_PV_power_inst_agripv,
        e_PV_power_inst_biomass=e_PV_power_inst_biomass,
        e_PV_power_inst_facade=e_PV_power_inst_facade,
        e_PV_power_inst_park=e_PV_power_inst_park,
        e_PV_power_inst_roof=e_PV_power_inst_roof,
        e_PV_power_inst_water=e_PV_power_inst_water,
        e_PV_power_inst_wind_on=e_PV_power_inst_wind_on,
        e_PV_power_to_be_inst_agri=e_PV_power_to_be_inst_agri,
        e_PV_power_to_be_inst_facade=e_PV_power_to_be_inst_facade,
        e_PV_power_to_be_inst_local_biomass=e_PV_power_to_be_inst_local_biomass,
        e_PV_power_to_be_inst_local_wind_onshore=e_PV_power_to_be_inst_local_wind_onshore,
        e_PV_power_to_be_inst_park=e_PV_power_to_be_inst_park,
        e_PV_power_to_be_inst_roof=e_PV_power_to_be_inst_roof,
        e_pv_full_load_hours_sta=e_pv_full_load_hours_sta,
        h_solartherm_to_be_inst=h_solartherm_to_be_inst,
        i_dehst_miner_cement=i_dehst_miner_cement,
        i_dehst_miner_chalk=i_dehst_miner_chalk,
        i_dehst_miner_glas=i_dehst_miner_glas,
        i_dehst_miner_ceram=i_dehst_miner_ceram,
        i_dehst_chem_basic=i_dehst_chem_basic,
        i_dehst_chem_ammonia=i_dehst_chem_ammonia,
        i_dehst_chem_other=i_dehst_chem_other,
        i_dehst_metal_steel_primary=i_dehst_metal_steel_primary,
        i_dehst_metal_steel_secondary=i_dehst_metal_steel_secondary,
        i_dehst_metal_nonfe=i_dehst_metal_nonfe,
        i_dehst_other_paper=i_dehst_other_paper,
        i_dehst_other_food=i_dehst_other_food,
        i_dehst_other_further=i_dehst_other_further,
        m_AGS_com=m_AGS_com,
        m_AGS_dis=m_AGS_dis,
        m_AGS_sta=m_AGS_sta,
        m_GHG_budget_2016_to_year_target=m_GHG_budget_2016_to_year_target,
        m_area_agri_com=m_area_agri_com,
        m_area_agri_nat=m_area_agri_nat,
        m_area_agri_sta=m_area_agri_sta,
        m_area_industry_com=m_area_industry_com,
        m_area_industry_nat=m_area_industry_nat,
        m_area_settlement_com=m_area_settlement_com,
        m_area_total_com=m_area_total_com,
        m_area_total_dis=m_area_total_dis,
        m_area_total_nat=m_area_total_nat,
        m_area_total_sta=m_area_total_sta,
        m_area_transport_com=m_area_transport_com,
        m_area_veg_grove_com=m_area_veg_grove_com,
        m_area_veg_heath_com=m_area_veg_heath_com,
        m_area_veg_marsh_com=m_area_veg_marsh_com,
        m_area_veg_moor_com=m_area_veg_moor_com,
        m_area_veg_plant_uncover_com=m_area_veg_plant_uncover_com,
        m_area_veg_wood_com=m_area_veg_wood_com,
        m_area_water_com=m_area_water_com,
        m_area_wood_com=m_area_wood_com,
        m_duration_neutral=m_duration_neutral,
        m_duration_target=duration_baseline_until_target,
        m_nonCO2_budget_2016_to_year_target=m_nonCO2_budget_2016_to_year_target,
        m_population_com_2018=m_population_com_2018,
        m_population_com_203X=m_population_com_203X,
        m_population_dis=m_population_dis,
        m_population_nat=m_population_nat,
        m_population_sta=m_population_sta,
        m_year_target=m_year_target,
        m_year_baseline=m_year_baseline,
        m_year_ref=m_year_ref,
        r_area_m2=r_area_m2,
        r_area_m2_1flat=r_area_m2_1flat,
        r_area_m2_2flat=r_area_m2_2flat,
        r_area_m2_3flat=r_area_m2_3flat,
        r_area_m2_dorm=r_area_m2_dorm,
        r_biomass_fec=r_biomass_fec,
        r_buildings_1919_1948=r_buildings_1919_1948,
        r_buildings_1949_1978=r_buildings_1949_1978,
        r_buildings_1979_1986=r_buildings_1979_1986,
        r_buildings_1987_1990=r_buildings_1987_1990,
        r_buildings_1991_1995=r_buildings_1991_1995,
        r_buildings_1996_2000=r_buildings_1996_2000,
        r_buildings_2001_2004=r_buildings_2001_2004,
        r_buildings_2005_2008=r_buildings_2005_2008,
        r_buildings_2009_2011=r_buildings_2009_2011,
        r_buildings_2011_today=r_buildings_2011_today,
        r_buildings_com=r_buildings_com,
        r_buildings_ge_3_apts=r_buildings_ge_3_apts,
        r_buildings_le_2_apts=r_buildings_le_2_apts,
        r_buildings_nat=r_buildings_nat,
        r_buildings_until_1919=r_buildings_until_1919,
        r_coal_fec=r_coal_fec,
        r_elec_fec=r_elec_fec,
        r_energy_total=r_energy_total,
        r_flats_com=r_flats_com,
        r_flats_w_heatnet=r_flats_w_heatnet,
        r_flats_wo_heatnet=r_flats_wo_heatnet,
        r_fueloil_fec=r_fueloil_fec,
        r_gas_fec=r_gas_fec,
        r_heatnet_fec=r_heatnet_fec,
        r_heatnet_ratio_year_target=r_heatnet_ratio_year_target,
        r_lpg_fec=r_lpg_fec,
        r_orenew_fec=r_orenew_fec,
        r_pct_of_area_m2_com=r_pct_of_area_m2_com,
        r_petrol_fec=r_petrol_fec,
        r_rehab_rate_pa=r_rehab_rate_pa,
        t_bus_mega_km_dis=t_bus_mega_km_dis,
        t_ec_rail_gds_diesel=t_ec_rail_gds_diesel,
        t_ec_rail_gds_elec=t_ec_rail_gds_elec,
        t_ec_rail_ppl_diesel=t_ec_rail_ppl_diesel,
        t_ec_rail_ppl_elec=t_ec_rail_ppl_elec,
        t_metro_mega_km_dis=t_metro_mega_km_dis,
        t_mil_car_ab=t_mil_car_ab,
        t_mil_car_it_ot=t_mil_car_it_ot,
        t_mil_ldt_ab=t_mil_ldt_ab,
        t_mil_ldt_it_ot=t_mil_ldt_it_ot,
        t_mil_mhd_ab=t_mil_mhd_ab,
        t_mil_mhd_it_ot=t_mil_mhd_it_ot,
        t_rt3=t_rt3,
        t_rt7=t_rt7,
        t_a_eev_kerosene_overseas_total=t_a_eev_kerosene_overseas_total,
        t_a_conveyance_capa_inland_pkm_com=t_a_conveyance_capa_inland_pkm_com,
        t_a_transport_capa_inland_tkm_com=t_a_transport_capa_inland_tkm_com,
        t_a_flight_kilometer_inland_km_com=t_a_flight_kilometer_inland_km_com,
        t_a_eev_kerosene_inland_com=t_a_eev_kerosene_inland_com,
        t_a_eev_petrol_inland_com=t_a_eev_petrol_inland_com,
        t_a_ghg_inland_com=t_a_ghg_inland_com,
        t_a_conveyance_capa_overseas_pkm_com=t_a_conveyance_capa_overseas_pkm_com,
        t_a_transport_capa_overseas_tkm_com=t_a_transport_capa_overseas_tkm_com,
        t_a_flight_kilometer_overseas_km_com=t_a_flight_kilometer_overseas_km_com,
        t_a_eev_kerosene_overseas_com=t_a_eev_kerosene_overseas_com,
        t_a_ghg_overseas_com=t_a_ghg_overseas_com,
        t_a_sum_ghg_com=t_a_sum_ghg_com,
        t_s_eev_diesel_inland_mwh_total=t_s_eev_diesel_inland_mwh_total,
        t_s_eev_fuel_overseas_mwh_total=t_s_eev_fuel_overseas_mwh_total,
        t_s_eev_diesel_inland_mwh_com=t_s_eev_diesel_inland_mwh_com,
        t_s_eev_fuel_overseas_mwh_com=t_s_eev_fuel_overseas_mwh_com,
        t_s_ghg_inland_com=t_s_ghg_inland_com,
        t_s_ghg_overseas_com=t_s_ghg_overseas_com,
        t_s_ghg_sum_com=t_s_ghg_sum_com,
        ags=ags,
        w_elec_fec=w_elec_fec,
    )
