import { USER } from '../../constants'

const initialState = {
    isAuth: false,
    userToken: "",
    profile: {},
    // ---
    data: [],
    count: [],
    filter: {
        limit: 0,
        offset: 0,
        skip: 0,
        order: [],
        where: {},
        fields: {}
    },
    statusCreate: undefined,
    statusDelete: undefined,
    statusEdit: undefined,
    detial: {}
    // ---
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER.RESULT:
            state.data = action.data
            state.count = action.count
            state.filter = action.filter
            state.statusCreate = initialState.statusCreate
            state.statusDelete = initialState.statusDelete
            state.statusEdit = initialState.statusEdit
            return state
        case USER.CREATE_RESULT:
            if (typeof action.status !== 'undefined') {
                state.statusCreate = action.status
            } else {
                state.statusCreate = initialState.statusCreate
            }
            return state
        case USER.DELETE_LIST_ID_RESULT:
        case USER.DELETE_RESULT:
            if (typeof action.status !== undefined) {
                state.statusDelete = action.status
            } else {
                state.statusDelete = initialState.statusDelete
            }
            return state
        case USER.GET_DETAIL_RESULT:
            if (action.status && action.data) {
                state.detial = action.data
            } else {
                state.detial = initialState.detial
            }
            return state
        case USER.LOGIN_RESULT:
            state.isAuth = true
            state.userToken = action.data.token
            state.userExpiration = action.data.token_expiration
            return state;
        case USER.PROFILE_RESULT:
            state.profile = action.data
            return state;
        case 'CLEAR_STORE':
            return initialState
        default:
            return state
    }
}