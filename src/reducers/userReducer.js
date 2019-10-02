import moment from "moment"

const userReducer = (state={user:{uuid: 0, nickname:'Newbie', email:'email@email.com', level: 2, experience: 123, color: 'red', phone: '+5491145215965', age: moment()}}, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default userReducer;