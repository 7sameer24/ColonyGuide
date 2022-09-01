import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';

const EditProfile = ({route, navigation}) => {
  const toast = useToast();
  const {data, token} = route.params;
  const [spinner, setSpinner] = useState(false);
  const [LocalityValue, setLocality] = useState(data.locality_id);
  const [PersonName, setPersonName] = useState(data.name);
  const [Email, setEmail] = useState(data.email);
  const [Landmark, setLandmark] = useState(data.landmark);
  const [Address, setAddress] = useState(data.address);
  const [HostelName, setHostelName] = useState(data.hostel_name);
  const [hostel_address, setHostelAdd] = useState(data.hostel_address);
  const [FHN, setFHN] = useState(data.house_no);
  const [imageUp, setImage] = useState('');
  const {setNewData, localityData, Userdata} = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [hideNmber, setHideNmber] = useState(String(data.is_private));

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
      title: 'Address',
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
  const SaveDetail = async () => {
    if (!Address || !PersonName) {
      Toast(toast, 'Please fill all required fields');
    } else {
      try {
        setSpinner(true);
        const URL = BaseURL('update-personal-detail');

        const SaveData = new FormData();
        SaveData.append('user_id', data.id);
        SaveData.append('full_name', PersonName);
        Email === null ? null : SaveData.append('email', Email);
        Address === null ? null : SaveData.append('address', Address);
        FHN === null ? null : SaveData.append('house_no', FHN);
        Landmark === null ? null : SaveData.append('landmark', Landmark);
        data.app_role_id == 3 && hideNmber
          ? SaveData.append('is_private', hideNmber)
          : null;

        SaveData.append('locality_id', LocalityValue);
        SaveData.append('shop_name', data.shop_name);
        SaveData.append('category_id', data.shop_category);
        SaveData.append('whatsapp_no', data.whatsapp_no);
        SaveData.append('about', data.about);
        SaveData.append('hostel_name', HostelName);
        SaveData.append('hostel_address', hostel_address);
        SaveData.append(
          data.app_role_id == 2 ? 'logo_image' : 'profile_image',
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
          Toast(toast, response.message);
        } else {
          Toast(toast, response.message);
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
        console.log(error);
      }
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
  const HideNumber = [
    {name: 'Yes', id: '1'},
    {name: 'No', id: '0'},
  ];

  return (
    <View style={genericStyles.Container}>
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
                  : data.app_role_id == 2
                  ? {uri: data.logo_image}
                  : data.profile_image ==
                    'https://colonyguide.com/portal/storage'
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
          onRequestClose={() => setModalVisible(false)}
        />
        <View style={styles.midd}>
          {data.app_role_id === 1 ? (
            <View style={genericStyles.mb(10)}>
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
                <View key={data.title} style={genericStyles.mb(10)}>
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
              {data.app_role_id == 3 && (
                <>
                  <Text style={styles.text}>Hide your number</Text>
                  <DropDownComponent
                    data={HideNumber}
                    labelField="name"
                    valueField="id"
                    placeholder=""
                    value={hideNmber}
                    maxHeight={100}
                    dropdownStyle={styles.dropdownStyle}
                    onChange={item => setHideNmber(item.id)}
                  />
                </>
              )}
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
