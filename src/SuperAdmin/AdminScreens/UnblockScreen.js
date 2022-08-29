import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import GalleryCard from '../DashComponents/GalleryCard';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import Toast from '../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import {useApp} from '../../../Context/AppContext';
import Spinner from '../../Components/Spinner';
import NoDataAni from '../../Components/NoDataAni';

const UnblockScreen = () => {
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
      Toast(toast, error);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      updateData([]);
    };
  }, [onRefresh]);

  const onChangeActiveDeactive = async user_id => {
    // activeUpdateLoading(true);
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
      // activeUpdateLoading(false);
      if (data.success) {
        setRefresh(!onRefresh);
        Toast(toast, data.message, 'success');
      }
    } catch (error) {
      // activeUpdateLoading(false);
      Toast(toast, error);
    }
  };

  const selectRow = (index, isSelected) => {
    data[index].status = isSelected;
    updateData([...data]);
  };
  return (
    <View style={genericStyles.Container}>
      {activeLoading ? (
        <Spinner />
      ) : loading ? (
        <Spinner />
      ) : (
        data.length > 0 && (
          <ScrollView>
            <View style={genericStyles.mt(10)}>
              {data.map((item, index) => {
                return (
                  <GalleryCard
                    title={item.name}
                    source={
                      item.logo_image.includes('jpg')
                        ? {uri: item.logo_image}
                        : require('../../../assets/Image_not_available.png')
                    }
                    key={index}
                    deleteItem={() => {
                      onChangeActiveDeactive(item.id);
                    }}
                    AddressLine={item.address}
                    Landmark={item.landmark}
                    subTitle={item.house_no}
                    iconName2="cancel"
                    iconType2="material-community"
                    twoMore={true}
                    longText={3.1}
                    IconColorChange={true}
                  />
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
