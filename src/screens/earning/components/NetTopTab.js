import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { hp, wp } from '../../../constants/dimension';
import { colors } from '../../../constants/colors';
import LastWeek from './netScreens/LastWeek';
import CurrentWeek from './netScreens/CurrentWeek';
import PastThreeMonth from './netScreens/PastThreeMonth';

const NetTabs = createMaterialTopTabNavigator()

function NetTopTab() {
  return (
    <NetTabs.Navigator 
      tabBarOptions={{
        labelStyle:{fontSize: wp(14), fontWeight: '500', textTransform: 'capitalize'},
        style:{backgroundColor: colors.contentHeader,},
        activeTintColor: colors.text.white,
        scrollEnabled: true,
        tabStyle: {width: wp(360) / 2.1, height: hp(45)},
        indicatorStyle: { backgroundColor: colors.contentHeader, height: hp(4) },
      }}
    >
      <NetTabs.Screen component={LastWeek} name={'LastWeek'} options={{tabBarLabel: 'Last Week' }} />
      <NetTabs.Screen component={CurrentWeek} name={'CurrentWeek'} options={{tabBarLabel: 'Current Week' }} />
      <NetTabs.Screen component={PastThreeMonth} name={'PastThreeMonth'} options={{tabBarLabel: 'Past Three Month' }} />
    </NetTabs.Navigator>
  );
}

export default NetTopTab;
