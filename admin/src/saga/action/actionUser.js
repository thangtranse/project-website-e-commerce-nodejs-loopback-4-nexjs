import { API, SETTING_APP, USER } from 'src/constants'

/**
 * Action Logout
 * @param {*} status: true -> login successful 
 * @param {*} status: false -> login fall 
 */
export const setAuthIs = () => ({
  type: USER.IS_AUTH
})

/**
 * Call api login
 * @param {*} param0 {username, password}
 */
export const fetchLogin = ({ username, password }) => {
  return {
    type: USER.LOGIN_REQUEST,
    username,
    password
  }
}

/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const fetchProfileUser = () => {
  return {
    type: USER.PROFILE_REQUEST
  }
}

export const fetchUpdateProfile = ({ data, _id }) => {
  return {
    type: SETTING_APP.PUT_REQUEST,
    typeResponseSuccess: USER.UPDATE_PROFILE_RESULT,
    typeResponseFall: USER.UPDATE_PROFILE_RESULT,
    apiPath: API.user + "/" + _id,
    dataSending: data
  }
}

/**
 * Lấy danh sách User trong hệ thống
 * @param {*} param0 
 */
export const fetchUser = ({ offset, limit, skip, order, where, fields }) => {
  return {
    type: SETTING_APP.GET_LIST_ITEMS_REQUEST,
    apiPath: API.user,
    actionTypeResult: USER.RESULT,
    actionTypeError: USER.RESULT,
    filter: { offset, limit, skip, order, where, fields }
  }
}

/**
 * Xóa dữ liệu User theo ID
 * @param {*} id: id của user
 */
export const deleteUser = ({ id }) => {
  return {
    type: SETTING_APP.DELETE_REQUEST,
    typeResponseSuccess: USER.DELETE_RESULT,
    typeResponseFall: USER.DELETE_RESULT,
    apiPath: API.user,
    dataSending: { id }
  }
}

/**
 * Xóa dữ liệu User theo danh sách ID
 * @param {*} list: danh sách id của user
 */
export const deleteListIdUser = ({ list }) => {
  return {
    type: SETTING_APP.POST_REQUEST,
    typeResponseSuccess: USER.DELETE_LIST_ID_RESULT,
    typeResponseFall: USER.DELETE_LIST_ID_RESULT,
    apiPath: API.userDeleteListId,
    dataSending: { list }
  }
}