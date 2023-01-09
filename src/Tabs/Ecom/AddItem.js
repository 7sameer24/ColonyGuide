import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, SIZES} from '../../constants';
import {Card, Icon, Image} from 'react-native-elements';
import ModalPopup from '../../Components/ModalPopup';
import ImagePicker from 'react-native-image-crop-picker';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import Toast from '../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import BaseURL from '../../constants/BaseURL';
import {useApp} from '../../../Context/AppContext';
import DropDownComponent from '../../Components/DropDownComponent';

const AddItem = ({navigation, route}) => {
  const [visible, setIsvisible] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [imageData, setImageData] = useState([]);

  const {Userdata, UserToken} = useApp();
  const [productData, updateProductData] = useState({
    name: '',
    variation: '',
    price: '',
  });

  let opetions = {
    cropping: true,
    mediaType: 'photo',
    compressImageMaxWidth: 300,
    compressImageMaxHeight: 400,
  };
  const openGallery = () => {
    ImagePicker.openPicker(opetions)
      .then(image => {
        setImageData(image);
        setIsvisible(false);
      })
      .catch(e => {
        setIsvisible(false);
        console.log(e);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera(opetions)
      .then(image => {
        setImageData(image);
        setIsvisible(false);
      })
      .catch(e => {
        setIsvisible(false);
        console.log(e);
      });
  };
  const toast = useToast();

  const Saved = async () => {
    if (!productData.name) {
      Toast(toast, 'Please enter product name');
    } else if (!productData.variation) {
      Toast(toast, 'Please enter variation');
    } else if (!productData.price) {
      Toast(toast, 'Please enter price');
    } else if (imageData.length === 0) {
      Toast(toast, 'Please select image');
    } else {
      try {
        setSpinner(true);
        const data = new FormData();
        data.append('user_id', Userdata.userData.id);
        data.append('name', productData.name);
        data.append('variation', productData.variation);
        data.append('price', productData.price);
        data.append(
          'image',
          imageData && {
            uri: imageData.path,
            type: imageData.mime,
            name: imageData.path,
          },
        );
        const res = await fetch(BaseURL('add-edit-product'), {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${UserToken}`,
            accept: 'application/json',
          },
        });
        let response = await res.json();
        setSpinner(false);
        if (response.success === true) {
          navigation.navigate('Profile');
          Toast(toast, response.message);
        } else {
          console.log(response.message);
          Toast(toast, response.message);
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
  };
  const produpdateData = () => {
    updateProductData({
      ...productData,
      name: route.params.editData.name,
      variation: route.params.editData.variation,
      price: route.params.editData.price,
    });
    setImageData({path: route.params.editData.image});
  };
  useEffect(() => {
    route.params && produpdateData();
  }, []);

  const dropData = [
    {label: '250gm', value: '250gm'},
    {label: '500gm', value: '500gm'},
    {label: '1kg', value: '1kg'},
    {label: '500ml', value: '500ml'},
    {label: '1ltr', value: '1ltr'},
  ];

  return (
    <View style={genericStyles.Container}>
      <ScrollView>
        <InputComponent
          placeholder="Product Name"
          value={productData.name}
          onChangeText={text => updateProductData({...productData, name: text})}
        />
        <DropDownComponent
          data={dropData}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Variations"
          value={productData.variation}
          onChange={item =>
            updateProductData({...productData, variation: item.value})
          }
        />
        {/* <InputComponent
          value={productData.variation}
          onChangeText={text =>
            updateProductData({...productData, variation: text})
          }
        /> */}
        <InputComponent
          placeholder="Price"
          keyboardType="number-pad"
          value={productData.price}
          onChangeText={text =>
            updateProductData({...productData, price: text})
          }
        />
        <Text style={styles.categoryTex}>
          Upload Image / छवि इसे अपलोड करें
        </Text>
        <Text style={styles.categorySub}>{'(PNG, JPG files only)'}</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsvisible(true)}>
          <Card containerStyle={[styles.cardContainer, genericStyles.shadow]}>
            <View style={genericStyles.selfCenter}>
              <Icon
                type="ionicon"
                name="cloud-upload"
                size={30}
                color={COLORS.primary}
                containerStyle={[styles.iconContainer, genericStyles.shadow]}
              />
              <Text style={styles.uploadText}>Upload</Text>
            </View>
          </Card>
        </TouchableOpacity>
        {visible && (
          <ModalPopup
            visible={visible}
            CameraOnpress={() => openCamera()}
            GalleryOnpress={() => openGallery()}
            OnPressCancel={() => setIsvisible(false)}
            onRequestClose={() => setIsvisible(false)}
          />
        )}
        {Object.keys(imageData).length > 0 && (
          <>
            <Text style={styles.categoryTex}>Uploaded Files</Text>
            <Card containerStyle={[styles.ImageCard, genericStyles.shadow]}>
              <Image
                source={{uri: imageData.path}}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </Card>
          </>
        )}
      </ScrollView>
      <ButtonComponent
        title="Submit"
        loading={spinner}
        onPress={Saved}
        ButtonContainer={genericStyles.width('90%')}
      />
      <Poweredby container={{flex: 0}} />
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  categoryTex: {
    fontFamily: FONTS.InterMedium,
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 20,
  },
  categorySub: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: '#999999',
    marginLeft: 20,
  },
  uploadText: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    marginTop: 5,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cardContainer: {
    borderWidth: 0,
    elevation: 4,
    borderColor: COLORS.white,
    borderRadius: 5,
    paddingVertical: 25,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    alignSelf: 'center',
    borderRadius: 40,
    marginBottom: 5,
  },
  ImageCard: {
    width: SIZES.width / 1.12,
    height: 200,
    marginHorizontal: 20,
    alignSelf: 'center',
    margin: 0,
    padding: 0,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
  },
});
