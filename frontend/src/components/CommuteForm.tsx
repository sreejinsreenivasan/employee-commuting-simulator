import React from "react";
import { Form, InputNumber, Select, Button } from "antd";
import { CommuteMode } from "../types";

const { Option } = Select;

interface CommuteFormProps {
  onFinish: (values: {
    oneWayDistance: number;
    commuteDaysPerYear: number;
    primaryMode: CommuteMode;
    secondaryMode?: CommuteMode;
  }) => void;
}

const CommuteForm: React.FC<CommuteFormProps> = ({ onFinish }) => {
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="oneWayDistance"
        label="One Way Distance (km)"
        rules={[{ required: true, message: "Please input distance!" }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        name="commuteDaysPerYear"
        label="Commute Days Per Year"
        rules={[{ required: true, message: "Please input commute days!" }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        name="primaryMode"
        label="Primary Mode"
        rules={[{ required: true, message: "Please select a primary mode!" }]}
      >
        <Select placeholder="Select a primary mode">
          <Option value="walk">Walk</Option>
          <Option value="bike">Bike</Option>
          <Option value="bus">Bus</Option>
          <Option value="car">Car</Option>
          <Option value="train">Train</Option>
          <Option value="motorbike">Motorbike</Option>
        </Select>
      </Form.Item>
      <Form.Item name="secondaryMode" label="Secondary Mode">
        <Select placeholder="Select a secondary mode" allowClear>
          <Option value="walk">Walk</Option>
          <Option value="bike">Bike</Option>
          <Option value="bus">Bus</Option>
          <Option value="car">Car</Option>
          <Option value="train">Train</Option>
          <Option value="motorbike">Motorbike</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Simulate
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommuteForm;
