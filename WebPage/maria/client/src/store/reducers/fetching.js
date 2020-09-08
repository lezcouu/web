import { FetchingActionTypes } from '../actions/fetching';

const initialState = {
  fetching: false,
};

export const fetchingReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FetchingActionTypes.IS_FETCHING:
    return {
        ...state,
        fetching: true 
      }
      case FetchingActionTypes.ISNT_FETCHING:
    return {
        ...state,
        fetching: false 
      }
    default:
      return state
  }
}