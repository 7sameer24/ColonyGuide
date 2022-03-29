import {StyleSheet, View} from 'react-native';
import React from 'react';
import {genericStyles} from '../constants';
import InputComponent from '../Components/InputComponent';
import ImgIcon from '../../assets/svg/amico.svg';

const SearchScreen = () => {
  return (
    <View style={genericStyles.Container}>
      <InputComponent
        placeholder="Search people, categories..."
        iconName="search"
        inputContainerStyle={styles.inputContainerStyle}
      />
      <View style={styles.imageStyle}>
        <ImgIcon />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'center',
    marginTop: '40%',
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: '#EFEFEF',
    borderRadius: 30,
    elevation: 4,
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginTop: 10,
  },
});
