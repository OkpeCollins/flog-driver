import axios from 'axios';
import { apiBaseUrl } from '../constants/staticData';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  // if (error.status === 401) {
  //   store.dispatch(showFlashMsg('You are an unathorized user, please login again'))        
  //   deleteFromStorage('user')
  //     .then((res) => {
  //       dispatch(logOut())           
  //     })
  // } else if (error.status === 403) {
  //   store.dispatch(showFlashMsg('You have been blocked, contact support for for help'))        
  //   deleteFromStorage('user')
  //     .then((res) => {
  //       dispatch(logOut())           
  //     })
  // }
  console.log(error);
  if (error.response && error.response.data) {
    return Promise.reject(error.response);
  }
return Promise.reject(error.message);
});

function signUp(data) {
  const options = {
    headers: { 'content-type': 'application/json'},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }

  let subUrl = data.fleetOwner ? 'fleet' : 'rider';

  return axios.post(`${apiBaseUrl}/${subUrl}`, data.details, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      // console.log(error);
      // throw new Error(error)
      return error;
    })
}

function fleetSignUp(data) {
  const options = {
    headers: { 'content-type': 'application/json'},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }

  let subUrl = data.fleetOwned ? 'fleet' : 'rider';

  return axios.post(`${apiBaseUrl}/${subUrl}`, data, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      // console.log(error);
      // throw new Error(error)
      return error;
    })
}

function sendCode(data) {
  const options = {
    headers: { 'content-type': 'application/json'},
    timeout: 10000,
  }

  return axios.post(`${apiBaseUrl}/user-send-code`, data, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      // console.log(error);
      // throw new Error(error)
      return error;
    })
}

function verifyCode(data) {
  const options = {
    headers: { 'content-type': 'application/json'},
    timeout: 10000,
  }

  return axios.post(`${apiBaseUrl}/user-verify-code`, data, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      // console.log(error);
      // throw new Error(error)
      return error;
    })
}

function login(data) {
  const options = {
    headers: { 'content-type': 'application/json'},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }

  let subUrl = data.fleetOwner ? 'fleet-login' : 'rider-login';

  return axios.post(`${apiBaseUrl}/${subUrl}`, data, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    })
}

function forgetPassword(data) {
  const options = {
    headers: { 'content-type': 'application/json'},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }

  return axios.post(`${apiBaseUrl}/rider-forget-password`, data, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    })
}

function changePassword(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }

  let subUrl = data.fleetOwner ? 'fleet-change-password' : 'rider-change-password';

  return axios.patch(`${apiBaseUrl}/${subUrl}`, data.details, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
}

function userCheck(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }

  let subUrl = data.fleetOwner ? 'fleet-check' : 'rider-check';

  return axios.get(`${apiBaseUrl}/${subUrl}/${data.userId}`, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    })
}

function updateProfile(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }

  let subUrl = data.fleetOwner ? 'fleet-update' : 'rider-update' ;

  return axios.post(`${apiBaseUrl}/${subUrl}`, data.details, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
}

export const userService = {
  signUp,
  fleetSignUp,
  login,
  sendCode,
  verifyCode,
  forgetPassword,
  changePassword,
  userCheck,
  updateProfile,
}