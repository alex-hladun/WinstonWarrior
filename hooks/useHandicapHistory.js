import * as React from 'react';
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory, loadHcpDiffStats } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'

export function useHandicapHistory(user_id) {
  const statContext = React.useContext(StatContext)
  const [handicap, setHandicap] = React.useState(0)

  React.useEffect(() => {
    // console.log('RETREVING HCPP')
    const getHandicap = async (user_id) => {
      const roundHistory = await loadHcpDiffStats(user_id)
      console.log("🚀 ~ file: useHandicapHistory.js ~ line 13 ~ getHandicap ~ roundHistory", roundHistory)


      let count = 0;
      let hcpIndex = 0;
      roundHistory.forEach(score => {
        if(count < 8) {
          count += 1
          hcpIndex += score.hcp_diff
        }
      })

      if(count) {
        setHandicap(hcpIndex / count)
      }

    }

    // getHandicap(1)
  }, [statContext.value.state.allDataUpdate])

  return handicap
}
