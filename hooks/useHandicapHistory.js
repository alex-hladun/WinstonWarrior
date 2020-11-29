import * as React from 'react';
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory, loadHcpDiffStats } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'


const loadHandicapFromArray = (hcpArray) => {
// Given a sliced array of objects, will tell you what the handicaps were at that particular time
}

export function useHandicapHistory(user_id) {
  const statContext = React.useContext(StatContext)
  const [handicapHistory, setHandicapHistory] = React.useState([])

  React.useEffect(() => {
    // console.log('RETREVING HCPP')
    const getHandicapHistory = async (user_id) => {
      // RETURNS ARRAY OF HANDICAPS 
      const roundHistory = await loadHcpDiffStats(user_id)
      console.log("🚀 ~ file: useHandicapHistory.js ~ line 13 ~ getHandicapHistory ~ roundHistory", roundHistory)

      const handicapHistoryArray = [];
      console.log(roundHistory.length)


      // for (let i = 1; i <= 10; i++) {
      //   handicapHistoryArray.push(loadHandicapFromArray(roundHistory.slice))
      // }


    }

    getHandicapHistory(1)
  }, [statContext.value.state.handicapUpdate])

  return handicapHistory
}
