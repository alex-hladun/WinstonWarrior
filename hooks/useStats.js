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
  
      // Get counts of birdie, par, eagle for each hole
      const birdieCount = await loadBirds(course_id, user_id)
      // console.log('birdieCount', birdieCount)
      let birdieObj = {}
      for (let i = 1; i <= 18; i++) {
        birdieObj[i] = {
          pars: 0,
          birdies: 0,
          eagles: 0,
          rounds: 0,
          GIRs: 0
        }
      }
  
      const totalBirds = {
        eagles: 0,
        birdies: 0,
        pars: 0
      }
  
      birdieCount.forEach((hole) => {
        // console.log('scoreObj', hole)
        birdieObj[hole.hole_num].rounds++
  
        if (hole.total_shots - hole.hole_par === -1) {
          birdieObj[hole.hole_num].birdies++
          totalBirds.birdies ++
        } else if (hole.total_shots - hole.hole_par === 0) {
          birdieObj[hole.hole_num].pars++
          totalBirds.pars ++
        } else if (hole.total_shots - hole.hole_par === -2) {
          birdieObj[hole.hole_num].eagles++
          totalBirds.eagles ++
        }
  
        if ((hole.total_shots - hole.total_putts + 2) <= hole.hole_par) {
          birdieObj[hole.hole_num].GIRs++
  
        }
      })
  
      statContext.dispatch({
        type: 'set_birdies',
        data: birdieObj
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
  
      const totalRounds = await loadTotalRounds(1)
      const girPct = await loadGirPct(1)
      const avgScore = await loadAvgScore(1)
      const bestScore = await loadBestScore(1)
      const avgPutts = await loadAvgPutts(1)
      const fwyPct = await getPct(1)
      console.log(totalRounds, avgScore, bestScore)
      statContext.dispatch({
        type: 'set_total_info',
        data: {
          totalRounds,
          avgScore,
          avgPutts,
          bestScore,
          totalBirds,
          fwyPct,
          girPct
        }
      })
      console.log('ALL STATS SAVED INTO STATSTATE')
    }

    retrieveStats()
  }, [])

    return(null)
  }
