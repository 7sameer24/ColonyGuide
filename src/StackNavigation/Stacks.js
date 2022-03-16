import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, FONTS, genericStyles} from '../constants';
import {Icon} from 'react-native-elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OnboardingScreen from '../AppScreens/OnboardingScreen';
import LoginScreen from '../AppScreens/Login/LoginScreen';
import SignInScreen from '../AppScreens/SignIn/SignInScreen';
import RegisterScreen from '../AppScreens/SignIn/RegisterScreen';
import OtpScreen from '../AppScreens/SignIn/OtpScreen';
import AllRegistration from '../AppScreens/SignIn/AllRegistration';
import AddressScreen from '../AppScreens/SignIn/HouseOwners/AddressScreen';
import Location from '../AppScreens/SignIn/HouseOwners/Location';
import ForgotScreen from '../AppScreens/Login/ForgotScreen';
import OtpNewPass from '../AppScreens/Login/OtpNewPass';
import ResetPassScreen from '../AppScreens/Login/ResetPassScreen';
import HomeScreen from '../Tabs/HomeScreen';
import CategoriesScreen from '../Tabs/CategoriesScreen';
import ProfileScreen from '../Tabs/ProfileScreen';
import TermsCondition from '../ProfileComponents/TermsCondition';
import ProfileDetails from '../ProfileComponents/ProfileDetails';
import ProfileSettings from '../ProfileComponents/ProfileSettings';
import BusinessInfo from '../ProfileComponents/BusinessComponents/BusinessInfo';
import ServiceInfo from '../ProfileComponents/ServiceInfo';
import ContactUs from '../ProfileComponents/ContactUs';
import BusinessDetails from '../ProfileComponents/BusinessComponents/BusinessDetails';
import BusinessSaved from '../ProfileComponents/BusinessComponents/BusinessSaved';
import CustomDrawer from '../Components/CustomDrawer';
import Committee from '../Tabs/Committee';
import HouseOwners from '../Tabs/HouseOwners';
import Helpline from '../Tabs/Helpline';
import RateUs from '../Tabs/RateUs';
import SearchScreen from '../Tabs/SearchScreen';
import BusinessListed from '../ProfileComponents/BusinessComponents/BusinessListed';
import VegetableFruits from '../Tabs/VegetableFruits';
import RoomsFlats from '../Tabs/RoomsFlats';
import HeaderBar from '../Components/HeaderBar';
import Addroom from '../Tabs/Addroom';
import ServiceDetails from '../AppScreens/SignIn/ServiceProvider/ServiceDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

const MyStack = () => {
  const arr = [
    {name: 'Onboarding', component: OnboardingScreen, headerShown: false},
    {name: 'Login', component: LoginScreen, headerShown: false},
    {name: 'Sign in', component: SignInScreen, headerShown: false},
    {name: 'Register', component: RegisterScreen, headerShown: false},
    {name: 'Otp', component: OtpScreen, headerTransparent: true, title: null},
    {name: 'Registration', component: AllRegistration, headerShown: false},
    {
      name: 'Your location',
      component: Location,
      headerShown: true,
      headerShadowVisible: false,
    },
    {name: 'Address', component: AddressScreen, headerShown: false},
    {name: 'ForgotPassword', component: ForgotScreen, headerShown: false},
    {name: 'OTPNEWPASS', component: OtpNewPass, headerShown: false},
    {name: 'ResetPassword', component: ResetPassScreen, headerShown: false},
    {name: 'Feed', component: MyDrawer, headerShown: false},
    {
      name: 'Terms & Condition',
      component: TermsCondition,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Personal Details',
      component: ProfileDetails,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Settings',
      component: ProfileSettings,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Contact Us',
      component: ContactUs,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Committee',
      component: Committee,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      headerShown: false,
    },
    {
      name: 'Vegetable Fruits',
      component: VegetableFruits,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      headerShown: false,
    },
    {
      name: 'House Owners',
      component: HouseOwners,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      headerShown: false,
    },
    {
      name: 'Helpline',
      component: Helpline,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Rate Us',
      component: RateUs,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Search',
      component: SearchScreen,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Business listed',
      component: BusinessListed,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      headerShown: false,
    },
    {
      name: 'RoomsFlats',
      component: MyTopTabs,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      headerShown: true,
      headerBackVisible: false,
      headerTitle: () => (
        <HeaderBar
          iconView={genericStyles.mh(0)}
          titleStyle={styles.titleStyle}
          firstIcon="arrow-back-outline"
          title="Rooms / Flats"
          searchIcon="search"
          bellIcon="filter"
        />
      ),
    },
    {
      name: 'Add room',
      component: Addroom,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
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
            headerTitle: data.headerTitle,
            headerBackVisible: data.headerBackVisible,
            title: data.title,
          })}
        />
      ))}
      <Stack.Screen
        name="Business Infoo"
        component={BusinessInfo}
        options={({route}) => ({
          headerTitleStyle: styles.headerStyle,
          headerTintColor: COLORS.textColor,
          headerShadowVisible: false,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Service Info"
        component={ServiceInfo}
        options={({route}) => ({
          headerTitleStyle: styles.headerStyle,
          headerTintColor: COLORS.textColor,
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Business Details"
        component={BusinessDetails}
        options={({route}) => ({
          title: route.params.User,
          headerTitleStyle: styles.headerStyle,
          headerTintColor: COLORS.textColor,
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Business Saved"
        component={BusinessSaved}
        options={({route}) => ({
          title: route.params.UserDetails,
          headerTitleStyle: [styles.headerStyle, {color: COLORS.white}],
          headerTintColor: COLORS.white,
          headerStyle: {backgroundColor: COLORS.primary},
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};
function MyTopTabs() {
  const TopTabsArr = [
    {component: RoomsFlats, name: 'All'},
    {component: RoomsFlats, name: 'Hostel'},
    {component: RoomsFlats, name: '1 BHK'},
    {component: RoomsFlats, name: '2 BHK'},
    {component: RoomsFlats, name: '3 BHK'},
  ];
  return (
    <TopTab.Navigator>
      {TopTabsArr.map(data => {
        return (
          <TopTab.Screen
            key={data.name}
            name={data.name}
            component={data.component}
            options={{
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.textColor,
              tabBarLabelStyle: {fontSize: 14, fontFamily: FONTS.InterRegular},
              tabBarIndicatorStyle: {backgroundColor: COLORS.primary},
              tabBarPressColor: '#f2f2f2',
              tabBarItemStyle: {width: 90},
              tabBarScrollEnabled: true,
            }}
          />
        );
      })}
    </TopTab.Navigator>
  );
}
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
          drawerIcon: () => (
            <Icon
              name="home"
              type="material-community"
              color={COLORS.primary}
              containerStyle={styles.DrawerIcon}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyStack;

const styles = StyleSheet.create({
  iconContainer: focused => ({
    backgroundColor: focused ? COLORS.primary : COLORS.white,
    padding: 10,
    borderRadius: 10,
  }),
  headerStyle: {
    color: COLORS.textColor,
    fontSize: 18,
    fontFamily: FONTS.InterSemiBold,
  },
  tabBarStyle: {
    height: '8.5%',
    backgroundColor: COLORS.white,
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
  DrawerIcon: {
    backgroundColor: '#FEF6EF',
    padding: 10,
    borderRadius: 7,
  },
  titleStyle: {
    marginLeft: 15,
    marginRight: '39%',
  },
});
