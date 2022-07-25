import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity, TouchableNativeFeedback, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { showFlashMsg } from '../../redux/rootAction';
import { signUp, signUpData } from './actions/signUp.actions';
import QusOpt from './components/QusOpt';
import Step from './components/Step';
import StepOne from './components/FleetOwnerSteps/StepOne';
import StepTwo from './components/FleetOwnerSteps/StepTwo';
import StepThree from './components/FleetOwnerSteps/StepThree';
import { validateAccountNum, validateEmail, validateMobile, validateName, validatePassword } from '../../services/validation.service';

const STEP_LENGTH = new Array(3).fill(false);

function FleetOwnerSignup({ navigation }) {
  const [step, setStep] = React.useState(1);
  const [mobileValue, setMobileValue] = React.useState();
  const [termsChecked, setTermsChecked] = React.useState(false);
  
  const [stepOneBtnDisabled, setStepOneBtnDisabled] = React.useState(true);
  const [stepTwoBtnDisabled, setStepTwoBtnDisabled] = React.useState(true);
  const [stepThreeBtnDisabled, setStepThreeBtnDisabled] = React.useState(true);
  
  //error states step one
  const [errorMobile, setErrorMobile] = React.useState(null);
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [errorPassword, setErrorPassword] = React.useState(null);

  //error states step two
  const [errorCompanyName, setErrorCompanyName] = React.useState(null);
  const [errorCity, setErrorCity] = React.useState(null);
  const [errorRGNum, setErrorRGNum] = React.useState(null);

  //error states step three
  const [errorAccountName, setErrorAccountName] = React.useState(null);
  const [errorAccountNumber, setErrorAccountNumber] = React.useState(null);
  const [errorBankName, setErrorBankName] = React.useState(null);


  const state = useSelector(state => state.signUp);
  const dispatch = useDispatch()

  // const handleNext = () => {
  //   setStep(step + 1)
  // }

  const backAction = () => {
    if (step === 1) {
      navigation.goBack()
    } else {
      setStep(step - 1)
    }
    return true;
  }

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [step]);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          dispatch(showFlashMsg('You need to grant to read external storage'))
        }
      }
    })();
  }, []);

  React.useEffect(() => {
  if (state.signUpSuccessful) {
    navigation.navigate('RegSuccessful')
  }
  }, [state.signUpSuccessful])

  React.useEffect(() => {
    if (state.userData.email !== undefined && state.userData.dispalyMobile !== undefined && state.userData.password !== undefined && termsChecked !== false) {
      setStepOneBtnDisabled(false)
    } else {
      setStepOneBtnDisabled(true)
    }
  }, [state.userData.mobile, state.userData.email, termsChecked])

  React.useEffect(() => {
    if (state.userData.companyName !== undefined && state.userData.city !== undefined && state.userData.RGNumber) {
      setStepTwoBtnDisabled(false)
    } else {
      setStepTwoBtnDisabled(true)
    }
  }, [state.userData.companyName, state.userData.city, state.userData.RGNumber])

  React.useEffect(() => {
    if (state.userData.accountName === undefined || state.userData.accountNumber === undefined || state.userData.bankName === undefined) {
      setStepThreeBtnDisabled(true)
    } else {
      setStepThreeBtnDisabled(false)
    }
  }, [state.userData.accountName, state.userData.accountNumber, state.userData.bankName])

  const handleTextValueChange = (type, text) => {
    let signUpValues = state.userData;
    switch (type) {
      case 'mobile':
        let formattedMobile = parseInt(text);
        formattedMobile = `+234${formattedMobile}`;
        signUpValues = { ...signUpValues, dispalyMobile: text,  mobile: formattedMobile };
        dispatch(signUpData(signUpValues));
        break;
      case 'email':
        signUpValues = {...signUpValues, email: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'password':
        signUpValues = {...signUpValues, password: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'companyName':
        signUpValues = {...signUpValues, companyName: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'city':
        signUpValues = {...signUpValues, city: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'regNum':
        signUpValues = {...signUpValues, RGNumber: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'accountName':
        signUpValues = {...signUpValues, accountName: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'accountNumber':
        signUpValues = {...signUpValues, accountNumber: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'bankName':
        signUpValues = {...signUpValues, bankName: text}
        dispatch(signUpData(signUpValues))
        break;
      default:
        break;
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (validateMobile(state.userData.dispalyMobile) === false) {
        setErrorMobile('Please enter a valid mobile number')
        return;
      } else {
        setErrorMobile(null)
      }
      
      if (validateEmail(state.userData.email) === false) {
        setErrorEmail('Please enter a valid email')
        return;
      } else {
        setErrorEmail(null)
      }
      
      if (validatePassword(state.userData.password) === false) {
        setErrorPassword('Password must be atleast 6 letters containing number, uppercase and lower case')
        return;
      } else {
        setErrorPassword(null)
      }
    }

    if (step === 2) {
      if (validateName(state.userData.companyName) === false) {
        setErrorCompanyName('Please enter a valid company name');
        return;
      } else {
        setErrorCompanyName(null)
      }

      if (validateName(state.userData.city) === false) {
        setErrorCity('Please enter a valid city');
        return;
      } else {
        setErrorCity(null)
      }

      if (validateName(state.userData.RGNumber) === false) {
        setErrorRGNum('Please enter a valid reg number');
        return;
      } else {
        setErrorRGNum(null)
      }
    }

    setStep(step + 1)
  }

  const handleSignUp = () => {
    if (validateName(state.userData.accountName) === false) {
      setErrorAccountName('Please enter a valid account name');
      return;
    } else {
      setErrorAccountName(null)
    }

    if (validateAccountNum(state.userData.accountNumber) === false) {
      setErrorAccountNumber('Please enter a valid account number');
      return;
    } else {
      setErrorAccountNumber(null)
    }

    if (validateName(state.userData.bankName) === false) {
      setErrorBankName('Please enter a valid Bank name');
      return;
    } else {
      setErrorBankName(null)
    }

    let data = {
      fleetOwner: true,
      details: state.userData
    }

    dispatch(signUp(data))
    // navigation.navigate('RegSuccessful');
  }

  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => backAction() }}
        middleComponent={{ title: 'Sign Up', color: colors.text.white }}
      />
      {step !== 1 && (
        <View style={styles.stepContainer}>
          {STEP_LENGTH.map((value, index) => {
            return (
              <View key={`${index}-Indicator`} style={styles.stepContainerInner}>
                <Step backgroundColor={index < step ? colors.mainColor : colors.text.grey} step={index + 1} />
                {index != STEP_LENGTH.length - 1 ? <View style={{width:wp(40), borderBottomColor: colors.borderGrey, borderBottomWidth: wp(1)}} /> : null}
              </View>
            )
          })}
        </View>
      )}
      <ScrollView style={styles.formContainer} keyboardShouldPersistTaps={'handled'}>
        {step === 1 ? (
          <StepOne
            onPressNext={() => handleNext()}
            mobileValue={state.userData.dispalyMobile}
            onMobileValueChange={(text) => handleTextValueChange('mobile', text)}
            emailValue={state.userData.email}
            onEmailValueChange={(text) => handleTextValueChange('email', text)}
            passwordValue={state.userData.password}
            onPasswordValueChange={(text) => handleTextValueChange('password', text)}
            onPressIndividualSignup={() => navigation.navigate('RiderSignUp')}
            onPressTermsCheck={() => setTermsChecked(!termsChecked)}
            termsChecked={termsChecked}
            errorMobile={errorMobile}
            errorEmail={errorEmail}
            errorPassword={errorPassword}
            disabled={stepOneBtnDisabled}
          />
        ) : step === 2 ? (
          <StepTwo onPressNext={() => handleNext()}
            companyValue={state.userData.companyName}
            onCompanyValueChange={(text) => handleTextValueChange('companyName', text)}
            cityValue={state.userData.city}
            onCityValueChange={(text) => handleTextValueChange('city', text)}
            regNumValue={state.userData.RGNumber}
            onRegNumValueChange={(text) => handleTextValueChange('regNum', text)}
            errorCompanyName={errorCompanyName}
            errorCity={errorCity}
            errorRGNum={errorRGNum}
            disabled={stepTwoBtnDisabled}
          />
        ) : step === 3 && (
          <StepThree
            onPressNext={() => handleSignUp()}
            loading={state.loading}
            accountNameValue={state.userData.accountName}
            onChangeAccountName={(text) => handleTextValueChange('accountName', text)}
            accountNumberValue={state.userData.accountNumber}
            onChangeAccountNumber={(text) => handleTextValueChange('accountNumber', text)}
            bankNameValue={state.userData.bankName}
            onChangebankName={(text) => handleTextValueChange('bankName', text)}
            errorAccountName={errorAccountName}
            errorAccountNumber={errorAccountNumber}
            errorBankName={errorBankName}
            disabled={stepThreeBtnDisabled}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: wp(360),
    height: hp(720),
    paddingBottom: hp(15),
    backgroundColor: colors.blackBg,
  },
  stepContainer: {
    flexDirection: 'row',
    marginTop: hp(6),
    marginBottom: hp(6),
  },
  stepContainerInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    width: wp(360),
    // marginTop: hp(33),
  },
})

export default FleetOwnerSignup;
