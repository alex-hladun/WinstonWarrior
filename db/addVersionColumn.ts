import db from "./dbSetup";

export const checkIfVersionPatchApplied = async () => {
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
            resolve(patched);
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
          IF NOT EXISTS(SELECT NULL
            FROM INFORMATION_SCHEMA.COLUMNS
           WHERE table_name = 'courses'
             AND column_name = 'version')  THEN
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
