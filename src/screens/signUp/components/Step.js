import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { hp, wp } from '../../../constants/dimension';

function Step({backgroundColor, step}) {
  return (
    <View style={[styles.main, {backgroundColor}]}>
      <Text>{step}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    width: hp(16),
    height: hp(16),
    borderRadius: hp(16) / 2,
  }
})

export default Step;
