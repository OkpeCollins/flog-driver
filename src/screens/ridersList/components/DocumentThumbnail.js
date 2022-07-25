import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function DocumentThumbnail({ mimeType, imageValue, title, onPress }) {
  return (
    <View style={styles.main}>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.thumbnail}>
          <Image
            source={{ uri: `data:${mimeType};base64,${imageValue}` }}
            style={styles.image}
          />
          <LinearGradient style={styles.linearGradient} colors={[ 'transparent', 'rgba(0,0,0, 0.2)', 'rgba(0,0,0, 0.6)',]} />
        </View>
      </TouchableHighlight>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: wp(35),
    width: wp(317),
    // height: hp(111),
  },
  thumbnail: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(150),
    height: hp(111),
    borderRadius: wp(10),
    overflow: 'hidden',
    backgroundColor: colors.darkerGrey
  },
  image: {
    width: wp(150),
    height: wp(120),
    // borderRadius: wp(10),
    resizeMode: 'cover',
  },
  linearGradient: {
    position: 'absolute',
    width: wp(150),
    height: hp(111),
    // borderRadius: wp(10),
  },
  statTitle: {
    fontSize: wp(14),
    fontWeight: '500',
    marginTop: hp(17),
    color: colors.text.grey,
    textTransform: 'capitalize',
  },
})

export default DocumentThumbnail;
