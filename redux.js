export default function reducer(state = {}, action) {
  switch (action.type) {
    case "SET_MODULE":
      return {
        ...state,
        [action.payload.id]: action.payload,
      }
    default:
      return state
  }
}
