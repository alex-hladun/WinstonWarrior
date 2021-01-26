import db from "./dbSetup";

export const getRoundData = async (courseID, holeNum, userID) => {
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
    })
  );
};
