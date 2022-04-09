import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Maintenance from '../AppScreens/Maintenance';

export default function MaintenanceStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Maintenance}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
