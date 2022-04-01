import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../AppScreens/Login/LoginScreen';
import SignInScreen from '../AppScreens/SignIn/SignInScreen';
import RegisterScreen from '../AppScreens/SignIn/RegisterScreen';
import OtpScreen from '../AppScreens/SignIn/OtpScreen';
import AllRegistration from '../AppScreens/SignIn/AllRegistration';
import AddressScreen from '../AppScreens/SignIn/HouseOwners/AddressScreen';
import Location from '../AppScreens/SignIn/HouseOwners/Location';
import ForgotScreen from '../AppScreens/Login/ForgotScreen';
import ResetPassScreen from '../AppScreens/Login/ResetPassScreen';
import OnboardingScreen from '../AppScreens/OnboardingScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({navigation}) => {
  const arr = [
    {name: 'Login', component: LoginScreen, headerShown: false},
    {name: 'Sign in', component: SignInScreen, headerShown: false},
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

const styles = StyleSheet.create({
  iconContainer: focused => ({
    backgroundColor: focused ? COLORS.primary : COLORS.white,
    padding: 10,
    borderRadius: 10,
  }),
  headerStyle: {
    color: COLORS.textColor,
    fontSize: 18,
    fontFamily: FONTS.InterSemiBold,
  },
  tabBarStyle: {
    height: '9%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  drawerLabelStyle: {
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
    marginLeft: -15,
  },
  drawerStyle: {
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    width: '67%',
  },
  DrawerIcon: {
    backgroundColor: '#FEF6EF',
    padding: 10,
    borderRadius: 7,
  },
  titleStyle: {
    marginLeft: 15,
    marginRight: '29%',
  },
});
