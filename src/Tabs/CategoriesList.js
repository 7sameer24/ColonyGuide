import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, Images} from '../constants';
import {Card} from 'react-native-elements';

const CategoriesList = ({cardContainer, ViewContainer, navigation}) => {
  const arr = [
    {
      image: Images.ListColor,
      Id: 1,
      text: 'Rooms / Flats',
      OnpressText: 'RoomsFlats',
    },
    {image: Images.Milk, Id: 2, text: 'Milk man', OnpressText: 'RoomsFlats'},
    {
      image: Images.Fruits,
      Id: 3,
      text: 'Vegetable\n& fruits',
      OnpressText: 'Vegetable Fruits',
    },
    {image: Images.ListColor, Id: 4, text: 'Rooms / Flats'},
    {image: Images.Milk, Id: 5, text: 'Milk man', OnpressText: 'RoomsFlats'},
    {
      image: Images.Fruits,
      Id: 6,
      text: 'Vegetable\n& fruits',
    },
    {image: Images.ListColor, Id: 7, text: 'Rooms / Flats'},
    {image: Images.Milk, Id: 8, text: 'Milk man', OnpressText: 'RoomsFlats'},
    {
      image: Images.Fruits,
      Id: 9,
      text: 'Vegetable\n& fruits',
    },
    {image: Images.ListColor, Id: 10, text: 'Rooms / Flats'},
    {image: Images.Milk, Id: 11, text: 'Milk man', OnpressText: 'RoomsFlats'},
    {
      image: Images.Fruits,
      Id: 12,
      text: 'Vegetable\n& fruits',
    },
    {image: Images.ListColor, Id: 13, text: 'Rooms / Flats'},
    {image: Images.Milk, Id: 14, text: 'Milk man', OnpressText: 'RoomsFlats'},
    {
      image: Images.Fruits,
      Id: 15,
      text: 'Vegetable\n& fruits',
    },
    {image: Images.ListColor, Id: 16, text: 'Rooms / Flats'},
    {image: Images.Milk, Id: 17, text: 'Milk man', OnpressText: 'RoomsFlats'},
    {
      image: Images.Fruits,
      Id: 18,
      text: 'Vegetable\n& fruits',
    },
  ];
  const {width, height} = useWindowDimensions();

  return (
    <View>
      <View style={[styles.container, {...ViewContainer}]}>
        {arr.map(data => (
          <TouchableOpacity
            key={data.Id}
            activeOpacity={0.9}
            onPress={() => navigation.navigate(data.OnpressText)}>
            <Card
              containerStyle={[
                styles.containerStyle(width, height),
                {...cardContainer},
              ]}>
              <Image
                source={data.image}
                key={data.Id}
                style={{width: 42, height: 37}}
                resizeMode="contain"
              />
            </Card>
            <Text style={styles.text} key={data.Id}>
              {data.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
