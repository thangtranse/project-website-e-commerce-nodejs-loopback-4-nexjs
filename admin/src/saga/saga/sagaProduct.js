import { toast } from "react-toastify";
import { put, select, takeLatest } from 'redux-saga/effects';
import { API, PRODUCT, SERVER_RESPONSE } from 'src/constants';
import { fetchGet } from 'src/libs/apiApp';
import * as SELECTOR from 'src/saga/redux-selector';

/**
 * Fetch Profile Infor of User
 */
function* watchFetchProduct() {
    yield takeLatest(PRODUCT.REQUEST, function* ({ offset, limit, skip, order, where, fields }) {
        try {
            const tokenUser = yield select(SELECTOR.getUserToken)
            const filter = {};
            if (offset) filter.offset = offset;
            if (limit) filter.limit = limit;
            if (skip) filter.skip = skip;
            if (order) filter.order = order;
            if (where) filter.where = where;
            if (fields) filter.fields = fields;
            let data = yield fetchGet({ url: API.product, dataRequest: { filter }, optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data)
            let dataCount = yield fetchGet({ url: API.productCount, optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data)
            if (data && dataCount) {
                if (data.error) throw data
                if (dataCount.error) throw dataCount
                if (typeof dataCount.count === undefined) throw "Error count"
                return yield put({
                    type: PRODUCT.RESULT,
                    data,
                    count: dataCount.count ? dataCount.count : 0,
                    filter
                })
            } else {
                throw "Error"
            }
        } catch (error) {
            console.log("thangtran.error.watchFetchProduct", error)
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
 * SAGA: xử lý sự kiện response *tạo mới* Product thành công
 * input: 
 * - status: trạng thái (luôn trả về true)
 * - data: dữ liệu khi truyền vào để tạo thành công
 */
function* watchResponseCreateComplete() {
    yield takeLatest(PRODUCT.CREATE_RESULT, function* ({ data, status }) {
        if (typeof status !== 'undefined' && status) { // Nếu status trả về thành công
            const str = data && data.title ? (` ${data.title}!`) : "!"
            toast.info("Tạo thành công product" + str)
        }
    })
}
/**
 * SAGA: xử lý sự kiện response *xóa* Product thành công
 * input: 
 * - status: trạng thái (luôn trả về true)
 * - data: dữ liệu khi truyền vào để tạo thành công
 */
function* watchResponseDeleteComplete() {
    yield takeLatest(PRODUCT.DELETE_RESULT, function* ({ data, status }) {
        if (typeof status !== 'undefined' && status) { // Nếu status trả về thành công
            const str = data ? (` ${data}!`) : "!"
            toast.info("Xóa thành công product với id:" + str)
        }
    })
}
/**
 * SAGA: xử lý sự kiện response *xóa theo danh sách id* Product thành công
 * input: 
 * - status: trạng thái (luôn trả về true)
 * - data: dữ liệu khi truyền vào để tạo thành công
 */
function* watchResponseDeleteListIdComplete() {
    yield takeLatest(PRODUCT.DELETE_LIST_ID_RESULT, function* ({ data, status }) {
        if (typeof status !== 'undefined' && status) { // Nếu status trả về thành công
            toast.info("Xóa thành công!")
        }
    })
}


export {
    watchFetchProduct,
    watchResponseCreateComplete,
    watchResponseDeleteComplete,
    watchResponseDeleteListIdComplete,
};

