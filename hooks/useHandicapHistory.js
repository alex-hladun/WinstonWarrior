import * as React from 'react';
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory, loadHcpDiffStats } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'

export const loadHandicapFromArray = (hcpArray) => {
  // Given a sliced array of objects, will tell you what the handicaps were at that particular time

  const handicapArrayToSort = []
  let currentNineHoleRound = false;
  let currentNineHoleRoundID = undefined;

  // Finds how many of the scores to include
  hcpArray.forEach((score, i) => {
    if(handicapArrayToSort.length < 20) {
      // console.log('SCORE HCP', score)
      if (score.holes_played < 14 && currentNineHoleRound) {
        // existing 9 hole diff
        handicapArrayToSort.push({
          hcp_diff: score.hcp_diff + currentNineHoleRound,
          round1ID: currentNineHoleRoundID,
          round2ID: score.round_id
        })
        currentNineHoleRound = false;
        currentNineHoleRoundID = undefined;e
      } else if (score.holes_played < 14) {
        // no existing 9 hole round
        currentNineHoleRoundID = score.round_id
        currentNineHoleRound = score.hcp_diff
      } else {
        handicapArrayToSort.push({
          hcp_diff: score.hcp_diff,
        round1ID: score.round_id,
        round2ID: undefined
      })
      }
    }
  })

  const sortedHcpArray = handicapArrayToSort.sort((a, b) => a.hcp_diff - b.hcp_diff)
  // console.log("🚀 ~ file: useHandicapHistory.js ~ line 33 ~ loadHandicapFromArray ~ sortedHcpArray", sortedHcpArray)

  let totalCount = 0;
  let diffSum = 0;

  const handicapIncludeRounds = [];
  // Get the top 10 scores
  sortedHcpArray.forEach(score => {
    if(totalCount <= 8) {
      diffSum += score.hcp_diff
      handicapIncludeRounds.push(score.round1ID)
      handicapIncludeRounds.push(score.round2ID)
    }
    totalCount ++
  })

  const handicap = Math.round(diffSum * 10/ totalCount) / 10
 
  // Return the handicap calculated from the given array of hanicaps
  return ({
    handicap: handicap,
    includedRounds: handicapIncludeRounds
   })
}

export function useHandicapHistory(user_id) {
  const statContext = React.useContext(StatContext)
  const [handicapHistory, setHandicapHistory] = React.useState([])
  const [handicapRounds, setHandicapRounds] = React.useState([])

  React.useEffect(() => {
    // console.log('RETREVING HCPP')
    const getHandicapHistory = async (user_id) => {
      // RETURNS ARRAY OF HANDICAPS 
      const roundHistory = await loadHcpDiffStats(user_id)
      // console.log("🚀 ~ file: useHandicapHistory.js ~ line 13 ~ getHandicapHistory ~ roundHistory", roundHistory)

      const handicapHistoryArray = [];
      const length = roundHistory.length

      // Max points should be used for the graph
      let maxHcpPoints = 10
      if (length < 10) {
        maxHcpPoints = length
    }

      for (let i = 0; i < maxHcpPoints; i++) {
        handicapHistoryArray.push(loadHandicapFromArray(roundHistory.slice(i, i + 40)).handicap)
      }

      setHandicapRounds(loadHandicapFromArray(roundHistory.slice(0, 40)).includedRounds)

      setHandicapHistory(handicapHistoryArray.reverse())
    }

    getHandicapHistory(1)
  }, [statContext.value.state.handicapUpdate])

  return {
    handicapHistory,
    handicapRounds
  }
}