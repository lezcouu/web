export const TestActionTypes = {
  GET_TEST_ATTEMPT: 'GET_TEST_ATTEMPT',
  GET_TEST_SUCCESS: 'GET_TEST_SUCCESS',
  GET_TEST_FAILURE: 'GET_TEST_FAILURE',
}

export const getTestAttempt = () => {
  return {
    type: TestActionTypes.GET_TEST_ATTEMPT,
  }
}

export const getTestSuccess = test => {
  return {
    type: TestActionTypes.GET_TEST_SUCCESS,
    payload: test
  }
}

export const getTestFailure = error => {
  return {
    type: TestActionTypes.GET_TEST_FAILURE,
    payload: error
  }
}

export const getTestAttempt_1 = () => {
  return {
    type: TestActionTypes.GET_TEST_ATTEMPT,
  }
}

export const testRequest = id => {
  return async (dispatch) => {
    getTestAttempt();
    try {
      const response = await fetch(`https://localhost:4000/${id}`);
      const test = await response.json()
      dispatch(
        getTestSuccess(test)
      );
    } catch (err) {
      getTestFailure(err);
    }
  };
};
