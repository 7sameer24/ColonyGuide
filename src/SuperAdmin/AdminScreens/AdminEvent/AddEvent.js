import {View} from 'react-native';
import React, {useState} from 'react';
import {genericStyles} from '../../../constants';
import AddComponent from '../../DashComponents/AddComponent';
import ImagePicker from 'react-native-image-crop-picker';
import BaseURL from '../../../constants/BaseURL';
import Toast from '../../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import {useApp} from '../../../../Context/AppContext';

const AddGallery = ({navigation}) => {
  const toast = useToast();
  const {adminToken} = useApp();
  const [spinner, setSpinner] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [galleryName, updateGalleryName] = useState('');
  const [descriptionValue, updateDescriptionValue] = useState('');
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
    } else if (!descriptionValue) {
      Toast(toast, 'Please enter description!');
    } else if (!imageData) {
      Toast(toast, 'Please select image!');
    } else {
      try {
        setSpinner(true);
        const data = new FormData();

        data.append('event_name', galleryName);
        data.append('event_description', descriptionValue);
        data.append('status', 'Active');
        data.append('locality_id', '1');

        for (const [index, img] of imageData.entries()) {
          data.append(`event_image[${index}]`, {
            uri: img.path,
            type: img.mime,
            name: img.path,
          });
        }

        const res = await fetch(BaseURL('admin-add-event'), {
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
        Toast(toast, error);
      }
    }
  };

  return (
    <View style={genericStyles.Container}>
      <AddComponent
        input={true}
        loading={spinner}
        deleteImg={deleteImg}
        visible={modalVisible}
        onPress={() => Saved()}
        inputValue={galleryName}
        buttonTitle="Add Gallery"
        uploadFiles="upload Files"
        multipleImages={imageData}
        categoryName="Event Title"
        description="Event Description"
        CameraOnpress={() => openCamera()}
        descriptionValue={descriptionValue}
        inputPlaceholder="Type gallery name"
        GalleryOnpress={() => openGallery()}
        onUpload={() => setModalVisible(true)}
        OnPressCancel={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        onChangeText={text => updateGalleryName(text)}
        onChangeDescriptionText={text => updateDescriptionValue(text)}
      />
    </View>
  );
};

export default AddGallery;
