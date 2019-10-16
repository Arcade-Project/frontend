const initialState = {areFriends: false, pending: false, profile_user: null, visited: []}
const profileReducer = (state= initialState, action) => {
  switch (action.type) {
    case 'FRIENDS':
      return {
        ...state,
        areFriends: action.payload
      };
    case 'PENDING':
      return {
        ...state,
        pending: action.payload
      };
    case 'PROFILE_USER':
      return {
        ...state,
        profile_user: action.payload
      };
      case 'ADD_VISITED_PROFILE':
        return {
          ...state,
          visited: [...state.visited, action.payload]
        }
    default:
      return state;
  }
};

export default profileReducer;
