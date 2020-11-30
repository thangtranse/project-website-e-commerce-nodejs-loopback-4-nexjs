import { toast } from "react-toastify";
import { put, select, takeLatest } from 'redux-saga/effects';
import { API, SERVER_RESPONSE, CATEGORY } from '../../constants';
import { fetchGet } from '../../libs/apiApp';
import * as SELECTOR from '../redux-selector';

/**
 * Fetch Profile Infor of User
 */
function* watchFetchCategory() {
    yield takeLatest(CATEGORY.REQUEST, function* ({ offset, limit, skip, order, where, fields }) {
        try {
            const tokenUser = yield select(SELECTOR.getUserToken)
            const filter = {};
            if (offset) filter.offset = offset;
            if (limit) filter.limit = limit;
            if (skip) filter.skip = skip;
            if (order) filter.order = order;
            if (where) filter.where = where;
            if (fields) filter.fields = fields;
            let data = yield fetchGet({ url: API.ctg, dataRequest: { filter }, optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data).catch(error => error)
            let dataCount = yield fetchGet({ url: API.ctg + '/count', optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data).catch(error => error)
            if (data && dataCount) {
                if (data.error) throw data
                if (dataCount.error) throw dataCount
                if (typeof dataCount.count === undefined) throw "Error count"
                return yield put({
                    type: CATEGORY.RESULT,
                    data,
                    count: dataCount.count,
                    filter
                })
            } else {
                throw "Error"
            }
        } catch (error) {
            console.log("thangtran.error.watchFetchCategory", error)
            if (error && typeof error === 'object') {
                if (error.error) {
                    if (error.error.code && SERVER_RESPONSE[error.error.code])
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
 * SAGA: xử lý sự kiện response *tạo mới* category thành công
 * input: 
 * - status: trạng thái (luôn trả về true)
 * - data: dữ liệu khi truyền vào để tạo thành công
 */
function* watchResponseCreateComplete() {
    yield takeLatest(CATEGORY.CREATE_RESULT, function* ({ data, status }) {
        if (typeof status !== 'undefined' && status) { // Nếu status trả về thành công
            const str = data && data.title ? (` ${data.title}!`) : "!"
            toast.info("Tạo thành công Category" + str)
        }
    })
}

/**
 * SAGA: xử lý sự kiện response *xóa* category thành công
 * input: 
 * - status: trạng thái (luôn trả về true)
 * - data: dữ liệu khi truyền vào để tạo thành công
 */
function* watchResponseDeleteComplete() {
    yield takeLatest(CATEGORY.DELETE_RESULT, function* ({ data, status }) {
        const str = data ? (` ${data}!`) : "!"
        toast.info("Xóa thành công Category" + str)
    })
}

export {
    watchFetchCategory,
    watchResponseCreateComplete,
    watchResponseDeleteComplete
};

