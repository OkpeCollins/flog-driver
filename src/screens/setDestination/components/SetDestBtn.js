import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function SetDestBtn({
  height,
  title,
  fontSize = hp(14),
  borderLeftWidth,
  borderLeftColor,
  onPress,
  pressAble = false,
  marginTop,
  leftIcon,
  rightIcon,
}) {
  return (
    <TouchableNativeFeedback onPress={onPress} disabled={pressAble}>
      <View style={[styles.main, { height, borderLeftColor, borderLeftWidth, marginTop }]}>
        <View style={styles.leftIconContainer}>
          <MaterialIcons name={leftIcon} color={colors.mainColor} size={hp(20)}  />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {fontSize}]} >{title}</Text>
        </View>
        <View style={styles.rightIconContainer}>
          <Ionicons name={rightIcon} color={colors.grey} size={hp(20)}  />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp(13),
    width: wp(360),
    backgroundColor: colors.contentHeader,
  },
  leftIconContainer: {

  },
  titleContainer: {
    flex: 1,
    marginLeft: wp(15)
  },
  title: {
    fontWeight: '700',
    color: colors.text.white,
    textTransform: 'capitalize',
  },
  rightIconContainer: {
    marginRight: wp(16)
  },
})

export default SetDestBtn;
