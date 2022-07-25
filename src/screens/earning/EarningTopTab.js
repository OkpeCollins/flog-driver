import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { hp, wp } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import Balance from './components/Balance';
import Revenue from './components/Revenue';
import Net from './components/Net';

const RideHistoryNav = createMaterialTopTabNavigator()
const OngoingRideStack = createStackNavigator();

// function OngoingRideNav() {
//   return (
//     <OngoingRideStack.Navigator headerMode={'none'}>
//       <OngoingRideStack.Screen component={OnGoingRides} name={'OngoinRides'} />
//       <OngoingRideStack.Screen component={OngoingRideDetails} name={'OngoingRideDetails'} />
//     </OngoingRideStack.Navigator>
//   )
// }

function EarningTopTab() {
  return (
    <RideHistoryNav.Navigator 
      tabBarOptions={{
        labelStyle:{fontSize: wp(14), fontWeight: '500', textTransform: 'capitalize'},
        style:{backgroundColor: colors.blackBg,},
        activeTintColor: colors.text.white,
        scrollEnabled: true,
        tabStyle: {width: wp(360) / 3},
        indicatorStyle: { backgroundColor: colors.mainColor, height: hp(4) },
      }}
    >
      <RideHistoryNav.Screen component={Balance} name={'Balance'} />
      <RideHistoryNav.Screen component={Revenue} name={'Revenue'}  />
      <RideHistoryNav.Screen component={Net} name={'Net'}  />
    </RideHistoryNav.Navigator>
  );
}

export default EarningTopTab;
