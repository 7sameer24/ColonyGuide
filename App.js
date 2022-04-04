import React, {useEffect, useState} from 'react';
import AppContext from './Context/AppContext';
import MainStack from './src/StackNavigation/MainStack';
import {version as app_version} from './package.json';
import axios from 'axios';

const App = () => {
  const [checkVersion, setVersion] = useState('');

  const fetchVersion = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/app-version';
      const response = await axios.post(URL);
      setVersion(response.data.AppVersion);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  return (
    <AppContext>
      {checkVersion.force_update === 0 ? alert('Please Update') : <MainStack />}
    </AppContext>
  );
};

export default App;
