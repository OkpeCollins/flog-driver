import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import NetTopTab from './NetTopTab';

function Net() {
  return (
    <View style={styles.main}>
      <View style={styles.navContainer}>
        <NetTopTab />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: wp(360),
    backgroundColor: colors.blackBg,
  },
  navContainer: {
    flex: 1,
    marginTop: hp(40),
    backgroundColor: colors.blackBg,
  }
})

export default Net;
