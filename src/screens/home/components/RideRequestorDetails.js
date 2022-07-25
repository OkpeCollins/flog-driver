import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback, ActivityIndicator} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import SwipRight from './SwipeRight';

function RideRequestorDetails({
  yourLocation,
  destination,
  description,
  onPressAcceptRequest,
  onPressRejectRequest,
  loading,
  rejectLoading,
  distance,
  price,
  eta,
  paymentType,
}) {
  return (
    <View style={styles.main}>
      <View style={styles.locationMain}>
        <Ionicons name={'location'} size={hp(16)} color={colors.blackBg} />
        <Text
          numberOfLines={1}
          style={[styles.locationText]}>{yourLocation ? yourLocation : 'Pick up location'}</Text>
      </View>
      <View style={[styles.locationMain, {marginTop: hp(8)}]}>
        <Ionicons name={'navigate'} size={hp(16)} color={colors.blue} />
        <Text
          numberOfLines={1}
          style={[styles.locationText]}
        >
          {destination ? destination : 'Destination'}
        </Text>
      </View>
      <View style={[styles.descriptionMain, {marginTop: hp(8)}]}>
        <Ionicons name={'chatbox'} size={hp(16)} color={colors.blue} />
        <Text
          numberOfLines={1}
          style={[styles.locationText]}
        >
          {description ? description : 'Description'}
        </Text>
      </View>
      <View style={styles.borderLine} />
      <View style={styles.userDetailsBottom}>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>Distance</Text>
          <Text style={styles.tripInfoData}>{distance}</Text>
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>Price</Text>
          <Text style={styles.tripInfoData}>{price}</Text>
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>ETA</Text>
          <Text style={styles.tripInfoData}>{eta}</Text>
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>Payment</Text>
          <Text style={styles.tripInfoData}>{paymentType}</Text>
        </View>
      </View>
      <View style={styles.actionBtnContainer}>
        <TouchableNativeFeedback onPress={onPressAcceptRequest}>
          <View style={styles.btnAccept}>
            {/* <EvilIcons name={'swipe-right'} size={hp(16)} color={colors.blackBg} /> */}
            {/* <SwipRight /> */}
            <View style={[styles.textConainer]}>
              {loading ? (
                <ActivityIndicator size={'large'} color={colors.blackBg} />
              ) : (
                <Text
                  numberOfLines={1}
                  style={[styles.text]}>Accept
                </Text> 
              )}
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={onPressRejectRequest}>
          <View style={styles.btnReject}>
            {/* <EvilIcons name={'swipe-right'} size={hp(16)} color={colors.blackBg} /> */}
            {/* <SwipRight /> */}
            <View style={[styles.textConainer]}>
              {rejectLoading ? (
                <ActivityIndicator size={'large'} color={colors.blackBg} />
              ) : (
                <Text
                  numberOfLines={1}
                  style={[styles.text, {color: colors.text.white}]}>Reject
                </Text> 
              )}
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    height: hp(365),
    width: wp(360),
    bottom: hp(0),
    backgroundColor: colors.blackBg,
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(30),
    paddingLeft: wp(21.5),
    paddingRight: wp(16),
    width: wp(335),
    height: hp(48),
    borderRadius: wp(6),
    backgroundColor: colors.white,
  },
  locationText: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: wp(13.5),
    fontSize: wp(16),
    fontWeight: '300',
    textAlign: 'left',
    color: colors.text.black,
  },
  descriptionMain: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(30),
    paddingTop: wp(17),
    paddingLeft: wp(21.5),
    paddingRight: wp(16),
    width: wp(335),
    height: hp(84),
    borderRadius: wp(6),
    backgroundColor: colors.white,
  },
  borderLine: {
    width: wp(295),
    marginTop: hp(6),
    borderWidth: wp(1),
    borderBottomColor: colors.offlineScreenGrey,
  },
  userDetailsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(15),
    width: wp(360),
    paddingLeft: wp(20),
    paddingRight: wp(20),
    // paddingBottom: hp(13),
  },
  tripInfo: {
    // flex: 1,
  },
  tripInfoTitle: {
    fontSize: wp(12),
    fontWeight: '400',
    color: colors.text.grey,
  },
  tripInfoData: {
    fontSize: wp(14),
    fontWeight: '500',
    marginTop: hp(3),
    color: colors.text.white,
  },
  actionBtnContainer: {
    flexDirection: 'row',
  },
  btnAccept: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp(16),
    paddingRight: wp(16),
    width: wp(360 / 2),
    height: hp(56),
    marginTop: hp(19),
    backgroundColor: colors.mainColor,
  },
  btnReject: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp(16),
    paddingRight: wp(16),
    width: wp(360 / 2),
    height: hp(56),
    marginTop: hp(19),
    backgroundColor: colors.red,
  },
  textConainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: colors.text.black,
    fontSize: wp(18),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
})

export default React.memo(RideRequestorDetails);
