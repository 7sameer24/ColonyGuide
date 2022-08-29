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
import Spinner from '../../Components/Spinner';
import ButtonComponent from '../../Components/ButtonComponent';
import moment from 'moment';

const SendNotification = () => {
  const toast = useToast();
  const {adminToken} = useApp();
  const [data, updateData] = useState([]);
  const [loading, updateLoading] = useState(false);

  const fetchData = async () => {
    updateLoading(true);
    try {
      const {data} = await axios(BaseURL('admin-notification-list'), {
        method: 'post',
        data: {
          locality_id: 1,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      updateLoading(false);
      if (data.success) {
        updateData(data.notificationData);
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

  const timeFormatter = cell => {
    if (cell !== null || cell !== undefined) {
      let correctDate = moment(new Date(cell)).format('DD-MMM-YYYY hh:mm');
      console.log(correctDate);
      return correctDate;
    } else {
      return 'NA';
    }
  };
  return (
    <View style={genericStyles.Container}>
      <InputComponent
        iconName="search"
        placeholder="Search"
        inputStyle={genericStyles.ml(10)}
        iconContainerStyle={genericStyles.mr(10)}
        inputContainerStyle={styles.inputContainerStyle}
      />
      {loading ? (
        <Spinner />
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
                    subTitle={`Notification sent : ${
                      item.notification_sent_count
                        ? item.notification_sent_count
                        : 0
                    }`}
                    twoMore={true}
                  />
                );
              })}
            </View>
          </ScrollView>
        )
      )}
      {!loading && data.length == [] && <NoDataAni />}
      <ButtonComponent
        title="Add"
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
});
