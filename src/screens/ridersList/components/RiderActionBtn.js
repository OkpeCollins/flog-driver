import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hp, wp } from '../../../constants/dimension';
import { colors } from '../../../constants/colors';

function RiderActionBtn({iconName, backgroundColor, title, onPress, disabled}) {
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={[styles.btn, {backgroundColor}]}>
          <MaterialCommunityIcons name={iconName} size={wp(20)} color={colors.text.white + 80} />
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>{ title }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(42),
    width: wp(42),
    borderRadius: wp(10),
  },
  title: {
    fontSize: wp(12),
    fontWeight: '500',
    color: colors.text.grey,
    textTransform: 'capitalize',
    marginTop: hp(7),
  },
})

export default RiderActionBtn;
