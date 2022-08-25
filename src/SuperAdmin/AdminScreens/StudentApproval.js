import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {genericStyles} from '../../constants';
import GalleryCard from '../DashComponents/GalleryCard';

const StudentApproval = () => {
  return (
    <View style={genericStyles.Container}>
      <ScrollView>
        <View style={genericStyles.mt(10)}>
          <GalleryCard
            isEnabled={true}
            switchButton={true}
            iconName="checkmark"
            iconType="ionicon"
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

export default StudentApproval;

const styles = StyleSheet.create({});
