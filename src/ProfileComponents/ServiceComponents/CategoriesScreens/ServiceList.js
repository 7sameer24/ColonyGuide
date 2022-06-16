import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../../../Components/HeaderBar';
import {genericStyles} from '../../../constants';
import CardsListed from '../../../Components/CardsListed';
import axios from 'axios';
import ListedAnimation from '../../../Components/ListedAnimation';
import BaseURL from '../../../constants/BaseURL';
import NoDataAni from '../../../Components/NoDataAni';

const ServiceList = ({navigation, route}) => {
  const {ID, Name} = route.params;
  const [data, setData] = useState([]);
  const [check, setCheck] = useState('');

  const FetchData = async () => {
    try {
      const response = await axios
        .post(BaseURL('service-list'), {
          category_id: ID,
        })
        .then(response => {
          if (response.data.success === true) {
            setData(response.data.service);
          } else {
            setCheck(response.data.success);
          }
        });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    FetchData();
    return () => {
      setData([]);
    };
  }, []);
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        firstIcon="arrow-back-outline"
        title={Name}
        // searchIcon="search"
        // bellIcon="filter"
        ThirdType="material-community"
        firstOnpress={() => navigation.goBack()}
      />
      <Image
        source={require('../../../../assets/fake.jpg')}
        style={{width: '100%', height: 180}}
      />
      {check === false ? (
        <NoDataAni />
      ) : (
        <>
          {data.length > 0 ? (
            <ScrollView>
              {data.map((data, index) => (
                <TouchableOpacity
                  key={data.id}
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.navigate('Service Information', {ID: data.id})
                  }>
                  <CardsListed
                    source={
                      data.logo_image ===
                      'https://colonyguide.garimaartgallery.com/storage'
                        ? require('../../../../assets/Image_not_available.png')
                        : {uri: data.logo_image}
                    }
                    index={index}
                    title={data.name}
                    subTitle={`${data.house_no} ${data.address} ${
                      data.landmark == null ? '' : data.landmark
                    }`}
                    category={data.about}
                    GeoLocation={data.geolocation}
                    phoneNumber={data.contact_person_mobile}
                    WhatsAppNumber={data.contact_person_whatsapp}
                    // ShortDescription={data.about}
                    navigation={navigation}
                    userId={data.user_id}
                    serviceId={data.id}
                  />
                </TouchableOpacity>
              ))}
              <View style={genericStyles.height(20)} />
            </ScrollView>
          ) : (
            <ListedAnimation />
          )}
        </>
      )}
    </View>
  );
};

export default ServiceList;
