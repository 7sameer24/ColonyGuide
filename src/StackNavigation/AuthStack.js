import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../AppScreens/Login/LoginScreen';
import SelectRole from '../AppScreens/SignIn/SelectRole';
import RegisterScreen from '../AppScreens/SignIn/RegisterScreen';
import OtpScreen from '../AppScreens/SignIn/OtpScreen';
import AllRegistration from '../AppScreens/SignIn/AllRegistration';
import AddressScreen from '../AppScreens/SignIn/HouseOwners/AddressScreen';
import Location from '../AppScreens/SignIn/HouseOwners/Location';
import ForgotScreen from '../AppScreens/Login/ForgotScreen';
import ResetPassScreen from '../AppScreens/Login/ResetPassScreen';
import LocalModal from '../Components/LocalModal';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const arr = [
    {name: 'Login', component: LoginScreen, headerShown: false},
    {name: 'Sign in', component: SelectRole, headerShown: false},
    {name: 'Register', component: RegisterScreen, headerShown: false},
    {name: 'Otp', component: OtpScreen, headerTransparent: true, title: null},
    {name: 'Registration', component: AllRegistration, headerShown: false},
    {
      name: 'Your location',
      component: Location,
      headerShown: true,
      headerShadowVisible: false,
    },
    {name: 'Address', component: AddressScreen, headerShown: false},
    {name: 'ForgotPassword', component: ForgotScreen, headerShown: false},
    {name: 'ResetPassword', component: ResetPassScreen, headerShown: false},
    {name: 'LocalId', component: LocalModal, headerShown: false},
  ];
  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      {arr.map(data => (
        <Stack.Screen
          key={data.name}
          name={data.name}
          component={data.component}
          options={({route}) => ({
            headerShown: data.headerShown,
            headerTransparent: data.headerTransparent,
            headerTitleStyle: data.headerTitleStyle,
            headerTintColor: data.headerTintColor,
            headerShadowVisible: data.headerShadowVisible,
            headerBackVisible: data.headerBackVisible,
            title: data.title,
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
