import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import GalleryCard from '../DashComponents/GalleryCard';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import Toast from '../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import {useApp} from '../../../Context/AppContext';
import NoDataAni from '../../Components/NoDataAni';
import SkeletonView from '../../Components/SkeletonView';
import SpinnerModal from '../../Components/SpinnerModal';

const UnblockScreen = ({navigation}) => {
  const toast = useToast();
  const {adminToken, adminData, onRefresh, setRefresh} = useApp();
  const [data, updateData] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [activeLoading, activeUpdateLoading] = useState(false);

  const fetchData = async () => {
    updateLoading(true);
    try {
      const {data} = await axios(BaseURL('blocked-user-list'), {
        method: 'post',
        data: {
          locality_id: adminData.userData.locality_id,
          is_block: 0,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      updateLoading(false);
      if (data.success) {
        updateData(data.userData);
      }
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      updateData([]);
    };
  }, [onRefresh]);

  const openLockAlert = id => {
    Alert.alert(
      'Block',
      'Are you sure? you want to Block this user',
      [
        {text: 'Ok', onPress: () => onChangeActiveDeactive(id)},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const onChangeActiveDeactive = async user_id => {
    activeUpdateLoading(true);
    try {
      const {data} = await axios(BaseURL('admin-user-block'), {
        method: 'post',
        data: {
          user_id: user_id,
          is_block: 1,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      activeUpdateLoading(false);
      if (data.success) {
        setRefresh(!onRefresh);
        Toast(toast, data.message);
      }
    } catch (error) {
      activeUpdateLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={genericStyles.Container}>
      {activeLoading ? (
        <SpinnerModal visible={activeLoading} />
      ) : loading ? (
        <SkeletonView containerStyle={genericStyles.mt(10)} />
      ) : (
        data.length > 0 && (
          <ScrollView>
            <View style={genericStyles.mt(10)}>
              {data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate('User Information', {
                        name: item.name,
                        image:
                          item.app_role_id === 2
                            ? item.logo_image
                            : item.profile_image,
                        mobileNumber: item.mobile_no,
                        whatsappNumber: item.whatsapp_no,
                        contact_person: item.shop_name,
                        about: item.about,
                        categoryName: item.category_name
                          ? item.category_name
                          : 'No Category',
                        houseNumber: item.hostel_name
                          ? item.hostel_name
                          : item.house_no,
                        address: item.hostel_address
                          ? item.hostel_address
                          : item.address,
                        landmark: item.landmark,
                      })
                    }>
                    <GalleryCard
                      title={item.name}
                      source={
                        item.app_role_id === 2
                          ? {uri: item.logo_image}
                          : item.profile_image.includes('jpg' || 'png')
                          ? {uri: item.profile_image}
                          : require('../../../assets/Image_not_available.png')
                      }
                      deleteItem={() => {
                        openLockAlert(item.id);
                      }}
                      AddressLine={
                        item.hostel_address ? item.hostel_address : item.address
                      }
                      Landmark={item.landmark}
                      subTitle={
                        item.hostel_name ? item.hostel_name : item.house_no
                      }
                      iconName2="cancel"
                      iconType2="material-community"
                      twoMore={true}
                      longText={3.1}
                      IconColorChange={true}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )
      )}
      {!loading && data.length == [] && <NoDataAni />}
    </View>
  );
};

export default UnblockScreen;
