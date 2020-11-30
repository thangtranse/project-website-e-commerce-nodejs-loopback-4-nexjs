import { toast } from "react-toastify";
import { put, select, takeLatest } from 'redux-saga/effects';
import { API, PAGE, SERVER_RESPONSE } from 'src/constants';
import { fetchGet } from 'src/libs/apiApp';
import * as SELECTOR from 'src/saga/redux-selector';

/**
 * Fetch Profile Infor of User
 */
function* watchFetchPages() {
    yield takeLatest(PAGE.REQUEST, function* ({ offset, limit, skip, order, where, fields }) {
        try {
            const tokenUser = yield select(SELECTOR.getUserToken)
            const filter = {};
            if (offset) filter.offset = offset;
            if (limit) filter.limit = limit;
            if (skip) filter.skip = skip;
            if (order) filter.order = order;
            if (where) filter.where = where;
            if (fields) filter.fields = fields;
            let data = yield fetchGet({ url: API.page, dataRequest: { filter }, optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data)
            let dataCount = yield fetchGet({ url: API.page + '/count', optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data)
            if (data && dataCount) {
                if (data.error) throw data
                if (dataCount.error) throw dataCount
                if (typeof dataCount.count === undefined) throw "Error count"
                return yield put({
                    type: PAGE.RESULT,
                    data,
                    count: dataCount.count ? dataCount.count : 0,
                    filter
                })
            } else {
                throw "Error"
            }
        } catch (error) {
            console.log("thangtran.error.watchFetchPages", error)
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

export {
    watchFetchPages
};

