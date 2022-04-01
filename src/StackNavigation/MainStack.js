import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingStack from './OnboardingStack';
import {NavigationContainer} from '@react-navigation/native';
import LoadingStack from './LoadingStack';
import {navigationStateType, useApp} from '../../Context/AppContext';
import AuthStack from './AuthStack';
import GuestStack from './GuestStack';
import HomeStack from './HomeStack';

const MainStack = () => {
  const {navigationState, setNavigationState, setNewData, setUserToken} =
    useApp();

  useEffect(() => {
    const setUserDetail = async () => {
      const userData = await AsyncStorage.getItem('UserLogin');
      const userToken = await AsyncStorage.getItem('UserToken');
      const isOnboardingShowed = await AsyncStorage.getItem('alreadyLaunch');
      if (JSON.parse(userToken)) {
        setNewData(JSON.parse(userData));
        setUserToken(JSON.parse(userToken));
      } else if (isOnboardingShowed === null) {
        AsyncStorage.setItem('alreadyLaunch', 'true');
        setNavigationState(navigationStateType.ONBOADRING);
      } else {
        setNavigationState(navigationStateType.AUTH);
      }
    };
    setUserDetail();
  }, []);

  const renderStack = () => {
    switch (navigationState) {
      case navigationStateType.ONBOADRING:
        return <OnboardingStack />;

      case navigationStateType.AUTH:
        return <AuthStack />;

      case navigationStateType.GUEST:
        return <GuestStack />;

      case navigationStateType.HOME:
        return <HomeStack />;

      default:
        return <LoadingStack />;
    }
  };

  return <NavigationContainer>{renderStack()}</NavigationContainer>;
};

export default MainStack;
