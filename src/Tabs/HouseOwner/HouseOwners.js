import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import HeaderBar from '../../Components/HeaderBar';
import HouseOnwersList from '../../Components/HouseOnwersList';
import axios from 'axios';
import ListedAnimation from '../../Components/ListedAnimation';
import BaseURL from '../../constants/BaseURL';
import NoDataAni from '../../Components/NoDataAni';

const HouseOwners = ({navigation}) => {
  const [newData, setData] = useState([]);
  const [loading, updateLoading] = useState(true);

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('house-owner-list'));
      updateLoading(false);
      setData(response.data.houseowner);
    } catch (error) {
      updateLoading(false);
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
        searchIcon="search"
        searchTouchable={() => navigation.navigate('Search')}
        // bellIcon="filter"
        ThirdType="material-community"
        firstOnpress={() => navigation.goBack()}
      />
      {newData.length > 0 && (
        <ScrollView>
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
      )}
      {loading && <ListedAnimation />}
      {!loading && newData.length == [] && <NoDataAni />}
    </View>
  );
};

export default HouseOwners;

const styles = StyleSheet.create({});
