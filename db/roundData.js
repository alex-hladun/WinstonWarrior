import db from "./dbSetup";

export const getRoundData = async (roundID) => {
  let roundObj = {};
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT * FROM ROUNDS WHERE round_id = ?;
    `,
        [roundID],
        (txObj, result) => {
          const diff = result.rows._array[0].hcp_diff;
          const date = result.rows._array[0].end_date;
          roundObj = { diff, date };
        },
        (err, mess) => reject(err, mess)
      );

      tx.executeSql(
        `
    SELECT SUM(scores.total_shots) AS front_score
    FROM scores JOIN rounds
    ON scores.round_id = rounds.round_id
    WHERE rounds.round_id = ? AND scores.hole_num <= 9;
    `,
        [roundID],
        (txObj, result) => {
          const frontScore = result.rows._array[0].front_score;
          roundObj = { ...roundObj, frontScore };
        },
        (err, mess) => reject(err, mess)
      );

      tx.executeSql(
        `
    SELECT SUM(scores.total_shots) AS back_score
    FROM scores JOIN rounds
    ON scores.round_id = rounds.round_id
    WHERE rounds.round_id = ? AND scores.hole_num > 9;
    `,
        [roundID],
        (txObj, result) => {
          const backScore = result.rows._array[0].back_score;
          roundObj = { ...roundObj, backScore };
        },
        (err, mess) => reject(err, mess)
      );

      tx.executeSql(
        `
    SELECT COUNT(*) AS total_holes FROM scores 
    JOIN rounds on rounds.round_id = scores.round_id
    WHERE rounds.round_id = ?;
    `,
        [roundID],
        (txObj, result) => {
          // console.log('result getting Round data', result.rows._array)
          const totalHoles = result.rows._array[0].total_holes;
          roundObj = { ...roundObj, totalHoles };
        },
        (err, mess) => reject(err, mess)
      );

      tx.executeSql(
        `
    SELECT COUNT(*) AS fw_hit FROM scores 
    JOIN rounds on rounds.round_id = scores.round_id
    WHERE rounds.round_id = ?
    GROUP BY scores.round_id, scores.driver_direction
    HAVING scores.driver_direction == 50;
    `,
        [roundID],
        (txObj, result) => {
          const fwHit = result.rows._array[0].fw_hit;
          roundObj = { ...roundObj, fwHit };
          // console.log("🚀 ~ file: roundData.js ~ line 14 ~ returnnewPromise ~ roundObj", roundObj)
        },
        (err, mess) => reject(err, mess)
      );

      tx.executeSql(
        `
    SELECT COUNT(*) AS gir_hit FROM scores 
    JOIN rounds on rounds.round_id = scores.round_id
    WHERE rounds.round_id = ?
    GROUP BY scores.round_id, scores.gir
    HAVING scores.gir == 1;
    `,
        [roundID],
        (txObj, result) => {
          let girHit;
          if (result.rows._array?.[0]?.gir_hit) {
            girHit = result.rows._array[0].gir_hit;
          } else {
            girHit = 0;
          }
          roundObj = { ...roundObj, girHit };
        },
        (err, mess) => reject(err, mess)
      );

      tx.executeSql(
        `
    SELECT scores.total_shots, holes.hole_par FROM scores 
    JOIN rounds on rounds.round_id = scores.round_id
    JOIN holes on holes.hole_id = scores.hole_id
    WHERE rounds.round_id = ?;
    `,
        [roundID],
        (txObj, result) => {
          const scores = result.rows._array;
          // console.log("🚀 ~ file: roundData.js ~ line 73 ~ returnnewPromise ~ result.rows._array", result.rows._array)
          const birdieObj = {
            eagles: 0,
            albatrosses: 0,
            birdies: 0,
            pars: 0,
            bogeys: 0,
            doubles: 0,
            triples: 0
          };

          scores.forEach((score) => {
            if (score.total_shots === score.hole_par - 2) {
              birdieObj["eagles"]++;
            } else if (score.total_shots === score.hole_par - 1) {
              birdieObj["birdies"]++;
            } else if (score.total_shots <= score.hole_par - 3) {
              birdieObj["albatrosses"]++;
            } else if (score.total_shots === score.hole_par) {
              birdieObj["pars"]++;
            } else if (score.total_shots === score.hole_par + 1) {
              birdieObj["bogeys"]++;
            } else if (score.total_shots === score.hole_par + 2) {
              birdieObj["doubles"]++;
            } else {
              birdieObj["triples"]++;
            }
          });

          roundObj = { ...roundObj, birdieObj };
        },
        (err, mess) => reject(err, mess)
      );

      tx.executeSql(
        `
    SELECT COUNT(*) AS scramble
        FROM scores
        JOIN rounds on rounds.round_id = scores.round_id
        WHERE rounds.round_id = ? AND scores.ud = 1;
    `,
        [roundID],
        (txObj, result) => {
          // console.log('result getting Round data', result.rows._array)
          const scramble = result.rows._array[0].scramble;
          roundObj = { ...roundObj, scramble };
          // console.log("🚀 ~ file: roundData.js ~ line 76 ~ returnnewPromise ~ roundObj", roundObj)
          resolve(roundObj);
        },
        (err, mess) => reject(err, mess)
      );
    })
  );
};
