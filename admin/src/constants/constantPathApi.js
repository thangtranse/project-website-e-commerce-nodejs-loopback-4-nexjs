require('dotenv').config()

export const API = {
    login: process.env.REACT_APP_URL_API + '/users/login', // POST
    me: process.env.REACT_APP_URL_API + '/users/me', // GET
    user: process.env.REACT_APP_URL_API + '/users',
    userDeleteListId: process.env.REACT_APP_URL_API + '/users/deleteList',

    uploadFile: process.env.REACT_APP_URL_API + '/files', // Upload File

    page: process.env.REACT_APP_URL_API + '/page-homes',

    product: process.env.REACT_APP_URL_API + '/products',
    productDeleteListId: process.env.REACT_APP_URL_API + '/products/deleteList',
    productCount: process.env.REACT_APP_URL_API + '/products/count',

    ctg: process.env.REACT_APP_URL_API + '/ctg',

    news: process.env.REACT_APP_URL_API + '/news',

    crmAgentHubs: process.env.REACT_APP_URL_API + '/crm-agent-hubs',

    website: process.env.REACT_APP_URL_API + '/app-settings',

    website_setting: process.env.REACT_APP_URL_API + '/app-settings/default',
}