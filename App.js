import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MyStack from './src/StackNavigation/Stacks';

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
