import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './db/dbSetup'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function dbCall() {
      await db.transaction(tx => {
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

        tx.executeSql(
          `
          INSERT INTO scores (
            hole_number,
            date_time,
            total_shots,
            total_putts,
            driver_direction,
            approach_rtg,
            chip_rtg,
            putt_rtg
          ) VALUES (?, strftime('%Y-%m-%d %H-%M','now'), ?, ?, ?, ?, ?, ?);
          `
          , [1, 4, 2, 20, 80, 20, 30], (txObj, result) => {
            console.log('result', result)
            // console.log('txObj', txObj)
          }, err => console.log('err', err))

          tx.executeSql(
            "select * from scores",
            [],
            (txObj, result) => {
              console.log('result', result)
              // console.log('txObj', txObj)
            },
            () => console.log("error fetching")
          );
      })
      console.log('done w DATABASE')

    }

    dbCall()
  }, [])


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
