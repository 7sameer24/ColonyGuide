import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Input} from 'react-native-elements';
import ButtonComponent from '../../Components/ButtonComponent';
import FooterButton from '../../Components/FooterButton';
import {CommonActions} from '@react-navigation/native';
import axios from 'axios';

const OtpScreen = ({route, navigation}) => {
  const {DATA} = route.params;
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [last, setLast] = useState('');
  const [spinner, setSpinner] = useState(false);
  const secondInput = useRef(null);
  const thirdInput = useRef(null);
  const LastInput = useRef(null);

  const checkOtp = async () => {
    let idx = `${first}${second}${third}${last}`;
    try {
      setSpinner(true);
      const URL = 'https://colonyguide.garimaartgallery.com/api/verify-otp';
      const response = await axios.post(URL, {
        user_id: DATA.data.user_id,
        otp: idx,
      });
      setSpinner(false);
      if (response.data.success === true) {
        ToastAndroid.show('OTP verified successfully', ToastAndroid.SHORT);
        if (4 === DATA.data.app_role_id) {
          navigation.dispatch(
            CommonActions.reset({
              routes: [{name: 'Feed'}],
            }),
          );
        } else {
          navigation.navigate('Registration', {UserData: DATA.data});
        }
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.Container}>
      <View style={styles.ViewContainer}>
        <Image source={Images.otp} style={styles.imageStyle} />
        <Text style={styles.text}>OTP Verification</Text>
        <Text style={styles.subText}>
          Enter the otp sent to the mobile number
        </Text>
        <Text style={styles.subText}>+91-xxx-xxxx-xxx</Text>
        <Text style={styles.subText}>Your Otp : {DATA.data.otp}</Text>
      </View>

      <View style={styles.InputView}>
        <Input
          containerStyle={genericStyles.width(40)}
          keyboardType="number-pad"
          inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
          maxLength={1}
          value={first}
          onChangeText={num => setFirst(num)}
          autoFocus={true}
          onSubmitEditing={() => (first ? secondInput.current.focus() : null)}
        />
        <Input
          containerStyle={genericStyles.width(40)}
          keyboardType="number-pad"
          inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
          maxLength={1}
          value={second}
          onChangeText={num => setSecond(num)}
          ref={secondInput}
          onSubmitEditing={() => (second ? thirdInput.current.focus() : null)}
        />
        <Input
          containerStyle={genericStyles.width(40)}
          keyboardType="number-pad"
          inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
          maxLength={1}
          value={third}
          onChangeText={num => setThird(num)}
          ref={thirdInput}
          onSubmitEditing={() => (third ? LastInput.current.focus() : null)}
        />
        <Input
          containerStyle={genericStyles.width(40)}
          inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
          keyboardType="number-pad"
          maxLength={1}
          value={last}
          onChangeText={num => setLast(num)}
          ref={LastInput}
        />
      </View>
      <ButtonComponent
        title="Verify"
        onPress={() => checkOtp()}
        loading={spinner ? true : false}
      />
      <FooterButton title="Resend OTP" />
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageStyle: {
    alignSelf: 'center',
    width: 316,
    height: 283,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
    marginTop: 20,
    fontFamily: FONTS.InterSemiBold,
    marginBottom: 5,
  },
  subText: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.third,
    fontFamily: FONTS.InterRegular,
  },
  ViewContainer: {
    marginTop: '15%',
  },
  InputView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
