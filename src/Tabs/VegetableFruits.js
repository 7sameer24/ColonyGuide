import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../Components/HeaderBar';
import {genericStyles} from '../constants';
import CardsListed from '../Components/CardsListed';
import axios from 'axios';
import Spinner from '../Components/Spinner';

const VegetableFruits = ({navigation, route}) => {
  const {ID, Name} = route.params;
  const [data, setData] = useState([]);
  // console.log(data);

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
            alert(response.data.message);
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
        bellIcon="filter"
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
              title={data.about}
              subTitle={data.contact_person}
              category="Hostel"
            />
          ))}
          <View style={genericStyles.height(20)} />
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default VegetableFruits;

const styles = StyleSheet.create({});
