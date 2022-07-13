import { Row, Col, InputGroup, Form, FormSelect } from "react-bootstrap";

function StatsInputWrapper(props) {
  return (
    <Col xs="12">
      <Row className="my-1 my-md-0 align-items-center">
        <Col md="8" className="stats-label">
          <Form.Label>{props.label}</Form.Label>
        </Col>
        <Col md="4">{props.children}</Col>
      </Row>
    </Col>
  );
}

function IsCorrectInput(e) {
  return (
    /[0-9]/.test(e.key) ||
    (/[-]/.test(e.key) &&
      !/[-]/.test(e.target.value) &&
      e.target.selectionStart === 0)
  );
}

function BlockWrongInput(e) {
  if (!IsCorrectInput(e)) {
    e.preventDefault();
  }
}

function InputStat(props) {
  if (props.type === "InputGroup") {
    return (
      <>
        <StatsInputWrapper label={props.children}>
          <InputGroup>
            <Form.Control
              value={props.value}
              type="number"
              onChange={props.useState}
              onKeyPress={(e) => BlockWrongInput(e)}
            />
            <InputGroup.Text>{props.addon}</InputGroup.Text>
          </InputGroup>
        </StatsInputWrapper>
      </>
    );
  } else if (props.type === "list") {
    return (
      <>
        <StatsInputWrapper label={props.children}>
          <FormSelect value={props.value} onChange={props.useState}>
            {props.options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.option}
              </option>
            ))}
          </FormSelect>
        </StatsInputWrapper>
      </>
    );
  } else {
    return (
      <>
        <StatsInputWrapper label={props.children}>
          <Form.Control
            inputmode="numeric"
            value={props.value}
            onChange={props.useState}
            onKeyPress={(e) => BlockWrongInput(e)}
          />
        </StatsInputWrapper>
      </>
    );
  }
}

export { InputStat };
