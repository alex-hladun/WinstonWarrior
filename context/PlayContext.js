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
  }
}
const initialState = {
  course_id: undefined,
  player_2: undefined,
  player_3: undefined,
  player_4: undefined
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