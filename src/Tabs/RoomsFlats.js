import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FONTS, genericStyles} from '../constants';
import CardsListed from '../Components/CardsListed';
import ButtonComponent from '../Components/ButtonComponent';
import axios from 'axios';
import {useApp} from '../../Context/AppContext';
import ListedAnimation from '../Components/ListedAnimation';
import Poweredby from '../Components/Poweredby';

const RoomsFlats = ({navigation, route}) => {
  const {Userdata} = useApp();
  const [newData, setData] = useState([]);
  const [check, setCheck] = useState('');
  console.log(check);

  const idx = async () => {
    try {
      const URL =
        'https://colonyguide.garimaartgallery.com/api/filtered-room-hostel-list';
      const response = await axios.post(URL, {room_type_id: route.name});
      if (response.data.success === true) {
        setData(response.data.data);
        // setCheck(response.data.success);
      } else {
        setCheck(response.data.success);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setData([]);
      setCheck('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {check === false ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={styles.text}>Data not found</Text>
        </View>
      ) : (
        <>
          <ScrollView style={genericStyles.mt(5)}>
            {newData.map((data, index) => (
              <CardsListed
                key={data.id}
                title={data.building_name}
                subTitle={data.contact_person}
                category={data.category === 0 ? 'Hostel' : 'Rooms/Flats'}
                source={{uri: data.logo_image}}
                index={index}
              />
            ))}
            <View style={genericStyles.height(80)} />
          </ScrollView>
        </>
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
      <Poweredby />
    </View>
  );
};

export default RoomsFlats;

const styles = StyleSheet.create({
  ButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    marginBottom: 25,
  },
  text: {
    fontSize: 14,
    color: '#666666',
    fontFamily: FONTS.InterMedium,
  },
});
