export const LocalStorage = {
    TOKEN: 'TOKEN',
    STATE_LOADER: 'STATELOADER'
}

export const SETTING = {
    TOKEN_EXPIRATION: '3600', // time token expiration
    TIME_AWATING_SERVER_RESPONSE: '3000', // 's' time token expiration

    LIST_ITEM_PER_PAGE: 10, // item show in per page

    PROFILE_AVATAR: '/static/images/avatars/avatar_6.png', // avatar Profile default
    URL_IMAGE_PATH_SERVER: process.env.REACT_APP_URL_IMAGE_PATH_SERVER, // Profile image path

    FILE_UPLOAD_IMAGE: ["image/gif", "image/jpeg", "image/jpg", "image/png", "image/svg"],

    APP_PRODUCT_TYPE: [
        {
            key: 'trong-nuoc',
            title: 'Trong nước',
        },
        {
            key: 'ngoai-nuoc',
            title: 'Ngoài nước',
        },
        {
            key: 'nhung-tour-mien-bac',
            title: 'Những tour Miền Bắc',
        },
        {
            key: 'nhung-tour-mien-trung',
            title: 'Những tour miền Trung',
        },
        {
            key: 'nhung-tour-mien-nam',
            title: 'Những tour miền Nam',
        },
        {
            key: 'destination',
            title: 'Destination',
        },
        {
            key: 'daily-local-tour',
            title: 'Daily Local Tour',
        },
    ],

    APP_NEWS_TYPE: [
        {
            key: 't',
            title: 'Trong nước'
        },
        {
            key: 'n',
            title: 'Ngoài nước'
        },
    ],
    
    APP_MENU_DEFAULT: [
        {
            key: "home",
            title: "Trang chủ",
            url: "/"
        },
        {
            key: "news",
            title: "Tin tức",
            url: "/news"
        },
        {
            key: "products",
            title: "Sản phẩm",
            url: "/products"
        },
        {
            key: "info",
            title: "Thông tin liên hệ",
            url: "/info"
        }
    ]
}