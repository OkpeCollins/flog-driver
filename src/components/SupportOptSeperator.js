import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';

function SupportOptSeperator() {
  return (
    <View style={styles.main} />
  );
}

const styles = StyleSheet.create({
  main: {
    width: wp(291),
    borderBottomWidth: wp(0.5),
    marginVertical: hp(3),
    borderBottomColor: colors.borderGrey,
  }
})

export default SupportOptSeperator;
