# pyright: strict

from dataclasses import dataclass, InitVar

from ...inputs import Inputs
from ...agri2018.a18 import A18

from .co2e_change_energy_agri import CO2eChangeEnergyAgri
from .co2e_change_p_operation_heat import CO2eChangePOperationHeat


@dataclass(kw_only=True)
class CO2eChangePOperationElecHeatpump(CO2eChangeEnergyAgri):
    demand_electricity: float = 0

    inputs: InitVar[Inputs]
    what: InitVar[str]
    a18: InitVar[A18]
    operation_heat: InitVar[CO2eChangePOperationHeat]

    def __post_init__(self, inputs: Inputs, what: str, a18: A18, operation_heat: CO2eChangePOperationHeat):  # type: ignore

        self.energy = operation_heat.demand_heatpump / inputs.fact(
            "Fact_R_S_heatpump_mean_annual_performance_factor_all"
        )
        self.demand_electricity = self.energy

        CO2eChangeEnergyAgri.__post_init__(self, inputs=inputs, what=what, a18=a18)
