import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../constants';
import HeaderBar from '../Components/HeaderBar';
import HouseOnwersList from '../Components/HouseOnwersList';
import axios from 'axios';
import ListedAnimation from '../Components/ListedAnimation';
import BaseURL from '../constants/BaseURL';

const HouseOwners = ({navigation}) => {
  const [newData, setData] = useState([]);

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('house-owner-list'));
      setData(response.data.houseowner);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        firstIcon="arrow-back-outline"
        title="Resident"
        // searchIcon="search"
        // bellIcon="filter"
        ThirdType="material-community"
        firstOnpress={() => navigation.goBack()}
      />
      {newData.length > 0 ? (
        <ScrollView style={genericStyles.mt(10)}>
          {newData.map((data, index) => (
            <HouseOnwersList
              title={data.name}
              AddressLine={data.address}
              Landmark={data.landmark}
              key={data.id}
              subTitle={data.house_no}
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

export default HouseOwners;

const styles = StyleSheet.create({});
