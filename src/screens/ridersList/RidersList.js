import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FAB from '../../components/FAB';
import Header from '../../components/Header';
import ListEmpty from '../../components/ListEmpty';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { mockfleetHomeData, mockRiders } from '../../constants/testData';
import { getDate } from '../../services/date.service';
import { moneyService } from '../../services/money.service';
import DriverListView from '../home/components/DriverListView';
import FleetOwnerDataView from '../home/components/FleetOwnerDataView';
import { getRiders, singleRider } from './actions/riderList.actions';

function RidersList({ navigation }) {
  const riders = useSelector(state => state.riderList.yourRiders);
  const user = useSelector(state => state.login.user);
  const triggerAPICall = useSelector(state => state.riderList.triggerAPICall);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRiders({userId: user.id}))
  }, [triggerAPICall])

  const seperator = () => (
    <View style={{height:hp(30)}} />
  )

  const handleRiderPress = (item) => {
    dispatch(singleRider(item));
    navigation.navigate('RiderView');
  }

  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Your Riders', color: colors.text.white }}
      />
      <View style={styles.content}>
        <FlatList
          data={riders}
          keyExtractor={(item) => item.email.value}
          ItemSeparatorComponent={seperator}
          ListEmptyComponent={ListEmpty}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DriverListView name={item.fullName} email={item.email.value} date={getDate(item.createdAt)} onPress={() => handleRiderPress(item)} />
          )}
        />
      </View>
      <FAB iconName={'add'} onPress={() => navigation.navigate('AddRider')} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: hp(720),
    width: wp(360),
    backgroundColor: colors.blackBg,
  },
  content: {
    flex: 1,
    marginTop: hp(15),
    // alignItems: 'center',
  },
})

export default RidersList;
