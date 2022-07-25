import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

function ConfirmPickup({ onPressConfirmPickup }) {
  return (
    <View style={styles.main}>
      <View style={styles.formContainer}>
        <Input
          iconName={'location'}
          iconColor={colors.text.black}
          placeholder={'Your Location'}
          textColor={colors.text.black}
          width={wp(335)}
          paddingLeft={wp(17.5)}
          editable={false}
          style={{elevation: 2}}
        />
        <Input
          iconName={'navigate'}
          iconColor={colors.text.black}
          placeholder={'Destination Please?'}
          textColor={colors.text.black}
          marginTop={hp(8)}
          width={wp(335)}
          paddingLeft={wp(17.5)}
          editable={false}
          style={{elevation: 2}}
        />
        <Input
          iconName={'chatbox'}
          iconColor={colors.text.black}
          placeholder={'Short Description'}
          textColor={colors.text.black}
          marginTop={hp(8)}
          height={hp(84)}
          width={wp(335)}
          paddingLeft={wp(17.5)}
          multiline={true}
          numberOfLines={4}
          textAlignVertical={'top'}
          alignItems={'flex-start'}
          inputMarginTop={wp(10)}
          editable={false}
          style={{elevation: 2}}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button title={'Confirm Pickup'} onPress={onPressConfirmPickup} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: hp(90),
    width: wp(360.5),
    height: hp(720 - 90),
    elevation: 5,
  },
  formContainer: {
    // flex: 1,
    alignItems: 'center',
  },
  btnContainer: {
    // alignItems: 'center',
    marginTop: hp(370),
  },
})

export default ConfirmPickup;
