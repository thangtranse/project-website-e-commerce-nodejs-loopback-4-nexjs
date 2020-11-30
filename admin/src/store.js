import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/saga'
import rootReducer from './saga/reducer'
import StateLoader from "./utils/StateLoader"
import { composeWithDevTools } from 'redux-devtools-extension'

const stateLoader = new StateLoader();

const sagaMiddleware = createSagaMiddleware()

// redux sagas is a middleware that we apply to the store
export const store = createStore(
    rootReducer,
    stateLoader.loadState(),
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)

sagaMiddleware.run(rootSaga)

store.subscribe(() => {
    stateLoader.saveState(store.getState())
});

export default store;