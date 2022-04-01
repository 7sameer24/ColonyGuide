import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';

const Notification = () => {
  const idx = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/notification';
      const response = await axios.post(URL);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    idx();
  }, []);

  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
