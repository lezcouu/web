export const CategoriasActionTypes = {
    ADD_CATEGORY: 'ADD_CATEGORY',
    REMOVE_CATEGORY: 'REMOVE_CATEGORY',
    EDIT_CATEGORY: 'EDIT_CATEGORY'
  }
  
  export const addCategory = category => {
    return {
      type: CategoriasActionTypes.ADD_CATEGORY,
      payload: category
    }
  }

  export const removeCategory = categoryId => {
    return {
      type: CategoriasActionTypes.REMOVE_CATEGORY,
      payload: categoryId
    }
  }

  export const editCategory = category => {
    return {
      type: CategoriasActionTypes.EDIT_CATEGORY,
      payload: category
    }
  }