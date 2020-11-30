import { API, PAGE, SETTING_APP } from '../../constants'

/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const fetchPage = ({ offset, limit, skip, order, where, fields }) => ({
  type: PAGE.REQUEST,
  offset, limit, skip, order, where, fields
})

export const fetchPageUpdate = ({ data, _id }) => ({
  type: SETTING_APP.PUT_REQUEST,
  typeResponseSuccess: PAGE.CREATE_RESULT,
  typeResponseFall: PAGE.CREATE_RESULT,
  apiPath: API.page + "/" + _id,
  dataSending: data
})

/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const fetchPageCreate = ({ data }) => ({
  type: SETTING_APP.POST_REQUEST,
  typeResponseSuccess: PAGE.CREATE_RESULT,
  typeResponseFall: PAGE.CREATE_RESULT,
  apiPath: API.page,
  dataSending: data
})

/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const setDefaulCreatePage = ({ data, status }) => {
  return {
    type: PAGE.CREATE_RESULT,
    data,
    status
  }
}

/**--------------------------------------------------------------------------------*/
/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const deletePage = ({ id }) => ({
  type: SETTING_APP.DELETE_REQUEST,
  typeResponseSuccess: PAGE.DELETE_RESULT,
  typeResponseFall: PAGE.DELETE_RESULT,
  apiPath: API.page,
  dataSending: { id }
})

/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const setDefaulDeletePage = ({ data, status }) => {
  return {
    type: PAGE.DELETE_RESULT,
    data,
    status
  }
}
/**--------------------------------------------------------------------------------*/
export const getPage = ({ id }) => {
  return {
    type: SETTING_APP.GET_REQUEST,
    typeResponseSuccess: PAGE.GET_DETAIL_RESULT,
    typeResponseFall: PAGE.GET_DETAIL_RESULT,
    apiPath: API.page + '/' + id,
  }
}
export const setDefaulGetPage = ({ data, status }) => {
  return {
    type: PAGE.GET_DETAIL_RESULT,
    data,
    status
  }
}
/**--------------------------------------------------------------------------------*/
