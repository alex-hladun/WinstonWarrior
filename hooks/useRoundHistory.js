import * as React from 'react';
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'

export function useRoundHistory(user_id) {
  const statContext = React.useContext(StatContext)
  const [roundHistory, setRoundHistory] = React.useState([])


  React.useEffect(() => {
    console.log('RETREVING RoundHistory')
    const getRoundHistory = async (user_id) => {
      const roundHistory = await loadStats(user_id)

      if(roundHistory) {
        setRoundHistory(roundHistory)
      }
    }

    getRoundHistory(1)
  }, [statContext.value.state.allDataUpdate])

  return roundHistory
}
