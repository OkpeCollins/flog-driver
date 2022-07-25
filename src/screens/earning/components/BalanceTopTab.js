import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { hp, wp } from '../../../constants/dimension';
import { colors } from '../../../constants/colors';
import LastWeek from './balanceScreens/LastWeek';
import CurrentWeek from './balanceScreens/CurrentWeek';
import PastThreeMonth from './balanceScreens/PastThreeMonth';
import PayToFlog from './balanceScreens/PayToFlog';

const BalanceTabs = createMaterialTopTabNavigator()
const BalanceStack = createStackNavigator();

function BalanceTopTab() {
  return (
    <BalanceTabs.Navigator 
      tabBarOptions={{
        labelStyle:{fontSize: wp(14), fontWeight: '500', textTransform: 'capitalize'},
        style:{backgroundColor: colors.contentHeader,},
        activeTintColor: colors.text.white,
        scrollEnabled: true,
        tabStyle: {width: wp(360) / 2.1, height: hp(45)},
        indicatorStyle: { backgroundColor: colors.contentHeader, height: hp(4) },
      }}
    >
      <BalanceTabs.Screen component={LastWeek} name={'LastWeek'} options={{tabBarLabel: 'Last Week' }} />
      <BalanceTabs.Screen component={CurrentWeek} name={'CurrentWeek'} options={{tabBarLabel: 'Current Week' }} />
      <BalanceTabs.Screen component={PastThreeMonth} name={'PastThreeMonth'} options={{tabBarLabel: 'Past Three Month' }} />
    </BalanceTabs.Navigator>
  );
}

function BalanceNav() {
  return (
    <BalanceStack.Navigator headerMode={'none'}>
      <BalanceStack.Screen component={BalanceTopTab} name={'BalanceTopTab'} />
      <BalanceStack.Screen component={PayToFlog} name={'PayToFlog'} />
    </BalanceStack.Navigator>
  )
}

export default BalanceNav;
