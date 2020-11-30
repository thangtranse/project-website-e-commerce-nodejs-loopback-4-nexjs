import { NEWS, SETTING_APP, API } from 'src/constants'

/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const fetchNews = ({ offset, limit, skip, order, where, fields }) => {
  return {
    type: NEWS.REQUEST,
    offset, limit, skip, order, where, fields
  }
}

export const fetchNewsUpdate = ({ data, _id }) => {
  return {
    type: SETTING_APP.PUT_REQUEST,
    typeResponseSuccess: NEWS.CREATE_RESULT,
    typeResponseFall: NEWS.CREATE_RESULT,
    apiPath: API.news + "/" + _id,
    dataSending: data
  }
}

/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const fetchNewsCreate = ({ data }) => {
  return {
    type: SETTING_APP.POST_REQUEST,
    typeResponseSuccess: NEWS.CREATE_RESULT,
    typeResponseFall: NEWS.CREATE_RESULT,
    apiPath: API.news,
    dataSending: data
  }
}

/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const setDefaulCreateNews = ({ data, status }) => {
  return {
    type: NEWS.CREATE_RESULT,
    data,
    status
  }
}

/**--------------------------------------------------------------------------------*/
/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const deleteNews = ({ id }) => {
  return {
    type: SETTING_APP.DELETE_REQUEST,
    typeResponseSuccess: NEWS.DELETE_RESULT,
    typeResponseFall: NEWS.DELETE_RESULT,
    apiPath: API.news,
    dataSending: { id }
  }
}

/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const setDefaulDeleteNews = ({ data, status }) => {
  return {
    type: NEWS.DELETE_RESULT,
    data,
    status
  }
}

/**--------------------------------------------------------------------------------*/
export const getNews = ({ id }) => {
  return {
    type: SETTING_APP.GET_REQUEST,
    typeResponseSuccess: NEWS.GET_DETAIL_RESULT,
    typeResponseFall: NEWS.GET_DETAIL_RESULT,
    apiPath: API.news + '/' + id,
  }
}
export const setDefaulGetNews = ({ data, status }) => {
  return {
    type: NEWS.GET_DETAIL_RESULT,
    data,
    status
  }
}
/**--------------------------------------------------------------------------------*/
