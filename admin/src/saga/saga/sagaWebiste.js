import { toast } from "react-toastify";
import { put, select, takeLatest } from 'redux-saga/effects';
import { CATEGORY, NEWS, PAGE, PRODUCT, SERVER_RESPONSE, SETTING_APP, WEBSITE } from 'src/constants';
import { getCategory, getNews, getPage, getProduct } from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import { initialSocialNetwork } from '../reducer/reducerWebsite';
import { fetchGet } from '../../libs/apiApp';

function* watchItemDetail() {
    yield takeLatest(SETTING_APP.GET_DETAIL_ITEM_REQUEST, function* ({ idItem, typeReducer }) {
        switch (typeReducer) {
            case 'Category':
                const listCategory = yield select(SELECTOR.ctgSelector)
                const checkCategory = listCategory.filter(fil => fil.id === idItem)
                if (checkCategory && checkCategory.length > 0)
                    return yield put({
                        type: CATEGORY.GET_DETAIL_RESULT,
                        data: checkCategory[0],
                        status: true
                    })
                else
                    return put(getCategory({ id: idItem }))
            case 'News':
                const listNews = yield select(SELECTOR.newsSelector)
                const checkNews = listNews.filter(fil => fil.NewsId === idItem)
                if (checkNews && checkNews.length > 0)
                    return yield put({
                        type: NEWS.GET_DETAIL_RESULT,
                        data: checkNews[0],
                        status: true
                    })
                else
                    return put(getNews({ id: idItem }))
            case 'Page':
                const listPage = yield select(SELECTOR.pageSelector)
                const checkPage = listPage.filter(fil => fil.key === idItem)
                if (checkPage && checkPage.length > 0) {
                    return yield put({
                        type: PAGE.GET_DETAIL_RESULT,
                        data: checkPage[0],
                        status: true
                    })
                } else {
                    return put(getPage({ id: idItem }))
                }
            case 'Product':
                const listProduct = yield select(SELECTOR.productSelector)
                const checkProduct = listProduct.filter(fil => fil.productId === idItem)
                if (checkProduct && checkProduct.length > 0)
                    return yield put({
                        type: PRODUCT.GET_DETAIL_RESULT,
                        data: checkProduct[0],
                        status: true
                    })
                else
                    return put(getProduct({ id: idItem }))
            default:
                break;
        }
    })
}

/**
 * API Lấy danh sách theo thông số truyền vô (bị trùng với method GET)
 */
function* watchGetList() {
    yield takeLatest(SETTING_APP.GET_LIST_ITEMS_REQUEST, function* (
        {
            apiPath, // API URL
            actionTypeResult, // action type khi gọi API thành công
            actionTypeError, // action type khi gọi API thành công
            filter
        }
    ) {
        try {
            const tokenUser = yield select(SELECTOR.getUserToken)
            const { offset, limit, skip, order, where, fields } = filter
            const filterGet = {};
            if (offset) filterGet.offset = offset;
            if (limit) filterGet.limit = limit;
            if (skip) filterGet.skip = skip;
            if (order) filterGet.order = order;
            if (where) filterGet.where = where;
            if (fields) filterGet.fields = fields;
            let data = yield fetchGet({ url: apiPath, dataRequest: { filter: filterGet }, optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data).catch(error => error)
            let dataCount = yield fetchGet({ url: apiPath + '/count', optionHeader: { Authorization: 'Bearer ' + tokenUser } }).then(data => data).catch(error => error)
            if (data && dataCount) {
                if (data.error) throw data
                if (dataCount.error) throw dataCount
                if (typeof dataCount.count === undefined) throw "Error count"
                return yield put({
                    type: actionTypeResult,
                    data,
                    count: dataCount.count,
                    filter: filterGet
                })
            } else {
                throw "Error"
            }
        } catch (error) {
            console.log("thangtran.error.watchGetList", error)
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
 * Xử lý dữ liệu trả về của API lấy thông số setting default website
 */
function* watchSettingWebsite() {
    yield takeLatest(WEBSITE.RESULT, function* ({ data }) {
        if (data) {
            const addressCompany = data.addressCompany ? JSON.stringify(data.addressCompany) : '[]'
            const deputy = data.deputy ? JSON.stringify(data.deputy) : '[]'
            const socialNetwork = data.socialNetwork ? data.socialNetwork : initialSocialNetwork
            const settingLoadDate = true

            return yield put({
                type: WEBSITE.RESULT_REDUCER,
                data: {
                    addressCompany,
                    deputy,
                    socialNetwork,
                    settingLoadDate,
                }
            })
        }
    })
}

/**
 * Xử lý dữ liệu trả về của API lấy thông số **setting default website**
 */
function* watchDashBoardResult() {
    yield takeLatest(WEBSITE.RESULT_DASHBOARD, function* ({ data }) {
        return yield put({
            type: WEBSITE.RESULT_REDUCER_DASHBOARD,
            data
        })
    })
}
/**
 * Xử lý dữ Process trong quá trình lấy thông số **setting default website**
 */
function* watchDashBoardProcess() {
    yield takeLatest(WEBSITE.PROCESS_DASHBOARD, function* ({ data }) {
        console.log(data)
    })
}


export {
    watchItemDetail,
    watchGetList,
    watchSettingWebsite,
    watchDashBoardResult,
    watchDashBoardProcess,
};

