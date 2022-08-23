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
  CHOOSELOCALID: 'CHOOSELOCALID',
  SUPERADMIN: 'SUPERADMIN',
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
  const [resumeDetails, updateResumeDtails] = useState(null);
  const [GSaveLocalID, updateGSaveLocalID] = useState(null);
  const [categories, updateCategories] = useState([]);
  const [localityData, updateLocalData] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const saveDetail = async () => {
      await AsyncStorage.setItem('UserLogin', JSON.stringify(Userdata));
      await AsyncStorage.setItem('UserToken', JSON.stringify(UserToken));
      await AsyncStorage.setItem('adminLogin', JSON.stringify(adminData));
      await AsyncStorage.setItem('adminToken', JSON.stringify(adminToken));
    };
    saveDetail();
    if (UserToken) {
      setNavigationState(navigationStateType.HOME);
    } else if (adminToken) {
      setNavigationState(navigationStateType.SUPERADMIN);
    } else if (navigationStateType.LOADING !== navigationState) {
      setNavigationState(navigationStateType.AUTH);
    }
  }, [Userdata, UserToken, adminData, adminToken]);

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
        GSaveLocalID,
        updateGSaveLocalID,
        categories,
        updateCategories,
        localityData,
        updateLocalData,
        adminData,
        setAdminData,
        adminToken,
        setAdminToken,
      }}>
      {children}
    </App.Provider>
  );
};

export const useApp = () => useContext(App);

export default AppContext;
