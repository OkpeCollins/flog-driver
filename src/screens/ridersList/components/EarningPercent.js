import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function EarningPercent({ total = "0.00", portion = "0.00" }) {
  let calcPercent = total === "0.00" ? 0 : parseFloat(portion) / parseFloat(total);
  let width = calcPercent * parseInt(wp(268));
  return (
    <View style={styles.main}>
      {/* <View style={styles.base} /> */}
      <View style={[styles.meter, {width}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: wp(268),
    height: hp(3),
    backgroundColor: colors.mainColor + 30,
  },
  meter: {
    height: hp(3),
    backgroundColor: colors.mainColor,
  },
})

export default EarningPercent;
