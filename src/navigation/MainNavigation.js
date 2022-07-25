import React from 'react';
import { View, Text, Platform } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { AddRider, Chat, CompletedRideDetails, Earning, FleetOwnerHome, Home, Notifications, OngoingRideDetails, RideHistory, RidersList, SetDestination, SetDestinationMain, Settings, Support, SupportDetails, RiderView, RequestLocation, PrivacyPolicy } from '../screens';
import { colors } from '../constants/colors';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { hp, wp } from '../constants/dimension';
import { useSelector } from 'react-redux';

const MainTab = createBottomTabNavigator();
const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const RideHistoryStack = createStackNavigator();

function HomeNav() {
  const fleetOwner = useSelector(state => state.login.user.fleetOwner)
  return (
    <HomeStack.Navigator headerMode={'none'}>
      {!fleetOwner && <HomeStack.Screen component={Home} name={'Home'} />}
      {fleetOwner && <HomeStack.Screen component={FleetOwnerHome} name={'Home'} />}
      <HomeStack.Screen component={SetDestination} name={'SetDestination'} />
      <HomeStack.Screen component={SetDestinationMain} name={'SetDestinationMain'} />
    </HomeStack.Navigator>
  )
}

function RideHistoryNav() {
  return (
    <RideHistoryStack.Navigator headerMode={'none'}>
      <RideHistoryStack.Screen component={RideHistory} name={'RideHistory'} />
    </RideHistoryStack.Navigator>
  )
}

function TabNav() {
  const fleetOwner = useSelector(state => state.login.user.fleetOwner)
  return (
    <MainTab.Navigator tabBarOptions={{
      activeBackgroundColor: colors.blackBg,
      activeTintColor: colors.mainColor,
      inactiveBackgroundColor: colors.mainColor,
      inactiveTintColor: colors.blackBg,
      showLabel: false,
      // style:{height: hp(56) ,borderTopWidth: 0}
      style:{height: Platform.select({ios: hp(70), android: hp(56)}), borderTopWidth: 0}
    }}>
      <MainTab.Screen component={HomeNav} name={'HomeNav'} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name={'home'} color={color} size={size} />
        )
      }} />
      {!fleetOwner && <MainTab.Screen component={Notifications} name={'Notifications'} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name={'notification-important'} color={color} size={size} />
        ),
        // tabBarBadge: 3,
      }} />}
      {!fleetOwner && <MainTab.Screen component={RideHistoryNav} name={'RideHistoryNav'} options={{
        unmountOnBlur: true,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name={'schedule'} color={color} size={size} />
        )
      }} />}
      {fleetOwner && <MainTab.Screen component={RidersList} name={'RidersList'} options={{
        unmountOnBlur: true,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name={'bike-scooter'} color={color} size={size} />
        )
      }} />}
      <MainTab.Screen component={Settings} name={'Settings'} options={{
        tabBarIcon: ({ color, size }) => (
      <MaterialIcons name={'settings'} color={color} size={size} />
        )
      }} />
    </MainTab.Navigator>
  );
}

function MainNav() {
  const locationServiceEnabled = useSelector(state => state.root.locationServiceEnabled);

  if (!locationServiceEnabled) {
    return (
      <MainStack.Navigator headerMode={'none'} initialRouteName={'TabNav'}>
        <MainStack.Screen component={RequestLocation} name={'RequestLocation'} />
      </MainStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator headerMode={'none'} initialRouteName={'TabNav'}>
      <MainStack.Screen component={TabNav} name={'TabNav'} />
      <MainStack.Screen component={Earning} name={'Earning'} />
      <MainStack.Screen component={Support} name={'Support'} />
      <MainStack.Screen component={SupportDetails} name={'SupportDetails'} />
      <MainStack.Screen component={OngoingRideDetails} name={'OngoingRideDetails'} />
      <MainStack.Screen component={CompletedRideDetails} name={'CompletedRideDetails'} />
      <MainStack.Screen component={Chat} name={'Chat'} />
      <MainStack.Screen component={AddRider} name={'AddRider'} />
      <MainStack.Screen component={RiderView} name={'RiderView'} />
      <MainStack.Screen component={PrivacyPolicy} name={'PrivacyPolicy'} />
    </MainStack.Navigator>
  )
}

export default MainNav;
