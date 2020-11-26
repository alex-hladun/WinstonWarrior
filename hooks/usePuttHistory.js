import * as React from 'react';
import { loadPuttHistory, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'

export function usePuttHistory(user_id, hole_id) {
  const statContext = React.useContext(StatContext)
  const [puttHistory, setPuttHistory] = React.useState([])

  const getPutHistory = async (user_id, hole_id) => {
    const newPuttHisotry = await loadPuttHistory(user_id, hole_id)
    if(newPuttHisotry) {
      setPuttHistory(newPuttHisotry)
    }
  }

  React.useEffect(() => {
    // console.log('RETREVING puttHistory')
    getPutHistory(1)
  }, [statContext.value.state.allDataUpdate])

  return puttHistory
}
