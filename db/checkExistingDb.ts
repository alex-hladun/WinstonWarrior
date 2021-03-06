import db from "./dbSetup";

export const checkExistingDb = async () => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      // console.log('inside reg user sql')
      tx.executeSql(
        `
        SELECT * FROM users;
    `,
        [],
        (txObj, result) => {
          resolve(result.rows._array.length > 0 ? true : false);
        },
        (err, mess) => console.log("err creating user", reject(mess))
      );
    })
  );
};
