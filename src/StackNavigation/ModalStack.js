import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LocalModal from '../Components/LocalModal';

export default function ModalStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      <Stack.Screen
        name="ModalStack"
        component={LocalModal}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
