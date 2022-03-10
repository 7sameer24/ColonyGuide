import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import {Icon} from 'react-native-elements';

const ContactUs = () => {
  const text =
    'Please feel free to contact us for any\nquery we will get back to you as soon\nas possible.';
  const text2 = '73, PHP poets IT solution\nSubhash Nagar 23987';
  const arr = [
    {name: 'logo-facebook'},
    {name: 'logo-instagram'},
    {name: 'logo-twitter'},
    {name: 'logo-linkedin'},
  ];
  return (
    <View style={genericStyles.Container}>
      <View style={styles.Container}>
        <Text style={styles.text}>{text}</Text>
        <InputComponent placeholder="Name" />
        <InputComponent placeholder="Mobile Number" />
        <InputComponent placeholder="Message" />
      </View>
      <ButtonComponent title="Send" />
      <View style={styles.Container2}>
        <Text style={styles.VisitTex}>Visit Us</Text>
        <Text style={styles.VisitTitle}>{text2}</Text>
        <Text style={styles.VisitTex}>Talk to us</Text>
        <Text style={[styles.VisitTitle, {marginTop: 10}]}>+91-987654321</Text>
        <Text style={[styles.VisitTitle, {marginTop: 2}]}>
          exampple@gmail.com
        </Text>
      </View>
      <View style={styles.iconContainer}>
        {arr.map(data => (
          <Icon
            name={data.name}
            type="ionicon"
            color={COLORS.primary}
            key={data.name}
            raised
            containerStyle={genericStyles.shadow}
          />
        ))}
      </View>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.InterRegular,
    fontSize: 16,
    marginHorizontal: 20,
    color: COLORS.textColor,
    textAlign: 'left',
    marginBottom: 20,
  },
  Container: {
    marginTop: 10,
    marginBottom: 40,
  },
  Container2: {
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  VisitTex: {
    fontFamily: FONTS.InterMedium,
    fontSize: 14,
    color: COLORS.textColor,
    textAlign: 'left',
    marginTop: 15,
  },
  VisitTitle: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: '#7E7E7E',
    textAlign: 'left',
    marginTop: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
});
