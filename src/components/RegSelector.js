import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, TouchableNativeFeedback } from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';
import { Ionicons } from '@expo/vector-icons';

function RegSelector({
  // ref,
  onPress,
  backgroundColor = colors.regInputGrey,
  height = hp(32),
  width = wp(240),
  paddingLeft = wp(15),
  iconName = 'chevron-down',
  iconColor = colors.text.lightGrey,
  marginTop,
  text,
  textColor = colors.text.lightGrey,
  numberOfLines = 1,
  textAlignVertical,
  alignItems = 'center',
  style,
  inputMarginTop,
}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.main, { marginTop, backgroundColor, height, width, paddingLeft, paddingRight: paddingLeft, alignItems }, style]}>
        <Text numberOfLines={numberOfLines} style={[styles.text, { color: textColor, textAlignVertical }]}>{text}</Text>
        <Ionicons name={iconName} size={hp(16)} color={iconColor} style={{ marginTop: inputMarginTop }} />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: wp(10),
    borderWidth: wp(0.4),
    borderColor: colors.borderGrey,
  },
  text: {
    // flex: 1,
    alignItems: 'center',
    fontSize: wp(10),
    fontWeight: '300',
    textAlign: 'left',
  },
})

export default RegSelector;
