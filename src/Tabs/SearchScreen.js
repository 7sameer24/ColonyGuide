import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {genericStyles, Images} from '../constants';
import InputComponent from '../Components/InputComponent';

const SearchScreen = () => {
  return (
    <View style={genericStyles.Container}>
      <InputComponent
        placeholder="Search people, categories..."
        iconName="search"
        inputContainerStyle={styles.inputContainerStyle}
      />
      <Image source={Images.Search} style={styles.imageStyle} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: 264.7,
    height: 222.38,
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
