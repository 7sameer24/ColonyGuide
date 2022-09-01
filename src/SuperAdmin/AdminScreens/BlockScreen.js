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

const BlockScreen = ({navigation}) => {
  const toast = useToast();
  const {adminToken, onRefresh, setRefresh} = useApp();
  const [data, updateData] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [activeLoading, activeUpdateLoading] = useState(false);

  const fetchData = async () => {
    updateLoading(true);

    try {
      const {data} = await axios(BaseURL('blocked-user-list'), {
        method: 'post',
        data: {
          locality_id: 1,
          is_block: 1,
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
      'Unblock',
      'Are you sure? you want to Unblock this user',
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
          is_block: 0,
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
                        categoryName: item.category_name,
                        houseNumber: item.house_no,
                        address: item.address,
                        landmark: item.landmark,
                      })
                    }>
                    <GalleryCard
                      title={item.name}
                      source={
                        item.logo_image.includes('jpg')
                          ? {uri: item.logo_image}
                          : require('../../../assets/Image_not_available.png')
                      }
                      deleteItem={() => {
                        openLockAlert(item.id);
                      }}
                      AddressLine={item.address}
                      Landmark={item.landmark}
                      subTitle={item.house_no}
                      iconName2="cancel"
                      iconType2="material-community"
                      twoMore={true}
                      longText={3.1}
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

export default BlockScreen;
