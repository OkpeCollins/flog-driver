import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';

function StepOne({
  onPressNext,
  onPressIndividualSignup,
  mobileValue,
  emailValue,
  passwordValue,
  onMobileValueChange,
  onEmailValueChange,
  onPasswordValueChange,
  onPressTermsCheck,
  onBikesNumValueChange,
  bikesNumValue,
  termsChecked,
  disabled,
  errorMobile,
  errorEmail,
  errorPassword,
}) {
  return (
    <View>
      <View>
        <View style={styles.textContainer}>
            <Text style={styles.title}>Fleet Owners</Text>
            <Text style={styles.desc}>Sign up here if you have Multiple Bikes to add to flog platform</Text>
          </View>
          <View style={styles.formInfoContainer}>
            <Text style={styles.formInfoWhite}>If you are an individual rider
               <TouchableOpacity onPress={onPressIndividualSignup}>
                <Text style={styles.formInfoGreen}>Signup as a rider here</Text>
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
          </View>
          <View style={styles.btnContainer}>
            <Button title={'Next'} onPress={onPressNext} disabled={disabled} />
          </View>
          <View style={styles.termsContainer}>
            <View>
              <Text style={styles.termsTitle}>By signing up,  you accept our</Text>
              <TouchableNativeFeedback>
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
    paddingHorizontal: wp(73),
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
  errorHint: {
    alignSelf: 'flex-start',
    marginLeft: wp(21),
    marginRight: wp(21),
    marginTop: wp(5),
    fontSize: wp(14),
    color: colors.text.lightGrey,
  },
  formInfoContainer: {
    alignItems: 'flex-start',
    width: wp(300),
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

export default StepOne;
