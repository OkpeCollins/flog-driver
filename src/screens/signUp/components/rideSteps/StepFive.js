import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, FlatList} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import RegSelector from '../../../../components/RegSelector';
import SupportOptSeperator from '../../../../components/SupportOptSeperator';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';
import { fileUploadData } from '../../../../constants/staticData';
import UploadFileList from '../UploadFileList';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, signUpData } from '../../actions/signUp.actions';
import DayModal from '../DayModal';
import RegModal from '../RegModal';

function StepFive({
  onPressNext,
  disabled,
  onGuarantorNameValueChange,
  guarantorNameValue,
  errorGuarantorName,
  errorGuarantorPhotoId,
  onGuarantorMobileValueChange,
  guarantorMobileValue,
  errorGuarantorMobile,
  onGuarantorAddressValueChange,
  guarantorAddressValue,
  errorGuarantorAddress,
  onGuarantorOccupationValueChange,
  guarantorOccupationValue,
  errorGuarantorOccupation,
  relationshipValue,
  errorRelationship,
}) {
  const [uploadList, setUploadList] = React.useState({localGovernmentPaper: false, bikePaper: false, profilePhoto: false});
  const state = useSelector(state => state.signUp);
  const dispatch = useDispatch()

  const handleFileUpload = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    })
      .then((response) => {
        let mimeType = response.base64[0] === '/' ? 'image/jpg' : 'image/png';
        let signUpValues = state.userData;
        signUpValues = {...signUpValues, guarantorPhotoValue: response.base64, guarantorPhotoMimeType: mimeType}
        dispatch(signUpData(signUpValues))
      })
    .catch(error => console.log(error))
  }

  const handleDate = (type) => {
    dispatch(showModal(type))
  }

  const handleDone = (type) => {
    switch (type) {
      case 'localGovernmentPaper':
        if (state.userData.localGovernmentPaper) {
          return true
        }
      case 'bikePaper':
        signUpValues = {...signUpValues, bikePaperValue: response.base64, bikePaperMimeType: 'image/jpeg;base64'}
        dispatch(signUpData(signUpValues))
        break;
      case 'profilePhoto':
        signUpValues = {...signUpValues, profilePhotoValue: response.base64, profilePhotoMimeType: 'image/jpeg;base64'}
        dispatch(signUpData(signUpValues))
        break;
      default:
        break;
    }
  }

  return (
    <View>
      <RegModal/>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Guarantor's Details</Text>
        {/* <Text style={styles.desc}>We are legally required to ask you for some documents to sign up as a rider.</Text> */}
      </View>
      <View style={styles.form}>
        <Input
          backgroundColor={colors.white} iconName={'person-outline'}
          iconColor={colors.text.grey} placeholder={`Full Name`}
          onChangeText={onGuarantorNameValueChange}
          value={guarantorNameValue}
        />
        {errorGuarantorName && <Text style={styles.errorHint}>{errorGuarantorName}</Text>}
        <Input
          backgroundColor={colors.white} iconName={'call-outline'}
          iconColor={colors.text.grey} placeholder={`Phone Number`}
          marginTop={hp(20)}
          keyboardType={'numeric'}
          onChangeText={onGuarantorMobileValueChange}
          value={guarantorMobileValue}
        />
        {errorGuarantorMobile && <Text style={styles.errorHint}>{errorGuarantorMobile}</Text>}
        <Input
          backgroundColor={colors.white} iconName={'home-outline'}
          iconColor={colors.text.grey} placeholder={`Residential Address`}
          marginTop={hp(20)}
          // textColor={colors.text.black}
          height={hp(84)}
          // width={wp(335)}
          paddingLeft={wp(17.5)}
          multiline={true}
          numberOfLines={4}
          textAlignVertical={'top'}
          alignItems={'flex-start'}
          inputMarginTop={wp(10)}
          onChangeText={onGuarantorAddressValueChange}
          value={guarantorAddressValue}
        />
        {errorGuarantorAddress && <Text style={styles.errorHint}>{errorGuarantorAddress}</Text>}
        <Input
          backgroundColor={colors.white} iconName={'ios-business-outline'}
          iconColor={colors.text.grey} placeholder={`Occupation`}
          marginTop={hp(20)}
          onChangeText={onGuarantorOccupationValueChange}
          value={guarantorOccupationValue}
        />
        {errorGuarantorOccupation && <Text style={styles.errorHint}>{errorGuarantorOccupation}</Text>}
        <TouchableNativeFeedback onPress={() => dispatch(showModal('guarantorRelationship'))}>
          <View style={styles.optionView}>
            <Text style={styles.optionViewText}>{relationshipValue ? relationshipValue : 'Relationship'}</Text>
          </View>
        </TouchableNativeFeedback>
        {errorRelationship && <Text style={styles.errorHint}>{errorRelationship}</Text>}
        <View style={styles.cardDetailsBottom}>
          <UploadFileList title={`Guarantor's Photo Id`} onPress={() => handleFileUpload()} data={{type: 'guarantorPhotoId'}} />
        </View>
        {errorGuarantorPhotoId && <Text style={styles.errorHint}>{errorGuarantorPhotoId}</Text>}
        <View style={{marginTop: hp(26)}}>
          <Button
            width={wp(103)}
            height={32}
            title={'Next'}
            fontSize={hp(10)}
            fontWeight={'700'}
            borderRadius={wp(10)}
            onPress={onPressNext}
            disabled={disabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    // flex: 0.1,
    width: wp(360),
    marginTop: hp(16),
    paddingHorizontal: wp(48),
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
    fontSize: wp(12),
    fontWeight: '400',
    color: colors.mainColor,
    textAlign: 'left',
  },
  form: {
    alignItems: 'center',
    marginTop: hp(26),
    width: wp(360),
    paddingBottom: hp(10),
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(6),
    marginTop: hp(20),
    backgroundColor: colors.white,
    height: hp(48),
    width: wp(315),
    paddingLeft: wp(21.5),
    paddingRight: wp(21.5),
  },
  optionViewText: {
    flex: 1,
    color: colors.text.grey,
    textTransform: 'capitalize',
    alignItems: 'flex-start',
    marginLeft: wp(13.5),
    fontSize: wp(16),
    fontWeight: '300',
    textAlign: 'left',
  },
  cardDetailsContainer: {
    alignItems: 'center',
    width: wp(279),
    height: hp(224),
    borderRadius: wp(10),
    borderColor: colors.white,
    borderWidth: hp(1),
    paddingTop: hp(13),
    paddingLeft: hp(16),
    paddingRight: hp(23),
    marginTop: hp(16),
  },
  errorHint: {
    alignSelf: 'flex-start',
    marginLeft: wp(21),
    marginRight: wp(21),
    marginTop: wp(5),
    fontSize: wp(14),
    color: colors.text.lightGrey,
  },
  cardDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardDetailsContent: {
    marginTop: hp(8),
  },
  cardDetailsBottom: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(16),
    backgroundColor: colors.contentHeader,
    width: wp(321),
    height: hp(48),
    borderRadius: wp(15),
  },
  btnContainer: {
    marginTop: hp(8)
  },
})

export default React.memo(StepFive);
