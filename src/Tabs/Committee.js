import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {genericStyles} from '../constants';
import CommiteeList from '../Components/CommitteeList';
import HeaderBar from '../Components/HeaderBar';

const Committee = ({navigation}) => {
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        titleStyle={genericStyles.mr('40%')}
        firstIcon="arrow-back-outline"
        title="Committee"
        searchIcon="search"
        bellIcon="filter"
        firstOnpress={() => navigation.goBack()}
      />
      <ScrollView style={genericStyles.mt(30)}>
        <CommiteeList />
      </ScrollView>
    </View>
  );
};

export default Committee;

const styles = StyleSheet.create({});
