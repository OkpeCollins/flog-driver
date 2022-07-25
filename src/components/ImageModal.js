import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity, TouchableNativeFeedback, BackHandler } from 'react-native';
import Header from './Header';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { hideDoc } from '../screens/ridersList/actions/riderList.actions';

function ImageModal() {
  const dispatch = useDispatch();
  const showDocModal = useSelector(state => state.riderList.showDocModal);
  const imageData = useSelector(state => state.riderList.imageData);

  const handleClose = () => {
    dispatch(hideDoc())
  }

  console.log(imageData)

  let mimeType = imageData.mimeType && imageData.mimeType.replace('&#x2F;', '/')
  let imageValue = imageData.mimeType && imageData.value.replace(/&#x2F;/g, '/')

  return (
    <Modal
      animationIn={'bounceIn'}
      animationOut={'bounceOut'}
      isVisible={showDocModal}
      // swipeThreshold={50}
      onSwipeComplete={() => handleClose()}
      swipeDirection={["left", 'up', 'down', 'right']}
      onBackButtonPress={() => handleClose()}
      useNativeDriver
      backdropColor={`${colors.blackBg}ff`}
      >
      <View style={styles.main}>
        <TouchableOpacity onPress={() => handleClose()}>
          <View style={styles.closeBtn}>
            <Ionicons name={'close'} size={wp(35)} color={colors.text.white} />
          </View>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri:`data:${mimeType};base64,${imageValue}`}} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{imageData.name}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    // alignItems: 'center',
    // width: wp(360),
    height: hp(720),
    // backgroundColor: colors.blackBg,
  },
  closeBtn: {
    alignItems: 'flex-end',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: wp(360),
    resizeMode: 'contain'
  },
  textContainer: {
    flex: 0.05,
    alignItems: 'center'
  },
  title: {
    fontSize: wp(18),
    fontWeight: '700',
    color: colors.text.white,
  },
})

export default ImageModal;
