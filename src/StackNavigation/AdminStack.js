import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Dashboard from '../SuperAdmin/AdminScreens/Dashboard';
import AdminGallery from '../SuperAdmin/AdminScreens/AdminGallery';
import {COLORS, FONTS} from '../constants';
import AddGallery from '../SuperAdmin/AdminScreens/AddGallery';
import AdminEditGallery from '../SuperAdmin/AdminScreens/AdminEditGallery';
import AddEvent from '../SuperAdmin/AdminScreens/AddEvent';
import SendNotification from '../SuperAdmin/AdminScreens/SendNotification';
import ResidentApproval from '../SuperAdmin/AdminScreens/ResidentApproval';
import BlockScreen from '../SuperAdmin/AdminScreens/BlockScreen';
import UnblockScreen from '../SuperAdmin/AdminScreens/UnblockScreen';
import CommercialsBusiness from '../SuperAdmin/AdminScreens/CommercialsBusiness';
import CommercialsService from '../SuperAdmin/AdminScreens/CommercialsService';
import StudentApproval from '../SuperAdmin/AdminScreens/StudentApproval';
import ServiceProviderApproval from '../SuperAdmin/AdminScreens/ServiceProviderApproval';

const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

export default function AdminStack() {
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
        name="Add gallery"
        component={AddGallery}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
      <Stack.Screen
        name="Edit gallery"
        component={AdminEditGallery}
        options={() => ({
          headerStyle: {backgroundColor: COLORS.primary},
          headerTitleStyle: {color: COLORS.white},
          headerTintColor: COLORS.white,
        })}
      />
      <Stack.Screen
        name="Add event"
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
    </Stack.Navigator>
  );
}

function Approvals() {
  const TopTabsArr = [
    {component: StudentApproval, name: 'Student'},
    {
      component: ServiceProviderApproval,
      name: 'Service Provider',
    },
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
    {component: BlockScreen, name: 'Block', ID: 'Block'},
    {
      component: UnblockScreen,
      name: 'Unblock',
      ID: 'Unblock',
    },
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