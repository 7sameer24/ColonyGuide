import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {genericStyles} from '../../constants';
import GalleryCard from '../DashComponents/GalleryCard';
import {useEffect} from 'react';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';
import BaseURL from '../../constants/BaseURL';
import {useApp} from '../../../Context/AppContext';
import Spinner from '../../Components/Spinner';
import NoDataAni from '../../Components/NoDataAni';

const StudentApproval = () => {
  const toast = useToast();
  const {adminToken} = useApp();
  const [data, updateData] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [activeLoading, activeUpdateLoading] = useState(false);

  const fetchData = async () => {
    updateLoading(true);
    try {
      const {data} = await axios(BaseURL('admin-user-data'), {
        method: 'post',
        data: {
          locality_id: 1,
          type: 1,
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
  }, []);

  const onChangeActiveDeactive = async (user_id, status) => {
    // activeUpdateLoading(true);
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
      // activeUpdateLoading(false);
      if (data.success) {
        fetchData();
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
                      item.profile_image.includes('jpg')
                        ? {uri: item.profile_image}
                        : require('../../../assets/Image_not_available.png')
                    }
                    key={index}
                    toggleSwitch={() => {
                      onChangeActiveDeactive(item.id, item.status);
                      selectRow(index, item.status === 0 ? 1 : 0);
                    }}
                    subTitle={item.hostel_name}
                    AddressLine={item.hostel_address}
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

export default StudentApproval;

const styles = StyleSheet.create({});
