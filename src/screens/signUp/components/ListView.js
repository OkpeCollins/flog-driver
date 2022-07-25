import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function ListView({onPress, title}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.option}>
        <Text style={styles.optionTitle}>{title}</Text>
        <View style={styles.border} />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  option: {
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    marginTop: hp(10),
    // backgroundColor: colors.offlineScreenGrey,
    // height: hp(45),
  },
  optionTitle: {
    fontSize: wp(14),
    marginBottom: hp(10),
    fontWeight: '700',
    textTransform: 'capitalize',
    color: colors.text.white
  },
  border: {
    borderWidth: wp(1),
    borderBottomColor: colors.contentHeader,
  },
})

export default ListView;
