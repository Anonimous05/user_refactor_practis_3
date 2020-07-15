import {GET_USERS_SUCCESS} from "../Action/userActions";

const initialState = {
  users: {},
};

export const userReducers = (state = initialState , action) => {
  switch (action.type){
      case GET_USERS_SUCCESS:
          return{...state, users: action.users};
      default:
          return state;
  }
};

