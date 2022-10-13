import {ScrollView, View} from 'react-native';
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
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../../Components/Toast';

const HoAddress = ({data}) => {
  const toast = useToast();
  const [HOName, setHOName] = useState('');
  const [house, setHouseNo] = useState();
  const [Address, setAddress] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [newData, setData] = useState([]);
  const [LocalityValue, setLocality] = useState('');
  const [colonyData, updateColonyData] = useState([]);
  const [colonyNo, updateColonyNo] = useState('');
  const [hideNmber, setHideNmber] = useState('');
  const [casteData, setCasteData] = useState([]);
  const [caste, setCaste] = useState([]);

  const {setNewData, setUserToken, resumeDetails} = useApp();

  const VelidationCheck = async () => {
    if (!house || !Address) {
      Toast(toast, 'Please fill all required fields');
    } else if (!hideNmber) {
      Toast(toast, 'Please choose hide or not your number');
    } else if (!LocalityValue) {
      Toast(toast, 'Please choose locality!');
    } else if (!caste) {
      Toast(toast, 'Please choose your caste!');
    } else if (
      data != undefined ? data.app_role_id == 3 : resumeDetails.app_role_id == 3
    ) {
      !HOName ? Toast(toast, 'Please enter full name!') : handleOnSubmit();
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
      // Form.append('street_id', colonyNo);
      Form.append('is_private', hideNmber);
      Form.append('caste_id', caste);

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
        // Toast(toast,
        //   UserData.app_role_id === 3
        //     ? `Welcome ${HOName}`
        //     : `Welcome ${FullName}`,
        // ,
        // );
      } else {
        Toast(toast, response.message);
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      setData(response.data.localities);
      setCasteData(response.data.caste);
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

  const HideNumber = [
    {name: 'Yes', id: '1'},
    {name: 'No', id: '0'},
  ];

  return (
    <View style={genericStyles.Container}>
      {newData.length > 0 ? (
        <>
          <ScrollView keyboardShouldPersistTaps="handled">
            <HeaderBody
              Icon={<ImgIcon height={160} />}
              title="Your Address"
              subTitle="Enter the details below to continue"
              touchableOpacityStyle={genericStyles.mb(0)}
              subTitleStyle={genericStyles.mb(0)}
            />
            <View style={genericStyles.mb('5%')}>
              <InputComponent
                placeholder="Full name (required)"
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
                placeholder="Address (required)"
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
                data={casteData}
                labelField="name"
                valueField="id"
                placeholder="Select your caste (required)"
                value={caste}
                maxHeight={150}
                onChange={item => {
                  setCaste(item.id);
                }}
              />
              <DropDownComponent
                data={HideNumber}
                labelField="name"
                valueField="id"
                placeholder="Do you want to hide your contact number ? (required)"
                value={hideNmber}
                maxHeight={100}
                onChange={item => {
                  setHideNmber(item.id);
                }}
              />
              <DropDownComponent
                data={newData}
                labelField="name"
                valueField="id"
                placeholder="Locality (required)"
                value={LocalityValue}
                maxHeight={100}
                onChange={item => {
                  setLocality(item.id);
                  fetchStreetNo(item.id);
                }}
              />
              {/* {LocalityValue !== 8 && (
                <DropDownComponent
                  data={colonyData}
                  labelField="street_no"
                  valueField="id"
                  placeholder="Colony No."
                  value={colonyNo}
                  maxHeight={200}
                  onChange={item => updateColonyNo(item.id)}
                />
              )} */}
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
