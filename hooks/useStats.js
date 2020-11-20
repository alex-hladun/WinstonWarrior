import * as React from 'react';
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'

export function useStats(user_id, course_id) {
  const statContext = React.useContext(StatContext)

  React.useEffect(() => {
    const retrieveStats = async () => {
      const statsArray = await loadStats(1)
      // console.log("TabOneScreen -> statsArray with roundHistory", statsArray)
      statContext.dispatch({
        type: 'set_round_history',
        data: statsArray
      })
  
      const fwHistoryArray = await loadFwHistory(1)
  
      // console.log('round history', statsArray)
      // Get individual TOTAL hole stats
      const holeStats = await loadHoleStats(course_id, user_id)
      // console.log("TabOneScreen -> holeStats", holeStats)
      let holeObj = {}
      for (let i = 1; i <= 18; i++) {
        holeObj[i] = {}
      }
  
      holeStats.forEach((hole) => {
        holeObj[hole.hole_num]['avgShots'] = hole.avg_shots
        holeObj[hole.hole_num]['avgPutts'] = hole.avg_putts
      })
  
      statContext.dispatch({
        type: 'set_hole_stats',
        data: holeObj
      })
  
      // Get hole history (historical total shots & putts)
      const holeHistory = await loadHoleHistory(course_id, user_id)
      holeObj = {}
      for (let i = 1; i <= 18; i++) {
        holeObj[i] = { score: [], putts: [] }
      }
  
      holeHistory.forEach((hole) => {
        // console.log("TabOneScreen -> hole history", hole)
        holeObj[hole.hole_num].score.push(hole.total_shots)
        holeObj[hole.hole_num].putts.push(hole.total_putts)
  
      })
      statContext.dispatch({
        type: 'set_hole_history',
        data: holeObj
      })
  
      // Shot data logic here
      const shotData = await loadShots(1)
      // console.log('ALL SHOTDATA', shotData)
      statContext.dispatch({
        type: 'set_shot_data',
        data: shotData
      })
  
      // Retrieve low
      const lowHoleData = await loadLow(1, 1)
      holeObj = {}
      for (let i = 1; i <= 18; i++) {
        holeObj[i] = {}
      }
  
      lowHoleData.forEach((hole) => {
        holeObj[hole.hole_num] = hole.min_score
      })
      statContext.dispatch({
        type: 'set_low_scores',
        data: holeObj
      })
  
      const hitFwData = await loadFairwayData(1, 1)
      const allFwData = await loadFairwayDataTotal(1, 1)
      let hitFwObj = {}
      allFwData.forEach((hole) => {
        hitFwObj[hole.hole_num] = {
          totalFairways: hole.total_fairways,
          driverDirection: hole.driver_direction,
          approachRtg: hole.approach_rtg,
          chipRtg: hole.chip_rtg,
          puttRtg: hole.putt_rtg
        }
      })
  
      hitFwData.forEach(hole => {
        hitFwObj[hole.hole_num] = {
          ...hitFwObj[hole.hole_num], fairwaysHit: hole.total_fairways_hit
        }
      })
  
      statContext.dispatch({
        type: 'set_fw_data',
        data: hitFwObj
      })
  
      
      console.log('ALL STATS SAVED INTO STATSTATE')
    }

    retrieveStats()
  }, [statContext.value.state.allDataUpdate])

    return(null)
  }
