import {
  HIDE_FLASH_MSG,
  SHOW_FLASH_MSG,
  USER_LOADED,
  APP_LOADED,
  ONBOARDED_LOADED,
  NOTIFICATION_LOADED,
  DESTINATION_LOADED,
  DRIVER_STATUS_LOADED,
  LOCATION_SERVICE_ENABLED,
} from "./rootType";

export function showFlashMsg(data) {
  return {
    type: SHOW_FLASH_MSG,
    payload: data,
  }
}

export function hideFlashMsg() {
  return {
    type: HIDE_FLASH_MSG
  }
}

export function appLoaded() {
  return {
    type: APP_LOADED
  }
}

export function userLoaded() {
  return {
    type: USER_LOADED
  }
}

export function onBoardedLoaded() {
  return {
    type: ONBOARDED_LOADED
  }
}

export function notificationLoaded() {
  return {
    type: NOTIFICATION_LOADED
  }
}

export function destinationLoaded() {
  return {
    type: DESTINATION_LOADED
  }
}

export function driverStatusLoaded() {
  return {
    type: DRIVER_STATUS_LOADED,
  }
}

export function locationServiceEnabled(data) {
  return {
    type: LOCATION_SERVICE_ENABLED,
    payload: data,
  }
}
