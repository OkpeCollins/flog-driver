import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { days, months, years } from '../../../constants/staticData';
import { hideModal, signUpData } from '../actions/signUp.actions';
import ListView from './ListView';

function DayModal() {
  const state = useSelector(state => state.signUp);
  const dispatch = useDispatch();

  const handleDaySelection = (type, data) => {
    let signUpValues = state.userData;
    switch (type) {
      case 'day':
        signUpValues = {...signUpValues, riderCardDay: data}
        break;
      case 'month':
        signUpValues = {...signUpValues, riderCardMonth: data}
        break;
      case 'year':
        signUpValues = {...signUpValues, riderCardYear: data}
        break;
      default:
        break;
    }
    dispatch(signUpData(signUpValues))
    dispatch(hideModal())
  }
  return (
    <Modal
      isVisible={state.isVisible}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      onBackdropPress={() => dispatch(hideModal())}
      backdropColor={colors.contentHeader}
    >
      <View style={styles.main}>
        <View style={styles.container}>
          {state.modalDataType === 'day' && (
            <FlatList
              data={days}
              // style={styles.data}
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.dayNum}
              // ItemSeparatorComponent={SupportOptSeperator}
              renderItem={({ item }) => (
                <ListView key={`DAY-${item.dayNum}`} title={`${item.dayNum}`} onPress={() => handleDaySelection('day', item.dayNum)} />
              )}
            />
          )}
          {state.modalDataType === 'month' && (
            <FlatList
              data={months}
              // style={styles.data}
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.monthNum}
              // ItemSeparatorComponent={SupportOptSeperator}
              renderItem={({ item }) => (
                <ListView key={`MONTH-${item.monthNum}`} title={`${item.monthNum}`} onPress={() => handleDaySelection('month', item.monthNum)} />
              )}
            />
          )}
          {state.modalDataType === 'year' && (
            <FlatList
              data={years}
              // style={styles.data}
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.year}
              // ItemSeparatorComponent={SupportOptSeperator}
              renderItem={({ item }) => (
                <ListView key={`YEAR-${item.year}`} title={`${item.year}`} onPress={() => handleDaySelection('year', item.year)} />
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
    padding: hp(5),
    backgroundColor: colors.blackBg,
  },
})

export default DayModal;
