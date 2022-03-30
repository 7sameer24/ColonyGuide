import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import axios from 'axios';
import DropDownComponent from '../../Components/DropDownComponent';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from '../../Components/Spinner';
import Poweredby from '../../Components/Poweredby';
import {useIslogin} from '../../../Context/LoginContext';

const ServiceEdit = ({navigation, route}) => {
  const {User, data, token} = route.params;
  const [CategoryData, setCategoryData] = useState('');
  const [Category, setCategory] = useState(parseInt(data.shop_category));
  const [imageUp, setImage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [ShopBusName, setShopBusName] = useState(data.shop_name);
  const [PersonName, setPersonName] = useState(data.name);
  const [WhatsappNo, setWhatsappNo] = useState(data.whatsapp_no);
  const [About, setAbout] = useState('');
  const [buildFL, setBuildFL] = useState(data.house_no);
  const [AL1, setAL1] = useState(data.address);
  const [AL2, setAL2] = useState(data.address);
  const [Landmark, setLandmark] = useState(data.landmark);
  const {setNewData} = useIslogin();

  const idx = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/get-all-master';
      const response = await axios.post(URL);
      setCategoryData(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const openImage = () => {
    let opetions = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeExtra: true,
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

  const SaveDetail = async () => {
    try {
      setSpinner(true);
      const URL =
        'https://colonyguide.garimaartgallery.com/api/update-personal-detail';

      const SaveData = new FormData();
      SaveData.append('user_id', data.id);
      SaveData.append('shop_name', ShopBusName);
      SaveData.append('full_name', PersonName);
      SaveData.append('whatsapp_no', WhatsappNo);
      SaveData.append('category_id', Category);
      SaveData.append('about', About);
      SaveData.append('address', `${buildFL},${AL1},${AL2},${Landmark}`);
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
      const res = await fetch(URL, {
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
        setNewData(response);
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
              onPress={() => openImage()}>
              <View style={styles.imageConatiner(imageUp)}>
                <Image
                  source={
                    data.logo_image ===
                    'https://colonyguide.garimaartgallery.com/storage'
                      ? imageUp !== ''
                        ? imageUp
                        : Images.BusinessProfile
                      : {uri: data.log0_image}
                  }
                  style={styles.imageStyle(imageUp)}
                />
              </View>
              <Text style={styles.AddLogoText}>Add image / logo</Text>
            </TouchableOpacity>
            <Text style={styles.BusinessDetails}>
              {User === 'Business Info' || User !== 'Service Info'
                ? 'Business Details'
                : 'Shop / Service Details'}
            </Text>
            <InputComponent
              placeholder={
                User === 'Business Info' || User !== 'Service Info'
                  ? 'Name of business'
                  : 'Shop / Service name (Optional)'
              }
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
              placeholder={
                User === 'Business Info' || User !== 'Service Info'
                  ? 'Select business type'
                  : 'Select category'
              }
              data={CategoryData}
              labelField="name"
              valueField="id"
              value={Category}
              maxHeight={200}
              onChange={item => setCategory(item.id)}
            />
            <InputComponent
              placeholder={
                User === 'Business Info' || User !== 'Service Info'
                  ? 'About business (Optional)'
                  : 'About shop or service (Optional)'
              }
              autoCapitalize="words"
              value={About}
              onChangeText={text => setAbout(text)}
            />
            <Text style={styles.BusinessDetails}>
              {User === 'Business Info' || User !== 'Service Info'
                ? 'Business address'
                : 'Shop address'}
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
              placeholder="Address Line 2"
              value={AL2}
              autoCapitalize="words"
              onChangeText={text => setAL2(text)}
            />
            <InputComponent
              placeholder="Landmark (optional)"
              value={Landmark}
              autoCapitalize="words"
              onChangeText={text => setLandmark(text)}
            />
          </ScrollView>
          <ButtonComponent
            title="Save"
            ButtonContainer={styles.ButtonContainer}
            loading={spinner ? true : false}
            onPress={() => SaveDetail()}
          />
          <Poweredby container={genericStyles.mb(5)} />
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default ServiceEdit;

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
    marginVertical: 20,
    marginBottom: 30,
  },
});
