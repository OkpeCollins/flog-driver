import { SINGLE_HISTORY_COMPLETED, TRIGGER_HISTORY_GET, SINGLE_HISTORY_OTHERS, START_LOADING, STOP_LOADING, TRIP_HISTORY_OTHERS, TRIP_HISTORY_COMPLETED } from "../actions/rideHistory.type";

const initialState = {
  loading: false,
  completedHistoryData: [],
  singleCompletedHistory: {},
  otherHistoryData: [],
  singleOtherHistory: {},
  triggerHistoryGet: 0,
}

const rideHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      }
    case TRIP_HISTORY_OTHERS:
      return {
        ...state,
        otherHistoryData: action.payload,
      }
    case TRIP_HISTORY_COMPLETED:
      return {
        ...state,
        completedHistoryData: action.payload,
      }
    case SINGLE_HISTORY_COMPLETED:
      return {
        ...state,
        singleCompletedHistory: action.payload,
      }
    case SINGLE_HISTORY_OTHERS:
      return {
        ...state,
        singleOtherHistory: action.payload,
      }
    case TRIGGER_HISTORY_GET:
      return {
        ...state,
        triggerHistoryGet: Math.random(),
      }
    default:
      return state;
  }
}

export default rideHistoryReducer;