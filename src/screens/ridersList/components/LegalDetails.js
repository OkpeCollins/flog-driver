import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function LegalDetails({
  onPressNext,
  riderCardValue,
  onRiderCardValueChange,
  errorRiderCard,
  disabled,
  onPressFleetOwnerSignup,
}) {
  return (
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Legal Details</Text>
          <Text style={styles.desc}>Riders card and temporary riders card are accepted</Text>
        </View>
      <View style={styles.form}>
        <View style={{width: wp(360), paddingHorizontal: wp(21)}}>
          <Text style={styles.formInfoGreen}>Riders card number</Text>
        </View>
          <Input
            backgroundColor={colors.white}
            iconColor={colors.text.grey} placeholder={'AB23DH533'}
            marginTop={hp(5)}
            onChangeText={onRiderCardValueChange}
            value={riderCardValue}
          />
        {errorRiderCard && <Text style={styles.errorHint}>{errorRiderCard}</Text>}
        </View>
        <View style={styles.btnContainer}>
          <Button title={'Next'} onPress={onPressNext} disabled={disabled} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    // flex: 0.1,
    width: wp(360),
    marginTop: hp(117),
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
    marginTop: hp(149),
    width: wp(360),
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
    marginTop: hp(16),
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

export default React.memo(LegalDetails);
