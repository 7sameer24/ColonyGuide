import {StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderBar from '../Components/HeaderBar';
import {genericStyles} from '../constants';
import CategoriesList from './CategoriesList';

const CategoriesScreen = ({navigation}) => {
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        title="Categories"
        searchIcon="search"
        navigation={navigation}
        firstIcon="menu"
        firstOnpress={() => navigation.toggleDrawer()}
      />
      <CategoriesList
        cardContainer={genericStyles.mh(30)}
        ViewContainer={genericStyles.mt(20)}
        navigation={navigation}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
