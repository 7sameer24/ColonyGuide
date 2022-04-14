import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';
import {Card} from 'react-native-elements';
import First from '../../assets/svg/Building.svg';
import Second from '../../assets/svg/Vector-1.svg';
import Third from '../../assets/svg/Vector-2.svg';
import Four from '../../assets/svg/Vector-3.svg';
import {useApp} from '../../Context/AppContext';

const FourList = ({navigation}) => {
  const {Userdata} = useApp();

  const arr = [
    {
      image: <First width={30} height={30} />,
      Id: 1,
      navigation: 'Rooms/Flats',
      name: 'Rooms/PG',
    },
    {
      image: <Third width={30} height={30} />,
      Id: 2,
      navigation: 'House Owners',
      name: 'Resident',
    },
    {
      image: <Four width={40} height={40} />,
      Id: 3,
      navigation: 'Business listed',
      name: 'Business Listing',
    },
    {
      image: <Second width={30} height={30} />,
      Id: 4,
      navigation: 'Helpline',
      name: 'Helpline',
    },
  ];
  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      {arr.map(data => (
        <TouchableOpacity
          key={data.Id}
          activeOpacity={0.9}
          onPress={() =>
            Userdata !== null
              ? navigation.navigate(data.navigation)
              : alert('Please Login')
          }>
          <Card containerStyle={styles.containerStyle(width, height)}>
            {data.image}
          </Card>
          <Text style={styles.text} key={data.Id}>
            {data.name}
          </Text>
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
    height: height / 14,
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
  text: {
    textAlign: 'center',
    fontSize: 11,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginTop: 5,
    alignSelf: 'center',
  },
});
