import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';
import {Card} from 'react-native-elements';
import First from '../../assets/svg/Building.svg';
import Second from '../../assets/svg/Vector-1.svg';
import Third from '../../assets/svg/Vector-2.svg';
import Four from '../../assets/svg/Vector-3.svg';

const FourList = ({navigation}) => {
  const arr = [
    {
      image: <First width={38} height={32} />,
      Id: 1,
      navigation: 'RoomsFlats',
    },
    {
      image: <Third width={38} height={32} />,
      Id: 2,
      navigation: 'House Owners',
    },
    {
      image: <Four width={32} height={30} />,
      Id: 3,
      navigation: 'Business listed',
    },
    {
      image: <Second width={38} height={32} />,
      Id: 4,
      navigation: 'Business listed',
    },
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
            {data.image}
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
    marginVertical: 20,
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
