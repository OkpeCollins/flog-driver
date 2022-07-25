import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../../constants/colors';
import Tooltip from 'rn-tooltip';
import { hp, wp } from '../../../../constants/dimension';
import CustomTooltip from '../CustomTooltip';
import { naira } from '../../../../constants/staticData';
import RevenueMoney from '../RevenueMoney';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviousWeekNet, previousWeekNetDisplay } from '../../actions/earning.action';

function LastWeek() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const netPreviousWeek = useSelector(state => state.earning.netPreviousWeek);
  const netPreviousWeekDisplay = useSelector(state => state.earning.netPreviousWeekDisplay);

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      id: user.id,
      token: user.tokens.accessToken,
      fleetOwner: user.fleetOwner,
    }
    
    dispatch(getPreviousWeekNet(data));
  }, [])

  const handleToolTipDisplay = (index) => {
    let displayRule = new Array(7).fill(false);
    let display = displayRule;
    display[index] = true;
    dispatch(previousWeekNetDisplay(display))
  }

  return (
    <View style={styles.main}>
      <View style={styles.totalRevenue}>
        <CustomTooltip height={hp(33)}>
          <RevenueMoney revenue={netPreviousWeek.allDaysEarning} />
        </CustomTooltip>
      </View>
      <View style={styles.days}>
        {netPreviousWeek.days.map((item, index) => {
          return (
            <View style={styles.day}>
              <TouchableOpacity onPress={() => handleToolTipDisplay(index)}>
                <Text style={styles.dayText}>{item.day.slice(0,2)}</Text>
              </TouchableOpacity>
              {netPreviousWeekDisplay[index] && (
                <CustomTooltip
                  // top={hp(20)}
                >
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

export default LastWeek;
