import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {genericStyles} from '../../constants';
import GalleryCard from '../DashComponents/GalleryCard';
import {useEffect} from 'react';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';
import BaseURL from '../../constants/BaseURL';
import {useApp} from '../../../Context/AppContext';
import NoDataAni from '../../Components/NoDataAni';
import SkeletonView from '../../Components/SkeletonView';

const StudentApproval = ({navigation}) => {
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
                        contact_person: item.hostel_name,
                        name: item.name,
                        categoryName: 'No Category',
                        image: item.profile_image,
                        mobileNumber: item.mobile_no,
                        whatsappNumber: item.whatsapp_no,
                        address: item.hostel_address,
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

export default StudentApproval;
