import { getScore } from "../db/dbSetup";
import { liveRoundCalc } from "./liveRoundCalc";

export const finalRoundPost = async (playState, p1name) => {
  // Calculate holes played, final score, birdies/etc,
  // friends scores, front, back, srambling.
  // AND PUTT TOTAL

  const liveRoundObj = liveRoundCalc(playState, p1name);
  const totalBirds = {
    albatrosses: 0,
    eagles: 0,
    birdies: 0,
    pars: 0,
    bogies: 0,
    doubles: 0,
    triples: 0,
    gir: 0,
    scrambles: 0,
    fairways: 0,
    holesPlayed: liveRoundObj.thruHoles + 1,
    totalPutts: 0,
    totalScore: 0,
    frontScore: 0,
    holesPlayed: 0,
    backScore: 0,
    course: playState.courseName
  };
  const p1Info = await getScore(playState.roundId);

  for (const hole of p1Info) {
    if (hole.total_shots - hole.hole_par === -1) {
      totalBirds.birdies++;
    } else if (hole.total_shots - hole.hole_par === 0) {
      totalBirds.pars++;
    } else if (hole.total_shots - hole.hole_par <= -3) {
      totalBirds.albatrosses++;
    } else if (hole.total_shots - hole.hole_par === -2) {
      totalBirds.eagles++;
    } else if (hole.total_shots - hole.hole_par === 1) {
      totalBirds.bogies++;
    } else if (hole.total_shots - hole.hole_par === 2) {
      totalBirds.doubles++;
    } else {
      totalBirds.triples++;
    }
    if (hole.gir === 1) {
      totalBirds.gir++;
    }
    if (hole.ud === 1) {
      totalBirds.scrambles++;
    }
    if (hole.driver_direction === 50) {
      totalBirds.fairways++;
    }
    if (hole.hole_num <= 9) {
      totalBirds.frontScore += hole.total_shots;
    } else {
      totalBirds.backScore += hole.total_shots;
    }
    totalBirds.totalPutts += hole.total_putts;
    totalBirds.totalScore += hole.total_shots;
    totalBirds.holesPlayed++;
  }

  return totalBirds;
};
