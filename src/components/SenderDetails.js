import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';
import Button from './Button';

function SenderDetails({
  onNextPress,
  onChatPress,
  name,
  phoneNum,
  onPressStartTrip,
  onPressDeliver,
  deliverTripLoading,
  startTripLoading,
  status,
  mimeType,
  imageValue,
}) {

  const onPressCall = () => {
    Linking.openURL(`tel:${phoneNum}`);
  }
  return (
    <View style={styles.main}>
      <View style={styles.driverDetailsTop}>
        <View style={styles.imageContainer}>
          <View style={styles.imagebase}>
            <Image source={{uri:`data:${mimeType};base64,${imageValue}`}} style={styles.userImage} />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
        </View>
        {status === 'Ongoing' && 
          <View style={styles.callBtnContainer}>
            <Button width={wp(111)} height={hp(38)} title={'Deliver'} onPress={onPressDeliver} loading={deliverTripLoading} />
          </View>
        }
        {status === 'Accepted' && 
          <View style={styles.callBtnContainer}>
            <Button width={wp(111)} height={hp(38)} title={'Start Trip'} onPress={onPressStartTrip} loading={startTripLoading} />
          </View>
        }
        {!status && 
          <View style={styles.callBtnContainer}>
            <Button width={wp(111)} height={hp(38)} title={'Start Trip'} onPress={onPressStartTrip} loading={startTripLoading} />
          </View>
        }
      </View>
      <View style={styles.driverDetailsMiddle}>
        {status === 'Accepted' && 
        <TouchableOpacity>
          <View style={styles.option}>
            <Ionicons name={'close-sharp'} size={hp(18)} color={colors.mainColor} />
            <Text style={styles.optionText}>Cancel</Text>
          </View>
        </TouchableOpacity>
        }
        <TouchableOpacity onPress={onChatPress}>
          <View style={styles.option}>
            <Ionicons name={'chatbubble-ellipses'} size={hp(18)} color={colors.mainColor} />
            <Text style={styles.optionText}>Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressCall()}>
          <View style={styles.option}>
            <Ionicons name={'call'} size={hp(18)} color={colors.mainColor} />
            <Text style={styles.optionText}>Call Sender</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // alignItems: 'center',
    position: 'absolute',
    bottom: hp(25),
    width: wp(335),
    height: hp(134),
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
  userImage: {
    width: wp(52),
    height: wp(52),
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: wp(10)
  },
  name: {
    marginRight: wp(5),
    fontSize: hp(14),
    color: colors.text.white,
  },
  trips: {
    fontSize: hp(9),
    color: colors.mainColor,
  },
  rightStar: {
    flexDirection: 'row',
    marginTop: hp(2),
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
    fontSize: hp(14),
    fontWeight: '500',
    color: colors.text.white,
    marginLeft: wp(8),
  },
})

export default React.memo(SenderDetails);
