import {
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import axios from 'axios';
import DropDownComponent from '../../Components/DropDownComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Spinner from '../../Components/Spinner';
import Poweredby from '../../Components/Poweredby';
import {useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';
import ModalPopup from '../../Components/ModalPopup';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';

const BusinessDetails = ({navigation}) => {
  const toast = useToast();

  const {Userdata, UserToken, setCheckStatus, localityData} = useApp();
  const [businessCategoryData, setBusinessCategoryData] = useState([]);
  const [businessValue, updateBusinessValue] = useState('');
  const [imageUp, setImage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [ShopBusName, setShopBusName] = useState('');
  const [PersonName, setPersonName] = useState('');
  const [mobile_no, setMobile] = useState('');
  const [WhatsappNo, setWhatsappNo] = useState('');
  const [About, setAbout] = useState('');
  const [buildFL, setBuildFL] = useState('');
  const [AL1, setAL1] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [LocalityValue, setLocality] = useState('');

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'), {
        locality_id: Userdata.userData.locality_id,
      });
      setBusinessCategoryData(response.data.businessCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const openGallery = () => {
    let opetions = {
      mediaType: 'photo',
      path: 'images',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    launchImageLibrary(opetions, response => {
      setModalVisible(false);
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
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera();
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openCamera = () => {
    let opetions = {
      mediaType: 'photo',
      path: 'images',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

     launchCamera(opetions, response => {
      setModalVisible(false);
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

  const SaveDetail = async () => {
    if (mobile_no.length < 10) {
      Toast(toast, 'Please check your Mobile number and try again');
    } else if (WhatsappNo.length < 10) {
      Toast(toast, 'Please check your Whatsapp number and try again');
    } else if (!LocalityValue) {
      Toast(toast, 'Please choose your locality!');
    } else {
      try {
        setSpinner(true);
        const URL = BaseURL('add-service-detail');

        const data = new FormData();
        data.append('user_id', Userdata.userData.id);
        data.append('app_role_id', Userdata.userData.app_role_id);
        data.append('type', 0);
        data.append('service_name', ShopBusName);
        data.append('contact_person', PersonName);
        data.append('contact_person_mobile', mobile_no);
        data.append('contact_person_whatsapp', WhatsappNo);
        data.append('category_id', businessValue);
        data.append('about_service', About);
        data.append('house_no', buildFL);
        data.append('landmark', Landmark);
        data.append('business_address', AL1);
        data.append('locality_id', LocalityValue);

        data.append(
          'logo_image',
          imageUp !== ''
            ? {
                uri: imageUp[0].uri,
                type: imageUp[0].type,
                name: imageUp[0].fileName,
              }
            : '',
        );
        const res = await fetch(URL, {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${UserToken}`,
          },
        });
        let response = await res.json();
        setSpinner(false);
        if (response.success === true) {
          setCheckStatus(1);
          navigation.navigate('Profile');
          Toast(
            toast,
            'Your profile is under review, Please wait for some time',
          );
        } else {
          Toast(toast, response.message);
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    idx();
    return () => {
      setBusinessCategoryData([]);
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {businessCategoryData.length > 0 ? (
        <>
          <ScrollView>
            <TouchableOpacity
              style={genericStyles.selfCenter}
              activeOpacity={0.5}
              onPress={() => setModalVisible(true)}>
              <View style={styles.imageConatiner(imageUp)}>
                <Image
                  source={imageUp ? imageUp : Images.BusinessProfile}
                  style={styles.imageStyle(imageUp)}
                />
              </View>
              <Text style={styles.AddLogoText}>Add image / logo</Text>
            </TouchableOpacity>
            <ModalPopup
              visible={modalVisible}
              CameraOnpress={() => {
                if (Platform.OS === 'android') {
                  requestCameraPermission();
                } else {
                  openCamera();
                }
              }}
              GalleryOnpress={() => openGallery()}
              OnPressCancel={() => setModalVisible(false)}
              onRequestClose={() => setModalVisible(false)}
            />
            <Text style={styles.BusinessDetails}>
              Business Details / व्यापार का विवरण
            </Text>
            <InputComponent
              placeholder="Name of business"
              value={ShopBusName}
              autoCapitalize="words"
              onChangeText={text => setShopBusName(text)}
            />
            <InputComponent
              placeholder="Contact person’s name"
              value={PersonName}
              autoCapitalize="words"
              onChangeText={text => setPersonName(text)}
            />
            <InputComponent
              placeholder="Contact person’s mobile number"
              value={mobile_no}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={text => setMobile(text)}
            />
            <InputComponent
              placeholder="Contact person’s whatsapp number"
              value={WhatsappNo}
              maxLength={10}
              keyboardType="number-pad"
              onChangeText={text => setWhatsappNo(text)}
            />

            <DropDownComponent
              placeholder="Select business type"
              data={businessCategoryData}
              labelField="name"
              valueField="id"
              value={businessValue}
              maxHeight={100}
              onChange={item => updateBusinessValue(item.id)}
            />
            <InputComponent
              placeholder="About business (Optional)"
              autoCapitalize="words"
              value={About}
              onChangeText={text => setAbout(text)}
            />
            <Text style={styles.BusinessDetails}>
              Business address / व्यवसाय का पता
            </Text>
            <InputComponent
              placeholder="Building / Flat Number"
              value={buildFL}
              autoCapitalize="words"
              onChangeText={text => setBuildFL(text)}
            />
            <InputComponent
              placeholder="Address Line 1"
              value={AL1}
              autoCapitalize="words"
              onChangeText={text => setAL1(text)}
            />
            <InputComponent
              placeholder="Landmark (optional)"
              value={Landmark}
              autoCapitalize="words"
              onChangeText={text => setLandmark(text)}
            />
            <DropDownComponent
              data={localityData}
              labelField="name"
              valueField="id"
              placeholder="Locality (required)"
              value={LocalityValue}
              maxHeight={100}
              onChange={item => {
                setLocality(item.id);
              }}
            />
          </ScrollView>
          <ButtonComponent
            title="Save"
            loading={spinner}
            onPress={() => SaveDetail()}
          />
          <Poweredby container={{flex: 0}} />
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default BusinessDetails;

const styles = StyleSheet.create({
  imageConatiner: imageUp => ({
    backgroundColor: imageUp ? COLORS.white : COLORS.secondary,
    padding: imageUp ? 0 : 15,
    borderRadius: 50,
    alignSelf: 'center',
  }),
  imageStyle: imageUp => ({
    width: imageUp ? 70 : 40,
    height: imageUp ? 70 : 40,
    borderRadius: imageUp ? 50 : 0,
  }),
  AddLogoText: {
    fontSize: 12,
    color: COLORS.third,
    marginBottom: 10,
    fontFamily: FONTS.InterMedium,
  },
  BusinessDetails: {
    fontSize: 16,
    color: COLORS.textColor,
    fontFamily: FONTS.InterMedium,
    marginLeft: 23,
    marginTop: 20,
    marginBottom: 5,
  },
  checkBoxContanier: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    marginTop: -10,
    marginBottom: 0,
  },
  CheckText: {
    color: COLORS.third,
    fontSize: 15,
    marginLeft: 2,
    fontFamily: FONTS.InterRegular,
    fontWeight: 'normal',
  },
  ButtonContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
});
