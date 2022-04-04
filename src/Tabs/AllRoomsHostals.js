import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../constants';
import CardsListed from '../Components/CardsListed';
import ButtonComponent from '../Components/ButtonComponent';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import {useApp} from '../../Context/AppContext';
import ListedAnimation from '../Components/ListedAnimation';

const AllRoomsHostals = ({navigation}) => {
  const {Userdata} = useApp();
  const [newData, setData] = useState([]);

  const idx = async () => {
    try {
      const URL =
        'https://colonyguide.garimaartgallery.com/api/room-hostel-list';
      const response = await axios.post(URL);
      if (response.data.success === true) {
        setData(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
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
        <ListedAnimation />
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

export default AllRoomsHostals;

const styles = StyleSheet.create({
  ButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '90.7%',
  },
});
