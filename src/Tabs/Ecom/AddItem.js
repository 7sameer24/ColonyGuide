import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles, SIZES} from '../../constants';
import {Card, Icon, Image} from 'react-native-elements';
import ModalPopup from '../../Components/ModalPopup';
import ImagePicker from 'react-native-image-crop-picker';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';

const AddItem = () => {
  const [visible, setIsvisible] = useState(false);
  const [imageData, setImageData] = useState([]);
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

  return (
    <View style={genericStyles.Container}>
      <ScrollView>
        <InputComponent placeholder="Product Name" />
        <InputComponent placeholder="Variations" />
        <InputComponent placeholder="Price" />
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
    marginTop: 10,
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
    marginBottom: 10,
  },
});
