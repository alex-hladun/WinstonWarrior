import * as React from "react";
import { loadStats } from "../db/dbSetup";
import { StatContext } from "../context/StatContext";

export function useHandicap(user_id) {
  const statContext = React.useContext(StatContext);
  const [handicap, setHandicap] = React.useState(0);

  React.useEffect(() => {
    console.log("RETREVING HCPP");
    const getHandicap = async (user_id) => {
      const roundHistory = await loadStats(user_id);

      const sortedHistory = roundHistory.sort(
        (a, b) => a.hcp_diff - b.hcp_diff
      );

      let count = 0;
      let hcpIndex = 0;
      sortedHistory.forEach((score) => {
        if (count < 8) {
          count += 1;
          hcpIndex += score.hcp_diff;
        }
      });

      if (count) {
        setHandicap(hcpIndex / count);
      }
    };

    getHandicap(1);
  }, [statContext.value.state.handicapUpdate]);

  return handicap;
}
