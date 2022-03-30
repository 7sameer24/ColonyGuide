import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';
import {Card} from 'react-native-elements';
import First from '../../assets/svg/BuildingColor.svg';
import {useIslogin} from '../../Context/LoginContext';

const CategoriesList = ({cardContainer, ViewContainer, navigation, data}) => {
  const {Userdata} = useIslogin();
  const {width, height} = useWindowDimensions();

  return (
    <View style={[styles.container, {...ViewContainer}]}>
      {data.map((data, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.9}
          onPress={() =>
            Userdata === null
              ? null
              : navigation.navigate('Vegetable Fruits', {
                  ID: data.id,
                  Name: data.name,
                })
          }>
          <Card
            containerStyle={[
              styles.containerStyle(width, height),
              {...cardContainer},
            ]}>
            {<First width={38} height={32} />}
          </Card>
          <Text style={styles.text} key={data.Id}>
            {data.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  containerStyle: (width, height) => ({
    width: width / 6.3,
    height: height / 13,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 15,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    elevation: 3,
  }),
  text: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: COLORS.textColor,
    marginTop: 5,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
});
