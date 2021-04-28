import db from "./dbSetup";

export const checkIfVersionPatchApplied = async () => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      try {
        tx.executeSql(
          `
         SELECT * FROM COURSES WHERE VERSION >= 1;
      `,
          [],
          (txObj, result) => {
            const count = result.rows._array.length > 0;
            resolve(count);
          },
          (err, mess) => console.log("error", reject(mess))
        );
      } catch (error) {
        resolve(error);
      }
    })
  );
};

export const addVersionColumn = async () => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      try {
        tx.executeSql(
          `
          ALTER TABLE courses 
          ADD COLUMN 
          version INTEGER
          DEFAULT 1 
          NOT NULL;
      `,
          [],
          (txObj, result) => {
            console.log("result adding column", result);
            resolve(result);
          },
          (err, mess) => console.log("err adding colu,n", reject(mess))
        );
      } catch (error) {
        console.log("error creating table...already exists??");
        resolve(error);
      }
    })
  );
};
