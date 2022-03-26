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
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import ButtonComponent from '../Components/ButtonComponent';
import Poweredby from '../Components/Poweredby';
import InputComponent from '../Components/InputComponent';
import DropDownComponent from '../Components/DropDownComponent';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({route, navigation}) => {
  const {data, token} = route.params;
  const [spinner, setSpinner] = useState(false);
  const [LocalityValue, setLocality] = useState(data.locality_id);
  const [localData, setLocalData] = useState('');
  const [PersonName, setPersonName] = useState(`${data.name}`);
  const [Landmark, setLandmark] = useState(data.landmark);
  const [Address, setAddress] = useState(data.address);
  const [HostelName, setHostelName] = useState(data.hostel_name);
  const [hostel_address, setHostelAdd] = useState(data.hostel_address);
  const [FHN, setFHN] = useState(data.house_no);
  const [imageUp, setImage] = useState('');
  // console.log(data.profile_image);

  const arr = [
    {
      placeHolder: 'Your Name',
      title: 'Your Name',
      value: PersonName,
      onChagneText: setPersonName,
    },
    {
      title: 'Flat / House number',
      placeHolder: 'Flat / House number',
      value: FHN,
      onChagneText: setFHN,
    },
    {
      title: 'Address line',
      placeHolder: 'Address line',
      value: Address,
      onChagneText: setAddress,
    },
    {
      title: 'Landmark',
      placeHolder: 'Landmark',
      value: Landmark,
      onChagneText: setLandmark,
    },
  ];

  const idx = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/get-all-master';
      const response = await axios.post(URL);
      setLocalData(response.data.localities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    idx();
  }, []);

  const SaveDetail = async () => {
    try {
      setSpinner(true);
      const URL =
        'https://colonyguide.garimaartgallery.com/api/update-personal-detail';

      const SaveData = new FormData();
      SaveData.append('user_id', data.id);
      SaveData.append('full_name', PersonName);
      SaveData.append('house_no', FHN);
      SaveData.append('address', Address);
      SaveData.append('landmark', Landmark);
      SaveData.append('locality_id', LocalityValue);
      SaveData.append('shop_name', data.shop_name);
      SaveData.append('category_id', data.shop_category);
      SaveData.append('whatsapp_no', data.whatsapp_no);
      SaveData.append('hostel_name', HostelName);
      SaveData.append('hostel_address', hostel_address);
      SaveData.append(
        'profile_image',
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
      // console.log(response);
      if (response.success === true) {
        AsyncStorage.setItem('UserLogin', JSON.stringify(response));
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

  return (
    <View style={genericStyles.Container}>
      {localData !== '' ? (
        <ScrollView>
          <TouchableOpacity activeOpacity={0.8} onPress={() => openImage()}>
            <Image
              source={
                data.profile_image ===
                'https://colonyguide.garimaartgallery.com/storage'
                  ? imageUp !== ''
                    ? imageUp
                    : Images.Ellipse
                  : {uri: data.profile_image}
              }
              style={styles.ImageStyle}
            />
            <View style={styles.ImageContainer}>
              <Image
                source={Images.Camera}
                resizeMode="contain"
                style={styles.ChangeImgStyle}
              />
            </View>
          </TouchableOpacity>
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
                />
                <Text style={styles.text}>Hostel Name</Text>
                <InputComponent
                  placeholder="Hostel Name"
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={genericStyles.ml(16)}
                  value={HostelName}
                  onChangeText={text => setHostelName(text)}
                />
                <Text style={styles.text}>Hostel Address</Text>
                <InputComponent
                  placeholder="Hostel Address"
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={genericStyles.ml(16)}
                  value={hostel_address}
                  onChangeText={text => setHostelAdd(text)}
                />
              </View>
            ) : (
              arr.map(data => (
                <View key={data.title}>
                  <Text style={styles.text}>{data.title}</Text>
                  <InputComponent
                    placeholder={data.placeHolder}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={genericStyles.ml(16)}
                    value={data.value}
                    onChangeText={text => data.onChagneText(text)}
                  />
                  <Text style={styles.text}>Locality</Text>
                  <DropDownComponent
                    data={localData}
                    placeholder="Locality"
                    value={LocalityValue}
                    labelField="name"
                    valueField="id"
                    onChange={item => setLocality(item.id)}
                    dropdownStyle={styles.dropdownStyle}
                  />
                </View>
              ))
            )}
          </View>
          <ButtonComponent
            title="Save"
            loading={spinner ? true : false}
            onPress={() => SaveDetail()}
          />
          <Poweredby />
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  ImageStyle: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 60,
  },
  ChangeImgStyle: {
    width: 17,
    height: 17,
    alignSelf: 'center',
  },
  ImageContainer: {
    backgroundColor: '#FEF6EF',
    paddingVertical: 5,
    borderRadius: 8,
    width: 30,
    elevation: 5,
    position: 'absolute',
    right: '38%',
    bottom: 10,
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