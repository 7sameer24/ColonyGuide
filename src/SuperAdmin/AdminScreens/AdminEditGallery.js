import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import EditGComponent from '../DashComponents/EditGComponent';
import CustomView from '../DashComponents/CustomView';

const AdminEditGallery = () => {
  return (
    <View style={genericStyles.container}>
      <CustomView text="Images" />
      <ScrollView contentContainerStyle={genericStyles.fill}>
        <View style={styles.Container}>
          <EditGComponent />
          <EditGComponent />
          <EditGComponent />
          <EditGComponent />
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminEditGallery;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
