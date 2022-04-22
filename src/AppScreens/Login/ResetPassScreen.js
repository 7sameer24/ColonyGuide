import {
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, genericStyles} from '../../constants';
import HeaderBody from '../../Components/HeaderBody';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ImgIcon from '../../../assets/svg/Frame 8.svg';
import axios from 'axios';
import Poweredby from '../../Components/Poweredby';
import {CommonActions} from '@react-navigation/native';

const ResetPassScreen = ({navigation, route}) => {
  const {user_id} = route.params.data;
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [spinner, setSpinner] = useState(false);

  const idx = async () => {
    if (!password || !c_password) {
      ToastAndroid.show('The password field is required.', ToastAndroid.SHORT);
    } else {
      try {
        setSpinner(true);
        const URL =
          'https://colonyguide.garimaartgallery.com/api/reset-password';
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
              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            } else {
              setSpinner(false);
              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            }
          });
      } catch (error) {
        setSpinner(false);
        alert(error);
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
