import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../../constants';
import InputComponent from '../../../Components/InputComponent';
import ButtonComponent from '../../../Components/ButtonComponent';
import DropDownComponent from '../../../Components/DropDownComponent';
import axios from 'axios';
import BaseURL from '../../../constants/BaseURL';
import {useApp} from '../../../../Context/AppContext';
import Toast from '../../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';

const AddAdminUser = ({navigation}) => {
  const {adminToken} = useApp();
  const toast = useToast();
  const [name, UpdateName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, UpdateEmail] = useState('');
  const [password, UpdatePass] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [LocalityValue, setLocality] = useState('');
  const [localityData, setLocalityData] = useState([]);

  const ValidateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    Toast(toast, 'You have entered an invalid email address!');
    return false;
  };

  const AddDetails = async () => {
    if (!name) {
      Toast(toast, 'Please enter name!');
    } else if (mobile.length < 10) {
      Toast(toast, 'Please check your mobile number!');
    } else if (!password) {
      Toast(toast, 'Please enter password!');
    } else if (password.length < 8) {
      Toast(toast, 'Please enter 8 or more characters');
    } else if (!LocalityValue) {
      Toast(toast, 'Please select locality!');
    } else {
      if (email.length > 0 && ValidateEmail() === false) {
        return false;
      }
      setSpinner(true);
      try {
        const response = await axios(BaseURL('admin-register'), {
          method: 'post',
          data: {
            name: name,
            mobile_no: mobile,
            password: password,
            email: email,
            locality_id: LocalityValue,
          },
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setSpinner(false);
        if (response.data.success) {
          navigation.navigate('Admin');
          Toast(toast, response.data.message);
        } else {
          Toast(toast, response.data.message);
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
  };

  const CategoryFetch = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      setLocalityData(response.data.localities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CategoryFetch();
    return () => {
      setLocalityData([]);
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      <InputComponent
        placeholder="Name"
        iconName="person"
        value={name}
        onChangeText={text => UpdateName(text)}
      />
      <InputComponent
        placeholder="Mobile Number"
        iconName="call"
        maxLength={10}
        value={mobile}
        keyboardType="number-pad"
        onChangeText={text => setMobile(text)}
      />
      <InputComponent
        placeholder="Email"
        iconName="mail"
        value={email}
        onChangeText={text => UpdateEmail(text)}
      />
      <InputComponent
        placeholder="Password"
        iconName="lock-closed"
        value={password}
        onChangeText={text => UpdatePass(text)}
      />
      <DropDownComponent
        data={localityData}
        labelField="name"
        valueField="id"
        placeholder="Locality (required)"
        value={LocalityValue}
        maxHeight={localityData.length > 1 ? 150 : 50}
        onChange={item => {
          setLocality(item.id);
        }}
      />

      <ButtonComponent
        title="Save"
        loading={spinner}
        ButtonContainer={genericStyles.mt(20)}
        onPress={() => AddDetails()}
      />
    </View>
  );
};

export default AddAdminUser;

const styles = StyleSheet.create({});
