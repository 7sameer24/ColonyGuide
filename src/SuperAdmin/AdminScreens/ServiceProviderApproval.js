import {ScrollView, TouchableOpacity, View} from 'react-native';
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

const ServiceProviderApproval = ({navigation}) => {
  const toast = useToast();
  const {adminData, adminToken} = useApp();
  const [data, updateData] = useState([]);
  const [loading, updateLoading] = useState(false);

  const fetchData = async () => {
    updateLoading(true);

    try {
      const {data} = await axios(BaseURL('admin-user-data'), {
        method: 'post',
        data: {
          locality_id: adminData.userData.locality_id,
          type: 2,
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
  }, []);

  const onChangeActiveDeactive = async (user_id, status) => {
    try {
      const {data} = await axios(BaseURL('admin-user-approve'), {
        method: 'post',
        data: {
          user_id: user_id,
          status: status === 0 ? 1 : 0,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (data.success) {
        Toast(toast, data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectRow = (index, isSelected) => {
    data[index].status = isSelected;
    updateData([...data]);
  };
  return (
    <View style={genericStyles.Container}>
      {loading ? (
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
                        image: item.profile_image,
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
                        item.logo_image.includes('logo_image')
                          ? {uri: item.logo_image}
                          : require('../../../assets/Image_not_available.png')
                      }
                      toggleSwitch={() => {
                        onChangeActiveDeactive(item.id, item.status);
                        selectRow(index, item.status === 0 ? 1 : 0);
                      }}
                      AddressLine={item.address}
                      Landmark={item.landmark}
                      subTitle={item.house_no}
                      isEnabled={item.status === 0 ? true : false}
                      switchButton={true}
                      iconName="checkmark"
                      iconType="ionicon"
                      IconColorChange={true}
                      iconName2="cancel"
                      iconType2="material-community"
                      twoMore={true}
                      longText={2}
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

export default ServiceProviderApproval;
