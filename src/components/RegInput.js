import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';
import { Ionicons } from '@expo/vector-icons';

function RegInput({
  // ref,
  backgroundColor = colors.regInputGrey,
  height = hp(32),
  width = wp(240),
  paddingLeft = wp(15),
  iconName,
  iconColor,
  marginTop,
  placeholder,
  value,
  keyboardType,
  onChangeText,
  secureTextEntry,
  onSubmitEditing,
  textColor = colors.text.white,
  multiline = false,
  numberOfLines,
  textAlignVertical,
  alignItems = 'flex-start',
  inputMarginTop,
  editable = true,
  style,
  borderRadius = wp(10),
  fontSize = hp(10),
}) {
  return (
    <View style={[styles.main, { marginTop, backgroundColor, borderRadius, height, width, paddingLeft, paddingRight: paddingLeft, alignItems }, style]}>
      {/* <Ionicons name={iconName} size={hp(16)} color={iconColor} style={{ marginTop: inputMarginTop }} /> */}
      <TextInput
        // ref={ref}
        style={[styles.textInput, { color: textColor, fontSize, height, width, textAlignVertical, marginTop: inputMarginTop }]}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        placeholderTextColor={textColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    // flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    alignItems: 'flex-start',
    // marginLeft: wp(13.5),
    fontWeight: '300',
    textAlign: 'left',
  },
})

export default RegInput;
