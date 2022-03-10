import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, Images} from '../constants';
import {Card} from 'react-native-elements';

const FourList = ({navigation}) => {
  const arr = [
    {image: Images.List1, Id: 1, navigation: 'Business listed'},
    {image: Images.List3, Id: 2, navigation: 'House Owners'},
    {image: Images.BusinessBG, Id: 3, navigation: 'Business listed'},
    {image: Images.List2, Id: 4, navigation: 'Business listed'},
  ];
  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      {arr.map(data => (
        <TouchableOpacity
          key={data.Id}
          activeOpacity={0.9}
          onPress={() => navigation.navigate(data.navigation)}>
          <Card containerStyle={styles.containerStyle(width, height)}>
            <Image
              source={data.image}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FourList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 25,
  },
  containerStyle: (width, height) => ({
    width: width / 6.1,
    height: height / 12.5,
    borderRadius: 10,
    borderWidth: 0,
    marginHorizontal: 14,
    padding: 0,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  }),
  imageStyle: {
    width: 30,
    height: 30,
  },
});
