"""
This module was auto generated from an annotated version of the 2018 assumptions file, which
contained explicit formulas for every derived assumption. This way we could simplify updating
the assumptions, without changing a lot of the actual code.
"""

from . import refdata


def calculate_derived_assumptions(rd: refdata.RefData):
    import sys

    a = rd.assumptions()
    f = rd.facts()

    a.add_derived_assumption(
        "Ass_E_P_constr_elec_ratio_wage_to_emplo_2017",
        f.fact("Fact_B_P_install_elec_wage_2018")
        / f.fact("Fact_B_P_install_elec_emplo_2018"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "Personalkosten Elektriker",
            "unit": "",
            "rationale": "Statistisches Bundesamt: Kostenstruktur der Unternehmen im Baugewerbe 2017",
            "reference": "Abschnitt 8",
            "link": "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Bauen/Publikationen/Downloads-Baugewerbe-Struktur/kostenstruktur-baugewerbe-2040530177004.pdf?__blob=publicationFile ",
        },
    )
    a.add_derived_assumption(
        "Ass_R_D_fec_elec_elcon_2018",
        f.fact("Fact_R_S_elec_fec_2018")
        - f.fact("Fact_R_S_elec_heating_fec_2018")
        - f.fact("Fact_R_S_orenew_fec_2018")
        * f.fact("Fact_R_S_ratio_heatpump_to_orenew_2018")
        / f.fact("Fact_R_S_heatpump_mean_annual_performance_factor_all"),
        {
            "NOTE": "",
            "group": "ui",
            "description": "Endenergiebedarfs elektrische Verbraucher ohne WÃ¤rmepumpe in HH 2018",
            "unit": "MWh/a",
            "rationale": "Vom Stromverbrauch 2018 wird der Strom fÃ¼r die Stromheizung sowie die WÃ¤rmepumpen abgezogen.\nBerechnung =Fact_R_S_elec_fec_2018-Fact_R_S_elec_heating_fec_2018-Fact_R_S_orenew_fec_2018*Fact_R_S_ratio_heatpump_to_orenew_2018/Fact_R_S_heatpump_mean_annual_performance_factor_all",
            "reference": "Berechnung",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_B_D_fec_vehicles_2018",
        f.fact("Fact_B_S_petrol_fec_2018")
        + f.fact("Fact_B_S_jetfuel_fec_2018")
        + f.fact("Fact_B_S_diesel_fec_2018")
        + f.fact("Fact_A_S_petrol_fec_2018")
        + f.fact("Fact_A_S_diesel_fec_2018"),
        {
            "NOTE": "",
            "group": "ui",
            "description": "Endenergiebedarfs aller Fahrzeuge in GHD inkl. Landwirtschaft 2018",
            "unit": "MWh/a",
            "rationale": "Berechnung =Fact_B_S_petrol_fec_2018+Fact_B_S_jetfuel_fec_2018+Fact_B_S_diesel_fec_2018+Fact_A_S_petrol_fec_2018+Fact_A_S_diesel_fec_2018",
            "reference": "AG Energiebilanzen 2018",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_B_D_fec_elec_elcon_2050",
        a.ass("Ass_B_D_fec_elec_2050")
        - f.fact("Fact_B_S_elec_heating_fec_2018")
        - a.ass("Ass_B_D_fec_elec_heatpump_2050"),
        {
            "NOTE": "",
            "group": "ui",
            "description": "Stromverbrauch elektrische Verbraucher GHD inkl. Landwirtschaft 2050",
            "unit": "MWh/a",
            "rationale": "abgelesen in Tabelle 31: Endenergiebedarfe differenziert nach EnergietrÃ¤ger und Sektoren in GreenSupreme im Vergleich zu GreenEe2.\nDavon ziehen wir wieder den Strom der Stromheizungen ab (die vermutlich in GreenSupreme konstant gehalten werden) sowie die HÃ¤lfte der 47,8 TWh, die 2050 fÃ¼r WÃ¤rmepumpen verbraucht werden (S.84). Dass es die HÃ¤lfte ist, nehmen wir basierend auf unseren eigenen Kalkulationen an, wo im Deutschland-Szenario meist etwa die HÃ¤lfte des WÃ¤rmepumpen-Strombedarfs aus GHD stammt.\nBerechnung =126000000-Fact_B_S_elec_heating_fec_2018-47800000/2",
            "reference": "UBA 2020 Greensupreme S. 82, 84",
            "link": "https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2020_12_28_cc_05-2020_endbericht_greensupreme.pdf",
        },
    )
    a.add_derived_assumption(
        "Ass_B_D_fec_elec_elcon_2018",
        f.fact("Fact_BAW_S_elec_fec_2018")
        - f.fact("Fact_B_S_elec_heating_fec_2018")
        - f.fact("Fact_B_S_orenew_fec_2018")
        * f.fact("Fact_R_S_ratio_heatpump_to_orenew_2018")
        / f.fact("Fact_R_S_heatpump_mean_annual_performance_factor_all"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "Endenergiebedarfs elektrische Verbraucher ohne WÃ¤rmepumpe und Direktheizung in GHD 2018",
            "unit": "MWh/a",
            "rationale": "Vom Stromverbrauch BAW (GHD, LW, Abfall) 2018 wird der GHD Strom fÃ¼r die Stromheizung sowie die WÃ¤rmepumpen abgezogen. Der komplette Strom in LW und Abfallwirtschaft bleibt drin, weil diese de facto nur elektrische Verbraucher haben, keine strombetriebenen Heizungen.  Berechnung = Fact_BAW_S_elec_fec_2018 - Fact_B_S_elec_heating_fec_2018 - Fact_B_S_orenew_fec_2018*Fact_R_S_ratio_heatpump_to_orenew_2018/Fact_R_S_heatpump_mean_annual_performance_factor_all",
            "reference": "Berechnung",
            "link": "",
        },
    )

    a.add_derived_assumption(
        "Ass_B_D_fec_elec_elcon_change",
        a.ass("Ass_B_D_fec_elec_elcon_2050") / a.ass("Ass_B_D_fec_elec_elcon_2018") - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Stromverbrauch elektrische Verbraucher GHD inkl. Landwirtschaft VerÃ¤nderung",
            "unit": "%",
            "rationale": "Auch wenn hier noch der Strom fÃ¼r Direktheizung inkludiert ist, wird angenommen, dass die generelle Entwicklung des Strombedarfs auch so fÃ¼r die elektrischen Verbraucher gilt.\nBerechnung =Ass_B_D_fec_elec_elcon_2050/(Fact_B_S_elec_fec_2018+Fact_A_S_elec_fec_2018)-1",
            "reference": "UBA 2020 Greensupreme S. 82",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_I_G_advice_invest_pa_per_capita",
        a.ass("Ass_I_G_advice_invest_pa") / f.fact("Fact_M_population_germany_refyear"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "JÃ¤hrliche Beratungskosten KEI Dekarbonisierung der Industrie pro Kopf",
            "unit": "â‚¬",
            "rationale": 'Es wurde kein Wert wie "anteilige Beratungskosten an Investitionen" gefunden. Daher wird die Beratung und Subventionen der Industrie durch das KEI als Kosten der Ã¶ffentlichen Hand auf alle Einwohner:innen Deutschlands verteilt. Der Kommune kommt damit nur ein fairer Anteil zu.',
            "reference": "KEI 2021 Leistungen des Kompetenzzentrums Klimaschutz in  \nenergieintensiven Industrien (KEI) S.2",
            "link": "https://www.klimaschutz-industrie.de/fileadmin/user_upload/KEI_download_pdf/Publikationen/21-06_KEI_Factsheet_DE.pdf",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_miner_cement_prodvol_change",
        a.ass("Ass_I_P_miner_cement_prodvol_2050")
        / f.fact("Fact_I_P_miner_cement_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "cement industry prodvol 2050 change",
            "unit": "%",
            "rationale": "Berechnung Ass_I_P_miner_cement_prodvol_2050/Fakt_I_N_mineral_Zement_Produktionsmenge_2017-1",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_miner_chalk_prodvol_change",
        a.ass("Ass_I_P_miner_chalk_prodvol_2050")
        / f.fact("Fact_I_P_miner_chalk_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "chalk industry prodvol 2050 change",
            "unit": "%",
            "rationale": "Berechnung =Ass_I_P_miner_chalk_prodvol_2050/Fact_I_P_miner_chalk_prodvol_2018-1",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_miner_ceramic_prodvol_change",
        a.ass("Ass_I_P_miner_ceramic_prodvol_2050")
        / f.fact("Fact_I_P_miner_ceram_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "ceramic industry prodvol 2050 change",
            "unit": "%",
            "rationale": "Berechnung =Ass_I_P_miner_ceramic_prodvol_2050/Fact_I_P_miner_ceram_prodvol_2018-1",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_miner_glass_prodvol_change",
        a.ass("Ass_I_P_miner_glass_prodvol_2050")
        / f.fact("Fact_I_P_miner_glas_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "glass industry prodvol 2050 change",
            "unit": "",
            "rationale": "Berechnung =Ass_I_P_miner_glass_prodvol_2050/Fact_I_P_miner_glas_prodvol_2018 -1",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_chem_basic_wo_ammonia_prodvol_change",
        a.ass("Ass_I_P_chem_basic_wo_ammonia_provol_2050")
        / f.fact("Fact_I_P_chem_basic_wo_ammonia_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "basic chem industry (wo ammonia) prodvol 2050 change",
            "unit": "",
            "rationale": "Berechnung =Ass_I_P_chem_basic_wo_ammonia_provol_2050/Fact_I_P_chem_basic_wo_ammonia_prodvol_2018 -1",
            "reference": "Berechnung",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_chem_ammonia_prodvol_change",
        a.ass("Ass_I_P_chem_ammonia_provol_2050")
        / f.fact("Fact_I_P_chem_ammonia_prodvol_2017")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "ammonia industry prodvol 2050 change",
            "unit": "",
            "rationale": "Berechnung =Ass_I_P_chem_ammonia_provol_2050/Fact_I_P_chem_ammonia_prodvol_2017 -1",
            "reference": "Berechnung",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_chem_other_prodvol_change",
        a.ass("Ass_I_P_chem_other_provol_2050")
        / f.fact("Fact_I_P_chem_other_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "other chem industry prodvol 2050 change",
            "unit": "",
            "rationale": "Berechnung =Ass_I_P_chem_other_provol_2050/Fact_I_P_chem_other_prodvol_2018 -1",
            "reference": "Berechnung",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_metal_steel_primary_prodvol_change_2050",
        a.ass("Ass_I_P_metal_steel_primary_prodvol_2050")
        / f.fact("Fact_I_P_metal_steel_primary_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "VerÃ¤nderung PrimÃ¤rstahlproduktion Zieljahr",
            "unit": "",
            "rationale": "Die prozentuale VerÃ¤nderung (hier Gesamtreduktion) der Produktionsmenge in der PrimÃ¤rstahlproduktion wird durch den realen Wert von 2018 und den Green-Supreme-Szenario-Wert von 2050 ermittelt.",
            "reference": "UBA 2019 RESCUE GreenSupreme S.51",
            "link": "https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2020_12_28_cc_05-2020_endbericht_greensupreme.pdf",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_metal_steel_secondary_prodvol_change_2050",
        a.ass("Ass_I_P_metal_steel_secondary_prodvol_2050")
        / f.fact("Fact_I_P_metal_steel_secondary_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "VerÃ¤nderung SekundÃ¤rstahlproduktion Zieljahr",
            "unit": "",
            "rationale": "Die prozentuale VerÃ¤nderung (hier Gesamtzuwachs) der Produktionsmenge in der SekundÃ¤rstahlproduktion wird durch den realen Wert von 2018 und den Green-Supreme-Szenario-Wert von 2050 ermittelt.",
            "reference": "UBA 2019 RESCUE GreenSupreme S.51",
            "link": "https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2020_12_28_cc_05-2020_endbericht_greensupreme.pdf",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_metal_nonfe_prodvol_change",
        a.ass("Ass_I_P_metal_nonfe_prodvol_2050")
        / f.fact("Fact_I_P_metal_nonfe_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Change in production volume of non-ferrous metal industry",
            "unit": "",
            "rationale": "Die prozentuale VerÃ¤nderung (hier Gesamtreduktion) der Produktionsmenge in der Nichteisen-Metallproduktion wird durch den realen Wert von 2018 und den Green-Supreme-Szenario-Wert von 2050 ermittelt.",
            "reference": "UBA 2019 RESCUE GreenSupreme S.52f, RESCUE S. 249",
            "link": "https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2020_12_28_cc_05-2020_endbericht_greensupreme.pdf",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_other_paper_prodvol_change",
        a.ass("Ass_I_P_other_paper_prodvol_2050")
        / f.fact("Fact_I_P_other_paper_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ui",
            "description": "cement industry production volume change 2050",
            "unit": "%",
            "rationale": "Division von Ass_I_P_other_cement_prodvol_2050/Fact_I_P_other_cement_prodvol_2018 und dann -1",
            "reference": "UBA RESCUE S. 273f",
            "link": "https://www.umweltbundesamt.de/sites/default/files/medien/1410/publikationen/rescue_studie_cc_36-2019_wege_in_eine_ressourcenschonende_treibhausgasneutralitaet_auflage2_juni-2021.pdf",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_other_food_prodvol_change",
        a.ass("Ass_I_P_other_food_prodvol_2050")
        / f.fact("Fact_I_P_other_food_prodvol_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "food industry production volume change total until 2050",
            "unit": "%",
            "rationale": "Division von Ass_I_P_other_food_prodvol_2050/Fact_I_P_other_food_prodvol_2018 und dann -1",
            "reference": "UBA RESCUE S. 276, ThÃ¼nen 2019 S.61",
            "link": "https://www.umweltbundesamt.de/sites/default/files/medien/1410/publikationen/rescue_studie_cc_36-2019_wege_in_eine_ressourcenschonende_treibhausgasneutralitaet_auflage2_juni-2021.pdf",
        },
    )
    a.add_derived_assumption(
        "Ass_I_P_other_further_fec_change",
        a.ass("Ass_I_P_other_further_fec_2050")
        / f.fact("Fact_I_S_other_further_fec_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "further branches industry fec change",
            "unit": "%",
            "rationale": "",
            "reference": "",
            "link": "https://www.umweltbundesamt.de/sites/default/files/medien/1410/publikationen/rescue_studie_cc_36-2019_wege_in_eine_ressourcenschonende_treibhausgasneutralitaet_auflage2_juni-2021.pdf",
        },
    )
    a.add_derived_assumption(
        "Ass_T_S_Rl_Train_gds_elec_SEC_2050",
        f.fact("Fact_T_S_Rl_Train_gds_elec_SEC_2018"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "spez. Endenergieverbrauch Gueterverkehr Schiene Strom bundesweit 2050",
            "unit": "MWh / tkm",
            "rationale": "Berechnet aus Fact_T_S_RL_Train_gds_EC_elec_2018 und Fact_T_D_Rl_train_nat_trnsprt_gds_elec_2018; Annahme: Wert 2018 entspricht 2050, da nicht von weiteren signifikanten Effizienzsteigerungen ausgegangen wird",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_T_S_Rl_Train_ppl_long_elec_SEC_2050",
        f.fact("Fact_T_S_Rl_Train_ppl_long_elec_SEC_2018"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "spez. Endenergieverbrauch Personenverkehr Schiene Strom bundesweit 2050",
            "unit": "MWh / Pkm",
            "rationale": "Berechnet aus Fact_T_S_RL_Train_ppl_EC_elec_2018, Fact_T_D_Rl_train_nat_trnsprt_ppl_short_elec_2018 und Fact_T_D_Rl_train_nat_trnsprt_ppl_long_elec_2018; Annahme: Wert 2018 entspricht 2050, da nicht von weiteren signifikanten Effizienzsteigerungen ausgegangen wird",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_T_S_petrol_EmFa_tank_wheel_2050",
        f.fact("Fact_T_S_petrol_EmFa_tank_wheel_2018"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "direkte spez. CO2-Emissionen Benzin",
            "unit": "t/MWh",
            "rationale": "Annahme, dass der direkte Emissionsfaktor von jeweiligen E-Fuels der gleiche ist wie fÃ¼r fossiler Brennstoff in 2018, siehe Fact_T_S_petrol_EmFa_tank_wheel_2018",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_T_S_diesel_EmFa_tank_wheel_2050",
        f.fact("Fact_T_S_diesel_EmFa_tank_wheel_2018"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "direkte spez. CO2-Emissionen Diesel",
            "unit": "t/MWh",
            "rationale": "Annahme, dass der direkte Emissionsfaktor von jeweiligen E-Fuels der gleiche ist wie fÃ¼r fossiler Brennstoff in 2018, siehe Fact_T_S_diesel_EmFa_tank_wheel_2018",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_T_S_jetfuel_EmFa_tank_wheel_2050",
        f.fact("Fact_T_S_jetfuel_EmFa_tank_wheel_2018"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "direkte spez. CO2-Emissionen Kerosin",
            "unit": "t/MWh",
            "rationale": "Annahme, dass der direkte Emissionsfaktor von jeweiligen E-Fuels der gleiche ist wie fÃ¼r fossiler Brennstoff in 2018, siehe Fact_T_S_jetfuel_EmFa_tank_wheel_2018",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_T_C_cost_per_trnsprt_gds_truck_infrstrctr",
        a.ass("Ass_T_C_invest_trolley_truck_infrstrctr")
        / f.fact("Fact_M_population_germany_refyear"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "Durchnittliche Kosten pro Einwohner -  Oberleitung-LKW-Infrastruktur",
            "unit": "â‚¬/Einwohner",
            "rationale": "berechnet: 26 Mrd Invest (BCG) ./.  Einwohner",
            "reference": "BCG / berechnet aus Generator",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_T_C_cost_per_trnsprt_rail_infrstrctr",
        a.ass("Ass_T_C_additional_invest_train_net_tech")
        / f.fact("Fact_M_population_germany_refyear"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "Durchnittliche Kosten pro Einwohner - Investitionen Schienennetzausbau",
            "unit": "â‚¬/Einwohner",
            "rationale": "berechnet: 274 Mrd Invest (MFIVE) ./.  Einwohner",
            "reference": "MFIVE / berechnet aus Generator",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_T_C_cost_per_trnsprt_rail_train_station",
        a.ass("Ass_T_C_additional_invest_train_station")
        / f.fact("Fact_M_population_germany_refyear"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "Durchnittliche Kosten pro Einwohner - Schienenverkehr Investitionen in BahnhÃ¶fe",
            "unit": "â‚¬/Einwohner",
            "rationale": "berechnet: 55 Mrd Invest (MFIVE) ./.  Einwohner",
            "reference": "MFIVE / berechnet aus Generator",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_A_P_fermen_dairycow_change",
        a.ass("Ass_A_P_fermen_dairycow_amount_2050")
        / f.fact("Fact_A_P_fermen_dairycow_amount_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Prozentuale VerÃ¤nderung Bestand MilchkÃ¼he Referenzjahr-Zieljahr",
            "unit": "%",
            "rationale": "Berechnung =Ass_A_P_fermen_dairycow_amount_2050/Fact_A_P_fermen_dairycow_amount_2018-1",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_A_P_fermen_nondairy_change",
        a.ass("Ass_A_P_fermen_nondairy_amount_2050")
        / f.fact("Fact_A_P_fermen_nondairy_amount_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Prozentuale VerÃ¤nderung Bestand Andere Rinder Referenzjahr-Zieljahr",
            "unit": "%",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_A_P_fermen_swine_change",
        a.ass("Ass_A_P_fermen_swine_amount_2050")
        / f.fact("Fact_A_P_fermen_swine_amount_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Prozentuale VerÃ¤nderung Bestand Schweine Referenzjahr-Zieljahr",
            "unit": "%",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_A_P_fermen_poultry_change",
        a.ass("Ass_A_P_fermen_poultry_amount_2050")
        / f.fact("Fact_A_P_fermen_poultry_amount_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Prozentuale VerÃ¤nderung Bestand GeflÃ¼gel Referenzjahr-Zieljahr",
            "unit": "%",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_A_P_fermen_oanimal_change",
        a.ass("Ass_A_P_fermen_oanimal_amount_2050")
        / f.fact("Fact_A_P_fermen_oanimal_amount_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Prozentuale VerÃ¤nderung Bestand Andere Tiere Referenzjahr-Zieljahr",
            "unit": "%",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_L_G_forest_nature_pct_change",
        a.ass("Ass_L_G_forest_nature_pct_2050")
        / f.fact("Fact_L_G_forest_pct_of_nature_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Ã„nderung Anteil Naturwald bis 2050",
            "unit": "",
            "rationale": "Berechnung =Ass_L_G_forest_nature_pct_2050/Fact_L_G_forest_pct_of_nature_2018 -1",
            "reference": "UBA 2019 RESCUE S. 305",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_L_G_forest_conv_pct_change",
        a.ass("Ass_L_G_forest_conv_pct_2050")
        / f.fact("Fact_L_G_forest_pct_of_conv_2018")
        - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Ã„nderung Anteil bewirtschafteter Wald bis 2050",
            "unit": "",
            "rationale": "Berechnung =Ass_L_G_forest_conv_pct_2050/Fact_L_G_forest_pct_of_conv_2018-1",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_L_G_forest_conv_CO2e_per_ha_2050",
        f.fact("Fact_L_G_forest_conv_CO2e_per_ha_2018")
        / (1 - f.fact("Fact_L_G_forest_conv_dead_pct_2018")),
        {
            "NOTE": "",
            "group": "ud",
            "description": "Emissionsfaktor nachhaltig bewirtschafteter Wald 2020",
            "unit": "",
            "rationale": "Berechnung =Fact_L_G_forest_conv_CO2e_per_ha_2018/(1-Fact_L_G_forest_conv_dead_pct_2018)",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_W_P_wastewater_prodvol_2050_per_capita",
        a.ass("Ass_W_P_wastewater_prodvol_2050")
        / f.fact("Fact_M_population_germany_refyear"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "5D Produktionsmenge KlÃ¤rschlamm aus Abwasserbehandlung in t pro Kopf 2050",
            "unit": "t pro Kopf",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_W_P_organic_treatment_CO2e_pb_2050_per_prodvol",
        a.ass("Ass_W_P_organic_treatment_CO2e_pb_2050")
        / a.ass("Ass_W_P_organic_treatment_prodvol_2050"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "5B+5E Emissionsfaktor fÃ¼r biologische Behandlung in t CO2e/a pro t Abfallmenge 2050",
            "unit": "t CO2e/t",
            "rationale": "Berechnung =Ass_W_P_organic_treatment_CO2e_pb_2050/Ass_W_P_organic_treatment_prodvol_2050",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_W_P_wastewater_CO2e_pb_2050_per_prodvol",
        a.ass("Ass_W_P_wastewater_CO2e_pb_2050_NIR")
        / a.ass("Ass_W_P_wastewater_prodvol_2050"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "5D Emissionsfaktor fÃ¼r Abwasserbehandlung in t CO2e/a pro t Abfallmenge 2050",
            "unit": "t CO2e/t",
            "rationale": "Berechnung =Ass_W_P_wastewater_CO2e_pb_2050_NIR/Ass_W_P_wastewater_prodvol_2050",
            "reference": "",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_R_D_fec_elec_elcon_2050",
        a.ass("Ass_R_D_fec_elec_2050")
        - f.fact("Fact_R_S_elec_heating_fec_2018")
        - a.ass("Ass_R_D_fec_elec_heatpump_2050"),
        {
            "NOTE": "",
            "group": "ui",
            "description": "Endenergiebedarfs aller Fahrzeuge in GHD inkl. Landwirtschaft 2050",
            "unit": "MWh/a",
            "rationale": "In Tabelle 31: Endenergiebedarfe differenziert nach EnergietrÃ¤ger und Sektoren in GreenSupreme im Vergleich zu GreenEe2 ist der gesamte Stromverbrauch von HH mit 123 TWh/a angegeben. Davon siehen wir wieder den Strom der Stromheizungen ab (die vermutlich in GreenSupreme konstant gehalten werden) sowie die HÃ¤lfte der 47,8 TWh, die 2050 fÃ¼r WÃ¤rmepumpen verbraucht werden (S.84). Dass es die HÃ¤lfte ist, nehmen wir basierend auf unseren eigenen Kalkulationen an, wo im Deutschland-Szenario meist etwas mehr als die HÃ¤lfte des WÃ¤rmepumpen-Strombedarfs aus den HH stammt.\nBerechnung =123000000-Fact_R_S_elec_heating_fec_2018-47800000/2",
            "reference": "UBA 2020 Greensupreme S. 82, 84",
            "link": "https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2020_12_28_cc_05-2020_endbericht_greensupreme.pdf",
        },
    )
    a.add_derived_assumption(
        "Ass_R_D_fec_elec_elcon_change",
        a.ass("Ass_R_D_fec_elec_elcon_2050") / a.ass("Ass_R_D_fec_elec_elcon_2018") - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Endenergiebedarfs aller Fahrzeuge in GHD inkl. Landwirtschaft VerÃ¤nderung",
            "unit": "MWh/a",
            "rationale": "Berechnung =Ass_R_D_fec_elec_elcon_2050/Ass_R_D_fec_elec_elcon_2018-1",
            "reference": "Berechnung",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_B_D_fec_vehicles_change",
        a.ass("Ass_B_D_fec_vehicles_2050") / a.ass("Ass_B_D_fec_vehicles_2018") - 1,
        {
            "NOTE": "",
            "group": "ud",
            "description": "Endenergiebedarfs aller Fahrzeuge in GHD inkl. Landwirtschaft VerÃ¤nderung",
            "unit": "MWh/a",
            "rationale": 'Das UBA schert in RESCUE alle Fahrzeuge in GHD inkl. Landwirtschaft Ã¼ber einen Kamm und trifft nur generische Annahmen, weswegen die Berechnung =Ass_B_D_fec_vehicles_2050/Ass_B_D_fec_vehicles_2018 -1 und vollstÃ¤ndige Substitution durch E-Diesel legitim ist.\n"Baumaschinen, landwirtschaftliche und militÃ¤rische Fahrzeuge werden dem Bereich Gewerbe, Handel und Dienstleistungen (GHD) zugeordnet. In der KSP-Systematik erfolgt eine Zuteilung in den Sektor Landwirtschaft und in den Sektor GebÃ¤ude, siehe Kapitel 6.1.1. Generell sind auch in diesem verkehrlichen Bereich gewisse MaÃŸnahmen der Verkehrswende (Vermeidung von Verkehr und Effizienz) umsetzbar und die fuÌˆr den Verkehrsbereich beschriebenen MaÃŸnahmen der Energiewende anwendbar. In allen Green-Szenarien wird keine ElektromobilitÃ¤t fuÌˆr diese Anwendungen unterstellt, sondern es wird von einer Substitution der fossilen Kraftstoffe durch PtL ausgegangen. Eine detaillierte Betrachtung dieser Maschinen und Fahrzeuge erfolgt nicht."',
            "reference": "UBA 2019 RESCUE S. 194",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_L_G_forest_conv_area_2050",
        f.fact("Fact_L_G_forest_conv_2018")
        * (1 + a.ass("Ass_L_G_forest_conv_pct_change")),
        {
            "NOTE": "",
            "group": "ui",
            "description": "WaldflÃ¤che herkÃ¶mmlich bewirtschaftet 2050",
            "unit": "ha",
            "rationale": "Berechnung =Fact_L_G_forest_conv_2018*(1+Ass_L_G_forest_conv_pct_change)",
            "reference": "Berechnung",
            "link": "",
        },
    )
    a.add_derived_assumption(
        "Ass_L_G_forest_CO2e_cb_per_ha_2050",
        f.fact("Fact_L_G_forest_CO2e_cb_2018") / a.ass("Ass_L_G_forest_conv_area_2050"),
        {
            "NOTE": "",
            "group": "ud",
            "description": "Positiver Emissionsfaktor feste Biomasse (ursprÃ¼nglich aus Wald) durch energetische Nutzung Deutschland 2018",
            "unit": "",
            "rationale": "Annahme: Die Entnahme und energetische Nutzung fester Biomasse aus herkÃ¶mmlichem Wald und damit deren cb Emissionen bleibt konstant. Da die herkÃ¶mmlich bewirtschaftete WaldflÃ¤che sinkt, muss der ausgleichende cb  Emissionsfaktor fÃ¼r die energetische Nutzung steigen. Berechnung =Fact_L_G_forest_CO2e_cb_2018/Ass_L_G_forest_conv_area_2050",
            "reference": "Berechnung",
            "link": "",
        },
    )
