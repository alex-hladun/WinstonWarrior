import * as React from 'react';
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory, loadHcpDiffStats } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'

const loadHandicapFromArray = (hcpArray) => {
  // Given a sliced array of objects, will tell you what the handicaps were at that particular time

  let lastIndex = 0;
  let totalRounds = 0;

  const handicapArrayToSort = []
  let currentNineHoleRound = false;

  // Finds how many of the scores to include
  hcpArray.forEach((score, i) => {
    if(handicapArrayToSort.length < 20) {
      if (score.holes_played < 14 && currentNineHoleRound) {
        // existing 9 hole diff
        handicapArrayToSort.push({
          hcp_diff: score.hcp_diff + currentNineHoleRound
        })
        currentNineHoleRound = false;
      } else if (score.holes_played < 14) {
        // no existing 9 hole round
        currentNineHoleRound = score.hcp_diff
      } else {
        handicapArrayToSort.push(score)
      }
    }
  })

  const sortedHcpArray = handicapArrayToSort.sort((a, b) => a.hcp_diff - b.hcp_diff)
  console.log("🚀 ~ file: useHandicapHistory.js ~ line 33 ~ loadHandicapFromArray ~ sortedHcpArray", sortedHcpArray)

  let totalCount = 0;
  let diffSum = 0;

  sortedHcpArray.forEach(score => {
    if(totalCount <= 8) {
      diffSum += score.hcp_diff
    }
    totalCount ++
  })
 
  return (Math.round(diffSum * 10/ totalCount) / 10)
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
      const length = roundHistory.length

      let maxHcpPoints = 10
      if (length < 10) {
        maxHcpPoints = length
      }

      for (let i = 0; i < maxHcpPoints; i++) {
        handicapHistoryArray.push(loadHandicapFromArray(roundHistory.slice(i, i + 40)))
      }

      console.log("🚀 ~ file: useHandicapHistory.js ~ line 24 ~ getHandicapHistory ~ handicapHistoryArray", handicapHistoryArray)
      setHandicapHistory(handicapHistoryArray.reverse())
    }

    getHandicapHistory(1)
  }, [statContext.value.state.handicapUpdate])

  return handicapHistory
}
