import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Dashboard from '../SuperAdmin/AdminScreens/Dashboard';
import AdminGallery from '../SuperAdmin/AdminScreens/AdminGallery';
import {COLORS, FONTS} from '../constants';
import AddGallery from '../SuperAdmin/AdminScreens/AddGallery';
import AdminEvent from '../SuperAdmin/AdminScreens/AdminEvent';
import SendNotification from '../SuperAdmin/AdminScreens/SendNotification';
import ResidentApproval from '../SuperAdmin/AdminScreens/ResidentApproval';
import BlockScreen from '../SuperAdmin/AdminScreens/BlockScreen';
import UnblockScreen from '../SuperAdmin/AdminScreens/UnblockScreen';
import CommercialsBusiness from '../SuperAdmin/AdminScreens/CommercialsBusiness';
import CommercialsService from '../SuperAdmin/AdminScreens/CommercialsService';
import StudentApproval from '../SuperAdmin/AdminScreens/StudentApproval';
import ServiceProviderApproval from '../SuperAdmin/AdminScreens/ServiceProviderApproval';
import AdminUserInfo from '../SuperAdmin/AdminScreens/AdminUserInfo';
import AddNotification from '../SuperAdmin/AdminScreens/AdminNotification/AddNotification';
import AddEvent from '../SuperAdmin/AdminScreens/AdminEvent/AddEvent';
import MoreImg from '../ProfileComponents/GalleryComponents/MoreImg';
import EventInfo from '../ProfileComponents/EventsComponets/EventInfo';
import AdminCustomDrawer from '../SuperAdmin/AdminScreens/AdminDrawer/AdminCustomDrawer';
import BusinessListed from '../ProfileComponents/BusinessComponents/BusinessListed';
import HouseOwners from '../Tabs/HouseOwner/HouseOwners';
import Helpline from '../Tabs/Helpline';
import Events from '../ProfileComponents/EventsComponets/Events';
import Gallery from '../ProfileComponents/GalleryComponents/Gallery';
import AdminList from '../SuperAdmin/AdminScreens/AdminAdd/AdminList';
import AddAdminUser from '../SuperAdmin/AdminScreens/AdminAdd/AddAdminUser';

const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const ScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      <Stack.Screen
        name="Admin"
        component={Dashboard}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Admin gallery"
        component={AdminGallery}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
      <Stack.Screen
        name="Add Gallery"
        component={AddGallery}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
      <Stack.Screen
        name="Event"
        component={AdminEvent}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
      <Stack.Screen
        name="Add Event"
        component={AddEvent}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
      <Stack.Screen
        name="Admin notification"
        component={SendNotification}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
          title: 'Notification',
        })}
      />
      <Stack.Screen
        name="Approvals"
        component={Approvals}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
      <Stack.Screen
        name="BlockUnblock"
        component={BlockUnblock}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
          title: 'Block',
        })}
      />
      <Stack.Screen
        name="Commercials"
        component={Commercials}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
      <Stack.Screen
        name="Add Notification"
        component={AddNotification}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
      <Stack.Screen
        name="User Information"
        component={AdminUserInfo}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="MoreImg"
        component={MoreImg}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="EventInfo"
        component={EventInfo}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Business listed"
        component={BusinessListed}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="House Owners"
        component={HouseOwners}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Helpline"
        component={Helpline}
        options={() => ({
          headerTitleStyle: styles.headerStyle,
          headerTintColor: COLORS.textColor,
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Events"
        component={Events}
        options={() => ({
          headerTitleStyle: styles.headerStyle,
          headerTintColor: COLORS.textColor,
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={() => ({
          headerTitleStyle: styles.headerStyle,
          headerTintColor: COLORS.textColor,
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Admin List"
        component={AdminList}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
      <Stack.Screen
        name="Add User"
        component={AddAdminUser}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
    </Stack.Navigator>
  );
};

function Approvals() {
  const TopTabsArr = [
    {component: StudentApproval, name: 'Student'},
    {component: ServiceProviderApproval, name: 'Service Provider'},
    {component: ResidentApproval, name: 'Resident'},
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
              tabBarLabelStyle: {fontSize: 10.3, fontFamily: FONTS.InterMedium},
              tabBarIndicatorStyle: {backgroundColor: COLORS.primary},
              tabBarPressColor: '#f2f2f2',
              title: data.name,
            }}
          />
        );
      })}
    </TopTab.Navigator>
  );
}

function BlockUnblock() {
  const TopTabsArr = [
    {component: BlockScreen, name: 'Blocked'},
    {component: UnblockScreen, name: 'Unblocked'},
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
              tabBarLabelStyle: {fontSize: 10.3, fontFamily: FONTS.InterMedium},
              tabBarIndicatorStyle: {backgroundColor: COLORS.primary},
              tabBarPressColor: '#f2f2f2',
              title: data.name,
            }}
          />
        );
      })}
    </TopTab.Navigator>
  );
}
function Commercials() {
  const TopTabsArr = [
    {component: CommercialsBusiness, name: 'Business'},
    {
      component: CommercialsService,
      name: 'Service',
    },
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
              tabBarLabelStyle: {fontSize: 10.3, fontFamily: FONTS.InterMedium},
              tabBarIndicatorStyle: {backgroundColor: COLORS.primary},
              tabBarPressColor: '#f2f2f2',
              title: data.name,
            }}
          />
        );
      })}
    </TopTab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <AdminCustomDrawer {...props} />}
      screenOptions={{
        drawerInactiveBackgroundColor: COLORS.transparent,
        drawerActiveBackgroundColor: COLORS.transparent,
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerInactiveTintColor: COLORS.textColor,
        drawerActiveTintColor: COLORS.textColor,
        drawerStyle: styles.drawerStyle,
        swipeEnabled: false,
      }}>
      <Drawer.Screen
        name="AdminDrawer"
        component={ScreenStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      <Stack.Screen
        name={'MainStack'}
        component={MyDrawer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AdminStack;

const styles = StyleSheet.create({
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
