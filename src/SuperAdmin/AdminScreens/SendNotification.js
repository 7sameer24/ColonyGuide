import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, genericStyles} from '../../constants';
import InputComponent from '../../Components/InputComponent';
import GalleryCard from '../DashComponents/GalleryCard';
import axios from 'axios';
import {useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';
import Toast from '../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import NoDataAni from '../../Components/NoDataAni';
import ButtonComponent from '../../Components/ButtonComponent';
import moment from 'moment';
import ImgIcon from '../../../assets/svg/amico.svg';
import SkeletonView from '../../Components/SkeletonView';

const SendNotification = ({navigation}) => {
  const toast = useToast();
  const {adminData, adminToken} = useApp();
  const [data, updateData] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    updateLoading(true);
    try {
      const {data} = await axios(BaseURL('admin-notification-list'), {
        method: 'post',
        data: {
          locality_id: adminData.userData.locality_id,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      updateLoading(false);

      if (data.success) {
        updateData(data.notificationData);
        setFilterData(data.notificationData);
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

  const timeFormatter = cell => {
    if (cell !== null || cell !== undefined) {
      let correctDate = moment(new Date(cell)).format('DD-MMM-YYYY hh:mm');
      return correctDate;
    } else {
      return 'NA';
    }
  };

  const setFilter = text => {
    if (text) {
      const newData = filterData.filter(item => {
        const itemData = item.message
          ? item.message.toLowerCase()
          : ''.toUpperCase();
        const textData = text.toLowerCase();
        return itemData.search(textData) > -1;
      });
      updateData(newData);
      setSearch(text);
    } else {
      updateData(filterData);
      setSearch(text);
    }
  };

  return (
    <View style={genericStyles.Container}>
      <InputComponent
        iconName="search"
        placeholder="Search"
        value={search}
        inputStyle={genericStyles.ml(10)}
        onChangeText={text => setFilter(text)}
        iconContainerStyle={genericStyles.mr(10)}
        inputContainerStyle={styles.inputContainerStyle}
      />
      {loading ? (
        <SkeletonView containerStyle={genericStyles.mt(10)} />
      ) : (
        data.length > 0 && (
          <ScrollView>
            <View style={genericStyles.mt(10)}>
              {data.map((item, index) => {
                return (
                  <GalleryCard
                    key={index}
                    longText={2}
                    title={item.message}
                    source={{uri: item.image}}
                    AddressLine={timeFormatter(item.created_at)}
                    twoMore={true}
                    subTitle={`Notification sent : ${
                      item.notification_sent_count
                        ? item.notification_sent_count
                        : 0
                    }`}
                  />
                );
              })}
            </View>
          </ScrollView>
        )
      )}
      {!loading && data.length == [] && (
        <View style={styles.imageStyle}>
          <ImgIcon />
        </View>
      )}
      <ButtonComponent
        title="Add"
        onPress={() => navigation.navigate('Add Notification')}
        ButtonContainer={genericStyles.width('90%')}
      />
      <View style={genericStyles.height(20)} />
    </View>
  );
};

export default SendNotification;

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 20,
    borderRadius: 10,
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '30%',
    flex: 1,
  },
});
