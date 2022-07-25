import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';
import * as Linking from 'expo-linking';
function StepOne({
  onPressNext,
  onPressFleetOwnerSignup,
  mobileValue,
  emailValue,
  passwordValue,
  confirmPasswordValue,
  onMobileValueChange,
  onEmailValueChange,
  onPasswordValueChange,
  onConfirmPasswordValueChange,
  onPressTermsCheck,
  termsChecked,
  disabled,
  errorMobile,
  errorEmail,
  errorPassword,
  errorConfirmPassword,
}) {
  return (
    <View>
      <View>
        <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome Aboard!</Text>
            <Text style={styles.desc}>Earn Good money with your bike</Text>
          </View>
          <View style={styles.formInfoContainer}>
            <Text style={styles.formInfoWhite}>If you have multiple bikes and riders
               <TouchableOpacity onPress={onPressFleetOwnerSignup}>
                <Text style={styles.formInfoGreen}>Signup as a fleet owner here</Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View style={styles.form}>
            <Input
              backgroundColor={colors.white} iconName={'call-outline'}
              iconColor={colors.text.grey} placeholder={'Phone Number'}
              keyboardType={'numeric'}
              onChangeText={onMobileValueChange}
              value={mobileValue}
            />
            {errorMobile && <Text style={styles.errorHint}>{errorMobile}</Text>}
            <Input
              backgroundColor={colors.white} iconName={'mail-outline'}
              iconColor={colors.text.grey} placeholder={'Email'}
              keyboardType={'email-address'}
              marginTop={hp(20)}
              onChangeText={onEmailValueChange}
              value={emailValue}
            />
            {errorEmail && <Text style={styles.errorHint}>{errorEmail}</Text>}
            <Input
              backgroundColor={colors.white} iconName={'lock-closed-outline'}
              iconColor={colors.text.grey} placeholder={'Password'}
              secureTextEntry={true}
              marginTop={hp(20)}
              onChangeText={onPasswordValueChange}
              value={passwordValue}
            />
            {errorPassword && <Text style={styles.errorHint}>{errorPassword}</Text>}
            <Input
              backgroundColor={colors.white} iconName={'lock-closed-outline'}
              iconColor={colors.text.grey} placeholder={'Confirm password'}
              secureTextEntry={true}
              marginTop={hp(20)}
              onChangeText={onConfirmPasswordValueChange}
              value={confirmPasswordValue}
            />
            {errorConfirmPassword && <Text style={styles.errorHint}>{errorConfirmPassword}</Text>}
          </View>
          <View style={styles.btnContainer}>
            <Button title={'Next'} onPress={onPressNext} disabled={disabled} />
          </View>
          <View style={styles.termsContainer}>
            <View>
              <Text style={styles.termsTitle}>By signing up,  you accept our</Text>
              <TouchableNativeFeedback onPress={() => Linking.openURL('https://flog.com.ng/terms-and-conditions/')}>
                <Text style={styles.terms}>Terms and Privacy Policy</Text>
              </TouchableNativeFeedback>
            </View>
            <TouchableNativeFeedback onPress={onPressTermsCheck}>
              <View style={styles.checkBox}>
                <View style={termsChecked && styles.checked} />
              </View>
            </TouchableNativeFeedback>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    // flex: 0.1,
    width: wp(360),
    marginTop: hp(12),
    paddingHorizontal: wp(83),
  },
  title: {
    fontSize: wp(22),
    fontWeight: '700',
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  desc: {
    fontSize: wp(16),
    fontWeight: '400',
    color: colors.text.white,
    textAlign: 'center',
  },
  formInfoContainer: {
    alignItems: 'flex-start',
    marginTop: hp(60),
    marginHorizontal: wp(20),
  },
  formInfoWhite: {
    fontSize: wp(16),
    fontWeight: '400',
    color: colors.text.white,
    textAlign: 'left',
  },
  formInfoGreen: {
    fontSize: wp(16),
    fontWeight: '400',
    color: colors.mainColor,
    textAlign: 'left',
  },
  form: {
    alignItems: 'center',
    marginTop: hp(41),
  },
  errorHint: {
    alignSelf: 'flex-start',
    marginLeft: wp(21),
    marginRight: wp(21),
    marginTop: wp(5),
    fontSize: wp(14),
    color: colors.text.lightGrey,
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: hp(22),
  },
  termsContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(16),
    marginHorizontal: wp(22),
  },
  termsTitle: {
    fontSize: wp(16),
    fontWeight: '400',
    color: colors.text.grey,
    textAlign: 'left',
  },
  terms: {
    fontSize: wp(12),
    fontWeight: '400',
    color: colors.mainColor,
    textAlign: 'left',
  },
  checkBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(21.33),
    height: hp(20),
    // borderRadius: 5,
    borderWidth: wp(1),
    borderColor: colors.white
  },
  checked: {
    width: wp(15.33),
    height: hp(15),
    // borderRadius: 5,
    backgroundColor: colors.mainColor
  },
})

export default React.memo(StepOne);
