import React, { useReducer, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const reducer = (state, action) => {
  switch (action.type) {
    case "authentication_starting":
      return {
        ...state,
        auth_data: {},
        logged_in: false,
        auth_message: ''
      }
    break;
    case "authentication_done":
      return {
        ...state,
        auth_data: action.data,
        user_name: action.data,
        logged_in: true,
        auth_message: ''
      }
    break;
    case "set_round_id":
      return {
        ...state,
       round_id: action.data
      }
    break;
    case "set_user_2_round_id":
      return {
        ...state,
       user_2_rd_id: action.data
      }
    break;
    case "set_user_2_name":
      return {
        ...state,
       user_2_name: action.data
      }
    break;
    case "set_user_3_round_id":
      return {
        ...state,
       user_3_rd_id: action.data
      }
    break;
    case "set_user_3_name":
      return {
        ...state,
       user_3_name: action.data
      }
    break;
    case "set_user_4_round_id":
      return {
        ...state,
       user_4_rd_id: action.data
      }
    break;
    case "set_user_4_name":
      return {
        ...state,
       user_4_name: action.data
      }
    break;
    case "set_hole_id":
      return {
        ...state,
       hole_id: action.data
      }
    break;
    case "set_hole_num":
      return {
        ...state,
       hole_num: action.data
      }
    break;
    case "set_club_list":
      return {
        ...state,
       clubList: action.data
      }
    break;
    case "set_view_mode":
      return {
        ...state,
       viewMode: action.data
      }
    break;
    case "authentication_failed":
      return {
        ...state,
        auth_data: {},
        logged_in: false,
        auth_message: 'Something went wrong'
      }
    break;
  }
}
const initialState = {
  auth_data: {},
  viewMode: 'menu',
  logged_in: false,
  auth_message : '',
  round_id: undefined,
  user_name: undefined,
  hole_num: undefined,
  hole_id: undefined,
  user_2_rd_id: undefined,
  user_2_name: undefined,
  user_3_rd_id: undefined,
  user_3_name: undefined,
  user_4_rd_id: undefined,
  user_4_name: undefined,
  clubList: []
}
const AppContext = React.createContext(initialState);

function AppProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

const login = ({username, password}) => {
  dispatch({type: 'authentication_starting'})

  let login_data = {
    user_name: username,
    first_name: 'Testing',
    last_name: 'Something',
    email: 'some@thing.com'
  }

  // THIS LOGS IN AND SETS HOME SCREEN MAIN SCREEN
  dispatch({
    type: 'authentication_done',
    data: login_data
  })
}

const setHole = (holeNum) => {
  AsyncStorage.setItem('holeNum', JSON.stringify(holeNum))
// Need to retrieve & set hole_id here
  console.log('setting HOLE in async to ', holeNum)
  dispatch({
    type: 'set_hole_num',
    data: holeNum
  })
}

const doneRound = () => {
  dispatch({
    type: 'set_round_id',
    data: null
  })

  dispatch({
    type: 'set_view_mode',
    data: 'menu'
  })

  AsyncStorage.removeItem('holeNum')
  AsyncStorage.removeItem('roundID')

  console.log('all info cleared from AppContext')
}


  const value = useMemo(() => {
   return { state, login, setHole, doneRound };
  }, [state]);

  return (
    <AppContext.Provider value={{ value, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };