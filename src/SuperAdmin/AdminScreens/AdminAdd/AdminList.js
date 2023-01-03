import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../../constants';
import ButtonComponent from '../../../Components/ButtonComponent';
import Poweredby from '../../../Components/Poweredby';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import BaseURL from '../../../constants/BaseURL';
import NoDataAni from '../../../Components/NoDataAni';
import SkeletonView from '../../../Components/SkeletonView';
import GalleryCard from '../../DashComponents/GalleryCard';
import Toast from '../../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';

const AdminList = ({navigation, route}) => {
  const toast = useToast();
  const [data, setUserData] = useState([]);
  const [loading, updateLoading] = useState(false);

  const fetchData = async () => {
    try {
      updateLoading(true);
      const response = await axios(BaseURL('admin-user-list'), {
        method: 'post',
        data: {
          user_id: route.params.adminData.userData.id,
        },
        headers: {
          Authorization: `Bearer ${route.params.adminToken}`,
        },
      });
      updateLoading(false);
      if (response.data.success) {
        setUserData(response.data.userData);
      }
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    return () => {
      setUserData([]);
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
          Authorization: `Bearer ${route.params.adminToken}`,
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
    setUserData([...data]);
  };

  return (
    <View style={genericStyles.Container}>
      {data.length > 0 && (
        <ScrollView>
          {data.map((item, index) => {
            return (
              <GalleryCard
                key={index}
                title={item.name}
                source={require('../../../../assets/Image_not_available.png')}
                toggleSwitch={() => {
                  onChangeActiveDeactive(item.id, item.status);
                  selectRow(index, item.status === 0 ? 1 : 0);
                }}
                subTitle={item.mobile_no}
                isEnabled={item.status === 0 ? true : false}
                switchButton={true}
                iconName="checkmark"
                iconType="ionicon"
                IconColorChange={true}
                iconName2="cancel"
                iconType2="material-community"
                longText={2}
                AddressLine={item.locality.name}
                twoMore={true}
              />
            );
          })}
        </ScrollView>
      )}
      {loading && <SkeletonView />}

      {!loading && data.length == 0 && <NoDataAni />}
      <ButtonComponent
        title="Add User"
        ButtonContainer={styles.ButtonContainer}
        onPress={() => navigation.navigate('Add User')}
      />
    </View>
  );
};

export default AdminList;

const styles = StyleSheet.create({
  ButtonContainer: {
    width: '90%',
    marginVertical: 25,
  },
});
