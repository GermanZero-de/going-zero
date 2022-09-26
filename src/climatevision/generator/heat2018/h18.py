# pyright: strict

from dataclasses import dataclass

from ..common.co2eEmissions import CO2eEmissions

from .energy_demand import EnergyDemand
from .dataclasses import (
    Vars3,
    Vars4,
    Vars5,
    Vars6,
    Vars7,
    Vars8FromEnergy,
    Vars8FromEnergySum,
    Vars8FromEnergyPct,
)


@dataclass(kw_only=True)
class H18:
    d: EnergyDemand
    d_r: EnergyDemand
    d_b: EnergyDemand
    d_i: EnergyDemand
    d_t: EnergyDemand
    d_a: EnergyDemand

    h: CO2eEmissions

    p: Vars3
    p_gas: Vars4
    p_lpg: Vars5
    p_fueloil: Vars5
    p_opetpro: Vars4
    p_coal: Vars4
    p_heatnet: Vars6
    p_heatnet_cogen: Vars5
    p_heatnet_plant: Vars5
    p_heatnet_geoth: Vars7
    p_heatnet_lheatpump: Vars7
    p_biomass: Vars8FromEnergy
    p_ofossil: Vars8FromEnergy
    p_orenew: Vars8FromEnergySum
    p_solarth: Vars8FromEnergyPct
    p_heatpump: Vars8FromEnergyPct
