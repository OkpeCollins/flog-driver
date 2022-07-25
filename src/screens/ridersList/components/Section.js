import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../../../constants/colors';
import { wp } from '../../../constants/dimension';

function Section({
  children,
  paddingTop,
  paddingBottom,
  paddingVertical = wp(14),
  marginTop,
  title,
  borderRadius = wp(15),
}) {
  const styles = StyleSheet.create({
    main: {
      width: wp(317),
      backgroundColor: colors.contentHeader,
      paddingTop,
      paddingBottom,
      marginTop,
      paddingVertical,
      borderRadius,
    },
    titleContainer: {
      alignItems: 'center',
    },
    title: {
      fontSize: wp(14),
      fontWeight: '700',
      color: colors.text.white,
    },
  })

  return (
    <View style={styles.main}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

export default Section;
