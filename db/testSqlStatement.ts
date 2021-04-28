import db from "./dbSetup";

export const testSqlStatement = async () => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      try {
        tx.executeSql(
          `
          PRAGMA table_info(courses);
      `,
          [],
          (txObj, result) => {
            let patched = false;
            for (const column of result.rows._array) {
              if (column.name === "version") {
                patched = true;
              }
            }
            console.log(
              "🚀 ~ file: testSqlStatement.ts ~ line 17 ~ db.transaction ~ patched",
              patched
            );
            resolve(patched);
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
