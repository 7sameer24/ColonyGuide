import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const App = createContext();
export const navigationStateType = {
  ONBOADRING: 'ONBOADRING',
  AUTH: 'AUTH',
  GUEST: 'GUEST',
  HOME: 'HOME',
  LOADING: 'LOADING',
  MAINTENANCE: 'MAINTENANCE',
};
const AppContext = ({children}) => {
  const [navigationState, setNavigationState] = useState(
    navigationStateType.LOADING,
  );

  const [Userdata, setNewData] = useState(null);
  const [UserToken, setUserToken] = useState(null);
  const [checkStatus, setCheckStatus] = useState('');
  const [checkVersion, setVersion] = useState([]);
  const [notificationToken, setNotificationToken] = useState('');
  const [loginPop, setIsLoginPop] = useState(false);

  const fetchVersion = async () => {
    try {
      const response = await axios.post(
        'https://colonyguide.garimaartgallery.com/api/app-version',
      );
      setVersion(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const saveDetail = async () => {
      await AsyncStorage.setItem('UserLogin', JSON.stringify(Userdata));
      await AsyncStorage.setItem('UserToken', JSON.stringify(UserToken));
    };
    saveDetail();
    fetchVersion();
    if (UserToken) {
      setNavigationState(navigationStateType.HOME);
    } else if (navigationStateType.LOADING !== navigationState) {
      setNavigationState(navigationStateType.AUTH);
    }
  }, [Userdata, UserToken]);

  return (
    <App.Provider
      value={{
        Userdata,
        UserToken,
        navigationState,
        checkStatus,
        checkVersion,
        notificationToken,
        loginPop,
        setNavigationState,
        setNotificationToken,
        setCheckStatus,
        setVersion,
        setNewData,
        setUserToken,
        setIsLoginPop,
      }}>
      {children}
    </App.Provider>
  );
};

export const useApp = () => useContext(App);

export default AppContext;
