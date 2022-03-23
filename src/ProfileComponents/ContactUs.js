import {Keyboard, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import {Icon} from 'react-native-elements';
import Poweredby from '../Components/Poweredby';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ContactUs = () => {
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState('');
  const [mobile, setMobile] = useState('');
  const [data, setNewData] = useState('');
  const [name, setName] = useState('');

  const text =
    'Please feel free to contact us for any\nquery we will get back to you as soon\nas possible.';
  const text2 = '73, PHP poets IT solution\nSubhash Nagar 23987';
  const arr = [
    {name: 'logo-facebook'},
    {name: 'logo-instagram'},
    {name: 'logo-twitter'},
    {name: 'logo-linkedin'},
  ];

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserLogin');
      if (value !== null) {
        setNewData(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const SendContact = async () => {
    try {
      setSpinner(true);
      const URL = 'https://colonyguide.garimaartgallery.com/api/contact-us';
      const response = await axios({
        url: URL,
        method: 'post',
        headers: {Authorization: `Bearer ${data.token}`},
        data: {
          user_id: data.user.id,
          mobile_no: mobile,
          message: message,
          name: name,
        },
      });
      setSpinner(false);
      Keyboard.dismiss();
      if (response.data.success === true) {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setSpinner(false);
      alert(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={genericStyles.Container}>
      <View style={styles.Container}>
        <Text style={styles.text}>{text}</Text>
        <InputComponent
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <InputComponent
          placeholder="Mobile Number"
          value={mobile}
          onChangeText={num => setMobile(num)}
          keyboardType="number-pad"
        />
        <InputComponent
          placeholder="Message"
          value={message}
          onChangeText={text => setMessage(text)}
        />
      </View>
      <ButtonComponent
        title="Send"
        onPress={() => SendContact()}
        loading={spinner ? true : false}
      />
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
      <Poweredby />
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
