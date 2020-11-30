import { PRODUCT, SETTING_APP, API } from 'src/constants'

/**
 * Call API lấy danh sách Products
 * @param {*} param0 {username, password}
 */
export const fetchProduct = ({ offset, limit, skip, order, where, fields }) => {
  return {
    type: PRODUCT.REQUEST,
    offset, limit, skip, order, where, fields
  }
}

/**
 * CALL API update product
 * @param {*} param0 
 */
export const fetchProductUpdate = ({ data, _id }) => {
  return {
    type: SETTING_APP.PUT_REQUEST,
    typeResponseSuccess: PRODUCT.CREATE_RESULT,
    typeResponseFall: PRODUCT.CREATE_RESULT,
    apiPath: API.product + "/" + _id,
    dataSending: data
  }
}
/**--------------------------------------------------------------------------------*/
/**
 * Call API tạo mới Product
 * @param {*} param0 {data}
 */
export const fetchProductCreate = ({ data }) => {
  return {
    type: SETTING_APP.POST_REQUEST,
    typeResponseSuccess: PRODUCT.CREATE_RESULT,
    typeResponseFall: PRODUCT.CREATE_RESULT,
    apiPath: API.product,
    dataSending: data
  }
}
/**
 * Xử lý sau khi tạo mới Product sẽ reset lại state trong reducer
 * @param {*} param0
 */
export const setProductCreateStateDefault = () => {
  return {
    type: PRODUCT.CREATE_RESULT,
    status: undefined
  }
}
/**--------------------------------------------------------------------------------*/



/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const setDefaulCreateProduct = ({ data, status }) => {
  return {
    type: PRODUCT.CREATE_RESULT,
    data,
    status
  }
}

/**--------------------------------------------------------------------------------*/
/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const setDefaulDeleteProduct = ({ data, status }) => {
  return {
    type: PRODUCT.DELETE_RESULT,
    data,
    status
  }
}
/**--------------------------------------------------------------------------------*/
export const getProduct = ({ id }) => {
  return {
    type: SETTING_APP.GET_REQUEST,
    typeResponseSuccess: PRODUCT.GET_DETAIL_RESULT,
    typeResponseFall: PRODUCT.GET_DETAIL_RESULT,
    apiPath: API.product + '/' + id,
  }
}
export const setDefaulGetProduct = ({ data, status }) => {
  return {
    type: PRODUCT.GET_DETAIL_RESULT,
    data,
    status
  }
}
/**--------------------------------------------------------------------------------*/
/**
 * Xóa dữ liệu Product theo ID 
 * @param {*} id: string id của product
 */
export const deleteProduct = ({ id }) => {
  return {
    type: SETTING_APP.DELETE_REQUEST,
    typeResponseSuccess: PRODUCT.DELETE_RESULT,
    typeResponseFall: PRODUCT.DELETE_RESULT,
    apiPath: API.product,
    dataSending: { id }
  }
}
/**
 * Xóa dữ liệu Product theo danh sách ID
 * @param {*} list: danh sách id của products
 */
export const deleteListIdProduct = ({ list }) => {
  return {
    type: SETTING_APP.POST_REQUEST,
    typeResponseSuccess: PRODUCT.DELETE_LIST_ID_RESULT,
    typeResponseFall: PRODUCT.DELETE_LIST_ID_RESULT,
    apiPath: API.productDeleteListId,
    dataSending: { list }
  }
}
/**
 * Xử lý sau khi xóa Product theo ID (hoặc danh sách ID) sẽ reset lại state trong reducer
 * @param {*} param0
 */
export const setProductDeleteStateDefault = () => {
  return {
    type: PRODUCT.DELETE_RESULT,
    status: undefined
  }
}
/**--------------------------------------------------------------------------------*/
