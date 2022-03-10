import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, Images} from '../constants';

const CommiteeList = ({cardContainer, ViewContainer}) => {
  const arr = [
    {image: Images.Profile, Id: 1, text: 'Owner Name'},
    {image: Images.Profile, Id: 2, text: 'Owner Name'},
    {
      image: Images.Profile,
      Id: 3,
      text: 'Owner Name',
    },
    {image: Images.Profile, Id: 4, text: 'Owner Name'},
    {image: Images.Profile, Id: 5, text: 'Owner Name'},
    {
      image: Images.Profile,
      Id: 6,
      text: 'Owner Name',
    },
    {image: Images.Profile, Id: 7, text: 'Owner Name'},
    {image: Images.Profile, Id: 8, text: 'Owner Name'},
    {
      image: Images.Profile,
      Id: 9,
      text: 'Owner Name',
    },
    {image: Images.Profile, Id: 10, text: 'Owner Name'},
    {image: Images.Profile, Id: 11, text: 'Owner Name'},
    {
      image: Images.Profile,
      Id: 12,
      text: 'Owner Name',
    },
    {image: Images.Profile, Id: 13, text: 'Owner Name'},
    {image: Images.Profile, Id: 14, text: 'Owner Name'},
    {
      image: Images.Profile,
      Id: 15,
      text: 'Owner Name',
    },
    {image: Images.Profile, Id: 16, text: 'Owner Name'},
    {image: Images.Profile, Id: 17, text: 'Owner Name'},
    {
      image: Images.Profile,
      Id: 18,
      text: 'Owner Name',
    },
  ];
  const {width, height} = useWindowDimensions();

  return (
    <View>
      <View
        style={{flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center'}}>
        {arr.map(data => (
          <View key={data.Id}>
            <Image
              resizeMode="contain"
              source={data.image}
              style={{
                width: width / 5.6,
                height: height / 12,
                marginHorizontal: 30,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                marginBottom: 15,
                fontFamily: FONTS.InterSemiBold,
                color: COLORS.textColor,
                fontSize: 14,
              }}>
              {data.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CommiteeList;

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
