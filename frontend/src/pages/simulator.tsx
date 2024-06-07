import { Col, Divider, Row } from "antd";

export function SimulatorPage() {
  return (<>
    <Row>
      <Col span={6}>
        <h1>Controls</h1>
        <p>TODO: add controls</p>
      </Col>
      <Col span={1}>
        <Divider type="vertical" style={{ height: '100%' }} />
      </Col>
      <Col span={17}>
        <h1>Effect</h1>
        <p>TODO: add visualisation of results</p>
      </Col>
    </Row>
  </>)
}
