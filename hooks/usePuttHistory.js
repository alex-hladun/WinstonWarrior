import * as React from 'react';
import { loadPuttsForHole } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'
import { AppContext } from '../context/AppContext'

export function usePuttHistory(user_id, hole_id) {
  const statContext = React.useContext(StatContext)
  const appContext = React.useContext(AppContext)
  const [puttHistory, setPuttHistory] = React.useState([])


  const getPutHistory = async (user_id, hole_id) => {
    const hole_id_state = appContext.value.state.hole_num;
    const newPuttHisotry = await loadPuttsForHole(user_id, hole_id_state)
    console.log("🚀 ~ file: usePuttHistory.js ~ line 15 ~ getPutHistory ~ newPuttHisotry", newPuttHisotry)
    setPuttHistory(newPuttHisotry.map(puttObj => {
      return(puttObj.total_putts)
    }))
  }

  React.useEffect(() => {
    getPutHistory(user_id, hole_id)
  }, [appContext.value.state.hole_num])

  return puttHistory
}
