import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {genericStyles} from '../../constants';
import GalleryCard from '../DashComponents/GalleryCard';

const UnblockScreen = () => {
  return (
    <View style={genericStyles.Container}>
      <ScrollView>
        <View style={genericStyles.mt(10)}>
          <GalleryCard
            IconColorChange={true}
            iconName2="cancel"
            iconType2="material-community"
            twoMore={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UnblockScreen;

const styles = StyleSheet.create({});
