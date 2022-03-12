// import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
// import {Platform} from 'react-native';

// const PLATFORM_LOCATION_PERMISSIONS = {
//   android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
//   ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
// };

// const REQUEST_PERMISSION_TYPE = {
//   location: PLATFORM_LOCATION_PERMISSIONS,
// };

// const PERMISSION_TYPE = {
//   location: 'location',
// };
// class AppPermission {
//   checkPermission = async type => {
//     console.log('Type', type);
//     const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
//     console.log('permission', permissions);
//     if (!permissions) {
//       return true;
//     }
//     try {
//       const result = await check(permissions);
//       console.log('result', result);
//       if (result === RESULTS.GRANTED) return true;
//       return requestPermission(permissions);
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };
// }
// const requestPermission = async permissions => {
//   console.log('ss', permissions);
//   try {
//     const result = await request(permissions);
//     console.log('result', result);
//     return result === RESULTS.GRANTED;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// const Permission = new AppPermission();
// export {Permission, PERMISSION_TYPE};
