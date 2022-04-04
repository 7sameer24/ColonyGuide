import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../src/constants';
import ButtonComponent from '../../src/Components/ButtonComponent';
import Poweredby from '../Components/Poweredby';
import Cuate from '../../assets/svg/cuate.svg';
import axios from 'axios';
import CardsListed from '../Components/CardsListed';
import Spinner from '../Components/Spinner';
import {ScrollView} from 'react-native-gesture-handler';

const ServiceInfo = ({navigation, route}) => {
  const {userID, Role} = route.params;
  const [data, setUserData] = useState('');

  const idx = async () => {
    try {
      const URL =
        'https://colonyguide.garimaartgallery.com/api/houseowner-service-list';
      const response = await axios.post(URL, {
        user_id: userID,
        app_role_id: Role,
      });
      if (response.data.success === true) {
        setUserData(response.data.data);
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
      setUserData('');
    };
  }, []);

  let title = 'You have not added service\ndetails';
  return (
    <View style={genericStyles.Container}>
      <>
        {data.length > 0 ? (
          <ScrollView>
            {data.map((newData, index) => (
              <CardsListed
                key={newData.id}
                index={index}
                category={newData.category_id}
                subTitle={newData.address}
                title={newData.name}
                phoneNumber={data.contact_person_mobile}
                WhatsAppNumber={data.contact_person_whatsapp}
                source={{uri: newData.logo_image}}
              />
            ))}
            <View style={genericStyles.mb(10)} />
          </ScrollView>
        ) : (
          <Spinner />
        )}
      </>
      <ButtonComponent
        title="Add Your Service"
        ButtonContainer={{position: 'absolute', bottom: 40, width: '90%'}}
        onPress={() =>
          navigation.navigate('Business Details', {User: 'Service Info'})
        }
      />
      <Poweredby />
    </View>
  );
};

export default ServiceInfo;

const styles = StyleSheet.create({
  View: {marginTop: 50, alignSelf: 'center', marginBottom: 20},
  title: {
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginTop: 30,
    marginLeft: 20,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: FONTS.InterRegular,
    color: '#888888',
    marginTop: 10,
    marginLeft: 20,
    width: '80%',
    textAlign: 'left',
  },
});
