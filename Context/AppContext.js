import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BaseURL from '../src/constants/BaseURL';

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
  const [onRefresh, setRefresh] = useState(false);
  const [count, updateCount] = useState(0);

  const onCartApi = async (productId, type, user_id) => {
    try {
      const response = await axios(BaseURL('add-edit-cart'), {
        method: 'post',
        data: {
          user_id: user_id,
          product_id: productId,
          quantity: 1,
          type: type,
        },
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      if (response.data.success == true) {
        if (type === 'Remove') {
          updateCount({...count, [productId]: 0});
        } else {
          onAddCart(productId, type);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAddCart = (productId, type) => {
    const key = productId;
    if (count[key] === undefined) {
      updateCount({...count, [productId]: 1});
    } else if (count[key] === 0) {
      updateCount({...count, [productId]: 1});
    } else {
      if (type === 'Plus') {
        count[key] = count[key] + 1;
      } else {
        count[key] = count[key] - 1;
      }
      updateCount({...count});
    }
  };

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
        onRefresh,
        setRefresh,
        onCartApi,
        count,
        updateCount,
        onAddCart,
      }}>
      {children}
    </App.Provider>
  );
};

export const useApp = () => useContext(App);

export default AppContext;
