import { ProductoActionTypes } from '../actions/producto';

const initialState = {
    productos: [],
    productosComentados: []
};

export const productoReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ProductoActionTypes.ADD_PRODUCT:
            return {
                ...state,
                productos: [...state.productos, action.payload]
            }
            case ProductoActionTypes.ADD_PRODUCT_COMENTADO:
            return {
                ...state,
                productosComentados: [...state.productosComentados, action.payload]
            }
        case ProductoActionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                productos: [...state.productos.filter(elem =>
                    elem.id != action.payload
                )]
            }
        case ProductoActionTypes.EDIT_PRODUCT:
            return {
                ...state,
                productos: [...state.productos.map(elem => {
                    if (elem.id == action.payload.id) {
                        return {
                            ...elem,
                            name: action.payload.name,
                            description: action.payload.description,
                            price: action.payload.price,
                            stock: action.payload.stock,
                            picture: action.payload.picture,
                            price: action.payload.price,
                            /*  categories: action.payload.categories, */ // Ignorar categorias porque explota.
                            estaEnCarrito: false
                        }
                    } else {
                        return elem;
                    }
                })],
            }

        case ProductoActionTypes.ADD_PRODUCT_CART_BUTTON:
            return {
                ...state,
                estaEnCarrito: true
            }
        case ProductoActionTypes.DELETE_PRODUCT_CART_BUTTON:
            return {
                ...state,
                estaEnCarrito: false
            }
        default:
            return state
    }
}



