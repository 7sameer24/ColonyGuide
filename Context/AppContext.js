import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = createContext();
export const navigationStateType = {
  ONBOADRING: 'ONBOADRING',
  AUTH: 'AUTH',
  GUEST: 'GUEST',
  HOME: 'HOME',
  LOADING: 'LOADING',
  MAINTENANCE: 'MAINTENANCE',
  SERVICE_FORM: 'SERVICE_FORM',
  HOUSE_FORM: 'HOUSE_FORM',
  HOSTEL_FORM: 'HOSTEL_FORM',
};
const AppContext = ({children}) => {
  const [navigationState, setNavigationState] = useState(
    navigationStateType.LOADING,
  );

  const [Userdata, setNewData] = useState(null);
  const [UserToken, setUserToken] = useState(null);
  const [checkStatus, setCheckStatus] = useState('');
  const [notificationToken, setNotificationToken] = useState('');
  const [loginPop, setIsLoginPop] = useState(false);
  const [FilterData, setIsFilterData] = useState([]);
  const [resumeDetails, updateResumeDtails] = useState({});

  useEffect(() => {
    const saveDetail = async () => {
      await AsyncStorage.setItem('UserLogin', JSON.stringify(Userdata));
      await AsyncStorage.setItem('UserToken', JSON.stringify(UserToken));
    };
    saveDetail();
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
        notificationToken,
        loginPop,
        FilterData,
        setNavigationState,
        setNotificationToken,
        setCheckStatus,
        setNewData,
        setUserToken,
        setIsLoginPop,
        setIsFilterData,
        resumeDetails,
        updateResumeDtails,
      }}>
      {children}
    </App.Provider>
  );
};

export const useApp = () => useContext(App);

export default AppContext;
