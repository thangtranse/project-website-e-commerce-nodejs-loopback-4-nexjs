export const Posts = {
    fetchPosts: 'FETCH_POSTS',
    fetchPostsSuccess: 'FETCH_POSTS_SUCCESS',
    fetchPostsError: 'FETCH_POSTS_ERROR'
}

export const USER = {
    IS_AUTH: 'USER_AUTHENTICATION',

    LOGIN_REQUEST: 'LOGIN_REQUEST',
    UPDATE_PROFILE_RESULT: 'UPDATE_PROFILE_RESULT',
    LOGIN_RESULT: 'LOGIN_RESULT',

    PROFILE_REQUEST: 'PROFILE_REQUEST',
    PROFILE_RESULT: 'PROFILE_RESULT',

    RESULT: 'USER_RESULT',
    CREATE_RESULT: 'USER_CREATE_RESULT',
    DELETE_RESULT: 'USER_DELETE_RESULT',
    DELETE_LIST_ID_RESULT: 'USER_DELETE_LIST_ID_RESULT', // Xóa danh sách ID
    GET_DETAIL_RESULT: 'USER_GET_DETAIL_RESULT',  // chi tiết User
}

export const PRODUCT = {
    REQUEST: 'PRODUCT_REQUEST',
    RESULT: 'PRODUCT_RESULT',
    CREATE_RESULT: 'PRODUCT_CREATE_RESULT',
    DELETE_RESULT: 'PRODUCT_DELETE_RESULT',
    GET_DETAIL_RESULT: 'PRODUCT_GET_DETAIL_RESULT',  // chi tiết PRODUCT
    DELETE_LIST_ID_RESULT: 'PRODUCT_DELETE_LIST_ID_RESULT', // Xóa danh sách ID
}

export const PAGE = {
    REQUEST: 'PAGE_REQUEST',
    RESULT: 'PAGE_RESULT',
    CREATE_RESULT: 'PAGE_CREATE_RESULT',
    DELETE_RESULT: 'PAGE_DELETE_RESULT',
    GET_DETAIL_RESULT: 'PAGE_GET_DETAIL_RESULT', // chi tiết PAGE
}

export const CATEGORY = {
    REQUEST: 'CATEGORY_REQUEST',
    RESULT: 'CATEGORY_RESULT',
    CREATE_RESULT: 'CATEGORY_CREATE_RESULT',
    CREATE_DEFAULT: 'CATEGORY_CREATE_DEFAULT',
    DELETE_RESULT: 'CATEGORY_DELETE_RESULT',
    DELETE_DEFAULT: 'CATEGORY_DELETE_DEFAULT',
    GET_DETAIL_RESULT: 'CATEGORY_GET_DETAIL_RESULT', // chi tiết CATEGORY
}

export const NEWS = {
    REQUEST: 'NEWS_REQUEST',
    RESULT: 'NEWS_RESULT',
    CREATE_RESULT: 'NEWS_CREATE_RESULT',
    DELETE_RESULT: 'NEWS_DELETE_RESULT',
    GET_DETAIL_RESULT: 'NEWS_GET_DETAIL_RESULT', // chi tiết NEWS
}

export const WEBSITE = {
    RESULT: 'WEBSITE_RESULT',
    RESULT_REDUCER: 'RESULT_REDUCER', // xử lý RESULT trả về để xử lý sau đó trả về reducer qua RESULT_REDUCER
    CONTACT_RESULT: "CONTACT_RESULT",
    DEPUTY_REQUEST: "DEPUTY_REQUEST",
    DEPUTY_RESULT: "DEPUTY_RESULT",

    RESULT_DASHBOARD: 'WEBSITE_RESULT_DASHBOARD',
    RESULT_REDUCER_DASHBOARD: 'WEBSITE_RESULT_REDUCER_DASHBOARD',
    PROCESS_DASHBOARD: 'WEBSITE_PROCESS_DASHBOARD',
}



export const SETTING_APP = {
    POST_REQUEST: 'POST_REQUEST',
    PUT_REQUEST: 'PUT_REQUEST',
    DELETE_REQUEST: 'DELETE_REQUEST',
    GET_REQUEST: 'GET_REQUEST',

    UPLOAD_IMAGE_REQUEST: 'UPLOAD_IMAGE_REQUEST',
    UPLOAD_IMAGE_ERROR: 'UPLOAD_IMAGE_ERROR',
    UPLOAD_IMAGE_COMPLETE: 'UPLOAD_IMAGE_COMPLETE',
    UPLOAD_IMAGE_DELETE_FILE: 'DELETE_FILE_UPLOAD',

    INFOR_WEBSITE_RESULT: 'INFOR_WEBSITE_RESULT',
    SET_VALUE_DEFAULT: 'SET_VALUE_DEFAULT',

    GET_DETAIL_ITEM_REQUEST: 'GET_DETAIL_ITEM_REQUEST',
    GET_LIST_ITEMS_REQUEST: 'GET_LIST_ITEMS_REQUEST',
}

