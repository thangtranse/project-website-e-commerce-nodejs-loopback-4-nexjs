import { SETTING_APP } from 'src/constants';
const initialState = {
    fileUpload: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETTING_APP.UPLOAD_IMAGE_COMPLETE:
            let dataTemp = state.fileUpload ? state.fileUpload : [];
            dataTemp.push({ ...action.data })
            state.fileUpload = dataTemp
            return { ...state }
        case SETTING_APP.UPLOAD_IMAGE_ERROR:
            if (!action.status)
                state.fileUpload = []
            return { ...state }
        case SETTING_APP.UPLOAD_IMAGE_DELETE_FILE:
            let dataTempFilter = state.fileUpload ? state.fileUpload : []
            let dataResultFilter = dataTempFilter.filter(data => data.path !== action.data.path)
            state.fileUpload = dataResultFilter
            return { ...state }
        case 'CLEAR_STORE':
            return initialState
        default:
            return state

    }
}
