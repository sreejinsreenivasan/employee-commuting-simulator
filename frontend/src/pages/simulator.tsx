import { Col, Divider, Row } from "antd";
import CommuteResults from "../components/CommuteResults";
import CommuteForm from "../components/CommuteForm";
import { useState } from "react";
import { SimulationResult } from "../types";

export function SimulatorPage() {
  const [results, setResults] = useState<SimulationResult | null>(null);

  const onFinish = async (values: {
    oneWayDistance: number;
    commuteDaysPerYear: number;
    primaryMode: string;
    secondaryMode?: string | undefined;
  }) => {
    const params = new URLSearchParams({
      primary_mode: values.primaryMode,
      one_way_distance: values.oneWayDistance.toString(),
      secondary_mode: values.secondaryMode || "",
      commute_days_per_year: values.commuteDaysPerYear.toString(),
    });
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/simulate?" + params.toString()
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching simulation results", error);
    }
  };
  return (
    <>
      <Row>
        <Col span={6}>
          <h1>Controls</h1>
          <CommuteForm onFinish={onFinish} />
        </Col>
        <Col span={1}>
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col span={17}>
          <h1>Effect</h1>
          {results && <CommuteResults results={results} />}
        </Col>
      </Row>
    </>
  );
}
