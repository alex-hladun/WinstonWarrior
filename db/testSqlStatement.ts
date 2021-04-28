import db from "./dbSetup";

export const testSqlStatement = async (courseId: string) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      try {
        tx.executeSql(
          `
         SELECT VERSION FROM COURSES WHERE course_id = ?;
      `,
          [courseId],
          (txObj, result) => {
            console.log("result test sql statement", JSON.stringify(result));
            resolve(result);
          },
          (err, mess) => console.log("error", reject(mess))
        );
      } catch (error) {
        resolve(error);
      }
    })
  );
};
