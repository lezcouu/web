import { CarritoActionTypes } from '../actions/carrito';

const initialState = {
  productAdded: [],
  suma: 0,
  fetching: false,
  error: null,
};

export const carritoReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CarritoActionTypes.ADD_PRODUCT:
      var cond = false;
      var cant = 0;
      state.productAdded.map(elem=>{
        if(elem.id == action.payload.id){
          cond = true
          cant = elem.cantidad
        }
      })
      if(cond){
        if (action.payload.stock >= cant + 1) {
          return {
            ...state,
            productAdded: [...state.productAdded.map(elem => {
              if (elem.id == action.payload.id) {
                return {
                  ...elem,
                  cantidad: elem.cantidad + 1
                }
              } else {
                return elem;
              }
            })],
            suma: state.suma + action.payload.price
          }
        } else {
          return state;
        }
      }else{
        return {
          ...state,
        productAdded: [...state.productAdded, action.payload],
        suma: state.suma + action.payload.price * action.payload.cantidad
        }
      }
      
        
      case CarritoActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        productAdded: [...state.productAdded.filter(elem => elem.id != action.payload.id)],
        suma: state.suma - action.payload.price * action.payload.cantidad
      }
    case CarritoActionTypes.VACIAR_CARRITO:
      return {
        ...state,
        productAdded: [],
        suma: 0
      }
    case CarritoActionTypes.INCREMENTAR_CANTIDAD:
      if (action.payload.stock >= action.payload.cantidad + 1) {
        return {
          ...state,
          productAdded: [...state.productAdded.map(elem => {
            if (elem.id == action.payload.id) {
              return {
                ...elem,
                cantidad: elem.cantidad + 1
              }
            } else {
              return elem;
            }
          })],
          suma: state.suma + action.payload.price
        }
      } else {
        return state;
      }
    case CarritoActionTypes.DECREMENTAR_CANTIDAD:
      if (action.payload.cantidad > 0) {
        return {
          ...state,
          productAdded: [...state.productAdded.map(elem => {
            if (elem.id == action.payload.id) {
              return {
                ...elem,
                cantidad: elem.cantidad - 1
              }
            } else {
              return elem;
            }
          })],
          suma: state.suma - action.payload.price
        }
      }
    default:
      return state
  }
}