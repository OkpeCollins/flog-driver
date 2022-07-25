import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { naira } from '../../../constants/staticData';
import Cash from '../../payments/components/Cash';

function RevenueMoney({type, revenue, marginTop, moneyMarginLeft = wp(22.55)}) {
  return (
    <View style={[styles.cardRevenue, {marginTop, justifyContent: type ? null : 'center'}]}>
      {type === 'Card' ? (
        <Ionicons name={'card-outline'} size={wp(18)} color={colors.text.white} />
      ) : type === 'Cash' && (
          <Cash width={wp(15)} height={wp(15)} />
      )}
      <Text style={[styles.revenueAmount, {marginLeft: type ? moneyMarginLeft : wp(0)}]}>{ naira }{revenue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
  },
  cardRevenue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revenueAmount: {
    fontSize: wp(16),
    fontWeight: '700',
    color: colors.mainColor,
    marginLeft: wp(22.55)
  },
})

export default RevenueMoney;
