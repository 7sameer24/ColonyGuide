import messaging from '@react-native-firebase/messaging';
import {useApp} from '../../Context/AppContext';



export const requestUserPermission = async (set) => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getToken(set);
  }
};

const getToken = (up) => {
  messaging()
    .getToken()
    .then(token => {
      up(token);
    })
    .catch(error => {
      console.log('error getting push token ' + error);
    });
};

export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        console.log('background state', remoteMessage.notification);
      }
    });
};
