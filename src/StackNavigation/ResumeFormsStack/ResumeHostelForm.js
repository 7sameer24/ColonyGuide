import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StudentDetails from '../../AppScreens/SignIn/Student/StudentDetails';

export default function ResumeServiceForm() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      <Stack.Screen
        name="StudentDetails"
        component={StudentDetails}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
