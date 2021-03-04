import db from "./dbSetup";

export const loadHoleStatsForRefresh = async (courseID, holeNum, userID) => {
  const birdieObj = {
    pars: 0,
    birdies: 0,
    eagles: 0,
    bogies: 0,
    doubles: 0,
    triples: 0,
    albatrosses: 0,
    rounds: 0,
    GIRs: 0,
    avgPutts: 0,
    avgShots: 0,
    scrambleChances: 0,
    scrambleSuccess: 0,
    shotHistory: [],
    puttHistory: [],
    dateHistory: [],
    scrambleHistory: [],
    girHistory: [],
    fwyHistory: [],
    penaltyHistory: [],
    lowScore: "NA",
    totalFairways: undefined,
    driverDirection: undefined,
    approachRtg: undefined,
    chipRtg: undefined,
    puttRtg: undefined,
    fairwaysHit: undefined
  };

  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT
    scores.hole_num, rounds.course_id, scores.total_shots, holes.hole_par, scores.total_putts, scores.date_time AS date, scores.driver_direction AS driver_direction, scores.ud AS ud, scores.gir AS gir, scores.penalty AS penalty
    FROM ROUNDS
    JOIN scores 
    ON rounds.round_id = scores.round_id 
    JOIN holes 
    ON holes.hole_id = scores.hole_id
    WHERE rounds.course_id = ? AND rounds.user_id = ? AND holes.hole_num = ?
    ORDER BY rounds.round_id ASC;
    `,
        [courseID, userID, holeNum],
        (txObj, result) => {
          const scoresForHole = result.rows._array;

          scoresForHole.forEach((hole) => {
            birdieObj.rounds++;

            if (hole.total_shots - hole.hole_par === -1) {
              birdieObj.birdies++;
            } else if (hole.total_shots - hole.hole_par === 0) {
              birdieObj.pars++;
            } else if (hole.total_shots - hole.hole_par === -2) {
              birdieObj.eagles++;
            } else if (hole.total_shots - hole.hole_par <= -3) {
              birdieObj.albatrosses++;
            } else if (hole.total_shots - hole.hole_par === 1) {
              birdieObj.bogies++;
            } else if (hole.total_shots - hole.hole_par === 2) {
              birdieObj.doubles++;
            } else {
              birdieObj.triples++;
            }

            if (hole.total_shots - hole.total_putts + 2 <= hole.hole_par) {
              birdieObj.GIRs++;
            } else {
              birdieObj.scrambleChances++;

              if (hole.total_shots <= hole.hole_par) {
                birdieObj.scrambleSuccess++;
              }
            }

            birdieObj.shotHistory.push(hole.total_shots);
            birdieObj.puttHistory.push(hole.total_putts);
            birdieObj.dateHistory.push(hole.date);
            birdieObj.girHistory.push(hole.gir);
            birdieObj.scrambleHistory.push(hole.ud);
            birdieObj.fwyHistory.push(hole.driver_direction);
            birdieObj.penaltyHistory.push(hole.penalty);
          });
        },
        (err, mess) => console.log("err getting birds", reject(mess))
      );

      // Retrieve total stats to loop through for counts
      tx.executeSql(
        `
      SELECT
      scores.hole_num, holes.hole_par, AVG(scores.total_shots) AS avg_shots, AVG(scores.total_putts) AS avg_putts
      FROM ROUNDS 
      JOIN scores 
      ON rounds.round_id = scores.round_id 
      JOIN holes 
      ON holes.hole_id = scores.hole_id
      WHERE rounds.course_id = ? AND rounds.user_id = ? AND holes.hole_num = ?
      GROUP BY scores.hole_num;
      `,
        [courseID, userID, holeNum],
        (txObj, result) => {
          const avgVals = result.rows._array[0];
          birdieObj["avgShots"] = avgVals?.avg_shots;
          birdieObj["avgPutts"] = avgVals?.avg_putts;

          tx.executeSql(
            `
        SELECT DISTINCT
        scores.hole_num, min(scores.total_shots) AS min_score
        FROM ROUNDS
        JOIN scores 
        ON rounds.round_id = scores.round_id
        WHERE rounds.course_id = ? AND rounds.user_id = ? AND scores.hole_num = ?
        ORDER BY scores.hole_num ASC;
        `,
            [courseID, userID, holeNum],
            (txObj, result) => {
              const minScore = result.rows._array[0];
              // console.log(
              //   "🚀 ~ file: loadHoleStats.js ~ line 131 ~ db.transaction ~ minScore",
              //   minScore
              // );
              birdieObj["lowScore"] = minScore?.min_score;
            },
            (err, mess) => console.log("err getting stats", reject(mess))
          );

          // Load Fairway data
          tx.executeSql(
            `
        SELECT
        scores.hole_num, COUNT(*) as total_fairways, avg(scores.driver_direction) as driver_direction, avg(scores.approach_rtg) as approach_rtg, avg(scores.chip_rtg) as chip_rtg, avg(scores.putt_rtg) AS putt_rtg
        FROM ROUNDS 
        JOIN scores 
        ON rounds.round_id = scores.round_id 
        JOIN holes 
        ON holes.hole_id = scores.hole_id
        WHERE rounds.course_id = ? AND rounds.user_id = ? AND scores.hole_num = ?
        ORDER BY scores.hole_num ASC;
        `,
            [courseID, userID, holeNum],
            (txObj, result) => {
              const fwyStats = result.rows._array[0];

              birdieObj.totalFairways = fwyStats?.total_fairways;
              birdieObj.driverDirection = fwyStats?.driver_direction;
              birdieObj.approachRtg = fwyStats?.approach_rtg;
              birdieObj.chipRtg = fwyStats?.chip_rtg;
              birdieObj.puttRtg = fwyStats?.putt_rtg;
            },
            (err, mess) => console.log("err getting stats", reject(mess))
          );

          // Hit FWY stats
          tx.executeSql(
            `
        SELECT
        scores.hole_num, COUNT(*) as total_fairways_hit
        FROM ROUNDS 
        JOIN scores 
        ON rounds.round_id = scores.round_id 
        JOIN holes 
        ON holes.hole_id = scores.hole_id
        WHERE rounds.course_id = ? AND rounds.user_id = ? AND scores.hole_num = ? AND scores.driver_direction == 50
        GROUP BY scores.hole_num
        ORDER BY scores.hole_num ASC;
        `,
            [courseID, userID, holeNum],
            (txObj, result) => {
              const hitFwyStats = result.rows._array[0];
              birdieObj.fairwaysHit = hitFwyStats?.total_fairways_hit;
              resolve(birdieObj);
            },
            (err, mess) => console.log("err getting stats", reject(mess))
          );
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );

      // Load Minimum score
    })
  );
};
