import { NOTIFICATIONS } from "./notifications.type"

export const getNotifications = (data) => {
  return {
    type: NOTIFICATIONS,
    payload: data,
  }
}