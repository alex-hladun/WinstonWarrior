import React, { useReducer, useMemo } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const reducer = (state, action) => {
  switch (action.type) {
    case "set_round_history":
      return {
        ...state,
        roundHistory: action.data
      }
    break;
    case "set_hole_stats":
      return {
        ...state,
        holes: action.data
      }
    break;
    case "set_hole_history":
      return {
        ...state,
        holeHistory: action.data
      }
    break;
    case "set_low_scores":
      return {
        ...state,
        lowScores: action.data
      }
    break;
    case "set_birdies":
      return {
        ...state,
        birdies: action.data
      }
    break;
    case "set_pars":
      return {
        ...state,
        pars: action.data
      }
    break;
    case "set_eagles":
      return {
        ...state,
        eagles: action.data
      }
    break;
    case "set_fw_data":
      return {
        ...state,
        fwData: action.data
      }
    break;
  }
}
const initialState = {
  roundHistory: [],
  holes: {},
  holeHistory: {},
  lowScores: {},
  birdies: {},
  pars: {},
  eagles: {},
  fwData: {}
}
const StatContext = React.createContext(initialState);

function StatProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);


const doneRound = () => {
  dispatch({
    type: 'set_round_id',
    data: null
  })
}

  const value = useMemo(() => {
   return { state };
  }, [state]);

  return (
    <StatContext.Provider value={{ value, dispatch }}>
      {props.children}
    </StatContext.Provider>
  );
}
export { StatContext, StatProvider };