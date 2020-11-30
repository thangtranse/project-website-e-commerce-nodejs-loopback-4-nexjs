import { PRODUCT } from 'src/constants'

const initialState = {
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
  detial: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT.RESULT:
      state.data = action.data
      state.count = action.count
      state.filter = action.filter
      return state
    case PRODUCT.CREATE_RESULT:
      if (typeof action.status !== 'undefined') {
        state.statusCreate = action.status
      } else {
        state.statusCreate = initialState.statusCreate
      }
      return state
    case PRODUCT.DELETE_LIST_ID_RESULT:
    case PRODUCT.DELETE_RESULT:
      if (typeof action.status !== 'undefined') {
        state.statusDelete = action.status
      } else {
        state.statusDelete = initialState.statusDelete
      }
      return state
    case PRODUCT.GET_DETAIL_RESULT:
      if (action.status && action.data) {
        state.detial = action.data
      } else {
        state.detial = initialState.detial
      }
      return state
    case 'CLEAR_STORE':
      return initialState
    default:
      return state
  }
}