import {ScrollView, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {genericStyles} from '../../constants';
import HeaderBody from '../../Components/HeaderBody';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import FooterButton from '../../Components/FooterButton';
import ImgIcon from '../../../assets/svg/Frame 7.svg';
import axios from 'axios';
import {navigationStateType, useApp} from '../../../Context/AppContext';

const ForgotScreen = ({navigation}) => {
  const [mobile_no, setMobile] = useState('');
  const [spinner, setSpinner] = useState(false);
  const {setNavigationState} = useApp();

  const idx = async () => {
    if (!mobile_no) {
      ToastAndroid.show('The mobile no field is required.', ToastAndroid.SHORT);
    } else {
      try {
        setSpinner(true);
        const URL =
          'https://colonyguide.garimaartgallery.com/api/forgot-password';
        const response = await axios
          .post(URL, {mobile_no: mobile_no})
          .then(response => {
            setSpinner(false);
            if (response.data.success === true) {
              navigation.navigate('Otp', {
                DATA: response.data,
                userMobile: mobile_no,
              });
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

  const skipToHome = () => {
    setNavigationState(navigationStateType.GUEST);
  };

  return (
    <ScrollView
      style={genericStyles.Container}
      keyboardShouldPersistTaps="handled">
      <HeaderBody
        Skip="Skip"
        title="Forgot Password"
        subTitle="Please enter your mobile number associated 
with your account"
        onPress={() => skipToHome()}
        Icon={<ImgIcon height={160} />}
      />
      <InputComponent
        placeholder="Mobile Number"
        iconName="call"
        iconSize={25}
        value={mobile_no}
        onChangeText={num => setMobile(num)}
        keyboardType="number-pad"
        errorStyle={genericStyles.fontSize(5)}
      />
      <ButtonComponent
        title="Request OTP"
        loading={spinner ? true : false}
        ButtonContainer={genericStyles.mt(17)}
        onPress={() => idx()}
      />
      <FooterButton
        title="Back"
        textStyle={{fontSize: 14, marginTop: 10}}
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  );
};

export default ForgotScreen;
