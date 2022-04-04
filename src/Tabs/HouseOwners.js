import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../constants';
import HeaderBar from '../Components/HeaderBar';
import HouseOnwersList from '../Components/HouseOnwersList';
import axios from 'axios';
import ListedAnimation from '../Components/ListedAnimation';

const HouseOwners = ({navigation}) => {
  const [newData, setData] = useState([]);

  const idx = async () => {
    try {
      const URL =
        'https://colonyguide.garimaartgallery.com/api/house-owner-list';
      const response = await axios.post(URL);
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
        title="House Owners"
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
