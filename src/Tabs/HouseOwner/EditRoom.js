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
import {CheckBox} from 'react-native-elements';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownComponent from '../../Components/DropDownComponent';
import {useApp} from '../../../Context/AppContext';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import BaseURL from '../../constants/BaseURL';
import ModalPopup from '../../Components/ModalPopup';
import Toast from '../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';

const EditRoom = ({navigation, route}) => {
  const {editData} = route.params;
  const [spinner, setSpinner] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(true);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [Category, setCategory] = useState('');
  const [roomTypeData, setRoomData] = useState('');
  const [roomType, setRoomType] = useState('');
  const [imageUp, setImage] = useState('');
  const [building_name, setBN] = useState('');
  const [PersonName, setPersonName] = useState('');
  const [buildFL, setBuildFL] = useState('');
  const [AL1, setAL1] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [mobile_no, setMobile] = useState('');
  const [WhatsappNo, setWhatsappNo] = useState('');
  const {UserToken} = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [LocalData, setLocalData] = useState([]);
  const [LocalityValue, setLocality] = useState('');
  const toast = useToast();

  const CategoryData = [
    {label: 'Hostel', value: '0'},
    {label: 'Rooms/Flates', value: '1'},
  ];

  const checkBoxArr = [
    {title: 'Boys', value: check2, setValue: setCheck2},
    {title: 'Girls', value: check3, setValue: setCheck3},
    {title: 'Family', value: check4, setValue: setCheck4},
  ];

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

  const Velidation = async () => {
    if (Category == 1) {
      !roomType ? Toast(toast, 'Please select room type') : Saved();
    } else {
      Saved();
    }
  };

  const Saved = async () => {
    if (mobile_no.length < 10) {
      Toast(toast, 'Please check your Mobile number and try again');
    } else if (WhatsappNo.length < 10) {
      Toast(toast, 'Please check your Whatsapp number and try again');
    } else if (!LocalityValue) {
      Toast(toast, 'Please select locality!');
    } else {
      try {
        setSpinner(true);
        const data = new FormData();
        data.append('id', editData.id);
        data.append('user_id', editData.user_id);
        data.append('building_name', building_name);
        data.append('contact_person', PersonName);
        data.append('mobile_no', mobile_no);
        data.append('whatsapp_no', WhatsappNo);
        data.append('category', Category);
        data.append('room_type_id', roomType);
        data.append('is_veg', check1 === true ? 1 : 0);
        data.append('locality_id', LocalityValue);
        data.append(
          'renter_type',
          check2 === true
            ? 1
            : check3 === true
            ? 2
            : check4 === true
            ? 3
            : null,
        );
        data.append('address', `${buildFL},${AL1},${Landmark}`);
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
        const res = await fetch(BaseURL('edit-room-hostel'), {
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
          navigation.navigate('Feed');
          Toast(toast, response.message);
        } else {
          Toast(toast, response.message);
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
  };

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      setRoomData(response.data.room_type);
      setLocalData(response.data.localities);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateData = () => {
    const AddressData = editData.address.split(',');
    setBN(editData.building_name);
    setPersonName(editData.contact_person);
    setMobile(editData.mobile_no);
    setWhatsappNo(editData.whatsapp_no);
    setCategory(String(editData.category));
    editData.room_type_id && setRoomType(editData.room_type_id);
    setCheck1(editData.is_veg === 1 ? true : false);
    setLocality(editData.locality_id);
    setCheck2(editData.renter_type === 1 ? true : false);
    setCheck3(editData.renter_type === 2 ? true : false);
    setCheck4(editData.renter_type === 3 ? true : false);
    setBuildFL(AddressData[0]);
    setAL1(AddressData[1]);
    AddressData[2] && setLandmark(AddressData[2]);
  };

  useEffect(() => {
    idx();
    UpdateData();
    return () => {
      setRoomData('');
      setLocalData([]);
    };
  }, []);

  const radioHandler = targetState => {
    const activeState = checkBoxArr.filter(state => state.value === true);

    if (activeState.length !== 0) {
      activeState[0].setValue(false);
    }

    targetState(true);
  };
  return (
    <View style={genericStyles.Container}>
      {roomTypeData.length > 0 ? (
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
                      : editData.logo_image.includes('jpg')
                      ? {uri: editData.logo_image}
                      : Images.Ellipse
                  }
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
            <Text style={styles.textStyle}>Room Details / कमरे का विवरण</Text>
            <InputComponent
              placeholder="Building / Hostel Name"
              value={building_name}
              onChangeText={text => setBN(text)}
              autoCapitalize="words"
            />
            <InputComponent
              placeholder="Owner name"
              value={PersonName}
              onChangeText={text => setPersonName(text)}
              autoCapitalize="words"
            />
            <InputComponent
              placeholder="Owner mobile number"
              value={mobile_no}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={text => setMobile(text)}
            />
            <InputComponent
              placeholder="Owner whatsapp number"
              value={WhatsappNo}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={text => setWhatsappNo(text)}
            />
            <DropDownComponent
              placeholder="Select Category"
              labelField="label"
              valueField="value"
              data={CategoryData}
              value={Category}
              maxHeight={110}
              onChange={item => {
                setCategory(item.value);
                setRoomType('');
                setCheck2(true);
                setCheck3(false);
                setCheck4(false);
              }}
            />
            {Category == 0 ? null : (
              <>
                <DropDownComponent
                  placeholder="Room type"
                  data={roomTypeData}
                  value={roomType}
                  onChange={item => setRoomType(item.id)}
                  labelField="room_type"
                  valueField="id"
                  maxHeight={170}
                />
              </>
            )}
            <CheckBox
              title="Only Vegetarian / केवल शाकाहारी"
              checked={check1}
              onPress={() => setCheck1(!check1)}
              checkedColor={COLORS.primary}
              containerStyle={styles.checkBoxContanier}
              textStyle={styles.CheckText}
            />
            <Text style={styles.textStyle}>
              Renter Type / किराएदार का प्रकार
            </Text>
            <View style={genericStyles.row}>
              {checkBoxArr.map((data, index) => (
                <View key={data.title}>
                  {Category == 0 ? (
                    index == 2 ? null : (
                      <CheckBox
                        title={data.title}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={data.value}
                        onPress={() => {
                          radioHandler(data.setValue);
                        }}
                        checkedColor={COLORS.primary}
                        containerStyle={[
                          styles.checkBoxContanier,
                          {marginLeft: 10, marginRight: 0},
                        ]}
                        textStyle={styles.CheckText}
                      />
                    )
                  ) : (
                    <CheckBox
                      title={data.title}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={data.value}
                      onPress={() => {
                        radioHandler(data.setValue);
                      }}
                      checkedColor={COLORS.primary}
                      containerStyle={[
                        styles.checkBoxContanier,
                        {marginLeft: 10, marginRight: 0},
                      ]}
                      textStyle={styles.CheckText}
                    />
                  )}
                </View>
              ))}
            </View>
            <Text style={styles.textStyle}>Address / पता</Text>
            <InputComponent
              placeholder="Building / Flat Number"
              value={buildFL}
              onChangeText={text => setBuildFL(text)}
              autoCapitalize="words"
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
              containerStyle={genericStyles.mb(10)}
              onChangeText={text => setLandmark(text)}
            />
            <DropDownComponent
              data={LocalData}
              labelField="name"
              valueField="id"
              placeholder="Locality"
              value={LocalityValue}
              maxHeight={LocalData.length > 1 ? 150 : 50}
              onChange={item => setLocality(item.id)}
            />
          </ScrollView>
          <ButtonComponent
            title="Save"
            loading={spinner}
            onPress={() => Velidation()}
          />
          <Poweredby container={{flex: 0}} />
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default EditRoom;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginLeft: 20,
    marginTop: 10,
  },
  checkBoxContanier: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    marginBottom: 0,
  },
  CheckText: {
    color: COLORS.third,
    fontSize: 14,
    marginLeft: 2,
    fontFamily: FONTS.InterRegular,
    fontWeight: 'normal',
  },
  imageConatiner: imageUp => ({
    backgroundColor: imageUp ? COLORS.secondary : COLORS.white,
    borderRadius: 50,
    alignSelf: 'center',
  }),
  imageStyle: imageUp => ({
    width: 70,
    height: 70,
    borderRadius: 50,
  }),
  AddLogoText: {
    fontSize: 12,
    color: COLORS.third,
    marginVertical: 5,
    fontFamily: FONTS.InterMedium,
  },
});
