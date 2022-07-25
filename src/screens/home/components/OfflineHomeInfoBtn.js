import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function OfflineHomeInfoBtn({onPress, pressAble, title, midText, iconName, iconColor}) {
  return (
    <TouchableNativeFeedback onPress={onPress} disabled={!pressAble}>
      <View style={[styles.infoContainer]}>
        <View style={[styles.leftContainer]}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.midContainer}>
          <Text style={styles.midText}>{midText}</Text>
          {iconName && (
            <Ionicons name={iconName} size={wp(10)} color={iconColor} />
          )}
        </View>
        <View style={styles.smallTitleContainer}>
          {pressAble ? (
            <>
            <Text style={styles.smallTitle}>{title}</Text>
              <Ionicons name={'chevron-forward'} color={colors.text.white} size={hp(18)} />
            </>
          ) : null}       
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.offlineScreenGrey,
    paddingHorizontal: hp(20),
    marginTop: hp(8),
    height: hp(45),
    width: wp(360)
  },
  leftContainer: {
    flex: 1,
  },
  midContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.text.white,
    fontSize: wp(14),
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  midText: {
    fontSize: wp(16),
    fontWeight: '700',
    color: colors.mainColor,
  },
  smallTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  smallTitle: {
    color: colors.text.white,
    fontSize: wp(10),
    fontWeight: '300',
    textTransform: 'capitalize',
  },
})

export default OfflineHomeInfoBtn;
