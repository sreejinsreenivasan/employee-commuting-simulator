# Full Stack Developer Coding Exercise - Employee Commuting Simulator

Employee Commuting Simulator - estimate the carbon emissions associated with a different commuting options.

## Task

Your task is to implement a simple UI for an employee commuting simulator using Typescript, React, React Router and Ant Design.

_User Story:_ As a user, I want to explore different options for traveling to work so that I understand the impacts of my choices.

Here is the starting point for the frontend in [./frontend/src/pages/simulator.tsx](./frontend/src/pages/simulator.tsx): ![](./docs/images/starting_point.png)

A basic python API is provided in [](./backend/app.py) which you will use from the frontend to simulate carbon emissions. See API documentation below.

Your solution should:

__Simulation Input__

* Provide a simple, clear form input to change simulation parameters (see the `Scenario` data type and `simulate` API endpoint in [./backend/app.py](./backend/app.py) to understand the possible inputs / parameters)
* Call the http api at http://localhost:5000/simulate to simulate a given scenario.

__Simulation Output__

* Provide a visualisation of the overall `total_kg_co2e` (see `SimulationResults.total_kg_co2e` in [./backend/app.py](./backend/app.py)) for a given `SimulationResult`. Ant Design's `Statistic` component might be a good option.
* Provide a bar chart showing the the "total_kg_co2e" by commute mode (see `SimulationResult.total_kg_co2e_per_mode` in [./backend/app.py](./backend/app.py)) for a simulation result. https://echarts.apache.org/en/index.html or https://react-chartjs-2.js.org/ may be a good option.
* Provide a description / visualisationof the Scenario that was simulated (See `SimulationResult.scenario`)

## Dev Setup

### Requirements

* node + npm >= v20.9.0
* python 3

### Installation

Frontend:

```
# If you use nvm, activate the correct version of node
nvm use <versino>

cd frontend/
npm install

# run the frontend server on port 5174
npm run dev

```

Backend:

```
cd backend/
python3 -m venv .venv
source .venv

pip install -r requirements.txt

# Run the server on port 5000
flask run

```

## API

To simulate different commuting options, use the api at [http://localhost:5000/simulate]().

Examples:
```
GET http://localhost:5000/simulate?primary_mode=bus&one_way_distance=20&secondary_mode=train


GET http://localhost:5000/simulate?primary_mode=car&one_way_distance=50

```

Options for the `primary_mode` and `secondary_mode` parameters are defined by the `CommuteMode` enum in [./backend/app.py](./backend/app.py).

At a minimum, you must provide `primary_mode` to get simulate a commute with a default one way distance of 10km.
