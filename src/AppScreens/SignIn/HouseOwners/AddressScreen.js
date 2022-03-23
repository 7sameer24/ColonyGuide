import {ScrollView, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBody from '../../../Components/HeaderBody';
import {genericStyles, Images} from '../../../constants';
import ButtonComponent from '../../../Components/ButtonComponent';
import InputComponent from '../../../Components/InputComponent';
import axios from 'axios';
import DropDownComponent from '../../../Components/DropDownComponent';
import ImgIcon from '../../../../assets/svg/Frame 11.svg';
import Spinner from '../../../Components/Spinner';
import Poweredby from '../../../Components/Poweredby';

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
  } = route.params;

  const [HOName, setHOName] = useState('');
  const [house, setHouseNo] = useState();
  const [Address, setAddress] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [newData, setNewData] = useState([]);
  const [LocalityValue, setLocality] = useState('');

  const handleOnSubmit = async () => {
    if (!house || !Address) {
      ToastAndroid.show('Please fill all required fields', ToastAndroid.SHORT);
    } else if (!LocalityValue) {
      ToastAndroid.show('Please choose locality!', ToastAndroid.SHORT);
    } else {
      try {
        setSpinner(true);
        const URL = 'https://colonyguide.garimaartgallery.com/api/add-details';
        const response = await axios({
          method: 'post',
          headers: {Authorization: `Bearer ${UserData.token}`},
          url: URL,
          data: {
            user_id: UserData.user_id,
            app_role_id: UserData.app_role_id,
            full_name: UserData.app_role_id === 3 ? HOName : FullName,
            geolocation: 'udaipur',
            house_no: house,
            address: Address,
            landmark: Landmark,
            shop_name: ShopName,
            category_id: CategoryShop,
            whatsapp_no: WhatsappNum,
            logo_image: imageLogo,
            locality_id: LocalityValue,
          },
        });
        setSpinner(false);
        navigation.navigate('Feed');
        ToastAndroid.show(
          UserData.app_role_id === 3
            ? `Welcome ${HOName}`
            : `Welcome ${FullName}`,
          ToastAndroid.SHORT,
        );
      } catch (error) {
        setSpinner(false);
        alert(error);
      }
    }
  };

  useEffect(() => {
    idx();
  }, []);

  const idx = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/get-all-master';
      const response = await axios.post(URL);
      setNewData(response.data.localities);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={genericStyles.Container}>
      {newData.length > 0 ? (
        <ScrollView>
          <>
            <HeaderBody
              Icon={<ImgIcon width={266} height={239} />}
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
                />
              ) : null}
              <InputComponent
                placeholder="Flat / House No."
                value={house}
                onChangeText={num => setHouseNo(num)}
              />
              <InputComponent
                placeholder="Address Line"
                value={Address}
                onChangeText={text => setAddress(text)}
              />
              <InputComponent
                placeholder="Landmark (optional)"
                value={Landmark}
                onChangeText={text => setLandmark(text)}
              />
              <DropDownComponent
                data={newData}
                labelField="name"
                valueField="id"
                placeholder="Locality"
                value={LocalityValue}
                onChange={item => setLocality(item.id)}
              />
            </View>
            <ButtonComponent
              title="Save"
              onPress={() => handleOnSubmit()}
              loading={spinner ? true : false}
              ButtonContainer={genericStyles.mv(10)}
            />
          </>
          <Poweredby />
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default AddressScreen;
