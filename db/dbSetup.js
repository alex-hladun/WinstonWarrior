import * as SQLite from 'expo-sqlite';
import { Alert, AsyncStorageStatic } from 'react-native'

const db = SQLite.openDatabase('winstonGolfer.db');

export default db

export const existingGameAlert = () => {
  Alert.alert(
    "Existing Round",
    "Would you like to delete and start again?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: () => dropAndCreate() }
    ],
    { cancelable: false }
  );
}

export const removeDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `DROP TABLE if exists scores`
      , null, null, null)
    tx.executeSql(
      `DROP TABLE if exists courses`
      , null, null, null)
    tx.executeSql(
      `DROP TABLE if exists rounds`
      , null, null, null)
    tx.executeSql(
      `DROP TABLE if exists users`
      , null, null, null)
    tx.executeSql(
      `DROP TABLE if exists holes`
      , null, null, null)
    tx.executeSql(
      `DROP TABLE if exists distances`
      , null, null, null)
    tx.executeSql(
      `DROP TABLE if exists clubs`
      , null, null, null)
  })
}


export const getUsers = async() => {
  return new Promise((resolve, reject) => db.transaction(tx => {
    tx.executeSql(`
    SELECT * FROM USERS
    `, [], (txObj, result) => {
      // console.log('result creating user', result.rows._array)
      resolve(result.rows)
    }, (err, mess) => reject)
  }))
}


export const registerUser = async(user) => {
  return new Promise((resolve, reject) => db.transaction(tx => {
    console.log('inside reg user sql')
    tx.executeSql(`
    INSERT INTO users (user_name) VALUES (?);
    `, [user], (txObj, result) => {
      console.log('created user', result)
      resolve(result.insertId)
    }, (err, mess) => console.log('err creating user', reject(mess)))
  }))
}

export const createRound = async(course_id, user_id) => {
  return new Promise((resolve, reject) => db.transaction(tx => {
    console.log('inside createRound')
    tx.executeSql(`
    INSERT INTO rounds (course_id, user_id) VALUES (?, ?);
    `, [course_id, user_id], (txObj, result) => {
      console.log('result creating round', result)
      resolve(result.insertId)
    }, (err, mess) => console.log('err creating round', reject(mess)))
  })
  )
}
export const postScore = async(hole_id, hole_num, round_id, total_shots, total_putts = null, penalty = null, driver_direction = null, approach_rtg = null, chip_rtg = null, putt_rtg = null) => {
  return new Promise((resolve, reject) => db.transaction(tx => {
    tx.executeSql(`
    INSERT INTO scores (
      hole_id,
      hole_num,
      round_id,
      date_time,
      total_shots,
      total_putts,
      pentalty,
      driver_direction,
      approach_rtg,
      chip_rtg,
      putt_rtg
    ) VALUES (?, ?, ?, strftime('%Y-%m-%d %H:%M:%S','now'), ?, ?, ?, ?, ?, ?, ?);
    `, [hole_id, hole_num, round_id, total_shots, total_putts, penalty, driver_direction, approach_rtg, chip_rtg, putt_rtg], (txObj, result) => {
      console.log('result posting score', result)
      resolve(result)
    }, (err, mess) => {
      console.log(`ERROR posting score: ${err}, ${mess}`)
      reject(err)})
  })
  )
}

export const createWinston = () => {
  db.transaction(tx => {
    tx.executeSql(`
    INSERT INTO courses (name) VALUES (?);
    `, ['The Winston'], (txObj, result) => {
      console.log('result creating winston', result.rows._array)
      // console.log('transObj', txObj)
      // setHole(holeNum + 1)
      // console.log('txObj', txObj)
    }, (err, mess) => console.log('err creating user', mess))

  })
}

export const setUpDB = () => {
  db.transaction(tx => {
    db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
      console.log('Foreign keys turned on')
    );

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS courses (
        course_id integer PRIMARY KEY AUTOINCREMENT,
        name text
      );
      `, null, null, null)

    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS holes (
      hole_id integer PRIMARY KEY AUTOINCREMENT,
      course_id integer,
      hole_num integer,
      hole_par integer,
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
    );`, null, null, null)


    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      user_id integer PRIMARY KEY AUTOINCREMENT,
      user_name text
    );
    `, null, null, null)



    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS rounds (
    round_id integer PRIMARY KEY AUTOINCREMENT,
    course_id integer,
    user_id integer,
    total_score integer,
    end_date datetime,
    CONSTRAINT fk_courses
    FOREIGN KEY(course_id)
    REFERENCES courses(course_id),
    CONSTRAINT fk_users
    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
  );
    `, null, null, null)

    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS scores (
      score_id integer PRIMARY KEY AUTOINCREMENT,
      hole_id integer,
      hole_num intefer,
      round_id integer,
      date_time datetime,
      total_shots integer,
      total_putts integer,
      pentalty integer,
      driver_direction integer,
      approach_rtg integer,
      chip_rtg integer,
      putt_rtg integer,
      CONSTRAINT fk_rounds
      FOREIGN KEY(round_id)
      REFERENCES rounds(round_id)
      CONSTRAINT fk_holes
      FOREIGN KEY(hole_id)
      REFERENCES holes(hole_id)
    );`, null, null, null)

    tx.executeSql(`
    CREATE TABLE clubs (
    club_id integer PRIMARY KEY AUTOINCREMENT,
    name text
  );
    `, null, null, null)


    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS distances (
      distance_id integer PRIMARY KEY AUTOINCREMENT,
      user_id integer,
      club_id integer,
      date_time datetime,
      CONSTRAINT fk_users
      FOREIGN KEY(user_id)
      REFERENCES users(user_id),
      CONSTRAINT fk_clubs
      FOREIGN KEY(club_id)
      REFERENCES clubs(club_id)
    );
    `, null, null, null)
  })
}

export const getScore = async(round_id) => {
  return new Promise((resolve, reject) => db.transaction(tx => {
    tx.executeSql(`
    SELECT * FROM scores WHERE round_id = ?;
    `, [round_id], (txObj, result) => {
      console.log('result creating round', result)
      resolve(result)
    }, (err, mess) => console.log('err creating round', reject(mess)))
  })
  )
}



export const dbCall = () => {
  db.transaction(tx => {
    tx.executeSql(
      "select * from scores",
      [],
      (txObj, result) => {
        // console.log('result', result.rows)

        if (result.rows.length !== 0) {
          existingGameAlert()
          console.log('There is an existing game! Reset?')
          return true
        }
      },
      () => console.log("error fetching")
    );
  })
  console.log('done w DATABASE')
  return false
}


const dropAndCreate = async () => {
  db.transaction(tx => {
    tx.executeSql(
      `DROP TABLE if exists SCORES`
      , null, null, null)

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
    `
      , null, (txObj, result) => {
        console.log('result', result)
        // console.log('txObj', txObj)
      }, err => console.log('err', err))
  })

  console.log('deleted game')
}