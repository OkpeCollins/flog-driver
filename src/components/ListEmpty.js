import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';

function ListEmpty({title}) {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>List Empty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // height: hp(720),
    // width: wp(360),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: wp(15),
    color: colors.text.white,
  },
})

export default ListEmpty;
