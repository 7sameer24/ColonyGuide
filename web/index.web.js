import {AppRegistry} from 'react-native';
import {name as appName} from '../app.json';
import AppWeb from './App.web';
if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent(appName, () => AppWeb);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
