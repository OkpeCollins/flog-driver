import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { bikeColors, days, guarantorRelationships, months, years } from '../../../constants/staticData';
import { hideModal, signUpData } from '../actions/signUp.actions';
import ListView from './ListView';

function RegModal() {
  const state = useSelector(state => state.signUp);
  const dispatch = useDispatch();

  const handleColorSelection = (data) => {
    let signUpValues = state.userData;
    signUpValues = {...signUpValues, bikeColor: data}
    dispatch(signUpData(signUpValues))
    dispatch(hideModal())
  }

  const handleRelationshipSelection = (data) => {
    let signUpValues = state.userData;
    signUpValues = {...signUpValues, guarantorRelationship: data}
    dispatch(signUpData(signUpValues))
    dispatch(hideModal())
  }

  const onBackdropPress = () => {
    dispatch(hideModal());
  }

  return (
    <Modal
      isVisible={state.isVisible}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      onBackdropPress={() => onBackdropPress()}
      backdropColor={colors.contentHeader}
    >
      <View style={styles.main}>
        <View style={styles.container}>
          {state.modalDataType === 'bikeColor' && (
            <FlatList
              data={bikeColors}
              // style={styles.data}
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              // ItemSeparatorComponent={SupportOptSeperator}
              renderItem={({ item }) => (
                <ListView key={`ID-${item.id}`} title={`${item.color}`} onPress={() => handleColorSelection(item.color)} />
              )}
            />
          )}
          {state.modalDataType === 'guarantorRelationship' && (
            <FlatList
              data={guarantorRelationships}
              keyboardShouldPersistTaps={'handled'}
              // style={styles.data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              // ItemSeparatorComponent={SupportOptSeperator}
              renderItem={({ item }) => (
                <ListView key={`ID-${item.id}`} title={`${item.relationship}`} onPress={() => handleRelationshipSelection(item.relationship)} />
              )}
            />
          )}            
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
  },
  container: {
    width: wp(279),
    height: hp(300),
    borderRadius: hp(5),
    // padding: hp(5),
    backgroundColor: colors.blackBg,
  },
})

export default RegModal;
