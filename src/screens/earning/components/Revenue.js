import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import RevenueTopTab from './RevenueTopTab';

function Revenue() {
  return (
    <View style={styles.main}>
      <View style={styles.navContainer}>
        <RevenueTopTab />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
  },
  navContainer: {
    flex: 1,
    marginTop: hp(40),
    backgroundColor: colors.blackBg,
  }
})

export default Revenue;
