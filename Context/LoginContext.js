import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Note = createContext();
const LoginContext = ({children}) => {
  const [Userdata, setNewData] = useState([]);
  const [UserToken, setUserToken] = useState([]);
  // console.log(Userdata);
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('UserLogin');
  //     const token = await AsyncStorage.getItem('UserToken');
  //     if (value !== null) {
  //       setNewData(JSON.parse(value));
  //       setUserToken(JSON.parse(token));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <Note.Provider value={{Userdata, UserToken, setNewData, setUserToken}}>
      {children}
    </Note.Provider>
  );
};

export const useIslogin = () => useContext(Note);

export default LoginContext;
