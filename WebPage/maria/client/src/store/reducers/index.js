import { combineReducers } from "redux";
import { testReducer } from "./test"
import { carritoReducer } from "./carrito"
import { productoReducer } from "./producto"
import { userReducer } from './user.js'
import { categoriasReducer } from './categorias.js'
import { fetchingReducer } from './fetching.js'
import { ordenesReducer } from './ordenes.js'
import { reviewsReducer } from './reviews.js'

export const rootReducer = combineReducers({
  test: testReducer,
  carrito: carritoReducer,
  producto: productoReducer,
  user: userReducer,
  categorias: categoriasReducer,
  fetching: fetchingReducer,
  ordenes: ordenesReducer,
  reviews: reviewsReducer
});


