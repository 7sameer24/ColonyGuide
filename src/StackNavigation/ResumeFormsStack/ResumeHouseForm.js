import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddressScreen from '../../AppScreens/SignIn/HouseOwners/AddressScreen';
import OwnerLocation from '../../AppScreens/SignIn/HouseOwners/OwnerLocation';

export default function ResumeHouseForm() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      <Stack.Screen
        name="OwnerLocation"
        component={OwnerLocation}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
