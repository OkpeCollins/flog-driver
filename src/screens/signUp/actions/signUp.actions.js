import { showFlashMsg } from '../../../redux/rootAction';
import { saveToStorage } from '../../../services/localStorage.service';
import { userService } from '../../../services/user.service';
import {
  LOADING,
  SIGN_UP,
  SIGN_UP_SUCCESSFUL,
  SIGN_UP_FAILED,
  SIGN_UP_DATA,
  SHOW_MODAL,
  HIDE_MODAL,
  SIGN_UP_DEFAULT,
  STOP_LOADING,
} from './signUp.type';

// export const signUp = () => {
//   return {
//     type: SIGN_UP,
//   }
// }

export const signUpData = (data) => {
  return {
    type: SIGN_UP_DATA,
    payload: data,
  }
}

export const loading = () => {
  return {
    type: LOADING,
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  }
}

export const showModal = (type) => {
  return {
    type: SHOW_MODAL,
    payload: type,
  }
}

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  }
}

export const signUpSuccess = (data) => {
  return {
    type: SIGN_UP_SUCCESSFUL,
    payload: data
  }
}

export const signUpDefault = (data) => {
  return {
    type: SIGN_UP_DEFAULT,
    payload: data
  }
}

export const signUpFailed = (data) => {
  return {
    type: SIGN_UP_FAILED,
    payload: data
  }
}

export const signUp = (signUpData) => {
  return dispatch => {
    dispatch(loading());
    userService.signUp(signUpData)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(showFlashMsg('SignUp successfully, Please Head over to login page to login.'))
          dispatch(signUpSuccess(response.data));
          // saveToStorage('userData', JSON.stringify(response.data))
        } else {
          console.log(response.data);
          let message = response.status === 409 ? response.data.message : 'Something went wrong please try again later'
          dispatch(showFlashMsg(message))
          dispatch(signUpFailed(response.data.error));          
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, check your network and try again'))
          dispatch(signUpFailed(error.message));
        // console.log(error.data.error.message);
      })
  } 
}