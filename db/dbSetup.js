import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import glencoe from "../assets/courses/glencoe";
import paradise from "../assets/courses/paradisecanyon";
import winston from "../assets/courses/winston";
import { handicapDiffCalc } from "../helpers/handicap";

const db = SQLite.openDatabase("winstonGolfer.db");

export default db;

export const existingGameAlert = () => {
  Alert.alert(
    "Existing Round",
    "Would you like to return to your game?",
    [
      {
        text: "No",
        onPress: () => dropAndCreate(),

        style: "cancel"
      },
      { text: "Yes", onPress: () => console.log("Cancel Pressed") }
    ],
    { cancelable: false }
  );
};

export const removeDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`DROP TABLE if exists scores`, null, null, null);
      tx.executeSql(`DROP TABLE if exists courses`, null, null, null);
      tx.executeSql(`DROP TABLE if exists rounds`, null, null, null);
      tx.executeSql(`DROP TABLE if exists users`, null, null, null);
      tx.executeSql(`DROP TABLE if exists holes`, null, null, null);
      tx.executeSql(`DROP TABLE if exists distances`, null, null, null);
      tx.executeSql(`DROP TABLE if exists clubs`, null, null, null);
      resolve();
    });
  });
};

export const getUsers = async () => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT * FROM USERS
    `,
        [],
        (txObj, result) => {
          resolve(result.rows);
        },
        (err, mess) => reject
      );
    })
  );
};

export const createClubs = async (user) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      const clubArray = [
        "D",
        "2W",
        "3W",
        "4W",
        "5W",
        "HY",
        "DI",
        "3I",
        "4I",
        "5I",
        "6I",
        "7I",
        "8I",
        "9I",
        "PW",
        "AW",
        "52",
        "54",
        "56",
        "58",
        "60"
      ];
      for (const club of clubArray) {
        tx.executeSql(
          `
      INSERT INTO clubs (name) VALUES (?);
    `,
          [club],
          (txObj, result) => {},
          (err, mess) => console.log("err creating club", reject(mess))
        );
      }

      resolve("done with clubs");
    })
  );
};

export const getClubs = async () => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
      SELECT * FROM CLUBS;
    `,
        [],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err creating club", reject(mess))
      );
    })
  );
};

export const registerUser = async (user) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    INSERT INTO users (user_name) VALUES (?);
    `,
        [user],
        (txObj, result) => {
          resolve(result.insertId);
        },
        (err, mess) => console.log("err creating user", reject(mess))
      );
    })
  );
};

export const createRound = async (course_id, user_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    INSERT INTO rounds (course_id, user_id) VALUES (?, ?);
    `,
        [course_id, user_id],
        (txObj, result) => {
          resolve(result.insertId);
        },
        (err, mess) => console.log("err creating round", reject(mess))
      );
    })
  );
};

export const deleteRound = async (round_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
        DELETE FROM rounds WHERE round_id = ?;
    `,
        [round_id],
        (txObj, result) => {
          resolve(result.insertId);
        },
        (err, mess) => console.log("err creating round", reject(mess))
      );
      tx.executeSql(
        `
        DELETE FROM scores WHERE round_id = ?;
    `,
        [round_id],
        (txObj, result) => {
          resolve(result.insertId);
        },
        (err, mess) => console.log("err creating round", reject(mess))
      );
    })
  );
};

export const postShot = async (user_id, club_id, effort, distance) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    INSERT INTO distances (user_id, club_id, effort, distance, date_time) VALUES (?, ?, ?, ?, strftime('%Y-%m-%d %H:%M:%S','now'));
    `,
        [user_id, club_id, effort, distance],
        (txObj, result) => {
          resolve(result);
        },
        (err, mess) => console.log("err saving shot", reject(mess))
      );
    })
  );
};
export const postRound = async (
  score,
  round_id,
  diff,
  holesPlayed,
  calculatedHolesPlayed
) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      console.log(
        "posting round",
        score,
        round_id,
        diff,
        holesPlayed,
        calculatedHolesPlayed
      );
      tx.executeSql(
        `
    UPDATE rounds
    SET total_score = ?, hcp_diff = ?, end_date = strftime('%Y-%m-%d %H:%M:%S','now'), holes_played = ?, calculated_holes_played = ?
    WHERE round_id = ?;
    `,
        [score, diff, holesPlayed, calculatedHolesPlayed, round_id],
        (txObj, result) => {
          resolve(result);
        },
        (err, mess) => console.log("err saving round", reject(mess))
      );
    })
  );
};
export const postScore = async (
  hole_id,
  hole_num,
  round_id,
  total_shots,
  total_putts = null,
  penalty = null,
  driver_direction = null,
  approach_rtg = null,
  chip_rtg = null,
  putt_rtg = null,
  gir = null,
  ud = null
) => {
  console.log(
    `POSTING SCORE: HOLE_ID ${hole_id}, HOLE_NUM ${hole_num}, round_id ${round_id}, total shots ${total_shots}, total putts ${total_putts}, driver direction ${driver_direction}, GIR OF ${gir}, UD OF ${ud}`
  );

  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      let scoreID;

      tx.executeSql(
        `
    SELECT * FROM scores WHERE round_id = ? AND hole_id = ?;`,
        [round_id, hole_id],
        (txObj, result) => {
          if (result.rows._array[0]) {
            console.log("EXISTING SCORE for this hole!");
            tx.executeSql(
              `
        UPDATE scores 
        SET total_shots = ?, 
        total_putts = ?, 
        penalty = ?, 
        driver_direction = ?,
        approach_rtg = ?,
        chip_rtg = ?,
        putt_rtg = ?,
        gir = ?,
        ud = ?
        WHERE score_id = ?;
        `,
              [
                total_shots,
                total_putts,
                penalty,
                driver_direction,
                approach_rtg,
                chip_rtg,
                putt_rtg,
                gir,
                ud,
                result.rows._array[0].score_id
              ],
              (txObj, result) => {
                resolve(result);
              },
              (err, mess) => {
                reject(err);
              }
            );
          } else {
            tx.executeSql(
              `
      INSERT INTO scores (
            hole_id,
            hole_num,
            round_id,
            total_shots,
            total_putts,
            penalty,
            driver_direction,
            approach_rtg,
            chip_rtg,
            putt_rtg,
            gir,
            ud,
            date_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,strftime('%Y-%m-%d %H:%M:%S','now'));
      `,
              [
                hole_id,
                hole_num,
                round_id,
                total_shots,
                total_putts,
                penalty,
                driver_direction,
                approach_rtg,
                chip_rtg,
                putt_rtg,
                gir,
                ud
              ],
              (txObj, result) => {
                resolve(result);
              },
              (err, mess) => {
                reject(err);
              }
            );
          }
        }
      );
    })
  );
};

export const createSingleCourse = async (course, courseIndex) => {
  return new Promise(async (resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
      INSERT INTO courses (
        course_id,
        name, 
        blue_rtg, 
        blue_slp, 
        black_rtg, 
        black_slp,
        black_blue_rtg,
        black_blue_slp,
        white_rtg,
        white_slp,
        blue_white_rtg,
        blue_white_slp,
        red_rtg,
        red_slp,
        white_red_rtg,
        white_red_slp,
        version
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
        [
          courseIndex,
          course.name,
          course.blue_rtg,
          course.blue_slp,
          course.black_rtg,
          course.black_slp,
          course.black_blue_rtg,
          course.black_blue_slp,
          course.white_rtg,
          course.white_slp,
          course.blue_white_rtg,
          course.blue_white_slp,
          course.red_rtg,
          course.red_slp,
          course.white_red_rtg,
          course.white_red_slp,
          course.version
        ],
        (txObj, result) => {
          console.log(`result creating ${course.name}`, result);
          resolve();
        },
        (err, mess) => console.log("err creating course", mess)
      );
    });
  });
};

export const addHolesToCourse = async (course, courseIndex) => {
  return new Promise(async (resolve, reject) => {
    let holeIndex = 1;
    db.transaction((tx) => {
      for (const hole of Object.keys(course.holes)) {
        console.log(`
        INSERT INTO holes (course_id, hole_num, hole_par, pin_lat, pin_lng, camera_lat, camera_lng, camera_hdg, camera_alt, camera_zm, hcp_rtg)
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
          INSERT INTO holes (course_id, hole_num, hole_par, pin_lat, pin_lng, camera_lat, camera_lng, camera_hdg, camera_alt, camera_zm, hcp_rtg)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            courseIndex,
            holeIndex,
            course.holes[hole].par,
            course.holes[hole].pinCoords.latitude,
            course.holes[hole].pinCoords.longitude,
            course.holes[hole].camera.center.latitude,
            course.holes[hole].camera.center.longitude,
            course.holes[hole].camera.heading,
            course.holes[hole].camera.altitude,
            course.holes[hole].camera.zoom,
            course.holes[hole].hcpRtg
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
        if (holeIndex === 19) {
          resolve();
        }
      }
    });
  });
};

export const createCourses = async (courseObj) => {
  // const courseArray = [winston];
  const courseArray = [winston, glencoe, paradise];

  return new Promise(async (resolve, reject) => {
    let courseIndex = 1;
    let courseLength = courseArray.length;
    for (const course of courseArray) {
      await createSingleCourse(course, courseIndex);
      await addHolesToCourse(course, courseIndex);

      courseIndex++;

      if (courseIndex === courseLength + 1) {
        resolve("Done");
      }
    }
  });
};

export const seedData = async () => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 19; i++) {
      let score = Math.floor(Math.random() * (100 - 70) + 70);
      let diff = handicapDiffCalc(score, 71.8, 127);
      db.transaction((tx) => {
        // console.log('inside createRound')
        tx.executeSql(
          `
        INSERT OR REPLACE INTO rounds (round_id, course_id, user_id, end_date, hcp_diff) VALUES (?, 1, 1, strftime('%Y-%m-%d %H:%M:%S','now'), ?);
      `,
          [i + 5000, diff],
          (txObj, result) => {
            console.log(`success creating round`);
          },
          (err, mess) => console.log("err seeding round", err, mess)
        );
      });
    }

    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 18; j++) {
        let score = Math.floor(Math.random() * (10 - 2) + 2);
        let putts = Math.floor(Math.random() * (10 - 0));
        db.transaction((tx) => {
          tx.executeSql(
            `
          INSERT OR REPLACE INTO scores (
            hole_id,
            hole_num,
            round_id,
            total_shots,
            total_putts,
            penalty,
            driver_direction,
            approach_rtg,
            chip_rtg,
            putt_rtg,
            gir,
            ud,
            date_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, strftime('%Y-%m-%d %H:%M:%S','now'));
        `,
            [
              j + 1,
              j + 1,
              i + 5000,
              score,
              putts,
              Math.round(Math.random() * 1),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.random() > 0.5,
              Math.random() > 0.5
            ],
            (txObj, result) => {
              // resolve(result)
            },
            (err, mess) => console.log("err seeding score", err, mess)
          );
        });
      }
    }

    console.log("ALL SEED DATA LOADED");
    db.transaction((tx) => {
      // console.log('inside createRound')
      tx.executeSql(
        `
      SELECT * FROM scores;
    `,
        [],
        (txObj, result) => {
          console.log(`all scores: ${JSON.stringify(result.rows._array)}`);
        },
        (err, mess) => console.log("err seeding stats", err, mess)
      );
    });
    resolve();
  });
};

export const loadStats = async (user_id) => {
  // Loads overall user round history. Only grabs rounds with 18 holes entered, for now.

  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT rounds.round_id, rounds.total_score, SUM(scores.total_putts) AS total_putts, COUNT(scores.total_putts > 3) AS 'three-putts', rounds.end_date, rounds.calculated_holes_played AS holes_played, courses.name AS course_name, rounds.hcp_diff, rounds.holes_played, rounds.calculated_holes_played
    FROM ROUNDS JOIN scores ON rounds.round_id = scores.round_id
    JOIN courses ON rounds.course_id = courses.course_id
    WHERE rounds.user_id = ? 
    GROUP BY rounds.round_id
    HAVING (rounds.calculated_holes_played = 18 OR rounds.calculated_holes_played = 9) AND rounds.end_date NOT NULL
    ORDER BY rounds.round_id DESC LIMIT 30;
    `,
        [user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(err, mess))
      );
    })
  );
};

export const load18HoleStats = async (user_id) => {
  // Loads overall user round history. Only grabs rounds with 18 holes entered, for now.

  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT rounds.round_id, rounds.total_score, SUM(scores.total_putts) AS total_putts, COUNT(scores.total_putts > 3) AS 'three-putts', rounds.end_date, rounds.calculated_holes_played AS holes_played, courses.name AS course_name, rounds.hcp_diff, rounds.holes_played, rounds.calculated_holes_played
    FROM ROUNDS JOIN scores ON rounds.round_id = scores.round_id
    JOIN courses ON rounds.course_id = courses.course_id
    WHERE rounds.user_id = ? 
    GROUP BY rounds.round_id
    HAVING rounds.calculated_holes_played = 18 AND rounds.end_date NOT NULL
    ORDER BY rounds.round_id DESC LIMIT 30;
    `,
        [user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(err, mess))
      );
    })
  );
};

export const loadCourseDetails = async (course_id) => {
  // Loads overall user round history. Only grabs rounds with 18 holes entered, for now.
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    select * from courses
    where course_id = ?
    `,
        [course_id],
        (txObj, result) => {
          console.log(
            `overall course stats: ${JSON.stringify(result.rows._array)}`
          );
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting course", reject(mess))
      );
    })
  );
};
export const loadCourseInfo = async (course_id) => {
  // Loads overall user round history. Only grabs rounds with 18 holes entered, for now.
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    select * from holes
    where course_id = ?
    `,
        [course_id],
        (txObj, result) => {
          // console.log(`overall round stats: ${JSON.stringify(result.rows._array)}`)
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};
export const loadHcpDiffStats = async (user_id) => {
  // Loads overall user round history. Only grabs rounds with 18 holes entered, for now.
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT rounds.round_id, SUM(scores.total_shots) AS total_score, rounds.end_date, rounds.calculated_holes_played AS holes_played, courses.name AS course_name, rounds.hcp_diff
    FROM ROUNDS JOIN scores ON rounds.round_id = scores.round_id
    JOIN courses ON rounds.course_id = courses.course_id
    WHERE rounds.user_id = ? AND rounds.hcp_DIFF IS NOT NULL
    GROUP BY rounds.round_id
    ORDER BY rounds.round_id DESC LIMIT 40;
    `,
        [user_id],
        (txObj, result) => {
          console.log(
            `overall Hcp stats: ${JSON.stringify(result.rows._array)}`
          );
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};

export const loadTotalPctHistory = async (user_id) => {
  // console.log('LOADING PUTTS', user_id)
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      let pctObj = {};

      // Total holes played
      tx.executeSql(
        `
    SELECT COUNT(*) AS total_holes, rounds.end_date as date
    FROM scores 
    JOIN rounds on rounds.round_id = scores.round_id
    WHERE rounds.user_id = ?
    GROUP BY scores.round_id
    HAVING (rounds.calculated_holes_played = 18 OR rounds.calculated_holes_played = 9) AND rounds.end_date NOT NULL
    ORDER BY rounds.round_id DESC
    LIMIT 10;
    `,
        [user_id],
        (txObj, result) => {
          pctObj = {
            ...pctObj,
            totalHolesPlayed: result.rows._array.map((i) => i.total_holes),
            roundDates: result.rows._array.map((i) => i.date)
          };
          // resolve(result.rows._array.reverse())
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );

      // HitFW
      tx.executeSql(
        `
    SELECT COUNT(*) AS fw_hit, rounds.end_date AS date
    FROM scores 
    JOIN rounds on rounds.round_id = scores.round_id
    WHERE rounds.user_id = ? AND (rounds.calculated_holes_played = 18 OR rounds.calculated_holes_played = 9) AND rounds.end_date NOT NULL AND scores.driver_direction = 50
    GROUP BY scores.round_id
    ORDER BY rounds.round_id DESC
    LIMIT 10;
    `,
        [user_id],
        (txObj, result) => {
          // console.log(
          //   `overall fairway hit pct stats: ${JSON.stringify(
          //     result.rows._array
          //   )}`
          // );
          pctObj = {
            ...pctObj,
            fwyHit: result.rows._array.map((i) => i.fw_hit),
            fwyDates: result.rows._array.map((i) => i.date)
          };
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );

      // GIR Stats
      tx.executeSql(
        `
    SELECT COUNT(*) AS gir_hit, rounds.end_date AS date
    FROM scores 
    JOIN rounds on rounds.round_id = scores.round_id
    WHERE rounds.user_id = ? AND scores.gir = 1 AND (rounds.calculated_holes_played = 18 OR rounds.calculated_holes_played = 9) AND rounds.end_date NOT NULL
    GROUP BY scores.round_id
    ORDER BY rounds.round_id DESC
    LIMIT 10;
    `,
        [user_id],
        (txObj, result) => {
          pctObj = {
            ...pctObj,
            girHit: result.rows._array.map((i) => i.gir_hit),
            girDates: result.rows._array.map((i) => i.date)
          };
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
      // successful scramble count
      tx.executeSql(
        `
        SELECT count(*) AS scramble, rounds.end_date AS date
        FROM scores
        JOIN rounds on rounds.round_id = scores.round_id
        WHERE rounds.user_id = ? AND scores.ud = 1 AND (rounds.calculated_holes_played = 18 OR rounds.calculated_holes_played = 9) AND rounds.end_date NOT NULL
        GROUP BY scores.round_id
        ORDER BY rounds.round_id DESC
        LIMIT 10;
    `,
        [user_id],
        (txObj, result) => {
          pctObj = {
            ...pctObj,
            scrambleSuccess: result.rows._array.map((i) => i.scramble),
            scrambleDates: result.rows._array.map((i) => i.date)
          };

          resolve(pctObj);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};

export const loadTotalPuttHistory = async (user_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT sum(scores.total_putts) AS putts, count(scores.driver_direction) = 50 AS hits, rounds.calculated_holes_played FROM scores
    JOIN rounds on scores.round_id = rounds.round_id
    WHERE rounds.user_id = ?
    GROUP BY rounds.round_id
    HAVING rounds.calculated_holes_played = 18 OR rounds.calculated_holes_played = 9
    ORDER BY rounds.round_id DESC
    LIMIT 10;
    `,
        [user_id],
        (txObj, result) => {
          resolve(result.rows._array.reverse());
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};
export const loadPuttsForHole = async (user_id, hole_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT scores.total_putts, scores.penalty, scores.gir, scores.ud, scores.driver_direction, scores.hole_num, rounds.round_id
    FROM scores
    JOIN holes ON scores.hole_id = holes.hole_id
    JOIN rounds ON scores.round_id = rounds.round_id
    WHERE scores.hole_id = ? AND rounds.user_id = ?
    GROUP BY scores.round_id
    ORDER BY scores.round_id DESC
    LIMIT 10;
    `,
        [hole_id, user_id],
        (txObj, result) => {
          resolve(result.rows._array.reverse());
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};

export const loadPuttHistory = async (user_id, hole_id) => {
  // Loads overall user round history. Only grabs rounds with 18 holes entered, for now.
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT scores.total_putts, scores.penalty, scores.gir, scores.ud, scores.driver_direction, scores.hole_num, rounds.round_id
    FROM scores
    JOIN holes ON scores.hole_id = holes.hole_id
    JOIN rounds ON scores.round_id = rounds.round_id
    WHERE scores.hole_id = ? AND rounds.user_id = ?
    GROUP BY scores.round_id
    ORDER BY scores.round_id DESC
    LIMIT 10;
    `,
        [hole_id, user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};
export const loadShots = async (user_id) => {
  // Loads overall user round history
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT clubs.name, clubs.club_id AS id, avg(distance) AS avg, max(distance) AS max, count(*) AS count
    FROM distances
    JOIN clubs ON clubs.club_id = distances.club_id
    WHERE user_id = ? AND effort = 100
    GROUP BY clubs.club_id
    ORDER BY clubs.club_id ASC;
    `,
        [user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};
export const loadShotHistoryData = async (user_id, club_id) => {
  // Loads overall user round history
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    select *
    FROM distances
    JOIN clubs ON clubs.club_id = distances.club_id
    WHERE user_id = ? AND distances.club_id = ?
    ORDER BY distances.date_time DESC
    LIMIT 10;
    `,
        [user_id, club_id],
        (txObj, result) => {
          resolve(result.rows._array.reverse());
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};
export const loadTotalRounds = async (user_id) => {
  // Loads overall user round history
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT DISTINCT count(rounds.round_id) AS total_rounds
    FROM ROUNDS
    WHERE rounds.user_id = ? AND end_date NOT NULL AND end_date != ""
    GROUP BY rounds.user_id;
    `,
        [user_id],
        (txObj, result) => {
          if (result.rows._array[0]) {
            resolve(result.rows._array[0].total_rounds);
          } else {
            resolve(0);
          }
        },
        (err, mess) => console.log("err getting total stats", reject(mess))
      );
    })
  );
};
export const loadAvgScore = async (user_id) => {
  // Loads overall user round history
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT AVG(total.sum) AS avg FROM (SELECT SUM(rounds.total_score) as sum
    FROM rounds
    WHERE rounds.user_id = ?
    GROUP BY rounds.round_id HAVING rounds.calculated_holes_played = 18) AS total;
    `,
        [user_id],
        (txObj, result) => {
          resolve(result.rows._array[0].avg);
        },
        (err, mess) => console.log("err getting total stats", reject(mess))
      );
    })
  );
};

export const loadAvgPutts = async (user_id) => {
  // Loads overall user round history
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT AVG(total.sum) AS avg FROM (SELECT SUM(scores.total_putts) as sum, count(scores.hole_num) AS holes_played
    FROM scores
    JOIN rounds ON rounds.round_id = scores.round_id
    WHERE rounds.user_id = ?
    GROUP BY scores.round_id HAVING holes_played = 18) AS total;
    `,
        [user_id],
        (txObj, result) => {
          resolve(result.rows._array[0].avg);
        },
        (err, mess) => console.log("err getting total stats", reject(mess))
      );
    })
  );
};
export const loadBestScore = async (user_id) => {
  // Loads overall user round history
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT MIN(rounds.total_score) AS tot
    FROM rounds
    WHERE rounds.user_id = ? AND (holes_played = 18 OR calculated_holes_played = 18) AND rounds.end_date NOT NULL
    GROUP BY rounds.round_id;
    `,
        [user_id],
        (txObj, result) => {
          resolve(result.rows._array[0]?.tot);
        },
        (err, mess) => console.log("err getting total stats", reject(mess))
      );
    })
  );
};

export const loadGirPct = async (user_id) => {
  let hitNum;
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
      SELECT COUNT(scores.gir) AS green_in_reg
      FROM scores
      JOIN rounds ON rounds.round_id = scores.round_id
      WHERE scores.gir == 1
      AND rounds.user_id = ?
    ;
    `,
        [user_id],
        (txObj, result) => {
          hitNum = result.rows._array[0].green_in_reg;
        },
        (err, mess) => console.log("err getting GIR pct", reject(mess))
      );

      tx.executeSql(
        `
      SELECT COUNT(scores.hole_num) AS total
      FROM scores
      JOIN rounds ON rounds.round_id = scores.round_id
      WHERE rounds.user_id = ?
    ;
    `,
        [user_id],
        (txObj, result) => {
          resolve((hitNum * 100) / result.rows._array[0].total);
        },
        (err, mess) => console.log("err getting acg pct", reject(mess))
      );
    })
  );
};

export const loadScramblePct = async (user_id) => {
  let scrNum;
  let girNum;
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
      SELECT COUNT(scores.ud) AS scramble
      FROM scores
      JOIN rounds ON rounds.round_id = scores.round_id
      WHERE scores.ud = 1
      AND rounds.user_id = ?
    ;
    `,
        [user_id],
        (txObj, result) => {
          scrNum = result.rows._array[0].scramble;
        },
        (err, mess) => console.log("err getting GIR pct", reject(mess))
      );

      tx.executeSql(
        `
    SELECT COUNT(scores.gir) AS green_in_reg
    FROM scores
    JOIN rounds ON rounds.round_id = scores.round_id
    WHERE scores.gir == 1
    AND rounds.user_id = ?
  ;
  `,
        [user_id],
        (txObj, result) => {
          girNum = result.rows._array[0].green_in_reg;
        },
        (err, mess) => console.log("err getting GIR pct", reject(mess))
      );

      tx.executeSql(
        `
      SELECT COUNT(scores.hole_num) AS total
      FROM scores
      JOIN rounds ON rounds.round_id = scores.round_id
      WHERE rounds.user_id = ? AND scores.ud NOT NULL
    ;
    `,
        [user_id],
        (txObj, result) => {
          resolve((scrNum * 100) / (result.rows._array[0].total - girNum));
        },
        (err, mess) => console.log("err getting acg pct", reject(mess))
      );
    })
  );
};
export const getPct = async (user_id) => {
  // Loads overall user round history

  let hitNum;
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
      SELECT COUNT(scores.hole_num) AS hit
      FROM scores
      JOIN rounds ON rounds.round_id = scores.round_id
      WHERE scores.driver_direction == 50
      AND rounds.user_id = ?
    ;
    `,
        [user_id],
        (txObj, result) => {
          hitNum = result.rows._array[0].hit;
        },
        (err, mess) => console.log("err getting acg pct", reject(mess))
      );

      tx.executeSql(
        `
      SELECT COUNT(scores.hole_num) AS total
      FROM scores
      JOIN rounds ON rounds.round_id = scores.round_id
      WHERE rounds.user_id = ?
      AND scores.driver_direction >= 0
    ;
    `,
        [user_id],
        (txObj, result) => {
          resolve((hitNum * 100) / result.rows._array[0].total);
        },
        (err, mess) => console.log("err getting acg pct", reject(mess))
      );
    })
  );
};

export const loadShotHistory = async (user_id) => {
  // Loads overall user round history
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT distance, effort 
    FROM distances
    WHERE user_id = ?
    ORDER BY date_time DESC
    `,
        [user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};

export const loadFairwayData = async (user_id, course_id) => {
  // Loads overall user round history
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT
    scores.hole_num, COUNT(*) as total_fairways_hit
    FROM ROUNDS 
    JOIN scores 
    ON rounds.round_id = scores.round_id 
    JOIN holes 
    ON holes.hole_id = scores.hole_id
    WHERE rounds.course_id = ? AND rounds.user_id = ? AND scores.driver_direction == 50
    GROUP BY scores.hole_num
    ORDER BY scores.hole_num ASC;
    `,
        [course_id, user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};
export const loadFairwayDataTotal = async (user_id, course_id) => {
  // Loads overall user round history
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT
    scores.hole_num, COUNT(*) as total_fairways, avg(scores.driver_direction) as driver_direction, avg(scores.approach_rtg) as approach_rtg, avg(scores.chip_rtg) as chip_rtg, avg(scores.putt_rtg) AS putt_rtg
    FROM ROUNDS 
    JOIN scores 
    ON rounds.round_id = scores.round_id 
    JOIN holes 
    ON holes.hole_id = scores.hole_id
    WHERE rounds.course_id = ? AND rounds.user_id = ?
    GROUP BY scores.hole_num
    ORDER BY scores.hole_num ASC;
    `,
        [course_id, user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};

export const loadHoleStats = async (course_id, user_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT
    scores.hole_num, holes.hole_par, AVG(scores.total_shots) AS avg_shots, AVG(scores.total_putts) AS avg_putts
    FROM ROUNDS 
    JOIN scores 
    ON rounds.round_id = scores.round_id 
    JOIN holes 
    ON holes.hole_id = scores.hole_id
    WHERE rounds.course_id = ? AND rounds.user_id = ?
    GROUP BY scores.hole_num
    ORDER BY scores.hole_num ASC;
    `,
        [course_id, user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};
export const loadHoleHistory = async (course_id, user_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT
    scores.hole_num, holes.hole_par, scores.total_shots AS total_shots, scores.total_putts AS total_putts, scores.date_time AS date, scores.driver_direction AS driver_direction, scores.ud AS ud, scores.gir AS gir, scores.penalty AS penalty
    FROM ROUNDS
    JOIN scores
    ON rounds.round_id = scores.round_id
    JOIN holes 
    ON holes.hole_id = scores.hole_id
    WHERE rounds.course_id = ? AND rounds.user_id = ?
    ORDER BY rounds.round_id ASC;
    `,
        [course_id, user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};
export const retrieveCourseInfo = async (round_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT courses.name, courses.blue_rtg AS rtg, courses.blue_slp AS slp, courses.course_id
    FROM courses JOIN rounds ON
    rounds.course_id = courses.course_id
    WHERE rounds.round_id = ?
    ;
    `,
        [round_id],
        (txObj, result) => {
          resolve(result.rows._array[0]);
        },
        (err, mess) =>
          console.log("err getting course infoO", reject(err, mess))
      );
    })
  );
};
export const loadLow = async (course_id, user_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT DISTINCT
    scores.hole_num, min(scores.total_shots) AS min_score
    FROM ROUNDS
    JOIN scores 
    ON rounds.round_id = scores.round_id
    WHERE rounds.course_id = ? AND rounds.user_id = ?
    GROUP BY scores.hole_num
    ORDER BY scores.hole_num ASC;
    `,
        [course_id, user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting stats", reject(mess))
      );
    })
  );
};
export const loadBirds = async (course_id, user_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT
    scores.hole_num, scores.total_shots, holes.hole_par, scores.total_putts
    FROM ROUNDS
    JOIN scores 
    ON rounds.round_id = scores.round_id 
    JOIN holes 
    ON holes.hole_id = scores.hole_id
    WHERE rounds.course_id = ? AND rounds.user_id = ?
    ORDER BY holes.hole_num ASC;
    `,
        [course_id, user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting birds", reject(mess))
      );
    })
  );
};
export const loadTotalBirds = async (user_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT
    scores.hole_num, scores.total_shots, holes.hole_par, scores.total_putts
    FROM ROUNDS JOIN scores 
    ON rounds.round_id = scores.round_id 
    JOIN holes 
    ON holes.hole_id = scores.hole_id
    WHERE rounds.user_id = ?
    ORDER BY holes.hole_num ASC;
    `,
        [user_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err getting birds", reject(mess))
      );
    })
  );
};

export const setUpDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
        console.log("Foreign keys turned on")
      );

      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS courses (
          course_id integer PRIMARY KEY AUTOINCREMENT,
          name text,
          lat varchar,
          lng varchar, 
          blue_rtg REAL, 
          blue_slp REAL,
          black_rtg REAL, 
          black_slp REAL, 
          black_blue_rtg REAL,
          black_blue_slp REAL,
          white_slp REAL,
          white_rtg REAL,
          blue_white_slp REAL,
          blue_white_rtg REAL,
          red_rtg REAL,
          red_slp REAL,
          white_red_slp REAL, 
          white_red_rtg REAL,
          version INTEGER DEFAULT 1 NOT NULL
        );
        `,
        null,
        null,
        null
      );

      tx.executeSql(
        `
      CREATE TABLE IF NOT EXISTS holes (
        hole_id integer PRIMARY KEY AUTOINCREMENT,
        course_id integer,
        hole_num integer,
        hole_par integer,
        hcp_rtg integer,
        hole_distance_blue varchar,
        pin_lat varchar,
        pin_lng varchar,
        camera_lat varchar,
        camera_lng varchar,
        camera_hdg varchar,
        camera_alt varchar,
        camera_zm varchar,
        CONSTRAINT fk_courses
        FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
      );`,
        null,
        null,
        null
      );

      tx.executeSql(
        `
      CREATE TABLE IF NOT EXISTS users (
        user_id integer PRIMARY KEY AUTOINCREMENT,
        user_name text
      );
      `,
        null,
        null,
        null
      );

      tx.executeSql(
        `
      CREATE TABLE IF NOT EXISTS rounds (
      round_id integer PRIMARY KEY AUTOINCREMENT,
      course_id integer,
      user_id integer,
      holes_played integer,
      calculated_holes_played integer,
      total_score integer,
      hcp_diff REAL,
      fwy_pct REAL,
      gir_pct REAL,
      total_putts REAL,
      end_date datetime,
      CONSTRAINT fk_courses
      FOREIGN KEY(course_id)
      REFERENCES courses(course_id),
      CONSTRAINT fk_users
      FOREIGN KEY(user_id)
      REFERENCES users(user_id)
    );
      `,
        null,
        null,
        null
      );

      tx.executeSql(
        `
      CREATE TABLE IF NOT EXISTS scores (
        score_id integer PRIMARY KEY AUTOINCREMENT,
        hole_id integer,
        hole_num intefer,
        round_id integer,
        date_time datetime,
        total_shots integer,
        total_putts integer,
        penalty integer,
        driver_direction integer,
        approach_rtg integer,
        chip_rtg integer,
        putt_rtg integer,
        gir boolean,
        ud boolean,
        CONSTRAINT fk_rounds
        FOREIGN KEY(round_id)
        REFERENCES rounds(round_id)
        CONSTRAINT fk_holes
        FOREIGN KEY(hole_id)
        REFERENCES holes(hole_id)
      );`,
        null,
        null,
        null
      );

      tx.executeSql(
        `
      CREATE TABLE clubs (
      club_id integer PRIMARY KEY AUTOINCREMENT,
      name text
    );
      `,
        null,
        null,
        null
      );

      tx.executeSql(
        `
      CREATE TABLE IF NOT EXISTS distances (
        distance_id integer PRIMARY KEY AUTOINCREMENT,
        user_id integer,
        club_id integer,
        distance real,
        effort real,
        date_time datetime,
        CONSTRAINT fk_users
        FOREIGN KEY(user_id)
        REFERENCES users(user_id),
        CONSTRAINT fk_clubs
        FOREIGN KEY(club_id)
        REFERENCES clubs(club_id)
      );
      `,
        null,
        null,
        null
      );

      resolve();
    });
  });
};

export const getScore = async (round_id) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        `
    SELECT scores.*, scores.hole_num, holes.* 
    FROM scores
    JOIN holes ON scores.hole_id = holes.hole_id
    WHERE scores.round_id = ?;
    `,
        [round_id],
        (txObj, result) => {
          resolve(result.rows._array);
        },
        (err, mess) => console.log("err creating round", reject(mess))
      );
    })
  );
};

export const dbCall = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from scores",
      [],
      (txObj, result) => {
        if (result.rows.length !== 0) {
          existingGameAlert();
          console.log("There is an existing game! Reset?");
          return true;
        }
      },
      () => console.log("error fetching")
    );
  });

  return false;
};

const dropAndCreate = async () => {
  db.transaction((tx) => {
    tx.executeSql(`DROP TABLE if exists SCORES`, null, null, null);

    tx.executeSql(
      `
    CREATE TABLE if not exists scores(
      score_id integer PRIMARY KEY not null,
      hole_number integer,
      date_time datetime,
      total_shots integer,
      total_putts integer,
      driver_direction integer,
      approach_rtg integer,
      chip_rtg integer,
      putt_rtg integer
    );
    `,
      null,
      (txObj, result) => {
        console.log("result", result);
      },
      (err) => console.log("err", err)
    );
  });
};
