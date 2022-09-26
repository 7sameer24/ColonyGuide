import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServiceForm from '../../AppScreens/SignIn/ServiceProvider/ServiceForm';
import AddressScreen from '../../AppScreens/SignIn/HouseOwners/AddressScreen';

export default function ResumeServiceForm() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      <Stack.Screen
        name="ServiceForm"
        component={ServiceForm}
        options={() => ({
          headerShown: false,
        })}
      />
      {/* <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={() => ({
          headerShown: false,
        })}
      /> */}
    </Stack.Navigator>
  );
}
