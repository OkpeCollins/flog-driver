import React from 'react';
// import { FormattedNumber, IntlProvider } from 'react-intl';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../../../constants/colors';
import { wp } from '../../../constants/dimension';

function FleetOwnerDataView({value}) {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: wp(248),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: wp(36),
    fontWeight: '100',
    color: colors.mainColor,
  }
})

export default FleetOwnerDataView;
