import React, {useEffect, useState} from 'react';
import AppContext from './Context/AppContext';
import MainStack from './src/StackNavigation/MainStack';
import NetInfo from '@react-native-community/netinfo';
import InternetConnectionModel from './src/Components/InternetConnectionModel';
import axios from 'axios';
import CheckUpdate from './src/Components/CheckUpdate';
import {Platform, StatusBar} from 'react-native';
import {COLORS} from './src/constants';
import SplashScreen from 'react-native-splash-screen';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  const [showInternetPopup, setNetAvailable] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetAvailable(!state.isConnected);
    });
    checkVersionApi();

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  const versionCheck = {
    android_version: '1',
    ios_version: '10.2',
  };

  const checkVersionApi = async () => {
    try {
      const versionRes = await axios.post(
        'https://colonyguide.garimaartgallery.com/api/app-version',
      );
      if (versionRes.data.success == true) {
        if (
          Platform.OS == 'android' &&
          versionRes.data.AppVersion.android_v > versionCheck.android_version
        ) {
          setForceUpdate(true);
        } else if (
          Platform.OS == 'ios' &&
          versionRes.data.AppVersion.ios_v > versionCheck.ios_version
        ) {
          setForceUpdate(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  SplashScreen.hide(); // fade
  return (
    <AppContext>
      <StatusBar backgroundColor={COLORS.primary} />
      <ToastProvider>
        <MainStack />
      </ToastProvider>
      <CheckUpdate checkVersionApi={checkVersionApi} visible={forceUpdate} />
      <InternetConnectionModel visible={showInternetPopup} />
    </AppContext>
  );
};

export default App;
