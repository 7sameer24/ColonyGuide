import React from 'react';
import AppContext from './Context/AppContext';
import MainStack from './src/StackNavigation/MainStack';

const App = () => {
  return (
    <AppContext>
      <MainStack />
    </AppContext>
  );
};

export default App;
