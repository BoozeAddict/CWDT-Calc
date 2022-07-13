import { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import StatsContext from "../Context/StatsContext";

function Result(props) {
  return (
    <Row className={"result " + props.success + " align-items-center py-2"}>
      <span>{props.children}</span>
    </Row>
  );
}

function Results() {
  const { calculations, stats } = useContext(StatsContext);
  var dmgResult = {};
  var wardResult = {};
  if (calculations.dmgRequired < calculations.dmgTotal) {
    dmgResult = {
      className: "true",
      text: "You are taking enough damage to loop.",
    };
  } else {
    console.log(
      "req: " + calculations.dmgRequired + "\ttotal: " + calculations.dmgTotal
    );
    dmgResult = {
      className: "false",
      text: "You are NOT taking enough damage to loop.",
    };
  }
  if (stats.ward >= calculations.dmgFromRite) {
    wardResult = { className: "true", text: "You are have enough ward." };
  } else {
    wardResult = { className: "false", text: "You do NOT have enough ward." };
  }

  return (
    <Row className="flex-grow-1">
      <Col className="mt-5 my-md-auto">
        <Result success={dmgResult.className}>{dmgResult.text}</Result>
        <Result success={wardResult.className}>{wardResult.text}</Result>
      </Col>
    </Row>
  );
}

export { Results };
