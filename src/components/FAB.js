import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';

function FAB({onPress, iconName}) {
  return (
    // <View style={styles.main}>
      <TouchableOpacity onPress={onPress} style={styles.main}>
        <Ionicons name={iconName} size={30} color={colors.blackBg} />
      </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: hp(620),
    left: wp(290),
    width: wp(50),
    height: wp(50),
    borderRadius: wp(50) / 2,
    backgroundColor: colors.mainColor,
  },
})

export default FAB;
