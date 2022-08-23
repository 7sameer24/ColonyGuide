import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, genericStyles} from '../../constants';
import DropDownComponent from '../../Components/DropDownComponent';
import GalleryCard from '../DashComponents/GalleryCard';
import ButtonComponent from '../../Components/ButtonComponent';

const AdminGallery = ({navigation}) => {
  const [data, updateData] = useState([]);
  return (
    <View style={genericStyles.container}>
      <DropDownComponent
        data={data}
        labelField="name"
        valueField="id"
        // placeholder="Select caste"
        // value={caste}
        maxHeight={150}
        dropdownStyle={styles.dropdownStyle}
      />
      <ScrollView>
        <GalleryCard onEdit={() => navigation.navigate('Edit gallery')} />
      </ScrollView>
      <ButtonComponent
        title="Add"
        onPress={() => navigation.navigate('Add gallery')}
        ButtonContainer={genericStyles.width('90%')}
      />
      <View style={genericStyles.height(20)} />
    </View>
  );
};

export default AdminGallery;

const styles = StyleSheet.create({
  dropdownStyle: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 16,
    marginHorizontal: 20,
  },
});
