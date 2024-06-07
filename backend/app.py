from flask import Flask, abort, request
from dataclasses import dataclass, asdict
from enum import Enum
import json


class CommuteMode(str, Enum):
    UNKNOWN = "unknown"
    WALK = "walk"
    BIKE = "bike"
    BUS = "bus"
    CAR = "car"
    TRAIN = "train"
    MOTORBIKE = "motorbike"


@dataclass
class TotalByMode:
    mode: CommuteMode
    total_kg_co2e: float


@dataclass
class Scenario:
    one_way_distance: float
    commute_days_per_year: int
    primary_mode: CommuteMode
    secondary_mode: CommuteMode | None = None
    primary_mode_proportion: float = 1.0
    secondary_mode_proportion: float = 0.0


@dataclass
class SimulationResult:
    scenario: Scenario
    total_kg_co2e: float
    total_kg_co2e_per_mode: list[TotalByMode]


def simulate_commute(scenario: Scenario) -> SimulationResult:

    emission_factors_by_mode = {
        CommuteMode.BIKE: 0,
        CommuteMode.BUS: 0.102150394630872,
        CommuteMode.CAR: 0.166638587919463,
        CommuteMode.TRAIN: 0.0354629637583893,
        CommuteMode.WALK: 0,
        CommuteMode.MOTORBIKE: 0.11367426442953,
    }

    total_by_mode = []

    primary_mode_total_kg_co2e = (
        emission_factors_by_mode.get(scenario.primary_mode, 0)
        * scenario.one_way_distance
        * 2
        * scenario.commute_days_per_year
        * scenario.primary_mode_proportion
    )

    total_by_mode.append(
        TotalByMode(
            mode=scenario.primary_mode, total_kg_co2e=primary_mode_total_kg_co2e
        )
    )

    secondary_mode_total_kg_co2e = (
        0
        if not scenario.secondary_mode
        else (
            emission_factors_by_mode.get(scenario.secondary_mode, 0)
            * scenario.one_way_distance
            * 2
            * scenario.commute_days_per_year
            * scenario.secondary_mode_proportion
        )
    )

    if scenario.secondary_mode:
        total_by_mode.append(
            TotalByMode(
                mode=scenario.secondary_mode, total_kg_co2e=secondary_mode_total_kg_co2e
            )
        )

    return SimulationResult(
        scenario=scenario,
        total_kg_co2e=primary_mode_total_kg_co2e + secondary_mode_total_kg_co2e,
        total_kg_co2e_per_mode=total_by_mode,
    )


app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/simulate")
def simulate():

    def parameters_to_scenario() -> Scenario:

        try:

            primary_mode_param = request.args.get("primary_mode")
            if not primary_mode_param:
                abort(400)
            primary_mode = CommuteMode(primary_mode_param)

            secondary_mode_param = request.args.get("secondary_mode", None)
            secondary_mode = None
            if secondary_mode_param:
                secondary_mode = CommuteMode(secondary_mode_param)

            return Scenario(
                one_way_distance=float(request.args.get("one_way_distance", "10")),
                commute_days_per_year=int(
                    request.args.get("commute_days_per_year", "200")
                ),
                primary_mode=primary_mode,
                secondary_mode=secondary_mode,
                primary_mode_proportion=1.0 if not secondary_mode else 0.8,
                secondary_mode_proportion=0.0 if not secondary_mode else 0.2,
            )
        except Exception as ex:
            print(ex)
            abort(400)

    scenario = parameters_to_scenario()
    return asdict(simulate_commute(scenario))
