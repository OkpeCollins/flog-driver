import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import EarningTopTab from './EarningTopTab';

function Earning({navigation}) {
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Earning-Revenue', color: colors.text.white }}
      />
      <View style={styles.content}>
        <EarningTopTab />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
  },
  content: {
    flex: 1,
  }
})

export default Earning;
