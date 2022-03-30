import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import HeaderBody from '../../../Components/HeaderBody';
import {COLORS, FONTS, genericStyles, Images} from '../../../constants';
import InputComponent from '../../../Components/InputComponent';
import ButtonComponent from '../../../Components/ButtonComponent';
import ImgIcon from '../../../../assets/svg/Frame 12.svg';
import axios from 'axios';
import Poweredby from '../../../Components/Poweredby';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalDetails = ({data, navigation}) => {
  const [FullName, setFullName] = useState('');
  const [hostelName, setHostelName] = useState('');
  const [hostelAdd, setHostelAdd] = useState('');
  const [WhatsappNo, setWhatsappNo] = useState();
  const [spinner, setSpinner] = useState(false);

  const handleOnSubmit = async () => {
    if (!FullName || !hostelName || !hostelAdd) {
      ToastAndroid.show('Please fill all required fields', ToastAndroid.SHORT);
    } else if (WhatsappNo.length < 10 || WhatsappNo.length > 10) {
      ToastAndroid.show(
        'Please check your number and try again',
        ToastAndroid.SHORT,
      );
    } else {
      try {
        setSpinner(true);
        const URL = 'https://colonyguide.garimaartgallery.com/api/add-details';
        const response = await axios({
          method: 'post',
          headers: {Authorization: `Bearer ${data.token}`},
          url: URL,
          data: {
            user_id: data.user_id,
            app_role_id: data.app_role_id,
            full_name: FullName,
            hostel_name: hostelName,
            hostel_address: hostelAdd,
            whatsapp_no: WhatsappNo,
          },
        });
        setSpinner(false);
        if (response.data.success === true) {
          await AsyncStorage.setItem(
            'UserLogin',
            JSON.stringify(response.data),
          );
          await AsyncStorage.setItem('UserToken', JSON.stringify(data.token));
          navigation.navigate('Feed');
          ToastAndroid.show(`Welcome ${FullName}`, ToastAndroid.SHORT);
        } else {
          alert(response.data);
        }
      } catch (error) {
        setSpinner(false);
        alert(error);
      }
    }
  };
  return (
    <View style={genericStyles.Container}>
      <ScrollView>
        <HeaderBody
          Icon={<ImgIcon />}
          touchableOpacityStyle={genericStyles.mb(0)}
          title="Personal Details"
          subTitle="Enter the details below to continue"
          subTitleStyle={genericStyles.mb(0)}
        />
        <InputComponent
          placeholder="Full Name"
          value={FullName}
          autoCapitalize="words"
          onChangeText={text => setFullName(text)}
        />
        <InputComponent
          placeholder="Hostel Name"
          value={hostelName}
          autoCapitalize="words"
          onChangeText={text => setHostelName(text)}
        />
        <InputComponent
          placeholder="Hostel Address"
          value={hostelAdd}
          autoCapitalize="words"
          onChangeText={text => setHostelAdd(text)}
        />
        <InputComponent
          placeholder="Whatsapp number"
          value={WhatsappNo}
          autoCapitalize="words"
          onChangeText={num => setWhatsappNo(num)}
          keyboardType="number-pad"
        />
        <ButtonComponent
          title="Done"
          onPress={() => handleOnSubmit()}
          loading={spinner ? true : false}
          ButtonContainer={styles.ButtonContainer}
        />
        <Poweredby container={genericStyles.mb(0)} />
      </ScrollView>
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  checkBoxContanier: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    marginTop: -5,
    marginBottom: 10,
  },
  CheckText: {
    color: COLORS.third,
    fontSize: 15,
    marginLeft: 2,
    fontFamily: FONTS.InterRegular,
    fontWeight: 'normal',
  },
  ButtonContainer: {marginBottom: 30, marginTop: 20},
});
