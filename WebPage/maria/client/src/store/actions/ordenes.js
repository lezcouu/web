export const OrdenesActionTypes = {
    SET_ORDEN: 'SET_ORDEN',
    DETALLE_ORDEN: 'DETALLE_ORDEN',
    ORDEN_ESPECIFICA: 'ORDEN_ESPECIFICA',
    QUITAR_ORDEN: 'QUITAR_ORDEN'
}

export const ordenDetalle = (detalles) => {
  return {
    type: OrdenesActionTypes.DETALLE_ORDEN,
    payload: detalles
  }
}

export const addOrden = orden => {
    return {
      type: OrdenesActionTypes.SET_ORDEN,
      payload: orden
    }
  }


  export const unaOrden = orden => {
    return {
      type: OrdenesActionTypes.ORDEN_ESPECIFICA,
      payload: orden
    }
  }

  export const quitarOrden = id => {
    return {
      type: OrdenesActionTypes.QUITAR_ORDEN,
      payload: id
    }
  }