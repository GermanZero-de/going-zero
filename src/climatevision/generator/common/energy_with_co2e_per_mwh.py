# pyright: strict

from dataclasses import dataclass

from ..utils import div

from .energy import EnergyWithPercentage
from .energy_with_co2e import EnergyWithCO2e


@dataclass(kw_only=True)
class EnergyWithCO2ePerMWh(EnergyWithCO2e):
    CO2e_combustion_based_per_MWh: float = 0
    CO2e_production_based_per_MWh: float = 0

    def __post_init__(self):
        self.CO2e_combustion_based = self.energy * self.CO2e_combustion_based_per_MWh
        self.CO2e_production_based = self.energy * self.CO2e_production_based_per_MWh

        EnergyWithCO2e.__post_init__(self)

    @classmethod
    def calc_sum(cls, *childs: "EnergyWithCO2ePerMWh") -> "EnergyWithCO2ePerMWh":
        energy = sum(child.energy for child in childs)

        CO2e_combustion_based = sum(child.CO2e_combustion_based for child in childs)
        CO2e_production_based = sum(child.CO2e_production_based for child in childs)

        CO2e_total = CO2e_production_based + CO2e_combustion_based

        CO2e_combustion_based_per_MWh = div(CO2e_combustion_based, energy)
        CO2e_production_based_per_MWh = div(CO2e_production_based, energy)

        return cls(
            energy=energy,
            CO2e_combustion_based=CO2e_combustion_based,
            CO2e_combustion_based_per_MWh=CO2e_combustion_based_per_MWh,
            CO2e_production_based=CO2e_production_based,
            CO2e_production_based_per_MWh=CO2e_production_based_per_MWh,
            CO2e_total=CO2e_total,
        )


@dataclass(kw_only=True)
class EnergyWithPercentageWithCO2ePerMWh(EnergyWithPercentage, EnergyWithCO2ePerMWh):
    def __post_init__(self, total_energy: float):  # type: ignore
        self.CO2e_combustion_based = self.energy * self.CO2e_combustion_based_per_MWh
        self.CO2e_production_based = self.energy * self.CO2e_production_based_per_MWh
        self.CO2e_total = self.CO2e_production_based + self.CO2e_combustion_based

        EnergyWithPercentage.__post_init__(self, total_energy)
