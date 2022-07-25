import { combineReducers } from 'redux';
import chatReducer from '../screens/chat/reducers/chat.reducer';
import earningReducer from '../screens/earning/reducers/earning.reducer';
import homeReducer from '../screens/home/reducers/home.reducer';
import loginReducer from '../screens/login/reducers/login.reducer';
import notificationsReducer from '../screens/notifications/reducers/notifications.reducers';
import onboardingReducer from '../screens/onboarding/reducers/onboarding.reducer';
import rideHistoryReducer from '../screens/rideHistory/reducers/rideHistory.reducer';
import signUpReducer from '../screens/signUp/reducers/signUp.reducers';
import { rootReducer } from './rootReducer';
import supportReducer from '../screens/support/reducers/support.reducer';
import riderListReducer from '../screens/ridersList/reducers/riderList.reducers';

const appReducer = combineReducers({
  onboard: onboardingReducer,
  login: loginReducer,
  signUp: signUpReducer,
  home: homeReducer,
  riderList: riderListReducer,
  root: rootReducer,
  rideHistory: rideHistoryReducer,
  earning: earningReducer,
  chat: chatReducer,
  notification: notificationsReducer,
  support: supportReducer,
});

export default appReducer;