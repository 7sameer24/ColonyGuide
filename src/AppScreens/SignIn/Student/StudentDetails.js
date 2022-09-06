import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBody from '../../../Components/HeaderBody';
import {COLORS, FONTS, genericStyles} from '../../../constants';
import InputComponent from '../../../Components/InputComponent';
import ButtonComponent from '../../../Components/ButtonComponent';
import ImgIcon from '../../../../assets/svg/Frame 12.svg';
import axios from 'axios';
import Poweredby from '../../../Components/Poweredby';
import {navigationStateType, useApp} from '../../../../Context/AppContext';
import BaseURL from '../../../constants/BaseURL';
import DropDownComponent from '../../../Components/DropDownComponent';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../../Components/Toast';

const StudentDetails = ({data, navigation}) => {
  const [FullName, setFullName] = useState('');
  const [hostelName, setHostelName] = useState('');
  const [hostelAdd, setHostelAdd] = useState('');
  const [WhatsappNo, setWhatsappNo] = useState();
  const [spinner, setSpinner] = useState(false);
  const [newData, setData] = useState([]);
  const [LocalityValue, setLocality] = useState('');
  const {setNewData, setUserToken, setNavigationState, resumeDetails} =
    useApp();
  const toast = useToast();

  const handleOnSubmit = async () => {
    if (!FullName || !hostelName || !hostelAdd) {
      Toast(toast, 'Please fill all required fields');
    } else if (WhatsappNo.length < 10 || WhatsappNo.length > 10) {
      Toast(toast, 'Please check your number and try again');
    } else if (!LocalityValue) {
      Toast(toast, 'Please select locality!');
    } else {
      try {
        setSpinner(true);
        const response = await axios({
          method: 'post',
          headers: {
            Authorization: `Bearer ${
              data == undefined ? resumeDetails.token : data.token
            }`,
          },
          url: BaseURL('add-details'),
          data: {
            user_id: data == undefined ? resumeDetails.user_id : data.user_id,
            app_role_id:
              data == undefined ? resumeDetails.app_role_id : data.app_role_id,
            full_name: FullName,
            hostel_name: hostelName,
            hostel_address: hostelAdd,
            whatsapp_no: WhatsappNo,
            locality_id: LocalityValue,
          },
        });
        setSpinner(false);
        if (response.data.success === true) {
          setNewData(response.data);
          setUserToken(data == undefined ? resumeDetails.token : data.token);
          // Toast(toast,`Welcome ${FullName}`);
        } else {
          alert(response.data);
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
  };
  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      setData(response.data.localities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    idx();
    return () => {
      setData([]);
    };
  }, []);
  return (
    <View style={genericStyles.Container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <HeaderBody
          Icon={<ImgIcon height={180} />}
          touchableOpacityStyle={genericStyles.mb(0)}
          title="Personal Details / व्यक्तिगत विवरण"
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
          maxLength={10}
          autoCapitalize="words"
          onChangeText={num => setWhatsappNo(num)}
          keyboardType="number-pad"
        />
        <DropDownComponent
          data={newData}
          labelField="name"
          valueField="id"
          placeholder="Locality"
          value={LocalityValue}
          maxHeight={100}
          onChange={item => setLocality(item.id)}
        />
        <ButtonComponent
          title="Done"
          onPress={() => handleOnSubmit()}
          loading={spinner ? true : false}
          ButtonContainer={styles.ButtonContainer}
        />
      </ScrollView>
      <Poweredby />
    </View>
  );
};

export default StudentDetails;

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
