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

function addRider(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }

  console.log(data.details);

  return axios.post(`${apiBaseUrl}/fleet-create-rider`, data.details, options)
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

function getRiders(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/fleet-owner-riders/${data.userId}`, options)
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

function getHomeData(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/fleet-home-page/${data.userId}`, options)
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

function getRiderData(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/fleet-fetch-rider-by-id/${data.id}`, options)
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

function blockRider(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/fleet-block-rider-by-id/${data.id}`, options)
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

function deleteRider(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/fleet-delete-rider-by-id/${data.id}`, options)
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

function unBlockRider(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/fleet-approve-rider-by-id/${data.id}`, options)
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

export const fleetOwnerService = {
  addRider,
  getRiders,
  getHomeData,
  getRiderData,
  blockRider,
  deleteRider,
  unBlockRider,
}
