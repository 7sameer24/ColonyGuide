import {ScrollView, StatusBar, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, genericStyles} from '../../constants';
import HeaderBody from '../../Components/HeaderBody';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ImgIcon from '../../../assets/svg/Frame 8.svg';
import axios from 'axios';
import Poweredby from '../../Components/Poweredby';
import {CommonActions} from '@react-navigation/native';
import Toast from '../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import BaseURL from '../../constants/BaseURL';

const ResetPassScreen = ({navigation, route}) => {
  const {user_id} = route.params.data;
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [spinner, setSpinner] = useState(false);
  const toast = useToast();

  const idx = async () => {
    if (!password || !c_password) {
      Toast(toast, 'The password field is required.');
    } else {
      try {
        setSpinner(true);
        const URL = BaseURL('reset-password');
        const response = await axios
          .post(URL, {
            user_id: user_id,
            password: password,
            confirm_password: c_password,
          })
          .then(response => {
            setSpinner(false);
            if (response.data.success === true) {
              navigation.dispatch(
                CommonActions.reset({
                  routes: [{name: 'Login'}],
                }),
              );
              Toast(toast, response.data.message);
            } else {
              setSpinner(false);
              Toast(toast, response.data.message);
            }
          });
      } catch (error) {
        setSpinner(false);
        Toast(toast, error);
      }
    }
  };
  return (
    <View style={genericStyles.Container}>
      <>
        <ScrollView keyboardShouldPersistTaps="handled">
          <StatusBar backgroundColor={COLORS.primary} />

          <HeaderBody
            title="Reset Password"
            subTitle="Enter a strong password"
            Icon={<ImgIcon height={160} />}
          />
          <InputComponent
            placeholder="Enter a strong password"
            errorStyle={genericStyles.fontSize(5)}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <InputComponent
            placeholder="Confirm password"
            errorStyle={genericStyles.fontSize(5)}
            value={c_password}
            onChangeText={text => setC_password(text)}
          />
          <ButtonComponent
            title="Continue"
            loading={spinner ? true : false}
            onPress={() => idx()}
            ButtonContainer={genericStyles.mv(20)}
          />
        </ScrollView>
      </>
      <Poweredby />
    </View>
  );
};

export default ResetPassScreen;
