import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';

function StepTwo({
  onPressNext,
  onCompanyValueChange,
  companyValue,
  onCityValueChange,
  cityValue,
  onRegNumValueChange,
  regNumValue,
  disabled,
  errorCompanyName,
  errorCity,
  errorRGNum,
}) {
  return (
    <View>
          <View style={styles.form}>
            <Input
              backgroundColor={colors.white}
              iconColor={colors.text.grey} placeholder={'Company Name'}
              onChangeText={onCompanyValueChange}
              value={companyValue}
            />
            {errorCompanyName && <Text style={styles.errorHint}>{errorCompanyName}</Text>}
            <Input
              backgroundColor={colors.white}
              iconColor={colors.text.grey}
              placeholder={'City'}
              marginTop={hp(20)}
              onChangeText={onCityValueChange}
              value={cityValue}
            />
            {errorCity && <Text style={styles.errorHint}>{errorCity}</Text>}
            <Input
              backgroundColor={colors.white}
              iconColor={colors.text.grey}
              placeholder={'REG Num'}
              marginTop={hp(20)}
              onChangeText={onRegNumValueChange}
              value={regNumValue}
            />
            {errorRGNum && <Text style={styles.errorHint}>{errorRGNum}</Text>}
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

export default StepTwo;
