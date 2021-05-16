import db from "./dbSetup";

export const testSqlStatement = async () => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      try {
        tx.executeSql(
          `
         SELECT * FROM ROUNDS;
      `,
          [],
          (txObj, result) => {
            console.log(
              "🚀 ~ file: testSqlStatement.ts ~ line 15 ~ db.transaction ~ result.rows._array",
              result.rows._array
            );

            resolve();
            // console.log("result test sql statement", result.rows._array);
            // resolve(result);
          },
          (err, mess) => console.log("error", reject(mess))
        );
      } catch (error) {
        resolve(error);
      }
    })
  );
};
