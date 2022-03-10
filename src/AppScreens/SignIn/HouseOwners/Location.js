import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBody from '../../../Components/HeaderBody';
import {genericStyles, Images} from '../../../constants';
import ButtonComponent from '../../../Components/ButtonComponent';

const Location = ({navigation}) => {
  return (
    <View style={genericStyles.Container}>
      <HeaderBody
        source={Images.Location}
        title="Your Location"
        subTitle="Enter the otp sent to the mobile number
+91-xxx-xxxx-xxx"
      />

      <ButtonComponent
        title="Set Location"
        ButtonContainer={styles.abb}
        onPress={() => navigation.navigate('Address')}
      />
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  abb: {
    top: '27%',
  },
});
