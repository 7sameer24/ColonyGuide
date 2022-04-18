import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import CardsListed from '../../Components/CardsListed';
import ButtonComponent from '../../Components/ButtonComponent';
import axios from 'axios';
import {useApp} from '../../../Context/AppContext';
import ListedAnimation from '../../Components/ListedAnimation';
import Poweredby from '../../Components/Poweredby';
import BaseURL from '../../constants/BaseURL';
import NoDataAni from '../../Components/NoDataAni';

const AllRoomsHostals = ({navigation}) => {
  const {Userdata} = useApp();
  const [newData, setData] = useState([]);
  const [check, setCheck] = useState('');

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('room-hostel-list'));
      if (response.data.success === true) {
        setData(response.data.data);
      } else {
        setCheck(response.data.success);
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
      {check === false ? (
        <NoDataAni />
      ) : (
        <>
          {newData.length > 0 ? (
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
                    phoneNumber={data.mobile_no}
                    WhatsAppNumber={data.whatsapp_no}
                  />
                ))}
                <View style={genericStyles.height(20)} />
              </ScrollView>
              {Userdata !== null ? (
                Userdata.userData.app_role_id === 3 ? (
                  <>
                    <ButtonComponent
                      title="Add room"
                      ButtonContainer={styles.ButtonContainer}
                      onPress={() => navigation.navigate('Add room')}
                    />
                    <Poweredby container={{flex: 0}} />
                  </>
                ) : null
              ) : null}
            </>
          ) : (
            <ListedAnimation />
          )}
        </>
      )}
    </View>
  );
};

export default AllRoomsHostals;

const styles = StyleSheet.create({
  ButtonContainer: {
    width: '90%',
  },
});
