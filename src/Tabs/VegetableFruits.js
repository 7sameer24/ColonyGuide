import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderBar from '../Components/HeaderBar';
import {genericStyles} from '../constants';
import CardsListed from '../Components/ButtonComponent';

const VegetableFruits = ({navigation}) => {
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        titleStyle={genericStyles.mr('18%')}
        firstIcon="arrow-back-outline"
        title="Vegetable / Fruits"
        searchIcon="search"
        bellIcon="filter"
        firstOnpress={() => navigation.goBack()}
      />
      <ScrollView style={genericStyles.mt(20)}>
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <CardsListed
          title="Name of the hostel or room"
          subTitle="Contact person"
          category="Hostel"
        />
        <View style={genericStyles.height(20)} />
      </ScrollView>
    </View>
  );
};

export default VegetableFruits;

const styles = StyleSheet.create({});
