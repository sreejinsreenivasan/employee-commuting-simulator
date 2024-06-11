import React, { useRef, useEffect } from "react";
import { Statistic, Card } from "antd";
import { SimulationResult } from "../types";
import Chart from "chart.js/auto";

interface CommuteResultsProps {
  results: SimulationResult;
}

const CommuteResults: React.FC<CommuteResultsProps> = ({ results }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    // Destroy the existing chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const data = {
      labels: results.total_kg_co2e_per_mode.map((mode) => mode.mode),
      datasets: [
        {
          label: "CO2 Emissions (kg)",
          data: results.total_kg_co2e_per_mode.map(
            (mode) => mode.total_kg_co2e
          ),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    };

    // Create a new chart instance
    const newChart = new Chart(
      document.getElementById("chart") as HTMLCanvasElement,
      {
        type: "bar",
        data: data,
      }
    );

    chartRef.current = newChart;

    // Clean up the chart instance on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [results]);

  return (
    <div>
      <Card>
        <Statistic
          title="Total CO2 Emissions"
          value={results.total_kg_co2e}
          precision={2}
          suffix="kg"
        />
      </Card>
      <canvas id="chart" />
      <Card>
        <h3>Simulation Parameters</h3>
        <p>One Way Distance: {results.scenario.one_way_distance} km</p>
        <p>Commute Days Per Year: {results.scenario.commute_days_per_year}</p>
        <p>Primary Mode: {results.scenario.primary_mode}</p>
        <p>Secondary Mode: {results.scenario.secondary_mode || "None"}</p>
        <p>
          Primary Mode Proportion: {results.scenario.primary_mode_proportion}
        </p>
        <p>
          Secondary Mode Proportion:{" "}
          {results.scenario.secondary_mode_proportion}
        </p>
      </Card>
    </div>
  );
};

export default CommuteResults;
