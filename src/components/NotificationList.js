import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';

function NotificationList({ title, body, onPress, width = wp(335) }) {
  return (
    <TouchableHighlight onPress={onPress} disabled={true}>
      <View style={styles.main}>
        <View style={[styles.notificationTop, {width}]}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View>
            {/* <Ionicons name={'chevron-forward'} size={hp(18)} color={colors.text.white} /> */}
          </View>
        </View>
        <View>
          <Text style={styles.body} numberOfLines={2}>{body}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  main: {
    width: wp(335),
    marginTop:hp(8.75),
    marginBottom:hp(13)
  },
  notificationTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(335),
  },
  textContainer: {

  },
  text: {
    fontSize: wp(14),
    fontWeight: '700',
    color: colors.text.white,
    textTransform: 'capitalize',
  },
  body: {
    fontSize: wp(12),
    color: colors.text.white,
  }
})

export default NotificationList;
