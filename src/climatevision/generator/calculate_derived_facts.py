"""
This module was auto generated from an annotated version of the 2018 facts file, which
contained explicit formulas for every derived fact. This way we could simplify updating
the facts, without changing a lot of the actual code.
"""

from . import refdata


def calculate_derived_facts(rd: refdata.RefData):
    import sys

    f = rd.facts()

    real_fact = refdata.Facts.fact

    def fact_wrapper(self, name: str) -> float:
        try:
            return real_fact(self, name)
        except refdata.RowNotFound:
            print("BAD FACT: " + name, file=sys.stderr)
            return 1.0

    refdata.Facts.fact = fact_wrapper

    f.add_derived_fact(
        "Fact_H_P_heatnet_prodvol_brutto_2018",
        f.fact("Fact_H_P_heatnet_cogen_prodvol_2018")
        + f.fact("Fact_H_P_heatnet_plant_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "BruttofernwÃ¤rmeerzeugung Deutschland 2018",
            "unit": "MWh/a",
            "rationale": "UmwandlungsausstroÃŸ insgesamt gibt die BruttofernwÃ¤rmeerzeugung aus Heizkraftwerken der allg. Versorgung (Teilmenge der WÃ¤rmekraftwerke, nÃ¤mlich die mit KWK) und Fernheizwerken an",
            "reference": "AG EB 2018 Zeile 32, Spalte AF",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_heatnet_ratio_netto_to_brutto_2018",
        f.fact("Fact_H_P_heatnet_fec_2018")
        / f.fact("Fact_H_P_heatnet_prodvol_brutto_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "VerhÃ¤ltnis NettofernwÃ¤rmeerzeugung zu BruttofernwÃ¤rmeerzeugung Deutschland 2018",
            "unit": "MWh/a",
            "rationale": "Division von Fact_H_P_heatnet_fec_2018/Fact_H_P_heatnet_prodvol_brutto_2018",
            "reference": "AG EB 2018 Zeile 32+45, Spalte AF",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_coal_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_H_P_coal_CO2e_cb_2018") / f.fact("Fact_H_P_coal_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor verbrennungsbedingte CO2e Herstellung fester Brennstoffe/Kohle (CRF 1.A.1.c) vs. EEV Kohle 2018",
            "unit": "",
            "rationale": "Fact_H_P_coal_CO2e_cb_2018/Fact_H_P_coal_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_coal_ratio_CO2e_pb_to_fec_2018",
        f.fact("Fact_H_P_coal_CO2e_pb_2018") / f.fact("Fact_H_P_coal_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor produktionsbedingte CO2e (Diffuse Emissionen) Kohlebergbau und -umwandlung 2018 (CRF 1.B.1) vs. EEV Kohle 2018",
            "unit": "",
            "rationale": "Fact_H_P_coal_CO2e_pb_2018/Fact_H_P_coal_fec_2018",
            "reference": "NIR S.182ff",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_gas_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_H_P_gas_CO2e_cb_2018") / f.fact("Fact_H_P_gas_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor verbrennungsbedingte CO2e Erdgas(netz) 2018 (CRF 1.A.3.e) vs. EEV Erdgas 2018",
            "unit": "",
            "rationale": "Fact_H_P_gas_CO2e_cb_2018/Fact_H_P_gas_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_gas_ratio_CO2e_pb_to_fec_2018",
        f.fact("Fact_H_P_gas_CO2e_pb_2018") / f.fact("Fact_H_P_gas_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor prozesssbedingte CO2e (Diffuse Emissionen) Gas 2018 (CRF 1.B.2.b) vs. EEV Erdgas 2018",
            "unit": "",
            "rationale": "Fact_H_P_gas_CO2e_pb_2018/Fact_H_P_gas_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_opetpro_CO2e_pb_2018",
        f.fact("Fact_H_P_opetpro_CO2e_1B2a_2018")
        + f.fact("Fact_H_P_opetpro_CO2e_1B2c_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Prozessbedingte CO2e sonstige MineralÃ¶lprodukte 2018",
            "unit": "",
            "rationale": "Summe aus CRF 1.B.2.a und CRF 1.B.2.c",
            "reference": "NIR S 265, 289",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_opetpro_ratio_CO2e_pb_to_fec_2018",
        f.fact("Fact_H_P_opetpro_CO2e_pb_2018") / f.fact("Fact_H_P_opetpro_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor prozesssbedingte CO2e (Roh)Ã–l Lagerung etc. 2018 (CRF 1.B.2.a) vs. EEV Sonstige MineralÃ¶lprodukte 2018",
            "unit": "",
            "rationale": "Fact_H_P_opetpro_CO2e_pb_2018/Fact_H_P_opetpro_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_orenew_ratio_CO2e_pb_to_fec_2018",
        f.fact("Fact_H_P_orenew_CO2e_pb_2018") / f.fact("Fact_H_P_orenew_fec_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Emissionsfaktor prozesssbedingte CO2e sonstige EE (Geothermie) 2018 (CRF 1.B.2.d) vs. EEV Sonstige EE 2018",
            "unit": "",
            "rationale": "Fact_H_P_orenew_CO2e_pb_2018/Fact_H_P_orenew_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_biomass_ratio_CO2e_pb_to_fec_2018",
        f.fact("Fact_H_P_biomass_CO2e_pb_2018") / f.fact("Fact_H_P_biomass_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor prozesssbedingte CO2e Biomasse und erneuerbare AbfÃ¤lle vs. EEV Biomasse 2018",
            "unit": "",
            "rationale": "Fact_H_P_biomass_CO2e_pb_2018/Fact_H_P_biomass_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_ofossil_ratio_CO2e_pb_to_fec_2018",
        f.fact("Fact_H_P_ofossil_CO2e_pb_2018") / f.fact("Fact_H_P_ofossil_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor prozesssbedingte CO2e Sonstige (fossile) EnergietrÃ¤ger (Nichterneuerbare AbfÃ¤lle, AbwÃ¤rme) vs. EEV Sonstige EE 2018",
            "unit": "",
            "rationale": "Fact_H_P_ofossil_CO2e_pb_2018/Fact_H_P_ofossil_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_fueloil_CO2e_cb_2018",
        f.fact("Fact_F_P_fueloil_prodvol_2018")
        * f.fact("Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Verbrennungsbedingte CO2e MineralÃ¶lwirtschaft 2018 HeizÃ¶l (leicht)",
            "unit": "",
            "rationale": "CO2e aus CRF 1.A.1.b anteilig nach Produktionsmenge laut MWV Jahresbericht 2019, Berechnung =Fact_F_P_fueloil_prodvol_2018*Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2018",
            "reference": "MVW Jahresbericht 2019 S. 66",
            "link": "https://www.mwv.de/wp-content/uploads/2021/01/MWV-Jahresbericht_2019_Webversion_MineraloelwirtschaftsverbandEV.pdf ",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_fueloil_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_H_P_fueloil_CO2e_cb_2018") / f.fact("Fact_H_P_fueloil_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor verbrennungsbedingte CO2e MineralÃ¶lwirtschaft 2018 HeizÃ¶l (leicht) (Teil CRF 1.A.1.b) vs. EEV HeizÃ¶l 2018",
            "unit": "",
            "rationale": "Fact_H_P_fueloil_CO2e_cb_2018/Fact_H_P_fueloil_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_lpg_CO2e_cb_2018",
        f.fact("Fact_F_P_lpg_prodvol_2018")
        * f.fact("Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Verbrennungsbedingte CO2e MineralÃ¶lwirtschaft 2018 LPG (CRF 1.A.1.b)",
            "unit": "",
            "rationale": "CO2e aus CRF 1.A.1.b anteilig nach Produktionsmenge laut MWV Jahresbericht 2019, Berechnung =Fact_F_P_lpg_prodvol_2018*Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2018",
            "reference": "MVW Jahresbericht 2019 S. 66",
            "link": "https://www.mwv.de/wp-content/uploads/2021/01/MWV-Jahresbericht_2019_Webversion_MineraloelwirtschaftsverbandEV.pdf ",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_lpg_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_H_P_lpg_CO2e_cb_2018") / f.fact("Fact_H_P_lpg_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor verbrennungsbedingte CO2e MineralÃ¶lwirtschaft 2018 LPG (Teil CRF 1.A.1.b) vs. EEV LPG 2018",
            "unit": "",
            "rationale": "Fact_H_P_lpg_CO2e_cb_2018/Fact_H_P_lpg_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_opetpro_CO2e_cb_2018",
        f.fact("Fact_H_P_opetpro_prodvol_2018")
        * f.fact("Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Verbrennungsbedingte CO2e MineralÃ¶lwirtschaft 2018 sonstige MineralÃ¶lprodukte",
            "unit": "",
            "rationale": "CO2e aus CRF 1.A.1.b anteilig nach Produktionsmenge laut MWV Jahresbericht 2019",
            "reference": "MVW Jahresbericht 2019 S. 66",
            "link": "https://www.mwv.de/wp-content/uploads/2021/01/MWV-Jahresbericht_2019_Webversion_MineraloelwirtschaftsverbandEV.pdf ",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_opetpro_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_H_P_opetpro_CO2e_cb_2018") / f.fact("Fact_H_P_opetpro_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor verbrennungsbedingte CO2e MineralÃ¶lwirtschaft 2018 sonstige MineralÃ¶lprodukte (Teil CRF 1.A.1.b) vs. EEV Sonstige MineralÃ¶lprodukte 2018",
            "unit": "",
            "rationale": "Fact_H_P_opetpro_CO2e_cb_2018/Fact_H_P_opetpro_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_heatnet_cogen_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_H_P_heatnet_cogen_CO2e_cb_2018")
        / (
            f.fact("Fact_H_P_heatnet_cogen_prodvol_2018")
            * f.fact("Fact_H_P_heatnet_ratio_netto_to_brutto_2018")
        ),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mittlerer Emissionsfaktor CO2e KWK-WÃ¤rme aus Heizkraftwerken der allgemeinen Versorgung 2018 (Teil aus 1.A.1.a)",
            "unit": "t CO2e/MWh",
            "rationale": "Gesamtemissionen aus der KWK-FernwÃ¤rmeerzeugung geteilt durch deren netto FernwÃ¤rmebereitstellung: Fact_H_P_heatnet_cogen_CO2e_cb_2018/(Fact_H_P_heatnet_cogen_prodvol_2018*Fact_H_P_heatnet_ratio_netto_to_brutto_2018)",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_heatnet_plant_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_H_P_heatnet_plant_CO2e_cb_2018")
        / (
            f.fact("Fact_H_P_heatnet_plant_prodvol_2018")
            * f.fact("Fact_H_P_heatnet_ratio_netto_to_brutto_2018")
        ),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mittlerer Emissionsfaktor CO2e FernwÃ¤rme aus Fernheizwerken der allgemeinen Versorgung 2018 (Teil aus CRF 1.A.1.a)",
            "unit": "t CO2e/MWh",
            "rationale": "Gesamtemissionen aus der Fernheizwerk-FernwÃ¤rmeerzeugung geteilt durch deren netto FernwÃ¤rmebereitstellung: Fact_H_P_heatnet_plant_CO2e_cb_2018/(Fact_H_P_heatnet_plant_prodvol_2018*Fact_H_P_heatnet_ratio_netto_to_brutto_2018)",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_heatnet_biomass_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_H_P_heatnet_biomass_CO2e_cb_2018")
        / f.fact("Fact_H_P_heatnet_biomass_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mittlerer Emissionsfaktor verbrennungsbedingte CO2e aus non-CO2-THG der Biomasse-KWK-WÃ¤rme aus Heizkraftwerken der allgemeinen Versorgung 2018 (Teil aus 1.A.1.a)",
            "unit": "t CO2e/MWh",
            "rationale": "Berechnung =Fact_H_P_heatnet_biomass_CO2e_cb_2018/Fact_H_P_heatnet_biomass_fec_2018 ,\nDieser ist ein gewichteter Mittelwert aller eingesetzter BiomassetrÃ¤ger fÃ¼r die WÃ¤rmeproduktion der allgemeinen Versorgung nach UBA 2019.",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_H_P_opetpro_prodvol_2018",
        f.fact("Fact_F_P_petindus_prodvol_2018")
        - f.fact("Fact_F_P_petrol_prodvol_2018")
        - f.fact("Fact_F_P_diesel_prodvol_2018")
        - f.fact("Fact_F_P_jetfuel_prodvol_2018")
        - f.fact("Fact_F_P_fueloil_prodvol_2018")
        - f.fact("Fact_F_P_lpg_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Produktionsmenge MineralÃ¶lwirtschaft 2018 sonstige MineralÃ¶lprodukte",
            "unit": "t/a",
            "rationale": "Bruttoraffinerieerzeugung abzÃ¼glich aller EnergietrÃ¤ger-Kategorien, die auch in AG EB vorkommmen und daher im Generator genutzt werden",
            "reference": "MVW Jahresbericht 2019 S. 66",
            "link": "https://www.mwv.de/wp-content/uploads/2021/01/MWV-Jahresbericht_2019_Webversion_MineraloelwirtschaftsverbandEV.pdf ",
        },
    )
    f.add_derived_fact(
        "Fact_E_P_ratio_gross_electricity_prod_to_fec_electricity_2018",
        f.fact("Fact_E_P_elec_prodvol_brutto_2018")
        / f.fact("Fact_E_P_elec_prodvol_netto_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "VerhÃ¤ltnis Bruttostromerzeugung/Endenergieverbrauch Strom 2018",
            "unit": "",
            "rationale": "Emissionsfaktoren werden auf die Bruttostromerzeugung BSE (gross energy production = gep) (643,451 TWh in 2018) bezogen. Wir arbeiten aber mit dem Endenergieverbrauch EEV (513,327 TWh in 2018). Um auf den richtigen Bundeswert der THG-Emissionen 2018 zu kommen, mÃ¼ssen wir die Berechnung also mit BSE/EEV skalieren. Berechnung =Fact_E_P_elec_prodvol_brutto_2018/E_P_elec_prodvol_netto_2018",
            "reference": "AG EB 2018 Zeile 32+45, Spalte AD",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_E_P_coal_black_cogen_ratio_2018",
        f.fact("Fact_H_P_heatnet_cogen_coal_black_prodvol_2018")
        * f.fact("Fact_H_P_heatnet_ratio_netto_to_brutto_2018")
        / (
            f.fact("Fact_E_P_elec_prodvol_netto_2018")
            * f.fact("Fact_E_P_coal_black_pct_of_gep_2018")
        ),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozentualer Aufschlag Netto(EEV)-KWK-FernwÃ¤rmeerzeugung auf Nettostromerzeugung aus Steinkohle 2018",
            "unit": "%",
            "rationale": "Netto(EEV)-KWK-FernwÃ¤rme aus Steinkohle geteilt durch Nettostromerzeugung aus Steinkohle: Fact_H_P_heatnet_cogen_coal_black_prodvol_2018*Fact_H_P_heatnet_ratio_netto_to_brutto_2018/(Fact_E_P_elec_prodvol_netto_2018*Fakt_S_B_Steinkohle_Anteil2018)",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_E_P_coal_brown_cogen_ratio_2018",
        f.fact("Fact_H_P_heatnet_cogen_coal_brown_prodvol_2018")
        * f.fact("Fact_H_P_heatnet_ratio_netto_to_brutto_2018")
        / (
            f.fact("Fact_E_P_elec_prodvol_netto_2018")
            * f.fact("Fact_E_P_coal_brown_pct_of_gep_2018")
        ),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozentualer Aufschlag Netto(EEV)-KWK-FernwÃ¤rmeerzeugung auf Nettostromerzeugung aus Braunkohle 2018",
            "unit": "%",
            "rationale": "Netto(EEV)-KWK-FernwÃ¤rme aus Braunkohle geteilt durch Nettostromerzeugung aus Braunkohle: Fact_H_P_heatnet_cogen_coal_brown_prodvol_2018*Fact_H_P_heatnet_ratio_netto_to_brutto_2018/(Fact_E_P_elec_prodvol_netto_2018*Fakt_S_B_Braunkohle_Anteil2018)",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_E_P_gas_cogen_ratio_2018",
        f.fact("Fact_H_P_heatnet_cogen_gas_prodvol_2018")
        * f.fact("Fact_H_P_heatnet_ratio_netto_to_brutto_2018")
        / (
            f.fact("Fact_E_P_elec_prodvol_netto_2018")
            * f.fact("Fact_E_P_gas_pct_of_gep_2018")
        ),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozentualer Aufschlag Netto(EEV)-KWK-FernwÃ¤rmeerzeugung auf Nettostromerzeugung aus Erdgas 2018",
            "unit": "%",
            "rationale": "Netto(EEV)-KWK-FernwÃ¤rme aus Erdgas geteilt durch Nettostromerzeugung aus Erdgas: Fact_H_P_heatnet_cogen_gas_prodvol_2018*Fact_H_P_heatnet_ratio_netto_to_brutto_2018/(Fact_E_P_elec_prodvol_netto_2018*Fakt_S_B_Gas_Anteil2018)",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_E_P_ofossil_cogen_ratio_2018",
        f.fact("Fact_H_P_heatnet_cogen_ofossil_prodvol_2018")
        * f.fact("Fact_H_P_heatnet_ratio_netto_to_brutto_2018")
        / (
            f.fact("Fact_E_P_elec_prodvol_netto_2018")
            * f.fact("Fact_E_P_ofossil_pct_of_gep_2018")
        ),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozentualer Aufschlag Netto(EEV)-KWK-FernwÃ¤rmeerzeugung auf Nettostromerzeugung aus sonstigen EnergietrÃ¤gern (inkl. MineralÃ¶l) 2018",
            "unit": "%",
            "rationale": "Netto(EEV)-KWK-FernwÃ¤rme aus sonstigen EnergietrÃ¤gern (inkl. MineralÃ¶l) geteilt durch Nettostromerzeugung aus sonstigen EnergietrÃ¤gern (inkl. MineralÃ¶l): Fact_H_P_heatnet_cogen_ofossil_prodvol_2018*Fact_H_P_heatnet_ratio_netto_to_brutto_2018/(Fact_E_P_elec_prodvol_netto_2018*Fakt_S_B_sonst.konv_Anteil2018)",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_E_P_pv_rest_pct_of_gep_pv_2017",
        1
        - f.fact("Fact_E_P_pv_roof_pct_of_gep_pv_2017")
        - f.fact("Fact_E_P_pv_park_pct_of_gep_pv_2017"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil Rest (Fassade + Agri) an PV D-Land 2017",
            "unit": "%",
            "rationale": 'Auswertung foerderal Erneuerbar, Alle "Sonstige" jeweils zur Hälfte der Fassaden-PV und der Agrar-PV zugerechnet',
            "reference": "foerderal Erneuerbar",
            "link": "https://www.foederal-erneuerbar.de/uebersicht/bundeslaender/BW%7CBY%7CB%7CBB%7CHB%7CHH%7CHE%7CMV%7CNI%7CNRW%7CRLP%7CSL%7CSN%7CST%7CSH%7CTH%7CD/kategorie/solar/auswahl/991-anteil_freiflaechena/#goto_993",
        },
    )
    f.add_derived_fact(
        "Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2018",
        f.fact("Fact_F_P_petindus_CO2e_cb_2018")
        / f.fact("Fact_F_P_petindus_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Faktor CO2e MineralÃ¶lraffinerien pro t 2018",
            "unit": "CO2e/t",
            "rationale": "NIR CO2e Wert fÃ¼r MineralÃ¶lraffinerien (CRF 1.A.1.b) wird auf die komplette MineralÃ¶lwirtschaftsprodukton gleichverteilt nach Produktionsmengen laut MVW Jahresbericht 2019 umgelegt, Berechnung: Fact_F_P_petindus_CO2e_cb_2018/Fact_F_P_petindus_prodvol_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_F_P_petrol_CO2e_cb_2018",
        f.fact("Fact_F_P_petrol_prodvol_2018")
        * f.fact("Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "CO2e MineralÃ¶lwirtschaft 2018 Benzin",
            "unit": "t",
            "rationale": "CO2e aus CRF 1.A.1.b anteilig nach Produktionsmenge laut MWV Jahresbericht 2019, berechnet aus Fact_F_P_petrol_prodvol_2018, Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_F_P_jetfuel_CO2e_cb_2018",
        f.fact("Fact_F_P_jetfuel_prodvol_2018")
        * f.fact("Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "CO2e MineralÃ¶lwirtschaft 2018 Kerosin",
            "unit": "t",
            "rationale": "CO2e aus CRF 1.A.1.b anteilig nach Produktionsmenge laut MWV Jahresbericht 2019, berechnet aus Fact_F_P_jetfuel_prodvol_2018, Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2020",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_F_P_diesel_CO2e_cb_2018",
        f.fact("Fact_F_P_diesel_prodvol_2018")
        * f.fact("Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "CO2e MineralÃ¶lwirtschaft 2018 Diesel",
            "unit": "t",
            "rationale": "CO2e aus CRF 1.A.1.b anteilig nach Produktionsmenge laut MWV Jahresbericht 2019, berechnet aus Fact_F_P_diesel_prodvol_2018, Fact_F_P_petindus_ratio_CO2e_cb_to_prodvol_2019",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_F_P_petrol_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_F_P_petrol_CO2e_cb_2018") / f.fact("Fact_F_P_petrol_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Faktor CO2e zu EEV Benzin 2018",
            "unit": "",
            "rationale": "Dieser Faktor gibt an, wie viele CO2e bei der Benzinproduktion in Deutschland entstehen, geteilt jedoch durch den Endenergieverbrauch, in dem auch die Einfuhr enthalten ist. Berechnung =Fact_F_P_petrol_CO2e_cb_2018/Fact_F_P_petrol_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_F_P_diesel_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_F_P_diesel_CO2e_cb_2018") / f.fact("Fact_F_P_diesel_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Faktor CO2e zu EEV Diesel 2018",
            "unit": "",
            "rationale": "Dieser Faktor gibt an, wie viele CO2e bei der Dieselproduktion in Deutschland entstehen, geteilt jedoch durch den Endenergieverbrauch, in dem auch die Einfuhr enthalten ist. Berechnung =Fact_F_P_diesel_CO2e_cb_2018/Fact_F_P_diesel_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_F_P_jetfuel_ratio_CO2e_cb_to_fec_2018",
        f.fact("Fact_F_P_jetfuel_CO2e_cb_2018") / f.fact("Fact_F_P_jetfuel_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Faktor CO2e zu EEV Kerosin 2018",
            "unit": "",
            "rationale": "Dieser Faktor gibt an, wie viele CO2e bei der Kerosinproduktion in Deutschland entstehen, geteilt jedoch durch den Endenergieverbrauch, in dem auch die Einfuhr enthalten ist. Berechnung =Fact_F_P_jetfuel_CO2e_cb_2018/Fact_F_P_jetfuel_fec_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_R_P_flats_wo_heatnet_2011",
        f.fact("Fact_R_P_flats_2011") - f.fact("Fact_R_P_flats_w_heatnet_2011"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anzahl Wohnungen in in Deutschland gesamt ohne FernwÃ¤rmeanschluss",
            "unit": "",
            "rationale": 'Gesamtzahl aller Wohnungen ohne FernwÃ¤rmeanschluss  in Deutschland als Differenz von "gesamt" und "mit FernwÃ¤rmeanschluss"',
            "reference": "GebÃ¤udezensus 2011",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_R_S_ratio_heatpump_to_orenew_2018",
        f.fact("Fact_R_S_heatpump_fec_2018") / f.fact("Fact_R_S_orenew_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil Bereitstellung WÃ¤rmepumpe an Sonstige EE (Haushalte)",
            "unit": "",
            "rationale": "Berechnung Fact_R_S_heatpump_fec_2018/Fact_R_S_orenew_fec_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_R_S_ratio_solarth_to_orenew_2018",
        f.fact("Fact_R_S_solarth_fec_2018") / f.fact("Fact_R_S_orenew_fec_2018"),
        {
            "note HS": "",
            "group": "ud ",
            "description": "Anteil Bereitstellung Solarthermie an Sonstige EE (Haushalte)",
            "unit": "",
            "rationale": "Berechnung Fact_R_S_solarth_fec_2018/Fact_R_S_orenew_fec_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_R_S_heatpump_mean_annual_performance_factor_all",
        f.fact("Fact_R_S_ground_heatpump_mean_annual_performance_factor_stock_2018")
        * f.fact("Fact_R_S_ratio_ground_to_air_heatpumps_in_new_installations_2018")
        + f.fact("Fact_R_S_air_heatpump_mean_annual_performance_factor_stock_2018")
        * f.fact("Fact_R_S_ratio_air_to_ground_heatpumps_in_new_installations_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mittlere Jahresarbeitszahl von WÃ¤rmepumpen insgesamt",
            "unit": "",
            "rationale": "berechnet (JAZ multipliziert mit Anteil an Neuanlagen)",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_B_P_constr_main_ratio_wage_to_emplo_2017",
        f.fact("Fact_B_P_constr_main_wage_2017")
        / f.fact("Fact_B_P_constr_main_emplo_2017"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Personalkosten Bauhauptgewerbe (WZ 41.2, 42, 43.1, 43.9) pro Person und Jahr 2017",
            "unit": "â‚¬",
            "rationale": "Fact_B_P_constr_main_wage_2017/Fact_B_P_constr_main_emplo_2017",
            "reference": "destatis 2017 Kostenstruktur der Unternehmen im Baugewerbe S. 68ff",
            "link": "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Bauen/Publikationen/Downloads-Baugewerbe-Struktur/kostenstruktur-baugewerbe-2040530177004.pdf?__blob=publicationFile",
        },
    )
    f.add_derived_fact(
        "Fact_B_S_CO2e_cb_2018",
        f.fact("Fact_B_S_CO2e_1A4a_2018") + f.fact("Fact_B_S_CO2e_1A5a_2018"),
        {
            "note HS": "",
            "group": "ufyi",
            "description": "Energiebedingte CO2e GHD 2018 (CRF 1.A.4.a + 1.A.5.a)",
            "unit": "",
            "rationale": "Summe aus Commercial (CRF 1.A.4.a) und Military (CRF 1.A.5.a), da MilitÃ¤r strukturell Ã¤hnlich ist und als sehr kleiner Emittent keinen extra Sektor braucht.",
            "reference": "NIR S. 234, 248",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_constr_civil_ratio_wage_to_emplo_2018",
        f.fact("Fact_I_P_constr_civil_wage_2018")
        / f.fact("Fact_I_P_constr_civil_emplo_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": 'Personalkosten "Sonstiger Tiefbau a.n.g." (WZ 42.99) 2018 pro Person und Jahr 2018',
            "unit": "â‚¬/a",
            "rationale": "Fact_B_P_constr_main_wage_2017/Fact_B_P_constr_main_emplo_2017",
            "reference": "destatis 2018 Kostenstruktur der Rechtlichen Einheiten im Baugewerbe S.69/75",
            "link": "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Bauen/Publikationen/Downloads-Baugewerbe-Struktur/kostenstruktur-baugewerbe-2040530187004.pdf?__blob=publicationFile",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_basic_wo_ammonia_CO2e_cb_2018",
        f.fact("Fact_I_P_chem_basic_CO2e_cb_2018")
        - f.fact("Fact_I_P_chem_ammonia_CO2e_cb_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Energiebedingte CO2e Grundstoffchemie 2018 ohne Ammniak Produktion",
            "unit": "t",
            "rationale": "Energiebedarfe aus AG Energieblianzen (Zeile: 49) multipliziert mit Emissionsfaktoren des UBA - berechnete Emissionen aus der Ammoniak Herstellung",
            "reference": "AG Energiebilanzen und Emissionsfaktoren UBA (Ordner Sharepoint: Industrie - chemische Industrie)",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_ammonia_CO2e_cb_2018",
        f.fact("Fact_I_P_chem_ammonia_ratio_CO2e_cb_to_prodvol")
        * f.fact("Fact_I_P_chem_ammonia_prodvol_2017"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Energiebedinte CO2e Ammoniakproduktion 2018",
            "unit": "t",
            "rationale": "Berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_all_CO2e_cb_2018",
        f.fact("Fact_I_P_chem_basic_wo_ammonia_CO2e_cb_2018")
        + f.fact("Fact_I_P_chem_ammonia_CO2e_cb_2018")
        + f.fact("Fact_I_P_chem_other_CO2e_cb_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Summe Energiebedingte CO2e Chemie 2018 ",
            "unit": "t",
            "rationale": "Energiebedarfe aus AG Energieblianzen (Summe Zeile 49 und 50) multipliziert mit Emissionsfaktoren des UBA",
            "reference": "AG Energiebilanzen und Emissionsfaktoren UBA (Ordner Sharepoint: Industrie - chemische Industrie)",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_basic_wo_ammonia_CO2e_cb_ratio_2018",
        f.fact("Fact_I_P_chem_basic_wo_ammonia_CO2e_cb_2018")
        / f.fact("Fact_I_S_chem_basic_wo_ammonia_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor Energiebedingte CO2e Grundstoffchemie 2018 ",
            "unit": "t/MWh",
            "rationale": "Energiebedingte CO2 Emissionen (Zeile: 462) geteilt durch Energieverbrauch in Zeile: 495",
            "reference": "Siehe Zeilen: 495 und 462",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_ammonia_CO2e_cb_ratio_2018",
        f.fact("Fact_I_P_chem_ammonia_CO2e_cb_2018")
        / f.fact("Fact_I_S_chem_ammonia_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor Energiebedingte CO2e Ammoniak Produktion 2018",
            "unit": "t/MWh",
            "rationale": "RÃ¼ckgerechnet aus den Faktoren zu Energieverbrauch und Emissionen je t Ammoniak",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_other_CO2e_cb_ratio_2018",
        f.fact("Fact_I_P_chem_other_CO2e_cb_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Emissionsfaktor Energiebedingte CO2e sontige Chemieindustrie 2018 ",
            "unit": "t/MWh",
            "rationale": "Energiebedingte CO2 Emissionen (Zeile: 464) geteilt durch Energieverbrauch in Zeile: 497",
            "reference": "Siehe Zeilen: 497 und 464",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_basic_wo_ammonia_CO2e_pb_2018",
        f.fact("Fact_I_P_chem_carbon_black_CO2e_pb_2018")
        + f.fact("Fact_I_P_chem_soda_CO2e_pb_2018")
        + f.fact("Fact_I_P_chem_petro_chemicals_CO2e_pb_2018")
        + f.fact("Fact_I_P_chem_sum_of_smaller_emissions_CO2e_pb_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Prozessbedingte CO2e chemische Industrie ohne Ammoniak 2018",
            "unit": "t",
            "rationale": "Berechnete Summe aus CRF 2.B.2-8 =Fact_I_P_chem_carbon_black_CO2e_pb_2018+Fact_I_P_chem_soda_CO2e_pb_2018+Fact_I_P_chem_petro_chemicals_CO2e_pb_2018+Fact_I_P_chem_sum_of_smaller_emssions_CO2e_pb_2018",
            "reference": "UBA 2020 NIR 2018 S. 327/328",
            "link": "https://www.umweltbundesamt.de/sites/default/files/medien/1410/publikationen/2020-04-15-climate-change_22-2020_nir_2020_de_0.pdf",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_basic_ratio_CO2e_pb_to_prodvol",
        f.fact("Fact_I_P_chem_basic_wo_ammonia_CO2e_pb_2018")
        / f.fact("Fact_I_P_chem_basic_wo_ammonia_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozessbedingte CO2e-Faktor pro t Grundstoffchemie ohne Ammoniak",
            "unit": "t CO2e/t Produkt",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_ammonia_ratio_CO2e_pb_to_prodvol",
        f.fact("Fact_I_P_chem_ammonia_CO2e_pb_2018")
        / f.fact("Fact_I_P_chem_ammonia_prodvol_2017"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozessbedingte CO2e-Faktor pro t Ammoniak",
            "unit": "t CO2e/t Produkt",
            "rationale": "VCI Roadmap Chemie TreibhausgasneutralitÃ¤t 2050",
            "reference": "VCI 2019",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_other_ratio_CO2e_pb_to_prodvol",
        f.fact("Fact_I_P_chem_other_CO2e_pb_2018")
        / f.fact("Fact_I_P_chem_other_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozessbedingte CO2e-Faktor pro t Sonstige Chemie Industrie",
            "unit": "t CO2e/t Produkt",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_basic_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_chem_basic_wo_ammonia_CO2e_cb_2018")
        / f.fact("Fact_I_P_chem_basic_wo_ammonia_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energiebedingte CO2e-Faktor pro t Grundstoffchemie ohne Ammoniak",
            "unit": "t CO2e/t Produkt",
            "rationale": "Berechnet (nur als Hilfszahl)",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_other_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_chem_other_CO2e_cb_2018")
        / f.fact("Fact_I_P_chem_other_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energiebedingte CO2e-Faktor pro t Sonstige Chemie Industrie",
            "unit": "t CO2e/t Produkt",
            "rationale": "Berechnet (nur als Hilfszahl)",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_basic_ratio_prodvol_to_fec",
        f.fact("Fact_I_P_chem_basic_wo_ammonia_prodvol_2018")
        / f.fact("Fact_I_S_chem_basic_wo_ammonia_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energieeinsatzfaktoren Grundstoffchemie ohne Ammoniak 2018",
            "unit": "t/MWh",
            "rationale": "Berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_other_ratio_prodvol_to_fec",
        f.fact("Fact_I_P_chem_other_prodvol_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energieeinsatzfaktoren Sontige Chemie Industrie",
            "unit": "t Produkt/MWh",
            "rationale": "Berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_wo_ammonia_fec_2018",
        f.fact("Fact_I_S_chem_basic_fec_2018")
        - f.fact("Fact_I_S_chem_ammonia_fec_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Energieverbrauch Grundstoffchemie ohne Ammoniak EEV 2018",
            "unit": "MWh",
            "rationale": "Zeile 56 AG Energiebilanzen (Umgerechnet in MWh) ohne Ammoniak",
            "reference": "AG Energiebilanzen 2018",
            "link": "https://ag-energiebilanzen.de",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_ammonia_fec_2018",
        f.fact("Fact_I_P_chem_ammonia_prodvol_2017")
        / f.fact("Fact_I_P_chem_ammonia_ratio_prodvol_to_fec"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Energieverbrauch Ammoniakherstellung EEV 2018",
            "unit": "MWh",
            "rationale": "Berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_all_fec_2018",
        f.fact("Fact_I_S_chem_basic_wo_ammonia_fec_2018")
        + f.fact("Fact_I_S_chem_ammonia_fec_2018")
        + f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Energieverbrauch Gesamte Chemieindustrie EEV 2018",
            "unit": "MWh",
            "rationale": "Zeile 56+57 AG Energiebilanzen  (Umgerechnet in MWh)",
            "reference": "AG Energiebilanzen 2018",
            "link": "https://ag-energiebilanzen.de",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_fec_pct_of_basic",
        f.fact("Fact_I_S_chem_basic_fec_2018") / f.fact("Fact_I_S_chem_all_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "Anteil Energieverbrauch Grundstoffchemie ohne Ammoniak EEV 2018",
            "unit": "%",
            "rationale": "EEV von Bereich in: 495 geteilt durch Summe: in Zeile: 498",
            "reference": "AG Energiebilanzen 2018",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_fec_pct_of_ammonia",
        f.fact("Fact_I_S_chem_ammonia_fec_2018") / f.fact("Fact_I_S_chem_all_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "Anteil Energieverbrauch Ammoniak Produktion EEV 2018",
            "unit": "%",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_fec_pct_of_other",
        f.fact("Fact_I_S_chem_other_fec_2018") / f.fact("Fact_I_S_chem_all_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "Anteil Energieverbrauch sonstige Chemieindustrie EEV 2018",
            "unit": "%",
            "rationale": "EEV von Bereich in: 497 geteilt durch Summe: in Zeile: 498",
            "reference": "AG Energiebilanzen 2018",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_fec_ratio_to_industrie_2018",
        f.fact("Fact_I_S_chem_all_fec_2018") / f.fact("Fact_I_S_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ui (Entry)",
            "description": "Anteil chemische Industrie EEV 2018 (an Industrie Gesamt)",
            "unit": "%",
            "rationale": "EEV Chemieindustrie / EEV Industrie",
            "reference": "AG Energiebilanzen 2018",
            "link": "https://ag-energiebilanzen.de",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_ratio_fec_to_industry_2018",
        f.fact("Fact_I_P_miner_fec_2018") / f.fact("Fact_I_S_fec_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Anteil mineralische Industrie EEV 2018",
            "unit": "",
            "rationale": "Spalte AK, Zeile 52+53",
            "reference": "AG Energiebilanzen: Energiebilanz der BR Deutschland 2018, eigene Aufteilung ohne Spalten AA, AB, AD, AF",
            "link": "https://ag-energiebilanzen.de/7-0-Bilanzen-1990-2017.html",
        },
    )
