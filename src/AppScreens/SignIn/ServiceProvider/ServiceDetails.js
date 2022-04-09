import {
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../../constants';
import InputComponent from '../../../Components/InputComponent';
import ButtonComponent from '../../../Components/ButtonComponent';
import DropDownComponent from '../../../Components/DropDownComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Spinner from '../../../Components/Spinner';
import Poweredby from '../../../Components/Poweredby';
import BaseURL from '../../../constants/BaseURL';

const ServiceDetails = ({navigation, UserNewData}) => {
  const [imageUp, setImage] = useState('');
  const [shopName, setShop] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [WhatsappNo, setWhatsappNo] = useState();
  const [shortDes, setShortDes] = useState('');
  const [newData, setNewData] = useState([]);
  const [Category, setCategory] = useState('');

  const validationCheck = () => {
    if (!WhatsappNo || !fullName || !Category) {
      ToastAndroid.show('Please fill all required fields', ToastAndroid.SHORT);
    } else if (WhatsappNo.length < 10 || WhatsappNo.length > 10) {
      ToastAndroid.show(
        'Please check your number and try again',
        ToastAndroid.SHORT,
      );
    } else {
      navigation.navigate('Your location', {
        shopName: shopName,
        fullName: fullName,
        WhatsappNo: WhatsappNo,
        category: Category,
        userData: UserNewData,
        imageUp: imageUp,
        shortDes: shortDes,
      });
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

  const CategoryFetch = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      setNewData(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CategoryFetch();
    return () => {
      setNewData([]);
    };
  }, []);

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

  return (
    <View style={genericStyles.Container}>
      {newData.length > 0 ? (
        <ScrollView>
          <View style={genericStyles.mb(20)}>
            <Text style={styles.text}>Service Details</Text>
            <Text style={styles.subText}>
              Enter the details below to continue
            </Text>
          </View>
          <TouchableOpacity
            style={genericStyles.selfCenter}
            activeOpacity={0.5}
            onPress={() => createThreeButtonAlert()}>
            <View style={styles.ImageContainer(imageUp)}>
              <Image
                resizeMode={imageUp ? null : 'contain'}
                source={imageUp ? imageUp : Images.BusinessProfile}
                style={styles.imageStyle(imageUp)}
              />
            </View>
            <Text style={styles.AddLogoText}>Add image / logo</Text>
          </TouchableOpacity>
          <InputComponent
            placeholder="Shop Name (Optional)"
            value={shopName}
            onChangeText={text => setShop(text)}
            autoCapitalize="words"
          />
          <InputComponent
            placeholder="Full name"
            value={fullName}
            onChangeText={text => setFullName(text)}
            autoCapitalize="words"
          />
          <DropDownComponent
            data={newData}
            labelField="name"
            valueField="id"
            value={Category}
            placeholder="Select category"
            maxHeight={200}
            onChange={item => setCategory(item.id)}
          />
          <InputComponent
            placeholder="Whatsapp number"
            value={WhatsappNo}
            onChangeText={num => setWhatsappNo(num)}
            keyboardType="number-pad"
            autoCapitalize="words"
          />
          <InputComponent
            placeholder="Short Description"
            value={shortDes}
            onChangeText={text => setShortDes(text)}
            autoCapitalize="words"
            multiline={true}
            maxLength={70}
          />
          <ButtonComponent
            title="Next"
            onPress={() => validationCheck()}
            ButtonContainer={styles.ButtonContainer(imageUp)}
          />
          <Poweredby container={genericStyles.mb(0)} />
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  imageStyle: imageUp => ({
    width: imageUp ? 70 : 40,
    height: imageUp ? 70 : 40,
    borderRadius: imageUp ? 50 : 0,
  }),
  AddLogoText: {
    fontSize: 12,
    color: COLORS.third,
    fontFamily: FONTS.InterMedium,
    marginBottom: 40,
  },
  ImageContainer: imageUp => ({
    backgroundColor: imageUp ? COLORS.white : COLORS.secondary,
    padding: imageUp ? 0 : 15,
    borderRadius: 50,
    alignSelf: 'center',
  }),
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
    marginTop: 20,
    fontFamily: FONTS.InterSemiBold,
  },
  subText: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.third,
    marginBottom: 20,
    fontFamily: FONTS.InterRegular,
  },
  ButtonContainer: imageUp => ({
    marginTop: '5%',
    marginBottom: 30,
  }),
});
