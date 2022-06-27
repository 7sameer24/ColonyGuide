import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import HeaderBar from '../../Components/HeaderBar';
import Poweredby from '../../Components/Poweredby';
import Cuate from '../../../assets/svg/cuate.svg';

const BusinessInfo = ({navigation}) => {
  let title2 = 'Colony guide app- one stop for all you info for your locality.';
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        firstIcon="arrow-back-outline"
        title="Business Info"
        firstOnpress={() => navigation.goBack()}
      />
      <View style={styles.View}>
        <Cuate />
      </View>
      <Text style={styles.title}>{title2}</Text>
      <Text style={styles.subTitle}>
        Now you can search for anything from hostels info to PGs to hospitals,
        schools and shopping malls, hotels and even showrooms in your locality
        or town.
      </Text>
      <ButtonComponent
        title="Add Your Business"
        ButtonContainer={{position: 'absolute', bottom: 40, width: '90%'}}
        onPress={() => navigation.navigate('Business Details')}
      />
      <Poweredby />
    </View>
  );
};

export default BusinessInfo;

const styles = StyleSheet.create({
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
  View: {marginTop: 50, alignSelf: 'center', marginBottom: 20},
});
