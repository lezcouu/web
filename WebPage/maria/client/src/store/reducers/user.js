import { UserActionTypes } from '../actions/user';

const initialState = {
    setUser: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {
                ...state,
                setUser: action.payload
            }
        default:
            return state
    }
}