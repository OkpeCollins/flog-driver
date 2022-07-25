import { showFlashMsg } from "../../../redux/rootAction"
import { tripService } from "../../../services/trip.service"
import { SINGLE_HISTORY_COMPLETED, TRIGGER_HISTORY_GET, SINGLE_HISTORY_OTHERS, START_LOADING, STOP_LOADING, TRIP_HISTORY_COMPLETED, TRIP_HISTORY_OTHERS, DELIVER_TRIP } from "./rideHistory.type"

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

export const tripHistoryCompleted = (rideHistoryData) => {
  return {
    type: TRIP_HISTORY_COMPLETED,
    payload: rideHistoryData,
  }
}

export const tripHistoryOthers = (rideHistoryData) => {
  return {
    type: TRIP_HISTORY_OTHERS,
    payload: rideHistoryData,
  }
}

export const singleCompletedHistory = (singleHistory) => {
  return {
    type: SINGLE_HISTORY_COMPLETED,
    payload: singleHistory
  }
}

export const singleOthersHistory = (singleHistory) => {
  return {
    type: SINGLE_HISTORY_OTHERS,
    payload: singleHistory
  }
}

export const triggerHistoryGet = (rideHistoryData) => {
  return {
    type: TRIGGER_HISTORY_GET,
  }
}

export const deliverTrip = () => {
  return {
    type: DELIVER_TRIP,
  }
}

export const getOtherRideHistory = (data) => {
  return dispatch => {
    dispatch(startLoading());
    tripService.otherRideHistory(data)
      .then((response) => {
        dispatch(stopLoading())
        if (response.status === 201) {
          dispatch(tripHistoryOthers(response.data.response))
          // console.log(response)
        } else {
          console.log(response)
        }
      })
      .catch((error) => {
        dispatch(showFlashMsg('Something went wrong kindly check your network and try again'))
      })
  }
}

export const getCompletedRideHistory = (data) => {
  return dispatch => {
    dispatch(startLoading());
    tripService.completedRideHistory(data)
      .then((response) => {
        dispatch(stopLoading())
        if (response.status === 201) {
          dispatch(tripHistoryCompleted(response.data.response))
        } else {
          console.log(response)
        }
      })
      .catch((error) => {
        dispatch(showFlashMsg('Something went wrong kindly check your network and try again'))
      })
  }
}