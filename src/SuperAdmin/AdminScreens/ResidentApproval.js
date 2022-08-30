import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
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

const ResidentApproval = ({navigation}) => {
  const toast = useToast();
  const {adminToken} = useApp();
  const [data, updateData] = useState([]);
  const [loading, updateLoading] = useState(false);

  const fetchData = async () => {
    updateLoading(true);

    try {
      const {data} = await axios(BaseURL('admin-user-data'), {
        method: 'post',
        data: {
          locality_id: 1,
          type: 3,
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
      Toast(toast, error);
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
      Toast(toast, error);
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
                        houseNumber: item.house_no,
                        address: item.address,
                        landmark: item.landmark,
                      })
                    }>
                    <GalleryCard
                      title={item.name}
                      source={
                        item.profile_image.includes('jpg')
                          ? {uri: item.profile_image}
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

export default ResidentApproval;
