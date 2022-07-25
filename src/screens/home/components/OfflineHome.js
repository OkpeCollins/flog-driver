import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import Input from '../../../components/Input';
import NextBtn from './NextBtn';
import SwipeRight from './SwipeRight';
import { AntDesign, EvilIcons, Feather, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import OfflineHomeInfoBtn from './OfflineHomeInfoBtn';
import { naira } from '../../../constants/staticData';
import { useDispatch, useSelector } from 'react-redux';
import { getRatingAndTodayEarning } from '../actions/home.action';
// import { moneyService } from '../../../services/money.service';

function OfflineHome({ onPressEarning, onPressGoOnline, loading }) {
  const todayData = useSelector(state => state.home.todayData);
  const user = useSelector(state => state.login.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      riderId: user.id,
      token: user.tokens.accessToken,
    }
    dispatch(getRatingAndTodayEarning(data))
  }, [])

  return (
    <View style={styles.main}>
      <TouchableNativeFeedback onPress={onPressGoOnline}>
        <View style={styles.topBtn}>
          {/* <EvilIcons name={'swipe-right'} size={hp(16)} color={colors.blackBg} /> */}
          <SwipeRight />
          <View style={[styles.textConainer]}>
            {loading ? (
              <ActivityIndicator size={'large'} color={colors.blackBg} />
            ) : (
               <Text
                numberOfLines={1}
                  style={[styles.text]}>Go online
                  {/* {moneyService.cashFormatter(12345678)} */}
              </Text> 
            )}
          </View>
        </View>
      </TouchableNativeFeedback>
      <OfflineHomeInfoBtn title={`Today's Earning`} pressAble midText={`${naira}${todayData.todayEarning}`} onPress={onPressEarning} />
      {/* <OfflineHomeInfoBtn title={`Activity Score`} midText={'83.5%'} /> */}
      <OfflineHomeInfoBtn
        title={`Current Rating`}
        midText={`${todayData.todayRating}`}
        iconName={'star'}
        iconColor={colors.gold}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: wp(360),
    height: hp(195),
    backgroundColor: colors.blackBg,
  },
  topBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp(16),
    paddingRight: wp(16),
    width: wp(360),
    height: hp(56),
    backgroundColor: colors.mainColor,
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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.offlineScreenGrey,
    paddingHorizontal: hp(20),
    marginTop: hp(8),
    height: hp(45),
    width: wp(360)
  },
  midContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: colors.text.white,
    fontSize: wp(14),
    fontWeight: '700',
    textTransform: 'capitalize',
  },
})

export default React.memo(OfflineHome);
