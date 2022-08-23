import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, genericStyles} from '../../constants';
import CustomView from '../DashComponents/CustomView';
import InputComponent from '../../Components/InputComponent';
import GalleryCard from '../DashComponents/GalleryCard';

const SendNotification = () => {
  return (
    <View style={genericStyles.Container}>
      <InputComponent
        iconName="search"
        placeholder="Search"
        inputStyle={genericStyles.ml(10)}
        iconContainerStyle={genericStyles.mr(10)}
        inputContainerStyle={styles.inputContainerStyle}
      />
      <CustomView />
      <GalleryCard />
    </View>
  );
};

export default SendNotification;

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 20,
    borderRadius: 10,
  },
});
