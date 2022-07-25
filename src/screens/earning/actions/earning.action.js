import { showFlashMsg } from "../../../redux/rootAction"
import {earningService} from "../../../services/earning.service"
import {
  LOADING,
  STOP_LOADING,
  PREVIOUS_WEEK_NET,
  CURRENT_WEEK_NET,
  NET_PREVIOUS_WEEK_DISPLAY,
  NET_CURRENT_WEEK_DISPLAY,
  THREE_MONTH_NET,
  NET_THREE_MONTH_DISPLAY,
  PREVIOUS_WEEK_REVENUE,
  CURRENT_WEEK_REVENUE,
  THREE_MONTH_REVENUE,
  REVENUE_PREVIOUS_WEEK_DISPLAY,
  REVENUE_CURRENT_WEEK_DISPLAY,
  REVENUE_THREE_MONTH_DISPLAY,
  PREVIOUS_WEEK_BALANCE,
  CURRENT_WEEK_BALANCE,
  THREE_MONTH_BALANCE,
  BALANCE_PREVIOUS_WEEK_DISPLAY,
  BALANCE_CURRENT_WEEK_DISPLAY,
  BALANCE_THREE_MONTH_DISPLAY,
} from "./earning.type"

export const startLoading = () => {
  return {
    type: LOADING,
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  }
}

export const previousWeekNet = (data) => {
  return {
    type: PREVIOUS_WEEK_NET,
    payload: data
  }
}

export const currentWeekNet = (data) => {
  return {
    type: CURRENT_WEEK_NET,
    payload: data
  }
}

export const threeMonthNet = (data) => {
  return {
    type: THREE_MONTH_NET,
    payload: data
  }
}

export const previousWeekNetDisplay = (data) => {
  return {
    type: NET_PREVIOUS_WEEK_DISPLAY,
    payload: data
  }
}

export const currentWeekNetDisplay = (data) => {
  return {
    type: NET_CURRENT_WEEK_DISPLAY,
    payload: data,
  }
}

export const threeMonthNetDisplay = (data) => {
  return {
    type: NET_THREE_MONTH_DISPLAY,
    payload: data,
  }
}

//revenue state 
export const previousWeekRevenue = (data) => {
  return {
    type: PREVIOUS_WEEK_REVENUE,
    payload: data
  }
}

export const currentWeekRevenue = (data) => {
  return {
    type: CURRENT_WEEK_REVENUE,
    payload: data
  }
}

export const threeMonthRevenue = (data) => {
  return {
    type: THREE_MONTH_REVENUE,
    payload: data
  }
}

export const previousWeekRevenueDisplay = (data) => {
  return {
    type: REVENUE_PREVIOUS_WEEK_DISPLAY,
    payload: data
  }
}

export const currentWeekRevenueDisplay = (data) => {
  return {
    type: REVENUE_CURRENT_WEEK_DISPLAY,
    payload: data,
  }
}

export const threeMonthRevenueDisplay = (data) => {
  return {
    type: REVENUE_THREE_MONTH_DISPLAY,
    payload: data,
  }
}

//Balance state 
export const previousWeekBalance = (data) => {
  return {
    type: PREVIOUS_WEEK_BALANCE,
    payload: data
  }
}

export const currentWeekBalance = (data) => {
  return {
    type: CURRENT_WEEK_BALANCE,
    payload: data
  }
}

export const threeMonthBalance = (data) => {
  return {
    type: THREE_MONTH_BALANCE,
    payload: data
  }
}

export const previousWeekBalanceDisplay = (data) => {
  return {
    type: BALANCE_PREVIOUS_WEEK_DISPLAY,
    payload: data
  }
}

export const currentWeekBalanceDisplay = (data) => {
  return {
    type: BALANCE_CURRENT_WEEK_DISPLAY,
    payload: data,
  }
}

export const threeMonthBalanceDisplay = (data) => {
  return {
    type: BALANCE_THREE_MONTH_DISPLAY,
    payload: data,
  }
}

//async action
export const getPreviousWeekNet = (data) => {
  return dispatch => {
    dispatch(startLoading());
    earningService.getPreviousWeekNet(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(previousWeekNet(response.data.data));
        } else {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))       
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))
        // console.log(error.data.error.message);
      })
  } 
}

export const getCurrentWeekNet = (data) => {
  return dispatch => {
    dispatch(startLoading());
    earningService.getCurrentWeekNet(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(currentWeekNet(response.data.data));
        } else {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))       
        }
      })
      .catch((error) => {
        dispatch(showFlashMsg('Network error, Please check your check your network and try again')) 
        // console.log(error.data.error.message);
      })
  } 
}

export const getThreeMonthNet = (data) => {
  return dispatch => {
    dispatch(startLoading());
    earningService.getThreeMonthNet(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(threeMonthNet(response.data.data));
        } else {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))       
        }
      })
      .catch((error) => {
        dispatch(showFlashMsg('Network error, Please check your check your network and try again')) 
        // console.log(error.data.error.message);
      })
  } 
}

export const getPreviousWeekRevenue = (data) => {
  return dispatch => {
    dispatch(startLoading());
    earningService.getPreviousWeekRevenue(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(previousWeekRevenue(response.data.data));
        } else {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))       
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))
        // console.log(error.data.error.message);
      })
  } 
}

export const getCurrentWeekRevenue = (data) => {
  return dispatch => {
    dispatch(startLoading());
    earningService.getCurrentWeekRevenue(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(currentWeekRevenue(response.data.data));
        } else {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))       
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))
        // console.log(error.data.error.message);
      })
  } 
}

export const getThreeMonthRevenue = (data) => {
  return dispatch => {
    dispatch(startLoading());
    earningService.getThreeMonthRevenue(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(threeMonthRevenue(response.data.data));
        } else {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))       
        }
      })
      .catch((error) => {
        dispatch(showFlashMsg('Network error, Please check your check your network and try again')) 
        // console.log(error.data.error.message);
      })
  } 
}

export const getPreviousWeekBalance = (data) => {
  return dispatch => {
    dispatch(startLoading());
    earningService.getPreviousWeekBalance(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(previousWeekBalance(response.data.data));
        } else {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))       
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))
        // console.log(error.data.error.message);
      })
  } 
}

export const getCurrentWeekBalance = (data) => {
  return dispatch => {
    dispatch(startLoading());
    earningService.getCurrentWeekBalance(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(currentWeekBalance(response.data.data));
        } else {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))       
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))
        // console.log(error.data.error.message);
      })
  } 
}

export const getThreeMonthBalance = (data) => {
  return dispatch => {
    dispatch(startLoading());
    earningService.getThreeMonthBalance(data)
      .then((response) => {
        console.log(response);
        dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(threeMonthBalance(response.data.data));
        } else {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))       
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Network error, Please check your check your network and try again'))
        // console.log(error.data.error.message);
      })
  } 
}