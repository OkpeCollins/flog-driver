import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';
import { getThreeMonthRevenue, threeMonthRevenueDisplay } from '../../actions/earning.action';
import CustomTooltip from '../CustomTooltip';
import RevenueMoney from '../RevenueMoney';

function PastThreeMonth() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const revenueThreeMonth = useSelector(state => state.earning.revenueThreeMonth);
  const revenueThreeMonthDisplay = useSelector(state => state.earning.revenueThreeMonthDisplay);

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      id: user.id,
      token: user.tokens.accessToken,
      fleetOwner: user.fleetOwner,
    }
    
    dispatch(getThreeMonthRevenue(data));
  }, [])

  const handleToolTipDisplay = (index) => {
    let displayRule = new Array(3).fill(false);
    let display = displayRule;
    display[index] = true;
    dispatch(threeMonthRevenueDisplay(display))
  }

  return (
    <View style={styles.main}>
      <View style={styles.totalRevenue}>
        <CustomTooltip>
          <RevenueMoney type={'Card'} revenue={revenueThreeMonth.earningCard} />
          <RevenueMoney type={'Cash'} revenue={revenueThreeMonth.earningCash} marginTop={hp(3)} />
        </CustomTooltip>
      </View>
      <View style={styles.days}>
        {revenueThreeMonth.revenue.map((item, index) => {
          return (
            <View style={styles.day}>
              <TouchableOpacity onPress={() => handleToolTipDisplay(index)}>
                <Text style={styles.dayText}>{item.month?.slice(0,3)}</Text>
              </TouchableOpacity>
              {revenueThreeMonthDisplay[index] && (
                <CustomTooltip>
                  <RevenueMoney type={'Card'} revenue={item.earningCard} />
                  <RevenueMoney type={'Cash'} revenue={item.earningCash} marginTop={hp(3)} />
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
    marginHorizontal: wp(30),
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

export default PastThreeMonth;
