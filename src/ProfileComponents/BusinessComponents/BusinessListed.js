import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import HeaderBar from '../../Components/HeaderBar';
import CardsListed from '../../Components/CardsListed';
import axios from 'axios';
import ListedAnimation from '../../Components/ListedAnimation';
import BaseURL from '../../constants/BaseURL';

const BusinessListed = ({navigation}) => {
  const [newData, setNewData] = useState([]);

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('business-list'));
      setNewData(response.data.business);
    } catch (error) {
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
        title="Business listed"
        // searchIcon="search"
        // bellIcon="filter"
        ThirdType="material-community"
        firstOnpress={() => navigation.goBack()}
      />
      {newData.length > 0 ? (
        <ScrollView style={genericStyles.mt(10)}>
          {newData.map((data, index) => (
            <CardsListed
              source={{uri: data.logo_image}}
              title={data.name}
              key={data.id}
              index={index}
              subTitle={data.contact_person}
              phoneNumber={data.contact_person_mobile}
              WhatsAppNumber={data.contact_person_whatsapp}
              category={data.categoryName}
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

export default BusinessListed;

const styles = StyleSheet.create({});
