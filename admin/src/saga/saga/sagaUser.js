import { toast } from "react-toastify";
import { put, select, takeLatest } from 'redux-saga/effects';
import { API, SERVER_RESPONSE, SETTING, USER } from 'src/constants';
import { fetchGet, fetchPost } from 'src/libs/apiApp';
import { setAuthIs } from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';

function* watchIsAuthen() {
    yield takeLatest(USER.IS_AUTH, function* () {
        yield put({
            type: "CLEAR_STORE"
        })
        localStorage.clear();
    })
}

/**
 * Fetch Profile Infor of User
 */
function* watchFetchUserInfor() {
    yield takeLatest(USER.PROFILE_REQUEST, function* () {
        try {
            const tokenUser = yield select(SELECTOR.getUserToken)
            let data = yield fetchGet({ url: API.me, optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data)
            if (data) {
                if (data.error) throw data
                return yield put({
                    type: USER.PROFILE_RESULT,
                    data
                })
            } else {
                throw "Error"
            }
        } catch (error) {
            console.log("thangtran.error.watchFetchUserInfor", error)
            if (error && typeof error === 'object') {
                if (error.error) {
                    if (error.error.message && error.error.message.indexOf('Entity not found: User with id') === 0) {
                        return yield put(setAuthIs())
                    }
                    if (error.error.code && SERVER_RESPONSE[error.error.code])
                        return toast.error(SERVER_RESPONSE[error.error.code])
                    if (error.error.name && SERVER_RESPONSE[error.error.name]) {
                        yield put(setAuthIs())
                        return toast.error(SERVER_RESPONSE[error.error.name])
                    }
                    if (error.error.message)
                        return toast.error(error.error.message)
                }
            }
            if (error && typeof error === 'string') {
                return toast.error(error)
            }

        }
    })
}

/**
 * Fetch Login process when data response from server
 */
function* watchFetchLogin() {
    yield takeLatest(USER.LOGIN_REQUEST, function* ({ username, password }) {
        try {
            let data = yield fetchPost({
                url: API.login,
                dataRequest: {
                    email: username,
                    password
                }
            }).then(data => data)
            if (data && data.error) {
                throw data
            } else {
                if (data && data.token)
                    yield put({
                        type: USER.LOGIN_RESULT,
                        data: {
                            token: data.token,
                            token_expiration: SETTING.TOKEN_EXPIRATION
                        }
                    })
            }
        } catch (error) {
            if (error && typeof error === 'object') {
                if (error.error) {
                    if (error.error.code)
                        return toast.error(SERVER_RESPONSE[error.error.code])
                    if (error.error.message)
                        return toast.error(error.error.message)
                }
            }
            if (error && typeof error === 'string') {
                return toast.error(error)
            }
        }
    })
}

/**
 * SAGA: xử lý sự kiện response *tạo mới* User thành công
 * input: 
 * - status: trạng thái (luôn trả về true)
 * - data: dữ liệu khi truyền vào để tạo thành công
 */
function* watchResponseCreateComplete() {
    yield takeLatest(USER.CREATE_RESULT, function* ({ data, status }) {
        if (typeof status !== 'undefined' && status) { // Nếu status trả về thành công
            const str = data && data.title ? (` ${data.title}!`) : "!"
            toast.info("Tạo thành công user" + str)
        }
    })
}

/**
 * SAGA: xử lý sự kiện response *xóa* User thành công
 * input: 
 * - status: trạng thái (luôn trả về true)
 * - data: dữ liệu khi truyền vào để tạo thành công
 */
function* watchResponseDeleteComplete() {
    yield takeLatest(USER.DELETE_RESULT, function* ({ data, status }) {
        if (typeof status !== 'undefined' && status) { // Nếu status trả về thành công
            const str = data ? (` ${data}!`) : "!"
            toast.info("Xóa thành công user với id:" + str)
        }
    })
}
/**
 * SAGA: xử lý sự kiện response *xóa* Danh sách User thành công
 * input: 
 * - status: trạng thái (luôn trả về true)
 * - data: dữ liệu khi truyền vào để tạo thành công
 */
function* watchResponseDeleteListComplete() {
    yield takeLatest(USER.DELETE_LIST_ID_RESULT, function* ({ data, status }) {
        if (typeof status !== 'undefined' && status) { // Nếu status trả về thành công
            toast.info("Xóa thành công!")
        }
    })
}


export {
    watchIsAuthen,
    watchFetchLogin,
    watchFetchUserInfor,
    watchResponseCreateComplete,
    watchResponseDeleteComplete,
    watchResponseDeleteListComplete,
};

