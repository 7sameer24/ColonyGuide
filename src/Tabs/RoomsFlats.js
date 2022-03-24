import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {genericStyles} from '../constants';
import CardsListed from '../Components/CardsListed';
import ButtonComponent from '../Components/ButtonComponent';

const RoomsFlats = ({navigation}) => {
  return (
    <View style={genericStyles.Container}>
      <ScrollView style={genericStyles.mt(5)}>
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
        <View style={genericStyles.height(80)} />
      </ScrollView>
      <ButtonComponent
        title="Add room"
        ButtonContainer={styles.ButtonContainer}
        onPress={() => navigation.navigate('Add room')}
      />
    </View>
  );
};

export default RoomsFlats;

const styles = StyleSheet.create({
  ButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '90.7%',
  },
});
