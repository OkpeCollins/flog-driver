import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ContentHeader from '../../components/ContentHeader';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import SetDestBtn from './components/SetDestBtn';

function SetDestination({navigation}) {
  return (
    <View style={styles.main}>
    <Header
      backgroundColor={colors.blackBg}
      leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
      middleComponent={{ title: 'Set Destination', color: colors.text.white }}
      />
      <ContentHeader
        height={hp(80)}
        title={'Ride Towards Destination'}
        fontSize={hp(18)}
        borderLeftColor={colors.mainColor}
        borderLeftWidth={wp(5)}
      />
      <View style={styles.otherContent}>
        <Text style={styles.title}>Select Destination</Text>
      </View>
      {/* <SetDestBtn
        height={hp(64)}
        marginTop={hp(23)}
        leftIcon={'home'}
        rightIcon={'chevron-forward'}
        title={'Ride Towards Destination'}
      /> */}
      <SetDestBtn
        height={hp(64)}
        marginTop={hp(8)}
        leftIcon={'search'}
        rightIcon={'ios-chevron-forward'}
        title={'Set Destination'}
        pressable
        onPress={() => navigation.navigate('SetDestinationMain')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
  },
  otherContent: {
    marginTop: hp(16),
  },
  title: {
    fontSize: wp(14),
    fontWeight: '700',
    marginLeft: wp(19),
    color: colors.text.white,
  }
});

export default SetDestination;
