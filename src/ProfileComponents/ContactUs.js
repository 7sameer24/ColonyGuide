import {
  Keyboard,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import {Icon} from 'react-native-elements';
import Poweredby from '../Components/Poweredby';
import axios from 'axios';
import BaseURL from '../constants/BaseURL';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../Components/Toast';

const ContactUs = ({route, navigation}) => {
  const toast = useToast();

  const {userID, userToken} = route.params;
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');

  const text =
    'Please feel free to contact us for any\nquery we will get back to you as soon\nas possible.';
  const text2 =
    '193, near Passport office, Subhash Nagar, Udaipur, Rajasthan 313001';
  const arr = [
    {
      name: 'logo-facebook',
      url: 'https://www.facebook.com/profile.php?id=100080150563442',
    },
    {name: 'logo-instagram', url: 'https://www.instagram.com/colonyguide/'},
    {name: 'logo-twitter', url: 'https://twitter.com/colonyguide'},
    {
      name: 'logo-linkedin',
      url: 'https://www.linkedin.com/in/colony-guide-99a16a237/',
    },
  ];

  const SendContact = async () => {
    if (mobile.length < 10 || mobile.length > 10) {
      Toast(toast, 'Please check your number and try again');
    } else {
      try {
        setSpinner(true);
        const response = await axios({
          url: BaseURL('contactus'),
          method: 'post',
          headers: {Authorization: `Bearer ${userToken}`},
          data: {
            user_id: userID,
            mobile_no: mobile,
            message: message,
            name: name,
          },
        });
        setSpinner(false);
        Keyboard.dismiss();
        if (response.data.success === true) {
          navigation.navigate('Homee');
          Toast(toast, response.data.message);
        } else {
          Toast(toast, response.data.message);
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
  };

  return (
    <View style={genericStyles.Container}>
      <ScrollView>
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
            maxLength={10}
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
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'ios') {
                Linking.openURL(
                  `http://maps.apple.com/maps?daddr=${'193'}+${'Passport office road'}+${'Subhash Nagar'}`,
                );
              } else {
                Linking.openURL(
                  `google.navigation:q=${'193'}+${'Passport office road'}+${'Subhash Nagar'}`,
                );
              }
            }}>
            <Text style={styles.VisitTitle}>{text2}</Text>
          </TouchableOpacity>
          <Text style={styles.VisitTex}>Talk to us</Text>
          <TouchableOpacity onPress={() => Linking.openURL('tel:	9549993335')}>
            <Text style={[styles.VisitTitle, {marginTop: 10}]}>
              +91-9549993335
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:ankit@phppoets.com')}>
            <Text style={[styles.VisitTitle, {marginTop: 2}]}>
              ankit@phppoets.com
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          {arr.map(data => (
            <Icon
              name={data.name}
              type="ionicon"
              color={COLORS.primary}
              key={data.name}
              raised
              onPress={() => Linking.openURL(data.url)}
              containerStyle={genericStyles.shadow}
            />
          ))}
        </View>
        <Poweredby container={genericStyles.mt(20)} />
      </ScrollView>
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
    marginBottom: 15,
  },
  Container: {
    marginTop: 10,
    marginBottom: 20,
  },
  Container2: {
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  VisitTex: {
    fontFamily: FONTS.InterMedium,
    fontSize: 14,
    color: COLORS.textColor,
    textAlign: 'left',
    marginTop: 10,
  },
  VisitTitle: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: '#7E7E7E',
    textAlign: 'left',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
});
