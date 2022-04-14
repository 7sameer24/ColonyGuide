import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {COLORS, FONTS, genericStyles} from '../constants';
import Spinner from '../Components/Spinner';
import BaseURL from '../constants/BaseURL';

const Notification = () => {
  const [data, setData] = useState('');

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('notification'));
      setData(response.data.notification);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setData('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {data.length > 0 ? (
        <>
          <ScrollView>
            {data.map(newData => (
              <View key={newData.id} style={[genericStyles.mt(10)]}>
                <Image
                  source={{uri: newData.image}}
                  style={styles.imageStyle}
                  fadeDuration={0}
                />
                <Text style={styles.topText}>{newData.message}</Text>
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  imageStyle: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    alignSelf: 'center',
  },
  topText: {
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    textAlign: 'left',
    marginBottom: 10,
    marginLeft: 20,
  },
});
