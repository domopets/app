export default function reducer(state = {}, action) {
  switch (action.type) {
    case "SET_MODULE":
      return {
        ...state,
        [action.payload.id]: action.payload,
      }
    case "DELETE_MODULE":
      const newState = {...state}
      delete newState[action.payload]
      return newState
    default:
      return state
  }
}
