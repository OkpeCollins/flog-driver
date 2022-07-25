import { showFlashMsg } from '../../../redux/rootAction';
import { saveToStorage } from '../../../services/localStorage.service';
import { fleetOwnerService } from '../../../services/fleetOwner.service';
import {
  LOADING,
  SHOW_MODAL,
  HIDE_MODAL,
  STOP_LOADING,
  RIDER_DATA,
  ADD_RIDER,
  SHOW_SUCCESS_MODAL,
  HIDE_SUCCESS_MODAL,
  GET_RIDER_SUCCESS,
  SINGLE_RIDER,
  RIDER_STAT,
  VIEW_DOC,
  HIDE_DOC,
  ACTION_SUCCESS,
  RESET_ACTION_SUCCESS,
} from './riderList.type';

export const riderAdded = () => {
  return {
    type: ADD_RIDER,
  }
}

export const riderData = (data) => {
  return {
    type: RIDER_DATA,
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

export const addNewRider = (riderData) => {
  return dispatch => {
    dispatch(loading());
    fleetOwnerService.addRider(riderData)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(showFlashMsg('Rider added successfully.'))
          dispatch(riderAdded())
        } else {
          console.log(response.data);
          let message = response.status === 409 ? response.data.message : 'Something went wrong please try again later'
          dispatch(showFlashMsg(message))         
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, check your network and try again'))
      })
  } 
}

export const showSuccessModal = () => {
  return {
    type: SHOW_SUCCESS_MODAL,
  }
}

export const hideSuccessModal = () => {
  return {
    type: HIDE_SUCCESS_MODAL,
  }
}

export const getRiders = (data) => {
  return dispatch => {
    dispatch(loading());
    fleetOwnerService.getRiders(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(getRiderSuccess(response.data.riders))
        } else {
          dispatch(showFlashMsg('Something went wrong please try again later'))         
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, check your network and try again'))
      })
  } 
}

export const getRiderSuccess = (payload) => {
  return {
    type: GET_RIDER_SUCCESS,
    payload,
  }
}

export const singleRider = (payload) => {
  return {
    type: SINGLE_RIDER,
    payload,
  }
}

export const getRiderStat = (data) => {
  return dispatch => {
    dispatch(loading());
    fleetOwnerService.getRiderData(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(riderStat(response.data.result))
        } else {
          dispatch(showFlashMsg('Something went wrong please try again later'))         
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, check your network and try again'))
      })
  } 
}

export const riderStat = (payload) => {
  return {
    type: RIDER_STAT,
    payload,
  }
}

export const viewDoc = (payload) => {
  return {
    type: VIEW_DOC,
    payload,
  }
}

export const hideDoc = () => {
  return {
    type: HIDE_DOC,
  }
}

export const blockRider = (data) => {
  return dispatch => {
    dispatch(loading());
    fleetOwnerService.blockRider(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(actionSuccess());
          dispatch(showFlashMsg(`Rider has been blocked and won't be able to log in`))
        } else {
          dispatch(showFlashMsg('Something went wrong please try again later'))         
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, check your network and try again'))
      })
  } 
}

export const deleteRider = (data) => {
  return dispatch => {
    dispatch(loading());
    fleetOwnerService.deleteRider(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(actionSuccess());
          dispatch(showFlashMsg(`Rider has been deleted`))
        } else {
          dispatch(showFlashMsg('Something went wrong please try again later'))         
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, check your network and try again'))
      })
  } 
}

export const unblockRider = (data) => {
  return dispatch => {
    dispatch(loading());
    fleetOwnerService.unBlockRider(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(actionSuccess());
          dispatch(showFlashMsg(`Rider has been unblocked and can be able to log in`));
        } else {
          dispatch(showFlashMsg('Something went wrong please try again later'))         
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, check your network and try again'))
      })
  } 
}

export const actionSuccess = () => {
  return {
    type: ACTION_SUCCESS,
  }
}

export const resetActionSuccess = () => {
  return {
    type: RESET_ACTION_SUCCESS,
  }
}
