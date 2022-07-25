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

function getPreviousWeekNet(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  let subUrl = data.fleetOwner ? 'fleet-owner-previous-week-net' : 'rider-previous-week-trips';

  return axios.get(`${apiBaseUrl}/${subUrl}/${data.id}`, options)
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

function getCurrentWeekNet(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  let subUrl = data.fleetOwner ? 'fleet-owner-current-week-net' : 'rider-current-week-trips';

  return axios.get(`${apiBaseUrl}/${subUrl}/${data.id}`, options)
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

function getThreeMonthNet(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  let subUrl = data.fleetOwner ? 'fleet-owner-three-months-net' : 'rider-three-months-trips';

  return axios.get(`${apiBaseUrl}/${subUrl}/${data.id}`, options)
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

function getPreviousWeekRevenue(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  let subUrl = data.fleetOwner ? 'fleet-owner-previous-week-revenue-trips' : 'rider-previous-week-revenue-trips';

  return axios.get(`${apiBaseUrl}/${subUrl}/${data.id}`, options)
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

function getCurrentWeekRevenue(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  let subUrl = data.fleetOwner ? 'fleet-owner-current-week-revenue-trips' : 'rider-current-week-revenue-trips';

  return axios.get(`${apiBaseUrl}/${subUrl}/${data.id}`, options)
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

function getThreeMonthRevenue(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  let subUrl = data.fleetOwner ? 'fleet-owner-three-months-revenue-trips' : 'rider-three-months-revenue-trips';

  return axios.get(`${apiBaseUrl}/${subUrl}/${data.id}`, options)
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

function getPreviousWeekBalance(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  let subUrl = data.fleetOwner ? 'fleet-owner-previous-week-balance-trips' : 'rider-previous-week-balance-trips';

  return axios.get(`${apiBaseUrl}/${subUrl}/${data.id}`, options)
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

function getCurrentWeekBalance(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  let subUrl = data.fleetOwner ? 'fleet-owner-current-week-balance-trips' : 'rider-current-week-balance-trips';
  
  return axios.get(`${apiBaseUrl}/${subUrl}/${data.id}`, options)
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

function getThreeMonthBalance(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  let subUrl = data.fleetOwner ? 'fleet-owner-three-months-balance-trips' : 'rider-three-months-balance-trips';

  return axios.get(`${apiBaseUrl}/${subUrl}/${data.id}`, options)
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

function getRatingAndTodayEarning(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/rider-today-earning-and-rating/${data.riderId}`, options)
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

export const earningService = {
  getPreviousWeekNet,
  getCurrentWeekNet,
  getThreeMonthNet,
  getPreviousWeekRevenue,
  getCurrentWeekRevenue,
  getThreeMonthRevenue,
  getPreviousWeekBalance,
  getCurrentWeekBalance,
  getThreeMonthBalance,
  getRatingAndTodayEarning,
}