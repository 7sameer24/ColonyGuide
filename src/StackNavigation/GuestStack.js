import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants';
import {Icon} from 'react-native-elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Tabs/HomeScreen';
import CategoriesScreen from '../Tabs/Categories/CategoriesScreen';
import ProfileScreen from '../Tabs/ProfileScreen';
import CustomDrawer from '../Components/CustomDrawer';
import ServiceList from '../ProfileComponents/ServiceComponents/CategoriesScreens/ServiceList';
import ServiceInformation from '../ProfileComponents/ServiceComponents/CategoriesScreens/ServiceInformation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const GuestStack = () => {
  const arr = [
    {name: 'Feed', component: MyDrawer, headerShown: false},
    {
      name: 'Service List',
      component: ServiceList,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      headerShown: false,
    },
    {
      name: 'Service Information',
      component: ServiceInformation,
      headerTitleStyle: [styles.headerStyle, {color: COLORS.white}],
      headerTintColor: COLORS.white,
      headerStyle: {backgroundColor: COLORS.primary},
      headerShadowVisible: false,
    },
  ];

  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      {arr.map(data => (
        <Stack.Screen
          key={data.name}
          name={data.name}
          component={data.component}
          options={({route}) => ({
            headerShown: data.headerShown,
            headerTransparent: data.headerTransparent,
            headerTitleStyle: data.headerTitleStyle,
            headerTintColor: data.headerTintColor,
            headerShadowVisible: data.headerShadowVisible,
            headerBackVisible: data.headerBackVisible,
            title: data.title,
            headerStyle: data.headerStyle,
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

function MyTabs() {
  const tabArr = [
    {
      name: 'Homee',
      component: HomeScreen,
      headerShown: false,
      iconName: 'home',
    },
    {
      name: 'categories',
      component: CategoriesScreen,
      headerShown: false,
      iconName: 'grid',
      type: 'ionicon',
    },
    {
      name: 'Profile',
      component: ProfileScreen,
      headerShown: false,
      iconName: 'person',
      type: 'ionicon',
    },
  ];
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveBackgroundColor: 'white',
      }}>
      {tabArr.map(data => (
        <Tab.Screen
          key={data.name}
          name={data.name}
          component={data.component}
          options={{
            headerShown: data.headerShown,
            tabBarIcon: ({focused}) => (
              <Icon
                size={25}
                name={data.iconName}
                color={focused ? COLORS.white : COLORS.secondary}
                containerStyle={styles.iconContainer(focused)}
                type={data.type}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerInactiveBackgroundColor: COLORS.transparent,
        drawerActiveBackgroundColor: COLORS.transparent,
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerInactiveTintColor: COLORS.textColor,
        drawerActiveTintColor: COLORS.textColor,
        drawerStyle: styles.drawerStyle,
      }}>
      <Drawer.Screen
        name="Home"
        component={MyTabs}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default GuestStack;

const styles = StyleSheet.create({
  iconContainer: focused => ({
    backgroundColor: focused ? COLORS.primary : COLORS.white,
    padding: 10,
    borderRadius: 10,
  }),
  tabBarStyle: {
    height: '9%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  drawerLabelStyle: {
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
    marginLeft: -15,
  },
  drawerStyle: {
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    width: '67%',
  },
  headerStyle: {
    color: COLORS.textColor,
    fontSize: 18,
    fontFamily: FONTS.InterSemiBold,
  },
});
