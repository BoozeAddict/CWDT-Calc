import { createContext, useEffect, useState } from "react";

const StatsContext = createContext();

function getLocalStorage(key) {
  const obj = localStorage.getItem(key);
  console.log(obj);
  if (obj === null) return {};
  else return JSON.parse(obj);
}

function setLocalStorage(key, object) {
  const str = JSON.stringify(object);
  localStorage.setItem(key, str);
}

function StatsProvider({ children }) {
  const defaultStats = {
    chaosRes: -60,
    armour: 0,
    life: 2600,
    ward: 1600,
    ringDmg1: 420,
    ringDmg2: 420,
    skeleLvl: 11,
    cwdtLvl: 21,
    cwdtType: 1,
    cwdtQual: 20,
  };
  const localStats = getLocalStorage("stats");
  console.log(typeof localStats);
  if (typeof localStats === "object") {
    if (Object.keys(localStats).length > 0) {
      for (const [key, value] of Object.entries(localStats)) {
        defaultStats[key] = value;
      }
    }
  }

  const [stats, setStats] = useState(defaultStats);
  useEffect(() => {
    setLocalStorage("stats", stats);
  }, [stats]);
  const calculations = {
    countSkeles: 0,
    dmgFromSkeles: 0,
    dmgFromRite: 0,
    dmgTotal: 0,
    dmgRequired: 0,
  };

  return (
    <StatsContext.Provider value={{ stats, setStats, calculations }}>
      {children}
    </StatsContext.Provider>
  );
}

export { StatsProvider };
export default StatsContext;
