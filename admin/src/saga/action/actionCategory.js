import { API, CATEGORY, SETTING_APP } from 'src/constants'
// --------------------------------------------------------------------------------
/**
 * Lấy danh sách Category
 * @param {*} param0 {offset, limit, skip, order, where, fields} mặc định theo filter của loopback 4
 */
export const fetchCategory = ({ offset, limit, skip, order, where, fields }) => {
  return {
    type: CATEGORY.REQUEST,
    offset, limit, skip, order, where, fields
  }
}

export const fetchCategoryUpdate = ({ data, _id }) => {
  return {
    type: SETTING_APP.PUT_REQUEST,
    typeResponseSuccess: CATEGORY.CREATE_RESULT,
    typeResponseFall: CATEGORY.CREATE_RESULT,
    apiPath: API.ctg + "/" + _id,
    dataSending: data
  }
}

// --------------------------------------------------------------------------------
/**
 * Tạo Category mới
 * @param {*} param0 {username, password}
 * NOTE: tạo 1 saga nhận input action.type.typeResponseSuccess or action.type.typeResponseFall để xử lý kết quả
 */
export const fetchCategoryCreate = ({ data }) => {
  return {
    type: SETTING_APP.POST_REQUEST,
    typeResponseSuccess: CATEGORY.CREATE_RESULT,
    typeResponseFall: CATEGORY.CREATE_RESULT,
    apiPath: API.ctg,
    dataSending: data
  }
}

export const setDefaulCreateCategory = () => ({
  type: CATEGORY.CREATE_DEFAULT
})

// --------------------------------------------------------------------------------
/**
 * Xóa Category với id đã truyền
 * @param {*} param0 {username, password}
 * NOTE: tạo 1 saga nhận input action.type.typeResponseSuccess or action.type.typeResponseFall để xử lý kết quả
 */
export const deleteCategory = ({ id }) => {
  return {
    type: SETTING_APP.DELETE_REQUEST,
    typeResponseSuccess: CATEGORY.DELETE_RESULT,
    typeResponseFall: CATEGORY.DELETE_RESULT,
    apiPath: API.ctg,
    dataSending: { id }
  }
}

export const setDefaulDeleteCategory = () => ({
  type: CATEGORY.DELETE_DEFAULT
})
// --------------------------------------------------------------------------------

/**
 * Lấy thông tin chi tiết của Category
 * @param {*} id caterogy
 */
export const getCategory = ({ id }) => {
  return {
    type: SETTING_APP.GET_REQUEST,
    typeResponseSuccess: CATEGORY.GET_DETAIL_RESULT,
    typeResponseFall: CATEGORY.GET_DETAIL_RESULT,
    apiPath: API.ctg + '/' + id,
  }
}

export const setDefaulGetCategory = ({ data, status }) => {
  return {
    type: CATEGORY.GET_DETAIL_RESULT,
    data,
    status
  }
}
/**--------------------------------------------------------------------------------*/
