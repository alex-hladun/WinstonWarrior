import db from "./dbSetup";

export const getCourseVersion = async (courseId) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      try {
        tx.executeSql(
          `
         SELECT VERSION FROM COURSES WHERE course_id = ?;
      `,
          [courseId],
          (txObj, result) => {
            resolve(result.rows._array[0]?.version);
          },
          (err, mess) => console.log("error", reject(mess))
        );
      } catch (error) {
        resolve(error);
      }
    })
  );
};
