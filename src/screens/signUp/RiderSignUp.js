import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity, TouchableNativeFeedback, BackHandler, ToastAndroid } from 'react-native';
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
import StepOne from './components/rideSteps/StepOne';
import StepTwo from './components/rideSteps/StepTwo';
import StepThree from './components/rideSteps/StepThree';
import StepFour from './components/rideSteps/StepFour';
import StepFive from './components/rideSteps/StepFive';
import StepSix from './components/rideSteps/StepSix';
import Step from './components/Step';
import { validateEmail, validateMobile, validateName, validatePassword, validateLicensePlate, validateAccountNum } from '../../services/validation.service';

const STEP_LENGTH = new Array(6).fill(false);

function RiderSignUp({ navigation }) {
  const [step, setStep] = React.useState(1);
  const [termsChecked, setTermsChecked] = React.useState(false);
  
  const [stepOneBtnDisabled, setStepOneBtnDisabled] = React.useState(true);
  const [stepTwoBtnDisabled, setStepTwoBtnDisabled] = React.useState(true);
  const [stepThreeBtnDisabled, setStepThreeBtnDisabled] = React.useState(true);
  const [stepFourBtnDisabled, setStepFourBtnDisabled] = React.useState(true);
  const [stepFiveBtnDisabled, setStepFiveBtnDisabled] = React.useState(true);
  const [stepSixBtnDisabled, setStepSixBtnDisabled] = React.useState(true);
  const [triggerForm, setTriggerForm] = React.useState(true);
  
  //error states step one
  const [errorMobile, setErrorMobile] = React.useState(null);
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [errorPassword, setErrorPassword] = React.useState(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = React.useState(null);

  //error states step two
  const [errorFullName, setErrorFullName] = React.useState(null);
  const [errorBikeManufacturer, setErrorBikeManufacturer] = React.useState(null);
  const [errorBikeType, setErrorBikeType] = React.useState(null);
  const [errorLicensePlate, setErrorLicensePlate] = React.useState(null);
  const [errorBikeColor, setErrorBikeColor] = React.useState(null);

  //error states step three
  const [errorRiderCard, setErrorRiderCard] = React.useState(null);

  //error states step four
  const [errorRiderCardDetails, setErrorRiderCardDetails] = React.useState(null);
  const [errorRiderCards, setErrorRiderCards] = React.useState(null);

  //error states step five
  const [errorGuarantorName, setErrorGuarantorName] = React.useState(null);
  const [errorGuarantorMobile, setErrorGuarantorMobile] = React.useState(null);
  const [errorGuarantorAddress, setErrorGuarantorAddress] = React.useState(null);
  const [errorGuarantorOccupation, setErrorGuarantorOccupation] = React.useState(null);
  const [errorRelationship, setErrorRelationship] = React.useState(null);
  const [errorGuarantorPhotoId, setErrorGuarantorPhotoId] = React.useState(null);

  //error states step six
  const [errorAccountName, setErrorAccountName] = React.useState(null);
  const [errorAccountNumber, setErrorAccountNumber] = React.useState(null);
  const [errorBankName, setErrorBankName] = React.useState(null);

  const state = useSelector(state => state.signUp);
  const dispatch = useDispatch()

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [step]);

  // React.useEffect(() => {
  //   setTriggerForm(Math.random())
  // }, [step]);

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
    if (state.userData.fullName === undefined &&
      state.userData.bikeManufacturer === undefined &&
      state.userData.bikeType === undefined &&
      state.userData.licensePlate === undefined &&
      state.userData.bikeColor === undefined
      ) {
      setStepTwoBtnDisabled(true)
    } else {
      setStepTwoBtnDisabled(false)
    }
  }, [state.userData.fullName, state.userData.bikeManufacturer, state.userData.bikeType, state.userData.licensePlate, state.userData.bikeColor])

  React.useEffect(() => {
    if (state.userData.riderDriverLicense === undefined) {
      setStepThreeBtnDisabled(true)
    } else {
      setStepThreeBtnDisabled(false)
    }
  }, [state.userData.riderDriverLicense])

  React.useEffect(() => {
    if (state.userData.guarantorName === undefined &&
      state.userData.guarantorMobile === undefined &&
      state.userData.guarantorAddress === undefined &&
      state.userData.guarantorOccupation === undefined &&
      state.userData.guarantorRelationship === undefined &&
      state.userData.guarantorPhotoValue === undefined
      ) {
      setStepFiveBtnDisabled(true)
    } else {
      setStepFiveBtnDisabled(false)
    }
  }, [state.userData.guarantorName, state.userData.guarantorMobile, state.userData.guarantorAddress, state.userData.guarantorOccupation, state.userData.guarantorRelationship, state.userData.guarantorPhotoValue])

  React.useEffect(() => {
    if (state.userData.accountName === undefined || state.userData.accountNumber === undefined || state.userData.bankName === undefined) {
      setStepSixBtnDisabled(true)
    } else {
      setStepSixBtnDisabled(false)
    }
  }, [state.userData.accountName, state.userData.accountNumber, state.userData.bankName])

  const handleTextValueChange = (type, text) => {
    let signUpValues = state.userData;
    switch (type) {
      case 'mobile':
        let formattedMobile = parseInt(text);
        formattedMobile = `+234${formattedMobile}`;
        signUpValues = { ...signUpValues, dispalyMobile: text, mobile: formattedMobile };
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
      case 'confirmPassword':
        signUpValues = {...signUpValues, confirmPassword: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'fullName':
        signUpValues = {...signUpValues, fullName: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'bikeManufacturer':
        signUpValues = {...signUpValues, bikeManufacturer: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'bikeType':
        signUpValues = {...signUpValues, bikeType: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'licensePlate':
        signUpValues = {...signUpValues, licensePlate: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'bikeColor':
        signUpValues = {...signUpValues, bikeColor: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'riderCard':
        signUpValues = {...signUpValues, riderDriverLicense: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'guarantorName':
        signUpValues = {...signUpValues, guarantorName: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'guarantorMobile':
        let newMobile = parseInt(text);
        newMobile = `+234${newMobile}`;
        signUpValues = { ...signUpValues, guarantorDispalyMobile: text, guarantorMobile: newMobile };
        dispatch(signUpData(signUpValues))
        break;
      case 'guarantorAddress':
        signUpValues = {...signUpValues, guarantorAddress: text}
        dispatch(signUpData(signUpValues))
        break;
      case 'guarantorOccupation':
        signUpValues = {...signUpValues, guarantorOccupation: text}
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
      
      if (state.userData.password !== state.userData.confirmPassword) {
        setErrorConfirmPassword('Confirm password must be the same with your password')
        return;
      } else {
        setErrorConfirmPassword(null)
      }
    }
  
    if (step === 2) {
      if (validateName(state.userData.fullName) === false) {
        setErrorFullName('Full name must be more than three character');
        return;
      } else {
        setErrorFullName(null)
      }
      
      if (validateName(state.userData.bikeManufacturer) === false) {
        setErrorBikeManufacturer('Please enter a valid bike manufacturer');
        return;
      } else {
        setErrorBikeManufacturer(null)
      }
      
      if (validateName(state.userData.bikeType) === false) {
        setErrorBikeType('please enter a valid bike type');
        return;
      } else {
        setErrorBikeType(null)
      }
      
      if (state.userData.licensePlate === null) {
        setErrorLicensePlate('please enter a valid Licences plate');
        return;
      } else {
        setErrorLicensePlate(null)
      }

    }

    if (step === 3) {
      if (validateName(state.userData.riderDriverLicense) === false) {
        setErrorRiderCard('Enter a valid driver license card number');
        return;
      } else {
        setErrorRiderCard(null)
      }
    }

    if (step === 4) {
      if (state.userData.riderCardDay === undefined || state.userData.riderCardMonth === undefined || state.userData.riderCardYear === undefined) {
        setErrorRiderCardDetails('Please update your card details');
        return;
      } else {
        setErrorRiderCardDetails(null)
      }

      if (state.userData.localGovernmentPaperValue === undefined || state.userData.bikePaperValue === undefined) {
        setErrorRiderCards('Please upload all the files below they are neccesary for your verification');
        return;
      } else {
        setErrorRiderCard(null)
      }
    }

    if (step === 5) {
      if (validateName(state.userData.guarantorName) === false) {
        setErrorGuarantorName(`Guanrantor's name must be more than three character`);
        return;
      } else {
        setErrorGuarantorName(null)
      }
      
      if (validateMobile(state.userData.guarantorDispalyMobile) === false) {
        setErrorGuarantorMobile('Please enter a valid mobile number');
        return;
      } else {
        setErrorGuarantorMobile(null)
      }
      
      if (validateName(state.userData.guarantorAddress) === false) {
        setErrorGuarantorAddress('please enter a valid Address');
        return;
      } else {
        setErrorGuarantorAddress(null)
      }
      
      if (validateName(state.userData.guarantorOccupation) === false) {
        setErrorGuarantorOccupation('please enter a occupation title');
        return;
      } else {
        setErrorGuarantorOccupation(null)
      }
      
      if (validateName(state.userData.guarantorRelationship) === false) {
        setErrorRelationship('please select a relationship');
        return;
      } else {
        setErrorRelationship(null)
      }
      
      if (state.userData.guarantorPhotoValue === undefined) {
        setErrorGuarantorPhotoId(`please upload guarantor's photo Id`);
        return;
      } else {
        setErrorGuarantorPhotoId(null)
      }

    }

    setStep(step + 1)
  }

  const backAction = () => {
    if (step === 1) {
      navigation.goBack()
    } else {
      setStep(step - 1)
    }
    return true;
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
      setErrorBankName('Please enter a valid account number');
      return;
    } else {
      setErrorBankName(null)
    }

    let data = {
      fleetOwner: false,
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
      <ScrollView style={styles.formContainer} keyboardShouldPersistTaps={'handled'} nestedScrollEnabled={true} >
        {step === 1 ? (
          <StepOne
            onPressNext={() => handleNext()}
            mobileValue={state.userData.dispalyMobile}
            onMobileValueChange={(text) => handleTextValueChange('mobile', text)}
            emailValue={state.userData.email}
            onEmailValueChange={(text) => handleTextValueChange('email', text)}
            passwordValue={state.userData.password}
            onPasswordValueChange={(text) => handleTextValueChange('password', text)}
            confirmPasswordValue={state.userData.confirmPassword}
            onConfirmPasswordValueChange={(text) => handleTextValueChange('confirmPassword', text)}
            onPressFleetOwnerSignup={() => navigation.navigate('FleetOwnerSignup')}
            disabled={stepOneBtnDisabled}
            onPressTermsCheck={() => setTermsChecked(!termsChecked)}
            termsChecked={termsChecked}
            errorMobile={errorMobile}
            errorEmail={errorEmail}
            errorPassword={errorPassword}
            errorConfirmPassword={errorConfirmPassword}
          />
        ) : step === 2 ? (
          <StepTwo onPressNext={() => handleNext()}
            nameValue={state.userData.fullName}
            onNameValueChange={(text) => handleTextValueChange('fullName', text)}
            bikeManufacturerValue={state.userData.bikeManufacturer}
            onBikeManufacturerValueChange={(text) => handleTextValueChange('bikeManufacturer', text)}
            bikeTypeValue={state.userData.bikeType}
            onBikeTypeValueChange={(text) => handleTextValueChange('bikeType', text)}
            licensePlateValue={state.userData.licensePlate}
            onLicensePlateValueChange={(text) => handleTextValueChange('licensePlate', text)}
            bikeColorValue={state.userData.bikeColor}
            onBikeColorValueChange={(text) => handleTextValueChange('bikeColor', text)}
            onPressFleetOwnerSignup={() => navigation.navigate('FleetOwnerSignup')}
            disabled={stepTwoBtnDisabled}
            errorFullName={errorFullName}
            errorBikeManufacturer={errorBikeManufacturer}
            errorBikeType={errorBikeType}
            errorLicensePlate={errorLicensePlate}
            errorBikeColor={errorBikeColor}
          />
        ) : step === 3 ? (
          <StepThree
            onPressNext={() => handleNext()}
            riderCardValue={state.userData.riderDriverLicense}
            onRiderCardValueChange={(text) => handleTextValueChange('riderCard', text)}
            onPressFleetOwnerSignup={() => navigation.navigate('FleetOwnerSignup')}
            disabled={stepThreeBtnDisabled}
            errorRiderCard={errorRiderCard}
          />
        ) : step === 4 ? (
          <StepFour
            onPressNext={() => handleNext()}
            errorRiderCardDetails={errorRiderCardDetails}
            errorRiderCards={errorRiderCards}
          />
        ) : step === 5 ? (
          <StepFive
            onPressNext={() => handleNext()}
            disabled={stepFiveBtnDisabled}
            onGuarantorNameValueChange={(text) => handleTextValueChange('guarantorName', text)}
            onGuarantorMobileValueChange={(text) => handleTextValueChange('guarantorMobile', text)}
            onGuarantorAddressValueChange={(text) => handleTextValueChange('guarantorAddress', text)}
            onGuarantorOccupationValueChange={(text) => handleTextValueChange('guarantorOccupation', text)}
            guarantorNameValue={state.userData.guarantorName}
            guarantorMobileValue={state.userData.guarantorDispalyMobile}
            guarantorAddressValue={state.userData.guarantorAddress}
            guarantorOccupationValue={state.userData.guarantorOccupation}
            relationshipValue={state.userData.guarantorRelationship}
            errorGuarantorName={errorGuarantorName}
            errorGuarantorMobile={errorGuarantorMobile}
            errorGuarantorAddress={errorGuarantorAddress}
            errorGuarantorOccupation={errorGuarantorOccupation}
            errorRelationship={errorRelationship}
            errorGuarantorPhotoId={errorGuarantorPhotoId}
          />
        ) : step === 6 && (
          <StepSix
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
            disabled={stepSixBtnDisabled}
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
  },
})

export default RiderSignUp;
