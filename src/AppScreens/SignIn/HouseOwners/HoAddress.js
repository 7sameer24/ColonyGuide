import {ScrollView, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBody from '../../../Components/HeaderBody';
import {genericStyles} from '../../../constants';
import ButtonComponent from '../../../Components/ButtonComponent';
import InputComponent from '../../../Components/InputComponent';
import axios from 'axios';
import DropDownComponent from '../../../Components/DropDownComponent';
import ImgIcon from '../../../../assets/svg/Frame 11.svg';
import Spinner from '../../../Components/Spinner';
import Poweredby from '../../../Components/Poweredby';
import {useApp} from '../../../../Context/AppContext';
import BaseURL from '../../../constants/BaseURL';

const HoAddress = ({data}) => {
  const [HOName, setHOName] = useState('');
  const [house, setHouseNo] = useState();
  const [Address, setAddress] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [newData, setData] = useState([]);
  const [LocalityValue, setLocality] = useState('');
  const [colonyData, updateColonyData] = useState([]);
  const [colonyNo, updateColonyNo] = useState('');

  const {setNewData, setUserToken, resumeDetails} = useApp();

  const VelidationCheck = async () => {
    if (!house || !Address) {
      ToastAndroid.show('Please fill all required fields', ToastAndroid.SHORT);
    } else if (!LocalityValue) {
      ToastAndroid.show('Please choose locality!', ToastAndroid.SHORT);
    } else if (!colonyNo) {
      ToastAndroid.show('Please choose colony no.!', ToastAndroid.SHORT);
    } else if (
      data != undefined ? data.app_role_id == 3 : resumeDetails.app_role_id == 3
    ) {
      !HOName
        ? ToastAndroid.show('Please enter full name!', ToastAndroid.SHORT)
        : handleOnSubmit();
    } else {
      handleOnSubmit();
    }
  };

  const handleOnSubmit = async () => {
    try {
      setSpinner(true);
      const Form = new FormData();

      Form.append(
        'user_id',
        data != undefined ? data.user_id : resumeDetails.user_id,
      );
      Form.append(
        'app_role_id',
        data != undefined ? data.app_role_id : resumeDetails.app_role_id,
      );
      Form.append('full_name', HOName);
      Form.append('house_no', house);
      Form.append('address', Address);
      Form.append('landmark', Landmark);
      Form.append('locality_id', LocalityValue);
      Form.append('street_id', colonyNo);

      const res = await fetch(BaseURL('add-details'), {
        method: 'post',
        body: Form,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${
            data != undefined ? data.token : resumeDetails.token
          }`,
        },
      });
      const response = await res.json();
      setSpinner(false);
      if (response.success === true) {
        setNewData(response);
        setUserToken(data != undefined ? data.token : resumeDetails.token);
        // ToastAndroid.show(
        //   UserData.app_role_id === 3
        //     ? `Welcome ${HOName}`
        //     : `Welcome ${FullName}`,
        //   ToastAndroid.SHORT,
        // );
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setSpinner(false);
      alert(error);
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

  const fetchStreetNo = async id => {
    try {
      const response = await axios.post(BaseURL('get-street-no'), {
        locality_id: id,
      });
      updateColonyData(response.data);
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
      {newData.length > 0 ? (
        <>
          <ScrollView keyboardShouldPersistTaps="handled">
            <HeaderBody
              Icon={<ImgIcon height={180} />}
              title="Your Address"
              subTitle="Enter the details below to continue"
              touchableOpacityStyle={genericStyles.mb(0)}
              subTitleStyle={genericStyles.mb(0)}
            />
            <View style={genericStyles.mb('5%')}>
              <InputComponent
                placeholder="Full name"
                value={HOName}
                onChangeText={text => setHOName(text)}
                autoCapitalize="words"
              />
              <InputComponent
                placeholder="Flat / House No."
                value={house}
                onChangeText={num => setHouseNo(num)}
                autoCapitalize="words"
              />
              <InputComponent
                placeholder="Address Line"
                value={Address}
                onChangeText={text => setAddress(text)}
                autoCapitalize="words"
              />
              <InputComponent
                placeholder="Landmark (optional)"
                value={Landmark}
                onChangeText={text => setLandmark(text)}
                autoCapitalize="words"
              />
              <DropDownComponent
                data={newData}
                labelField="name"
                valueField="id"
                placeholder="Locality"
                value={LocalityValue}
                maxHeight={100}
                onChange={item => {
                  setLocality(item.id);
                  fetchStreetNo(item.id);
                }}
              />

              <DropDownComponent
                data={colonyData}
                labelField="street_no"
                valueField="id"
                placeholder="Colony No."
                value={colonyNo}
                maxHeight={100}
                onChange={item => updateColonyNo(item.id)}
              />
            </View>
          </ScrollView>
          <ButtonComponent
            title="Save"
            onPress={() => VelidationCheck()}
            loading={spinner}
          />
          <Poweredby container={{flex: 0}} />
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default HoAddress;
