import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';
import { getThreeMonthNet, threeMonthNetDisplay } from '../../actions/earning.action';
import CustomTooltip from '../CustomTooltip';
import RevenueMoney from '../RevenueMoney';

function PastThreeMonth() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const netThreeMonth = useSelector(state => state.earning.netThreeMonth);
  const netThreeMonthDisplay = useSelector(state => state.earning.netThreeMonthDisplay);

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      id: user.id,
      token: user.tokens.accessToken,
      fleetOwner: user.fleetOwner,
    }
    
    dispatch(getThreeMonthNet(data));
  }, [])

  const handleToolTipDisplay = (index) => {
    let displayRule = new Array(3).fill(false);
    let display = displayRule;
    display[index] = true;
    dispatch(threeMonthNetDisplay(display))
  }

  return (
    <View style={styles.main}>
      <View style={styles.totalRevenue}>
        <CustomTooltip height={hp(33)}>
          <RevenueMoney revenue={netThreeMonth.allthreeMonths} />
        </CustomTooltip>
      </View>
      <View style={styles.days}>
        {netThreeMonth.months.map((item, index) => {
          return (
            <View key={`Month-${index}`} style={styles.day}>
              <TouchableOpacity onPress={() => handleToolTipDisplay(index)}>
                <Text style={styles.dayText}>{item.month?.slice(0,3)}</Text>
              </TouchableOpacity>
              {netThreeMonthDisplay[index] && (
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
