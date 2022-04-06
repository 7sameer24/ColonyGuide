import React from 'react';
import AppContext from './Context/AppContext';
import MainStack from './src/StackNavigation/MainStack';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  RNBootSplash.hide({fade: true}); // fade
  return (
    <AppContext>
      <MainStack />
    </AppContext>
  );
};

export default App;
