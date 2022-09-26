import {Platform, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../../constants';
import AddComponent from '../../DashComponents/AddComponent';
import ImagePicker from 'react-native-image-crop-picker';
import BaseURL from '../../../constants/BaseURL';
import Toast from '../../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import {useApp} from '../../../../Context/AppContext';

const AddEvent = ({navigation, route}) => {
  const toast = useToast();
  const {adminToken} = useApp();
  const [spinner, setSpinner] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [galleryName, updateGalleryName] = useState('');
  const [descriptionValue, updateDescriptionValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const openGallery = () => {
    let opetions = {
      width: 300,
      hight: 400,
      multiple: true,
      mediaType: 'photo',
    };
    ImagePicker.openPicker(opetions)
      .then(image => {
        setImageData([...imageData, ...image]);
        setModalVisible(false);
      })
      .catch(e => {
        setModalVisible(false);
        console.log(e);
      });
  };

  const openCamera = () => {
    let opetions = {
      cropping: true,
      mediaType: 'photo',
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
    };

    ImagePicker.openCamera(opetions)
      .then(image => {
        setImageData([...imageData, image]);
        setModalVisible(false);
      })
      .catch(e => {
        setModalVisible(false);
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
        route.params && data.append('event_id', route.params.eventData.id);
        for (const [index, img] of imageData.entries()) {
          console.log(img.mime);
          data.append(`event_image[${index}]`, {
            uri: Platform.OS === 'ios' ? `file:///${img.path}` : img.path,
            type: 'image/jpeg',
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
        console.log('error', error);
      }
    }
  };

  const updateResponse = () =>
    route.params.eventData.event_image.map(data => {
      data.path = data.event_image;
      return data;
    });

  const updateValues = () => {
    updateResponse();
    updateGalleryName(route.params.eventData.event_name);
    updateDescriptionValue(route.params.eventData.event_description);
    setImageData(route.params.eventData.event_image);
  };

  useEffect(() => {
    route.params && updateValues();
  }, []);

  return (
    <View style={genericStyles.Container}>
      <AddComponent
        input={true}
        loading={spinner}
        deleteImg={deleteImg}
        visible={modalVisible}
        onPress={() => Saved()}
        inputValue={galleryName}
        uploadFiles="Upload Files / फाइल अपलोड करो"
        multipleImages={imageData}
        categoryName="Event Title / कार्यक्रम का शीर्षक"
        description="Event Description / घटना विवरण"
        CameraOnpress={() => openCamera()}
        descriptionValue={descriptionValue}
        inputPlaceholder="Type gallery name / गैलरी का नाम टाइप करें"
        GalleryOnpress={() => openGallery()}
        onUpload={() => setModalVisible(true)}
        OnPressCancel={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        onChangeText={text => updateGalleryName(text)}
        buttonTitle={route.params ? 'Update Event' : 'Add Event'}
        onChangeDescriptionText={text => updateDescriptionValue(text)}
      />
    </View>
  );
};

export default AddEvent;
