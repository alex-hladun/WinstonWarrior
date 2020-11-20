import * as React from 'react';
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'

export function useShotData(user_id) {
  const statContext = React.useContext(StatContext)
  const [shotData, setShotData] = React.useState([])


  React.useEffect(() => {
    const getShotData = async (user_id) => {
      const shotDataDb = await loadShots(user_id)
      setShotData(shotDataDb)
    }

    getShotData(1)
  }, [statContext.value.state.clubDataUpdate])

  return shotData
}
