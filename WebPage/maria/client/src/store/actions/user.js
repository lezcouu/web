import axios from 'axios';

export const UserActionTypes = {
    USER_REGISTER: 'USER_REGISTER',
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT',
    SET_USER: 'SET_USER'
}

export function userRegister(firstname, lastname, adress, email, password) {
    return dispatch => {
        return axios.post('http://localhost:4000/auth/register', {
            first_name: firstname,
            last_name: lastname,
            adress: adress,
            email: email,
            password: password,
            active: true
        }, { withCredentials: true })
            .then(response => {
                dispatch({ type: UserActionTypes.USER_REGISTER, payload: response.data })
            })
    }
};

export function userLogin(email, password) {
    return dispatch => {
        return axios.post('http://localhost:4000/auth/login', {
            email: email,
            password: password
        }, { withCredentials: true })
            .then(response => {
                dispatch({ type: UserActionTypes.USER_LOGIN, payload: response.data })
            })
    }
};

export function userLogOut() {
    return dispatch => {
        return axios.get('http://localhost:4000/auth/logout', { withCredentials: true })
            .then(response => {
                dispatch({ type: UserActionTypes.USER_LOGOUT, payload: response })
            })
    }
};

export const setUser = user => {
    return {
        type: UserActionTypes.SET_USER,
        payload: user
    }
}
/* Hay que probar la ruta con la actualizacion
export function userModifiedPassword(id, password){
    return dispatch => {
        return axios.put(`http://localhost:4000/auth/${id}/passwordReset`, {withCredentials: true})
        .then(response => {
            dispatch({
                type: UserActionTypes.SET_USER,
                payload: user
            })
        })
    }
}*/ 




