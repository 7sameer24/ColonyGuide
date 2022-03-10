import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import HeaderBar from '../../Components/HeaderBar';

const BusinessInfo = ({navigation}) => {
  let title2 = 'You have not added business\ndetails';
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        firstIcon="arrow-back-outline"
        title="Business Info"
        firstOnpress={() => navigation.goBack()}
      />
      <Image
        source={Images.Cuate}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title2}</Text>
      <Text style={styles.subTitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
        purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
      </Text>
      <ButtonComponent
        title="Add Your Business"
        ButtonContainer={genericStyles.top('25%')}
        onPress={() =>
          navigation.navigate('Business Details', {User: 'Business Info'})
        }
      />
    </View>
  );
};

export default BusinessInfo;

const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'center',
    width: 193.62,
    height: 208,
    marginTop: '20%',
  },
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
