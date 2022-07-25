import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { bikeColors, days, guarantorRelationships } from '../../../constants/staticData';
import ListView from '../../signUp/components/ListView';
import { hideModal, riderData } from '../actions/riderList.actions';

function RegModal() {
  const state = useSelector(state => state.riderList);
  const dispatch = useDispatch();

  const handleColorSelection = (data) => {
    let riderDataValues = state.riderData;
    riderDataValues = {...riderDataValues, bikeColor: data}
    dispatch(riderData(riderDataValues))
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
