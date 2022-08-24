import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {genericStyles} from '../../constants';
import GalleryCard from '../DashComponents/GalleryCard';

const BlockScreen = () => {
  return (
    <View style={genericStyles.Container}>
      <ScrollView>
        <View style={genericStyles.mt(10)}>
          <GalleryCard
            iconName2="cancel"
            iconType2="material-community"
            twoMore={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BlockScreen;

const styles = StyleSheet.create({});
