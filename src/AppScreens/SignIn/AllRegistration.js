import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';
import Location from './HouseOwners/Location';
import PersonalDetails from './Student/PersonalDetails';
import ServiceDetails from './ServiceProvider/ServiceDetails';

const AllRegistration = ({route, navigation}) => {
  const {UserRole} = route.params;
  // console.log(UserRole);
  return (
    <View style={styles.Container}>
      {UserRole === 'House Owners' ? (
        <Location navigation={navigation} />
      ) : null}
      {UserRole === 'Student' ? (
        <PersonalDetails navigation={navigation} />
      ) : null}
      {UserRole === 'Service Provider' ? (
        <ServiceDetails navigation={navigation} />
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
