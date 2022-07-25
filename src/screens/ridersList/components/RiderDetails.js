import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { showModal } from '../actions/riderList.actions';
import RegModal from './RegModal';

function RiderDetails({
  onPressNext,
  nameValue,
  onNameValueChange,
  onBikeManufacturerValueChange,
  onPressFleetOwnerSignup,
  bikeManufacturerValue,
  onBikeTypeValueChange,
  bikeTypeValue,
  onLicensePlateValueChange,
  licensePlateValue,
  onBikeColorValueChange,
  bikeColorValue,
  disabled,
  errorFullName,
  errorBikeManufacturer,
  errorBikeType,
  errorLicensePlate,
  errorBikeColor,
  mobileValue,
  onMobileValueChange,
  emailValue,
  onEmailValueChange,
  passwordValue,
  onPasswordValueChange,
  errorMobile,
  errorEmail,
  errorPassword,
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  
  const state = useSelector(state => state.signUp);
  const dispatch = useDispatch();

  return (
    <View>
      <RegModal />
      <View style={styles.form}>
        <Input
          backgroundColor={colors.white} iconName={'person'}
          iconColor={colors.text.grey} placeholder={'Full Name'}
          onChangeText={onNameValueChange}
          value={nameValue}
        />
        {errorFullName && <Text style={styles.errorHint}>{errorFullName}</Text>}
        <Input
          backgroundColor={colors.white}
          iconColor={colors.text.grey} placeholder={'Bike Manufacturer'}
          marginTop={hp(20)}
          onChangeText={onBikeManufacturerValueChange}
          value={bikeManufacturerValue}
        />
        {errorBikeManufacturer && <Text style={styles.errorHint}>{errorBikeManufacturer}</Text>}
        <Input
          backgroundColor={colors.white}
          iconColor={colors.text.grey} placeholder={'Bike Type'}
          marginTop={hp(20)}
          onChangeText={onBikeTypeValueChange}
          value={bikeTypeValue}
        />
        {errorBikeType && <Text style={styles.errorHint}>{errorBikeType}</Text>}
        <Input
          backgroundColor={colors.white}
          iconColor={colors.text.grey} placeholder={'License Plate'}
          marginTop={hp(20)}
          onChangeText={onLicensePlateValueChange}
          value={licensePlateValue}
        />
        {errorLicensePlate && <Text style={styles.errorHint}>{errorLicensePlate}</Text>}
        <TouchableNativeFeedback onPress={() => dispatch(showModal('bikeColor'))}>
          <View style={styles.bikeColorView}>
            <Text style={styles.bikeColorViewText}>{bikeColorValue ? bikeColorValue : 'Bike Color'}</Text>
          </View>
        </TouchableNativeFeedback>
        {errorBikeColor && <Text style={styles.errorHint}>{errorBikeColor}</Text>}
        <Input
          backgroundColor={colors.white}
          iconColor={colors.text.grey} placeholder={`Rider's Mobile Number`}
          marginTop={hp(20)}
          keyboardType={'phone-pad'}
          onChangeText={onMobileValueChange}
          value={mobileValue}
        />
        {errorMobile && <Text style={styles.errorHint}>{errorMobile}</Text>}
        <Input
          backgroundColor={colors.white}
          iconColor={colors.text.grey} placeholder={`Rider's email`}
          marginTop={hp(20)}
          onChangeText={onEmailValueChange}
          value={emailValue}
        />
        {errorEmail && <Text style={styles.errorHint}>{errorEmail}</Text>}
        <Input
          backgroundColor={colors.white}
          iconColor={colors.text.grey} placeholder={`Rider's password`}
          marginTop={hp(20)}
          onChangeText={onPasswordValueChange}
          value={passwordValue}
          secureTextEntry
        />
        {errorPassword && <Text style={styles.errorHint}>{errorPassword}</Text>}
      </View>
      <View style={styles.btnContainer}>
        <Button title={'Next'} onPress={onPressNext} disabled={disabled} />
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    marginTop: hp(41),
  },
  bikeColorView: {
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
  bikeColorViewText: {
    flex: 1,
    color: colors.text.grey,
    textTransform: 'capitalize',
    alignItems: 'flex-start',
    marginLeft: wp(13.5),
    fontSize: wp(16),
    fontWeight: '300',
    textAlign: 'left',
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

export default React.memo(RiderDetails);
