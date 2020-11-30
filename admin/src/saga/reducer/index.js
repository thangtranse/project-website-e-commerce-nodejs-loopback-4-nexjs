import { combineReducers } from 'redux';
import appSettingReducer from './reducerAppSetting';
import postsReducer from './reducerPost';
import productReducer from './reducerProduct';
import userReduer from './reducerUser';
import newsReduer from './reducerNews';
import websiteReduer from './reducerWebsite';
import ctgReduer from './reducerCategory';
import PageReduer from './reducerPage';


const appReducer = combineReducers({
  posts: postsReducer,
  user: userReduer,
  product: productReducer,
  news: newsReduer,
  appSetting: appSettingReducer,
  website: websiteReduer,
  category: ctgReduer,
  page: PageReduer,
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;