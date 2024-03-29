import {Keyboard, View} from 'react-native';
import React, {useState} from 'react';
import {genericStyles} from '../constants';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import axios from 'axios';
import Poweredby from '../Components/Poweredby';
import BaseURL from '../constants/BaseURL';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../Components/Toast';

const ProfileSettings = ({route}) => {
  const toast = useToast();

  const {userID, userToken} = route.params;
  const [spinner, setSpinner] = useState(false);
  const [Password, setPassword] = useState('');
  const [OLPass, setOLPass] = useState('');
  const [CPASS, setCPASS] = useState('');

  const ChangePassword = async () => {
    try {
      setSpinner(true);
      const response = await axios({
        url: BaseURL('change-password'),
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
        Toast(toast, response.data.message);
      } else {
        Toast(toast, response.data.message);
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  return (
    <View style={genericStyles.Container}>
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
      <Poweredby />
    </View>
  );
};

export default ProfileSettings;
