const profileReducer = (state={}, action) => {
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
        user: action.payload
      };
    default:
      return state;
  }
};

export default profileReducer;
