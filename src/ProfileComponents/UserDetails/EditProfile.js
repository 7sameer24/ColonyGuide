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
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import InputComponent from '../../Components/InputComponent';
import DropDownComponent from '../../Components/DropDownComponent';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';
import ModalPopup from '../../Components/ModalPopup';

const EditProfile = ({route, navigation}) => {
  const {data, token} = route.params;
  const [spinner, setSpinner] = useState(false);
  const [LocalityValue, setLocality] = useState(data.locality_id);
  const [localData, setLocalData] = useState('');
  const [PersonName, setPersonName] = useState(data.name);
  const [Email, setEmail] = useState(data.email);
  const [Landmark, setLandmark] = useState(data.landmark);
  const [Address, setAddress] = useState(data.address);
  const [HostelName, setHostelName] = useState(data.hostel_name);
  const [hostel_address, setHostelAdd] = useState(data.hostel_address);
  const [FHN, setFHN] = useState(data.house_no);
  const [imageUp, setImage] = useState('');
  const {setNewData} = useApp();
  const [modalVisible, setModalVisible] = useState(false);

  const arr = [
    {
      placeHolder: 'Name',
      title: 'Your Name',
      value: PersonName,
      onChagneText: setPersonName,
    },
    {
      placeHolder: 'Email',
      title: 'Your Email',
      value: Email,
      onChagneText: setEmail,
    },
    {
      title: 'Flat / House number',
      placeHolder: 'F/H number',
      value: FHN,
      onChagneText: setFHN,
    },
    {
      title: 'Address line',
      placeHolder: 'Address',
      value: Address,
      onChagneText: setAddress,
    },
    {
      title: 'Landmark',
      placeHolder: 'Landmark (optional)',
      value: Landmark,
      onChagneText: setLandmark,
    },
  ];

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      setLocalData(response.data.localities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    idx();
    return () => {
      setLocalData('');
    };
  }, []);

  const SaveDetail = async () => {
    try {
      setSpinner(true);
      const URL =
        'https://colonyguide.garimaartgallery.com/api/update-personal-detail';

      const SaveData = new FormData();
      SaveData.append('user_id', data.id);
      SaveData.append('full_name', PersonName);
      Email === null ? null : SaveData.append('email', Email);
      Address === null ? null : SaveData.append('address', Address);
      FHN === null ? null : SaveData.append('house_no', FHN);
      Landmark === null ? null : SaveData.append('landmark', Landmark);
      SaveData.append('locality_id', LocalityValue);
      SaveData.append('shop_name', data.shop_name);
      SaveData.append('category_id', data.shop_category);
      SaveData.append('whatsapp_no', data.whatsapp_no);
      SaveData.append('about', data.about);
      SaveData.append('hostel_name', HostelName);
      SaveData.append('hostel_address', hostel_address);
      SaveData.append(
        'profile_image',
        imageUp
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
      console.log(error);
      alert(error);
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

  return (
    <View style={genericStyles.Container}>
      {localData !== '' ? (
        <>
          <ScrollView>
            <TouchableOpacity
              style={genericStyles.selfCenter}
              activeOpacity={0.5}
              onPress={() => setModalVisible(true)}>
              <View style={styles.imageConatiner(imageUp)}>
                <Image
                  source={
                    imageUp
                      ? imageUp
                      : data.profile_image ==
                        'https://colonyguide.garimaartgallery.com/storage'
                      ? Images.Ellipse
                      : {uri: data.profile_image}
                  }
                  style={styles.imageStyle(imageUp)}
                />
              </View>
              <Text style={styles.AddLogoText}>Add Profile</Text>
            </TouchableOpacity>
            <ModalPopup
              visible={modalVisible}
              CameraOnpress={() => openCamera()}
              GalleryOnpress={() => openGallery()}
              OnPressCancel={() => setModalVisible(false)}
            />
            <View style={styles.midd}>
              {data.app_role_id === 1 ? (
                <View style={genericStyles.mb(15)}>
                  <Text style={styles.text}>Your Name</Text>
                  <InputComponent
                    placeholder="Your Name"
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={genericStyles.ml(16)}
                    value={PersonName}
                    onChangeText={text => setPersonName(text)}
                    autoCapitalize="words"
                  />
                  <Text style={styles.text}>Your Email</Text>
                  <InputComponent
                    placeholder="Email"
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={genericStyles.ml(16)}
                    value={Email}
                    onChangeText={text => setEmail(text)}
                    autoCapitalize="words"
                  />
                  <Text style={styles.text}>Hostel Name</Text>
                  <InputComponent
                    placeholder="Hostel Name"
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={genericStyles.ml(16)}
                    value={HostelName}
                    onChangeText={text => setHostelName(text)}
                    autoCapitalize="words"
                  />
                  <Text style={styles.text}>Hostel Address</Text>
                  <InputComponent
                    placeholder="Hostel Address"
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={genericStyles.ml(16)}
                    value={hostel_address}
                    onChangeText={text => setHostelAdd(text)}
                    autoCapitalize="words"
                  />
                </View>
              ) : (
                <View>
                  {arr.map(data => (
                    <View key={data.title}>
                      <Text style={styles.text}>{data.title}</Text>
                      <InputComponent
                        placeholder={data.placeHolder}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={genericStyles.ml(16)}
                        value={data.value}
                        onChangeText={text => data.onChagneText(text)}
                        autoCapitalize="words"
                      />
                    </View>
                  ))}
                  <Text style={styles.text}>Locality</Text>
                  <DropDownComponent
                    maxHeight={100}
                    data={localData}
                    placeholder="Locality"
                    value={LocalityValue}
                    labelField="name"
                    valueField="id"
                    onChange={item => setLocality(item.id)}
                    dropdownStyle={styles.dropdownStyle}
                  />
                </View>
              )}
            </View>
          </ScrollView>
          <ButtonComponent
            title="Save"
            loading={spinner ? true : false}
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

export default EditProfile;

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
  text: {
    fontSize: 14,
    color: '#666666',
    fontFamily: FONTS.InterMedium,
    marginLeft: 20,
    marginTop: 5,
  },
  midd: {
    marginTop: 20,
  },
  inputContainerStyle: {
    marginHorizontal: 0,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    borderColor: COLORS.secondary,
  },
  dropdownStyle: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
});
