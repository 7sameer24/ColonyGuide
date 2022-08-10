import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../../constants';
import InputComponent from '../../../Components/InputComponent';
import ButtonComponent from '../../../Components/ButtonComponent';
import DropDownComponent from '../../../Components/DropDownComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Spinner from '../../../Components/Spinner';
import Poweredby from '../../../Components/Poweredby';
import BaseURL from '../../../constants/BaseURL';
import ModalPopup from '../../../Components/ModalPopup';
import {useApp} from '../../../../Context/AppContext';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../../Components/Toast';

const ServiceForm = ({UserNewData}) => {
  const [imageUp, setImage] = useState('');
  const [shopName, setShop] = useState('');
  const [fullName, setFullName] = useState('');
  const [WhatsappNo, setWhatsappNo] = useState();
  const [shortDes, setShortDes] = useState('');
  const [newData, updateNewData] = useState([]);
  const [Category, setCategory] = useState('');
  const [localityData, setLocalityData] = useState([]);
  const [LocalityValue, setLocality] = useState('');
  const [colonyData, updateColonyData] = useState([]);
  const [colonyNo, updateColonyNo] = useState('');
  const [house, setHouseNo] = useState();
  const [Address, setAddress] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [spinner, setSpinner] = useState(false);
  const toast = useToast();

  const [modalVisible, setModalVisible] = useState(false);
  const {resumeDetails, setNewData, setUserToken} = useApp();

  const validationCheck = async () => {
    if (!WhatsappNo || !fullName || !Category || !house || !Address) {
      Toast(toast, 'Please fill all required fields');
    } else if (WhatsappNo.length < 10) {
      Toast(toast, 'Please check your Whatsapp number and try again');
    } else if (!imageUp) {
      Toast(toast, 'Please select image');
    } else if (!LocalityValue) {
      Toast(toast, 'Please select locality!');
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
        UserNewData != undefined ? UserNewData.user_id : resumeDetails.user_id,
      );
      Form.append(
        'app_role_id',
        UserNewData != undefined
          ? UserNewData.app_role_id
          : resumeDetails.app_role_id,
      );
      Form.append('full_name', fullName);
      // Form.append('geolocation', `${latitude},${longitude}`);
      Form.append('house_no', house);
      Form.append('address', Address);
      Form.append('landmark', Landmark);
      Form.append('shop_name', shopName);
      Form.append('about', shortDes);
      Form.append('category_id', Category);
      Form.append('whatsapp_no', WhatsappNo);
      Form.append('locality_id', LocalityValue);
      Form.append('street_id', colonyNo);
      Form.append(
        'logo_image',
        imageUp
          ? {
              uri: imageUp[0].uri,
              type: imageUp[0].type,
              name: imageUp[0].fileName,
            }
          : '',
      );

      const res = await fetch(BaseURL('add-details'), {
        method: 'post',
        body: Form,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${
            UserNewData != undefined ? UserNewData.token : resumeDetails.token
          }`,
        },
      });
      const response = await res.json();
      setSpinner(false);
      if (response.success === true) {
        setNewData(response);
        setUserToken(
          UserNewData != undefined ? UserNewData.token : resumeDetails.token,
        );
        Toast(
          toast,
          'Your profile is under review, Please wait for some time',
          5000,
        );
      } else {
        Toast(toast, response.message);
      }
    } catch (error) {
      setSpinner(false);
      Toast(toast, error);
    }
  };

  const openGallery = () => {
    setModalVisible(false);
    let opetions = {
      mediaType: 'photo',
      path: 'images',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    launchImageLibrary(opetions, response => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image ErrorCode', response.errorCode);
      } else if (response.errorMessage) {
        console.log('Image error Message', response.errorMessage);
      } else {
        const source = response.assets;
        setImage(source);
      }
    });
  };

  const openCamera = () => {
    setModalVisible(false);

    let opetions = {
      mediaType: 'photo',
      path: 'images',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    launchCamera(opetions, response => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image ErrorCode', response.errorCode);
      } else if (response.errorMessage) {
        console.log('Image error Message', response.errorMessage);
      } else {
        const source = response.assets;
        setImage(source);
      }
    });
  };

  const CategoryFetch = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      updateNewData(response.data.categories_all);
      setLocalityData(response.data.localities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CategoryFetch();
    return () => {
      updateNewData([]);
    };
  }, []);

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

  return (
    <View style={genericStyles.Container}>
      {newData.length > 0 ? (
        <>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View>
              <Text style={styles.text}>Service Details</Text>
              <Text style={styles.subText}>
                Enter the details below to continue
              </Text>
            </View>
            <TouchableOpacity
              style={genericStyles.selfCenter}
              activeOpacity={0.5}
              onPress={() => setModalVisible(true)}>
              <View style={styles.ImageContainer(imageUp)}>
                <Image
                  resizeMode={imageUp ? null : 'contain'}
                  source={imageUp ? imageUp : Images.BusinessProfile}
                  style={styles.imageStyle(imageUp)}
                />
              </View>
              <Text style={styles.AddLogoText}>Add image / logo</Text>
            </TouchableOpacity>
            <ModalPopup
              visible={modalVisible}
              CameraOnpress={() => openCamera()}
              GalleryOnpress={() => openGallery()}
              OnPressCancel={() => setModalVisible(false)}
              onRequestClose={() => setModalVisible(false)}
            />
            <InputComponent
              placeholder="Shop Name (Optional)"
              value={shopName}
              onChangeText={text => setShop(text)}
              autoCapitalize="words"
            />
            <InputComponent
              placeholder="Full name"
              value={fullName}
              onChangeText={text => setFullName(text)}
              autoCapitalize="words"
            />
            <DropDownComponent
              data={newData}
              labelField="name"
              valueField="id"
              value={Category}
              placeholder="Select Category"
              maxHeight={200}
              onChange={item => setCategory(item.id)}
            />
            <InputComponent
              placeholder="Whatsapp number"
              value={WhatsappNo}
              onChangeText={num => setWhatsappNo(num)}
              keyboardType="number-pad"
              autoCapitalize="words"
              maxLength={10}
            />
            <InputComponent
              placeholder="What services you provide (Only 100 Words)"
              value={shortDes}
              onChangeText={text => setShortDes(text)}
              autoCapitalize="words"
              multiline={true}
              maxLength={100}
            />
            <InputComponent
              placeholder="Flat / House No."
              value={house}
              onChangeText={num => setHouseNo(num)}
              autoCapitalize="words"
            />
            <InputComponent
              placeholder="Address"
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
              data={localityData}
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
          </ScrollView>
          <ButtonComponent
            title="Next"
            loading={spinner}
            onPress={() => validationCheck()}
            ButtonContainer={styles.ButtonContainer(imageUp)}
          />
          <Poweredby container={{flex: 0}} />
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default ServiceForm;

const styles = StyleSheet.create({
  imageStyle: imageUp => ({
    width: imageUp ? 70 : 40,
    height: imageUp ? 70 : 40,
    borderRadius: imageUp ? 50 : 0,
  }),
  AddLogoText: {
    fontSize: 12,
    color: COLORS.third,
    fontFamily: FONTS.InterMedium,
    marginBottom: 40,
  },
  ImageContainer: imageUp => ({
    backgroundColor: imageUp ? COLORS.white : COLORS.secondary,
    padding: imageUp ? 0 : 15,
    borderRadius: 50,
    alignSelf: 'center',
  }),
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
    marginTop: 20,
    fontFamily: FONTS.InterSemiBold,
  },
  subText: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.third,
    marginBottom: 20,
    fontFamily: FONTS.InterRegular,
  },
  ButtonContainer: imageUp => ({
    marginTop: '5%',
  }),
});
