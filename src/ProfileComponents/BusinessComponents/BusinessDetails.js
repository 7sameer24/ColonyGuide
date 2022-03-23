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

const BusinessDetails = ({navigation, route}) => {
  const {User} = route.params;
  const [CategoryData, setCategoryData] = useState([]);
  const [Category, setCategory] = useState('');
  const [imageUp, setImage] = useState();
  const [spinner, setSpinner] = useState(false);
  const [ShopBusName, setShopBusName] = useState('');
  const [PersonName, setPersonName] = useState('');
  const [mobile_no, setMobile] = useState('');
  const [WhatsappNo, setWhatsappNo] = useState('');
  const [About, setAbout] = useState('');
  const [buildFL, setBuildFL] = useState('');
  const [AL1, setAL1] = useState('');
  const [AL2, setAL2] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [Userdata, setNewData] = useState({});
  // console.log(imageUp[0].type);

  const idx = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/get-all-master';
      const response = await axios.post(URL);
      setCategoryData(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserLogin');
      if (value !== null) {
        setNewData(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
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
      const data = new FormData();

      data.append('user_id', Userdata.user.id);
      data.append('app_role_id', Userdata.user.app_role_id);
      data.append('type', User === 'Service Info' ? 1 : 0);
      data.append('service_name', ShopBusName);
      data.append('contact_person', PersonName);
      data.append('contact_person_mobile', mobile_no);
      data.append('contact_person_whatsapp', WhatsappNo);
      data.append('category_id', Category);
      data.append('about_service', About);
      data.append('business_address', `${buildFL},${AL1},${AL2},${Landmark}`);
      data.append('logo_image', imageUp[0].uri);

      // console.log(data);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Userdata.token}`,
        },
      };

      const URL =
        'https://colonyguide.garimaartgallery.com/api/add-service-detail';

      const response = await axios.post(URL, data, config).then(response => {
        setSpinner(false);
        console.log(response.data);
      });
    } catch (error) {
      setSpinner(false);
      alert(error);
    }
  };

  useEffect(() => {
    idx();
    getData();
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
                  source={imageUp ? imageUp : Images.BusinessProfile}
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
              onChangeText={text => setShopBusName(text)}
            />
            <InputComponent
              placeholder="Contact person’s name"
              value={PersonName}
              onChangeText={text => setPersonName(text)}
            />
            <InputComponent
              placeholder="Contact person’s mobile number"
              value={mobile_no}
              onChangeText={text => setMobile(text)}
            />
            <InputComponent
              placeholder="Contact person’s whatsapp number"
              value={WhatsappNo}
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
              onChange={item => setCategory(item.id)}
            />
            <InputComponent
              placeholder={
                User === 'Business Info' || User !== 'Service Info'
                  ? 'About business (Optional)'
                  : 'About shop or service (Optional)'
              }
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
              onChangeText={text => setBuildFL(text)}
            />
            <InputComponent
              placeholder="Address Line 1"
              value={AL1}
              onChangeText={text => setAL1(text)}
            />
            <InputComponent
              placeholder="Address Line 2"
              value={AL2}
              onChangeText={text => setAL2(text)}
            />
            <InputComponent
              placeholder="Landmark (optional)"
              value={Landmark}
              onChangeText={text => setLandmark(text)}
            />
          </ScrollView>
          <ButtonComponent
            title="Save"
            ButtonContainer={styles.ButtonContainer}
            loading={spinner ? true : false}
            onPress={() => SaveDetail()}
          />
          <Poweredby />
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
    marginVertical: 20,
    marginBottom: 10,
  },
});
