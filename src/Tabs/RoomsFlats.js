import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../constants';
import CardsListed from '../Components/CardsListed';
import ButtonComponent from '../Components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from '../Components/Spinner';

const RoomsFlats = ({navigation}) => {
  const [Userdata, setNewData] = useState(null);
  const [newData, setData] = useState([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserLogin');
      if (value === null) {
        return alert('22');
      } else {
        setNewData(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const idx = async () => {
    try {
      const URL =
        'https://colonyguide.garimaartgallery.com/api/room-hostel-list';
      const response = await axios.post(URL);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    idx();
    return () => {
      setNewData(null);
      setData([]);
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {newData.length > 0 ? (
        <ScrollView style={genericStyles.mt(5)}>
          {newData.map((data, index) => (
            <CardsListed
              key={data.id}
              title={data.building_name}
              subTitle={data.contact_person}
              category={data.category}
              source={{uri: data.logo_image}}
              index={index}
            />
          ))}
          <View style={genericStyles.height(80)} />
        </ScrollView>
      ) : (
        <Spinner />
      )}
      {Userdata !== null ? (
        Userdata.userData.app_role_id === 3 ? (
          <ButtonComponent
            title="Add room"
            ButtonContainer={styles.ButtonContainer}
            onPress={() => navigation.navigate('Add room')}
          />
        ) : null
      ) : null}
    </View>
  );
};

export default RoomsFlats;

const styles = StyleSheet.create({
  ButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '90.7%',
  },
});
