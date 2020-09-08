
export const ReviewsActionTypes = {
    SET_REVIEW: 'SET_REVIEW',
}

export const addReview = review => {
    return {
        type: ReviewsActionTypes.SET_REVIEW,
        payload: review
    }
}


