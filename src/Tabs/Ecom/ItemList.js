import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {genericStyles} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';

const ItemList = ({navigation}) => {
  return (
    <View style={genericStyles.Container}>
      <Text>ItemList</Text>
      <ButtonComponent
        title="Add Product"
        ButtonContainer={genericStyles.width('90%')}
        onPress={() => navigation.navigate('Add Product')}
      />
      <Poweredby container={{flex: 0}} />
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({});
