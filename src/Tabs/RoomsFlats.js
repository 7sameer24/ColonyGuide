import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../constants';
import CardsListed from '../Components/CardsListed';
import ButtonComponent from '../Components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoomsFlats = ({navigation}) => {
  const [Userdata, setNewData] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserLogin');
      if (value !== null) {
        setNewData(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      setNewData('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      <ScrollView style={genericStyles.mt(5)}>
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <View style={genericStyles.height(80)} />
      </ScrollView>
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
