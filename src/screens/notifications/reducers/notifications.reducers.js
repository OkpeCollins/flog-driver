import { NOTIFICATIONS } from "../actions/notifications.type";

const initialState = {
  loading: false,
  notifications: [],
}

function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      }
    default:
      return state;
  }
}

export default notificationsReducer;