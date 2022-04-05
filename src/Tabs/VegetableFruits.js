import {Alert, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../Components/HeaderBar';
import {genericStyles} from '../constants';
import CardsListed from '../Components/CardsListed';
import axios from 'axios';
import ListedAnimation from '../Components/ListedAnimation';

const VegetableFruits = ({navigation, route}) => {
  const {ID, Name} = route.params;
  const [data, setData] = useState([]);

  const ServiceList = async id => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/service-list';
      const response = await axios
        .post(URL, {
          category_id: ID,
        })
        .then(response => {
          if (response.data.success === true) {
            setData(response.data.service);
          } else {
            Alert.alert(null, response.data.message, [
              {
                text: 'Ok',
                onPress: () => navigation.goBack(),
              },
            ]);
          }
        });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    ServiceList();
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
      {data.length > 0 ? (
        <ScrollView style={genericStyles.mt(20)}>
          {data.map((data, index) => (
            <CardsListed
              source={{uri: data.logo_image}}
              index={index}
              key={data.id}
              title={data.name}
              subTitle={data.address}
              category={data.categoryName}
              phoneNumber={data.contact_person_mobile}
              WhatsAppNumber={data.contact_person_whatsapp}
            />
          ))}
          <View style={genericStyles.height(20)} />
        </ScrollView>
      ) : (
        <ListedAnimation />
      )}
    </View>
  );
};

export default VegetableFruits;
