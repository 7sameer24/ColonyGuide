import {
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../../constants';
import InputComponent from '../../../Components/InputComponent';
import ButtonComponent from '../../../Components/ButtonComponent';
import DropDownComponent from '../../../Components/DropDownComponent';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Spinner from '../../../Components/Spinner';
import Poweredby from '../../../Components/Poweredby';

const ServiceDetails = ({navigation, UserNewData}) => {
  const [imageUp, setImage] = useState();
  const [shopName, setShop] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [WhatsappNo, setWhatsappNo] = useState();
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
      });
    }
  };

  const openImage = () => {
    let opetions = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
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

  const CategoryFetch = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/get-all-master';
      const response = await axios.post(URL);
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
            onPress={() => openImage()}>
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
          />
          <InputComponent
            placeholder="Full name"
            value={fullName}
            onChangeText={text => setFullName(text)}
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
          />
          <ButtonComponent
            title="Next"
            onPress={() => validationCheck()}
            ButtonContainer={styles.ButtonContainer(imageUp)}
          />
          <Poweredby />
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
    marginBottom: 10,
  }),
});
