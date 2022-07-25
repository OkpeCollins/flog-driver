import { showFlashMsg } from "../../../redux/rootAction"
import { earningService } from "../../../services/earning.service"
import { saveToStorage } from "../../../services/localStorage.service"
import { locationService } from "../../../services/location.service"
import { tripService } from "../../../services/trip.service"
import polyline from '@mapbox/polyline';
import {
  AUTO_COMPLETE_DATA,
  GET_GEOMETRY,
  GO_OFFLINE_DATA,
  GO_ONLINE_DATA,
  RIDE_REQUEST,
  START_LOADING,
  STOP_LOADING,
  TRIP_ACCEPTED,
  RESET_STATE,
  TRIP_STARTED,
  TRIP_CANCELLED,
  TRIP_REJECTED,
  TODAY_RATING_AND_EARNING,
  WATCH_POSITION,
  POLYLINE,
  FLEET_HOME_DATA,
 } from "./home.type"
import { fleetOwnerService } from "../../../services/fleetOwner.service"

export const startLoading = () => {
  return {
    type: START_LOADING,
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  }
}

export const autoCompletData = (data) => {
  return {
    type: AUTO_COMPLETE_DATA,
    payload: data,
  }
}

export const getGeometryData = (data) => {
  return {
    type: GET_GEOMETRY,
    payload: data,
  }
}

export const goOnlineData = (data) => {
  return {
    type: GO_ONLINE_DATA,
    payload: data,
  }
}

export const goOfflineData = (data) => {
  return {
    type: GO_OFFLINE_DATA,
    payload: data,
  }
}

export const getAutoCompletData = (data) => {
  return dispatch => {
    locationService.placeAutoComplete(data)
      .then((response) => {
        // console.log(response)
        if (response.status === 201) {
          dispatch(autoCompletData(response.data.message.predictions));
        } else {
          dispatch(showFlashMsg(response.data.message))
        }
      })
      .catch((error) => {
      console.log(error)
    })
  }
}

export const getGeometry = (data) => {
  return dispatch => {
    locationService.getGeometry(data)
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          let data = {
            description: response.data.message.results[0].formatted_address,
            latitude: response.data.message.results[0].geometry.location.lat,
            longitude: response.data.message.results[0].geometry.location.lng,
          }
          dispatch(getGeometryData(data));
          dispatch(showFlashMsg('Your destination has beeen set to ' + data.description));
          saveToStorage('driverDestination', JSON.stringify(data));
        } else {
          dispatch(showFlashMsg(response.data.message))
        }
      })
      .catch((error) => {
      console.log(error)
    })
  }
}

export const watchRiderPosition = (data) => {
  return {
    type: WATCH_POSITION,
    payload: data
  }
}

export const goOnline = (data) => {
  return dispatch => {
    dispatch(startLoading());
    tripService.goOnline(data)
      .then((response) => {
        dispatch(stopLoading())
        // console.log(response);
        if (response.status === 201) {
          dispatch(goOnlineData(response.data));
          dispatch(showFlashMsg(response.data.message));
          saveToStorage('driverOnline', JSON.stringify(true))
        } else {
          dispatch(showFlashMsg(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(stopLoading())
        console.log(error)
      })
  }
}

export const goOffline = (data) => {
  return dispatch => {
    dispatch(startLoading());
    tripService.goOffline(data)
      .then((response) => {
        dispatch(stopLoading())
        // console.log(response);
        if (response.status === 201) {
          dispatch(goOfflineData(response.data));
          dispatch(showFlashMsg(response.data.message));
          saveToStorage('driverOnline', JSON.stringify(false))
        } else {
          dispatch(showFlashMsg(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(stopLoading())
        console.log(error)
      })
  }
}

export const rideRequest = (data) => {
  return {
    type: RIDE_REQUEST,
    payload: data
  }
}

export const tripAccepted = (data) => {
  return {
    type: TRIP_ACCEPTED,
    payload: data,
  }
}

export const resetState = () => {
  return {
    type: RESET_STATE,
  }
}

export const tripStarted = () => {
  return {
    type: TRIP_STARTED,
  }
}

export const tripCancelled = () => {
  return {
    type: TRIP_CANCELLED,
  }
}

export const tripRejected = () => {
  return {
    type: TRIP_REJECTED,
  }
}

export const getRatingAndTodayEarning = (data) => {
  return dispatch => {
    earningService.getRatingAndTodayEarning(data)
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          dispatch(setTodayData(response.data.data));
        } else {
          dispatch(setTodayData({todayEarning: '0.00', todayRating: '0.00'}));
        }
      })
      .catch((error) => {
        dispatch(stopLoading())
        console.log(error)
      })
  }
}

export const setTodayData = (data) => {
  return {
    type: TODAY_RATING_AND_EARNING,
    payload: data,
  }
}

export const getPolyline = (data) => {
  return dispatch => {
    locationService.getPolyline(data)
      .then((response) => {
        if (response.status === 201) {
          let polylineCoords = polyline.decode(response.data.message)
          let newPolyline = polylineCoords.map((point) => (
            {
              latitude: point[0],
              longitude: point[1]
            }
          ))
          dispatch(polylineData(newPolyline));
        } else {
          dispatch(showFlashMsg('Something went wrong, please try again later, if this error persst please contact support'))
        }
      })
      .catch((error) => {
        dispatch(showFlashMsg('Something went wrong, please try again later'))
      })
  }
}

export const polylineData = (data) => {
  return {
    type: POLYLINE,
    payload: data,
  }
}

export const getFleetOwnerHomeData = (data) => {
  return dispatch => {
    fleetOwnerService.getHomeData(data)
      .then((response) => {
        if (response.status === 201) {
          dispatch(fleetHomeData(response.data));
        } else {
          dispatch(showFlashMsg('Something went wrong, please try again later.'))
        }
      })
      .catch((error) => {
        dispatch(showFlashMsg('Something went wrong, please try again later'))
      })
  }
}

export const fleetHomeData = (data) => {
  return {
    type: FLEET_HOME_DATA,
    payload: data,
  }
}