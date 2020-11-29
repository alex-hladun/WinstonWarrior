import React, { useReducer, useEffect, useMemo } from 'react';
const reducer = (state, action) => {
  switch (action.type) {
    case "set_course":
      return {
        ...state,
        course_id: action.data,
        p1_rtg: action.rtg,
        p1_slp: action.slp
      }
    break;
    case "set_hole_info":
      return {
        ...state,
        holeInfo: action.data
      }
    break;
    case "set_player_2":
      return {
        ...state,
        player_2: action.data,
      }
    break;
    case "set_player_3":
      return {
        ...state,
        player_3: action.data,
      }
    break;
    case "set_player_4":
      return {
        ...state,
        player_4: action.data,
      }
    break;
    case "remove_player_2":
      return {
        ...state,
        player_2: null
      }
    break;
    case "remove_player_3":
      return {
        ...state,
        player_3: null
      }
    break;
    case "remove_player_4":
      return {
        ...state,
        player_4: null
      }
    break;
    case "set_p1_score":
      return {
        ...state,
        p1score: {...state.p1score, [action.hole] : action.score}
      }
    break;
    case "set_p2_score":

      return {
        ...state,
        p2score: {...state.p2score, [action.hole] : action.score}
      }
    break;
    case "set_p3_score":

      return {
        ...state,
        p3score: {...state.p3score, [action.hole] : action.score}
      }
    break;
    case "set_p4_score":

      return {
        ...state,
        p4score: {...state.p4score, [action.hole] : action.score}
      }
    break;
    case "clear_p1_score":
      return {
        ...state,
        p1score: initialState.p1score,
      }
    break;
    case "clear_p2_score":

      return {
        ...state,
        p2score: initialState.p2score,
        player_2: undefined
      }
    break;
    case "clear_p3_score":

      return {
        ...state,
        p3score: initialState.p3score,
        player_3: undefined
      }
    break;
    case "clear_p4_score":

      return {
        ...state,
        p4score: initialState.p4score,
        player_4: undefined
      }
    break;
    case "restore_p1_score":
      return {
        ...state,
        p1score: action.data
      }
    break;
    case "restore_p2_score":

      return {
        ...state,
        p2score: action.data,
        player_2: action.name
      }
    break;
    case "restore_p3_score":

      return {
        ...state,
        p3score: action.data,
        player_3: action.name
      }
    break;
    case "restore_p4_score":
      return {
        ...state,
        p4score: action.data,
        player_4: action.name
      }
    break;
  }
}
const initialState = {
  course_id: undefined,
  holeInfo: undefined,
  p1_rtg: undefined,
  p1_slp: undefined,
  p2_rtg: undefined,
  p2_slp: undefined,
  p3_rtg: undefined,
  p3_slp: undefined,
  p4_rtg: undefined,
  p4_slp: undefined,
  player_2: undefined,
  player_3: undefined,
  player_4: undefined,
  p1score: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null
  },
  p2score: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null
  },
  p3score: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null
  },
  p4score: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null
  },
}
const PlayContext = React.createContext(initialState);

function PlayProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const doneRound = () => {
    dispatch({
      type: 'clear_p1_score'
    })
    dispatch({
      type: 'clear_p2_score'
    })
    dispatch({
      type: 'clear_p3_score'
    })
    dispatch({
      type: 'clear_p4_score'
    })
  
    console.log('all info cleared from PlayContext')
  }

  const value = useMemo(() => {
   return { state, doneRound };
  }, [state]);

  return (
    <PlayContext.Provider value={{ value, dispatch }}>
      {props.children}
    </PlayContext.Provider>
  );
}
export { PlayContext, PlayProvider };