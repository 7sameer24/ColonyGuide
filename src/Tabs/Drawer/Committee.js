import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import CommiteeList from '../../Components/CommitteeList';
import HeaderBar from '../../Components/HeaderBar';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import BaseURL from '../../constants/BaseURL';
import Poweredby from '../../Components/Poweredby';
import {useApp} from '../../../Context/AppContext';

const Committee = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const {Userdata} = useApp();
  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('get-committee'), {
        locality_id: Userdata.userData.locality_id,
      });
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
        // bellIcon="filter"
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
      <Poweredby />
    </View>
  );
};

export default Committee;

const styles = StyleSheet.create({});
