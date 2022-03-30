import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import LoginContext, {useIslogin} from './Context/LoginContext';
import OnboardingScreen from './src/AppScreens/OnboardingScreen';
import MyStack from './src/StackNavigation/Stacks';

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunch').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunch', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <LoginContext>
          <Stack.Navigator>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={({route}) => ({
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="Loginn"
              component={MyStack}
              options={({route}) => ({
                headerShown: false,
              })}
            />
          </Stack.Navigator>
        </LoginContext>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
};

export default App;
