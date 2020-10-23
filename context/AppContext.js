import React, { useReducer, useEffect, useMemo } from 'react';
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
        logged_in: true,
        auth_message: ''
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
  logged_in: false,
  auth_message : ''
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

  dispatch({
    type: 'authentication_done',
    data: login_data
  })
}


  const value = useMemo(() => {
   return { state, login };
  }, [state]);

  return (
    <AppContext.Provider value={{ value, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };