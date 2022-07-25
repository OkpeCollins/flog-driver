import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';
import CustomTooltip from '../CustomTooltip';
import { naira } from '../../../../constants/staticData';
import RevenueMoney from '../RevenueMoney';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviousWeekRevenue, previousWeekRevenueDisplay } from '../../actions/earning.action';

function LastWeek() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const revenuePreviousWeek = useSelector(state => state.earning.revenuePreviousWeek);
  const revenuePreviousWeekDisplay = useSelector(state => state.earning.revenuePreviousWeekDisplay);

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      id: user.id,
      token: user.tokens.accessToken,
      fleetOwner: user.fleetOwner,
    }
    dispatch(getPreviousWeekRevenue(data));
  }, [])

  const handleToolTipDisplay = (index) => {
    let displayRule = new Array(7).fill(false);
    let display = displayRule;
    display[index] = true;
    dispatch(previousWeekRevenueDisplay(display))
  }

  return (
    <View style={styles.main}>
      <View style={styles.totalRevenue}>
        <CustomTooltip>
          <RevenueMoney type={'Card'} revenue={revenuePreviousWeek.weekEarningCard} />
          <RevenueMoney type={'Cash'} revenue={revenuePreviousWeek.weekEarningCash} marginTop={hp(3)} />
        </CustomTooltip>
      </View>
      <View style={styles.days}>
        {revenuePreviousWeek.revenue.map((item, index) => {
          return (
            <View style={styles.day}>
              <TouchableOpacity onPress={() => handleToolTipDisplay(index)}>
                <Text style={styles.dayText}>{item.day.slice(0,2)}</Text>
              </TouchableOpacity>
              {revenuePreviousWeekDisplay[index] && (
                <CustomTooltip >
                  <RevenueMoney type={'Card'} revenue={item.earningCard} />
                  <RevenueMoney type={'Cash'} revenue={item.earningCard} marginTop={hp(3)} />
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
  dayText: {
    fontSize: wp(16),
    color: colors.text.white,
  },
  totalRevenue: {
    alignItems: 'center',
    marginTop: hp(20),
    // width: wp(142),
  },
  cardRevenue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(4),
  },
  revenueAmount: {
    fontSize: wp(16),
    fontWeight: '700',
    color: colors.mainColor,
    marginLeft: wp(22.55)
  },
  days: {
    flex: 1,
    flexDirection: 'row',
    justifyContent :'space-between',
    marginHorizontal: wp(20),
    marginTop: hp(203),
  },
  day: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: wp(16),
    fontWeight: '700',
    textTransform: 'capitalize',
    color: colors.text.white,
  },
})

export default LastWeek;
