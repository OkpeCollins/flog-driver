import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import { hp, wp } from '../constants/dimension';

function Prompt() {
  return (
    <Modal style={styles.main}>
      <Text>Prompt</Text>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    width: wp(300),
    height: hp(163),
  },
})

export default Prompt;
