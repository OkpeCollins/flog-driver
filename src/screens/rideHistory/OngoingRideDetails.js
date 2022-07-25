import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import SenderDetails from '../../components/SenderDetails';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { mapStyles } from '../../constants/mapStyle';
import DriverDetails from '../home/components/DriverDetails';
import HistoryCard from './components/HistoryCard';
import io from "socket.io-client";
import { apiBaseUrl, naira } from '../../constants/staticData';
import { showFlashMsg } from '../../redux/rootAction';
import { triggerHistoryGet } from './actions/rideHistory.action';
import { setRiderId, setTripId, setUserId } from '../chat/actions/chat.action';
import { getPolyline } from '../home/actions/home.action';

function OngoingRideDetails({ navigation }) {
  const [startTripLoading, setStartTripLoading] = React.useState(false);
  const [deliverTripLoading, setDeliverTripLoading] = React.useState(false);
  const polylineData = useSelector(state => state.home.polylineData);

  const user = useSelector(state => state.login.user);
  const singleOtherHistory = useSelector(state => state.rideHistory.singleOtherHistory);
  const dispatch = useDispatch();
  const socket = React.useMemo(() => io(apiBaseUrl));

  const mapRef = React.useRef();

  console.log(singleOtherHistory);

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      coords: {
        originLatitude: singleOtherHistory.origin.latitude,
        originLongitude: singleOtherHistory.origin.longitude,
        destinationLatitude: singleOtherHistory.destination.latitude,
        destinationLongitude: singleOtherHistory.destination.longitude,
      }
    }
    dispatch(getPolyline(data))
  }, [])

  React.useEffect(() => {
    
    // mapRef.current.animateCamera({
    //   center: { latitude: parseFloat(singleOtherHistory.destination.latitude), longitude: parseFloat(singleOtherHistory.destination.longitude) },
    //   zoom: 11,
    //   heading: 20,
    //   pitch: 5,
    //   altitude: 10000,
    //   }, 60000)
    if (polylineData) {
      let markers = [
        polylineData[0],
        polylineData[polylineData.length - 1],
      ]
      mapRef.current.fitToCoordinates(markers, {
        edgePadding: {
          top: hp(80),
          right: 25,
          left: 25,
          bottom: hp(100),
        },
      })
    }
  }, [])

    socket.on('deliverTrip', () => {
      dispatch(triggerHistoryGet());
      dispatch(showFlashMsg('Trip delivered successfully'))
      // setDeliverTripLoading(false);
      navigation.goBack();
    })

    socket.on('startTrip', () => {
      dispatch(triggerHistoryGet());
      dispatch(showFlashMsg('You have started the trip'))
      // setDeliverTripLoading(false);
      navigation.goBack();
    })

    socket.on('startTripError', () => {
      dispatch(triggerHistoryGet());
      dispatch(showFlashMsg('Error starting the trip'))
      // setDeliverTripLoading(false);
      navigation.goBack();
    })
  
    socket.on('deliverTripError', (msg) => {
      dispatch(triggerHistoryGet());
      dispatch(showFlashMsg('Error while delivering your trip, Please go back and try again'))
      // setDeliverTripLoading(false);
      navigation.goBack();
    })

  const handleCompleteTrip = () => {
    setDeliverTripLoading(true);
    socket.emit('deliverTrip', singleOtherHistory.id)
  }

  const handleStartTrip = () => {
    setStartTripLoading(true)
    socket.emit('startTrip', singleOtherHistory.id)
  }

  const handleChatPress = () => {
    dispatch(setTripId(singleOtherHistory.id));
    dispatch(setRiderId(singleOtherHistory.riderData.id));
    dispatch(setUserId(singleOtherHistory.userData.id));
    navigation.navigate('Chat');
  }

  return (
    <View style={styles.main}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        // customMapStyle={mapStyles}
      >
      {polylineData && (
        <>
          <Polyline
            coordinates={polylineData}
            strokeColor={colors.mapPolyLine}
            strokeWidth={2}
          />
          <Marker
            coordinate={polylineData[0]}
            image={require('../../asset/origin.png')}
          />
          <Marker
            coordinate={polylineData[polylineData.length - 1]}
            image={require('../../asset/destination.png')}
          />
        </>
      )}
      </MapView>
      <Header lightMode middleComponent={{ title: 'Ride History', color: colors.text.black }}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.black, onpress: () => navigation.goBack() }}
      />
      <HistoryCard
        location={singleOtherHistory.origin.text}
        destination={singleOtherHistory.destination.text}
        status={singleOtherHistory.status}
        price={singleOtherHistory.price}
        date={singleOtherHistory.createdAt}
        paymentStatus={singleOtherHistory.paymentStatus}
      />
      <SenderDetails
        name={singleOtherHistory.userData.name}
        status={singleOtherHistory.status}
        onPressDeliver={() => handleCompleteTrip()}
        onPressStartTrip={() => handleStartTrip()}
        onChatPress={() => handleChatPress()}
        deliverTripLoading={deliverTripLoading}
        startTripLoading={startTripLoading}
        mimeType={singleOtherHistory.riderData.profilePicture ? singleOtherHistory.riderData.profilePicture.mimeType : null}
        imageValue={singleOtherHistory.riderData.profilePicture ? singleOtherHistory.riderData.profilePicture.value : null}
        // onPressStartTrip={}
      />
      {/* <View style={{position: 'absolute', bottom: hp(50)}}>
        <Button
          title={'Deliver Package'}
          width={wp(335)}
          onPress={() => handleCompleteTrip(singleOtherHistory.id)}
        />
      </View> */}
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

export default OngoingRideDetails;
