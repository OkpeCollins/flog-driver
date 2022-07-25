import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FleetOwnerSignup, Login, Onboarding, PasswordReset, RegSuccessful, RiderSignUp, Welcome } from '../screens';
import { useSelector } from 'react-redux';

const AuthNav = createStackNavigator();

function AuthNavigation() {
  const state = useSelector(state => state.signUp);
  const onBoardingState = useSelector(state => state.onboard);
  return (
    <AuthNav.Navigator headerMode={'none'}>
      {!onBoardingState.onboarded ? (
        <AuthNav.Screen component={Onboarding} name={'Onboarding'} />
      ) : (
        <>
          <AuthNav.Screen component={Welcome} name={'Welcome'} />
          <AuthNav.Screen component={Login} name={'Login'} />
          <AuthNav.Screen component={PasswordReset} name={'PasswordReset'} />
          <AuthNav.Screen component={RiderSignUp} name={'RiderSignUp'} />
          <AuthNav.Screen component={FleetOwnerSignup} name={'FleetOwnerSignup'} />
          <AuthNav.Screen component={RegSuccessful} name={'RegSuccessful'} />
        </>
      )}
    </AuthNav.Navigator>
  );
}

export default AuthNavigation;
