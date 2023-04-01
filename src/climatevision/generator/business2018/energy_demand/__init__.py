# pyright: strict

from dataclasses import dataclass

from ...inputs import Inputs

from ..dataclasses import (
    Vars2,
    # Vars3,
    # Vars4,
)


@dataclass(kw_only=True)
class Production:

    # total: Vars2

    # nonresi: Vars3
    # nonresi_com: Vars4
    # elec_elcon: Vars2
    elec_heatpump: Vars2
    # vehicles: Vars2
    # other: Vars2


def calc_production(
    inputs: Inputs,
    s_heatpump_energy: float,
) -> Production:

    fact = inputs.fact

    elec_heatpump = Vars2()
    elec_heatpump.energy = s_heatpump_energy / fact(
        "Fact_R_S_heatpump_mean_annual_performance_factor_all"
    )

    return Production(
        # total=total,
        # nonresi=nonresi,
        # nonresi_com=nonresi_com,
        # elec_elcon=elec_elcon,
        elec_heatpump=elec_heatpump,
        # vehicles=vehicles,
        # other=other,
    )
