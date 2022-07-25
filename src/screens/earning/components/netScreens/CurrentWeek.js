import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';
import { currentWeekNetDisplay, getCurrentWeekNet } from '../../actions/earning.action';
import CustomTooltip from '../CustomTooltip';
import RevenueMoney from '../RevenueMoney';

function CurrentWeek() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const netCurrentWeek = useSelector(state => state.earning.netCurrentWeek);
  const netCurrentWeekDisplay = useSelector(state => state.earning.netCurrentWeekDisplay);

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      id: user.id,
      token: user.tokens.accessToken,
      fleetOwner: user.fleetOwner,
    }
    
    dispatch(getCurrentWeekNet(data));
  }, [])

  const handleToolTipDisplay = (index) => {
    let displayRule = new Array(7).fill(false);
    let display = displayRule;
    display[index] = true;
    dispatch(currentWeekNetDisplay(display))
  }

  return (
    <View style={styles.main}>
      <View style={styles.totalRevenue}>
        <CustomTooltip height={hp(33)}>
          <RevenueMoney revenue={netCurrentWeek.allDaysEarning} />
        </CustomTooltip>
      </View>
      <View style={styles.days}>
        {netCurrentWeek.days.map((item, index) => {
          return (
            <View style={styles.day}>
              <TouchableOpacity onPress={() => handleToolTipDisplay(index)}>
                <Text style={styles.dayText}>{item.day.slice(0,2)}</Text>
              </TouchableOpacity>
              {netCurrentWeekDisplay[index] && (
                <CustomTooltip top={hp(20)}>
                  <RevenueMoney revenue={item.earning} />
                </CustomTooltip>
              )}
            </View>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
  },
  totalRevenue: {
    alignItems: 'center',
    marginTop: hp(20),
    // width: wp(142),
  },
  days: {
    flexDirection: 'row',
    justifyContent :'space-between',
    marginHorizontal: wp(20),
    marginTop: hp(203),
  },
  day: {
    alignItems: 'center',
    // width: wp(142),
    // flexDirection: 'row',
    // justifyContent :'space-between',
    // alignItems: 'center',
    // marginHorizontal: wp(30),
    // marginTop: hp(203),
  },
  dayText: {
    fontSize: wp(16),
    fontWeight: '700',
    textTransform: 'capitalize',
    color: colors.text.white,
  },
})

export default CurrentWeek;
