import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {genericStyles} from '../constants';
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
          {data.map((newData, index) => (
            <View key={newData.id} style={genericStyles.mt(10)}>
              <Image source={{uri: newData.image}} style={styles.imageStyle} />
              <Text>Notification</Text>
            </View>
          ))}
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
    width: '100%',
    height: '60%',
    borderRadius: 10,
  },
});
