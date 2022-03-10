// import React from 'react';
// import HomeScreen from '../Tabs/HomeScreen';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Icon} from 'react-native-elements';
// import {COLORS, FONTS} from '../constants';
// import CategoriesScreen from '../Tabs/CategoriesScreen';
// import ProfileScreen from '../Tabs/ProfileScreen';
// import {StyleSheet} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
// import TermsCondition from '../ProfileComponents/TermsCondition';
// import ProfileDetails from '../ProfileComponents/ProfileDetails';
// import ProfileSettings from '../ProfileComponents/ProfileSettings';
// import BusinessInfo from '../ProfileComponents/BusinessComponents/BusinessInfo';
// import ContactUs from '../ProfileComponents/ContactUs';

// const Tab = createBottomTabNavigator();

// const Stack = createStackNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           height: '8.5%',
//           backgroundColor: COLORS.white,
//         },
//       }}>
//       <Tab.Screen
//         name="Feed"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <Icon
//               size={25}
//               name="home"
//               color={focused ? COLORS.white : COLORS.secondary}
//               containerStyle={styles.iconContainer(focused)}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="categories"
//         component={CategoriesScreen}
//         options={{
//           tabBarLabel: 'Categories',
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <Icon
//               size={25}
//               name="grid"
//               color={focused ? COLORS.white : COLORS.secondary}
//               containerStyle={styles.iconContainer(focused)}
//               type="ionicon"
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profilee"
//         component={ProfileScreen}
//         options={{
//           tabBarLabel: 'Profile',
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <Icon
//               size={25}
//               name="person"
//               color={focused ? COLORS.white : COLORS.secondary}
//               containerStyle={styles.iconContainer(focused)}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// const App = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="MyHome"
//         component={MyTabs}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Terms & Condition"
//         component={TermsCondition}
//         options={{
//           headerTitleStyle: styles.headerStyle,
//           headerTintColor: COLORS.textColor,
//           headerStyle: {elevation: 0},
//         }}
//       />
//       <Stack.Screen
//         name="Personal Details"
//         component={ProfileDetails}
//         options={{
//           headerTitleStyle: styles.headerStyle,
//           headerTintColor: COLORS.textColor,
//           headerStyle: {elevation: 0},
//         }}
//       />
//       <Stack.Screen
//         name="Settings"
//         component={ProfileSettings}
//         options={{
//           headerTitleStyle: styles.headerStyle,
//           headerTintColor: COLORS.textColor,
//           headerStyle: {elevation: 0},
//         }}
//       />
//       <Stack.Screen
//         name="Business Info"
//         component={BusinessInfo}
//         options={{
//           headerTitleStyle: styles.headerStyle,
//           headerTintColor: COLORS.textColor,
//           headerStyle: {elevation: 0},
//         }}
//       />
//       <Stack.Screen
//         name="Contact Us"
//         component={ContactUs}
//         options={{
//           headerTitleStyle: styles.headerStyle,
//           headerTintColor: COLORS.textColor,
//           headerStyle: {elevation: 0},
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
// export default App;

// const styles = StyleSheet.create({
//   iconContainer: focused => ({
//     backgroundColor: focused ? COLORS.primary : COLORS.white,
//     padding: 10,
//     borderRadius: 10,
//   }),
//   headerStyle: {
//     color: COLORS.textColor,
//     fontSize: 18,
//     fontFamily: FONTS.InterSemiBold,
//   },
// });
