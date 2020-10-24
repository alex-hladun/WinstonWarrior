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

export const registerUser = (user) => {
  let uid;
  db.transaction(tx => {
    tx.executeSql(`
    INSERT INTO users (user_name) VALUES (?);
    `, [user], (txObj, result) => {
      // console.log('result creating user', result.rows._array)
    }, (err, mess) => console.log('err creating user', mess))

    tx.executeSql(`
    SELECT last_insert_rowid()
    `, null, (txObj, result) => {
      console.log('result creating user', result.rows._array[0]['last_insert_rowid()'])
      uid = result.rows._array[0]['last_insert_rowid()']
    }, (err, mess) => console.log('err creating user', mess))


    return uid



  })
}

export const createRound = (course_id, user_id) => {
  db.transaction(tx => {
    tx.executeSql(`
    INSERT INTO rounds (course_id, user_id) VALUES (?, ?);

    `, [course_id, user_id], (txObj, result) => {
      console.log('result creating round', result)
      // console.log('transObj', txObj)
      // setHole(holeNum + 1)
      // console.log('txObj', txObj)
    }, (err, mess) => console.log('err creating round', mess))

  })
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
      round_id integer,
      date_time datetime,
      total_shots integer,
      total_putts integer,
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