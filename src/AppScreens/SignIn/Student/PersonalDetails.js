import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import HeaderBody from '../../../Components/HeaderBody';
import {COLORS, FONTS, genericStyles, Images} from '../../../constants';
import InputComponent from '../../../Components/InputComponent';
import ButtonComponent from '../../../Components/ButtonComponent';
import axios from 'axios';

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
        ToastAndroid.show('Registration successful', ToastAndroid.SHORT);
        navigation.navigate('Feed');
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
          source={Images.Student}
          touchableOpacityStyle={genericStyles.mb(0)}
          title="Personal Details"
          subTitle="Enter the details below to continue"
          subTitleStyle={genericStyles.mb(0)}
        />
        <InputComponent
          placeholder="Full Name"
          value={FullName}
          onChangeText={text => setFullName(text)}
        />
        <InputComponent
          placeholder="Hostel Name"
          value={hostelName}
          onChangeText={text => setHostelName(text)}
        />
        <InputComponent
          placeholder="Hostel Address"
          value={hostelAdd}
          onChangeText={text => setHostelAdd(text)}
        />
        <InputComponent
          placeholder="Whatsapp number"
          value={WhatsappNo}
          onChangeText={num => setWhatsappNo(num)}
          keyboardType="number-pad"
        />
        <ButtonComponent
          title="Done"
          onPress={() => handleOnSubmit()}
          loading={spinner ? true : false}
          ButtonContainer={genericStyles.mv(20)}
        />
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
});
