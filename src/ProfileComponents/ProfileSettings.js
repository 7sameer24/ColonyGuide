import {Keyboard, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import axios from 'axios';
import Poweredby from '../Components/Poweredby';

const ProfileSettings = ({route}) => {
  const {userID, userToken} = route.params;
  const [spinner, setSpinner] = useState(false);
  const [Password, setPassword] = useState('');
  const [OLPass, setOLPass] = useState('');
  const [CPASS, setCPASS] = useState('');

  const ChangePassword = async () => {
    try {
      setSpinner(true);
      const URL =
        'https://colonyguide.garimaartgallery.com/api/change-password';
      const response = await axios({
        url: URL,
        method: 'post',
        headers: {Authorization: `Bearer ${userToken}`},
        data: {
          user_id: userID,
          old_password: OLPass,
          password: Password,
          c_password: CPASS,
        },
      });
      setSpinner(false);
      Keyboard.dismiss();
      if (response.data.success === true) {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setSpinner(false);
      alert(error);
    }
  };

  return (
    <View style={genericStyles.Container}>
      <View>
        <InputComponent
          placeholder="Old password"
          iconName="lock-closed"
          value={OLPass}
          onChangeText={text => setOLPass(text)}
        />
        <InputComponent
          placeholder="New password"
          iconName="lock-closed"
          value={Password}
          onChangeText={text => setPassword(text)}
        />
        <InputComponent
          placeholder="Confirm password"
          iconName="lock-closed"
          value={CPASS}
          onChangeText={text => setCPASS(text)}
        />
        <ButtonComponent
          title="Save"
          loading={spinner ? true : false}
          ButtonContainer={genericStyles.mt(20)}
          onPress={() => ChangePassword()}
        />
      </View>
      <Poweredby />
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
