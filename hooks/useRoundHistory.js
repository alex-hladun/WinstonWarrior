import * as React from 'react';
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'

export function useRoundHistory(user_id) {
  const statContext = React.useContext(StatContext)
  const [roundHistory, setRoundHistory] = React.useState([])


  React.useEffect(() => {
    console.log('RETREVING RoundHistory')
    const getRoundHistory = async (user_id) => {
      const newRoundHistory = await loadStats(user_id)
      console.log("🚀 ~ file: useRoundHistory.js ~ line 14 ~ getRoundHistory ~ newRoundHistory", newRoundHistory)

      if(newRoundHistory) {
        setRoundHistory(newRoundHistory.reverse())
      }
    }

    getRoundHistory(1)
  }, [statContext.value.state.allDataUpdate])

  return roundHistory
}
