import React from 'react';
import { StyleSheet, AppState, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Flog from './src/navigation';
import store from './src/redux/store';
import FlashMsg from './src/components/FlashMsg';
import AppLoading from 'expo-app-loading';
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as Location from 'expo-location';
import { saveToStorage, getFromStorage } from './src/services/localStorage.service';
import { onboard } from './src/screens/onboarding/actions/onboarding.actions';
import { loadUser } from './src/screens/login/actions/login.actions';
import { getGeometryData, goOffline, goOfflineData, goOnlineData } from './src/screens/home/actions/home.action';
// import { socket } from './src/services/realTime.service';
import { locationServiceEnabled, showFlashMsg } from './src/redux/rootAction';
import { getNotifications } from './src/screens/notifications/actions/notifications.action';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserInactivity from './src/utill/UserInactivity';

export default function App() {
  const [appLoaded, setApploaded] = React.useState(false)
  const [onBoardedLoad, setOnboardedLoad] = React.useState(false)
  const [notificationLoad, setNotificationLoad] = React.useState(false)
  const [userLoad, setUserLoad] = React.useState(false)
  const [destinationLoad, setDestinationLoad] = React.useState(false)
  const [driverStatusLoad, setDriverStatusLoad] = React.useState(false)

  // const appState = React.useRef(AppState.currentState);
  // var interval

  // const _handleAppStateChange = (nextAppState) => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === "active"
  //   ) {
  //     console.log("App has come to the foreground!");
  //     //clearInterval when your app has come back to the foreground
  //     BackgroundTimer.clearInterval(interval)
        
  //   } else {
  //     //app goes to background
  //     console.log('app goes to background')
  //     //tell the server that your app is still online when your app detect that it goes to background
  //     interval = BackgroundTimer.setInterval(() => {
  //       console.log('connection status ', socket.connected)
  //       socket.emit('stayOnline')
  //     }, 5000)
  //     appState.current = nextAppState;
  //     console.log("AppState", appState.current);
  //   }
  // }

  // React.useEffect(() => {
  //   AppState.addEventListener("change", _handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener("change", _handleAppStateChange);
  //   };
  // }, [])

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const registerForPushNotificationsAsync = async() =>  {
    // let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    // return token;
  }

    console.log('App root re rendered......................................................Outside')
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, [])
  
  React.useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then((response) => {
        checkLocationStatus();
      })
      .catch(error => {
        console.log(error);
        checkLocationStatus();
      });
  }, []);

  const checkLocationStatus = () => {
    Location.hasServicesEnabledAsync()
      .then(response => {
        if (response === true) {
          store.dispatch(locationServiceEnabled(true))
        } else {
          store.dispatch(locationServiceEnabled(false))
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getFromStorage('onBoarded')
      .then((respone) => {
        if (respone) {
          store.dispatch(onboard());
        }
        setOnboardedLoad(true)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  React.useEffect(() => {
    getFromStorage('notification')
      .then((respone) => {
        if (respone) {
          store.dispatch(getNotifications(JSON.parse(respone)));
        }
        setNotificationLoad(true)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  React.useEffect(() => {
    getFromStorage('user')
      .then((response) => {
        if (response) {
          store.dispatch(loadUser(JSON.parse(response)));
        }
        setUserLoad(true);
      })
      .catch((error) => {
        console.log(error)
      })
  })

  React.useEffect(() => {
    getFromStorage('driverDestination')
      .then((response) => {
        if (response) {
          store.dispatch(getGeometryData(JSON.parse(response)));
        }
        setDestinationLoad(true);
      })
      .catch((error) => {
        console.log(error)
      })
  })

  React.useEffect(() => {
    getFromStorage('driverOnline')
      .then((response) => {
        if (response) {
          switch (JSON.parse(response)) {
            case true:
              store.dispatch(goOnlineData(JSON.parse(response)));
              break;
            case true:
              store.dispatch(goOfflineData(JSON.parse(response)));
              break;
            default:
              break;
          }
        }
        setDriverStatusLoad(true);
      })
      .catch((error) => {
        console.log(error)
      })
  })

  const inActiveGoOffline = (isActive) => {
    if (!store.getState().login.user.tokens) return

    let data = {
      authorization: `bearer ${store.getState().login.user.tokens.accessToken}`,
      rideId: store.getState().login.user.id 
    }
    console.log(isActive);
    if (store.getState().home.online) {
      store.dispatch(goOffline(data))
    }

  }

  React.useEffect(() => {
    if (onBoardedLoad && notificationLoad && userLoad && destinationLoad && driverStatusLoad) {
      setApploaded(true)
    }
  }, [userLoad, onBoardedLoad, destinationLoad, driverStatusLoad])

  return (
    !appLoaded ? (
      <AppLoading
      />
    ) : (
      <SafeAreaProvider>
        <Provider store={store}>
          <UserInactivity
            timeForInactivity={(60000 * 60) * 2}
            onAction={isActive => inActiveGoOffline(isActive)}>
            <Flog />
          </UserInactivity>
          <FlashMsg />
        </Provider>
      </SafeAreaProvider>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
