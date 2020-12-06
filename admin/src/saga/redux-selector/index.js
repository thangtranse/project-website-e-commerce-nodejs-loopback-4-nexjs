import { get } from 'lodash';
// USER
export const userSelector = state => get(state, 'user.data');
export const userCountSelector = state => get(state, 'user.count');
export const userDeleteStatus = state => get(state, 'user.statusDelete');

export const isAuthSelector = state => get(state, 'user.isAuth');
export const getUserToken = state => get(state, 'user.userToken');
export const getUserProfile = state => get(state, 'user.profile');
export const getUserID = state => get(state, 'user.profile.id');
// PAGE
export const pageSelector = state => get(state, 'page.data');
export const pageCountSelector = state => get(state, 'page.count');
export const pageCreateStatus = state => get(state, 'page.statusCreate');
export const pageDetial = state => get(state, 'page.detial');
// PRODUCT
export const productSelector = state => get(state, 'product.data');
export const productCountSelector = state => get(state, 'product.count');
export const productCreateStatus = state => get(state, 'product.statusCreate');
export const productDeleteStatus = state => get(state, 'product.statusDelete');
export const productDetial = state => get(state, 'product.detial');
// Category
export const ctgSelector = state => get(state, 'category.data');
export const ctgCountSelector = state => get(state, 'category.count');
export const ctgCreateStatus = state => get(state, 'category.statusCreate');
export const ctgDeleteStatus = state => get(state, 'category.statusDelete');
export const ctgDetial = state => get(state, 'category.detial');
// NEWS
export const newsSelector = state => get(state, 'news.data');
export const newsCountSelector = state => get(state, 'news.count');
export const newsCreateStatus = state => get(state, 'news.statusCreate');
export const newsDeleteStatus = state => get(state, 'news.statusDelete');
export const newsDetial = state => get(state, 'news.detial');
// WEBSITE
export const websiteInfor = state => get(state, 'website');
export const websiteDashboardLatestProducts = state => get(state, 'website.dashboardLatestProducts');
// APP
export const ListFileUpload = state => Object.values(get(state, 'appSetting.fileUpload'));