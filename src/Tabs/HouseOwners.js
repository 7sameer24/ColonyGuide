import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {genericStyles} from '../constants';
import HeaderBar from '../Components/HeaderBar';
import HouseOnwersList from '../Components/HouseOnwersList';

const HouseOwners = ({navigation}) => {
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        titleStyle={genericStyles.mr('25%')}
        firstIcon="arrow-back-outline"
        title="House Owners"
        searchIcon="search"
        bellIcon="filter"
        firstOnpress={() => navigation.goBack()}
      />
      <ScrollView style={genericStyles.mt(10)}>
        <HouseOnwersList />
        <HouseOnwersList />
        <HouseOnwersList />
        <HouseOnwersList />
        <HouseOnwersList />
        <HouseOnwersList />
        <HouseOnwersList />
        <HouseOnwersList />
        <View style={genericStyles.height(20)} />
      </ScrollView>
    </View>
  );
};

export default HouseOwners;

const styles = StyleSheet.create({});
