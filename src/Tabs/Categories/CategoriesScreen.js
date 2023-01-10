import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderBar from '../../Components/HeaderBar';
import {genericStyles} from '../../constants';
import CategoriesList from './CategoriesList';
import Spinner from '../../Components/Spinner';
import {useApp} from '../../../Context/AppContext';
import EmptyView from '../../Components/EmptyView';

const CategoriesScreen = ({navigation}) => {
  const {categories} = useApp();

  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        title="Categories"
        searchIcon="cart"
        ThirdType="ionicon"
        navigation={navigation}
        firstIcon="menu"
        firstOnpress={() => navigation.toggleDrawer()}
      />
      {categories.length > 0 && (
        <ScrollView>
          <CategoriesList
            cardContainer={genericStyles.mh(30)}
            ViewContainer={genericStyles.mt(20)}
            navigation={navigation}
            data={categories}
          />
        </ScrollView>
      )}
      {categories.length == [] && (
        <EmptyView heading="No categories found for this locality" />
      )}
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
