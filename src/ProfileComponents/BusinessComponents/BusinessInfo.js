import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import HeaderBar from '../../Components/HeaderBar';
import Poweredby from '../../Components/Poweredby';
import Cuate from '../../../assets/svg/cuate.svg';

const BusinessInfo = ({navigation}) => {
  let title2 = 'You have not added business\ndetails';
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
        purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
      </Text>
      <ButtonComponent
        title="Add Your Business"
        ButtonContainer={genericStyles.mt('50%')}
        onPress={() =>
          navigation.navigate('Business Details', {User: 'Business Info'})
        }
      />
      <Poweredby textStyle={genericStyles.mt(10)} />
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
