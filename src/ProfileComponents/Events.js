import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import {Image} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import BaseURL from '../constants/BaseURL';
import axios from 'axios';
import {useApp} from '../../Context/AppContext';
import Spinner from '../Components/Spinner';
import NoDataAni from '../Components/NoDataAni';

const WIDTH = Dimensions.get('window').width;
const HIGHT = Dimensions.get('window').height;
const Events = () => {
  const [imgData, setimgData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const {Userdata, UserToken} = useApp();

  const idx = async () => {
    setIsLoading(true);
    try {
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
            <View key={index} style={styles.slide2}>
              <Text style={styles.title}>{e.event_name}</Text>
              <Swiper
                key={index}
                automaticallyAdjustContentInsets
                activeDotColor={COLORS.primary}
                nextButton={
                  <Text style={{color: COLORS.primary, fontSize: 40}}>›</Text>
                }
                prevButton={
                  <Text style={{color: COLORS.primary, fontSize: 40}}>‹</Text>
                }
                showsButtons={true}
                autoplay={true}>
                {e.event_image.map((i, imgIndex) => (
                  <View key={imgIndex} style={styles.slide2}>
                    <Image
                      resizeMode="contain"
                      source={{uri: i.event_image}}
                      style={styles.wrap}
                    />
                  </View>
                ))}
              </Swiper>
            </View>
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
    width: WIDTH,
    height: HIGHT * 0.25,
  },
  slide2: {
    height: 270,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    color: COLORS.primary,
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
    marginBottom: 10,
  },
});
