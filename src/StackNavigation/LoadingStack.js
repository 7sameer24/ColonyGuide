import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Spinner from '../Components/Spinner';

export default function LoadingStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Loader"
        component={Spinner}
        options={({route}) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
