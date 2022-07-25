import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Button from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { Ionicons } from '@expo/vector-icons';

function DriverDetails({ onNextPress, onChatPress }) {
  return (
    <View style={styles.main}>
      <View style={styles.driverDetailsTop}>
        <View style={styles.imageContainer}>
          <View style={styles.imagebase}>
            <Image />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Okpe Collins</Text>
          <Text style={styles.trips}>134 trips completed</Text>
          <Text>*****</Text>
        </View>
        <View style={styles.callBtnContainer}>
          <Button width={wp(111)} height={hp(38)} title={'Call Driver'} />
        </View>
      </View>
      <View style={styles.driverDetailsMiddle}>
        <TouchableOpacity onPress={onChatPress}>
          <View style={styles.option}>
            <Ionicons name={'chatbubble-ellipses'} size={hp(18)} color={colors.mainColor} />
            <Text style={styles.optionText}>Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.option}>
            <Ionicons name={'close-sharp'} size={hp(18)} color={colors.mainColor} />
            <Text style={styles.optionText}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.driverDetailsBottom}>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>Distance</Text>
          <Text style={styles.tripInfoData}>4.2 mi</Text>
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>Price</Text>
          <Text style={styles.tripInfoData}>N800</Text>
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>ETA</Text>
          <Text style={styles.tripInfoData}>14:29</Text>
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>Payment</Text>
          <Text style={styles.tripInfoData}>Cash</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // alignItems: 'center',
    position: 'absolute',
    bottom: hp(10),
    width: wp(335),
    height: hp(200),
    paddingLeft: wp(20),
    paddingRight: wp(20),
    backgroundColor: colors.blackBg,
    borderRadius: hp(6)
  },
  driverDetailsTop: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(19),
    paddingBottom: hp(12),
    borderBottomWidth: hp(1),
    borderBottomColor: colors.grey + 33,
  },
  imageContainer: {
    height: hp(52),
    width: wp(52),
  },
  imagebase: {
    height: hp(52),
    width: wp(52),
    backgroundColor: '#e2e2e2',
    borderRadius: wp(52) / 2,
    overflow: 'hidden',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: wp(10)
  },
  name: {
    fontSize: wp(14),
    color: colors.text.white,
  },
  trips: {
    fontSize: wp(9),
    color: colors.mainColor,
  },
  callBtnContainer: {
    flex: 1,
  },
  driverDetailsMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(16),
    paddingBottom: hp(13),
    borderBottomWidth: hp(1),
    borderBottomColor: colors.grey + 33,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: wp(14),
    fontWeight: '500',
    color: colors.text.white,
    marginLeft: wp(8),
  },
  driverDetailsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(15),
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
})

export default DriverDetails;
