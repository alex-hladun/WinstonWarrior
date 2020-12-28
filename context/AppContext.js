import React, { useReducer, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { registerUser } from '../db/dbSetup';
// import {register}
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
    case "signed_up":
      AsyncStorage.setItem('authName', action.data)
      registerUser(action.data)

      return {
        ...state,
        auth_data: action.data,
        user_name: action.data,
        logged_in: true,
        auth_message: ''
      }
    case "authentication_done":
      return {
        ...state,
        auth_data: action.data,
        user_name: action.data,
        logged_in: true,
        auth_message: ''
      }
      break;
    case "log_out":
      return {
        ...state,
        auth_data: null,
        user_name: null,
        logged_in: false,
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
    case "done_loading":
      return {
        ...state,
        loading: false,
      }
      break;
  }
}

const initialState = {
  appState: {
  auth_data: {},
  viewMode: 'menu',
  logged_in: false,
  loading: true,
  auth_message: '',
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
  clubList: []},
  statState: {
    totalInfo: {},
    shotData: [],
    roundHistory: [],
    holes: {},
    holeHistory: {},
    lowScores: {},
    birdies: {},
    fwData: {},
    courseData: {
      name: '',
      courseId: '',
      course_slp: undefined,
      course_rtg: undefined,
    }
  },
  playState: {
    course_id: undefined,
  courseInfo: {},
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
}
const AppContext = React.createContext(initialState);

function AppProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = ({ username, password }) => {
    dispatch({ type: 'authentication_starting' })

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
      type: 'set_user_2_name',
      data: null
    })
    dispatch({
      type: 'set_user_2_round_id',
      data: null
    })
    dispatch({
      type: 'set_user_3_name',
      data: null
    })
    dispatch({
      type: 'set_user_3_round_id',
      data: null
    })
    dispatch({
      type: 'set_user_4_name',
      data: null
    })
    dispatch({
      type: 'set_user_4_round_id',
      data: null
    })
    dispatch({
      type: 'set_view_mode',
      data: 'menu'
    })
    dispatch({
      type: 'set_hole_num',
      data: undefined
    })

    AsyncStorage.removeItem('holeNum')
    AsyncStorage.removeItem('roundID')
    AsyncStorage.removeItem('u2roundid')
    AsyncStorage.removeItem('u2name')
    AsyncStorage.removeItem('u3roundid')
    AsyncStorage.removeItem('u3name')
    AsyncStorage.removeItem('u4roundid')
    AsyncStorage.removeItem('u4name')
    AsyncStorage.removeItem('course_id')


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