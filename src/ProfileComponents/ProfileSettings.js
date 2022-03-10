import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';

const ProfileSettings = () => {
  return (
    <View style={genericStyles.Container}>
      <View>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.subTitle}>Enter a strong password</Text>
        <InputComponent placeholder="Old password" iconName="lock-closed" />
        <InputComponent placeholder="New password" iconName="lock-closed" />
        <InputComponent placeholder="Confirm password" iconName="lock-closed" />
      </View>
      <ButtonComponent
        title="Save"
        ButtonContainer={genericStyles.top('50%')}
      />
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginTop: 20,
    marginLeft: 20,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: FONTS.InterRegular,
    color: '#888888',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 30,
  },
});
