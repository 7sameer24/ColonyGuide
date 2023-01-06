import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CardsListed from '../../Components/CardsListed';
import {genericStyles} from '../../constants';

const SearchBusResult = ({route, navigation}) => {
  return (
    <View style={genericStyles.container}>
      <TouchableOpacity
        key={route.params.userData.id}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('Business Information', {
            ID: route.params.userData.id,
          })
        }>
        <CardsListed
          source={
            route.params.userData.logo_image ===
            'https://admin.colonyguide.com/storage'
              ? require('../../../assets/Image_not_available.png')
              : {uri: route.params.userData.logo_image}
          }
          title={route.params.userData.name}
          subTitle={route.params.userData.contact_person}
          phoneNumber={route.params.userData.contact_person_mobile}
          WhatsAppNumber={route.params.userData.contact_person_whatsapp}
          category={route.params.userData.about}
          userId={route.params.userData.user_id}
          businessId={route.params.userData.id}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBusResult;

const styles = StyleSheet.create({});
