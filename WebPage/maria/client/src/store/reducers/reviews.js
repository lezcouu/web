import { ReviewsActionTypes } from '../actions/reviews';

const initialState = {
    reviews: []
}

export const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ReviewsActionTypes.SET_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, action.payload]
            }
        default:
            return state
    }
}