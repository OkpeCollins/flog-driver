import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity, TouchableNativeFeedback, BackHandler } from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import CompleteIllustration from './components/CompleteIllustration';

function RegSuccessful({ navigation }) {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => navigation.navigate('Login')
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.navigate('Login') }}
        middleComponent={{ title: 'Sign Up', color: colors.text.white }}
      />
      <View style={styles.illustrationContainer}>
        <CompleteIllustration />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Success!!!</Text>
        <Text style={[styles.desc, {marginTop: hp(10)}]}>We are processing and checking for the originality of document submitted.</Text>
        <Text style={styles.desc}>A mail will be sent when your account has been activated.</Text>
        <Text style={[styles.desc, {marginTop: hp(45)}]}>Thank you.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    height: hp(720),
    backgroundColor: colors.blackBg,
  },
  textContainer: {
    // flex: 0.1,
    width: wp(360),
    marginTop: hp(43),
    paddingHorizontal: wp(49),
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: hp(78),
  },
  title: {
    fontSize: wp(22),
    fontWeight: '700',
    color: colors.mainColor,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  desc: {
    fontSize: wp(16),
    fontWeight: '400',
    color: colors.text.white,
    textAlign: 'center',
    lineHeight: hp(18.75)
  },
})

export default RegSuccessful;
