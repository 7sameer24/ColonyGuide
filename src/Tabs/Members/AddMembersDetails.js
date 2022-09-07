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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import ModalPopup from '../../Components/ModalPopup';
import MembersFrom from '../../Components/Forms/MembersFrom';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import {useApp} from '../../../Context/AppContext';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';

const AddMembersDetails = ({navigation}) => {
  const [imageUp, setImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [relationData, updateRelationData] = useState([]);
  const [relationValue, updateRelationValue] = useState('');
  const [genderValue, updateGenderValue] = useState('');
  const [name, updateName] = useState('');
  const [education, updateEducation] = useState('');
  const [number, updateNumber] = useState('');
  const [email, updateEmail] = useState('');
  const [bloodgroupValue, updateBloodGroupValue] = useState('');
  const [currentworkValue, updateCurrentWorkValue] = useState('');
  const [MSValue, updateMSValue] = useState('');
  const [LookingValue, updateLookingValue] = useState('');
  const {Userdata, UserToken} = useApp();
  const toast = useToast();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event, date) => {
    if (event.type == 'set') {
      //ok button clicked
      hideDatePicker();
      setStartDate(FormatDate(date));
    } else {
      hideDatePicker();
      //cancel button clicked
    }
  };
  const FormatDate = data => {
    let dateTimeString =
      data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();

    return dateTimeString;
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

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      updateRelationData(response.data.relation);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    idx();
    return () => {
      updateRelationData([]);
    };
  }, []);

  const ValidateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    Toast(toast, 'You have entered an invalid email address!');
    return false;
  };

  const SaveDetail = async () => {
    if (
      !name ||
      !relationValue ||
      !education ||
      !number ||
      !startDate ||
      !currentworkValue ||
      !MSValue ||
      !LookingValue ||
      !genderValue
    ) {
      Toast(toast, 'Please fill all required fields');
    } else if (number.length < 10) {
      Toast(toast, 'Please check your number and try again');
    } else {
      if (email.length > 0) {
        ValidateEmail();
      }
      if (email.length > 0 && ValidateEmail() === false) {
        return false;
      }
      try {
        setSpinner(true);
        const URL = BaseURL('add-family-member');

        const SaveData = new FormData();
        SaveData.append('resident_id', Userdata.userData.id);
        SaveData.append('relation', relationValue.name);
        SaveData.append('name', name);
        SaveData.append('education', education);
        SaveData.append('mobile_no', number);
        SaveData.append('email', email);
        SaveData.append('blood_group', bloodgroupValue.name);
        SaveData.append('dob', startDate);
        SaveData.append('marital_status', MSValue.name);
        SaveData.append('looking_for', LookingValue.name);
        SaveData.append('gender', genderValue.name);
        SaveData.append('current_work', currentworkValue);

        SaveData.append(
          'photo',
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
            Authorization: `Bearer ${UserToken}`,
          },
        });
        let response = await res.json();
        setSpinner(false);
        if (response.success == true) {
          navigation.navigate('Profile');
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
          <Text style={styles.AddLogoText}>Add image</Text>
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
        <MembersFrom
          currentworkValue={currentworkValue}
          bloodgroupValue={bloodgroupValue.id}
          LookingForValue={LookingValue.id}
          relationValue={relationValue.ID}
          maritalStatusValue={MSValue.id}
          relationData={relationData}
          educationValue={education}
          genderValue={genderValue.id}
          startDate={startDate}
          numberValue={number}
          emailValue={email}
          NameValue={name}
          relationOnchange={item => updateRelationValue(item)}
          genderOnchange={item => updateGenderValue(item)}
          NameOnchangeText={text => updateName(text)}
          educationOnchangeText={text => updateEducation(text)}
          numberOnchangeText={text => updateNumber(text)}
          emailOnchangeText={text => updateEmail(text)}
          bloodgroupOnchange={item => updateBloodGroupValue(item)}
          currentworkOnchangeText={text => updateCurrentWorkValue(text)}
          maritalStatusOnchange={item => updateMSValue(item)}
          LookingForOnchange={item => updateLookingValue(item)}
          isDatePickerVisible={isDatePickerVisible}
          showDatePicker={showDatePicker}
          onChange={(e, selectedDate) => handleConfirm(e, selectedDate)}
          onTouchCancel={() => hideDatePicker()}
        />
      </ScrollView>
      <ButtonComponent
        title="Save"
        ButtonContainer={styles.ButtonContainer}
        loading={spinner}
        onPress={() => SaveDetail()}
      />
      <Poweredby container={{flex: 0}} />
    </View>
  );
};

export default AddMembersDetails;

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
    marginVertical: 10,
    fontFamily: FONTS.InterMedium,
    textAlign: 'center',
  },
  ButtonContainer: {
    marginTop: 10,
  },
});
