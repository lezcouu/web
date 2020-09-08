import { CategoriasActionTypes } from '../actions/categorias';

const initialState = {
  categorias: [],
};

export const categoriasReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CategoriasActionTypes.ADD_CATEGORY:
    return {
        ...state,
        categorias: [...state.categorias, action.payload] 
      }
    case CategoriasActionTypes.REMOVE_CATEGORY:
    return {
        ...state,
        categorias: [...state.categorias.filter(elem=>
          elem.id != action.payload
        )] 
      }
      case CategoriasActionTypes.EDIT_CATEGORY:
        return {
          ...state,
          categorias: [...state.categorias.map(elem => {
            if (elem.id == action.payload.id) {
              return {
                ...elem,
                name: action.payload.name,
                description: action.payload.description
              }
            } else {
              return elem;
            }
          })],
        }
    default:
      return state
  }
}