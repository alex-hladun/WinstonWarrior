import * as React from 'react';
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'

export function useHoleData(user_id, course_id) {
  const statContext = React.useContext(StatContext)
  const [holeData, setHoleData] = React.useState({})


  React.useEffect(() => {
    const getHoleData = async (user_id, course_id) => {

      const holeStats = await loadHoleStats(course_id, user_id)
      let holeObj = {}
      for (let i = 1; i <= 18; i++) {
        holeObj[i] = {}
      }
  
      holeStats.forEach((hole) => {
        holeObj[hole.hole_num]['avgShots'] = hole.avg_shots
        holeObj[hole.hole_num]['avgPutts'] = hole.avg_putts
      })

      const holeHistory = await loadHoleHistory(course_id, user_id)
      const holeHistoryObj = {}
      for (let i = 1; i <= 18; i++) {
        holeHistoryObj[i] = { score: [], putts: [], date: []}
      }
  
      holeHistory.forEach((hole) => {
        // console.log("TabOneScreen -> hole history", hole)
        holeHistoryObj[hole.hole_num].score.push(hole.total_shots)
        holeHistoryObj[hole.hole_num].putts.push(hole.total_putts)
        holeHistoryObj[hole.hole_num].date.push(hole.date)
  
      })

      const lowHoleData = await loadLow(course_id, user_id)
      // console.log("🚀 ~ file: useStats.js ~ line 66 ~ useStats ~ lowHoleData", lowHoleData)

      const lowHoleObj = {}
      for (let i = 1; i <= 18; i++) {
        lowHoleObj[i] = 'NA'
      }
  
      lowHoleData.forEach((hole) => {
        lowHoleObj[hole.hole_num] = hole.min_score
      })

      const hitFwData = await loadFairwayData(user_id, course_id)
      const allFwData = await loadFairwayDataTotal(user_id, course_id)
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
        // console.log("🚀 ~ file: useHoleData.js ~ line 68 ~ useHoleData ~ hitFwObj", hitFwObj)



      const holeDataObj = {
        holeObj, holeHistoryObj, hitFwObj, lowHoleObj
      }
      // console.log("🚀 ~ file: useHoleData.js ~ line 77 ~ useHoleData ~ holeDataObj", holeDataObj)
      setHoleData(holeDataObj)
    }

    getHoleData(1, 1)
  }, [statContext.value.state.holeDataUpdate])

  return holeData
}
