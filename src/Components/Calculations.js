import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import StatsContext from "../Context/StatsContext";
import { Title } from "./Title";

function Calculation(props) {
  return (
    <Row className="calculations align-items-center">
      <Col>
        <label>{props.children}</label>
      </Col>
      <Col xs="auto">
        <label>{props.result}</label>
      </Col>
    </Row>
  );
}

const cwdtTable = [
  { level: 1, damage: 528 },
  { level: 2, damage: 583 },
  { level: 3, damage: 661 },
  { level: 4, damage: 725 },
  { level: 5, damage: 812 },
  { level: 6, damage: 897 },
  { level: 7, damage: 1003 },
  { level: 8, damage: 1107 },
  { level: 9, damage: 1221 },
  { level: 10, damage: 1354 },
  { level: 11, damage: 1485 },
  { level: 12, damage: 1635 },
  { level: 13, damage: 1804 },
  { level: 14, damage: 1980 },
  { level: 15, damage: 2184 },
  { level: 16, damage: 2394 },
  { level: 17, damage: 2621 },
  { level: 18, damage: 2874 },
  { level: 19, damage: 3142 },
  { level: 20, damage: 3272 },
  { level: 21, damage: 3580 },
  { level: 22, damage: 3950 },
];

function EnsureNumber(value) {
  if (typeof value != "number") value = 0;
  return value;
}

function ProcessNumbers(dict) {
  dict.chaosRes = EnsureNumber(dict.chaosRes);
  dict.armour = EnsureNumber(dict.armour);
  dict.life = EnsureNumber(dict.life);
  dict.ward = EnsureNumber(dict.ward);
  dict.ringDmg1 = EnsureNumber(dict.ringDmg1);
  dict.ringDmg2 = EnsureNumber(dict.ringDmg2);
  dict.skeleLvl = EnsureNumber(dict.skeleLvl);
  dict.cwdtLvl = EnsureNumber(dict.cwdtLvl);
  dict.cwdtType = EnsureNumber(dict.cwdtType);
  dict.cwdtQual = EnsureNumber(dict.cwdtQual);
}

function Calculations() {
  const { calculations, stats } = useContext(StatsContext);
  ProcessNumbers(stats);
  if (stats.skeleLvl <= 0) calculations.countSkeles = 0;
  else if (stats.skeleLvl < 11) calculations.countSkeles = 2;
  else if (stats.skeleLvl < 21) calculations.countSkeles = 3;
  else calculations.countSkeles = 4;

  let dmgFromSkelesRaw =
    calculations.countSkeles * (stats.ringDmg1 + stats.ringDmg2);
  if (dmgFromSkelesRaw === 0) calculations.dmgFromSkeles = 0;
  else
    calculations.dmgFromSkeles =
      (Math.pow(dmgFromSkelesRaw, 2) * 5) /
      (stats.armour + dmgFromSkelesRaw * 5);
  calculations.dmgFromRite = stats.life * 0.4 * (1 - stats.chaosRes / 100);
  calculations.dmgTotal = calculations.dmgFromSkeles + calculations.dmgFromRite;
  calculations.dmgFromSkeles = Math.round(calculations.dmgFromSkeles);
  calculations.dmgFromRite = Math.round(calculations.dmgFromRite);
  calculations.dmgTotal = Math.round(calculations.dmgTotal);
  if (stats.cwdtLvl < 1) stats.cwdtLvl = 1;
  else if (stats.cwdtLvl > 21) stats.cwdtLvl = 21;
  let cwdtDmg = cwdtTable.find((o) => {
    return o.level === stats.cwdtLvl;
  }).damage;
  if (stats.cwdtType === 2) {
    calculations.dmgRequired = cwdtDmg * (1 - stats.cwdtQual / 100);
  } else {
    calculations.dmgRequired = cwdtDmg;
  }

  return (
    <>
      <Title title="Calculations" />
      <Calculation result={calculations.dmgFromSkeles}>
        Damage taken from skeletons
      </Calculation>
      <Calculation result={calculations.dmgFromRite}>
        Damage from Forbidden rite
      </Calculation>
      <Calculation result={calculations.dmgTotal}>
        Total damage taken
      </Calculation>
      <Calculation result={calculations.dmgRequired}>
        Damage required to loop
      </Calculation>
    </>
  );
}

export { Calculations };
