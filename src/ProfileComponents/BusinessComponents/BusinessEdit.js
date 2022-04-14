import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import axios from 'axios';
import DropDownComponent from '../../Components/DropDownComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Spinner from '../../Components/Spinner';
import Poweredby from '../../Components/Poweredby';
import BaseURL from '../../constants/BaseURL';

const BusinessEdit = ({navigation, route}) => {
  const {data, token} = route.params;
  const [CategoryData, setCategoryData] = useState('');
  const [Category, setCategory] = useState(parseInt(data.category_id));
  const [imageUp, setImage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [ShopBusName, setShopBusName] = useState(data.name);
  const [PersonName, setPersonName] = useState(data.contact_person);
  const [WhatsappNo, setWhatsappNo] = useState(data.contact_person_whatsapp);
  const [About, setAbout] = useState(data.about);
  const [buildFL, setBuildFL] = useState(data.house_no);
  const [AL1, setAL1] = useState(data.address);
  const [Landmark, setLandmark] = useState(data.landmark);

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      setCategoryData(response.data.businessCategory);
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

  const createThreeButtonAlert = () =>
    Alert.alert(null, 'Please Select Image/logo', [
      {
        text: 'Camera',
        onPress: () => openCamera(),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Gallery', onPress: () => openGallery()},
    ]);

  const businessUpdate = async () => {
    try {
      setSpinner(true);

      const SaveData = new FormData();
      SaveData.append('user_id', data.user_id);
      SaveData.append('service_name', ShopBusName);
      SaveData.append('contact_person', PersonName);
      SaveData.append('contact_person_mobile', data.contact_person_mobile);
      SaveData.append('contact_person_whatsapp', WhatsappNo);
      SaveData.append('category_id', Category);
      SaveData.append('about_service', About);
      SaveData.append('house_no', buildFL);
      SaveData.append('landmark', Landmark);
      SaveData.append('business_address', AL1);
      SaveData.append(
        'logo_image',
        imageUp !== ''
          ? {
              uri: imageUp[0].uri,
              type: imageUp[0].type,
              name: imageUp[0].fileName,
            }
          : '',
      );

      const res = await fetch(BaseURL('update-service-detail'), {
        method: 'post',
        body: SaveData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      let response = await res.json();
      setSpinner(false);
      if (response.success === true) {
        navigation.navigate('Profile');
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setSpinner(false);
      alert(error);
    }
  };

  useEffect(() => {
    idx();
    return () => {
      setCategoryData([]);
      setCategoryData('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {CategoryData.length > 0 ? (
        <>
          <ScrollView>
            <TouchableOpacity
              style={genericStyles.selfCenter}
              activeOpacity={0.5}
              onPress={() => createThreeButtonAlert()}>
              <View style={styles.imageConatiner(imageUp)}>
                <Image
                  source={imageUp ? imageUp : {uri: data.logo_image}}
                  style={styles.imageStyle(imageUp)}
                />
              </View>
              <Text style={styles.AddLogoText}>Add image / logo</Text>
            </TouchableOpacity>
            <Text style={styles.BusinessDetails}>Business Details</Text>
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
              placeholder="Contact person’s whatsapp number"
              value={WhatsappNo}
              autoCapitalize="words"
              onChangeText={text => setWhatsappNo(text)}
            />

            <DropDownComponent
              placeholder="Select business type"
              data={CategoryData}
              labelField="name"
              valueField="id"
              value={Category}
              maxHeight={200}
              onChange={item => setCategory(item.id)}
            />
            <InputComponent
              placeholder="About business (Optional)"
              autoCapitalize="words"
              value={About}
              onChangeText={text => setAbout(text)}
            />
            <Text style={styles.BusinessDetails}>Business address</Text>
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
            <ButtonComponent
              title="Save"
              ButtonContainer={styles.ButtonContainer}
              loading={spinner ? true : false}
              onPress={() => businessUpdate()}
            />
            <Poweredby />
          </ScrollView>
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default BusinessEdit;

const styles = StyleSheet.create({
  imageConatiner: imageUp => ({
    backgroundColor: imageUp ? COLORS.secondary : COLORS.white,
    borderRadius: 50,
    alignSelf: 'center',
  }),
  imageStyle: imageUp => ({
    width: imageUp ? 70 : 70,
    height: imageUp ? 70 : 70,
    borderRadius: imageUp ? 50 : 50,
  }),
  AddLogoText: {
    fontSize: 12,
    color: COLORS.third,
    marginVertical: 5,
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
    marginTop: 20,
  },
});
