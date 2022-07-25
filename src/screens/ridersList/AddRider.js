import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity, TouchableNativeFeedback, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { showFlashMsg } from '../../redux/rootAction';
import { riderData, addNewRider } from './actions/riderList.actions';
import RiderDetails from './components/RiderDetails';
import LegalDetails from './components/LegalDetails';
import DocumentsUpload from './components/DocumentsUpload';
import { validateEmail, validateLicensePlate, validateMobile, validateName, validatePassword } from '../../services/validation.service';
import Step from '../signUp/components/Step';
import RiderAddedSucess from './components/RiderAddedSucess';

const STEP_LENGTH = new Array(3).fill(false);

function AddRider({navigation}) {
  const [step, setStep] = React.useState(1);
  const [mobileValue, setMobileValue] = React.useState();
  const [termsChecked, setTermsChecked] = React.useState(false);
  
  const [stepOneBtnDisabled, setStepOneBtnDisabled] = React.useState(true);
  const [stepTwoBtnDisabled, setStepTwoBtnDisabled] = React.useState(true);
  const [stepThreeBtnDisabled, setStepThreeBtnDisabled] = React.useState(true);
  
  //error states step one
  const [errorFullName, setErrorFullName] = React.useState(null);
  const [errorBikeManufacturer, setErrorBikeManufacturer] = React.useState(null);
  const [errorBikeType, setErrorBikeType] = React.useState(null);
  const [errorLicensePlate, setErrorLicensePlate] = React.useState(null);
  const [errorBikeColor, setErrorBikeColor] = React.useState(null);
  const [errorMobile, setErrorMobile] = React.useState(null);
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [errorPassword, setErrorPassword] = React.useState(null);

  //error states step two
  const [errorRiderCard, setErrorRiderCard] = React.useState(null);

  //error states step three
  const [errorRiderCardDetails, setErrorRiderCardDetails] = React.useState(null);
  const [errorRiderCards, setErrorRiderCards] = React.useState(null);

  const state = useSelector(state => state.riderList);
  const user = useSelector(state => state.login.user);
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
    if (state.riderData.email !== undefined &&
      state.riderData.dispalyMobile !== undefined &&
      state.riderData.password !== undefined &&
      state.riderData.fullName !== undefined &&
      state.riderData.bikeManufacturer !== undefined &&
      state.riderData.bikeType !== undefined &&
      state.riderData.licensePlate !== undefined &&
      state.riderData.bikeColor !== undefined
    ) {
      setStepOneBtnDisabled(false)
    } else {
      setStepOneBtnDisabled(true)
    }
  }, [state.riderData])

  React.useEffect(() => {
    if (state.riderData.riderDriverLicense !== undefined) {
      setStepTwoBtnDisabled(false)
    } else {
      setStepTwoBtnDisabled(true)
    }
  }, [state.riderData.riderDriverLicense])

  React.useEffect(() => {
    if (state.riderData.accountName === undefined || state.riderData.accountNumber === undefined || state.riderData.bankName === undefined) {
      setStepThreeBtnDisabled(true)
    } else {
      setStepThreeBtnDisabled(false)
    }
  }, [state.riderData.accountName, state.riderData.accountNumber, state.riderData.bankName])

  const handleTextValueChange = (type, text) => {
    let riderDataValues = state.riderData;
    switch (type) {
      case 'fullName':
        riderDataValues = {...riderDataValues, fullName: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'bikeManufacturer':
        riderDataValues = {...riderDataValues, bikeManufacturer: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'bikeType':
        riderDataValues = {...riderDataValues, bikeType: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'licensePlate':
        riderDataValues = {...riderDataValues, licensePlate: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'bikeColor':
        riderDataValues = {...riderDataValues, bikeColor: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'riderCard':
        riderDataValues = {...riderDataValues, riderDriverLicense: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'mobile':
        let formattedMobile = parseInt(text);
        formattedMobile = `+234${formattedMobile}`;
        riderDataValues = { ...riderDataValues, dispalyMobile: text,  mobile: formattedMobile };
        dispatch(riderData(riderDataValues));
        break;
      case 'email':
        riderDataValues = {...riderDataValues, email: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'password':
        riderDataValues = {...riderDataValues, password: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'companyName':
        riderDataValues = {...riderDataValues, companyName: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'city':
        riderDataValues = {...riderDataValues, city: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'regNum':
        riderDataValues = {...riderDataValues, RGNumber: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'accountName':
        riderDataValues = {...riderDataValues, accountName: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'accountNumber':
        riderDataValues = {...riderDataValues, accountNumber: text}
        dispatch(riderData(riderDataValues))
        break;
      case 'bankName':
        riderDataValues = {...riderDataValues, bankName: text}
        dispatch(riderData(riderDataValues))
        break;
      default:
        break;
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (validateName(state.riderData.fullName) === false) {
        setErrorFullName('Full name must be more than three character');
        return;
      } else {
        setErrorFullName(null)
      }
      
      if (validateName(state.riderData.bikeManufacturer) === false) {
        setErrorBikeManufacturer('Please enter a valid bike manufacturer');
        return;
      } else {
        setErrorBikeManufacturer(null)
      }
      
      if (validateName(state.riderData.bikeType) === false) {
        setErrorBikeType('please enter a valid bike type');
        return;
      } else {
        setErrorBikeType(null)
      }
      
      if (validateLicensePlate(state.riderData.licensePlate) === false) {
        setErrorLicensePlate('please enter a valid Licences plate');
        return;
      } else {
        setErrorLicensePlate(null)
      }
      
      if (validateMobile(state.riderData.dispalyMobile) === false) {
        setErrorMobile('Please enter a valid mobile number')
        return;
      } else {
        setErrorMobile(null)
      }
      
      if (validateEmail(state.riderData.email) === false) {
        setErrorEmail('Please enter a valid email')
        return;
      } else {
        setErrorEmail(null)
      }
      
      if (validatePassword(state.riderData.password) === false) {
        setErrorPassword('Password must be atleast 6 letters containing number, uppercase and lower case')
        return;
      } else {
        setErrorPassword(null)
      }
    }

    if (step === 2) {
      if (validateName(state.riderData.riderDriverLicense) === false) {
        setErrorRiderCard('Enter a valid driver license card number');
        return;
      } else {
        setErrorRiderCard(null)
      }
    }

    setStep(step + 1)
  }

  const handleAddRider = () => {
    if (state.riderData.riderCardDay === undefined || state.riderData.riderCardMonth === undefined || state.riderData.riderCardYear === undefined) {
      setErrorRiderCardDetails('Please update your card details');
      return;
    } else {
      setErrorRiderCardDetails(null)
    }

    if (state.riderData.localGovernmentPaperValue === undefined || state.riderData.bikePaperValue === undefined) {
      setErrorRiderCards('Please upload all the files below they are neccesary for your verification');
      return;
    } else {
      setErrorRiderCard(null)
    }

    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      fleetOwner: true,
      details: {...state.riderData, fleetOwnerId: user.id}
    }

    dispatch(addNewRider(data))
    // navigation.navigate('RegSuccessful');
  }

  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => backAction() }}
        middleComponent={{ title: 'Add Rider', color: colors.text.white }}
      />
      <RiderAddedSucess />
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
      <ScrollView style={styles.formContainer} keyboardShouldPersistTaps={'handled'}>
        {step === 1 ? (
          <RiderDetails
            onPressNext={() => handleNext()}
            nameValue={state.riderData.fullName}
            onNameValueChange={(text) => handleTextValueChange('fullName', text)}
            bikeManufacturerValue={state.riderData.bikeManufacturer}
            onBikeManufacturerValueChange={(text) => handleTextValueChange('bikeManufacturer', text)}
            bikeTypeValue={state.riderData.bikeType}
            onBikeTypeValueChange={(text) => handleTextValueChange('bikeType', text)}
            licensePlateValue={state.riderData.licensePlate}
            onLicensePlateValueChange={(text) => handleTextValueChange('licensePlate', text)}
            bikeColorValue={state.riderData.bikeColor}
            onBikeColorValueChange={(text) => handleTextValueChange('bikeColor', text)}
            mobileValue={state.riderData.dispalyMobile}
            onMobileValueChange={(text) => handleTextValueChange('mobile', text)}
            emailValue={state.riderData.email}
            onEmailValueChange={(text) => handleTextValueChange('email', text)}
            passwordValue={state.riderData.password}
            onPasswordValueChange={(text) => handleTextValueChange('password', text)}
            onPressIndividualSignup={() => navigation.navigate('RiderSignUp')}
            errorFullName={errorFullName}
            errorBikeManufacturer={errorBikeManufacturer}
            errorBikeType={errorBikeType}
            errorLicensePlate={errorLicensePlate}
            errorBikeColor={errorBikeColor}
            errorMobile={errorMobile}
            errorEmail={errorEmail}
            errorPassword={errorPassword}
            disabled={stepOneBtnDisabled}
          />
        ) : step === 2 ? (
          <LegalDetails
            onPressNext={() => handleNext()}
            riderCardValue={state.riderData.riderDriverLicense}
            onRiderCardValueChange={(text) => handleTextValueChange('riderCard', text)}
            disabled={stepTwoBtnDisabled}
            errorRiderCard={errorRiderCard}
          />
        ) : step === 3 && (
          <DocumentsUpload
            onPressNext={() => handleAddRider()}
            loading={state.loading}
            errorRiderCardDetails={errorRiderCardDetails}
            errorRiderCards={errorRiderCards}
            // disabled={stepThreeBtnDisabled}
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
    height: hp(720) + StatusBar.currentHeight,
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

export default AddRider;
