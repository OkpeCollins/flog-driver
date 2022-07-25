import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { hp, wp } from '../../../constants/dimension';
import { colors } from '../../../constants/colors';
import LastWeek from './revenueScreens/LastWeek';
import CurrentWeek from './revenueScreens/CurrentWeek';
import PastThreeMonth from './revenueScreens/PastThreeMonth';

const RevenueTabs = createMaterialTopTabNavigator()

function RevenueTopTab() {
  return (
    <RevenueTabs.Navigator 
      tabBarOptions={{
        labelStyle:{fontSize: wp(14), fontWeight: '500', textTransform: 'capitalize'},
        style:{backgroundColor: colors.contentHeader,},
        activeTintColor: colors.text.white,
        scrollEnabled: true,
        tabStyle: {width: wp(360) / 2.1, height: hp(45)},
        indicatorStyle: { backgroundColor: colors.contentHeader, height: hp(4) },
      }}
    >
      <RevenueTabs.Screen component={LastWeek} name={'LastWeek'} options={{tabBarLabel: 'Last Week' }} />
      <RevenueTabs.Screen component={CurrentWeek} name={'CurrentWeek'} options={{tabBarLabel: 'Current Week' }} />
      <RevenueTabs.Screen component={PastThreeMonth} name={'PastThreeMonth'} options={{tabBarLabel: 'Past Three Month' }} />
    </RevenueTabs.Navigator>
  );
}

export default RevenueTopTab;
