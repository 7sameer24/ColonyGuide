import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingStack from './OnboardingStack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import LoadingStack from './LoadingStack';
import {navigationStateType, useApp} from '../../Context/AppContext';
import AuthStack from './AuthStack';
import GuestStack from './GuestStack';
import HomeStack from './HomeStack';
import MaintenanceStack from './MaintenanceStack';
import {useColorScheme} from 'react-native';
import ResumeServiceForm from './ResumeFormsStack/ResumeServiceForm';
import ResumeHouseForm from './ResumeFormsStack/ResumeHouseForm';
import ResumeHostelForm from './ResumeFormsStack/ResumeHostelForm';
import ModalStack from './ModalStack';
import AdminStack from './AdminStack';

const MainStack = () => {
  const {
    navigationState,
    setNavigationState,
    setNewData,
    setUserToken,
    setAdminData,
    setAdminToken,
  } = useApp();

  useEffect(() => {
    const setUserDetail = async () => {
      const userData = await AsyncStorage.getItem('UserLogin');
      const userToken = await AsyncStorage.getItem('UserToken');
      const adminData = await AsyncStorage.getItem('adminLogin');
      const adminToken = await AsyncStorage.getItem('adminToken');
      const isOnboardingShowed = await AsyncStorage.getItem('alreadyLaunch');
      if (JSON.parse(userToken)) {
        setNewData(JSON.parse(userData));
        setUserToken(JSON.parse(userToken));
      } else if (JSON.parse(adminToken)) {
        setAdminData(JSON.parse(adminData));
        setAdminToken(JSON.parse(adminToken));
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

      case navigationStateType.MAINTENANCE:
        return <MaintenanceStack />;

      case navigationStateType.SERVICE_FORM:
        return <ResumeServiceForm />;

      case navigationStateType.HOUSE_FORM:
        return <ResumeHouseForm />;

      case navigationStateType.HOSTEL_FORM:
        return <ResumeHostelForm />;

      case navigationStateType.CHOOSELOCALID:
        return <ModalStack />;

      case navigationStateType.SUPERADMIN:
        return <AdminStack />;

      default:
        return <LoadingStack />;
    }
  };
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      theme={scheme === 'dark' ? DefaultTheme : DefaultTheme}>
      {renderStack()}
    </NavigationContainer>
  );
};

export default MainStack;
