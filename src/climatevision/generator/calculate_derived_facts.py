"""
This module was auto generated from an annotated version of the 2018 facts file, which
contained explicit formulas for every derived fact. This way we could simplify updating
the facts, without changing a lot of the actual code.
"""

from . import refdata


def calculate_derived_facts(rd: refdata.RefData):
    import sys

    f = rd.facts()

    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_year_ref",
        f.fact(f"Fact_M_CO2e_lulucf_{rd.year_ref()}"),
        {
            "note HS": "",
            "group": "ud",
            "description": "",
            "unit": "%",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_year_ref",
        f.fact(f"Fact_M_CO2e_wo_lulucf_{rd.year_ref()}"),
        {
            "note HS": "",
            "group": "ud",
            "description": "",
            "unit": "%",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_2015_vs_year_ref",
        f.fact("Fact_M_CO2e_wo_lulucf_2015") / f.fact("Fact_M_CO2e_wo_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2015 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizieller Wert",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_2016_vs_year_ref",
        f.fact("Fact_M_CO2e_wo_lulucf_2016") / f.fact("Fact_M_CO2e_wo_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2016 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizieller Wert",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_2017_vs_year_ref",
        f.fact("Fact_M_CO2e_wo_lulucf_2017") / f.fact("Fact_M_CO2e_wo_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2017 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizieller Wert",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_2018_vs_year_ref",
        f.fact("Fact_M_CO2e_wo_lulucf_2018") / f.fact("Fact_M_CO2e_wo_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2018 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizieller Wert",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_2019_vs_year_ref",
        f.fact("Fact_M_CO2e_wo_lulucf_2019") / f.fact("Fact_M_CO2e_wo_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2019 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizieller Wert",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_2020_vs_year_ref",
        f.fact("Fact_M_CO2e_wo_lulucf_2020") / f.fact("Fact_M_CO2e_wo_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2020 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizielle SchÃ¤tzung",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_2021_vs_year_ref",
        f.fact("Fact_M_CO2e_wo_lulucf_2021") / f.fact("Fact_M_CO2e_wo_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2021 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "SchÃ¤tzung von August 2021",
            "reference": "Ã–ko-Institut 2021 Hochrechnung der deutschen THG-Emissionen 2021",
            "link": "https://www.oeko.de/fileadmin/oekodoc/Hochrechnung-der-deutschen-THG-Emissionen-2021.pdf ",
        },
    )

    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_2022_vs_year_ref",
        f.fact("Fact_M_CO2e_wo_lulucf_2022") / f.fact("Fact_M_CO2e_wo_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2022 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "SchÃ¤tzung von August 2021",
            "reference": "Ã–ko-Institut 2021 Hochrechnung der deutschen THG-Emissionen 2021",
            "link": "https://www.oeko.de/fileadmin/oekodoc/Hochrechnung-der-deutschen-THG-Emissionen-2021.pdf ",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_2023_vs_year_ref",
        f.fact("Fact_M_CO2e_wo_lulucf_2023") / f.fact("Fact_M_CO2e_wo_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2023 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "SchÃ¤tzung von August 2021",
            "reference": "Ã–ko-Institut 2021 Hochrechnung der deutschen THG-Emissionen 2021",
            "link": "https://www.oeko.de/fileadmin/oekodoc/Hochrechnung-der-deutschen-THG-Emissionen-2021.pdf ",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_wo_lulucf_2024_vs_year_ref",
        f.fact("Fact_M_CO2e_wo_lulucf_2024") / f.fact("Fact_M_CO2e_wo_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2024 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "SchÃ¤tzung von August 2021",
            "reference": "Ã–ko-Institut 2021 Hochrechnung der deutschen THG-Emissionen 2021",
            "link": "https://www.oeko.de/fileadmin/oekodoc/Hochrechnung-der-deutschen-THG-Emissionen-2021.pdf ",
        },
    )

    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_2015_vs_year_ref",
        f.fact("Fact_M_CO2e_lulucf_2015") / f.fact("Fact_M_CO2e_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen LULUCF Deutschland 2015 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizieller Wert",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_2016_vs_year_ref",
        f.fact("Fact_M_CO2e_lulucf_2016") / f.fact("Fact_M_CO2e_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen LULUCF Deutschland 2016 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizieller Wert",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_2017_vs_year_ref",
        f.fact("Fact_M_CO2e_lulucf_2017") / f.fact("Fact_M_CO2e_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen LULUCF Deutschland 2017 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizieller Wert",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_2018_vs_year_ref",
        f.fact("Fact_M_CO2e_lulucf_2018") / f.fact("Fact_M_CO2e_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen LULUCF Deutschland 2018 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizieller Wert",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_2019_vs_year_ref",
        f.fact("Fact_M_CO2e_lulucf_2019") / f.fact("Fact_M_CO2e_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen LULUCF Deutschland 2019 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizieller Wert",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_2020_vs_year_ref",
        f.fact("Fact_M_CO2e_lulucf_2020") / f.fact("Fact_M_CO2e_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen LULUCF Deutschland 2020 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Offizielle SchÃ¤tzung",
            "reference": "UBA 2021 Trendtabelle THG 1990-2020, Blatt THG",
            "link": "https://www.umweltbundesamt.de/themen/klima-energie/treibhausgas-emissionen",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_2021_vs_year_ref",
        f.fact("Fact_M_CO2e_lulucf_2021") / f.fact("Fact_M_CO2e_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen LULUCF Deutschland 2021 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "Gleicher LULUCF-Wert wie 2020 angenommen, da in den Vorjahren auch kaum VerÃ¤nderung",
            "reference": "Ã–ko-Institut 2021 Hochrechnung der deutschen THG-Emissionen 2021",
            "link": "https://www.oeko.de/fileadmin/oekodoc/Hochrechnung-der-deutschen-THG-Emissionen-2021.pdf ",
        },
    )

    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_2022_vs_year_ref",
        f.fact("Fact_M_CO2e_lulucf_2022") / f.fact("Fact_M_CO2e_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2022 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "SchÃ¤tzung von August 2021",
            "reference": "Ã–ko-Institut 2021 Hochrechnung der deutschen THG-Emissionen 2021",
            "link": "https://www.oeko.de/fileadmin/oekodoc/Hochrechnung-der-deutschen-THG-Emissionen-2021.pdf ",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_2023_vs_year_ref",
        f.fact("Fact_M_CO2e_lulucf_2023") / f.fact("Fact_M_CO2e_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2023 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "SchÃ¤tzung von August 2021",
            "reference": "Ã–ko-Institut 2021 Hochrechnung der deutschen THG-Emissionen 2021",
            "link": "https://www.oeko.de/fileadmin/oekodoc/Hochrechnung-der-deutschen-THG-Emissionen-2021.pdf ",
        },
    )
    f.add_derived_fact(
        "Fact_M_CO2e_lulucf_2024_vs_year_ref",
        f.fact("Fact_M_CO2e_lulucf_2024") / f.fact("Fact_M_CO2e_lulucf_year_ref"),
        {
            "note HS": "ACHTUNG VARIABLE ENDUNG",
            "group": "ud",
            "description": f"Emissionen ohne LULUCF Deutschland 2024 vs {rd.year_ref()} in Prozentpunkten",
            "unit": "%",
            "rationale": "SchÃ¤tzung von August 2021",
            "reference": "Ã–ko-Institut 2021 Hochrechnung der deutschen THG-Emissionen 2021",
            "link": "https://www.oeko.de/fileadmin/oekodoc/Hochrechnung-der-deutschen-THG-Emissionen-2021.pdf ",
        },
    )

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
        "Fact_B_P_renovations_wage_per_person_per_year_2018",
        f.fact("Fact_B_P_renovation_wage_2018")
        / f.fact("Fact_B_P_renovation_emplo_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Personalkosten Ausbaugewerbe (WZ 43.2+43.3) pro Person und Jahr 2018",
            "unit": "â‚¬",
            "rationale": "Personalkosten im Ausbaugewerbe (WZ 43.2+43.3) insgesamt (15.525.684.000â‚¬, S.79) geteilt durch Arbeitnehmer insgesamt (378973, S.73) ",
            "reference": "destatis 2020 Fachserie 4 Reihe 5.3 Produzierendes Gewerbe Kostenstruktur der Rechtlichen Einheiten im Baugewerbe 2018, S. 70, 76",
            "link": "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Bauen/Publikationen/Downloads-Baugewerbe-Struktur/kostenstruktur-baugewerbe-2040530187004.pdf?__blob=publicationFile",
        },
    )
    f.add_derived_fact(
        "Fact_B_P_heating_wage_per_person_per_year_2018",
        f.fact("Fact_B_P_install_heating_wage_2018")
        / f.fact("Fact_B_P_install_heating_emplo_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Personalkosten Gas-, Wasser-, Heizungs- sowie LÃ¼ftungs- und Klimainstallation (WZ 43.22) pro Person und Jahr 2018",
            "unit": "â‚¬",
            "rationale": "Personalkosten in Heizungsinstallation (WZ 43.22) insgesamt (5.993.365.000 â‚¬, S.76) geteilt durch Arbeitnehmer insgesamt (138641, S.70) ",
            "reference": "destatis 2020 Fachserie 4 Reihe 5.3 Produzierendes Gewerbe Kostenstruktur der Rechtlichen Einheiten im Baugewerbe 2018, S. 70, 76",
            "link": "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Bauen/Publikationen/Downloads-Baugewerbe-Struktur/kostenstruktur-baugewerbe-2040530187004.pdf?__blob=publicationFile",
        },
    )

    f.add_derived_fact(
        "Fact_B_P_constr_main_ratio_wage_to_emplo_2017",
        f.fact("Fact_B_P_constr_main_wage_2018")
        / f.fact("Fact_B_P_constr_main_emplo_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Personalkosten Bauhauptgewerbe (WZ 41.2, 42, 43.1, 43.9) pro Person und Jahr 2017",
            "unit": "â‚¬",
            "rationale": "Fact_B_P_constr_main_wage_2018/Fact_B_P_constr_main_emplo_2018",
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
            "rationale": "Fact_B_P_constr_main_wage_2018/Fact_B_P_constr_main_emplo_2018",
            "reference": "destatis 2018 Kostenstruktur der Rechtlichen Einheiten im Baugewerbe S.69/75",
            "link": "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Bauen/Publikationen/Downloads-Baugewerbe-Struktur/kostenstruktur-baugewerbe-2040530187004.pdf?__blob=publicationFile",
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
        "Fact_I_S_fec_2018",
        f.fact("Fact_I_S_elec_fec_2018")
        + f.fact("Fact_I_S_coal_fec_2018")
        + f.fact("Fact_I_S_diesel_fec_2018")
        + f.fact("Fact_I_S_fueloil_fec_2018")
        + f.fact("Fact_I_S_lpg_fec_2018")
        + f.fact("Fact_I_S_opetpro_fec_2018")
        + f.fact("Fact_I_S_gas_fec_2018")
        + f.fact("Fact_I_S_biomass_fec_2018")
        + f.fact("Fact_I_S_orenew_fec_2018")
        + f.fact("Fact_I_S_ofossil_fec_2018")
        + f.fact("Fact_I_S_heatnet_fec_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "EEV Industrie 2018",
            "unit": "MWh",
            "rationale": "Summe aller anderen EnergietrÃ¤ger",
            "reference": "AG Energiebilanzen: Zeile 60 Energiebilanz der BR Deutschland 2018",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_CO2e_cb_2015_2017",
        f.fact("Fact_I_P_miner_cement_CO2e_cb_2017")
        + f.fact("Fact_I_P_miner_chalk_CO2e_cb_2016")
        + f.fact("Fact_I_P_miner_ceram_CO2e_cb_2016")
        + f.fact("Fact_I_P_miner_glas_CO2e_cb_2015"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Energiebedingte CO2e mineralische Industrie 2015/2016/2017",
            "unit": "t/a",
            "rationale": "Summe aus Zement, Kalk, Keramik, Glas",
            "reference": "Agora EW 2020, S. 23 & BMWI Branchensteckbriefe",
            "link": "https://www.bmwi.de/Redaktion/DE/Artikel/Energie/energiewende-in-der-industrie.html\nhttps://static.agora-energiewende.de/fileadmin/Projekte/2018/Dekarbonisierung_Industrie/164_A-EW_Klimaneutrale-Industrie_Studie_WEB.pdf",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_fec_pct_of_cement",
        f.fact("Fact_I_S_miner_cement_fec_2018") / f.fact("Fact_I_S_miner_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "Anteil EEV Zementindustrie an mineralischer Industrie 2018",
            "unit": "",
            "rationale": "berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_cement_ratio_prodvol_to_fec",
        f.fact("Fact_I_P_miner_cement_prodvol_2018")
        / f.fact("Fact_I_S_miner_cement_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energieeinsatzfaktor Zementindustrie 2017",
            "unit": "",
            "rationale": "berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_cement_ratio_CO2e_pb_to_prodvol",
        f.fact("Fact_I_P_miner_cement_CO2e_pb_2018")
        / f.fact("Fact_I_P_miner_cement_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozessbedingte CO2-Emissionsfaktor Zementindustrie in t CO2 pro produzierter t Zement",
            "unit": "t CO2e/t Produkt",
            "rationale": "Daten aus 2017, disaggregierte Zahlen liegen nicht vor. Schwankungen in der Branche sind eher gering",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_fec_pct_of_chalk",
        f.fact("Fact_I_S_miner_chalk_fec_2018") / f.fact("Fact_I_S_miner_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "Anteil EEV Kalkindustrie an mineralischer Industrie 2017",
            "unit": "%",
            "rationale": "berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_chalk_ratio_prodvol_to_fec",
        f.fact("Fact_I_P_miner_chalk_prodvol_2018")
        / f.fact("Fact_I_S_miner_chalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energieeinsatzfaktor Kalkindustrie 2017",
            "unit": "",
            "rationale": "berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_chalk_ratio_CO2e_pb_to_prodvol",
        f.fact("Fact_I_P_miner_chalk_CO2e_pb_2018")
        / f.fact("Fact_I_P_miner_chalk_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozessbedingte CO2-Emissionsfaktor Kalkindustrie in t CO2 pro produzierter t Kalk",
            "unit": "t CO2e/t Produkt",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_fec_pct_of_ceram",
        f.fact("Fact_I_S_miner_ceram_fec_2018") / f.fact("Fact_I_S_miner_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "Anteil EEV Keramikindustrie an mineralischer Industrie 2017",
            "unit": "",
            "rationale": "berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_ceram_ratio_prodvol_to_fec",
        f.fact("Fact_I_P_miner_ceram_prodvol_2018")
        / f.fact("Fact_I_S_miner_ceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energieeinsatzfaktor Keramikindustrie 2017",
            "unit": "",
            "rationale": "berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_ceram_ratio_CO2e_pb_to_prodvol",
        f.fact("Fact_I_P_miner_ceram_CO2e_pb_2018")
        / f.fact("Fact_I_P_miner_ceram_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozessbedingte CO2-Emissionsfaktor Keramikindustrie in t CO2 pro produzierter t Keramik",
            "unit": "t CO2e/t Produkt",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_fec_pct_of_glas",
        f.fact("Fact_I_S_miner_glas_fec_2018") / f.fact("Fact_I_S_miner_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "Anteil EEV Glasindustrie an mineralischer Industrie 2017",
            "unit": "",
            "rationale": "berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_glas_ratio_prodvol_to_fec",
        f.fact("Fact_I_P_miner_glas_prodvol_2018")
        / f.fact("Fact_I_S_miner_glas_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energieeinsatzfaktor Glasindustrie 2017",
            "unit": "",
            "rationale": "berechnet",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_glas_ratio_CO2e_pb_to_prodvol",
        f.fact("Fact_I_P_miner_glas_CO2e_pb_2018")
        / f.fact("Fact_I_P_miner_glas_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozessbedingte CO2-Emissionsfaktor Glasindustrie in t CO2 pro produzierter t Glas",
            "unit": "t CO2e/t Produkt",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_primary_CO2e_cb_2018",
        f.fact("Fact_I_P_metal_steel_primary_CO2e_cb_HKR_2018")
        + f.fact("Fact_I_P_metal_steel_primary_CO2e_cb_DRI_2018"),
        {
            "note HS": "umbenennen zu Fact_I_P_metal_steel_primary_CO2e_cb_2018",
            "group": "ui",
            "description": "Energiebedingte CO2e Stahlerzeugung (WZ 24.1 bzw. CRF 1.A.2.a) PrimÃ¤rroute kombiniert 2018",
            "unit": "t",
            "rationale": "gesamte eb Emissionen der PrimÃ¤rroute, bestehend aus HKR plus DRI",
            "reference": "Summenbildung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_primary_CO2e_pb_2018",
        f.fact("Fact_I_P_metal_steel_primary_CO2e_pb_HKR_2018")
        + f.fact("Fact_I_P_metal_steel_primary_CO2e_pb_DRI_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Prozessbedingte CO2e Stahlerzeugung (WZ 24.1 bzw. CRF 2.C.1) PrimÃ¤rroute kombiniert 2018",
            "unit": "t",
            "rationale": "gesamte pb Emissionen der PrimÃ¤rroute, bestehend aus HKR plus DRI",
            "reference": "Summenbildung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_primary_prodvol_2018",
        f.fact("Fact_I_P_metal_steel_primary_HKR_prodvol_2018")
        + f.fact("Fact_I_P_metal_steel_primary_DRI_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Produktion Rohstahl PrimÃ¤rroute 2018",
            "unit": "t",
            "rationale": "Summe aus HKR und DRI",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_secondary_ratio_CO2e_pb_to_prodvol",
        f.fact("Fact_I_P_metal_steel_secondary_CO2e_pb_2018")
        / f.fact("Fact_I_P_metal_steel_secondary_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "pb CO2e/Produktionsmenge Faktor Stahlerzeugung (WZ 24.1) SekundÃ¤rroute 2018",
            "unit": "",
            "rationale": "Berechnung",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_further_ratio_fec_to_prodvol_2018",
        f.fact("Fact_I_P_metal_steel_further_ratio_fec_elec_to_prodvol_2018")
        + f.fact("Fact_I_P_metal_steel_further_ratio_fec_gas_to_prodvol_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "EEV/Produktionsmenge Faktor Stahlerzeugung (WZ 24.1) Weiterverarbeitung Warmwalzen 2018",
            "unit": "",
            "rationale": 'Da in die EEV-Werten der AG EB Zeile 54 unter WZ 24.1 auch warmgewalzte Stahlerzeugnisse zÃ¤hlen und in den Emissionswerten der PrimÃ¤r- und SekundÃ¤rroute auch die Weiterverarbeitung (Walzen und Sintern, siehe NIR 2018 Tabelle S. 342, auch Guss? (NIR S.188)) enthalten ist, wird stellvertretend fÃ¼r alle Weiterverarbeitungsschritte Warmwalzen (da konkrete Werte auffindbar) zu den eigentlichen Prozessenergiefaktoren hinzugefÃ¼gt.,\n"Der spezifische Energiebedarf hÃ¤ngt stark vom angewendeten Verfahren ab. Beispielwerte fuÌˆr das Warmwalzen61 liegen bei 0,42 GJ/t (0,117 MWh/t) Strom und 1,26 GJ/t (0,35 MWh/t) Gas."',
            "reference": "bmwi 2019 S. 12",
            "link": "https://www.bmwi.de/Redaktion/DE/Downloads/E/energiewende-in-der-industrie-ap2a-branchensteckbrief-stahl.pdf?__blob=publicationFile&v=4",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_HKR_fec_2018",
        f.fact("Fact_I_P_metal_steel_primary_HKR_prodvol_2018")
        * f.fact("Fact_I_P_metal_steel_primary_HKR_ratio_fec_to_prodvol_2018"),
        {
            "note HS": "umbenennen zu Fact_I_S_metal_steel_primary_HKR_fec_2018",
            "group": "ui",
            "description": "EEV Stahlerzeugung (WZ 24.1) 2018 PrimÃ¤rroute HKR",
            "unit": "",
            "rationale": "Berechnungen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_DRI_fec_2018",
        f.fact("Fact_I_P_metal_steel_primary_DRI_prodvol_2018")
        * f.fact("Fact_I_P_metal_steel_primary_DRI_ratio_fec_to_prodvol_2018"),
        {
            "note HS": "umbenennen zu Fact_I_S_metal_steel_primary_DRI_fec_2018",
            "group": "ui",
            "description": "EEV Stahlerzeugung (WZ 24.1) 2018 PrimÃ¤rroute DRI",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_elec_fec_2018",
        f.fact("Fact_I_P_metal_steel_secondary_prodvol_2018")
        * (
            f.fact("Fact_I_P_metal_steel_secondary_ratio_fec_elec_to_prodvol_2018")
            + f.fact("Fact_I_P_metal_steel_further_ratio_fec_elec_to_prodvol_2018")
        ),
        {
            "note HS": "",
            "group": "ui",
            "description": "",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )

    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_elec_fec_2018",
        f.fact("Fact_I_S_metal_steel_elec_fec_2018")
        - f.fact("Fact_I_S_metal_steel_secondary_elec_fec_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )

    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_gas_fec_2018",
        f.fact("Fact_I_P_metal_steel_secondary_prodvol_2018")
        * (
            f.fact("Fact_I_P_metal_steel_secondary_ratio_fec_gas_to_prodvol_2018")
            + f.fact("Fact_I_P_metal_steel_further_ratio_fec_gas_to_prodvol_2018")
        ),
        {
            "note HS": "",
            "group": "ui",
            "description": "",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )

    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_gas_fec_2018",
        f.fact("Fact_I_S_metal_steel_gas_fec_2018")
        - f.fact("Fact_I_S_metal_steel_secondary_gas_fec_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )

    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_2018",
        f.fact("Fact_I_S_metal_steel_secondary_gas_fec_2018")
        + f.fact("Fact_I_S_metal_steel_secondary_elec_fec_2018"),
        {
            "note HS": "umbenennen zu Fact_I_S_metal_steel_secondary_fec_2018",
            "group": "ui",
            "description": "EEV Stahlerzeugung (WZ 24.1) 2018 SekundÃ¤rroute",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )

    if rd.year_ref() != 2018:
        # In 2018 we had Fact_I_P_metal_nonfe_prodvol_2018 as a non derived fact.
        # In 2021 we derived it.
        f.add_derived_fact(
            "Fact_I_P_metal_nonfe_prodvol_2018",
            f.fact("Fact_I_P_metal_nonfe_semi_prodvol_2018")
            + f.fact("Fact_I_P_metal_nonfe_foundries_prodvol_2018"),
            {
                "note HS": "",
                "group": "ui",
                "description": "Produktionsmenge NE-Metalle Halbzeug und Gießereien 2021",
                "unit": "t/a",
                "rationale": 'Die gesamte Produktionsmenge der Nichteisen-Metalle (6.505.634 t fÃ¼r "Erzeugung, Halbzeug, Guss") wird zusammengefasst und wie Aluminium behandelt, da 2/3 der Emissionen aus der Aluminium-Prdouktion stammen, 1/7 aus Kupfer, der Rest Blei, Zink, Sonstiges (DEHSt 2018). Die WVMetalle gibt keine Emissionen an, hÃ¤lt es aber ebenso fÃ¼r legitim, aus der gesamten Produktionsmenge und dem gesamten Energieeinsatz einen Faktor pro t zu machen. Hinzu kommt noch die Produktionsmenge der Eisen-Gießereien i.H.v . 3.100.000 t.',
                "reference": "WVMetalle 2023 Quartalsbericht August 2023 S.2,\nDEHSt 2018 S. 33",
                "link": "https://www.wvmetalle.de/index.php?eID=dumpFile&t=f&f=444730&token=5716e1a4ebbd79113eeabfe8899807ca5188eaa9\nhttps://www.dehst.de/SharedDocs/downloads/DE/publikationen/VET-Bericht-2018.pdf?__blob=publicationFile&v=5",
            },
        )

    f.add_derived_fact(
        "Fact_I_P_metal_nonfe_ratio_prodvol_to_fec",
        f.fact("Fact_I_P_metal_nonfe_prodvol_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio production volume to FEC non-ferrous metals 2018. Berechneter Kehrwert",
            "unit": "t/MWh",
            "rationale": "Die WVMetalle hÃ¤lt es fÃ¼r legitim, aus der gesamten Produktionsmenge und dem gesamten Energieeinsatz einen Faktor pro t zu machen.",
            "reference": "WVMetalle 2018, S.3",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_nonfe_CO2e_cb_2018",
        f.fact("Fact_I_P_metal_nonfe_1a2b_CO2e_cb_2018")
        + f.fact("Fact_I_P_metal_nonfe_foundries_CO2e_cb_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "combustion-based CO2e non-ferrous industry including foundries (CRF 1.A.2.a+b) 2018",
            "unit": "",
            "rationale": 'Summe der drei THG in CRF 1.A.2.b "Nichteisen-Metalle",\n"Diese Kategorie umfasst die Prozessfeuerungen der Produktionsbereiche der Nichteisenmetalle in aggregierter Form. Eine detailliertere Darstellung ist aufgrund der Datenlage nicht mÃ¶glich.",\nAG Energiebilanzen zeigt: 57% Strom, 33% Erdgas, 7% Koks, 3% sonstige EnergietrÃ¤ger,\nDEHSt 2018 zeigt: 2/3 der Emissionen stammen aus der Aluminium-Prdouktion, 1/7 aus Kupfer, der Rest Blei, Zink, Sonstiges.,\nHinzu kommen die Emissionen der EisengieÃŸereien (WZ 24.5) aus CRF 1.A.2.a',
            "reference": "NIR 2020 S. 191,\nDEHSt 2018, S. 33",
            "link": "https://www.dehst.de/SharedDocs/downloads/DE/publikationen/VET-Bericht-2018.pdf?__blob=publicationFile&v=5",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_nonfe_ratio_CO2e_pb_to_prodvol",
        f.fact("Fact_I_P_metal_nonfe_CO2e_pb_2018")
        / f.fact("Fact_I_P_metal_nonfe_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio pb CO2e to production volume non-ferrous metals 2018",
            "unit": "",
            "rationale": "Die WVMetalle gibt keine Emissionen an, hÃ¤lt es aber ebenso fÃ¼r legitim, aus der gesamten Produktionsmenge und dem gesamten Energieeinsatz einen Faktor pro t zu machen.",
            "reference": "WVMetalle 2018, S.3",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_paper_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_other_paper_CO2e_cb_2018")
        / f.fact("Fact_I_P_other_paper_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio cb CO2e to production volume paper industry 2018",
            "unit": "",
            "rationale": "Divsion von Fact_I_P_other_paper_CO2e_cb_2018/Fact_I_P_other_paper_prodvol_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )

    f.add_derived_fact(
        "Fact_I_P_other_paper_ratio_prodvol_to_fec",
        f.fact("Fact_I_P_other_paper_prodvol_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio production volume to FEC paper industry 2018. Berechneter Kehrwert",
            "unit": "t/MWh",
            "rationale": "Division von Fact_I_S_other_paper_fec_2018/Fact_I_P_other_paper_prodvol_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_food_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_other_food_CO2e_cb_2015")
        / f.fact("Fact_I_P_other_food_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio cb CO2e to production volume food industry 2018",
            "unit": "",
            "rationale": "Divsion von Fact_I_P_other_food_CO2e_cb_2018/Fact_I_P_other_food_prodvol_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_food_ratio_prodvol_to_fec",
        f.fact("Fact_I_P_other_food_prodvol_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio production volume to FEC food industry 2018. Berechneter Kehrwert",
            "unit": "t/MWh",
            "rationale": "Division von Fact_I_S_other_food_fec_2018/Fact_I_P_other_food_prodvol_2018",
            "reference": "",
            "link": "",
        },
    )

    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_miner_cementchalk_coal_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_coal_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_miner_cementchalk_diesel_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_diesel_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_miner_cementchalk_fueloil_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_fueloil_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_miner_cementchalk_lpg_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_lpg_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_miner_cementchalk_opetpro_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_opetpro_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_miner_cementchalk_gas_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_gas_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_miner_cementchalk_biomass_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_biomass_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_miner_cementchalk_orenew_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_orenew_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_miner_cementchalk_ofossil_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_ofossil_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_miner_cementchalk_elec_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_elec_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_cement_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_miner_cementchalk_heatnet_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_heatnet_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_miner_cementchalk_coal_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_coal_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_miner_cementchalk_diesel_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_diesel_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_miner_cementchalk_fueloil_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_fueloil_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_miner_cementchalk_lpg_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_lpg_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_miner_cementchalk_opetpro_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_opetpro_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_miner_cementchalk_gas_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_gas_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_miner_cementchalk_biomass_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_biomass_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_miner_cementchalk_orenew_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_orenew_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_miner_cementchalk_ofossil_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_ofossil_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_miner_cementchalk_elec_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_elec_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_chalk_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_miner_cementchalk_heatnet_fec_2018")
        / f.fact("Fact_I_S_miner_cementchalk_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an Zementindustrie+Kalkindustrie 2018 (WZ 23 Rest)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_cementchalk_heatnet_fec_2018/Fact_I_P_miner_cementchalk_fec_2018",
            "reference": "AG EB 2018 Zeile 53",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_miner_glasceram_coal_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_coal_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_miner_glasceram_diesel_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_diesel_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_miner_glasceram_fueloil_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_fueloil_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_miner_glasceram_lpg_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_lpg_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_miner_glasceram_opetpro_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_opetpro_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_miner_glasceram_gas_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_gas_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_miner_glasceram_biomass_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_biomass_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_miner_glasceram_orenew_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_orenew_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_miner_glasceram_ofossil_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_ofossil_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_miner_glasceram_elec_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_elec_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_glas_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_miner_glasceram_heatnet_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an Glasindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_heatnet_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_miner_glasceram_coal_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_coal_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_miner_glasceram_diesel_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_diesel_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_miner_glasceram_fueloil_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_fueloil_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_miner_glasceram_lpg_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_lpg_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_miner_glasceram_opetpro_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_opetpro_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_miner_glasceram_gas_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_gas_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_miner_glasceram_biomass_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_biomass_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_miner_glasceram_orenew_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_orenew_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_miner_glasceram_ofossil_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_ofossil_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_miner_glasceram_elec_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_elec_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_miner_ceram_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_miner_glasceram_heatnet_fec_2018")
        / f.fact("Fact_I_S_miner_glasceram_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an Keramikindustrie 2018 (WZ 23.1 23.2 23.31 23.4)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_miner_glasceram_heatnet_fec_2018/Fact_I_P_miner_glasceram_fec_2018",
            "reference": "AG EB 2018 Zeile 52",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_chem_basic_coal_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_coal_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_chem_basic_diesel_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_diesel_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_chem_basic_fueloil_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_fueloil_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_chem_basic_lpg_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_lpg_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_chem_basic_opetpro_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_opetpro_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_chem_basic_gas_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_gas_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_chem_basic_biomass_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_biomass_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_chem_basic_orenew_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_orenew_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_chem_basic_ofossil_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_ofossil_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_chem_basic_elec_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_elec_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_basic_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_chem_basic_heatnet_fec_2018")
        / f.fact("Fact_I_S_chem_basic_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an Grundstoffchemie inkl. Ammoniak 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_basic_heatnet_fec_2018/Fact_I_P_chem_basic_fec_2018",
            "reference": "AG EB 2018 Zeile 49",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_chem_other_coal_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_coal_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_chem_other_diesel_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_diesel_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_chem_other_fueloil_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_fueloil_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_chem_other_lpg_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_lpg_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_chem_other_opetpro_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_opetpro_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_chem_other_gas_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_gas_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_chem_other_biomass_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_biomass_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_chem_other_orenew_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_orenew_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_chem_other_ofossil_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_ofossil_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_chem_other_elec_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_elec_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_chem_other_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_chem_other_heatnet_fec_2018")
        / f.fact("Fact_I_S_chem_other_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an sonstige Chemieindustrie 2018 (WZ 20 21 ohne 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_chem_other_heatnet_fec_2018/Fact_I_P_chem_other_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_metal_nonfe_coal_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_coal_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_metal_nonfe_diesel_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_diesel_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_metal_nonfe_fueloil_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_fueloil_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_metal_nonfe_lpg_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_lpg_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_metal_nonfe_opetpro_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_opetpro_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_metal_nonfe_gas_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_gas_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_metal_nonfe_biomass_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_biomass_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_metal_nonfe_orenew_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_orenew_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_metal_nonfe_ofossil_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_ofossil_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_metal_nonfe_elec_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_elec_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_nonfe_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_metal_nonfe_heatnet_fec_2018")
        / f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an Nichteisenmetalle 2018 (WZ 24.4 24.5)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_nonfe_heatnet_fec_2018/Fact_I_S_metal_nonfe_fec_2018",
            "reference": "AG EB 2018 Zeile 55",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_other_paper_coal_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_coal_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_other_paper_diesel_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_diesel_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_other_paper_fueloil_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_fueloil_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_other_paper_lpg_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_lpg_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_other_paper_opetpro_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_opetpro_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_other_paper_gas_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_gas_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_other_paper_biomass_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_biomass_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_other_paper_orenew_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_orenew_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_other_paper_ofossil_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_ofossil_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_other_paper_elec_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_elec_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_paper_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_other_paper_heatnet_fec_2018")
        / f.fact("Fact_I_S_other_paper_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an Papierindustrie 2018 (WZ 17)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_paper_heatnet_fec_2018/Fact_I_S_other_paper_fec_2018",
            "reference": "AG EB 2018 Zeile 48",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_other_food_coal_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an ErnÃ¤hrungsindustrie 2018 (WZ 10 11 12)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_food_coal_fec_2018/Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 47",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_other_food_diesel_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an ErnÃ¤hrungsindustrie 2018 (WZ 10 11 12)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_food_diesel_fec_2018/Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 47",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_other_food_fueloil_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an ErnÃ¤hrungsindustrie 2018 (WZ 10 11 12)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_food_fueloil_fec_2018/Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 47",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_other_food_lpg_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an ErnÃ¤hrungsindustrie 2018 (WZ 10 11 12)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_food_lpg_fec_2018/Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 47",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_other_food_opetpro_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an ErnÃ¤hrungsindustrie 2018 (WZ 10 11 12)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_food_opetpro_fec_2018/Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 47",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_other_food_gas_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an ErnÃ¤hrungsindustrie 2018 (WZ 10 11 12)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_food_gas_fec_2018/Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 47",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_other_food_biomass_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an ErnÃ¤hrungsindustrie 2018 (WZ 10 11 12)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_food_biomass_fec_2018/Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 47",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_other_food_orenew_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an ErnÃ¤hrungsindustrie 2018 (WZ 10 11 12)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_food_orenew_fec_2018/Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 47",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_other_food_elec_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an ErnÃ¤hrungsindustrie 2018 (WZ 10 11 12)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_food_elec_fec_2018/Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 47",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_other_food_ofossil_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Hilfsspalte fÃ¼r Berechnung",
            "unit": "%",
            "rationale": "Keine Emissionen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_food_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_other_food_heatnet_fec_2018")
        / f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an ErnÃ¤hrungsindustrie 2018 (WZ 10 11 12)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_food_heatnet_fec_2018/Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 47",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_constr_roadrail_ratio_wage_to_emplo_2018",
        f.fact("Fact_T_D_constr_roadrail_wage_2018")
        / f.fact("Fact_T_D_constr_roadrail_emplo_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": 'Personalkosten "Bau von StraÃŸen und Bahnverkehrstrecken" (WZ 42.1) pro Person und Jahr 2018',
            "unit": "â‚¬",
            "rationale": "Fact_B_P_constr_main_wage_2018/Fact_B_P_constr_main_emplo_2018",
            "reference": "destatis 2018 Kostenstruktur der Rechtlichen Einheiten im Baugewerbe S.69/75",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_mlg_Car_2018_ifeu",
        f.fact("Fact_T_D_mlg_Car_it_ot_2018_ifeu")
        + f.fact("Fact_T_D_mlg_Car_ab_2018_ifeu"),
        {
            "note HS": "",
            "group": "ui",
            "description": "PKW-Fahrleistung bundesweit (ifeu)",
            "unit": "Fahrz-km",
            "rationale": "zum Abgleich BundesTest, Summe aus Fact_T_D_mlg_Car_it_at_2018_ifeu und Fact_T_D_mlg_Car_ab_2018_ifeu",
            "reference": "ifeu 2021 (direkt gegen GebÃ¼hr bereitgestellte Daten)",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Car_ratio_mlg_to_stock_2018",
        f.fact("Fact_T_D_trnsprt_ppl_Car_2018") / f.fact("Fact_T_S_Car_stock_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung MIV (=PKW) 2018",
            "unit": "Pkm/Fz",
            "rationale": "berechnet aus Bestand PkW und BefÃ¶rderungsleistung PkW 2018",
            "reference": "Uba 2020 S. 43 Tab 10, UBA 2020, S.41",
            "link": "https://www.umweltbundesamt.de/publikationen/aktualisierung-tremod-2020 ; https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Transport-Verkehr/Personenverkehr/Publikationen/Downloads-Personenverkehr/personenverkehr-busse-Bahnen-jahr-2080310187004.html",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_mlg_LDT_2018_ifeu",
        f.fact("Fact_T_D_mlg_LDT_it_ot_2018_ifeu")
        + f.fact("Fact_T_D_mlg_LDT_ab_2018_ifeu"),
        {
            "note HS": "",
            "group": "ui",
            "description": "LNF-Fahrleistung bundesweit (ifeu)",
            "unit": "Fahrz-km",
            "rationale": "zum Abgleich BundesTest, Summe aus Fact_T_D_mlg_Car_it_at_2018_ifeu und Fact_T_D_mlg_Car_ab_2018_ifeu",
            "reference": "ifeu 2021 (direkt gegen GebÃ¼hr bereitgestellte Daten)",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_trnsprt_gds_LDT_2018",
        f.fact("Fact_T_D_trnsprt_gds_Rd_2018")
        - f.fact("Fact_T_D_trnsprt_gds_MHD_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Bundesweite Transportleistung LNF",
            "unit": "t-km",
            "rationale": "Berrechnet aus Fact_T_D_trnsprt_gds_Rd_2018 und Fact_T_D_trnsprt_gds_MHD_2018; Annahme: Differenz entspricht Transportleistung LDT",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_mlg_MHD_2018_ifeu",
        f.fact("Fact_T_D_mlg_MHD_it_ot_2018_ifeu")
        + f.fact("Fact_T_D_mlg_MHD_ab_2018_ifeu"),
        {
            "note HS": "",
            "group": "ui",
            "description": "SNF-Fahrleistung bundesweit (ifeu)",
            "unit": "Fahrz-km",
            "rationale": "zum Abgleich BundesTest, Summe aus Fact_T_D_mlg_Car_it_at_2018_ifeu und Fact_T_D_mlg_Car_ab_2018_ifeu",
            "reference": "ifeu 2021 (direkt gegen GebÃ¼hr bereitgestellte Daten)",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_MHD_ratio_mlg_to_stock_2018",
        f.fact("Fact_T_D_trnsprt_gds_MHD_2018") / f.fact("Fact_T_S_MHD_stock_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung SNF 2018",
            "unit": "t-km/Fz",
            "rationale": "berechnet aus Bestand SNF und Transportleistung SNF 2018",
            "reference": "Uba 2020 S. 44 Tab 12, Destatis 2020 S. 10",
            "link": "https://www.umweltbundesamt.de/publikationen/aktualisierung-tremod-2020 ; https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Transport-Verkehr/Personenverkehr/Publikationen/Downloads-Personenverkehr/personenverkehr-busse-Bahnen-jahr-2080310187004.html",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_lf_ppl_Bus_2018",
        f.fact("Fact_T_D_trnsprt_ppl_Bus_2018")
        / f.fact("Fact_T_D_mlg_Bus_2018_Destatis"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Bus-Auslastung Personen Bundesschnitt",
            "unit": "Pers/Fz",
            "rationale": "berechnet aus Fact_T_D_mlg_Bus_2018 und Fact_T_D_trnsprt-ppl_Bus_2018, wird als konstant fÃ¼r alle StraÃŸenarten angenommen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Bus_ratio_mlg_to_stock_2018",
        f.fact("Fact_T_D_mlg_Bus_2018_Destatis") / f.fact("Fact_T_S_Bus_stock_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung Liniennahbus 2018",
            "unit": "Fz-km/Fz",
            "rationale": "berechnet aus Bestand Liniennahbus und Busfahrleistung 2018",
            "reference": "Uba 2020 S. 147 Tab 83, Destatis 2020 S. 10",
            "link": "https://www.umweltbundesamt.de/publikationen/aktualisierung-tremod-2020 ; https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Transport-Verkehr/Personenverkehr/Publikationen/Downloads-Personenverkehr/personenverkehr-busse-Bahnen-jahr-2080310187004.html",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_bus_ratio_mlg_to_driver_2018",
        f.fact("Fact_T_D_mlg_Bus_2018_Destatis") / f.fact("Fact_T_S_Bus_driver_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung Busfahrer:in",
            "unit": "Fz-km/Busfahrer:innen",
            "rationale": "Berechnet aus Busfahrleistung gesamt und BeschÃ¤ftigte im Busfahrdienst",
            "reference": "Destatis 2020 S. 10 & S. 40",
            "link": "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Transport-Verkehr/Personenverkehr/Publikationen/Downloads-Personenverkehr/personenverkehr-busse-Bahnen-jahr-2080310187004.pdf;jsessionid=9C7438F3373F9489C041B0FBE29ECE3F.live741?__blob=publicationFile",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_rail_gds_ratio_tkm_to_fzkm_2018",
        f.fact("Fact_T_D_Rl_train_nat_trnsprt_gds_2018")
        / f.fact("Fact_T_D_rail_gds_mlg_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Transportmenge GÃ¼terzug",
            "unit": "t/Fz",
            "rationale": "Berechnet aus  Transportleistung und Zugkilometern im GÃ¼terverkehr",
            "reference": "Destatis 2021 Eisenbahnverkehr Betriebsdaten des Schienenverkehrs 2020 S. 15",
            "link": "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Transport-Verkehr/Unternehmen-Infrastruktur-Fahrzeugbestand/Publikationen/Downloads-Betriebsdaten-Schienenverkehr/betriebsdaten-schienenverkehr-2080210207004.pdf?__blob=publicationFile",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_rail_gds_ratio_wagon_to_engine",
        f.fact("Fact_T_D_rail_gds_wagon_2015")
        / f.fact("Fact_T_D_rail_gds_engine_2015"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Anzahl Waggons pro Lok im SchienengÃ¼terverkehr 2015",
            "unit": "Fz/Fz",
            "rationale": "Ein GÃ¼terzug besteht im Schnitt aus einer Lok und 54 Waggons. Berechnung =Fact_T_D_rail_gds_wagon_2015/Fact_T_D_rail_gds_engine_2015",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_rail_gds_ratio_mlg_to_vehicle",
        f.fact("Fact_T_D_Rl_train_nat_trnsprt_gds_2018")
        / f.fact("Fact_T_D_rail_gds_engine_2015"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung GÃ¼terwagen",
            "unit": "t-km/Fz",
            "rationale": "Die Transportleistung wird auf die Gesamtanzahl der ZÃ¼ge (Lok+54 Waggons) umgelegt. Berechnung =Fact_T_D_Rl_train_nat_trnsprt_gds_2018/Fact_T_D_rail_gds_engine_2015",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_rail_ppl_ratio_mlg_to_vehicle",
        f.fact("Fact_T_D_rail_ppl_mlg_2018") / f.fact("Fact_T_D_rail_ppl_vehicle_2015"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung Eisenbahn",
            "unit": "Fz-km/Fz",
            "rationale": "Berechnung =Fact_T_D_rail_metro_mlg_2018/Fact_T_D_rail_metro_vehicle_2014",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_rail_ratio_mlg_to_driver",
        (f.fact("Fact_T_D_rail_gds_mlg_2018") + f.fact("Fact_T_D_rail_ppl_mlg_2018"))
        / f.fact("Fact_T_D_rail_driver_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung LokfÃ¼hrer",
            "unit": "Fahrz-km / LokfÃ¼hrer",
            "rationale": "Berechnet aus Verkehrsleistung im Personen- und GÃ¼terverkehr und den BeschÃ¤ftigten LokfÃ¼hrern",
            "reference": "Allianz pro Schiene , UBA 2020 S.72-75",
            "link": "https://www.allianz-pro-schiene.de/themen/arbeitsplaetze/lokfuehrer/ ; https://www.umweltbundesamt.de/publikationen/aktualisierung-tremod-2020",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_lf_Rl_Metro_2018",
        f.fact("Fact_T_D_trnsprt_ppl_Rl_Metro_2018")
        / f.fact("Fact_T_D_rail_metro_mlg_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "SSU-Bahn-Auslastung Bundesschnitt",
            "unit": "Pers/Fz",
            "rationale": "berechnet aus Fact_T_D_trnsprt_ppl_Rl_Metro_2018 und Fact_T_D_rail_metro_mlg_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_rail_metro_ratio_mlg_to_vehicle",
        f.fact("Fact_T_D_rail_metro_mlg_2018")
        / f.fact("Fact_T_D_rail_metro_vehicle_2014"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung SSU Fahrzeug",
            "unit": "Fz-km/Fz",
            "rationale": "Berechnung =Fact_T_D_rail_metro_mlg_2018/Fact_T_D_rail_metro_vehicle_2014",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_metro_ratio_mlg_to_driver",
        f.fact("Fact_T_D_rail_metro_mlg_2018") / f.fact("Fact_T_D_metro_driver_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung StraÃŸenbahnfahrer",
            "unit": "Fz-km/ StraÃŸenbahnfahrer",
            "rationale": "Berechnet aus StraÃŸenbahnfahrleistung gesamt und BeschÃ¤ftigte im Fahrdienst StraÃŸenbahnen",
            "reference": "Destatis 2020 S. 10 & Allianz pro Schiene",
            "link": "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Transport-Verkehr/Personenverkehr/Publikationen/Downloads-Personenverkehr/personenverkehr-busse-Bahnen-jahr-2080310187004.pdf;jsessionid=9C7438F3373F9489C041B0FBE29ECE3F.live741?__blob=publicationFile ; https://www.allianz-pro-schiene.de/themen/arbeitsplaetze/lokfuehrer/",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_Shp_dmstc_nat_ratio_mlg_to_vehicle",
        f.fact("Fact_T_D_Shp_dmstc_nat_mlg_2018")
        / f.fact("Fact_T_D_Shp_dmstc_nat_vehicle_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung deutsches Binnenschiff",
            "unit": "t-km/Fz",
            "rationale": 'Da der "Bestand" der auslÃ¤ndischen Flotte, die Binnenschifffahrt in Deutschland betreibt, nicht so gut erhoben werden kann, wird die durchschnittliche Transportleistung in der Binnenschifffahrt der deutschen Binnenschiffflotte herangezogen.,\nBerechnung =Fact_T_D_rail_metro_mlg_2018/Fact_T_D_rail_metro_vehicle_2014',
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_shp_ratio_mlg_to_driver",
        f.fact("Fact_T_D_Shp_dmstc_trnsprt_gds_2018")
        / f.fact("Fact_T_D_shp_emplo_inland_water_transport"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Verkehrsleistung Binnenschiffer",
            "unit": "tkm/BeschÃ¤ftigte",
            "rationale": "Berechnet aus Transportleistung in der Binnnenschifffahrt und BeschÃ¤ftigten Binnenschiffern",
            "reference": 'Destatis 2021 "Daten zu Unternehmen der Binnenschifffahrt fÃ¼r die Jahre 2015 bis 2019"',
            "link": "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Transport-Verkehr/Unternehmen-Infrastruktur-Fahrzeugbestand/Tabellen/unternehmen.html",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Air_nat_EB_inter_2018",
        f.fact("Fact_T_D_Air_nat_EB_2018") - f.fact("Fact_T_S_Air_nat_EB_dmstc_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "...entsprechend durch AuslandsflÃ¼ge verbrauchtes Kerosin (in TJ)",
            "unit": "MWh",
            "rationale": "berechnet aus oberen beiden Zeilen; vergl dazu auch 407,7 T Joule in NIR ",
            "reference": "UBA 2021 NIR S. 163",
            "link": "https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2021-05-19_cc_43-2021_nir_2021_1.pdf",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Car_frac_elec_usage_phev_2020",
        f.fact("Fact_T_S_Car_frac_company_2019")
        * f.fact("Fact_T_S_Car_frac_elec_usage_company_phev_2020")
        + (1 - f.fact("Fact_T_S_Car_frac_company_2019"))
        * f.fact("Fact_T_S_Car_frac_elec_usage_private_phev_2020"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Realer elektrischer Nutzungsanteil von PHEV 2020",
            "unit": "%",
            "rationale": "Errechnet sich nÃ¤herungsweise aus Fact_T_S_frac_elec-usage_private_phev_Car_2020, Fact_T_S_frac_elec-usage_company_phev_Car_2020, Fact_T_S_frac_company_Car_2019",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Car_frac_petrol_without_phev_mlg_2018",
        f.fact("Fact_T_S_Car_frac_petrol_stock_2018")
        * 1
        / (
            f.fact("Fact_T_S_Car_frac_petrol_stock_2018") * 1
            + f.fact("Fact_T_S_Car_frac_diesel_stock_2018") * 1.9
            + f.fact("Fact_T_S_Car_frac_lpg_stock_2018") * 1.7
            + f.fact("Fact_T_S_Car_frac_cng_stock_2018") * 1.8
            + f.fact("Fact_T_S_Car_frac_bev_stock_2018") * 0.8
            + f.fact("Fact_T_S_Car_frac_phev_stock_2018") * 1.4
        ),
        {
            "note HS": "",
            "group": "ui",
            "description": "Anteil Antriebsart Benzin ohne PHEV an PKW-Fahrleistung",
            "unit": "%",
            "rationale": "Errechnet sich aus Fact_T_S_frac_petrol_stock_Car_2018, Fact_T_S_frac_diesel_stock_Car_2018, Fact_T_S_frac_lpg_stock_Car_2018, Fact_T_S_frac_cng_stock_Car_2018, Fact_T_S_frac_bev_stock_Car_2018, Fact_T_S_frac_phev_stock_Car_2018, die Fahrleistung der Diesel-PKW liegt um den Faktor 1,9 hÃ¶her zur Fahrleistung der Benzin-PKW, die Fahrleistung der LPG-PKW liegt um den Faktor 1,7 hÃ¶her zur Fahrleistung der Benzin-PKW, die Fahrleistung der CNG-PKW liegt um den Faktor 1,8 hÃ¶her zur Fahrleistung der Benzin-PKW, Die Fahrleistung der BEV-PKW liegt um den Faktor 0,8 hÃ¶her zur Fahrleistung der Benzin-PKW, Die Fahrleistung der PHEV-PKW liegt um den Faktor 1,4 hÃ¶her zur Fahrleistung der Benzin-PKW",
            "reference": "UBA 2020, S.179",
            "link": "https://www.umweltbundesamt.de/publikationen/aktualisierung-tremod-2019",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Bus_frac_diesel_with_hybrid_stock_2018",
        f.fact("Fact_T_S_Bus_frac_diesel_stock_2018")
        + f.fact("Fact_T_S_Bus_frac_hybrid_stock_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil Antriebsart Diesel mit Hybrid an Linienbus-Bestand 2018",
            "unit": "%",
            "rationale": "Annahme dass alle Bustypen Ã¤hnliche Fahrleistungen erbringen; Summe in Quelle ergibt nicht 100% , daher Korrektur Ã¼ber Normierung; Annahme, dass alle Hybrid Diesel-Hybrid mit Ã¤hnlichem Energieverbrauch sind",
            "reference": "UBA 2020 S. 46 Tab.13",
            "link": "https://www.umweltbundesamt.de/publikationen/aktualisierung-tremod-2019",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_Rl_train_nat_trnsprt_gds_elec_2018",
        f.fact("Fact_T_D_Rl_train_nat_trnsprt_gds_2018")
        - f.fact("Fact_T_D_Rl_train_nat_trnsprt_gds_diesel_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Transportleistung SchienengÃ¼terverkehr Strom",
            "unit": "t km",
            "rationale": "Berechnet aus Fact_T_D_Rl_train_nat_trnsprt_gds_2018 und Fact_T_D_Rl_train_nat_trnsprt_gds_diesel_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_Rl_train_nat_trnsprt_ppl_short_elec_2018",
        f.fact("Fact_T_D_Rl_train_nat_trnsprt_ppl_short_2018")
        - f.fact("Fact_T_D_Rl_train_nat_trnsprt_ppl_short_diesel_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "BefÃ¶rderungsleistung Personennahverkehr Schiene Strom",
            "unit": "Pers km",
            "rationale": "Berechnet aus Fact_T_D_Rl_train_nat_trnsprt_ppl_short_2018 und Fact_T_D_Rl_train_nat_trnsprt_ppl_short_diesel_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Rl_Train_gds_diesel_SEC_2018",
        f.fact("Fact_T_S_RL_Train_gds_EC_diesel_2018")
        / f.fact("Fact_T_D_Rl_train_nat_trnsprt_gds_diesel_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "spez. Endenergieverbrauch Gueterverkehr Schiene Diesel bundesweit 2018",
            "unit": "MWh / tkm",
            "rationale": "Berechnet aus Fact_T_S_RL_Train_gds_EC_diesel_2018 und Fact_T_D_Rl_train_nat_trnsprt_gds_diesel_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Rl_Train_ppl_long_diesel_SEC_2018",
        f.fact("Fact_T_S_RL_Train_ppl_EC_diesel_2018")
        / f.fact("Fact_T_D_Rl_train_nat_trnsprt_ppl_short_diesel_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "spez. Endenergieverbrauch Personenverkehr Schiene Diesel bundesweit 2018",
            "unit": "MWh / Pkm",
            "rationale": "Berechnet aus Fact_T_S_RL_Train_ppl_EC_diesel_2018 und Fact_T_D_Rl_train_nat_trnsprt_ppl_short_diesel_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_A_P_fermen_oanimal_CO2e_2018",
        f.fact("Fact_A_P_fermen_sheep_CO2e_2018")
        + f.fact("Fact_A_P_fermen_goat_CO2e_2018")
        + f.fact("Fact_A_P_fermen_equid_CO2e_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "CO2e (CH4) Andere Tiere D 2018",
            "unit": "t CO2e/a",
            "rationale": "Berechnung =Fact_A_P_fermen_sheep_CO2e_2018+Fact_A_P_fermen_goat_CO2e_2018+Fact_A_P_fermen_equid_CO2e_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_A_P_fermen_dairycow_ratio_CO2e_to_amount_2018",
        f.fact("Fact_A_P_fermen_dairycow_CO2e_2018")
        / f.fact("Fact_A_P_fermen_dairycow_amount_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio CO2e (CH4) to MilchkÃ¼he D 2018",
            "unit": "",
            "rationale": "",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_A_P_fermen_nondairy_ratio_CO2e_to_amount_2018",
        f.fact("Fact_A_P_fermen_nondairy_CO2e_2018")
        / f.fact("Fact_A_P_fermen_nondairy_amount_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio CO2e (CH4) to Ã¼brige Rinder D 2018",
            "unit": "",
            "rationale": "",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_A_P_fermen_swine_ratio_CO2e_to_amount_2018",
        f.fact("Fact_A_P_fermen_swine_CO2e_2018")
        / f.fact("Fact_A_P_fermen_swine_amount_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio CO2e (CH4) to Schweine D 2018",
            "unit": "",
            "rationale": "",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_A_P_fermen_oanimal_amount_2018",
        f.fact("Fact_A_P_fermen_sheep_amount_2018")
        + f.fact("Fact_A_P_fermen_goat_amount_2018")
        + f.fact("Fact_A_P_fermen_equid_amount_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Tierbestand Andere Tiere D 2018",
            "unit": "",
            "rationale": "Berechnung =Fact_A_P_fermen_sheep_amount_2018+Fact_A_P_fermen_goat_amount_2018+Fact_A_P_fermen_equid_amount_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_A_P_fermen_poultry_ratio_CO2e_to_amount_2018",
        f.fact("Fact_A_P_fermen_poultry_CO2e_2018")
        / f.fact("Fact_A_P_fermen_poultry_amount_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio CO2e (CH4) to GeflÃ¼gel D 2018",
            "unit": "t CO2/Tierplatz",
            "rationale": "Berechnung =Fact_A_P_fermen_poultry_CO2e_2018/Fact_A_P_fermen_poultry_amount_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )

    f.add_derived_fact(
        "Fact_L_G_forest_conv_2018",
        f.fact("Fact_L_G_forest_area1_2018")
        * f.fact("Fact_L_G_forest_pct_of_conv_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "WaldflÃ¤che herkÃ¶mmlich bewirtscahft 2021",
            "unit": "ha",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_forest_nature_2018",
        f.fact("Fact_L_G_forest_area1_2018")
        * f.fact("Fact_L_G_forest_pct_of_nature_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "WaldfÃ¤che Naturwald 2021",
            "unit": "ha",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )

    f.add_derived_fact(
        "Fact_L_G_forest_CO2e_cb_per_ha_2018",
        f.fact("Fact_L_G_forest_CO2e_cb_2018") / f.fact("Fact_L_G_forest_conv_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Positiver Emissionsfaktor feste Biomasse (ursprÃ¼nglich aus Wald) durch energetische Nutzung Deutschland 2018",
            "unit": "t CO2e/ha",
            "rationale": "Berechnung: Fact_L_G_forest_CO2e_cb_2018/bewirtschaftete Wald-FlÃ¤che Deutschland 2018,\nBEGRÃœNDUNG ALS SONDERFALL: Die verbrennungsbedingten Emissionen von fester Biomasse (Holz aus Wald-Biomasse) mÃ¼ssten nach der Einflussbilanz eigentlich dort angerechnet werden, wo feste Biomasse verbrannt wird. Allerdings treten dabei methodische Schwierigkeiten auf. Das UBA selbst weist im NIR die cb Emissionen aus Biomasse nur nachrichtlich aus (FuÃŸnote 3 auf S. 877), d.h. setzt in seinen Bilanzen einen cb-Faktor von 0, womit wir konsistent sein mÃ¶chten. FÃ¼r einjÃ¤hrige Energiepflanzen, die meist in flÃ¼ssige und gasfÃ¶rmige Biomasse-EnergietrÃ¤ger umgewandelt werden, werden keine Negativemissionen angerechnet. FÃ¼r mehrjÃ¤hrige GewÃ¤chse (Wald) als Vorprodukte von fester Biomasse hingegen schon. Damit die methodische Bilanzierung Ã¼ber alle Biomasse-TrÃ¤ger identisch ist, werden die verbrennungsbedingten Emissionen der festen Biomasse in diesem Jahr dem Wald zugerechnet, da es sich damit ja quasi um den Aufbau von fester Biomasse handelt, die noch im selben Jahr genutzt wird und damit netto keine Emissionen eingespart hat.",
            "reference": "u.a. NIR S. 877",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_forest_nature_CO2e_2018",
        f.fact("Fact_L_G_forest_nature_2018")
        * f.fact("Fact_L_G_forest_nature_CO2e_per_ha_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Emissione Wald Naturwald",
            "unit": "",
            "rationale": "Berechnung=Fact_L_G_forest_nature_2018*D1350",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_crop_area2_minrl_soil_2018",
        f.fact("Fact_L_G_crop_area2_2018")
        - f.fact("Fact_L_G_crop_area2_org_soil_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_strict_area2_minrl_soil_2018",
        f.fact("Fact_L_G_grass_strict_area2_2018")
        - f.fact("Fact_L_G_grass_strict_area2_org_soil_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_woody_area2_minrl_soil_2018",
        f.fact("Fact_L_G_grass_woody_area2_2018")
        - f.fact("Fact_L_G_grass_woody_area2_org_soil_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_peat_area2_minrl_soil_2018",
        f.fact("Fact_L_G_wetland_peat_area2_2018")
        - f.fact("Fact_L_G_wetland_peat_area2_org_soil_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_water_area2_minrl_soil_2018",
        f.fact("Fact_L_G_wetland_water_area2_2018")
        - f.fact("Fact_L_G_wetland_water_area2_org_soil_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_settl_area2_minrl_soil_2018",
        f.fact("Fact_L_G_settl_area2_2018")
        - f.fact("Fact_L_G_settl_area2_org_soil_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden ",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_fen",
        f.fact("Fact_L_G_org_soil_fen_UniGr_2012")
        / f.fact("Fact_L_G_org_soil_area_tot_UniGr_2012"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Anteil Niedermoore an der gesamten MoorflÃ¤che",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_bog",
        f.fact("Fact_L_G_org_soil_bog_UniGr_2012")
        / f.fact("Fact_L_G_org_soil_area_tot_UniGr_2012"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Anteil Hochmoore an der gesamten MoorflÃ¤che",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_other_minrl_soil_CO2e_per_ha_2018",
        f.fact("Fact_L_G_other_minrl_soil_CO2e_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mineralischer Boden",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 686",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wood_CO2e_per_ha_2018",
        f.fact("Fact_L_G_wood_CO2e_DE_2018") / f.fact("Fact_L_G_forest_conv_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Holzprodukte",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S.688",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_P_biochar_ratio_CO2e_pb_to_prodvol",
        (-1)
        * f.fact("Fact_M_emission_ratio_CO2_to_C")
        * f.fact("Fact_L_P_biochar_pct_of_C"),
        {
            "note HS": "",
            "group": "ud",
            "description": "prozessbasierte CO2e (eingespeichert) pro produzierte t Pflanzenkohle",
            "unit": "t CO2e/t Produkt",
            "rationale": "Bei der Produktion einer Tonne Pflanzenkohle mit einem C-Gehalt von 65% wird mit dem CO2 zu C Faktor 42/12 jeweils 2,3 t CO2â‚¬ eingespeichert. Berechnung =-Fact_M_emission_ratio_CO2_to_C*Fact_L_P_biochar_pct_of_C",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_W_P_landfilling_CO2e_pb_2018_per_capita",
        f.fact("Fact_W_P_landfilling_CO2e_pb_2018")
        / f.fact("Fact_M_population_germany_refyear"),
        {
            "note HS": "",
            "group": "ud",
            "description": "nationale THG Emissionen Abfalldeponierung (5a) 2018 pro Kopf",
            "unit": "t CO2e/a pro Kopf",
            "rationale": "Berechnung =Fact_W_P_landfilling_CO2e_pb_2018/Fact_M_population_germany_refyear",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_W_P_organic_treatment_CO2e_pb_2018",
        f.fact("Fact_W_P_organic_treatment_compost_and_ferm_CO2e_pb_CH4_2018")
        + f.fact("Fact_W_P_organic_treatment_compost_and_ferm_CO2e_pb_N2O_2018")
        + f.fact("Fact_W_P_organic_treatment_mech_biol_CO2e_pb_CH4_2018")
        + f.fact("Fact_W_P_organic_treatment_mech_biol_CO2e_pb_N2O_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "5B+5E prozessbedingte Emissionen 2018 aus Kompostierung, VergÃ¤rung und mechanisch-biologischer Abfallbehandlung in t CO2e",
            "unit": "t Co2e",
            "rationale": "Berechnung =Fact_W_P_organic_treatment_compost_and_ferm_CO2e_pb_CH4_2018+Fact_W_P_organic_treatment_compost_and_ferm_CO2e_pb_N2O_2018+Fact_W_P_organic_treatment_mech_biol_CO2e_pb_CH4_2018+Fact_W_P_organic_treatment_mech_biol_CO2e_pb_N2O_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_W_P_organic_treatment_prodvol_2018_per_capita",
        f.fact("Fact_W_P_organic_treatment_prodvol_2018")
        / f.fact("Fact_M_population_germany_refyear"),
        {
            "note HS": "",
            "group": "ud",
            "description": "5B+5E Produktionsmenge aus biologischer Behandlung in t pro Kopf",
            "unit": "t pro Kopf",
            "rationale": "Berechnung =Fact_W_P_organic_treatment_prodvol_2018/Fact_M_population_germany_refyear",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_W_P_wastewater_prodvol_2018_per_capita",
        f.fact("Fact_W_P_wastewater_prodvol_2017")
        / f.fact("Fact_M_population_germany_refyear"),
        {
            "note HS": "",
            "group": "ud",
            "description": "5D Produktionsmenge KlÃ¤rschlamm aus Abwasserbehandlung  in t pro Kopf",
            "unit": "t pro Kopf",
            "rationale": "Berechnung =Fact_W_P_wastewater_prodvol_2017/Fact_M_population_germany_refyear",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_W_P_wastewater_CO2e_pb_2018_per_prodvol",
        f.fact("Fact_W_P_wastewater_CO2e_pb_2018")
        / f.fact("Fact_W_P_wastewater_prodvol_2017"),
        {
            "note HS": "",
            "group": "ud",
            "description": "5D Emissionsfaktor fÃ¼rAbwasserbeahndlung in t CO2e/a pro t Produktionsmenge",
            "unit": "t CO2e/t",
            "rationale": "Berechnung =Fact_W_P_wastewater_CO2e_pb_2018/Fact_W_P_wastewater_prodvol_2017",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_W_P_wastewater_fec_elec_2018",
        f.fact("Fact_E_P_elec_prodvol_netto_2018")
        * f.fact("Fact_W_P_wastewater_fec_elec_pct_of_Ger_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Stromverbrauch Abwasserbehandlung Deutschland 2018",
            "unit": "MWh",
            "rationale": "Berechnung =Fact_E_P_elec_prodvol_netto_2018*Fact_W_P_wastewater_fec_elec_pct_of_Ger_2018",
            "reference": "Berechnung",
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
        "Fact_I_P_miner_ratio_fec_to_industry_2018",
        f.fact("Fact_I_S_miner_fec_2018") / f.fact("Fact_I_S_fec_2018"),
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
    f.add_derived_fact(
        "Fact_I_P_miner_cement_CO2e_cb_2018",
        f.fact("Fact_I_P_miner_cement_CO2e_cb_2017")
        * f.fact("Fact_I_P_miner_CO2e_cb_2018")
        / f.fact("Fact_I_P_miner_CO2e_cb_2015_2017"),
        {
            "note HS": "umbenennen zu Fact_I_P_miner_cement_CO2e_cb_2018",
            "group": "ui",
            "description": "Energiebedingte CO2-Emissionen Zementindustrie 2018",
            "unit": "t",
            "rationale": "7,1 Mt (BMWI 2017) werden mit 13,8 Mt (NIR 2018)/16,0 Mt (BMWi 2015-2017) auf NIR-Niveau 2018 skaliert",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_chalk_CO2e_cb_2018",
        f.fact("Fact_I_P_miner_chalk_CO2e_cb_2016")
        * f.fact("Fact_I_P_miner_CO2e_cb_2018")
        / f.fact("Fact_I_P_miner_CO2e_cb_2015_2017"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Energiebedingte CO2-Emissionen Kalkindustrie 2018",
            "unit": "",
            "rationale": "2,3 Mt (BMWI 2016) werden mit 13,8 Mt (NIR 2018)/16,0 Mt (BMWi 2015-2017) auf NIR-Niveau 2018 skaliert",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_ceram_CO2e_cb_2018",
        f.fact("Fact_I_P_miner_ceram_CO2e_cb_2016")
        * f.fact("Fact_I_P_miner_CO2e_cb_2018")
        / f.fact("Fact_I_P_miner_CO2e_cb_2015_2017"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Energiebedingte CO2-Emissionen Keramikindustrie 2018",
            "unit": "",
            "rationale": "2,5 Mt (2016) werden mit 13,8 Mt (NIR 2018)/16,0 Mt (BMWi 2015-2017) auf NIR-Niveau 2018 skaliert",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_glas_CO2e_cb_2018",
        f.fact("Fact_I_P_miner_glas_CO2e_cb_2015")
        * f.fact("Fact_I_P_miner_CO2e_cb_2018")
        / f.fact("Fact_I_P_miner_CO2e_cb_2015_2017"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Energiebedingte CO2-Emissionen Glasindustrie 2018 ",
            "unit": "t",
            "rationale": "3,9 Mt (2015) werden mit 13,8 Mt (NIR 2018)/16,0 Mt (BMWi 2015-2017) auf NIR-Niveau 2018 skaliert",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_secondary_CO2e_cb_2018",
        f.fact("Fact_I_P_metal_steel_CO2e_cb_2018")
        - f.fact("Fact_I_P_metal_steel_primary_CO2e_cb_2018")
        - f.fact("Fact_I_P_metal_nonfe_foundries_CO2e_cb_2018"),
        {
            "note HS": "umbenennen zu Fact_I_P_metal_steel_secondary_CO2e_cb_2018",
            "group": "ui",
            "description": "Energiebedingte CO2e Stahlerzeugung (WZ 24.1 bzw. CRF 1.A.2.a) SekundÃ¤rroute 2018",
            "unit": "t",
            "rationale": "Alle eb Emissionen der Stahl- und Eisenherstellung in CRF 1.A.2.a entfallen auf PrimÃ¤rroute, EisengieÃŸereien und SekundÃ¤rroute. Der NIR weist fÃ¼r die PrimÃ¤rroute explizit Zahlen aus (S. 342), fÃ¼r die SekundÃ¤rroute jedoch nicht. Daher muss die Subtraktion der Gesamtsumme erfolgen. Wenn man sich das Diagramm auf NIR S. 188 anschaut, entfÃ¤llt ein GroÃŸteil dieser Emissionen jedoch eigentlich auf die nachgelagerte Sinter- und Walzstahlproduktion, von der ein Teil auch in den eb Emissionen der PrimÃ¤rroute enthalten sind.",
            "reference": "NIR 2020 S. 187f",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_CO2e_pb_2018",
        f.fact("Fact_I_P_metal_steel_primary_CO2e_pb_2018")
        + f.fact("Fact_I_P_metal_steel_secondary_CO2e_pb_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Prozessbedingte CO2e Stahlerzeugung (WZ 24.1 bzw. CRF 2.C.1)  2018",
            "unit": "t",
            "rationale": 'Summe der drei aufgefÃ¼hrten THG in CRF 2.C.1 "Eisen- und Stahlproduktion"',
            "reference": "NIR 2020, S. 339",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_primary_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_metal_steel_primary_CO2e_cb_2018")
        / f.fact("Fact_I_P_metal_steel_primary_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "eb CO2e/Produktionsmenge Faktor Stahlerzeugung (WZ 24.1) PrimÃ¤rroute 2018",
            "unit": "",
            "rationale": "Berechnung",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_primary_ratio_CO2e_pb_to_prodvol",
        f.fact("Fact_I_P_metal_steel_primary_CO2e_pb_2018")
        / f.fact("Fact_I_P_metal_steel_primary_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "pb CO2e/Produktionsmenge Faktor Stahlerzeugung (WZ 24.1) PrimÃ¤rroute 2018",
            "unit": "",
            "rationale": "Berechnung",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_primary_ratio_prodvol_to_fec",
        f.fact("Fact_I_P_metal_steel_primary_prodvol_2018")
        / (
            f.fact("Fact_I_P_metal_steel_primary_DRI_prodvol_2018")
            * f.fact("Fact_I_P_metal_steel_primary_DRI_ratio_fec_to_prodvol_2018")
            + f.fact("Fact_I_P_metal_steel_primary_HKR_prodvol_2018")
            * f.fact("Fact_I_P_metal_steel_primary_HKR_ratio_fec_to_prodvol_2018")
        ),
        {
            "note HS": "",
            "group": "ud",
            "description": "Produktionsmenge/EEV Faktor Stahlerzeugung (WZ 24.1) PrimÃ¤rroute HKR+DRI kombiniert. Berechneter Kehrwert",
            "unit": "t/MWh",
            "rationale": "Durchschnittlicher Faktor fÃ¼r die PrimÃ¤rroute 2018 basierend auf Produktionsmengen 2018 und den spezifischen Faktoren beider PrimÃ¤rroutenverfahren. BrÃ¼che bzw. 1/ Operationen wurden weggekÃ¼rzt.",
            "reference": "siehe verwendete Fakten",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_secondary_ratio_prodvol_to_fec",
        1
        / (
            f.fact("Fact_I_P_metal_steel_secondary_ratio_fec_elec_to_prodvol_2018")
            + f.fact("Fact_I_P_metal_steel_secondary_ratio_fec_gas_to_prodvol_2018")
            + f.fact("Fact_I_P_metal_steel_further_ratio_fec_to_prodvol_2018")
        ),
        {
            "note HS": "",
            "group": "ud",
            "description": "Produktionsmenge/EEV Faktor Stahlerzeugung (WZ 24.1) SekundÃ¤rroute 2015. Berechneter Kehrwert",
            "unit": "t/MWh",
            "rationale": "Das Elektrostahlverfahren weist einen Stromverbrauch von durchschnittlich 530 kWh und einen Brennstoffbedarf von etwa 84 kWh44 pro Tonne Rohstahl (Gussstahl)45 auf.",
            "reference": "bmwi 2019 S. 9",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_2018",
        f.fact("Fact_I_S_metal_steel_primary_HKR_fec_2018")
        + f.fact("Fact_I_S_metal_steel_primary_DRI_fec_2018"),
        {
            "note HS": "umbenennen zu Fact_I_S_metal_steel_primary_fec_2018",
            "group": "ui",
            "description": "EEV Stahlerzeugung (WZ 24.1) 2018 PrimÃ¤rroute kombiniert",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_fec_pct_of_steel_secondary",
        f.fact("Fact_I_S_metal_steel_secondary_fec_2018")
        / f.fact("Fact_I_S_metal_steel_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "EEV Stahlerzeugung (WZ 24.1) 2018 Anteil SekundÃ¤rroute",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_metal_steel_secondary_diesel_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "",
            "rationale": "Keine Emissionen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_metal_steel_secondary_fueloil_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "",
            "rationale": "Keine Emissionen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_metal_steel_secondary_lpg_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "",
            "rationale": "Keine Emissionen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_metal_steel_secondary_opetpro_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "",
            "rationale": "Keine Emissionen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_metal_steel_secondary_gas_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 24.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_secondary_gas_fec_2018/Fact_I_P_metal_steel_secondary_fec_2018",
            "reference": "AG EB 2018 Zeile 54",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_metal_steel_secondary_coal_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 24.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_secondary_coal_fec_2018/Fact_I_P_metal_steel_secondary_fec_2018",
            "reference": "AG EB 2018 Zeile 54",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_metal_steel_secondary_biomass_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "",
            "rationale": "Keine Emissionen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_metal_steel_secondary_orenew_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "",
            "rationale": "Keine Emissionen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_metal_steel_secondary_ofossil_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "",
            "rationale": "Keine Emissionen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_metal_steel_secondary_elec_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 24.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_secondary_elec_fec_2018/Fact_I_P_metal_steel_secondary_fec_2018",
            "reference": "AG EB 2018 Zeile 54",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_secondary_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_metal_steel_secondary_heatnet_fec_2018")
        / f.fact("Fact_I_S_metal_steel_secondary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an Stahlerzeugung SekundÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "",
            "rationale": "Keine Emissionen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_nonfe_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_metal_nonfe_CO2e_cb_2018")
        / f.fact("Fact_I_P_metal_nonfe_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio cb CO2e to production volume non-ferrous metals 2018",
            "unit": "",
            "rationale": "Die WVMetalle gibt keine Emissionen an, hÃ¤lt es aber ebenso fÃ¼r legitim, aus der gesamten Produktionsmenge und dem gesamten Energieeinsatz einen Faktor pro t zu machen.",
            "reference": "WVMetalle 2018, S.3",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_lf_ppl_Car_2018",
        f.fact("Fact_T_D_trnsprt_ppl_Car_2018") / f.fact("Fact_T_D_mlg_Car_2018_ifeu"),
        {
            "note HS": "",
            "group": "ud",
            "description": "MIV-Auslastung Personen Bundesschnitt",
            "unit": "Pers/Fz",
            "rationale": "berechnet aus Fact_T_D_mlg_Car_2018_ifeu und Fact_T_D_trnsprt-ppl_Car_2018, wird als konstant fÃ¼r alle StraÃŸenarten angenommen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_lf_gds_LDT_2018",
        f.fact("Fact_T_D_trnsprt_gds_LDT_2018") / f.fact("Fact_T_D_mlg_LDT_2018_ifeu"),
        {
            "note HS": "",
            "group": "ud",
            "description": "LNF Auslastung GÃ¼ter Bundesschnitt",
            "unit": "t/Fz",
            "rationale": "berechnet aus Fact_T_D_trnsprt_gds_LDT_2018 und Fact_T_D_mlg_LDT_2018_ifeu, wird als konstant fÃ¼r alle StraÃŸenarten angenommen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_LDT_ratio_mlg_to_stock_2018",
        f.fact("Fact_T_D_trnsprt_gds_LDT_2018") / f.fact("Fact_T_S_LDT_stock_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung LNF 2018",
            "unit": "t-km/Fz",
            "rationale": "berechnet aus Bestand LNF und Transportleistung LNF 2018",
            "reference": "Uba 2020 S. 44 Tab 11",
            "link": "https://www.umweltbundesamt.de/publikationen/aktualisierung-tremod-2020 ; https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Transport-Verkehr/Personenverkehr/Publikationen/Downloads-Personenverkehr/personenverkehr-busse-Bahnen-jahr-2080310187004.html",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_lf_gds_MHD_2018",
        f.fact("Fact_T_D_trnsprt_gds_MHD_2018") / f.fact("Fact_T_D_mlg_MHD_2018_ifeu"),
        {
            "note HS": "",
            "group": "ud",
            "description": "SNF Auslastung GÃ¼ter Bundesschnitt",
            "unit": "t/Fz",
            "rationale": "berechnet aus Fact_T_D_trnsprt_gds_MHD_2018 und Fact_T_D_mlg_MHD_2018_ifeu, wird als konstant fÃ¼r alle StraÃŸenarten angenommen",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_D_MHD_ratio_mlg_to_driver",
        (
            f.fact("Fact_T_D_mlg_MHD_2018_ifeu")
            - f.fact("Fact_T_D_mlg_Bus_2018_Destatis")
        )
        / f.fact("Fact_T_D_MHD_driver_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Durchschnittliche Fahrleistung LKW Fahrer:innen 2018",
            "unit": "Fz-km/Fahrer",
            "rationale": "berechnet aus der Fahrleistung SNF auf Autobahnen sowie Innerorts und AuÃŸerorts des ifeu abzÃ¼glich  der gefahrenen Fahrzeugkilometer im Busverkehr, da diese laut Angaben des ifeu in der erfassten Fahrleistung des SNF enthalten sind ",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Car_frac_petrol_from_phev_mlg_2018",
        (1 - f.fact("Fact_T_S_Car_frac_elec_usage_phev_2020"))
        * f.fact("Fact_T_S_Car_frac_phev_mlg_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Anteil Antriebsart Benzinanteil von PHEV an PKW-Fahrleistung",
            "unit": "%",
            "rationale": "Errechnet sich nÃ¤herungsweise aus Fact_T_S_frac_elec-usage_phev_Car_2020, Fact_T_S_frac_phev_mlg_Car_2018; Annahme: PHEV bestehen ausschlieÃŸlich aus Benzin-PHEV",
            "reference": "UBA 2020, S.179",
            "link": "https://www.umweltbundesamt.de/publikationen/aktualisierung-tremod-2019",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Car_frac_bev_from_phev_mlg_2018",
        f.fact("Fact_T_S_Car_frac_elec_usage_phev_2020")
        * f.fact("Fact_T_S_Car_frac_phev_mlg_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Anteil Antriebsart BEV von PHEV an PKW-Fahrleistung",
            "unit": "%",
            "rationale": "Errechnet sich nÃ¤herungsweise aus Fact_T_S_frac_elec-usage_phev_Car_2020, Fact_T_S_frac_phev_mlg_Car_2018",
            "reference": "UBA 2020, S.179",
            "link": "https://www.umweltbundesamt.de/publikationen/aktualisierung-tremod-2019",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Rl_Train_gds_elec_SEC_2018",
        f.fact("Fact_T_S_RL_Train_gds_EC_elec_2018")
        / f.fact("Fact_T_D_Rl_train_nat_trnsprt_gds_elec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "spez. Endenergieverbrauch Gueterverkehr Schiene Strom bundesweit 2018",
            "unit": "MWh / tkm",
            "rationale": "Berechnet aus Fact_T_S_RL_Train_gds_EC_elec_2018 und Fact_T_D_Rl_train_nat_trnsprt_gds_elec_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Rl_Train_ppl_long_elec_SEC_2018",
        f.fact("Fact_T_S_RL_Train_ppl_EC_elec_2018")
        / (
            f.fact("Fact_T_D_Rl_train_nat_trnsprt_ppl_short_elec_2018")
            + f.fact("Fact_T_D_Rl_train_nat_trnsprt_ppl_long_elec_2018")
        ),
        {
            "note HS": "",
            "group": "ud",
            "description": "spez. Endenergieverbrauch Personenverkehr Schiene Strom bundesweit 2018",
            "unit": "MWh / Pkm",
            "rationale": "Berechnet aus Fact_T_S_RL_Train_ppl_EC_elec_2018, Fact_T_D_Rl_train_nat_trnsprt_ppl_short_elec_2018 und Fact_T_D_Rl_train_nat_trnsprt_ppl_long_elec_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_A_P_fermen_CO2e_2018",
        f.fact("Fact_A_P_fermen_dairycow_CO2e_2018")
        + f.fact("Fact_A_P_fermen_nondairy_CO2e_2018")
        + f.fact("Fact_A_P_fermen_swine_CO2e_2018")
        + f.fact("Fact_A_P_fermen_oanimal_CO2e_2018")
        + f.fact("Fact_A_P_fermen_poultry_CO2e_2018"),
        {
            "note HS": "",
            "group": "ufyi (Bundestest)",
            "description": "CO2e Fermentation/Tiere (CRF 3.A) 2018",
            "unit": "",
            "rationale": "in Tabelle ablesbar oder Berechnung: =Fact_A_P_fermen_dairycow_CO2e_2018+Fact_A_P_fermen_nondairy_CO2e_2018+Fact_A_P_fermen_swine_CO2e_2018+Fact_A_P_fermen_oanimal_CO2e_2018+Fact_A_P_fermen_poultry_CO2e_2018",
            "reference": "UBA 2020 NIR 2018 S. 483, 487",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_A_P_fermen_oanimal_ratio_CO2e_to_amount_2018",
        f.fact("Fact_A_P_fermen_oanimal_CO2e_2018")
        / f.fact("Fact_A_P_fermen_oanimal_amount_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio CO2e (CH4) to Andere Tiere D 2018",
            "unit": "",
            "rationale": "Berechnung =Fact_A_P_fermen_oanimal_CO2e_2018/Fact_A_P_fermen_oanimal_amount_2018",
            "reference": "Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_forest_conv_CO2e_2018",
        f.fact("Fact_L_G_forest_CO2e_DE_2018")
        - f.fact("Fact_L_G_forest_nature_CO2e_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Emissionen Wald herkÃ¶mmlich bewirtschaftet",
            "unit": "",
            "rationale": "Berechnung: =Fact_L_G_forest_CO2e_DE_2018-Fact_L_G_forest_nature_CO2e_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_minrl_soil_crop",
        f.fact("Fact_L_G_crop_area2_minrl_soil_2018")
        / f.fact("Fact_L_G_crop_area2_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ackerland",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_minrl_soil_grass_strict",
        f.fact("Fact_L_G_grass_strict_area2_minrl_soil_2018")
        / f.fact("Fact_L_G_grass_strict_area2_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "GrÃ¼nland im engeren Sinne",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_minrl_soil_grass_woody",
        f.fact("Fact_L_G_grass_woody_area2_minrl_soil_2018")
        / f.fact("Fact_L_G_grass_woody_area2_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "GrÃ¼nland (GehÃ¶lze)",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_minrl_soil_wetland_peat",
        f.fact("Fact_L_G_wetland_peat_area2_minrl_soil_2018")
        / f.fact("Fact_L_G_wetland_peat_area2_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Feuchtgebiete (terrestrische Feuchtgebiete, Torfabbau)",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_minrl_soil_wetland_water",
        f.fact("Fact_L_G_wetland_water_area2_minrl_soil_2018")
        / f.fact("Fact_L_G_wetland_water_area2_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Feuchtgebiete (GewÃ¤sser)",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_minrl_soil_settl",
        f.fact("Fact_L_G_settl_area2_minrl_soil_2018")
        / f.fact("Fact_L_G_settl_area2_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Siedlungen",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_fen_crop",
        f.fact("Fact_L_G_crop_area2_org_soil_2018")
        / f.fact("Fact_L_G_crop_area2_2018")
        * f.fact("Fact_L_G_fraction_fen"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ackerland",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_fen_grass_strict",
        f.fact("Fact_L_G_grass_strict_area2_org_soil_2018")
        / f.fact("Fact_L_G_grass_strict_area2_2018")
        * f.fact("Fact_L_G_fraction_fen"),
        {
            "note HS": "",
            "group": "ud",
            "description": "GrÃ¼nland im engeren Sinne",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_fen_grass_woody",
        f.fact("Fact_L_G_grass_woody_area2_org_soil_2018")
        / f.fact("Fact_L_G_grass_woody_area2_2018")
        * f.fact("Fact_L_G_fraction_fen"),
        {
            "note HS": "",
            "group": "ud",
            "description": "GrÃ¼nland (GehÃ¶lze)",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_fen_wetland_peat",
        f.fact("Fact_L_G_wetland_peat_area2_org_soil_2018")
        / f.fact("Fact_L_G_wetland_peat_area2_2018")
        * f.fact("Fact_L_G_fraction_fen"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Feuchtgebiete (terrestrische Feuchtgebiete, Torfabbau)",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_fen_wetland_water",
        f.fact("Fact_L_G_wetland_water_area2_org_soil_2018")
        / f.fact("Fact_L_G_wetland_water_area2_2018")
        * f.fact("Fact_L_G_fraction_fen"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Feuchtgebiete (GewÃ¤sser)",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_fen_settl",
        f.fact("Fact_L_G_settl_area2_org_soil_2018")
        / f.fact("Fact_L_G_settl_area2_2018")
        * f.fact("Fact_L_G_fraction_fen"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Siedlungen",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_bog_crop",
        f.fact("Fact_L_G_crop_area2_org_soil_2018")
        / f.fact("Fact_L_G_crop_area2_2018")
        * f.fact("Fact_L_G_fraction_bog"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ackerland",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_bog_grass_strict",
        f.fact("Fact_L_G_grass_strict_area2_org_soil_2018")
        / f.fact("Fact_L_G_grass_strict_area2_2018")
        * f.fact("Fact_L_G_fraction_bog"),
        {
            "note HS": "",
            "group": "ud",
            "description": "GrÃ¼nland im engeren Sinne",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_bog_grass_woody",
        f.fact("Fact_L_G_grass_woody_area2_org_soil_2018")
        / f.fact("Fact_L_G_grass_woody_area2_2018")
        * f.fact("Fact_L_G_fraction_bog"),
        {
            "note HS": "",
            "group": "ud",
            "description": "GrÃ¼nland (GehÃ¶lze)",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_bog_wetland_peat",
        f.fact("Fact_L_G_wetland_peat_area2_org_soil_2018")
        / f.fact("Fact_L_G_wetland_peat_area2_2018")
        * f.fact("Fact_L_G_fraction_bog"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Feuchtgebiete (terrestrische Feuchtgebiete, Torfabbau)",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_bog_wetland_water",
        f.fact("Fact_L_G_wetland_water_area2_org_soil_2018")
        / f.fact("Fact_L_G_wetland_water_area2_2018")
        * f.fact("Fact_L_G_fraction_bog"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Feuchtgebiete (GewÃ¤sser)",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_fraction_org_soil_bog_settl",
        f.fact("Fact_L_G_settl_area2_org_soil_2018")
        / f.fact("Fact_L_G_settl_area2_2018")
        * f.fact("Fact_L_G_fraction_bog"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Siedlungen",
            "unit": "",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_W_P_organic_treatment_CO2e_pb_2018_per_prodvol",
        f.fact("Fact_W_P_organic_treatment_CO2e_pb_2018")
        / f.fact("Fact_W_P_organic_treatment_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "5B+5E Emissionsfaktor fÃ¼r biologische Behandlung in t CO2e/a pro t Produktionsmenge",
            "unit": "t CO2e/t",
            "rationale": "Berechnung =Fact_W_P_organic_treatment_CO2e_pb_2018/Fact_W_P_organic_treatment_prodvol_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_W_S_elec_fec_2018",
        f.fact("Fact_W_P_wastewater_fec_elec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Stromverbrauch Abfallwirtschaft Deutschland 2018",
            "unit": "MWh",
            "rationale": "",
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
        "Fact_E_P_biomass_full_load_hours",
        f.fact("Fact_E_P_elec_prodvol_brutto_2018")
        * f.fact("Fact_E_P_biomass_pct_of_gep_2018")
        / f.fact("Fact_E_P_biomass_power_installed_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Volllaststunden Biomasse Stromerzeugung 2021",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_E_P_hydro_full_load_hours",
        f.fact("Fact_E_P_elec_prodvol_brutto_2018")
        * f.fact("Fact_E_P_hydro_pct_of_gep_2018")
        / f.fact("Fact_E_P_hydro_power_installed_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Volllaststunden Laufwasser 2021",
            "unit": "h/a",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_E_P_geoth_full_load_hours",
        f.fact("Fact_E_P_elec_prodvol_brutto_2018")
        * f.fact("Fact_E_P_geothermal_pct_of_gep_2018")
        / f.fact("Fact_E_P_geoth_power_installed_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Volllaststunden Tiefengeothermie 2021",
            "unit": "h/a",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_E_P_wind_offshore_full_load_hours",
        f.fact("Fact_E_P_elec_prodvol_brutto_2018")
        * f.fact("Fact_E_P_wind_offshore_pct_of_gep_2018")
        / f.fact("Fact_E_P_wind_offshore_power_installed_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "WEA Offshore Volllaststunden 2021",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_E_P_wind_onshore_full_load_hours",
        f.fact("Fact_E_P_elec_prodvol_brutto_2018")
        * f.fact("Fact_E_P_wind_onshore_pct_of_gep_2018")
        / f.fact("Fact_E_P_wind_onshore_power_installed_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "WEA Onshore Volllaststunden 2021",
            "unit": "",
            "rationale": "",
            "reference": "",
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
        "Fact_E_P_renew_cogen_ratio_2018",
        f.fact("Fact_H_P_heatnet_cogen_renew_prodvol_2018")
        * f.fact("Fact_H_P_heatnet_ratio_netto_to_brutto_2018")
        / (
            f.fact("Fact_E_P_elec_prodvol_netto_2018")
            * f.fact("Fact_E_P_biomass_pct_of_gep_2018")
        ),
        {
            "note HS": "",
            "group": "ud",
            "description": "Prozentualer Aufschlag Netto(EEV)-KWK-FernwÃ¤rmeerzeugung auf Nettostromerzeugung aus Biomasse/Eneuerbarer Energie 2018",
            "unit": "%",
            "rationale": "Netto(EEV)-KWK-FernwÃ¤rme aus Erneuerbaren Energien geteilt durch Nettostromerzeugung aus Biomasse: Fact_H_P_heatnet_cogen_renew_prodvol_2018*Fact_H_P_heatnet_ratio_netto_to_brutto_2018/(Fact_E_P_elec_prodvol_netto_2018*Fakt_S_B_Biomasse_Anteil2018)",
            "reference": "Berechnung",
            "link": "",
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
        "Fact_I_P_miner_cement_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_miner_cement_CO2e_cb_2018")
        / f.fact("Fact_I_P_miner_cement_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energiebedingter CO2-Emissionsfaktor Zementindustrie in t CO2 pro produzierter t Zement",
            "unit": "t CO2e/t Produkt",
            "rationale": "Daten aus 2017, disaggregierte Zahlen liegen nicht vor. Schwankungen in der Branche sind eher gering",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_chalk_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_miner_chalk_CO2e_cb_2018")
        / f.fact("Fact_I_P_miner_chalk_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energiebedingter CO2-Emissionsfaktor Kalkindustrie in t CO2 pro produzierter t Kalk",
            "unit": "t CO2e/t Produkt",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_ceram_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_miner_ceram_CO2e_cb_2018")
        / f.fact("Fact_I_P_miner_ceram_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energiebedingter CO2-Emissionsfaktor Keramikindustrie in t CO2 pro produzierter t Keramik",
            "unit": "t CO2e/t Produkt",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_miner_glas_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_miner_glas_CO2e_cb_2018")
        / f.fact("Fact_I_P_miner_glas_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Energiebedingter CO2-Emissionsfaktor Glasindustrie in t CO2 pro produzierter t Glas",
            "unit": "t CO2e/t Produkt",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_steel_secondary_ratio_CO2e_cb_to_prodvol",
        f.fact("Fact_I_P_metal_steel_secondary_CO2e_cb_2018")
        / f.fact("Fact_I_P_metal_steel_secondary_prodvol_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "eb CO2e/Produktionsmenge Faktor Stahlerzeugung (WZ 24.1) SekundÃ¤rroute 2018",
            "unit": "",
            "rationale": "Berechnung",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_fec_pct_of_steel_primary",
        f.fact("Fact_I_S_metal_steel_primary_fec_2018")
        / f.fact("Fact_I_S_metal_steel_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "EEV Stahlerzeugung (WZ 24.1) 2018 Anteil PrimÃ¤rroute",
            "unit": "",
            "rationale": "",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_metal_steel_primary_coal_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_coal_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_metal_steel_primary_diesel_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_diesel_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_metal_steel_primary_fueloil_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_fueloil_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_metal_steel_primary_lpg_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_lpg_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_metal_steel_primary_opetpro_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_opetpro_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_metal_steel_primary_gas_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_gas_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_metal_steel_primary_biomass_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_biomass_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_metal_steel_primary_orenew_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_orenew_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_metal_steel_primary_ofossil_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_ofossil_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_metal_steel_primary_elec_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_elec_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_metal_steel_primary_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_metal_steel_primary_heatnet_fec_2018")
        / f.fact("Fact_I_S_metal_steel_primary_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an Stahlerzeugung PrimÃ¤rroute inkl. Warmwalzen 2018 (WZ 20.1)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_metal_steel_primary_heatnet_fec_2018/Fact_I_P_metal_steel_primary_fec_2018",
            "reference": "AG EB 2018 Zeile 50",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_T_S_Car_frac_petrol_with_phev_mlg_2018",
        f.fact("Fact_T_S_Car_frac_petrol_without_phev_mlg_2018")
        + f.fact("Fact_T_S_Car_frac_petrol_from_phev_mlg_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil Antriebsart Benzin mit PHEV an PKW-Fahrleistung",
            "unit": "%",
            "rationale": "Errechnet sich aus Fact_T_S_frac_petrol-without-phev_mlg_Car_2018, Fact_T_S_frac_petrol-from-phev_mlg_Car_2018; Annahme: PHEV bestehen ausschlieÃŸlich aus Benzin-PHEV",
            "reference": "UBA 2020, S.179",
            "link": "https://www.umweltbundesamt.de/publikationen/aktualisierung-tremod-2019",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_forest_conv_CO2e_per_ha_2018",
        f.fact("Fact_L_G_forest_conv_CO2e_2018") / f.fact("Fact_L_G_forest_conv_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Wald herkÃ¶mmlich bewirtscahftet",
            "unit": "",
            "rationale": "Berechnung: =Fact_L_G_forest_conv_CO2e_2018/Fact_L_G_forest_conv_2018",
            "reference": "",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_crop_area1_minrl_soil_2018",
        f.fact("Fact_L_G_crop_area1_2018")
        * f.fact("Fact_L_G_fraction_minrl_soil_crop"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_strict_area1_minrl_soil_2018",
        f.fact("Fact_L_G_grass_strict_area1_2018")
        * f.fact("Fact_L_G_fraction_minrl_soil_grass_strict"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_woody_area1_minrl_soil_2018",
        f.fact("Fact_L_G_grass_woody_area1_2018")
        * f.fact("Fact_L_G_fraction_minrl_soil_grass_woody"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_peat_area1_minrl_soil_2018",
        f.fact("Fact_L_G_wetland_peat_area1_2018")
        * f.fact("Fact_L_G_fraction_minrl_soil_wetland_peat"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_water_area1_minrl_soil_2018",
        f.fact("Fact_L_G_wetland_water_area1_2018")
        * f.fact("Fact_L_G_fraction_minrl_soil_wetland_water"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_settl_area1_minrl_soil_2018",
        f.fact("Fact_L_G_settl_area1_2018")
        * f.fact("Fact_L_G_fraction_minrl_soil_settl"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Mineralboden ",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_crop_area1_org_soil_2018",
        f.fact("Fact_L_G_crop_area1_2018")
        * (
            f.fact("Fact_L_G_fraction_org_soil_fen_crop")
            + f.fact("Fact_L_G_fraction_org_soil_bog_crop")
        ),
        {
            "note HS": "",
            "group": "ui",
            "description": "Organischer Boden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_strict_area1_org_soil_2018",
        f.fact("Fact_L_G_grass_strict_area1_2018")
        * (
            f.fact("Fact_L_G_fraction_org_soil_fen_grass_strict")
            + f.fact("Fact_L_G_fraction_org_soil_bog_grass_strict")
        ),
        {
            "note HS": "",
            "group": "ui",
            "description": "Organischer Boden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_woody_area1_org_soil_2018",
        f.fact("Fact_L_G_grass_woody_area1_2018")
        * (
            f.fact("Fact_L_G_fraction_org_soil_fen_grass_woody")
            + f.fact("Fact_L_G_fraction_org_soil_bog_grass_woody")
        ),
        {
            "note HS": "",
            "group": "ui",
            "description": "Organischer Boden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_peat_area1_org_soil_2018",
        f.fact("Fact_L_G_wetland_peat_area1_2018")
        * (
            f.fact("Fact_L_G_fraction_org_soil_fen_wetland_peat")
            + f.fact("Fact_L_G_fraction_org_soil_bog_wetland_peat")
        ),
        {
            "note HS": "",
            "group": "ui",
            "description": "Organischer Boden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_water_area1_org_soil_2018",
        f.fact("Fact_L_G_wetland_water_area1_2018")
        * (
            f.fact("Fact_L_G_fraction_org_soil_fen_wetland_water")
            + f.fact("Fact_L_G_fraction_org_soil_bog_wetland_water")
        ),
        {
            "note HS": "",
            "group": "ui",
            "description": "Organischer Boden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_settl_area1_org_soil_2018",
        f.fact("Fact_L_G_settl_area1_2018")
        * (
            f.fact("Fact_L_G_fraction_org_soil_fen_settl")
            + f.fact("Fact_L_G_fraction_org_soil_bog_settl")
        ),
        {
            "note HS": "",
            "group": "ui",
            "description": "Organischer Boden",
            "unit": "ha",
            "rationale": "",
            "reference": "Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_CO2e_cb_2018",
        f.fact("Fact_I_P_other_1a2g_CO2e_cb_2018")
        - f.fact("Fact_I_P_other_elec_CO2e_cb_2018")
        - f.fact("Fact_I_P_chem_all_CO2e_cb_2018")
        + f.fact("Fact_I_P_other_1a2d_CO2e_cb_2018")
        + f.fact("Fact_I_P_other_1a2e_CO2e_cb_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Resultierende energiebedingte CO2e sonstige Industrie 2018 (Teil von CRF 1.A.2.g + 1.A.2.d + 1.A.2.e)",
            "unit": "",
            "rationale": "CO2e von CRF 1.A.2.g plus 1.A.2.d und 1.A.2.e abzÃ¼glich der berechneten verbrennungsbedingten CO2e der Chemischen Industrie und der industriellen Stromproduktion. Berechnung =Fact_I_P_other_1a2g_CO2e_cb_2018-Fact_I_P_other_elec_CO2e_cb_2018-Fact_I_P_chem_all_CO2e_cb_2018+Fact_I_P_other_1a2d_CO2e_cb_2018+Fact_I_P_other_1a2e_CO2e_cb_2018",
            "reference": "Eigene Berechnung basierend auf NIR und AG EB",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_chem_fec_pct_of_basic",
        f.fact("Fact_I_S_chem_basic_wo_ammonia_fec_2018")
        / f.fact("Fact_I_S_chem_all_fec_2018"),
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
        "Fact_I_S_metal_fec_2018",
        f.fact("Fact_I_S_metal_steel_fec_2018")
        + f.fact("Fact_I_S_metal_nonfe_fec_2018"),
        {
            "note HS": "umbenennen zu Fact_I_S_metal_fec_2018",
            "group": "ui",
            "description": "Final Energy Consumption (FEC) metals producing industry 2021",
            "unit": "",
            "rationale": "Metallerzeugung; NE-Metalle, -gießereien: Energieträger insgesamt Summe (Umgerechnet in MWh)",
            "reference": "AG EB 2023 Bilanz 2021 Zeile 54+55, Spalte AI",
            "link": "https://ag-energiebilanzen.de/wp-content/uploads/2023/03/Bilanz-2021.pdf ",
        },
    )

    f.add_derived_fact(
        "Fact_I_P_fec_pct_of_metal_2018",
        f.fact("Fact_I_S_metal_fec_2018") / f.fact("Fact_I_S_fec_2018"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Anteil Metallherstellung Industrie EEV 2021",
            "unit": "",
            "rationale": "Spalte AK, Zeile 54+55 in Excel-Tabelle AG Energieblianzen",
            "reference": "AG Energiebilanzen: Energiebilanz der BR Deutschland 2018, eigene Aufteilung ohne Spalten AA, AB, AD, AF",
            "link": "https://germanzero.sharepoint.com/Files/200_Campaigning_Mobilisierung/10_Klimaentscheide/101_Klimastadtplan-Generator/20_KStP-Generator_v2/Bilanzierung%20Deutschland/AG_Energiebilanzen_2020_bilanz18d.xls?d=w49bda7d5a021439e84b3ffbf84872ff4&csf=1&web=1&e=tc2Zak",
        },
    )

    f.add_derived_fact(
        "Fact_I_P_metal_fec_pct_of_steel",
        f.fact("Fact_I_S_metal_steel_fec_2018") / f.fact("Fact_I_S_metal_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Percentage of FEC steel on FEC metal producing industry",
            "unit": "",
            "rationale": "Just the share of steel industry's fec",
            "reference": "AG Energiebilanzen bilanz18d, Blatt tj, Zeile 54+55, Spalte AI",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_metal_fec_pct_of_nonfe",
        f.fact("Fact_I_S_metal_nonfe_fec_2018") / f.fact("Fact_I_S_metal_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Percentage of FEC non-ferrous on FEC metal producing industry",
            "unit": "",
            "rationale": "Just the share of non-ferrous industry's fec",
            "reference": "AG Energiebilanzen bilanz18d, Blatt tj, Zeile 54+55, Spalte AI",
            "link": "",
        },
    )

    f.add_derived_fact(
        "Fact_I_S_other_fec_2018",
        f.fact("Fact_I_S_fec_2018")
        - f.fact("Fact_I_S_chem_all_fec_2018")
        - f.fact("Fact_I_S_miner_fec_2018")
        - f.fact("Fact_I_S_metal_fec_2018"),
        {
            "note HS": "umbenennen zu Fact_I_S_other_fec_2018",
            "group": "ui",
            "description": "sonstige Industrie EEV 2018",
            "unit": "",
            "rationale": "EEV der gesamten Industrie minus mineral, metal, chem",
            "reference": "AG Energiebilanzen: Energiebilanz der BR Deutschland 2018, eigene Aufteilung ohne Spalten AA, AB, AD, AF",
            "link": "https://germanzero.sharepoint.com/Files/200_Campaigning_Mobilisierung/10_Klimaentscheide/101_Klimastadtplan-Generator/20_KStP-Generator_v2/Bilanzierung%20Deutschland/AG_Energiebilanzen_2020_bilanz18d.xls?d=w49bda7d5a021439e84b3ffbf84872ff4&csf=1&web=1&e=tc2Zak",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_crop_minrl_soil_ord_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_crop_minrl_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_crop_biomass_CO2e_2018")
                + f.fact("Fact_L_G_crop_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_crop_area1_minrl_soil_2018")
            / f.fact("Fact_L_G_crop_area1_2018")
        )
        / f.fact("Fact_L_G_crop_area1_minrl_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mineralischer Boden (herkÃ¶mmlich bewirtschaftet)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 631, Tab. 426, Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_strict_minrl_soil_ord_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_grass_strict_minrl_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_grass_strict_biomass_CO2e_2018")
                + f.fact("Fact_L_G_grass_strict_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_grass_strict_area1_minrl_soil_2018")
            / f.fact("Fact_L_G_grass_strict_area1_2018")
        )
        / f.fact("Fact_L_G_grass_strict_area1_minrl_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mineralischer Boden",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 650, Tab. 439, Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_woody_minrl_soil_ord_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_grass_woody_minrl_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_grass_woody_biomass_CO2e_2018")
                + f.fact("Fact_L_G_grass_woody_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_grass_woody_area1_minrl_soil_2018")
            / f.fact("Fact_L_G_grass_woody_area1_2018")
        )
        / f.fact("Fact_L_G_grass_woody_area1_minrl_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mineralischer Boden",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 650, Tab. 439, Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_peat_minrl_soil_ord_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_wetland_peat_minrl_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_wetland_peat_biomass_CO2e_2018")
                + f.fact("Fact_L_G_wetland_peat_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_wetland_peat_area1_minrl_soil_2018")
            / f.fact("Fact_L_G_wetland_peat_area1_2018")
        )
        / f.fact("Fact_L_G_wetland_peat_area1_minrl_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mineralischer Boden",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 665, Tab. 450 und Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_water_minrl_soil_ord_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_wetland_water_minrl_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_wetland_water_biomass_CO2e_2018")
                + f.fact("Fact_L_G_wetland_water_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_wetland_water_area1_minrl_soil_2018")
            / f.fact("Fact_L_G_wetland_water_area1_2018")
        )
        / f.fact("Fact_L_G_wetland_water_area1_minrl_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mineralischer Boden",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 665, Tab. 450 und Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_settl_minrl_soil_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_settl_minrl_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_settl_biomass_CO2e_2018")
                + f.fact("Fact_L_G_settl_dead_wood_CO2e_2018")
            )
            * f.fact("Fact_L_G_settl_area1_minrl_soil_2018")
            / f.fact("Fact_L_G_settl_area1_2018")
        )
        / f.fact("Fact_L_G_settl_area1_minrl_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Mineralischer Boden",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 676, Tab. 461 und Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_crop_fen_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_crop_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_crop_biomass_CO2e_2018")
                + f.fact("Fact_L_G_crop_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_crop_area1_org_soil_2018")
            / f.fact("Fact_L_G_crop_area1_2018")
        )
        / f.fact("Fact_L_G_crop_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Niedermoor, unvernÃ¤sst)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 631, Tab. 426, Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_crop_bog_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_crop_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_crop_biomass_CO2e_2018")
                + f.fact("Fact_L_G_crop_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_crop_area1_org_soil_2018")
            / f.fact("Fact_L_G_crop_area1_2018")
        )
        / f.fact("Fact_L_G_crop_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Hochmoor, unvernÃ¤sst)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 631, Tab. 426, Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_strict_org_soil_fen_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_grass_strict_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_grass_strict_biomass_CO2e_2018")
                + f.fact("Fact_L_G_grass_strict_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_grass_strict_area1_org_soil_2018")
            / f.fact("Fact_L_G_grass_strict_area1_2018")
        )
        / f.fact("Fact_L_G_grass_strict_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Niedermoor, unvernÃ¤sst)",
            "unit": "t CO2 eq/ha",
            "rationale": "15% des GrÃ¼nlandes verbleibt unvernÃ¤sst, wird als extensives GrÃ¼nland bewirtschaftet",
            "reference": "NIR 2020, S. 650, Tab. 439, Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_strict_org_soil_bog_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_grass_strict_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_grass_strict_biomass_CO2e_2018")
                + f.fact("Fact_L_G_grass_strict_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_grass_strict_area1_org_soil_2018")
            / f.fact("Fact_L_G_grass_strict_area1_2018")
        )
        / f.fact("Fact_L_G_grass_strict_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Hochmoor, unvernÃ¤sst)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 650, Tab. 439, Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_woody_org_soil_fen_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_grass_woody_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_grass_woody_biomass_CO2e_2018")
                + f.fact("Fact_L_G_grass_woody_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_grass_woody_area1_org_soil_2018")
            / f.fact("Fact_L_G_grass_woody_area1_2018")
        )
        / f.fact("Fact_L_G_grass_woody_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Niedermoor, unvernÃ¤sst)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 650, Tab. 439, Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_grass_woody_org_soil_bog_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_grass_woody_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_grass_woody_biomass_CO2e_2018")
                + f.fact("Fact_L_G_grass_woody_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_grass_woody_area1_org_soil_2018")
            / f.fact("Fact_L_G_grass_woody_area1_2018")
        )
        / f.fact("Fact_L_G_grass_woody_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Hochmoor, unvernÃ¤sst)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 650, Tab. 439, Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_peat_org_soil_fen_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_wetland_peat_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_wetland_peat_biomass_CO2e_2018")
                + f.fact("Fact_L_G_wetland_peat_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_wetland_peat_area1_org_soil_2018")
            / f.fact("Fact_L_G_wetland_peat_area1_2018")
        )
        / f.fact("Fact_L_G_wetland_peat_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Niedermoor, unvernÃ¤sst)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 665, Tab. 450 und Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_peat_org_soil_bog_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_wetland_peat_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_wetland_peat_biomass_CO2e_2018")
                + f.fact("Fact_L_G_wetland_peat_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_wetland_peat_area1_org_soil_2018")
            / f.fact("Fact_L_G_wetland_peat_area1_2018")
        )
        / f.fact("Fact_L_G_wetland_peat_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Hochmoor, unvernÃ¤sst)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 665, Tab. 450 und Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_water_org_soil_fen_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_wetland_water_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_wetland_water_biomass_CO2e_2018")
                + f.fact("Fact_L_G_wetland_water_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_wetland_water_area1_org_soil_2018")
            / f.fact("Fact_L_G_wetland_water_area1_2018")
        )
        / f.fact("Fact_L_G_wetland_water_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Niedermoor)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 665, Tab. 450 und Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_wetland_water_org_soil_bog_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_wetland_water_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_wetland_water_biomass_CO2e_2018")
                + f.fact("Fact_L_G_wetland_water_dead_CO2e_2018")
            )
            * f.fact("Fact_L_G_wetland_water_area1_org_soil_2018")
            / f.fact("Fact_L_G_wetland_water_area1_2018")
        )
        / f.fact("Fact_L_G_wetland_water_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Hochmoor)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 665, Tab. 450 und Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_settl_org_soil_fen_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_settl_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_settl_biomass_CO2e_2018")
                + f.fact("Fact_L_G_settl_dead_wood_CO2e_2018")
            )
            * f.fact("Fact_L_G_settl_area1_org_soil_2018")
            / f.fact("Fact_L_G_settl_area1_2018")
        )
        / f.fact("Fact_L_G_settl_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Niedermoor, unvernÃ¤sst)",
            "unit": "t CO2 eq/ha",
            "rationale": "180 000 ha Siedlungen auf organischem Boden bleiben bestehen/bleiben unvernÃ¤sst; 2018 gab es 87 918 ha Siedlungen auf organischem Boden (NIR) bzw. 97750 ha Siedlungen auf organischem Boden. Deswegen muss nichts wiedervernÃ¤sst werden.",
            "reference": "NIR 2020, S. 676, Tab. 461 und Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_L_G_settl_org_soil_bog_CO2e_per_ha_2018",
        (
            f.fact("Fact_L_G_settl_org_soil_CO2e_2018")
            + (
                f.fact("Fact_L_G_settl_biomass_CO2e_2018")
                + f.fact("Fact_L_G_settl_dead_wood_CO2e_2018")
            )
            * f.fact("Fact_L_G_settl_area1_org_soil_2018")
            / f.fact("Fact_L_G_settl_area1_2018")
        )
        / f.fact("Fact_L_G_settl_area1_org_soil_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Organischer Boden (Hochmoor, unvernÃ¤sst)",
            "unit": "t CO2 eq/ha",
            "rationale": "",
            "reference": "NIR 2020, S. 676, Tab. 461 und Eigene Berechnung",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_further_CO2e_cb_2018",
        f.fact("Fact_I_P_other_CO2e_cb_2018")
        - f.fact("Fact_I_P_other_paper_CO2e_cb_2018")
        - f.fact("Fact_I_P_other_food_CO2e_cb_2015"),
        {
            "note HS": "",
            "group": "ui",
            "description": "Energiebedingte Emissionen CO2e sonstige Industrie Weitere Branchen 2018 (Teil von CRF 1.A.2.g)",
            "unit": "",
            "rationale": 'Von CRF 1.A.2.g (+1.A.2.d+e) wurden bereits Chemische Industrie und Industrielle Stromproduktion abgezogen. Lediglich die Bereiche Papier- und ErnÃ¤hrungsmittelindustrie lassen sich noch zuverlÃ¤ssig ermitteln und abziehen, sodass "Sonstige Branchen" ein Sammelbecken bleibt fÃ¼r Textil, MÃ¶bel, Pharma u.v.m.',
            "reference": "NIR S.199 und weitere (s.o.)",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_ratio_fec_to_industry_2018",
        f.fact("Fact_I_S_other_fec_2018") / f.fact("Fact_I_S_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ui (Eingabe)",
            "description": "Anteil sonstige Industrie EEV 2018",
            "unit": "",
            "rationale": "Spalte AK, Zeile 46-48,51,56-59",
            "reference": "AG Energiebilanzen: Energiebilanz der BR Deutschland 2018, eigene Aufteilung ohne Spalten AA, AB, AD, AF",
            "link": "https://germanzero.sharepoint.com/Files/200_Campaigning_Mobilisierung/10_Klimaentscheide/101_Klimastadtplan-Generator/20_KStP-Generator_v2/Bilanzierung%20Deutschland/AG_Energiebilanzen_2020_bilanz18d.xls?d=w49bda7d5a021439e84b3ffbf84872ff4&csf=1&web=1&e=tc2Zak",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_fec_pct_of_paper",
        f.fact("Fact_I_S_other_paper_fec_2018") / f.fact("Fact_I_S_other_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "Anteil EEV Papierindustrie 2018 (WZ 17) an Sonstige Industrie",
            "unit": "%",
            "rationale": "Division von Fact_I_S_other_paper_fec_2018/Fact_I_S_other_fec_2018",
            "reference": "AG EB 2018 Zeile 48 Spalte AI",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_fec_pct_of_food",
        f.fact("Fact_I_S_other_food_fec_2018") / f.fact("Fact_I_S_other_fec_2018"),
        {
            "note HS": "nicht mehr benötigt seit KFI Update, oder?",
            "group": "ud",
            "description": "Anteil EEV ErnÃ¤hrungsindustrie 2018 (WZ 10, 11, 12) an Sonstige Industrie",
            "unit": "%",
            "rationale": "Division von Fact_I_S_other_food_fec_2018/Fact_I_S_other_fec_2018",
            "reference": "AG EB 2018 Zeile 47 Spalte AI",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_B_S_elec_fec_2018",
        f.fact("Fact_BAW_S_elec_fec_2018")
        - f.fact("Fact_A_S_elec_fec_2018")
        - f.fact("Fact_W_S_elec_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "EEV GHD, Landwirtschaft, Abfallwirtschaft 2021 Strom",
            "unit": "",
            "rationale": "Strom Spalte AD (enthält Landwirtschaft Fact_A_S_elec_fec_2018 und Abfallwirtschaft Fact_W_S_elec_fec_2018)",
            "reference": "AG EB 2023 Bilanz 2021 Zeile 67, Spalte AD",
            "link": "https://ag-energiebilanzen.de/wp-content/uploads/2023/03/Bilanz-2021.pdf",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_2018",
        f.fact("Fact_I_S_other_fec_2018")
        - f.fact("Fact_I_S_other_paper_fec_2018")
        - f.fact("Fact_I_S_other_food_fec_2018"),
        {
            "note HS": "umbenennen zu Fact_I_S_other_further_fec_2018",
            "group": "ui",
            "description": "EEV Weitere Branchen 2021 (WZ  8, 22, 24.2, 24.3, 25, 28 ohne 28.23, 29, 30, alle anderen WZ ohne 5.1, 5.2, 6, 9, 19.1 ,19.2)",
            "unit": "",
            "rationale": "Von dem gesamten EEV von sonstiger Industrie wurden die EEV von Papier- und ErnÃ¤hrungsindustrie abgezogen. =Fact_I_S_other_fec_2018-Fact_I_S_other_paper_fec_2018-Fact_I_S_other_food_fec_2018",
            "reference": "AG EB 2018 Zeile 46, 51, 56,57, 58, 59 Spalte AI",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_coal_2018",
        f.fact("Fact_I_S_other_further_coal_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Kohle an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_coal_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_diesel_2018",
        f.fact("Fact_I_S_other_further_diesel_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Diesel an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_diesel_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_fueloil_2018",
        f.fact("Fact_I_S_other_further_fueloil_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV HeizÃ¶l an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_fueloil_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_lpg_2018",
        f.fact("Fact_I_S_other_further_lpg_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV LPG an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_lpg_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_opetpro_2018",
        f.fact("Fact_I_S_other_further_opetpro_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige MineralÃ¶lprodukte an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_opetpro_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_gas_2018",
        f.fact("Fact_I_S_other_further_gas_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Erdgas an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_gas_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_biomass_2018",
        f.fact("Fact_I_S_other_further_biomass_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Biomasse an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_biomass_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_orenew_2018",
        f.fact("Fact_I_S_other_further_orenew_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige EE an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_orenew_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_ofossil_2018",
        f.fact("Fact_I_S_other_further_ofossil_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Sonstige fossile EnergietrÃ¤ger an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_ofossil_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_elec_2018",
        f.fact("Fact_I_S_other_further_elec_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV Strom an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_elec_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_S_other_further_fec_pct_of_heatnet_2018",
        f.fact("Fact_I_S_other_further_heatnet_fec_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Anteil EEV FernwÃ¤rme an Weitere Branchen 2018 (WZ 8 22 24.2 24.3 25 28 ohne 28.23 29 30 alle anderen WZ ohne 5.1 5.2 6 9 19.1 19.2)",
            "unit": "%",
            "rationale": "Berechnung =Fact_I_P_other_further_heatnet_fec_2018/Fact_I_S_other_further_fec_2018",
            "reference": "AG EB 2018 Zeile 46+51+56+57+58+59",
            "link": "",
        },
    )

    f.add_derived_fact(
        "Fact_I_P_other_further_ratio_CO2e_pb_to_fec",
        f.fact("Fact_I_P_other_further_CO2e_pb_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio pb CO2e (CRF 2.D) to fec further industry 2018",
            "unit": "t/MWh",
            "rationale": "Da keine zuverlÃ¤ssigen Zahlen Ã¼ber die Produktionsmenge weiterer Branchen vorliegen, muss hier auf den EEV zurÃ¼ckgegriffen werden, also Divsion von Fact_I_P_other_further_CO2e_pb_2018/Fact_I_S_other_further_fec_2018",
            "reference": "UBA RESCUE 2019 S. 280",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_2efgh_ratio_CO2e_pb_to_fec",
        f.fact("Fact_I_P_other_2efgh_CO2e_pb_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio pb CO2e (f-gases, CRF 2.E-H) to fec further industry 2018",
            "unit": "t/MWh",
            "rationale": "Da keine zuverlÃ¤ssigen Zahlen Ã¼ber die Produktionsmenge weiterer Branchen vorliegen, muss hier auf den EEV zurÃ¼ckgegriffen werden, also Divsion von Fact_I_P_other_2efgh_CO2e_pb_2018/Fact_I_S_other_further_fec_2018",
            "reference": "UBA RESCUE 2019 S. 280",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_fec_pct_of_further",
        f.fact("Fact_I_S_other_further_fec_2018") / f.fact("Fact_I_S_other_fec_2018"),
        {
            "note HS": "umbenennen zu Fact_I_S_other_fec_pct_of_further",
            "group": "ud",
            "description": "Anteil EEV Weitere Branchen 2018 an Sonstige Industrie",
            "unit": "%",
            "rationale": "Division von Fact_I_S_other_further_fec_2018/Fact_I_S_other_fec_2018",
            "reference": "AG EB 2018 Zeile 46, 51, 56,57, 58, 59 Spalte AI",
            "link": "",
        },
    )
    f.add_derived_fact(
        "Fact_I_P_other_further_ratio_CO2e_cb_to_fec",
        f.fact("Fact_I_P_other_further_CO2e_cb_2018")
        / f.fact("Fact_I_S_other_further_fec_2018"),
        {
            "note HS": "",
            "group": "ud",
            "description": "Ratio cb CO2e to fec further industry 2018",
            "unit": "t/MWh",
            "rationale": "Da keine zuverlÃ¤ssigen Zahlen Ã¼ber die Produktionsmenge weiterer Branchen vorliegen, muss hier auf den EEV zurÃ¼ckgegriffen werden, also Divsion von Fact_I_P_other_further_CO2e_cb_2018/Fact_I_S_other_further_fec_2018",
            "reference": "UBA RESCUE 2019 S. 280",
            "link": "",
        },
    )
