import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {genericStyles} from '../../constants';
import HeaderBar from '../../Components/HeaderBar';
import CardsListed from '../../Components/CardsListed';

const BusinessListed = ({navigation}) => {
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        titleStyle={genericStyles.mr('25%')}
        firstIcon="arrow-back-outline"
        title="Business listed"
        searchIcon="search"
        bellIcon="filter"
        firstOnpress={() => navigation.goBack()}
      />
      <ScrollView style={genericStyles.mt(10)}>
        <CardsListed
          title="BUSINESS  Name"
          subTitle="Business owner name"
          category="Wholesaler"
        />
        <CardsListed
          title="BUSINESS  Name"
          subTitle="Business owner name"
          category="Wholesaler"
        />
        <CardsListed
          title="BUSINESS  Name"
          subTitle="Business owner name"
          category="Wholesaler"
        />
        <CardsListed
          title="BUSINESS  Name"
          subTitle="Business owner name"
          category="Wholesaler"
        />
        <CardsListed
          title="BUSINESS  Name"
          subTitle="Business owner name"
          category="Wholesaler"
        />
        <CardsListed
          title="BUSINESS  Name"
          subTitle="Business owner name"
          category="Wholesaler"
        />
        <CardsListed
          title="BUSINESS  Name"
          subTitle="Business owner name"
          category="Wholesaler"
        />
        <CardsListed
          title="BUSINESS  Name"
          subTitle="Business owner name"
          category="Wholesaler"
        />
        <View style={genericStyles.height(20)} />
      </ScrollView>
    </View>
  );
};

export default BusinessListed;

const styles = StyleSheet.create({});
