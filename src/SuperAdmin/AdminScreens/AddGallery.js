import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {genericStyles} from '../../constants';
import AddComponent from '../DashComponents/AddComponent';

const AddGallery = () => {
  return (
    <View style={genericStyles.Container}>
      <AddComponent />
    </View>
  );
};

export default AddGallery;

const styles = StyleSheet.create({});
