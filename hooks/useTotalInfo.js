import * as React from "react";
import {
  loadAvgPutts,
  loadBestScore,
  loadAvgScore,
  loadScramblePct,
  loadGirPct,
  loadTotalRounds,
  loadBirds,
  getPct,
  loadTotalBirds
} from "../db/dbSetup";
import { StatContext } from "../context/StatContext";

// Custom hook to grab all stat info, and dispatch into state for components to use.
// Will trigger on '
export function useTotalInfo(user_id = 1, course_id = 1) {
  const statContext = React.useContext(StatContext);
  const [totalInfo, setTotalInfo] = React.useState({
    totalInfo: {
      totalBirds: {
        eagles: 0,
        birdies: 0,
        pars: 0
      }
    }
  });

  React.useEffect(() => {
    const getTotalInfo = async (user_id, course_id) => {
      console.log("RETRIEVING ALL TOTALINFO STATS!");
      // Get counts of birdie, par, eagle for each hole
      let birdiecount;
      if (course_id === "ALL") {
        birdieCount = await loadTotalBirds(user_id);
      } else {
        birdieCount = await loadBirds(course_id, user_id);
      }
      // console.log('birdieCount', birdieCount)
      let birdieObj = {};

      for (let i = 1; i <= 18; i++) {
        birdieObj[i] = {
          pars: 0,
          birdies: 0,
          eagles: 0,
          bogies: 0,
          doubles: 0,
          triples: 0,
          rounds: 0,
          GIRs: 0,
          scrambleChances: 0,
          scrambleSuccess: 0
        };
      }

      const totalBirds = {
        eagles: 0,
        birdies: 0,
        pars: 0,
        bogies: 0,
        doubles: 0,
        triples: 0
      };

      // console.log("useTotalInfo -> birdieCount", birdieCount)
      birdieCount.forEach((hole) => {
        // console.log('scoreObj', hole)
        birdieObj[hole.hole_num].rounds++;

        if (hole.total_shots - hole.hole_par === -1) {
          birdieObj[hole.hole_num].birdies++;
          totalBirds.birdies++;
        } else if (hole.total_shots - hole.hole_par === 0) {
          birdieObj[hole.hole_num].pars++;
          totalBirds.pars++;
        } else if (hole.total_shots - hole.hole_par === -2) {
          birdieObj[hole.hole_num].eagles++;
          totalBirds.eagles++;
        } else if (hole.total_shots - hole.hole_par === 1) {
          birdieObj[hole.hole_num].bogies++;
          totalBirds.bogies++;
        } else if (hole.total_shots - hole.hole_par === 2) {
          birdieObj[hole.hole_num].doubles++;
          totalBirds.doubles++;
        } else {
          birdieObj[hole.hole_num].triples++;
          totalBirds.triples++;
        }

        if (hole.total_shots - hole.total_putts + 2 <= hole.hole_par) {
          birdieObj[hole.hole_num].GIRs++;
        } else {
          birdieObj[hole.hole_num].scrambleChances++;

          if (hole.total_shots <= hole.hole_par) {
            birdieObj[hole.hole_num].scrambleSuccess++;
          }
        }
      });

      const totalRounds = await loadTotalRounds(1);
      const girPct = await loadGirPct(1);
      const scramblePct = await loadScramblePct(1);
      const avgScore = await loadAvgScore(1);
      const bestScore = await loadBestScore(1);
      const avgPutts = await loadAvgPutts(1);
      const fwyPct = await getPct(1);
      // console.log(totalRounds, avgScore, bestScore)

      setTotalInfo({
        totalRounds,
        avgScore,
        avgPutts,
        scramblePct,
        bestScore,
        totalBirds,
        fwyPct,
        girPct,
        birdieObj
      });
    };

    getTotalInfo(user_id, course_id);
  }, [statContext.value.state.totalInfoUpdate]);

  return totalInfo;
}
