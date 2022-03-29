import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../constants';
import CommiteeList from '../Components/CommitteeList';
import HeaderBar from '../Components/HeaderBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from '../Components/Spinner';

const Committee = ({navigation}) => {
  // const [userData, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  // console.log(userData.token);

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('UserLogin');
  //     if (value !== null) {
  //       setData(JSON.parse(value));
  //     }
  //   } catch (e) {
  //     alert(e);
  //   }
  // };

  const idx = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/get-committee';
      const response = await axios.post(URL);
      setNewData(response.data.committee);
    } catch (error) {
      alert(error);
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
        title="Committee"
        // searchIcon="search"
        bellIcon="filter"
        ThirdType="material-community"
        firstOnpress={() => navigation.goBack()}
      />
      {newData.length > 0 ? (
        <ScrollView style={genericStyles.mt(30)}>
          <CommiteeList data={newData} />
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default Committee;

const styles = StyleSheet.create({});
