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
import {navigationStateType, useApp} from '../../../../Context/AppContext';
import BaseURL from '../../../constants/BaseURL';

const AddressScreen = ({route, navigation}) => {
  const {
    latitude,
    longitude,
    ShopName,
    FullName,
    WhatsappNum,
    CategoryShop,
    UserData,
    imageLogo,
    ShortDescription,
  } = route.params;

  const [HOName, setHOName] = useState('');
  const [house, setHouseNo] = useState();
  const [Address, setAddress] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [newData, setData] = useState([]);
  const [LocalityValue, setLocality] = useState('');
  const {setNewData, setUserToken, setNavigationState} = useApp();

  const VelidationCheck = async () => {
    if (!house || !Address) {
      ToastAndroid.show('Please fill all required fields', ToastAndroid.SHORT);
    } else if (!LocalityValue) {
      ToastAndroid.show('Please choose locality!', ToastAndroid.SHORT);
    } else if (UserData.app_role_id == 3) {
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

      Form.append('user_id', UserData.user_id);
      Form.append('app_role_id', UserData.app_role_id);
      Form.append('full_name', UserData.app_role_id == 3 ? HOName : FullName);
      Form.append('geolocation', `${latitude},${longitude}`);
      Form.append('house_no', house);
      Form.append('address', Address);
      Form.append('landmark', Landmark);
      Form.append('shop_name', ShopName);
      Form.append('about', ShortDescription);
      Form.append('category_id', CategoryShop);
      Form.append('whatsapp_no', WhatsappNum);
      Form.append('locality_id', LocalityValue);
      Form.append(
        'logo_image',
        UserData.app_role_id === 3
          ? ''
          : imageLogo
          ? {
              uri: imageLogo[0].uri,
              type: imageLogo[0].type,
              name: imageLogo[0].fileName,
            }
          : '',
      );

      const res = await fetch(BaseURL('add-details'), {
        method: 'post',
        body: Form,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${UserData.token}`,
        },
      });
      const response = await res.json();
      setSpinner(false);
      if (response.success === true) {
        setNewData(response);
        setUserToken(UserData.token);
        setNavigationState(navigationStateType.HOME);
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
          <ScrollView>
            <HeaderBody
              Icon={<ImgIcon height={160} />}
              title="Your Address"
              subTitle="Enter the otp sent to the mobile number +91-xxx-xxxx-xxx"
              touchableOpacityStyle={genericStyles.mb(0)}
              subTitleStyle={genericStyles.mb(0)}
            />
            <View style={genericStyles.mb('5%')}>
              {UserData.app_role_id === 3 ? (
                <InputComponent
                  placeholder="Full name"
                  value={HOName}
                  onChangeText={text => setHOName(text)}
                  autoCapitalize="words"
                />
              ) : null}
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
                onChange={item => setLocality(item.id)}
              />
            </View>
            <ButtonComponent
              title="Save"
              onPress={() => VelidationCheck()}
              loading={spinner ? true : false}
            />
            <View style={genericStyles.height(20)} />
          </ScrollView>
          <Poweredby />
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default AddressScreen;
