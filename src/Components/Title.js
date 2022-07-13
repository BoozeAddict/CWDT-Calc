import { Row } from "react-bootstrap";

function Title(props) {
  return (
    <Row className="mt-sm-0 title">
      <h2>{props.title}</h2>
    </Row>
  );
}

export { Title };
