import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import StarRating from 'react-native-star-rating';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import axios from 'axios';
import BaseURL from '../constants/BaseURL';
import {useApp} from '../../Context/AppContext';
import Poweredby from '../Components/Poweredby';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../Components/Toast';

const FeedBacks = ({route, navigation}) => {
  const toast = useToast();

  const {ID, token} = route.params;
  const [star, setStar] = useState(null);

  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const {Userdata} = useApp();

  const handleOnSubmit = async () => {
    try {
      setSpinner(true);
      const response = await axios({
        url: BaseURL('feedback'),
        method: 'post',
        headers: {Authorization: `Bearer ${token}`},
        data: {
          user_id: ID,
          name:
            Userdata.userData.app_role_id == 4
              ? userName
              : Userdata.userData.name,
          rating: star,
          mobile_no: Userdata.userData.mobile_no,
          message: message,
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
  };

  return (
    <View style={genericStyles.Container}>
      <View style={genericStyles.mt(20)}>
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
        {Userdata.userData.app_role_id == 4 ? (
          <InputComponent
            placeholder="Name"
            value={userName}
            autoCapitalize="words"
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={genericStyles.ml(10)}
            containerStyle={styles.containerStyle}
            onChangeText={text => setUserName(text)}
          />
        ) : (
          <View style={styles.viewCon}>
            <Text style={styles.full}>{Userdata.userData.name}</Text>
          </View>
        )}
        <View style={styles.viewCon}>
          <Text style={styles.full}>{Userdata.userData.mobile_no}</Text>
        </View>
        <InputComponent
          placeholder="Write here..."
          value={message}
          multiline={true}
          autoCapitalize="words"
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={genericStyles.ml(10)}
          containerStyle={styles.containerStyle}
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
  viewCon: {
    borderRadius: 8,
    backgroundColor: '#F3EBF9',
    padding: 14,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  full: {
    fontSize: 14,
    color: '#666666',
    fontFamily: FONTS.InterMedium,
  },
  inputContainerStyle: {
    borderRadius: 8,
    backgroundColor: '#F3EBF9',
    borderBottomWidth: 0,
  },
  containerStyle: {
    marginTop: 10,
    width: '95%',
  },
});
