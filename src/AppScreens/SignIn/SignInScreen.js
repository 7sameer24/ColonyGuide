import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Button} from 'react-native-elements';

const SignInScreen = ({navigation}) => {
  const arr = [
    {
      name: 'Student',
      buttonStyle: styles.buttonStyle1,
      ButtonContainer: styles.ButtonContainer1,
      titleColor: COLORS.primary,
      onPress: 'Register',
      role_id: 1,
    },
    {
      name: 'Service Provider',
      buttonStyle: styles.buttonStyle,
      ButtonContainer: styles.ButtonContainer,
      titleColor: COLORS.white,
      onPress: 'Register',
      role_id: 2,
    },
    {
      name: 'House Owners',
      buttonStyle: styles.buttonStyle1,
      ButtonContainer: styles.ButtonContainer1,
      titleColor: COLORS.primary,
      onPress: 'Register',
      role_id: 3,
    },
    {
      name: 'Visitor',
      buttonStyle: styles.buttonStyle,
      ButtonContainer: styles.ButtonContainer,
      titleColor: COLORS.white,
      onPress: 'Register',
      role_id: 4,
    },
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.TouchableOpacity}>
        <Text style={styles.TouchableText}>Skip to home</Text>
      </TouchableOpacity>
      <View style={genericStyles.mb(30)}>
        <Image source={Images.Sign} style={styles.imageStyle} />
        <Text style={styles.text}>Select your role</Text>
      </View>
      {arr.map(data => (
        <Button
          key={data.name}
          title={data.name}
          buttonStyle={data.buttonStyle}
          containerStyle={data.ButtonContainer}
          titleStyle={{color: data.titleColor, fontFamily: FONTS.InterSemiBold}}
          onPress={() =>
            navigation.navigate(data.onPress, {role_id: data.role_id})
          }
        />
      ))}
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  TouchableOpacity: {
    flexDirection: 'row-reverse',
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 40,
  },
  TouchableText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
    lineHeight: 19.36,
  },
  imageStyle: {
    alignSelf: 'center',
    width: 304.52,
    height: 226.91,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
    marginTop: 20,
    fontFamily: FONTS.InterSemiBold,
  },
  buttonStyle1: {
    paddingVertical: 20,
    backgroundColor: COLORS.transparent,
  },
  ButtonContainer1: {
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
  },
  ButtonContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
});
