import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import DropDownComponent from '../../Components/DropDownComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Poweredby from '../../Components/Poweredby';
import {useApp} from '../../../Context/AppContext';
import ModalPopup from '../../Components/ModalPopup';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';
import BaseURL from '../../constants/BaseURL';

const ServiceAddDetails = ({navigation}) => {
  const {Userdata, UserToken, categories, localityData} = useApp();
  const [Category, setCategory] = useState('');
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

  const toast = useToast();

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

  const SaveDetail = async () => {
    if (mobile_no.length < 10) {
      Toast(toast, 'Please check your Mobile number and try again');
    } else if (WhatsappNo.length < 10) {
      Toast(toast, 'Please check your Whatsapp number and try again');
    } else {
      try {
        setSpinner(true);
        const URL = BaseURL('add-service-detail');

        const data = new FormData();
        data.append('user_id', Userdata.userData.id);
        data.append('app_role_id', Userdata.userData.app_role_id);
        data.append('type', 1);
        data.append('service_name', ShopBusName);
        data.append('contact_person', PersonName);
        data.append('contact_person_mobile', mobile_no);
        data.append('contact_person_whatsapp', WhatsappNo);
        data.append('category_id', Category);
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
        Toast(toast, error);
      }
    }
  };

  return (
    <View style={genericStyles.Container}>
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
          CameraOnpress={() => openCamera()}
          GalleryOnpress={() => openGallery()}
          OnPressCancel={() => setModalVisible(false)}
          onRequestClose={() => setModalVisible(false)}
        />

        <Text style={styles.BusinessDetails}>Shop / Service Details</Text>
        <InputComponent
          placeholder="Shop / Service name (Optional)"
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
          placeholder="Select Category"
          data={categories}
          labelField="name"
          valueField="id"
          value={Category}
          maxHeight={200}
          onChange={item => setCategory(item.id)}
        />
        <InputComponent
          placeholder="About shop or service (Optional)"
          autoCapitalize="words"
          value={About}
          onChangeText={text => setAbout(text)}
        />
        <Text style={styles.BusinessDetails}>Shop address</Text>
        <InputComponent
          placeholder="Building / Flat Number"
          value={buildFL}
          autoCapitalize="words"
          onChangeText={text => setBuildFL(text)}
        />
        <InputComponent
          placeholder="Address"
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
        ButtonContainer={styles.ButtonContainer}
        loading={spinner ? true : false}
        onPress={() => SaveDetail()}
      />
      <Poweredby container={{flex: 0}} />
    </View>
  );
};

export default ServiceAddDetails;

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
  },
});
