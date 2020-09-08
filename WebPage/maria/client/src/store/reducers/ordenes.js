import { OrdenesActionTypes } from '../actions/ordenes';

const initialState = {
    creadas: [],
    proceso: [],
    canceladas: [],
    completas: [],
    ordenDetalle: null,
    especifica: ''
}

export const ordenesReducer = (state = initialState, action) => {
    switch (action.type) {
        case OrdenesActionTypes.SET_ORDEN:
            switch (action.payload.status){
                case 'creada':
                    return {
                        ...state,
                        creadas: [...state.creadas, action.payload]
                    }
                case 'procesando':
                    return {
                        ...state,
                        proceso: [...state.proceso, action.payload]
                    }
                case 'cancelada':
                    return {
                        ...state,
                        canceladas: [...state.canceladas, action.payload]
                    }  
                    case 'completa':
                        return {
                            ...state,
                            completas: [...state.completas, action.payload]
                        }  

                        default:
                            return state
                    }
                case OrdenesActionTypes.ORDEN_ESPECIFICA:
                        return {
                            ...state,
                            especifica: action.payload
                        }
                case OrdenesActionTypes.QUITAR_ORDEN:
                    return {
                        ...state,
                        creadas: [...state.creadas.filter(elem=>elem.id !== action.payload)]
                    }
                case OrdenesActionTypes.DETALLE_ORDEN:
            return {
                ...state,
                ordenDetalle: action.payload
            }
        default:
            return state
    }
}