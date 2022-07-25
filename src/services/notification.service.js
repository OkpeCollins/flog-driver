import * as Notifications from "expo-notifications";
import store from "../redux/store";
import { getNotifications } from "../screens/notifications/actions/notifications.action";
import { deleteFromStorage, getFromStorage, saveToStorage } from "./localStorage.service";

/**
 * save is a booleen to indicate
 * if the notification should be saved
 * to the local storage
 * @param {string} title  - this is the title of the notification
 * @param {string} body  - the body of the notification
 * @param {boolean} save  - save is a boolean indicating to either save or ignore the notification
 * @param {object} data  - the data to use
 */

const sendNotificationImmediately = async (title, body, save, data) => {
  let notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
    },
    trigger: null,
  });
  // console.log(notificationId); // can be saved in AsyncStorage or send to server
  let notificationData = {
    id: notificationId,
    title,
    body,
  }
    if (save === true) {
    console.log('newResponse...............')
    getFromStorage('notification')
    .then((response) => {
      if (response === null) {
        saveToStorage('notification', JSON.stringify([notificationData]))
      } else {
        let newResponse = JSON.parse(response);
        console.log(newResponse)
        let newNotificationData = [notificationData, ...newResponse]
        store.dispatch(getNotifications(newNotificationData))
        saveToStorage('notification', JSON.stringify(newNotificationData))
      }
    })
  .catch(error => console.log(error))
  }
  
};

export const notificationService= {
  sendNotificationImmediately,
}