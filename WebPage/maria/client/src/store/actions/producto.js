
export const ProductoActionTypes = {
    ADD_PRODUCT: 'ADD_PRODUCTO',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT',
    EDIT_PRODUCT: 'EDIT_PRODUCT',
    ADD_PRODUCT_CART_BUTTON: 'ADD_PRODUCT_CART_BUTTON',
    DELETE_PRODUCT_CART_BUTTON: 'DELETE_PRODUCT_CART_BUTTON',
    ADD_PRODUCT_COMENTADO: 'ADD_PRODUCT_COMENTADO'
}

export const addProduct = product => {
    return {
        type: ProductoActionTypes.ADD_PRODUCT,
        payload: product
    }
}
export const addProductComentado = product => {
    return {
        type: ProductoActionTypes.ADD_PRODUCT_COMENTADO,
        payload: product
    }
}
export const removeProduct = productId => {
    return {
        type: ProductoActionTypes.REMOVE_PRODUCT,
        payload: productId
    }
}

export const editProduct = product => {
    return {
        type: ProductoActionTypes.EDIT_PRODUCT,
        payload: product
    }
}

export const addProductCartButton = () => {
    return {
        type: ProductoActionTypes.ADD_PRODUCT_CART_BUTTON
    }
}

export const deleteProductCartButton = () => {
    return {
        type: ProductoActionTypes.DELETE_PRODUCT_CART_BUTTON
    }
}