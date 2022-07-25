import { showFlashMsg } from '../../../redux/rootAction';
import { deleteFromStorage, saveToStorage } from '../../../services/localStorage.service';
import { userService } from '../../../services/user.service';
import {
  LOADING,
  LOAD_USER,
  STOP_LOADING,
  LOGIN_FAILED,
  LOGIN_SUCCESSFULL,
  LOG_OUT,
  CONTROL_FLEET_OWNED,
  USER_CHECKED
} from './login.type';

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

export const loginSuccesfull = (data) => {
  return {
    type: LOGIN_SUCCESSFULL,
    payload: data,
  }
}

export const loginFailed = () => {
  return {
    type: LOGIN_FAILED,
  }
}

export const loadUser = (data) => {
  return {
    type: LOAD_USER,
    payload: data,
  }
}

export const logOut = () => {
  return {
    type: LOG_OUT,
  }
}

// export const logOut = () => {
//   return dispatch => {
//     tripService.goOffline()
//   }
// }

export const fleetOwned = (data) => {
  return {
    type: CONTROL_FLEET_OWNED,
    payload: data,
  }
}

export const changePassword = (data) => {
  return dispatch => {
    dispatch(loading());
    userService.changePassword(data)
      .then((response) => {
          console.log(response);
          dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(showFlashMsg('Password Changed successfully, and can be use for your next you login'))
        } else {
          console.log(response);
          let message = response.data.message ? response.data.message : 'Something went wrong, Please, check your input and make sure your current password is correct'
          dispatch(showFlashMsg(message))
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Something went wrong, Please try again later'))
        // console.log(error.data.error.message);
      })
  } 
}

export const logIn = (data) => {
  return dispatch => {
    dispatch(loading());
    userService.login(data)
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          dispatch(showFlashMsg('Login  successfull'))
          let user = data.fleetOwner ? response.data.fleetData.data.fleet : response.data.riderData.data.rider;
          let tokens = data.fleetOwner ? response.data.fleetData.data.tokens : response.data.riderData.data.tokens;
          user = { ...user, tokens, fleetOwned: data.fleetOwned, fleetOwner: data.fleetOwner }
          console.log(user)
          saveToStorage('user', JSON.stringify(user))
          dispatch(loginSuccesfull(user));
        } else {
          console.log(response);
          let message = response.data.message ? response.data.message : 'Something went wrong, Please, check your network and try again later'
          dispatch(loginFailed());
          dispatch(showFlashMsg(message))
        }
      })
      .catch((error) => {
          console.log(error);
          dispatch(showFlashMsg('Something went wrong, Please, check your network and try again later'))
          dispatch(loginFailed(error.message));
      })
  } 
}

export const forgetPassword = (data) => {
  return dispatch => {
    dispatch(loading());
    userService.forgetPassword(data)
      .then((response) => {
        if (response.status === 201) {
          dispatch(showFlashMsg('The reset password link has been sent to your email.'))
          dispatch(stopLoading());
        } else {
          console.log(response.data);
          dispatch(showFlashMsg(response.data.message + ' Please check your input'))
          dispatch(stopLoading());          
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Something went wrong, Please try again later'))
          dispatch(signUpFailed(error.message));
        // console.log(error.data.error.message);
      })
  } 
}

export const userCheck = (data) => {
  return dispatch => {
    userService.userCheck(data)
      .then((response) => {
        console.log(response.status)
        if (response.status === 201) {
          dispatch(userChecked())
        } else {
          let message = response.status === 401 ? 'You are an unathorized user, please login again' : 'You have been blocked, contact support for for help';
            dispatch(showFlashMsg(message))        
            deleteFromStorage('user')
              .then((res) => {
                dispatch(logOut())           
              })
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Something went wrong, Please try again later'))
        // console.log(error.data.error.message);
      })
  } 
}

export const userChecked = () => {
  return {
    type: USER_CHECKED,
  }
}

export const updateProfile = (data) => {
  return dispatch => {
    // dispatch(loading());
    userService.updateProfile(data)
      .then((response) => {
        if (response.status === 201) {
          console.log(response.status + ' all good');
          dispatch(showFlashMsg('Profile Updated Successfully'))
          let user = data.fleetOwner ? response.data.fleetData.data.fleet : response.data.riderData.data.rider;
          let tokens = data.fleetOwner ? response.data.fleetData.data.tokens : response.data.riderData.data.tokens;
          user = { ...user, tokens, fleetOwned: data.fleetOwned, fleetOwner: data.fleetOwner }
          saveToStorage('user', JSON.stringify(user))
          console.log(response.status +' saved...........');
          dispatch(loadUser(user))
        } else {
          console.log(response.status + 'failed');
          let message = response.data.message ? response.data.message : 'Something went wrong, Please try again later'
          dispatch(showFlashMsg(message))
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Something went wrong, Please try again later'))
        // console.log(error.data.error.message);
      })
  } 
}