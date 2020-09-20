export default (state, action) => {
  switch(action.type){
    case 'GET_TRANSACTIONS':
      return{
        ...state,
        transactions: action.payload,
        loading: false
      }
    case 'DELETE_TRANSACTION':
      return{
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return{
        ...state,
        transactions: [action.payload, ...state.transactions],
        loading: false
      }
    case 'TRANSACTION_LOADING':
    return{
      ...state,
      loading: true
    }
    case 'TRANSACTION_ERROR':
    return {
      ...state,
      error: action.payload
    }
    default:
      return state;
  }
}
