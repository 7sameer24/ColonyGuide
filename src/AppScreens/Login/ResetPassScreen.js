import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {genericStyles, Images} from '../../constants';
import HeaderBody from '../../Components/HeaderBody';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ImgIcon from '../../../assets/svg/Frame 8.svg';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';
import Poweredby from '../../Components/Poweredby';

const ResetPassScreen = ({navigation, route}) => {
  const {user_id} = route.params.data;
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [spinner, setSpinner] = useState(false);
  // console.log(user_id);

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
    <ScrollView style={genericStyles.Container}>
      <HeaderBody
        title="Reset Password"
        subTitle="Enter a strong password"
        Icon={<ImgIcon width={304.52} height={268.18} />}
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
        ButtonContainer={{marginTop: 25, marginBottom: 20}}
      />
      <Poweredby textStyle={genericStyles.mt(0)} />
    </ScrollView>
  );
};

export default ResetPassScreen;

const styles = StyleSheet.create({});
