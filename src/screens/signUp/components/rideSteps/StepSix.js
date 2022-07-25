import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../../../components/Button';
import RegInput from '../../../../components/RegInput';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';

function StepSix({
  onPressNext,
  accountNameValue,
  onChangeAccountName,
  accountNumberValue,
  onChangeAccountNumber,
  bankNameValue,
  onChangebankName,
  loading,
  errorAccountName,
  errorAccountNumber,
  errorBankName,
  disabled,
}) {
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Payment Details</Text>
        <Text style={styles.desc}>We need your payment details to pay you.</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={{width: wp(240)}}>
          <Text style={styles.formInfoGreen}>Account Name</Text>
        </View>
        <RegInput
          placeholder={'Enter Account Name'}
          marginTop={hp(4)}
          value={accountNameValue}
          onChangeText={onChangeAccountName}
        />
        {errorAccountName && <Text style={styles.errorHint}>{errorAccountName}</Text>}
        <View style={{width: wp(240), marginTop: hp(16)}}>
          <Text style={styles.formInfoGreen}>Account Number</Text>
        </View>
        <RegInput
          placeholder={'Enter Account Number'}
          keyboardType={'numeric'}
          marginTop={hp(4)}
          value={accountNumberValue}
          onChangeText={onChangeAccountNumber}
        />
        {errorAccountNumber && <Text style={styles.errorHint}>{errorAccountNumber}</Text>}
        <View style={{width: wp(240), marginTop: hp(16)}}>
          <Text style={styles.formInfoGreen}>Bank Name</Text>
        </View>
        <RegInput
          placeholder={'Enter Bank Name'}
          marginTop={hp(4)}
          value={bankNameValue}
          onChangeText={onChangebankName}
        />
        {errorBankName && <Text style={styles.errorHint}>{errorBankName}</Text>}
      </View>
      <View style={styles.btnContainer}>
        <Button
          width={wp(103)}
          height={32}
          title={'Finish'}
          fontSize={hp(10)}
          fontWeight={'700'}
          borderRadius={wp(10)}
          onPress={onPressNext}
          loading={loading}
          disabled={disabled}
        />
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
  formContainer: {
    alignItems: 'center',
    marginTop: hp(58),
    width: wp(360),
  },
  errorHint: {
    // alignSelf: 'flex-start',
    // marginLeft: wp(21),
    // marginRight: wp(21),
    width: wp(240),
    marginTop: wp(5),
    fontSize: wp(14),
    color: colors.text.lightGrey,
  },
  formInfoGreen: {
    fontSize: wp(12),
    fontWeight: '400',
    color: colors.mainColor,
    textAlign: 'left',
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: hp(18),
  },
})
export default React.memo(StepSix);
