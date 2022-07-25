import axios from 'axios';
import { apiBaseUrl } from '../constants/staticData';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error.response && error.response.data) {
    return Promise.reject(error.response);
  }
return Promise.reject(error.message);
});


function goOnline(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.post(`${apiBaseUrl}/rider-online`, data.details, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}


function goOffline(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/rider-offline/${data.rideId}`, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

function otherRideHistory(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/rider-trip-history/${data.userId}`, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

function completedRideHistory(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/rider-completed-trips/${data.userId}`, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

export const tripService = {
  goOnline,
  goOffline,
  otherRideHistory,
  completedRideHistory,
}