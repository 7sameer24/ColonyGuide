import React, {useEffect, useState} from 'react';
import AppContext from './Context/AppContext';
import MainStack from './src/StackNavigation/MainStack';
import {version as app_version} from './package.json';
import axios from 'axios';

const App = () => {
  const [checkVersion, setVersion] = useState('');
  console.log(checkVersion.android_v);

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
      {checkVersion.android_v === '1' ? <MainStack /> : alert('Please Update')}
    </AppContext>
  );
};

export default App;
