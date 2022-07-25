import {
  APP_LOADED,
  DESTINATION_LOADED,
  HIDE_FLASH_MSG,
  NOTIFICATION_LOADED,
  ONBOARDED_LOADED,
  SHOW_FLASH_MSG,
  USER_LOADED,
  DRIVER_STATUS_LOADED,
  LOCATION_SERVICE_ENABLED,
} from './rootType';

const initialState = {
  showFlashMsg: false,
  flashMsg: null,
  appLoaded: false,
  onBoardedLoad: false,
  notificationLoad: false,
  userLoad: false,
  destinationLoad: false,
  driverStatusLoad: false,
  locationServiceEnabled: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FLASH_MSG:
      return {
        ...state,
        showFlashMsg: true,
        flashMsg: action.payload,
      }
    case HIDE_FLASH_MSG:
      return {
        ...state,
        showFlashMsg: false
      }
    case APP_LOADED:
      return {
        ...state,
        appLoaded: true
      }
    case USER_LOADED:
      return {
        ...state,
        userLoad: true
      }
    case ONBOARDED_LOADED:
      return {
        ...state,
        onBoardedLoad: true
      }
    case NOTIFICATION_LOADED:
      return {
        ...state,
        notificationLoad: true
      }
    case DESTINATION_LOADED:
      return {
        ...state,
        destinationLoad: true
      }
    case DRIVER_STATUS_LOADED:
      return {
        ...state,
        destinationLoad: true
      }
    case LOCATION_SERVICE_ENABLED:
      return {
        ...state,
        locationServiceEnabled: action.payload,
      }
  
    default:
      return state;
  }
}