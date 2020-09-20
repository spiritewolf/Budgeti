export default (state, action) => {
  switch(action.type){
    case 'POST_SIGNUP':
      return{
        ...state,
        ...action.payload,
        loading: false
      }
    case 'POST_LOGIN':
    localStorage.setItem('token', action.payload.token);
      return{
        ...state,
        ...action.payload,
        auth: true,
        loading: false
      }
    case 'USER_LOADED':
    return{
      ...state,
      auth: true,
      loading: false,
      user: action.payload
    }
    case 'USER_LOADING':
    return{
      ...state,
      loading: true
    }
    case 'AUTH_ERROR':
    case 'LOGIN_ERROR':
    case 'LOGOUT_ERROR':
    case 'SIGNUP_ERROR':
    case 'SERVER_ERROR':
    case 'GET_LOGOUT':
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      auth: false,
      loading: false,
      user: null,
      error: action.payload
    }
    default:
      return state;
  }
}
