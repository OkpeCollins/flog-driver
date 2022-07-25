import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function DriverListView({mimeType, imageValue, name, email, date, onPress}) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <View style={styles.imagebase}>
            <Image source={{uri:`data:${mimeType};base64,${imageValue}`}} style={styles.userImage} />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.mainInfo}>{email}</Text>
            <Text style={styles.otherInfo}>created at {date}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    // width: wp(360),
    marginHorizontal: wp(20),
  },
  imageContainer: {
    height: hp(41),
    width: wp(41),
    marginRight: wp(18),
  },
  imagebase: {
    height: hp(41),
    width: wp(41),
    backgroundColor: '#e2e2e2',
    borderRadius: wp(41) / 2,
    overflow: 'hidden',
  },
  userImage: {
    width: wp(41),
    height: wp(41),
  },
  detailsContainer: {
    flex: 1,
  },
  nameContainer: {

  },
  name: {
    fontSize: wp(14),
    color: colors.text.white,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(5),
  },
  mainInfo: {
    fontSize: wp(9),
    color: colors.mainColor,
  },
  otherInfo: {
    fontSize: wp(9),
    color: colors.text.grey,
  },
})

export default DriverListView;
