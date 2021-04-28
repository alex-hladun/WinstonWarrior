import db from "./dbSetup";

export const updateCourse = async (course, courseIndex) => {
  return new Promise(async (resolve, reject) => {
    let holeIndex = 1;
    db.transaction((tx) => {
      for (const hole of Object.keys(course.holes)) {
        console.log(`
        UPDATE holes (course_id, hole_num, hole_par, pin_lat, pin_lng, camera_lat, camera_lng, camera_hdg, camera_alt, camera_zm, hcp_rtg)
        VALUES (${courseIndex},${holeIndex}, ${course.holes[hole].par},
          ${course.holes[hole].pinCoords.latitude},
          ${course.holes[hole].pinCoords.longitude},
          ${course.holes[hole].camera.center.latitude},
          ${course.holes[hole].camera.center.longitude},
          ${course.holes[hole].camera.heading},
          ${course.holes[hole].camera.altitude},
          ${course.holes[hole].camera.zoom},
          ${course.holes[hole].hcpRtg}`);

        tx.executeSql(
          `
          UPDATE holes SET
          hole_par = ?,
          pin_lat = ?, 
          pin_lng = ?, 
          camera_lat = ?, 
          camera_lng = ?, 
          camera_hdg = ?, 
          camera_alt = ?, 
          camera_zm = ?, 
          hcp_rtg = ?
          WHERE course_id = ? 
          AND hole_num = ?
          ;`,
          [
            course.holes[hole].par,
            course.holes[hole].pinCoords.latitude,
            course.holes[hole].pinCoords.longitude,
            course.holes[hole].camera.center.latitude,
            course.holes[hole].camera.center.longitude,
            course.holes[hole].camera.heading,
            course.holes[hole].camera.altitude,
            course.holes[hole].camera.zoom,
            course.holes[hole].hcpRtg,
            courseIndex,
            holeIndex
          ],
          (txObj, result) => {
            console.log("done creating hole", result);
          },
          (err, mess) =>
            console.log(
              "err creating hole",
              JSON.stringify(err),
              JSON.stringify(mess)
            )
        );
        holeIndex++;
        // Prob unessecary
        if (holeIndex === Object.keys(course.holes).length + 1) {
          resolve();
        }
      }
    });
  });
};
