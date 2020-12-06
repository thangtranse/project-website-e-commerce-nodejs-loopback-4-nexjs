import { all } from 'redux-saga/effects';
import * as SagaProduct from "./sagaProduct";
import * as sagaSettingApp from "./sagaAppSetting";
import * as SagaUser from "./sagaUser";
import * as SagaNews from "./sagaNews";
import * as SagaPage from "./sagaPage";
import * as SagaCategory from "./sagaCategory";
import * as sagaWebiste from "./sagaWebiste";

export default function* rootSaga() {
    yield all([
        SagaUser.watchIsAuthen(),
        SagaUser.watchFetchLogin(),
        SagaUser.watchFetchUserInfor(),
        SagaUser.watchResponseCreateComplete(),
        SagaUser.watchResponseDeleteComplete(),
        SagaUser.watchResponseDeleteListComplete(),
        SagaProduct.watchFetchProduct(),
        SagaProduct.watchResponseCreateComplete(),
        SagaProduct.watchResponseDeleteComplete(),
        SagaProduct.watchResponseDeleteListIdComplete(),
        sagaSettingApp.watchFetchMethodPost(),
        sagaSettingApp.watchFetchMethodDelete(),
        sagaSettingApp.watchFetchMethodGet(),
        sagaSettingApp.watchFetchMethodPut(),
        sagaSettingApp.watchUploadFile(),
        SagaNews.watchNewsProduct(),
        SagaNews.watchResponseCreateComplete(),
        SagaNews.watchResponseDeleteComplete(),
        SagaCategory.watchFetchCategory(),
        SagaCategory.watchResponseCreateComplete(),
        SagaCategory.watchResponseDeleteComplete(),
        SagaPage.watchFetchPages(),
        sagaWebiste.watchItemDetail(),
        sagaWebiste.watchGetList(),
        sagaWebiste.watchDashBoardResult(), // xử lý dữ liệu dashboard từ api trả về
        sagaWebiste.watchDashBoardProcess(), // xử lý process dashboard khi gọi api
        sagaWebiste.watchSettingWebsite(), // xử lý dữ liệu api trả về: setting default website
    ])
}
