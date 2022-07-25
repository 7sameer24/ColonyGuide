import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import BaseURL from '../../constants/BaseURL';
import axios from 'axios';
import {useApp} from '../../../Context/AppContext';
import Spinner from '../../Components/Spinner';
import NoDataAni from '../../Components/NoDataAni';

const Events = ({navigation}) => {
  const [imgData, setimgData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const {Userdata, UserToken} = useApp();

  const idx = async () => {
    try {
      setIsLoading(true);
      const response = await axios(BaseURL('events'), {
        method: 'post',
        data: {locality_id: Userdata.userData.locality_id},
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      setIsLoading(false);
      setimgData(response.data.event);
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setimgData([]);
    };
  }, []);
  return (
    <View style={genericStyles.container}>
      {imgData.length > 0 && (
        <ScrollView>
          {imgData.map((e, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EventInfo', {
                  description: e.event_description,
                  NewData: e.event_image,
                  name: e.event_name,
                })
              }
              activeOpacity={0.8}
              key={index}
              style={styles.slide2}>
              <Image
                source={{uri: e.event_image[0].event_image}}
                style={styles.wrap}
              />
              <Text style={styles.title}>{e.event_description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {loading && <Spinner />}
      {!loading && !imgData && <NoDataAni />}
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    alignSelf: 'center',
  },
  slide2: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 14,
    fontFamily: FONTS.InterRegular,
    marginTop: 10,
  },
});
