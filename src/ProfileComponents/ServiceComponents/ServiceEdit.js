import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import DropDownComponent from '../../Components/DropDownComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Poweredby from '../../Components/Poweredby';
import {useApp} from '../../../Context/AppContext';
import ModalPopup from '../../Components/ModalPopup';

const ServiceEdit = ({navigation, route}) => {
  const {data, token} = route.params;
  const [Category, setCategory] = useState(parseInt(data.shop_category));
  const [imageUp, setImage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [ShopBusName, setShopBusName] = useState(data.shop_name);
  const [PersonName, setPersonName] = useState(data.name);
  const [WhatsappNo, setWhatsappNo] = useState(data.whatsapp_no);
  const [About, setAbout] = useState(data.about);
  const [buildFL, setBuildFL] = useState(data.house_no);
  const [AL1, setAL1] = useState(data.address);
  const [Landmark, setLandmark] = useState(data.landmark);
  const {setNewData, categories} = useApp();
  const [modalVisible, setModalVisible] = useState(false);

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

  const SaveDetail = async () => {
    if (WhatsappNo.length < 10) {
      ToastAndroid.show(
        'Please check your Whatsapp number and try again',
        ToastAndroid.SHORT,
      );
    } else {
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
        SaveData.append('house_no', buildFL);
        SaveData.append('landmark', Landmark);
        SaveData.append('address', AL1);
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
    }
  };

  return (
    <View style={genericStyles.Container}>
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
                    : data.logo_image ==
                      'https://colonyguide.garimaartgallery.com/storage'
                    ? Images.Ellipse
                    : {uri: data.logo_image}
                }
                style={styles.imageStyle(imageUp)}
              />
            </View>
            <Text style={styles.AddLogoText}>Add image / logo</Text>
          </TouchableOpacity>
          <ModalPopup
            visible={modalVisible}
            CameraOnpress={() => openCamera()}
            GalleryOnpress={() => openGallery()}
            OnPressCancel={() => setModalVisible(false)}
            onRequestClose={() => setModalVisible(false)}
          />
          <Text style={styles.BusinessDetails}>Shop / Service Details</Text>
          <InputComponent
            placeholder="Shop / Service name (Optional)"
            value={ShopBusName}
            autoCapitalize="words"
            onChangeText={text => setShopBusName(text)}
          />
          <InputComponent
            placeholder="Contact person???s name"
            value={PersonName}
            autoCapitalize="words"
            onChangeText={text => setPersonName(text)}
          />
          <InputComponent
            placeholder="Contact person???s whatsapp number"
            value={WhatsappNo}
            maxLength={10}
            keyboardType="number-pad"
            onChangeText={text => setWhatsappNo(text)}
          />

          <DropDownComponent
            placeholder="Select category"
            data={categories}
            labelField="name"
            valueField="id"
            value={Category}
            maxHeight={200}
            onChange={item => setCategory(item.id)}
          />
          <InputComponent
            placeholder="About shop or service (Optional)"
            autoCapitalize="words"
            value={About}
            onChangeText={text => setAbout(text)}
          />
          <Text style={styles.BusinessDetails}>Shop address</Text>
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
        </ScrollView>
        <ButtonComponent
          title="Save"
          loading={spinner ? true : false}
          onPress={() => SaveDetail()}
        />
        <Poweredby container={{flex: 0}} />
      </>
    </View>
  );
};

export default ServiceEdit;

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
