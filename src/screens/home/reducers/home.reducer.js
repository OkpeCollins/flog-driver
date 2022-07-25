import {
  AUTO_COMPLETE_DATA,
  GET_GEOMETRY,
  GO_OFFLINE_DATA,
  GO_ONLINE_DATA,
  RESET_STATE,
  RIDE_REQUEST,
  START_LOADING,
  STOP_LOADING,
  TRIP_ACCEPTED,
  TRIP_CANCELLED,
  TRIP_STARTED,
  TRIP_REJECTED,
  TODAY_RATING_AND_EARNING,
  WATCH_POSITION,
  POLYLINE,
  FLEET_HOME_DATA,
} from "../actions/home.type";

const initialState = {
  autoCompleteData: {},
  geometryData: {},
  loading: false,
  online: false,
  onlineData: {},
  rideRequestData: {},
  requestingRide: false,
  tripAccepted: false,
  tripAcceptedData: {},
  todayData: {todayEarning: '0.00', todayRating: '0.00'},
  tripStarted: false,
  riderPosition: {latitude: 0, longitude: 0},
  polylineData: null,
  fleetHomeData: {
    "allDataStat": [{
      "name": "totalEarning",
      "value": 0
    }, {
      "name": "totalRating",
      "value": 0
    }, {
      "name": "totalRiders",
      "value": 3
    }],
    "lastFiveRiders": []
  }
}

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      }
    case AUTO_COMPLETE_DATA:
      return {
        ...state,
        autoCompleteData: action.payload
      }
    case GET_GEOMETRY:
      return {
        ...state,
        geometryData: action.payload
      }
    case GO_ONLINE_DATA:
      return {
        ...state,
        online: true,
        onlineData: action.payload,
      }
    case WATCH_POSITION:
      return {
        ...state,
        riderPosition: action.payload,
      }
    case GO_OFFLINE_DATA:
      return {
        ...state,
        online: false,
        requestingRide: false,
        // onlineData: action.payload,
      }
    case RIDE_REQUEST:
      return {
        ...state,
        requestingRide: true,
        rideRequestData: action.payload,
      }
    case TRIP_ACCEPTED:
      return {
        ...state,
        tripAccepted: true,
        requestingRide: false,
        tripAcceptedData: action.payload,
      }
    case TRIP_STARTED:
      return {
        ...state,
        loading: false,
        rideRequestData: {},
        requestingRide: false,
        tripAccepted: false,
        tripAcceptedData: {},
        tripStarted: false,
      }
    case TRIP_CANCELLED:
      return {
        ...state,
        loading: false,
        rideRequestData: {},
        requestingRide: false,
        tripAccepted: false,
        tripAcceptedData: {},
        tripStarted: false,
      }
    case TRIP_REJECTED:
      return {
        ...state,
        loading: false,
        requestingRide: false,
        rideRequestData: {},
        tripAccepted: false,
        tripAcceptedData: {},
        tripStarted: false,
      }
    case POLYLINE:
      return {
        ...state,
        polylineData: action.payload
      }
    case RESET_STATE:
      return state;
    case TODAY_RATING_AND_EARNING:
      return {
        ...state,
        todayData: action.payload,
      }
    case FLEET_HOME_DATA:
      return {
        ...state,
        fleetHomeData: action.payload,
      }
    default:
      return state;
  }
}

export default homeReducer;