import React from 'react';
import { Children } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function CustomTooltip({
  children,
  top,
  bottom,
  left,
  right,
  // height = hp(50),
  // width = wp(142)
}) {
  return (
    <View style={[styles.toolTip, {top, bottom, left, right}]}>
      <View style={styles.toolTipPointer} />
      <View style={[styles.toolTipContent]} >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolTip: {
    alignItems: 'center',
    // flex: 1,
    // flexWrap: 'nowrap',
    // minWidth: wp(55),
    // width: wp(142),
    // position: 'absolute',
  },
  toolTipPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: hp(6),
    borderRightWidth: hp(6),
    borderBottomWidth: wp(12),
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.contentHeader,
  },
  toolTipContent: {
    borderRadius: wp(5),
    padding: wp(10),
    // paddingTop: wp(4),
    // paddingBottom: wp(4),
    // paddingLeft: wp(7),
    // paddingRight: wp(7),
    backgroundColor: colors.contentHeader,
  },
})

export default CustomTooltip;
