import * as React from 'react';
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'
import { useTotalInfo } from './useTotalInfo';

export function useStats(user_id, course_id) {
  const statContext = React.useContext(StatContext)

  React.useEffect(() => {
    const retrieveStats = async () => {
      // CUSTOM FUNCTION NOT USED
      // const fwHistoryArray = await loadFwHistory(1)
    }

    retrieveStats()
  }, [statContext.value.state.allDataUpdate])

    return(null)
  }
