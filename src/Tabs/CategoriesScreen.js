import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../Components/HeaderBar';
import {genericStyles} from '../constants';
import CategoriesList from './CategoriesList';
import axios from 'axios';
import Spinner from '../Components/Spinner';

const CategoriesScreen = ({navigation}) => {
  const [newData, setNewData] = useState([]);

  const idx = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/get-all-master';
      const response = await axios.post(URL);
      setNewData(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    idx();
  }, []);
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        title="Categories"
        // searchIcon="search"
        navigation={navigation}
        firstIcon="menu"
        firstOnpress={() => navigation.toggleDrawer()}
      />
      {newData.length > 0 ? (
        <ScrollView>
          <CategoriesList
            cardContainer={genericStyles.mh(30)}
            ViewContainer={genericStyles.mt(20)}
            navigation={navigation}
            data={newData}
          />
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
