import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';
import ServiceDetails from './ServiceProvider/ServiceDetails';
import OwnerLocation from './HouseOwners/OwnerLocation';
import StudentDetails from './Student/StudentDetails';

const AllRegistration = ({route, navigation}) => {
  const {UserData} = route.params;
  return (
    <View style={styles.Container}>
      {UserData.app_role_id === 1 ? (
        <StudentDetails navigation={navigation} data={UserData} />
      ) : null}
      {UserData.app_role_id === 2 ? (
        <ServiceDetails navigation={navigation} UserNewData={UserData} />
      ) : null}
      {UserData.app_role_id === 3 ? (
        <OwnerLocation navigation={navigation} data={UserData} />
      ) : null}
    </View>
  );
};

export default AllRegistration;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
