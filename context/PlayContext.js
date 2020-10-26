import React, { useReducer, useEffect, useMemo } from 'react';
const reducer = (state, action) => {
  switch (action.type) {
    case "set_course":
      return {
        ...state,
        course_id: action.data,
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
  }
}
const initialState = {
  course_id: undefined,
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

  const value = useMemo(() => {
   return { state };
  }, [state]);

  return (
    <PlayContext.Provider value={{ value, dispatch }}>
      {props.children}
    </PlayContext.Provider>
  );
}
export { PlayContext, PlayProvider };