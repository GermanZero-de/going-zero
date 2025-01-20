"""
Documentation:
https://localzero-generator.readthedocs.io/de/latest/sectors/lulucf.html
"""

# pyright: strict

from ..makeentries import Entries
from ..refdata import Facts

from .l18 import L18
from .dataclasses import (
    Vars0,
    Vars1,
    Vars3,
    Vars4,
    Vars5,
    Vars6,
    Vars7,
    Vars8,
)


def calc(entries: Entries, facts: Facts) -> L18:
    fact = facts.fact

    g = Vars1()
    l = Vars0()
    g_forest = Vars3()
    g_forest_managed = Vars4()
    g_forest_natural = Vars5()
    g_crop = Vars6()
    g_crop_min_conv = Vars5()
    g_crop_org_low = Vars5()
    g_crop_org_high = Vars5()
    g_grass = Vars6()
    g_grass_min_conv = Vars5()
    g_grass_org_low = Vars5()
    g_grass_org_high = Vars5()
    g_grove = Vars6()
    g_grove_min = Vars5()
    g_grove_org_low = Vars5()
    g_grove_org_high = Vars5()
    g_wet = Vars6()
    g_wet_min = Vars5()
    g_wet_org_low = Vars5()
    g_wet_org_high = Vars5()
    g_wet_org_r = Vars7()
    g_water = Vars6()
    g_water_org = Vars6()
    g_water_min = Vars5()
    g_settlement = Vars6()
    g_settlement_org = Vars6()
    g_settlement_min = Vars5()
    g_settlement_org_low = Vars5()
    g_settlement_org_high = Vars5()
    g_other = Vars8()
    g_wood = Vars8()
    g_crop_org = Vars6()
    g_grass_org = Vars6()
    g_grove_org = Vars6()
    g_wet_org = Vars6()
    g_water_org_low = Vars5()
    g_water_org_high = Vars5()
    pyrolysis = Vars7()

    g_forest.area_ha = entries.m_area_wood_com

    g_forest_managed.CO2e_production_based_per_t = fact(
        "Fact_L_G_forest_conv_CO2e_per_ha_2018"
    )
    g_forest_managed.CO2e_combustion_based_per_t = fact(
        "Fact_L_G_forest_CO2e_cb_per_ha_2018"
    )
    g_forest_managed.pct_x = fact("Fact_L_G_forest_pct_of_conv_2018")

    g_crop.area_ha = entries.m_area_agri_com * fact(
        "Fact_L_G_area_veg_agri_pct_of_crop"
    )
    g_crop_min_conv.CO2e_production_based_per_t = fact(
        "Fact_L_G_crop_minrl_soil_ord_CO2e_per_ha_2018"
    )
    g_forest_managed.area_ha = g_forest.area_ha * g_forest_managed.pct_x
    g_crop_min_conv.pct_x = fact("Fact_L_G_fraction_minrl_soil_crop")

    g_forest_managed.CO2e_combustion_based = (
        g_forest_managed.CO2e_combustion_based_per_t * g_forest_managed.area_ha
    )
    g_forest_managed.CO2e_production_based = (
        g_forest_managed.area_ha * g_forest_managed.CO2e_production_based_per_t
    )
    g_forest_natural.CO2e_production_based_per_t = fact(
        "Fact_L_G_forest_nature_CO2e_per_ha_2018"
    )
    g_forest_natural.pct_x = fact("Fact_L_G_forest_pct_of_nature_2018")

    g_forest.CO2e_combustion_based = g_forest_managed.CO2e_combustion_based

    g.CO2e_combustion_based = g_forest.CO2e_combustion_based

    g_forest_natural.area_ha = g_forest.area_ha * g_forest_natural.pct_x

    g_forest_natural.CO2e_production_based = (
        g_forest_natural.area_ha * g_forest_natural.CO2e_production_based_per_t
    )
    g_forest.CO2e_production_based = (
        g_forest_managed.CO2e_production_based + g_forest_natural.CO2e_production_based
    )
    g_forest.CO2e_total = (
        g_forest.CO2e_production_based + g_forest.CO2e_combustion_based
    )

    g_crop_min_conv.area_ha = g_crop.area_ha * g_crop_min_conv.pct_x

    g_grass.area_ha = (
        entries.m_area_agri_com * fact("Fact_L_G_area_veg_agri_pct_of_grass")
        + entries.m_area_veg_plant_uncover_com
        * fact("Fact_L_G_area_plant_uncover_pct_grass")
        + entries.m_area_veg_heath_com
        + entries.m_area_veg_marsh_com
    )
    g_grass_min_conv.CO2e_production_based_per_t = fact(
        "Fact_L_G_grass_strict_minrl_soil_ord_CO2e_per_ha_2018"
    )
    g_grass_min_conv.pct_x = fact("Fact_L_G_fraction_minrl_soil_grass_strict")
    g_crop_org_low.pct_x = fact("Fact_L_G_fraction_org_soil_fen_crop")

    g_crop_min_conv.CO2e_production_based = (
        g_crop_min_conv.CO2e_production_based_per_t * g_crop_min_conv.area_ha
    )
    g_crop_org_low.CO2e_production_based_per_t = fact(
        "Fact_L_G_crop_fen_CO2e_per_ha_2018"
    )
    g_crop_org_low.area_ha = g_crop.area_ha * g_crop_org_low.pct_x

    g_crop_org_high.pct_x = fact("Fact_L_G_fraction_org_soil_bog_crop")

    g_crop_org_low.CO2e_production_based = (
        g_crop_org_low.CO2e_production_based_per_t * g_crop_org_low.area_ha
    )
    g_crop_org_high.CO2e_production_based_per_t = fact(
        "Fact_L_G_crop_bog_CO2e_per_ha_2018"
    )
    g_crop_org_high.area_ha = g_crop.area_ha * g_crop_org_high.pct_x

    g_crop.pct_x = (
        g_crop_min_conv.pct_x
        +
        # g_crop_min_hum.pct_x +
        g_crop_org_low.pct_x
        + g_crop_org_high.pct_x
    )
    g_crop_org_high.CO2e_production_based = (
        g_crop_org_high.CO2e_production_based_per_t * g_crop_org_high.area_ha
    )
    g_crop.CO2e_production_based = (
        g_crop_min_conv.CO2e_production_based
        +
        # g_crop_min_hum.CO2e_pb +
        g_crop_org_low.CO2e_production_based
        + g_crop_org_high.CO2e_production_based
    )
    g_crop.CO2e_total = g_crop.CO2e_production_based
    g_crop_org.CO2e_production_based = (
        g_crop_org_low.CO2e_production_based + g_crop_org_high.CO2e_production_based
    )
    g_crop_org.CO2e_total = g_crop_org.CO2e_production_based
    g_crop_org.pct_x = g_crop_org_low.pct_x + g_crop_org_high.pct_x
    g_crop_org.area_ha = g_crop_org_low.area_ha + g_crop_org_high.area_ha
    g_grass_min_conv.area_ha = g_grass.area_ha * g_grass_min_conv.pct_x

    g_grove.area_ha = entries.m_area_veg_wood_com
    # g_grove.area_ha = (
    #    entries.m_area_agri_com * fact("Fact_L_G_area_veg_agri_pct_of_grass")
    #    + entries.m_area_veg_plant_uncover_com * fact("Fact_L_G_area_plant_uncover_pct_grass")
    #    + entries.m_area_veg_heath_com
    #    + entries.m_area_veg_marsh_com
    # )

    g_grove_min.CO2e_production_based_per_t = fact(
        "Fact_L_G_grass_woody_minrl_soil_ord_CO2e_per_ha_2018"
    )
    g_grove_min.pct_x = fact("Fact_L_G_fraction_minrl_soil_grass_woody")
    g_grass_org_low.pct_x = fact("Fact_L_G_fraction_org_soil_fen_grass_strict")
    g_grass_min_conv.CO2e_production_based = (
        g_grass_min_conv.CO2e_production_based_per_t * g_grass_min_conv.area_ha
    )
    g_grass_org_low.CO2e_production_based_per_t = fact(
        "Fact_L_G_grass_strict_org_soil_fen_CO2e_per_ha_2018"
    )
    g_grass_org_low.area_ha = g_grass.area_ha * g_grass_org_low.pct_x

    g_grass_org_high.pct_x = fact("Fact_L_G_fraction_org_soil_bog_grass_strict")
    g_grass_org_low.CO2e_production_based = (
        g_grass_org_low.CO2e_production_based_per_t * g_grass_org_low.area_ha
    )
    g_grass_org_high.CO2e_production_based_per_t = fact(
        "Fact_L_G_grass_strict_org_soil_bog_CO2e_per_ha_2018"
    )
    g_grass_org_high.area_ha = g_grass.area_ha * g_grass_org_high.pct_x

    g_grass.pct_x = (
        g_grass_min_conv.pct_x + g_grass_org_low.pct_x + g_grass_org_high.pct_x
    )
    g_grass_org_high.CO2e_production_based = (
        g_grass_org_high.CO2e_production_based_per_t * g_grass_org_high.area_ha
    )
    g_grass.CO2e_production_based = (
        g_grass_min_conv.CO2e_production_based
        + g_grass_org_low.CO2e_production_based
        + g_grass_org_high.CO2e_production_based
    )
    g_grass_org.CO2e_production_based = (
        g_grass_org_low.CO2e_production_based + g_grass_org_high.CO2e_production_based
    )
    g_grass_org.CO2e_total = g_grass_org.CO2e_production_based
    g_grass.CO2e_total = g_grass.CO2e_production_based
    g_grass_org.pct_x = g_grass_org_low.pct_x + g_grass_org_high.pct_x
    g_grass_org.area_ha = g_grass_org_low.area_ha + g_grass_org_high.area_ha
    g_grove_min.area_ha = g_grove.area_ha * g_grove_min.pct_x
    g_wet.area_ha = entries.m_area_veg_moor_com + entries.m_area_water_com * fact(
        "Fact_L_G_area_water_pct_of_wet"
    )
    g_wet_min.CO2e_production_based_per_t = fact(
        "Fact_L_G_wetland_peat_minrl_soil_ord_CO2e_per_ha_2018"
    )
    g_wet_min.pct_x = fact("Fact_L_G_fraction_minrl_soil_wetland_peat")

    g_grove_org_low.pct_x = fact("Fact_L_G_fraction_org_soil_fen_grass_woody")
    g_grove_min.CO2e_production_based = (
        g_grove_min.CO2e_production_based_per_t * g_grove_min.area_ha
    )

    g_grove_org_low.CO2e_production_based_per_t = fact(
        "Fact_L_G_grass_woody_org_soil_fen_CO2e_per_ha_2018"
    )
    g_grove_org_low.area_ha = g_grove.area_ha * g_grove_org_low.pct_x

    g_grove_org_high.pct_x = fact("Fact_L_G_fraction_org_soil_bog_grass_woody")
    g_grove_org_low.CO2e_production_based = (
        g_grove_org_low.CO2e_production_based_per_t * g_grove_org_low.area_ha
    )
    g_grove_org_high.CO2e_production_based_per_t = fact(
        "Fact_L_G_grass_woody_org_soil_bog_CO2e_per_ha_2018"
    )
    g_grove_org_high.area_ha = g_grove.area_ha * g_grove_org_high.pct_x
    g_grove.pct_x = g_grove_min.pct_x + g_grove_org_low.pct_x + g_grove_org_high.pct_x
    g_grove_org_high.CO2e_production_based = (
        g_grove_org_high.CO2e_production_based_per_t * g_grove_org_high.area_ha
    )
    g_grove.CO2e_production_based = (
        g_grove_min.CO2e_production_based
        + g_grove_org_low.CO2e_production_based
        + g_grove_org_high.CO2e_production_based
    )
    g_grove.CO2e_total = g_grove.CO2e_production_based
    g_grove_org.pct_x = g_grove_org_low.pct_x + g_grove_org_high.pct_x
    g_grove_org.area_ha = g_grove_org_low.area_ha + g_grove_org_high.area_ha
    g_wet_min.area_ha = g_wet.area_ha * g_wet_min.pct_x

    g_water.area_ha = entries.m_area_water_com * fact(
        "Fact_L_G_area_water_pct_of_water"
    )

    g_water_min.CO2e_production_based_per_t = fact(
        "Fact_L_G_wetland_water_minrl_soil_ord_CO2e_per_ha_2018"
    )
    g_water_min.pct_x = fact("Fact_L_G_fraction_minrl_soil_wetland_water")
    g_wet_org_low.pct_x = fact("Fact_L_G_fraction_org_soil_fen_wetland_peat")
    g_wet_min.CO2e_production_based = (
        g_wet_min.CO2e_production_based_per_t * g_wet_min.area_ha
    )

    g_wet_org_low.CO2e_production_based_per_t = fact(
        "Fact_L_G_wetland_peat_org_soil_fen_CO2e_per_ha_2018"
    )
    g_wet_org_low.area_ha = g_wet.area_ha * g_wet_org_low.pct_x

    g_wet_org_high.pct_x = fact("Fact_L_G_fraction_org_soil_bog_wetland_peat")
    g_wet_org_low.CO2e_production_based = (
        g_wet_org_low.CO2e_production_based_per_t * g_wet_org_low.area_ha
    )
    g_wet_org_high.CO2e_production_based_per_t = fact(
        "Fact_L_G_wetland_peat_org_soil_bog_CO2e_per_ha_2018"
    )
    g_wet_org_high.area_ha = g_wet.area_ha * g_wet_org_high.pct_x

    g_wet.pct_x = g_wet_min.pct_x + g_wet_org_low.pct_x + g_wet_org_high.pct_x
    g_wet_org_high.CO2e_production_based = (
        g_wet_org_high.CO2e_production_based_per_t * g_wet_org_high.area_ha
    )
    g_wet_org.CO2e_production_based = (
        g_wet_org_low.CO2e_production_based + g_wet_org_high.CO2e_production_based
    )
    g_wet_org.CO2e_total = g_wet_org.CO2e_production_based
    g_wet.CO2e_production_based = (
        g_wet_min.CO2e_production_based
        + g_wet_org_low.CO2e_production_based
        + g_wet_org_high.CO2e_production_based
    )
    g_wet.CO2e_total = g_wet.CO2e_production_based
    g_wet_org.pct_x = g_wet_org_low.pct_x + g_wet_org_high.pct_x
    g_wet_org.area_ha = g_wet_org_low.area_ha + g_wet_org_high.area_ha
    g_water_min.area_ha = g_water.area_ha * g_water_min.pct_x

    g_settlement.area_ha = entries.m_area_settlement_com + entries.m_area_transport_com
    g_settlement_min.CO2e_production_based_per_t = fact(
        "Fact_L_G_settl_minrl_soil_CO2e_per_ha_2018"
    )
    g_settlement_min.pct_x = fact("Fact_L_G_fraction_minrl_soil_settl")
    g_water_min.CO2e_production_based = (
        g_water_min.CO2e_production_based_per_t * g_water_min.area_ha
    )

    g_water_org_low.CO2e_production_based_per_t = fact(
        "Fact_L_G_wetland_water_org_soil_fen_CO2e_per_ha_2018"
    )
    g_water_org_low.pct_x = fact("Fact_L_G_fraction_org_soil_fen_wetland_water")
    g_water_org_high.pct_x = fact("Fact_L_G_fraction_org_soil_bog_wetland_water")
    g_water_org.pct_x = g_water_org_low.pct_x + g_water_org_high.pct_x
    g_water.pct_x = g_water_min.pct_x + g_water_org.pct_x
    g_water_org_low.area_ha = g_water.area_ha * g_water_org_low.pct_x
    g_water_org_low.CO2e_production_based = (
        g_water_org_low.CO2e_production_based_per_t * g_water_org_low.area_ha
    )
    g_water_org_high.CO2e_production_based_per_t = fact(
        "Fact_L_G_wetland_water_org_soil_bog_CO2e_per_ha_2018"
    )

    g_water_org_high.area_ha = g_water.area_ha * g_water_org_high.pct_x
    g_water_org_high.CO2e_production_based = (
        g_water_org_high.CO2e_production_based_per_t * g_water_org_high.area_ha
    )
    g_water_org.CO2e_production_based = (
        g_water_org_low.CO2e_production_based + g_water_org_high.CO2e_production_based
    )
    g_water.CO2e_production_based = (
        g_water_min.CO2e_production_based + g_water_org.CO2e_production_based
    )
    g_water.CO2e_total = g_water.CO2e_production_based
    g_water_org.area_ha = g_water_org_low.area_ha + g_water_org_high.area_ha

    g_water_org.CO2e_total = g_water_org.CO2e_production_based
    g_settlement_min.area_ha = g_settlement.area_ha * g_settlement_min.pct_x
    g_other.area_ha = entries.m_area_veg_plant_uncover_com * fact(
        "Fact_L_G_area_plant_uncover_pct_other"
    )
    g_other.CO2e_production_based_per_t = fact(
        "Fact_L_G_other_minrl_soil_CO2e_per_ha_2018"
    )
    g_other.CO2e_production_based = (
        g_other.CO2e_production_based_per_t * g_other.area_ha
    )

    g_settlement_org_low.pct_x = fact("Fact_L_G_fraction_org_soil_fen_settl")
    g_settlement_min.CO2e_production_based = (
        g_settlement_min.CO2e_production_based_per_t * g_settlement_min.area_ha
    )
    g_settlement_org_low.CO2e_production_based_per_t = fact(
        "Fact_L_G_settl_org_soil_fen_CO2e_per_ha_2018"
    )
    g_settlement_org_low.area_ha = g_settlement.area_ha * g_settlement_org_low.pct_x
    g_settlement_org_high.pct_x = fact("Fact_L_G_fraction_org_soil_bog_settl")
    g_settlement_org_low.CO2e_production_based = (
        g_settlement_org_low.CO2e_production_based_per_t * g_settlement_org_low.area_ha
    )
    g_settlement_org_high.CO2e_production_based_per_t = fact(
        "Fact_L_G_settl_org_soil_bog_CO2e_per_ha_2018"
    )
    g_settlement_org_high.area_ha = g_settlement.area_ha * g_settlement_org_high.pct_x
    g_settlement.pct_x = (
        g_settlement_min.pct_x
        + g_settlement_org_low.pct_x
        + g_settlement_org_high.pct_x
    )
    g_settlement_org_high.CO2e_production_based = (
        g_settlement_org_high.CO2e_production_based_per_t
        * g_settlement_org_high.area_ha
    )
    g_settlement.CO2e_production_based = (
        g_settlement_min.CO2e_production_based
        + g_settlement_org_low.CO2e_production_based
        + g_settlement_org_high.CO2e_production_based
    )
    g_settlement.CO2e_total = g_settlement.CO2e_production_based
    g_settlement_org.pct_x = g_settlement_org_low.pct_x + g_settlement_org_high.pct_x
    g_settlement_org.area_ha = (
        g_settlement_org_low.area_ha + g_settlement_org_high.area_ha
    )
    g_settlement_org.CO2e_production_based = (
        g_settlement_org_low.CO2e_production_based
        + g_settlement_org_high.CO2e_production_based
    )
    g_settlement_org.CO2e_total = g_settlement_org.CO2e_production_based

    g.area_ha = (
        g_forest.area_ha
        + g_crop.area_ha
        + g_grass.area_ha
        + g_grove.area_ha
        + g_wet.area_ha
        + g_water.area_ha
        + g_settlement.area_ha
        + g_other.area_ha
    )
    g_wood.CO2e_production_based_per_t = fact("Fact_L_G_wood_CO2e_per_ha_2018")

    g_other.CO2e_total = g_other.CO2e_production_based

    g_wood.area_ha = g_forest_managed.area_ha

    g_wood.CO2e_production_based = g_wood.CO2e_production_based_per_t * g_wood.area_ha

    g.CO2e_production_based = (
        g_forest.CO2e_production_based
        + g_crop.CO2e_production_based
        + g_grass.CO2e_production_based
        + g_grove.CO2e_production_based
        + g_wet.CO2e_production_based
        + g_water.CO2e_production_based
        + g_settlement.CO2e_production_based
        + g_other.CO2e_production_based
        + g_wood.CO2e_production_based
    )
    g_wood.CO2e_total = g_wood.CO2e_production_based

    g.CO2e_total = (
        g_forest.CO2e_total
        + g_crop.CO2e_total
        + g_grass.CO2e_total
        + g_grove.CO2e_total
        + g_wet.CO2e_total
        + g_water.CO2e_total
        + g_settlement.CO2e_total
        + g_other.CO2e_total
        + g_wood.CO2e_total
    )

    l.CO2e_production_based = g.CO2e_production_based
    l.CO2e_combustion_based = g.CO2e_combustion_based
    l.CO2e_total = g.CO2e_total
    g_forest.pct_x = 1.0
    g_forest_managed.CO2e_total = (
        g_forest_managed.CO2e_production_based + g_forest_managed.CO2e_combustion_based
    )
    g_forest_natural.CO2e_total = g_forest_natural.CO2e_production_based
    g_crop_min_conv.CO2e_total = g_crop_min_conv.CO2e_production_based
    g_crop_org_low.CO2e_total = g_crop_org_low.CO2e_production_based
    g_crop_org_high.CO2e_total = g_crop_org_high.CO2e_production_based
    g_grass_min_conv.CO2e_total = g_grass_min_conv.CO2e_production_based
    g_grass_org_low.CO2e_total = g_grass_org_low.CO2e_production_based
    g_grass_org_high.CO2e_total = g_grass_org_high.CO2e_production_based
    g_grove_min.CO2e_total = g_grove_min.CO2e_production_based
    g_grove_org_low.CO2e_total = g_grove_org_low.CO2e_production_based
    g_grove_org_high.CO2e_total = g_grove_org_high.CO2e_production_based
    g_wet_min.CO2e_total = g_wet_min.CO2e_production_based
    g_wet_org_low.CO2e_total = g_wet_org_low.CO2e_production_based
    g_wet_org_high.CO2e_total = g_wet_org_high.CO2e_production_based
    g_water_min.CO2e_total = g_water_min.CO2e_production_based
    g_water_org_low.CO2e_total = g_water_org_low.CO2e_production_based
    g_grove_org.CO2e_production_based = (
        g_grove_org_low.CO2e_production_based + g_grove_org_high.CO2e_production_based
    )
    g_grove_org.CO2e_total = g_grove_org.CO2e_production_based
    g_water_org_high.CO2e_total = g_water_org_high.CO2e_production_based
    g_settlement_min.CO2e_total = g_settlement_min.CO2e_production_based
    g_settlement_org_low.CO2e_total = g_settlement_org_low.CO2e_production_based
    g_settlement_org_high.CO2e_total = g_settlement_org_high.CO2e_production_based
    pyrolysis.CO2e_total = 0

    g_wet_org_r.CO2e_total = 0
    g_crop_min_hum = Vars7()
    g_crop_min_hum.CO2e_total = 0

    return L18(
        l=l,
        g=g,
        g_forest=g_forest,
        g_forest_managed=g_forest_managed,
        g_forest_natural=g_forest_natural,
        g_crop=g_crop,
        g_crop_org=g_crop_org,
        g_crop_min_conv=g_crop_min_conv,
        g_crop_min_hum=g_crop_min_hum,
        g_crop_org_low=g_crop_org_low,
        g_crop_org_high=g_crop_org_high,
        g_grass=g_grass,
        g_grass_min_conv=g_grass_min_conv,
        g_grass_org=g_grass_org,
        g_grass_org_low=g_grass_org_low,
        g_grass_org_high=g_grass_org_high,
        g_grove=g_grove,
        g_grove_min=g_grove_min,
        g_grove_org=g_grove_org,
        g_grove_org_low=g_grove_org_low,
        g_grove_org_high=g_grove_org_high,
        g_wet=g_wet,
        g_wet_min=g_wet_min,
        g_wet_org=g_wet_org,
        g_wet_org_r=g_wet_org_r,
        g_wet_org_low=g_wet_org_low,
        g_wet_org_high=g_wet_org_high,
        g_water=g_water,
        g_water_org=g_water_org,
        g_water_min=g_water_min,
        g_water_org_low=g_water_org_low,
        g_water_org_high=g_water_org_high,
        g_settlement=g_settlement,
        g_settlement_org=g_settlement_org,
        g_settlement_min=g_settlement_min,
        g_settlement_org_low=g_settlement_org_low,
        g_settlement_org_high=g_settlement_org_high,
        g_other=g_other,
        g_wood=g_wood,
        pyrolysis=pyrolysis,
    )
