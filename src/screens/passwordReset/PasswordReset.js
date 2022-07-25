import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { validateEmail } from '../../services/validation.service';
import {forgetPassword} from '../login/actions/login.actions';

function PasswordReset({ navigation }) {
  const [email, setEmail] = React.useState();
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [errorEmail, setErrorEmail] = React.useState(null);

  React.useEffect(() => {
    if (email === null) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [email])

  const logInState = useSelector(state => state.login);
  const dispatch = useDispatch();

  const handlePasswordReset = () => {
    if (validateEmail(email) === false) {
      setErrorEmail('Please enter a valid email')
      return;
    } else {
      setErrorEmail(null)
    }

    dispatch(forgetPassword({email}))
  }
  
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Log In', color: colors.text.white }}
      />
      <ScrollView showsVerticalScrollIndicator={true} >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Password Reset Link</Text>
          <Text style={styles.desc}>Enter Email Address</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Input
              backgroundColor={colors.white} iconName={'mail-outline'}
              iconColor={colors.text.grey} placeholder={'Please Enter Email Address'}
              keyboardType={'email-address'}
              onChangeText={(text) => setEmail(text)}
            />
          {errorEmail && <Text style={styles.errorHint}>{errorEmail}</Text>}
          </View>
          <View style={styles.btnContainer}>
            <Button
              title={'Reset Password'}
              loading={logInState.loading}
              onPress={() => handlePasswordReset()}
              disabled={btnDisabled}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    height: hp(720),
    paddingBottom: hp(15),
    backgroundColor: colors.blackBg,
  },
  textContainer: {
    // flex: 1,
    width: wp(360),
    marginTop: hp(44),
    // backgroundColor: '#ffffff50'
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
    color: colors.text.grey,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(337),
    // backgroundColor: '#ffffff30'
  },
  form: {
    // flex: 1,
    alignItems: 'center',
  },
  errorHint: {
    alignSelf: 'flex-start',
    marginLeft: wp(21),
    marginRight: wp(21),
    marginTop: wp(5),
    fontSize: wp(14),
    color: colors.text.lightGrey,
  },
  forgotPassContainer: {
    width: wp(315),
    alignItems: 'flex-end',
    marginTop: hp(8),
    // backgroundColor: '#ffffff50'
  },
  forgotPasstext: {
    fontSize: wp(16),
    fontWeight: '300',
    color: colors.text.grey,
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(24),
    // backgroundColor: '#ffffff50'
  },
  qusContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(16),
    // backgroundColor: '#ffffff50'
  },
})

export default PasswordReset;
