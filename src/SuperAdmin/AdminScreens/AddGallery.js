import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import AddComponent from '../DashComponents/AddComponent';
import ImagePicker from 'react-native-image-crop-picker';
import BaseURL from '../../constants/BaseURL';
import Toast from '../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import {useApp} from '../../../Context/AppContext';

const AddGallery = ({navigation, route}) => {
  const toast = useToast();
  const {adminToken} = useApp();
  const [spinner, setSpinner] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [galleryName, updateGalleryName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const openGallery = () => {
    setModalVisible(false);
    let opetions = {
      width: 300,
      hight: 400,
      multiple: true,
      mediaType: 'photo',
    };
    ImagePicker.openPicker(opetions)
      .then(image => {
        setImageData([...imageData, ...image]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const openCamera = () => {
    setModalVisible(false);
    let opetions = {
      cropping: false,
      mediaType: 'photo',
    };

    ImagePicker.openCamera(opetions)
      .then(image => {
        setImageData([...imageData, image]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteImg = id => {
    const filterData = imageData.filter((element, index) => {
      return index !== id;
    });
    setImageData(filterData);
  };

  const Saved = async () => {
    if (!galleryName) {
      Toast(toast, 'Please enter gallery name!');
    } else if (!imageData) {
      Toast(toast, 'Please select image!');
    } else {
      try {
        setSpinner(true);
        const data = new FormData();
        data.append('gallery_name', galleryName);
        data.append('status', 'Active');
        route.params && data.append('gallery_id', route.params.galleryData.id);
        data.append('locality_id', '1');
        for (const [index, img] of imageData.entries()) {
          data.append(`gallery_image[${index}]`, {
            uri: img.path,
            type: 'image/jpeg',
            name: img.path,
          });
        }

        const res = await fetch(BaseURL('admin-add-gallery'), {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${adminToken}`,
          },
        });
        let response = await res.json();
        setSpinner(false);
        if (response.success) {
          navigation.navigate('Admin');
          Toast(toast, response.message);
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
  };

  const updateResponse = () =>
    route.params.galleryData.gallery_image.map(data => {
      data.path = data.gallery_image;
      return data;
    });

  const updateValues = () => {
    updateGalleryName(route.params.galleryData.gallery_name);
    setImageData(route.params.galleryData.gallery_image);
    updateResponse();
  };

  useEffect(() => {
    route.params && updateValues();
  }, []);

  return (
    <View style={genericStyles.Container}>
      <AddComponent
        input={true}
        loading={spinner}
        categoryName="Title / शीर्षक"
        deleteImg={deleteImg}
        visible={modalVisible}
        onPress={() => Saved()}
        inputValue={galleryName}
        buttonTitle={route.params ? 'Update Gallery' : 'Add Gallery'}
        uploadFiles="Upload Files / फाइल अपलोड करो"
        multipleImages={imageData}
        CameraOnpress={() => openCamera()}
        inputPlaceholder="Type gallery name / गैलरी का नाम टाइप करें"
        GalleryOnpress={() => openGallery()}
        onUpload={() => setModalVisible(true)}
        OnPressCancel={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        onChangeText={text => updateGalleryName(text)}
      />
    </View>
  );
};

export default AddGallery;
