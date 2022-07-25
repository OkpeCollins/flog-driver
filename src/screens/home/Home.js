import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import MapView, { Circle, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import * as Location from 'expo-location';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { mapStyles } from '../../constants/mapStyle';
import { Marker } from 'react-native-maps';
import OfflineHome from './components/OfflineHome';
import { showFlashMsg } from '../../redux/rootAction';
import {io} from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { apiBaseUrl } from '../../constants/staticData';
import { getPolyline, goOffline, goOnline, rideRequest, tripAccepted, tripCancelled, tripRejected, tripStarted, watchRiderPosition } from './actions/home.action';
import Button from '../../components/Button';
import RideRequestorDetails from './components/RideRequestorDetails';
import SenderDetails from '../../components/SenderDetails';
import { notificationService } from '../../services/notification.service';
import { setRiderId, setTripId, setUserId } from '../chat/actions/chat.action';
import { userCheck } from '../login/actions/login.actions';
// import { socket, socketConnect } from '../../services/realTime.service';
// import InrideBottomSheet from './components/InrideBottomSheet';


function Home({ navigation }) {
  const [location, setLocation] = React.useState({coords: {}});
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [rejectLoading, setRejectLoading] = React.useState(null);
  const [acceptLoading, setAcceptLoading] = React.useState(null);

  const state = useSelector(state => state.home);
  const user = useSelector(state => state.login.user);
  const locationServiceEnabled = useSelector(state => state.root.locationServiceEnabled);


  const dispatch = useDispatch();

  const socket = React.useMemo(() => io(apiBaseUrl), []);

  const mapRef = React.useRef(null);

  console.log('re rendered......................................................Outside')
  React.useEffect(() => {
  console.log('re rendered......................................................')
  }, [])

  // React.useEffect(() => {
  //   let data = {
  //     authorization: `bearer ${user.tokens.accessToken}`,
  //     userId: user.id
  //   }
  //   dispatch(userCheck(data))
  // }, [])

  // const checkLocationPermision = async () => {
  //   let { status } = await Location.requestPermissionsAsync();
  //   return { status };
  // }

  React.useEffect(() => {
      let locationTimeout;

      if (locationServiceEnabled) {
        locationTimeout = setTimeout(() => getLocation(), 3000)
      }

      const getLocation = () => {
        Location.getCurrentPositionAsync()
          .then((response) => {
            console.log('sdhcksdhkwx')
            let location = {
              latitude: response.coords.latitude,
              longitude: response.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.009,
            }
            setLocation(response)
            // mapRef.current.animateCamera({
            //   center: { latitude: location.latitude, longitude: location.longitude },
            //   zoom: 15,
            //   heading: 20,
            //   pitch: 2,
            //   altitude: 1000,
            //   }, 25000)
            mapRef.current.animateToRegion(location, 1500)
          })
          .catch(error => {
            dispatch(showFlashMsg('Unable to get your location automatically, you will have to input manually'))
        })
        .finally( () => {
          clearTimeout(locationTimeout);
        })
      }
  }, []);

  React.useEffect(() => {
    const watchPosition = () => {
      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 0,
      }, (location) => {
        let locationData = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        dispatch(watchRiderPosition(locationData))
      })
    }

    const stopWatchPosition = () => {
      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 0,
      }, () => {
        // console.log(location);
      })
    }

    if (state.online) {
      watchPosition()
    } else {
      stopWatchPosition()
    }

    // checkLocationPermision()
    //   .then((response) => {
    //     if (response.status !== 'granted') {
    //       dispatch(showFlashMsg('Enable location and restart the app'))
    //     } else {
    //       if (state.online) {
    //         watchPosition()
    //       } else {
    //         stopWatchPosition()
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    // })
    
    return () => stopWatchPosition()
  }, [state.online])

  React.useEffect(() => {
    socket.emit('notificationSubscribe', user.notificationToken);
  }, [])

  React.useEffect(() => {
    if (state.online) {
      socket.emit('driverOnline', user);
    }
    // return () => socket.disconnect()
  }, [])

  React.useEffect(() => {
    socket.on('chatNotification', (data) => {
      dispatch(showFlashMsg('You just recieved a message from your rider'));
      notificationService.sendNotificationImmediately(`Message from ${data.userName}`, data.msg[0].text, true)
    })
  
    socket.on('driverOnline', (data) => {
      notificationService.sendNotificationImmediately('Hey, you are online now', `You are online now and can accept trip request`)
    })
  
    socket.on('notifyDriver', (data) => {
      dispatch(showFlashMsg('You have a new ride request, you can accept or ignore to cancle'))
      notificationService.sendNotificationImmediately('New Ride Request', `You have a new ride request, to ${data.destination.text}`)
      dispatch(rideRequest(data))
      let coordsData = {
        authorization: `bearer ${user.tokens.accessToken}`,
        coords: {
          originLatitude: data.origin.latitude,
          originLongitude: data.origin.longitude,
          destinationLatitude: data.destination.latitude,
          destinationLongitude: data.destination.longitude,
        }
      }
      dispatch(getPolyline(coordsData))
    })
  
    socket.on('tripAccepted', (data) => {
      setAcceptLoading(false);
      dispatch(showFlashMsg('You have accept the ride request'))
      dispatch(tripAccepted(data))
    })
  
    socket.on('lateResponse', (data) => {
      dispatch(showFlashMsg('You take too long to respond, ride has been asigned to another rider'))
      notificationService.sendNotificationImmediately('Ride Request Re-assigned', `You take too long to respond.`, true, data,)
      dispatch(tripRejected(data))
    })
  
    socket.on('riderReject', (data) => {
      setRejectLoading(false);
      dispatch(showFlashMsg('You have rejeted the trip'))
      dispatch(tripRejected(data))
    })
  
    socket.on('cancelTripWhenPending', (data) => {
      dispatch(showFlashMsg('Hey, the user has cancelled a ride'))
      dispatch(tripRejected(data))
    })
  
    socket.on('startTrip', (data) => {
      dispatch(showFlashMsg('You have successfully started the trip you can view the trip data in history tab'))
      dispatch(tripStarted(data))
    })
  
    socket.on('cancelTrip', (data) => {
      dispatch(showFlashMsg(data))
      dispatch(tripCancelled())
    })
  }, [])

  console.log(state.tripAcceptedData);

  const handleGoOnline = () => {
    if (state.geometryData.description) {
      let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      details: {
        userId: user.id,
        destinationText: state.geometryData.description,
        destinationLongitude: state.geometryData.longitude,
        destinationLatitude: state.geometryData.latitude,
      }
    }
    // console.log(data)
    dispatch(goOnline(data))
    socket.emit('driverOnline', user);
    } else {
      dispatch(showFlashMsg('You must set your destination first before going online'))
    }
    
  }

  const handleAcceptRequest = () => {
    setAcceptLoading(true);
    let tripDetails = {
      riderId: user.id,
      tripId: state.rideRequestData.id,
      userId: state.rideRequestData.userId,
    };
    socket.emit('driverAccept', tripDetails);
  }

  const handleRejectRequest = () => {
    setRejectLoading(true);
    /** check if array of previouly rejeted drivers are inluded then spreed it to include the present riders */
    if (state.rideRequestData.excludesRiders) {
      let data = [...state.rideRequestData.excludesRiders, user.id];
      socket.emit('riderReject', {...state.rideRequestData, data})
    } else {
      let  excludesRiders = [user.id];
      socket.emit('riderReject', {...state.rideRequestData, excludesRiders: excludesRiders})
    }
  }

  const handleChatPress = () => {
    dispatch(setTripId(state.tripAcceptedData.tripData.id));
    dispatch(setRiderId(user.id));
    dispatch(setUserId(state.tripAcceptedData.tripData.userId));
    navigation.navigate('Chat');
  }

  const handleStartTrip = () => {
    socket.emit('startTrip', state.rideRequestData.id);
  }

  const handledleGoOffline = () => {
    dispatch(goOffline({
      authorization: `bearer ${user.tokens.accessToken}`,
      rideId: user.id 
    }));
  }

  return (
    <View style={styles.main}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        {location.coords.latitude && !state.online && <Marker
          coordinate={{
            latitude: location.coords.latitude ? location.coords.latitude : 0,
            longitude: location.coords.longitude ? location.coords.longitude: 0,
          }}
          image={require('../../asset/customMarker.png')}
        />}
        {state.online && state.riderPosition &&<Marker
          coordinate={state.riderPosition}
          image={require('../../asset/deliveryMan.png')}
        />}
        {(state.requestingRide || state.tripAccepted) && state.polylineData &&
          <>
          <Polyline
            coordinates={state.polylineData}
            strokeColor={colors.mapPolyLine}
            strokeWidth={2}
          />
          <Marker
            coordinate={state.polylineData[0]}
            image={require('../../asset/origin.png')}
          />
          <Marker
            coordinate={state.polylineData[state.polylineData.length - 1]}
            image={require('../../asset/destination.png')}
          />
        </>
        }
        {state.online && state.geometryData ? (
          <Circle
            center={{
              latitude: state.geometryData.latitude ? state.geometryData.latitude : 0,
              longitude: state.geometryData.longitude ? state.geometryData.longitude : 0
            }}
            radius={5000}
            fillColor={colors.mainColor + 30}
            strokeColor={colors.mainColor}
            strokeWidth={2}
          />
        ) : null}
        {/* <Polyline
          coordinates={[
            { latitude: 37.8025259, longitude: -122.4351431 },
            { latitude: 37.7896386, longitude: -122.421646 }
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000'
          ]}
          strokeWidth={6}
        /> */}
      </MapView>
      <Header
        lightMode={true}
        leftComponent={{ iconName: 'add-circle', color: colors.text.black, onpress: () => navigation.navigate('SetDestination') }}
      />
      {!state.online &&
        <OfflineHome
          onPressGoOnline={() => handleGoOnline()}
          onPressEarning={() => navigation.navigate('Earning')}
          loading={state.loading}
        />
      }
      {state.online && (
        <>
          <View style={{position: 'absolute', top: hp(50)}}>
            <Button
              width={wp(149)}
              height={hp(33)}
              borderRadius={wp(30)}
              title={'GO OFFLINE'}
              onPress={() => handledleGoOffline()}
            />
          </View>
          {/* <View style={{position: 'absolute', bottom: hp(17)}}>
            <Button
              width={wp(149)}
              height={hp(33)}
              borderRadius={wp(30)}
              title={'2KM'}
            />
          </View> */}
        </>
      )}
      {state.requestingRide && (
        <RideRequestorDetails
          yourLocation={state.rideRequestData.origin.text}
          destination={state.rideRequestData.destination.text}
          description={state.rideRequestData.description}
          distance={state.rideRequestData.distance.text}
          price={state.rideRequestData.price}
          eta={state.rideRequestData.ETA.text}
          paymentType={state.rideRequestData.paymentType}
          onPressAcceptRequest={() => handleAcceptRequest()}
          onPressRejectRequest={() => handleRejectRequest()}
          rejectLoading={rejectLoading}
        />
      )}
      {state.tripAccepted && (
        <SenderDetails
          name={state.tripAcceptedData.userData.name}
          phoneNum={state.tripAcceptedData.userData.mobile}
          onPressStartTrip={() => handleStartTrip()}
          onChatPress={() => handleChatPress()}
          mimeType={state.tripAcceptedData.tripData.userData.profilePicture ? state.tripAcceptedData.tripData.userData.profilePicture.mimeType : null}
          imageValue={state.tripAcceptedData.tripData.userData.profilePicture ? state.tripAcceptedData.tripData.userData.profilePicture.value : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: wp(360),
    height: hp(720),
    alignItems: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFill,
  },
})

const inrideBottomSheetStyles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    width: wp(360),
  },
  sheetContainer: {
    // flex: 1,
    alignItems: 'center',
    height: hp(270),
    width: wp(360),
    paddingHorizontal: wp(20),
    borderTopLeftRadius: wp(34),
    borderTopRightRadius: wp(34),
    backgroundColor: colors.blackBg,
  },
  dragger: {
    marginTop: hp(9),
    width: wp(113),
    height: hp(8),
    borderRadius: hp(8) / 2,
    backgroundColor: colors.grey,
  },
  btnContainer: {
    marginTop: hp(97),
  },
  newTripContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(26),
    paddingBottom: hp(15.5),
    borderBottomWidth: hp(1),
    borderBottomColor: colors.grey + 33,
  },
  newTripQus: {
    flex: 1,
  },
  newTripTitle: {
    fontSize: wp(22),
    fontWeight: '700',
    color: colors.white,
  },
  newTripDesc: {
    fontSize: wp(12),
    fontWeight: '500',
    marginTop: hp(4),
    color: colors.grey,
  },
  newTripBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
})

const inputLocationStyles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    height: hp(675),
    width: wp(360),
    paddingHorizontal: wp(20),
    backgroundColor: colors.blackBg,
  },
  draggerHeader: {
    width: wp(360),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(30),
    borderTopLeftRadius: wp(15),
    borderTopRightRadius: wp(15),
    backgroundColor: colors.blackBg
  },
  dragger: {
    marginTop: hp(9),
    width: wp(50),
    height: hp(6),
    borderRadius: hp(8) / 2,
    backgroundColor: colors.grey,
  },
  contentHeader: {
    fontSize: wp(16),
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text.white,
    marginTop: hp(30),
  },
  locationSearch: {
    flex: 1,
    width: wp(335),
    marginTop: hp(16),
  },
})

export default Home;
