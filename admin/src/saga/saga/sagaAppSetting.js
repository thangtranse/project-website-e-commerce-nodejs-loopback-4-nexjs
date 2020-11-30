import { toast } from "react-toastify";
import { put, select, takeLatest } from 'redux-saga/effects';
import { SERVER_RESPONSE, SETTING_APP } from 'src/constants';
import { fetchPost, fetchDelete, fetchGet, fetchPut } from 'src/libs/apiApp';
import { UploadFile } from 'src/libs/apiApp';
import * as SELECTOR from 'src/saga/redux-selector';

/**
 * Fetch Method POST
 * Quản lý các Request Method POST
 * input:
 * - typeResponseSuccess: action.type trả về action khi thành công
 * - typeResponseFall: action.type trả về action khi thất bại
 * - apiPath: URL api
 * - dataSending: dữ liệu gửi đi
 * NOTE: 
 * 1. Khi gửi thành công sẽ tự động tạo một thông báo ( không áp dụng cho thất bại )
 */
function* watchFetchMethodPost() {
    yield takeLatest(SETTING_APP.POST_REQUEST, function* ({ typeResponseSuccess, typeResponseFall, apiPath, dataSending = {} }) {
        try {
            const tokenUser = yield select(SELECTOR.getUserToken)
            let data = yield fetchPost({ url: apiPath, dataRequest: dataSending, optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data)
            if (data) {                
                if (data.error) throw data
                console.log("thangtran.response", dataSending)
                console.log("thangtran.typeResponseSuccess", typeResponseSuccess)
                return yield put({
                    type: typeResponseSuccess,
                    data: dataSending,
                    status: true
                })
            } else {
                throw "Error"
            }
        } catch (error) {
            console.log("thangtran.error.watchFetchMethodPost", error)
            if (error && typeof error === 'object') {
                if (error.error) {
                    yield put({
                        type: typeResponseFall,
                        data: error.error,
                        status: false
                    })
                    if (error.error.code && SERVER_RESPONSE[error.error.code])
                        return toast.error(SERVER_RESPONSE[error.error.code])
                    if (error.error.message)
                        return toast.error(error.error.message)
                }
            }
            if (error && typeof error === 'string') {
                yield put({
                    type: typeResponseFall,
                    error: error
                })
                return toast.error(error)
            }

        }
    })
}

/**
 * Fetch Method PUT_REQUEST
 */
function* watchFetchMethodPut() {
    yield takeLatest(SETTING_APP.PUT_REQUEST, function* ({ typeResponseSuccess, typeResponseFall, apiPath, dataSending = {} }) {
        try {
            const tokenUser = yield select(SELECTOR.getUserToken)
            let data = yield fetchPut({ url: apiPath, dataRequest: dataSending, optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data)
            if (data) {
                if (data.error) throw data
                toast.success("Thao tác thành công!")
                return yield put({
                    type: typeResponseSuccess,
                    data,
                    status: true
                })
            } else {
                throw "Error"
            }
        } catch (error) {
            console.log("thangtran.error.watchFetchMethodPut", error)
            if (error && typeof error === 'object') {
                if (error.error) {
                    yield put({
                        type: typeResponseFall,
                        data: error.error,
                        status: false
                    })
                    if (error.error.code && SERVER_RESPONSE[error.error.code])
                        return toast.error(SERVER_RESPONSE[error.error.code])
                    if (error.error.message)
                        return toast.error(error.error.message)
                }
            }
            if (error && typeof error === 'string') {
                yield put({
                    type: typeResponseFall,
                    error: error
                })
                return toast.error(error)
            }
            return toast.error("Lỗi")
        }
    })
}

/**
 * Fetch Method Delete
 */
function* watchFetchMethodDelete() {
    yield takeLatest(SETTING_APP.DELETE_REQUEST, function* ({ typeResponseSuccess, typeResponseFall, apiPath, dataSending: { id } }) {
        try {
            const tokenUser = yield select(SELECTOR.getUserToken)
            let data = yield fetchDelete({ url: apiPath + '/' + id, optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data)
            if (data) {
                if (data.error) throw data
                return yield put({
                    type: typeResponseSuccess,
                    data: id,
                    status: true
                })
            } else {
                throw "Error"
            }
        } catch (error) {
            console.log("thangtran.error.watchFetchMethodGet", error)
            if (error && typeof error === 'object') {
                if (error.error) {
                    yield put({
                        type: typeResponseFall,
                        data: error.error,
                        status: false
                    })
                    if (error.error.code && SERVER_RESPONSE[error.error.code])
                        return toast.error(SERVER_RESPONSE[error.error.code])
                    if (error.error.message)
                        return toast.error(error.error.message)
                    return;
                }
            }
            if (error && typeof error === 'string') {
                yield put({
                    type: typeResponseFall,
                    error: error,
                    status: false
                })
                return toast.error(error)
            }
        }
    })
}

/**
 * Fetch Method GET
 */
function* watchFetchMethodGet() {
    yield takeLatest(SETTING_APP.GET_REQUEST, function* ({ typeResponseSuccess, typeResponseFall, apiPath, dataSending }) {
        try {
            const tokenUser = yield select(SELECTOR.getUserToken)
            let data = yield fetchGet({ url: apiPath, dataRequest: dataSending, optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data)
            if (data) {
                if (data.error) throw data
                return yield put({
                    type: typeResponseSuccess,
                    data,
                    status: true
                })
            } else {
                throw "Error"
            }
        } catch (error) {
            console.log("thangtran.error.watchFetchMethodGet", error)
            if (error && typeof error === 'object') {
                if (error.error) {
                    yield put({
                        type: typeResponseFall,
                        data: error.error,
                        status: false
                    })
                    if (error.error.code && SERVER_RESPONSE[error.error.code])
                        return toast.error(SERVER_RESPONSE[error.error.code])
                    if (error.error.message)
                        return toast.error(error.error.message)
                }
            }
            if (error && typeof error === 'string') {
                yield put({
                    type: typeResponseFall,
                    error: error
                })
                return toast.error(error)
            }

        }
    })
}

function* watchUploadFile() {
    yield takeLatest(SETTING_APP.UPLOAD_IMAGE_REQUEST, function* ({ data }) {
        try {
            if (data && data.length > 0) {
                const getUserID = yield select(SELECTOR.getUserID)
                for (let i = 0; i < data.length; i++) {
                    let result = yield UploadFile(data[i]).then(result => result).catch(error => error)
                    if (result && result.data) {
                        yield put({
                            type: SETTING_APP.UPLOAD_IMAGE_COMPLETE,
                            data: {
                                ...result.data,
                                title: result.data.originalname,
                                author: getUserID,
                                path: result.data.path
                            }
                        })
                    } else {
                        return toast.error("Hình ảnh không hợp lệ: Vui lòng chọn hình ảnh có dung lượng nhỏ hơn 2MB")
                    }
                }
            }
        } catch (error) {
            console.log("thangtran.watchUploadFile.error", error)
            toast.error("Hình ảnh không hợp lệ: Vui lòng chọn hình ảnh có dung lượng nhỏ hơn 2MB")
            yield put({
                type: SETTING_APP.UPLOAD_IMAGE_ERROR,
                data: "Error",
                status: true
            })
        }
    })
}

export {
    watchFetchMethodPost,
    watchFetchMethodDelete,
    watchFetchMethodGet,
    watchFetchMethodPut,
    watchUploadFile
};

