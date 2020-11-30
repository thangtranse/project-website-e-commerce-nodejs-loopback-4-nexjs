import { API, SETTING_APP } from "src/constants";

/**
 * Upload File
 */
export function actionUploadFile(file) {
    return {
        type: SETTING_APP.UPLOAD_IMAGE_REQUEST,
        data: file
    }
}
/**
 * Upload File Clear Storage
 */
export function actionUploadFileClearStorage() {
    return {
        type: SETTING_APP.UPLOAD_IMAGE_ERROR,
        data: "",
        status: false
    }
}

/**
 * Upload File Delete file
 */
export function actionDeleteFileUpload(object) {
    return {
        type: SETTING_APP.UPLOAD_IMAGE_DELETE_FILE,
        data: object
    }
}


/**
 * GET INFOR WEBSITE
 */
export const settingWebsite = ({ data }) => {
    return {
        type: SETTING_APP.GET_REQUEST,
        typeResponseSuccess: SETTING_APP.INFOR_WEBSITE_RESULT,
        typeResponseFall: SETTING_APP.INFOR_WEBSITE_RESULT,
        apiPath: API.website_setting,
        dataSending: data
    }
}