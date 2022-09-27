import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HoAddress from '../../AppScreens/SignIn/HouseOwners/HoAddress';

export default function ResumeHouseForm() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      <Stack.Screen
        name="HoAddress"
        component={HoAddress}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
