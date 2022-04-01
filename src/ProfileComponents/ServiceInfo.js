import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../src/constants';
import ButtonComponent from '../../src/Components/ButtonComponent';
import Poweredby from '../Components/Poweredby';
import Cuate from '../../assets/svg/cuate.svg';
import axios from 'axios';
const ServiceInfo = ({navigation, route}) => {
  const {userID, Role, token} = route.params;
  console.log(userID, Role, token);

  const idx = async () => {
    try {
      const URL =
        'https://colonyguide.garimaartgallery.com/api/houseowner-service-list';
      const response = await axios.post(URL, {
        user_id: 149,
        app_role_id: 3,
      });
      console(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    idx();
    // return () => {
    //   setUserData('');
    // };
  }, []);

  let title = 'You have not added service\ndetails';
  return (
    <View style={genericStyles.Container}>
      <View style={styles.View}>
        <Cuate />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
        purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
      </Text>
      <ButtonComponent
        title="Add Your Service"
        ButtonContainer={genericStyles.mt('50%')}
        onPress={() =>
          navigation.navigate('Business Details', {User: 'Service Info'})
        }
      />
      <Poweredby container={genericStyles.mb(20)} />
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
