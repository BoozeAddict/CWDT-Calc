import { Row } from "react-bootstrap";
import { Title } from "./Title";
import { InputStat } from "./InputStat";
import StatsContext from "../Context/StatsContext.js";
import { useContext } from "react";

function ProcessInput(value) {
  if (value === "") return "";
  else if (value === "-") return "-";
  else return parseInt(value);
}

function InputStats(retStats) {
  const cwdt_options = [
    { value: "1", option: "Superior" },
    { value: "2", option: "Divergent" },
  ];
  const { stats, setStats } = useContext(StatsContext);

  const setChaosRes = (e) =>
    setStats({ ...stats, chaosRes: ProcessInput(e.target.value) });
  const setArmour = (e) =>
    setStats({ ...stats, armour: ProcessInput(e.target.value) });
  const setLife = (e) =>
    setStats({ ...stats, life: ProcessInput(e.target.value) });
  const setWard = (e) =>
    setStats({ ...stats, ward: ProcessInput(e.target.value) });
  const setRingDmg1 = (e) =>
    setStats({ ...stats, ringDmg1: ProcessInput(e.target.value) });
  const setRingDmg2 = (e) =>
    setStats({ ...stats, ringDmg2: ProcessInput(e.target.value) });
  const setSkeleLvl = (e) =>
    setStats({ ...stats, skeleLvl: ProcessInput(e.target.value) });
  const setCwdtLvl = (e) =>
    setStats({ ...stats, cwdtLvl: ProcessInput(e.target.value) });
  const setCwdtType = (e) =>
    setStats({ ...stats, cwdtType: ProcessInput(e.target.value) });
  const setCwdtQual = (e) =>
    setStats({ ...stats, cwdtQual: ProcessInput(e.target.value) });

  return (
    <>
      <Title title="Enter your stats" />
      <Row>
        <InputStat
          type="InputGroup"
          addon="%"
          useState={setChaosRes}
          value={stats.chaosRes}
        >
          Chaos resistance
        </InputStat>
        <InputStat useState={setArmour} value={stats.armour}>
          Armour
        </InputStat>
        <InputStat useState={setLife} value={stats.life}>
          Life
        </InputStat>
        <InputStat useState={setWard} value={stats.ward}>
          Ward (with flask)
        </InputStat>
        <InputStat useState={setRingDmg1} value={stats.ringDmg1}>
          Ring 1 self-damage
        </InputStat>
        <InputStat useState={setRingDmg2} value={stats.ringDmg2}>
          Ring 2 self-damage
        </InputStat>
        <InputStat useState={setSkeleLvl} value={stats.skeleLvl}>
          Summon skeletons level
        </InputStat>
        <InputStat useState={setCwdtLvl} value={stats.cwdtLvl}>
          CWDT gem level
        </InputStat>
        <InputStat
          type="list"
          options={cwdt_options}
          useState={setCwdtType}
          value={stats.cwdtType}
        >
          CWDT quality type
        </InputStat>
        <InputStat
          type="InputGroup"
          addon="%"
          useState={setCwdtQual}
          value={stats.cwdtQual}
        >
          CWDT gem quality
        </InputStat>
      </Row>
    </>
  );
}

export { InputStats };
