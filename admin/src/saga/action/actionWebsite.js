import { API, WEBSITE, SETTING_APP } from "src/constants";

/**
 * UPDATE INFOR CONTACT WEBSITE
 * @param {*} param0 
 */
export const updateContactWebsite = ({ data }) => {
  return {
    type: SETTING_APP.PUT_REQUEST,
    typeResponseSuccess: WEBSITE.CONTACT_RESULT,
    typeResponseFall: WEBSITE.CONTACT_RESULT,
    apiPath: API.website + "/default",
    dataSending: data
  }
}

/**
 * Call api profile user
 * @param {*} param0 {username, password}
 */
export const fetchContactWebsite = ({ data }) => {
  return {
    type: SETTING_APP.POST_REQUEST,
    typeResponseSuccess: WEBSITE.CONTACT_RESULT,
    typeResponseFall: WEBSITE.CONTACT_RESULT,
    apiPath: API.website,
    dataSending: data
  }
}

/**
 * GET INFOR WEBSITE DEFAULT
 * @param {*} param0 
 */
export const getInforWebsite = () => {
  return {
    type: SETTING_APP.GET_REQUEST,
    typeResponseSuccess: WEBSITE.RESULT,
    typeResponseFall: WEBSITE.RESULT,
    apiPath: API.website + '/default',
  }
}

/**
 * GET DETAIL ITEM WEBSITE
 * @param {*} idItem 
 * @param {*} typeReducer: Category, News, Page, Product 
 */
export const getDetailItem = ({ idItem, typeReducer }) => ({
  type: SETTING_APP.GET_DETAIL_ITEM_REQUEST,
  idItem,
  typeReducer
})

/**
 * Lấy dữ liệu DASHBOARD
 */
export const getInforDashboard = () => {
  return {
    type: SETTING_APP.GET_REQUEST,
    typeResponseSuccess: WEBSITE.RESULT_DASHBOARD,
    typeResponseFall: WEBSITE.RESULT_DASHBOARD,
    typeProcessing: WEBSITE.PROCESS_DASHBOARD,
    apiPath: API.dashboard,
  }
}