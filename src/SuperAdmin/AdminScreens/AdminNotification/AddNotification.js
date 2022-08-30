import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../../constants';
import AddComponent from '../../DashComponents/AddComponent';
import axios from 'axios';
import BaseURL from '../../../constants/BaseURL';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from '../../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import {useApp} from '../../../../Context/AppContext';

const AddNotification = ({navigation}) => {
  const toast = useToast();
  const {adminToken} = useApp();
  const [msgBox, setMsg] = useState('');
  const [caste, setCaste] = useState('');
  const [casteData, setCasteData] = useState([]);
  const [imageData, setImageData] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchCasteData = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      if (response.data.success) {
        const fruits = [{name: 'All', id: '0'}, ...response.data.caste];
        setCasteData(fruits);
      }
    } catch (error) {
      Toast(toast, error);
    }
  };

  useEffect(() => {
    fetchCasteData();
    return () => {
      setCasteData([]);
    };
  }, []);

  const openGallery = () => {
    setModalVisible(false);
    let opetions = {
      width: 300,
      height: 400,
      cropping: true,
    };
    ImagePicker.openPicker(opetions)
      .then(image => {
        setImageData(image);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const openCamera = () => {
    setModalVisible(false);
    let opetions = {
      width: 300,
      height: 400,
      cropping: true,
    };

    ImagePicker.openCamera(opetions)
      .then(image => {
        setImageData(image);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const Saved = async () => {
    if (!caste) {
      Toast(toast, 'Please chosse caste!');
    } else if (!msgBox) {
      Toast(toast, 'Please add description!');
    } else if (!imageData) {
      Toast(toast, 'Please select image!');
    } else {
      try {
        setSpinner(true);
        const data = new FormData();
        data.append('locality_id', caste);
        data.append('message', msgBox);
        data.append('image', {
          uri: imageData.path,
          type: imageData.mime,
          name: 'Notification Image',
        });
        const res = await fetch(BaseURL('admin-add-notification'), {
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
          Toast(toast, 'Notification sent successfully');
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
        categoryName="Send to"
        description="Message"
        buttonTitle="Add"
        msgValue={msgBox}
        loading={spinner}
        onUpload={() => setModalVisible(true)}
        onChangeText={text => setMsg(text)}
        dropdownData={casteData}
        dropdownValue={caste}
        visible={modalVisible}
        uploadFiles="Uploaded Files"
        singleImage={imageData.path}
        onPress={() => Saved()}
        CameraOnpress={() => openCamera()}
        GalleryOnpress={() => openGallery()}
        OnPressCancel={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        onChangeDropDown={item => setCaste(item.id)}
      />
    </View>
  );
};

export default AddNotification;
