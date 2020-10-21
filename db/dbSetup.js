import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native'

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

export const dbCall = () => {
    db.transaction(tx => {
      tx.executeSql(
        "select * from scores",
        [],
        (txObj, result) => {
          // console.log('result', result.rows)

          if(result.rows.length !== 0) {
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
      CREATE TABLE if not exists scores (
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