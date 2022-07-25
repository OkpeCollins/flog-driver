import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { days, months, years } from '../../../constants/staticData';
import ListView from '../../signUp/components/ListView';
import { hideModal, riderData } from '../actions/riderList.actions';

function DayModal() {
  const state = useSelector(state => state.riderList);
  const dispatch = useDispatch();

  const handleDaySelection = (type, data) => {
    let riderDataValues = state.riderData;
    switch (type) {
      case 'day':
        riderDataValues = {...riderDataValues, riderCardDay: data}
        break;
      case 'month':
        riderDataValues = {...riderDataValues, riderCardMonth: data}
        break;
      case 'year':
        riderDataValues = {...riderDataValues, riderCardYear: data}
        break;
      default:
        break;
    }
    dispatch(riderData(riderDataValues))
    dispatch(hideModal())
  }
  return (
    <Modal
      isVisible={state.isVisible}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      onBackdropPreListViewss={() => dispatch(hideModal())}
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
              keyExtractor={(item) => item.dayNum.toString()}
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
              keyExtractor={(item) => item.monthNum.toString()}
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
              keyExtractor={(item) => item.year.toString()}
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
