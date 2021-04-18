import * as React from "react";
import { loadTotalPctHistory, loadTotalPuttHistory } from "../db/dbSetup";
import { StatContext } from "../context/StatContext";
import { AppContext } from "../context/AppContext";

export function useTotalPctHistory(user_id) {
  const statContext = React.useContext(StatContext);
  const appContext = React.useContext(AppContext);
  const [pctHistory, setPctHistory] = React.useState([]);

  const getPctHistory = async (user_id) => {
    const totalpctHistoy = await loadTotalPctHistory(user_id);
    // console.log("🚀 ~ file: useTotalPctHistory.js ~ line 13 ~ getPctHistory ~ totalpctHistoy", totalpctHistoy)

    const pctArrayObj = {
      fwyPct: totalpctHistoy.totalHolesPlayed
        .map((hP, i) => {
          if (totalpctHistoy.fwyHit[i]) {
            return Math.round((totalpctHistoy.fwyHit[i] * 100) / hP, 0);
          } else {
            return 0;
          }
        })
        .reverse(),
      girPct: totalpctHistoy.totalHolesPlayed
        .map((hP, i) => {
          return Math.round((totalpctHistoy.girHit[i] * 100) / hP, 0);
        })
        .reverse(),
      scramblePct: totalpctHistoy.totalHolesPlayed
        .map((hP, i) => {
          // console.log("🚀 ~ file: useTotalPctHistory.js ~ line 27 ~ scramblePct:totalpctHistoy.totalHolesPlayed.map ~ hP", hP)
          if (!totalpctHistoy.scrambleSuccess[i]) {
            // TODO: replae this by getting the scramble percents that are 0
            return 0;
          } else if (hP - totalpctHistoy.girHit[i] <= 0) {
            return 0;
          } else {
            // console.log(
            //   "🚀 ~ file: useTotalPctHistory.js ~ line 33 ~ scramblePct:totalpctHistoy.totalHolesPlayed.map ~ totalpctHistoy.scrambleSuccess[i]",
            //   totalpctHistoy.scrambleSuccess[i]
            // );
            console.log(
              Math.round(
                (totalpctHistoy.scrambleSuccess[i] * 100) /
                  (hP - totalpctHistoy.girHit[i]),
                0
              )
            );
            return Math.round(
              (totalpctHistoy.scrambleSuccess[i] * 100) /
                (hP - totalpctHistoy.girHit[i]),
              0
            );
          }
        })
        .reverse()
    };
    console.log(
      "🚀 ~ file: useTotalPctHistory.js ~ line 20 ~ getPctHistory ~ pctArrayObj",
      pctArrayObj
    );

    setPctHistory(pctArrayObj);
  };

  React.useEffect(() => {
    getPctHistory(user_id);
  }, []);

  return pctHistory;
}
