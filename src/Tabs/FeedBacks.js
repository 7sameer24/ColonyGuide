import {Keyboard, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import StarRating from 'react-native-star-rating';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import Poweredby from '../Components/Poweredby';
import axios from 'axios';
import BaseURL from '../constants/BaseURL';

const FeedBacks = ({route, navigation}) => {
  const {ID, token} = route.params;
  const [star, setStar] = useState(null);
  const [PersonName, setPersonName] = useState('');
  const [mobile_no, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [spinner, setSpinner] = useState(false);

  const handleOnSubmit = async () => {
    try {
      setSpinner(true);
      const response = await axios({
        url: BaseURL('feedback'),
        method: 'post',
        headers: {Authorization: `Bearer ${token}`},
        data: {
          user_id: ID,
          name: PersonName,
          rating: star,
          mobile_no: mobile_no,
          message: message,
        },
      });
      setSpinner(false);
      Keyboard.dismiss();
      if (response.data.success === true) {
        navigation.navigate('Homee');
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setSpinner(false);
      alert(error);
    }
  };

  return (
    <View style={genericStyles.Container}>
      <View style={genericStyles.mt(30)}>
        <Text style={styles.title}>Rate your experience on colony guide</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          animation="flash"
          starSize={28}
          containerStyle={styles.StarContainer}
          starStyle={genericStyles.mh(5)}
          emptyStarColor={COLORS.third}
          fullStarColor={COLORS.primary}
          selectedStar={rating => setStar(rating)}
          rating={star}
        />
        <InputComponent
          placeholder="Name"
          value={PersonName}
          onChangeText={text => setPersonName(text)}
        />
        <InputComponent
          placeholder="Mobile Number"
          value={mobile_no}
          onChangeText={text => setMobile(text)}
        />
        <InputComponent
          placeholder="Write here..."
          value={message}
          multiline={true}
          onChangeText={text => setMessage(text)}
        />
        <ButtonComponent
          title="Submit"
          loading={spinner ? true : false}
          onPress={() => handleOnSubmit()}
          ButtonContainer={genericStyles.mt(20)}
        />
      </View>
      <Poweredby />
    </View>
  );
};

export default FeedBacks;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: FONTS.InterRegular,
    color: COLORS.textColor,
    marginLeft: 20,
    marginBottom: 20,
  },
  StarContainer: {
    justifyContent: 'flex-start',
    marginLeft: 15,
    marginBottom: 20,
  },
});
