import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { Ionicons} from '@expo/vector-icons';
import { mockStars } from '../../../constants/testData';
import DashLine from './DashLine';
import Dash from 'react-native-dash';
import { naira } from '../../../constants/staticData';
import { getDate } from '../../../services/date.service';


function HistoryCard({marginTop, location, destination, status, stars = new Array(5).fill(false), price, date, onPress, paymentStatus, rating}) {
  function Star({ color, onPress }) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={'star'} size={wp(10)} color={color} style={{ marginRight: wp(2.5), }} />
      </TouchableOpacity>
    )
  }

  let STARS = stars.length === 5 ? stars : new Array(5).fill();

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.main, {marginTop}]}>
        <View style={styles.left}>
          <Ionicons name={'location'} size={hp(16.92)} />
          {/* <View style={styles.leftLine} /> */}
          {/* <DashLine /> */}
          <Dash
            dashThickness={wp(1)}
            dashGap={hp(3)}
            dashLength={hp(2)}
            dashColor={colors.historyBorder}
            dashStyle={{ borderRadius: 10, }} style={styles.leftLine}
          />
          <Ionicons name={'paper-plane'} size={hp(16.92)} />
        </View>
        <View style={styles.middle}>
          <Text style={styles.middleLocation} numberOfLines={1}>{location}</Text>
          <Text style={styles.middleDestination} numberOfLines={1}>{destination}</Text>
        </View>
        <View style={styles.right}>
          <View style={styles.rightMainText}>
            <Text style={status !== 'Completed' ? styles.onGoing : styles.date}>{status !== 'Completed' ? status : getDate(date)}</Text>
          </View>
          {status === 'Completed' ? (
            <View style={styles.rightStar}>
              {STARS.map(( item, index ) => {
                return (
                  <Star key={index} color={item === 'true' ? colors.gold : colors.historyBorder} disabled />
                )
              })}
            </View>
          ) : null}
          <View style={[styles.rightPrice, {marginTop: status === 'Completed' ? hp(10) : hp(30)}]}>
            <Text style={styles.price}>{naira}{price}</Text>
            {status === 'Completed' ? (
              <>
                <Text style={styles.price}> - </Text>
                <Text style={[styles.paymentStatus, { color: paymentStatus === 'Not Paid' ? 'red' : 'green' }]}>{paymentStatus}</Text>
              </>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: wp(335),
    height: hp(96),
    borderRadius: wp(6),
    paddingTop: hp(16),
    paddingHorizontal: hp(14.92),
    backgroundColor: colors.white,
  },
  left: {
    alignItems: 'center',
    // paddingTop
  },
  leftLine: {
    height: hp(28),
    width: wp(1),
    flexDirection: 'column',
    // borderRadius: 100,
    // overflow: 'hidden',
  },
  middle: {
    flex: 1,
    marginLeft: wp(16.92),
  },
  middleLocation: {
    fontSize: wp(14),
    fontWeight: '400',
  },
  middleDestination: {
    fontSize: wp(14),
    fontWeight: '400',
    marginTop: hp(32),
  },
  right: {
    alignItems: 'flex-end',
  },
  onGoing: {
    fontSize: wp(14),
    fontWeight: '700',
    color: colors.text.red,
  },
  date: {
    fontSize: wp(14),
    fontWeight: '700',
    color: colors.text.black,
  },
  rightStar: {
    flexDirection: 'row',
    marginTop: hp(10),
  },
  rightPrice: {
    flexDirection: 'row',
    marginTop: hp(10),
  },
  price: {
    fontSize: wp(12),
    color: colors.text.lighterGrey,
  },
  paymentStatusContainer: {
    // marginTop: hp(5),
  },
  paymentStatus: {
    fontSize: wp(12),
    fontWeight: '700',
  },
})

export default HistoryCard;
