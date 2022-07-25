import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';

function PayToFlog() {
  return (
    <View style={styles.main}>
      <View style={styles.infoContainer}></View>
      <View style={styles.directiveContainer}>
        <Text style={styles.directiveText}>Please, input only this reference number on the description or reference field of the payment.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.blackBg,
  },
  infoContainer: {
    width: wp(321),
    height:287,
    marginTop: hp(85),
    backgroundColor: colors.contentHeader,
    borderRadius: wp(20),
  },
  directiveContainer: {
    marginHorizontal: wp(41),
    marginTop: hp(19),
  },
  directiveText: {
    fontSize: wp(13),
    color: colors.text.white,
    textAlign: 'center',
  },
})

export default PayToFlog;
