import axiosAPI from "../../axiosAPI";

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';

export const POST_USER_SUCCESS = 'POST_USERS_SUCCESS';
export const POST_USER_ERROR = 'POST_USERS_ERROR';

export const PUT_USER_SUCCESS = 'PUT_USERS_SUCCESS';
export const PUT_USER_ERROR = 'PUT_USERS_ERROR';

export const DELETE_USER_SUCCESS = 'DELETE_USERS_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USERS_ERROR';

export const getUsersRequest = () => ({type: GET_USERS_REQUEST});
export const getUsersSuccess = (users) => ({type: GET_USERS_SUCCESS,users});
export const getUsersError = () => ({type: GET_USERS_ERROR});

export const postUserSuccess = () => ({type: POST_USER_SUCCESS});
export const postUserError = () => ({type: POST_USER_ERROR});

export const putUserSuccess = () => ({type: PUT_USER_SUCCESS});
export const putUserError = () => ({type: PUT_USER_ERROR});

export const deleteUserSuccess = () => ({type: DELETE_USER_SUCCESS});
export const deleteUserError = () => ({type: DELETE_USER_ERROR});

export const fetchUsers = () => {
  return async dispatch => {
      try{
          dispatch(getUsersRequest());
          const response = await axiosAPI.get('.json');
          dispatch(getUsersSuccess(response.data));
      }catch(error){
          dispatch(getUsersError(error))
      }
  }
};

export const fetchUserInfo = (id) => {
    return async dispatch => {
        try{
            dispatch(getUsersRequest(id));
            const response = await axiosAPI.get(`${id}.json`);
            dispatch(getUsersSuccess(response.data));
        }catch(error){
            dispatch(getUsersError(error))
        }
    }
};

export const sendUser = (user) => {
    return async dispatch => {
        try {
            dispatch(postUserSuccess(user));
            await axiosAPI.post('.json',user);
            dispatch(fetchUsers())
        }  catch (error) {
            dispatch(postUserError(error))
        }
    }
};

export const changeUser = (id,user) => {
    return async dispatch => {
        try {
            dispatch(putUserSuccess(id,user));
            await axiosAPI.put(`${id}.json`,user);
        }  catch (error) {
            dispatch(putUserError(error))
        }
    }
};

export const deleteUser = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteUserSuccess(id));
            await axiosAPI.delete(`${id}.json`);
            dispatch(fetchUsers())
        }  catch (error) {
            dispatch(deleteUserError(error))
        }
    }
};