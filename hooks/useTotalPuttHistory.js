import * as React from 'react';
import { loadTotalPuttHistory } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'
import { AppContext } from '../context/AppContext'

export function useTotalPuttHistory(user_id) {
  const statContext = React.useContext(StatContext)
  const appContext = React.useContext(AppContext)
  const [puttHistory, setPuttHistory] = React.useState([])

  const getPutHistory = async (user_id) => {
    const hole_id_state = appContext.value.state.hole_num;
    const newPuttHisotry = await loadTotalPuttHistory(user_id)
    // console.log("🚀 ~ file: useTotalPuttHistory.js ~ line 14 ~ getPutHistory ~ newPuttHisotry", newPuttHisotry)
    setPuttHistory(newPuttHisotry.map(puttObj => {
      return(puttObj.putts)
    }))
  }

  React.useEffect(() => {
    getPutHistory(user_id)
  }, [appContext.value.state.hole_num])

  return puttHistory
}
