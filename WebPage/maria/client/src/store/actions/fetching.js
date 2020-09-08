export const FetchingActionTypes = {
    IS_FETCHING: 'IS_FETCHING',
    ISNT_FETCHING: 'ISNT_FETCHING'
  }
  
  export const isFetching = () => {
    return {
      type: FetchingActionTypes.IS_FETCHING,
    }
  }
  
  export const isntFetching = () => {
    return {
      type: FetchingActionTypes.ISNT_FETCHING,
    }
  }