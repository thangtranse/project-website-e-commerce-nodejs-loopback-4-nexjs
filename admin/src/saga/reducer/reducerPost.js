import { Posts } from '../../constants'

const initialState = {
  posts: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Posts.fetchPosts:
      return state
    case Posts.fetchPostsSuccess:
      return {
        ...state,
        posts: action.payload
      }
    case 'CLEAR_STORE':
      return initialState
    default:
      return state
  }
}