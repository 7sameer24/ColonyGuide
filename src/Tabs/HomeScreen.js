import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import {SliderBox} from 'react-native-image-slider-box';
import FourList from '../Components/FourList';
import CategoriesList from './CategoriesList';
import HeaderBar from '../Components/HeaderBar';

const HomeScreen = ({navigation}) => {
  const images = [Images.Slider, Images.Slider2];
  return (
    <ScrollView style={genericStyles.Container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <HeaderBar
        bellIcon="bell"
        searchIcon="search"
        navigation={navigation}
        firstIcon="menu"
        firstOnpress={() => navigation.toggleDrawer()}
        searchTouchable={() => navigation.navigate('Search')}
      />
      <SliderBox
        images={images}
        sliderBoxHeight={120}
        dotColor="#fff"
        inactiveDotColor={COLORS.transparent}
        autoplay
        circleLoop
        ImageComponentStyle={styles.ImageComponentStyle}
        dotStyle={styles.dotStyle}
      />
      <FourList navigation={navigation} />
      <View style={genericStyles.mh(20)}>
        <Text style={styles.topText}>Top Categories</Text>
        <CategoriesList navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ImageComponentStyle: {
    width: '87%',
    marginTop: 20,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 15,
    marginHorizontal: -15,
    padding: 0,
    margin: 0,
    borderColor: COLORS.white,
    borderWidth: 2,
  },
  topText: {
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginLeft: 10,
  },
});
