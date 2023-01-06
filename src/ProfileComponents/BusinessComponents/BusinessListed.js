import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import HeaderBar from '../../Components/HeaderBar';
import CardsListed from '../../Components/CardsListed';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import NoDataAni from '../../Components/NoDataAni';
import {useApp} from '../../../Context/AppContext';
import SkeletonView from '../../Components/SkeletonView';

const BusinessListed = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loading, updateLoading] = useState(true);
  const {Userdata, GSaveLocalID, adminData} = useApp();

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('business-list'), {
        locality_id: GSaveLocalID
          ? GSaveLocalID
          : Userdata
          ? Userdata.userData.locality_id
          : adminData.userData.locality_id
          ? adminData.userData.locality_id
          : 1,
      });
      updateLoading(false);
      setNewData(response.data.business);
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setNewData([]);
    };
  }, []);
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        firstIcon="arrow-back-outline"
        title="Our Business"
        searchIcon="search"
        // bellIcon="filter"
        searchTouchable={() =>
          navigation.navigate('Search Business', {
            data: newData,
          })
        }
        ThirdType="material-community"
        firstOnpress={() => navigation.goBack()}
      />
      {newData.length > 0 && (
        <ScrollView style={genericStyles.mt(10)}>
          {newData.map((data, index) => (
            <TouchableOpacity
              key={data.id}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('Business Information', {
                  ID: data.id,
                  busInfoData: data,
                })
              }>
              <CardsListed
                source={
                  data.logo_image === 'https://admin.colonyguide.com/storage'
                    ? require('../../../assets/Image_not_available.png')
                    : {uri: data.logo_image}
                }
                title={data.name}
                index={index}
                subTitle={data.contact_person}
                phoneNumber={data.contact_person_mobile}
                WhatsAppNumber={data.contact_person_whatsapp}
                category={data.about}
                userId={data.user_id}
                businessId={data.id}
              />
            </TouchableOpacity>
          ))}
          <View style={genericStyles.height(20)} />
        </ScrollView>
      )}
      {loading && (
        <ScrollView>
          <SkeletonView />
          <View style={genericStyles.height(20)} />
        </ScrollView>
      )}
      {!loading && newData.length == [] && <NoDataAni />}
    </View>
  );
};

export default BusinessListed;

const styles = StyleSheet.create({});
