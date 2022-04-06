import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants';
import {Icon} from 'react-native-elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
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
import SearchScreen from '../Tabs/SearchScreen';
import BusinessListed from '../ProfileComponents/BusinessComponents/BusinessListed';
import VegetableFruits from '../Tabs/VegetableFruits';
import RoomsFlats from '../Tabs/RoomsFlats';
import Addroom from '../Tabs/Addroom';
import EditProfile from '../ProfileComponents/EditProfile';
import FeedBacks from '../Tabs/FeedBacks';
import ServiceEdit from '../ProfileComponents/BusinessComponents/ServiceEdit';
import ServiceSaved from '../ProfileComponents/BusinessComponents/ServiceSaved';
import Notification from '../Tabs/Notification';
import AllRoomsHostals from '../Tabs/AllRoomsHostals';
import BusinessEdit from '../ProfileComponents/BusinessComponents/BusinessEdit';
import HostelListed from '../Tabs/HostelListed';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

const HomeStack = ({navigation}) => {
  const arr = [
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
      headerShown: false,
    },
    {
      name: 'Settings',
      component: ProfileSettings,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      title: 'Change Password',
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
      name: 'Feedbacks',
      component: FeedBacks,
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
      name: 'Rooms/Flats',
      component: MyTopTabs,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      headerShown: true,
      title: 'Rooms/PG',
    },
    {
      name: 'Add room',
      component: Addroom,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Edit Personal Details',
      component: EditProfile,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Notification',
      component: Notification,
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
          options={() => ({
            headerShown: data.headerShown,
            headerTransparent: data.headerTransparent,
            headerTitleStyle: data.headerTitleStyle,
            headerTintColor: data.headerTintColor,
            headerShadowVisible: data.headerShadowVisible,
            headerBackVisible: data.headerBackVisible,
            title: data.title,
          })}
        />
      ))}
      <Stack.Screen
        name="Business Infoo"
        component={BusinessInfo}
        options={() => ({
          headerTitleStyle: styles.headerStyle,
          headerTintColor: COLORS.textColor,
          headerShadowVisible: false,
          headerShown: false,
          title: 'Business Information',
        })}
      />
      <Stack.Screen
        name="Service Info"
        component={ServiceInfo}
        options={() => ({
          headerTitleStyle: styles.headerStyle,
          headerTintColor: COLORS.textColor,
          headerShadowVisible: false,
          title: 'Add Service Provider',
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
        name="ServiceEdit"
        component={ServiceEdit}
        options={() => ({
          title: 'Service Edit',
          headerTitleStyle: styles.headerStyle,
          headerTintColor: COLORS.textColor,
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="BusinessEdit"
        component={BusinessEdit}
        options={() => ({
          title: 'Business Edit',
          headerTitleStyle: styles.headerStyle,
          headerTintColor: COLORS.textColor,
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Business Saved"
        component={BusinessSaved}
        options={() => ({
          title: 'Business Information',
          headerTitleStyle: [styles.headerStyle, {color: COLORS.white}],
          headerTintColor: COLORS.white,
          headerStyle: {backgroundColor: COLORS.primary},
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="ServiceSaved"
        component={ServiceSaved}
        options={() => ({
          title: 'Service Information',
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
    {component: AllRoomsHostals, name: 'All', ID: '0'},
    {component: HostelListed, name: 'Hostel', ID: '4'},
    {component: RoomsFlats, name: '1 BHK', ID: '1'},
    {component: RoomsFlats, name: '2 BHK', ID: '2'},
    {component: RoomsFlats, name: '3 BHK', ID: '3'},
  ];
  return (
    <TopTab.Navigator>
      {TopTabsArr.map(data => {
        return (
          <TopTab.Screen
            key={data.name}
            name={data.ID}
            component={data.component}
            options={{
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.textColor,
              tabBarLabelStyle: {fontSize: 14, fontFamily: FONTS.InterRegular},
              tabBarIndicatorStyle: {backgroundColor: COLORS.primary},
              tabBarPressColor: '#f2f2f2',
              tabBarItemStyle: {width: 90},
              tabBarScrollEnabled: true,
              title: data.name,
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

export default HomeStack;

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
  DrawerIcon: {
    backgroundColor: '#FEF6EF',
    padding: 10,
    borderRadius: 7,
  },
  titleStyle: {
    marginLeft: 15,
    marginRight: '29%',
  },
});
