export const CarritoActionTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  VACIAR_CARRITO: 'VACIAR_CARRITO',
  INCREMENTAR_CANTIDAD: 'INCREMENTAR_CANTIDAD',
  DECREMENTAR_CANTIDAD: 'DECREMENTAR_CANTIDAD',
  DELETE_PRODUCT: 'DELETE_PRODUCT'
}

export const addProductCart = product => {
  return {
    type: CarritoActionTypes.ADD_PRODUCT,
    payload: product
  }
}

export const vaciarCarrito = () => {
  return {
    type: CarritoActionTypes.VACIAR_CARRITO
  }
}

export const incrementarCantidad = product => {
  return {
    type: CarritoActionTypes.INCREMENTAR_CANTIDAD,
    payload: product
  }
}

export const decrementarCantidad = product => {
  return {
    type: CarritoActionTypes.DECREMENTAR_CANTIDAD,
    payload: product
  }
}

export const eliminarProducto = product => {
  return {
    type: CarritoActionTypes.DELETE_PRODUCT,
    payload: product
  }
}