import { TestActionTypes } from '../actions/test';

const initialState = {
  test: [],
  fetching: false,
  error: null,
};

export const testReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TestActionTypes.GET_TEST_ATTEMPT:
      return {
        ...state, 
        fetching: true,
        synonums: [],
        error: null,
      }
    case TestActionTypes.GET_TEST_SUCCESS:
      return { 
        ...state,
        fetching: false,
        test: setSynonyms(action.payload),
        error: null,
      }
    case TestActionTypes.GET_TEST_FAILURE:
      return { ...state, 
        fetching: false,
        test: [],
        error: action.payload,
      }
    default:
      return state
  }
}

const setSynonyms = (test) => {
  return test
}