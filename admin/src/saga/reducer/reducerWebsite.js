import { WEBSITE, SETTING_APP } from 'src/constants';

export const initialSocialNetwork = { // -> chú ý mặc định bên saga
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: ""
}

const initialState = {
    addressCompany: [], // -> chú ý mặc định bên saga
    deputy: [], // -> chú ý mặc định bên saga
    settingLoadDate: false,
    addressFacebook: "",
    addressInstagram: "",
    socialNetwork: { // -> chú ý mặc định bên saga
        ...initialSocialNetwork
    },
    deputy: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case WEBSITE.RESULT_REDUCER:
            if (action.data) {
                // const addressCompany = JSON.parse()
                state.addressCompany = action.data.addressCompany
                state.deputy = action.data.deputy
                state.socialNetwork = action.data.socialNetwork
                state.settingLoadDate = action.data.settingLoadDate
            }
            console.log("thangtran.reducer", state)
            return {
                ...state
            }
        case SETTING_APP.INFOR_WEBSITE_RESULT:
            if (action.data && action.data.length > 0) {
                state.addressCompany = action.data[0].addressCompany ? action.data[0].addressCompany : []
                state.deputy = action.data[0].deputy ? action.data[0].deputy : []
                if (action.data[0].socialNetwork) {
                    if (action.data[0].socialNetwork.facebookUrl) {
                        state.addressFacebook = action.data[0].socialNetwork.facebookUrl
                    }
                    if (action.data[0].socialNetwork.instagramUrl) {
                        state.addressInstagram = action.data[0].socialNetwork.instagramUrl
                    }
                }
            }
            return state
        case 'CLEAR_STORE':
            return initialState
        default:
            return state

    }
}
