import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import axios from 'axios';
import CardsListed from '../../Components/CardsListed';
import Spinner from '../../Components/Spinner';
import {ScrollView} from 'react-native-gesture-handler';
import BaseURL from '../../constants/BaseURL';
import NoDataAni from '../../Components/NoDataAni';

const ServiceInfo = ({navigation, route}) => {
  const {userID, Role} = route.params;
  const [data, setUserData] = useState('');
  const [check, setCheck] = useState('');

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('houseowner-service-list'), {
        user_id: userID,
        app_role_id: Role,
      });
      if (response.data.success === true) {
        setUserData(response.data.data);
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
      setUserData('');
      setCheck('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      <>
        {check === false ? (
          <NoDataAni />
        ) : (
          <>
            {data.length > 0 ? (
              <ScrollView>
                {data.map((newData, index) => (
                  <CardsListed
                    key={newData.id}
                    index={index}
                    category={newData.categoryName}
                    subTitle={`${newData.house_no} ${newData.address} ${newData.landmark}`}
                    title={newData.name}
                    phoneNumber={newData.contact_person_mobile}
                    WhatsAppNumber={newData.contact_person_whatsapp}
                    source={
                      newData.logo_image ===
                      'https://colonyguide.garimaartgallery.com/storage'
                        ? require('../../../assets/Image_not_available.png')
                        : {uri: newData.logo_image}
                    }
                    googleNavigate={`${newData.house_no}+${newData.address}, Udaipur, Rajasthan`}
                  />
                ))}
                <View style={genericStyles.mb(20)} />
              </ScrollView>
            ) : (
              <Spinner />
            )}
          </>
        )}
      </>
      <ButtonComponent
        title="Add Your Service"
        ButtonContainer={styles.ButtonContainer}
        onPress={() => navigation.navigate('ServiceAddDetails')}
      />
      <Poweredby container={{flex: 0}} />
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
  ButtonContainer: {
    width: '90%',
  },
});
