import React from 'react';
import {
  createNativeStackNavigator,
  createMaterialTopTabNavigator,
} from '@react-navigation/native-stack';
import Dashbord from '../SuperAdmin/AdminScreens/Dashbord';
import AdminGallery from '../SuperAdmin/AdminScreens/AdminGallery';
import {COLORS, FONTS} from '../constants';
import AddGallery from '../SuperAdmin/AdminScreens/AddGallery';
import AdminEditGallery from '../SuperAdmin/AdminScreens/AdminEditGallery';
import AddEvent from '../SuperAdmin/AdminScreens/AddEvent';
import SendNotification from '../SuperAdmin/AdminScreens/SendNotification';
import ResidentApproval from '../SuperAdmin/AdminScreens/ResidentApproval';
import ServiceApproval from '../SuperAdmin/AdminScreens/ServiceApproval';

export default function AdminStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      <Stack.Screen
        name="Admin"
        component={Dashbord}
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
          title: 'Approvals',
        })}
      />
    </Stack.Navigator>
  );
}

function Approvals() {
  const TopTab = createMaterialTopTabNavigator();
  const TopTabsArr = [
    {component: ResidentApproval, name: 'Resident', ID: 'Resident'},
    {
      component: ServiceApproval,
      name: 'Service Provider',
      ID: 'Service Provider',
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
              tabBarLabelStyle: {fontSize: 14, fontFamily: FONTS.InterMedium},
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
