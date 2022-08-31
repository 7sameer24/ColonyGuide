import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, genericStyles} from '../../constants';
import GalleryCard from '../DashComponents/GalleryCard';
import ButtonComponent from '../../Components/ButtonComponent';
import BaseURL from '../../constants/BaseURL';
import axios from 'axios';
import InputComponent from '../../Components/InputComponent';
import Toast from '../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import NoDataAni from '../../Components/NoDataAni';
import SpinnerModal from '../../Components/SpinnerModal';
import SkeletonView from '../../Components/SkeletonView';

const AdminGallery = ({navigation, route}) => {
  const toast = useToast();
  const [data, updateData] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [deleteLoading, updatedeleteLoading] = useState(false);

  const fetchData = async () => {
    updateLoading(true);
    try {
      const {data} = await axios(BaseURL('admin-gallery-list'), {
        method: 'post',
        data: {
          locality_id: 1,
        },
        headers: {
          Authorization: `Bearer ${route.params.adminToken}`,
        },
      });
      updateLoading(false);
      if (data.success) {
        updateData(data.galleryData);
      }
    } catch (error) {
      updateLoading(false);
      Toast(toast, error);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      updateData([]);
    };
  }, []);

  const openLockAlert2 = id => {
    Alert.alert(
      'Delete gallery',
      'Are you sure you want to delete gallery ?',
      [
        {text: 'Ok', onPress: () => deleteGallery(id)},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const deleteGallery = async id => {
    try {
      updatedeleteLoading(true);
      const response = await axios(BaseURL('admin-gallery-delete'), {
        method: 'post',
        data: {
          gallery_id: id,
        },
        headers: {
          Authorization: `Bearer ${route.params.adminToken}`,
        },
      });
      updatedeleteLoading(false);
      if (response.data.success) {
        updateData([]);
        fetchData();
        Toast(toast, response.data.message);
      }
    } catch (error) {
      updatedeleteLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={genericStyles.container}>
      <InputComponent
        iconName="search"
        placeholder="Search"
        containerStyle={genericStyles.width('95%')}
        inputStyle={genericStyles.ml(10)}
        iconContainerStyle={genericStyles.mr(10)}
        inputContainerStyle={styles.inputContainerStyle}
      />
      {data.length > 0 && (
        <ScrollView>
          {data.map((items, index) => {
            return (
              <GalleryCard
                key={index}
                iconName2="trash"
                iconType2="ionicon"
                title={items.gallery_name}
                iconName="square-edit-outline"
                iconType="material-community"
                deleteItem={() => openLockAlert2(items.id)}
                // subTitle={`${items.gallery_image.length} Images`}
                onEdit={() => navigation.navigate('Edit gallery')}
                // source={{uri: items.gallery_image[0].gallery_image}}
                longText={3.1}
              />
            );
          })}
        </ScrollView>
      )}
      {loading && <SkeletonView />}
      {!loading && data.length == [] && <NoDataAni />}
      <ButtonComponent
        title="Add"
        onPress={() => navigation.navigate('Add gallery')}
        ButtonContainer={genericStyles.width('90%')}
      />
      <View style={genericStyles.height(20)} />
      <SpinnerModal visible={deleteLoading} />
    </View>
  );
};

export default AdminGallery;

const styles = StyleSheet.create({
  dropdownStyle: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 16,
    marginHorizontal: 20,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 20,
    borderRadius: 10,
  },
});
