import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import {SliderBox} from 'react-native-image-slider-box';
import FourList from '../Components/FourList';
import CategoriesList from './CategoriesList';
import HeaderBar from '../Components/HeaderBar';
import axios from 'axios';
import Spinner from '../Components/Spinner';

const HomeScreen = ({navigation}) => {
  const [newData, setData] = useState([]);
  const [SliderImage, setSliderImg] = useState([]);
  const idx = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/home';
      const response = await axios.post(URL);
      setData(response.data.categories);
      setSliderImg(response.data.banners);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setData([]);
      setSliderImg([]);
    };
  }, []);

  const images = SliderImage.map(data => data.banner_image);

  return (
    <View style={genericStyles.Container}>
      <StatusBar backgroundColor={COLORS.primary} />
      {newData.length > 0 ? (
        <ScrollView>
          <HeaderBar
            bellIcon="bell"
            // searchIcon="search"
            navigation={navigation}
            firstIcon="menu"
            ThirdType="material-community"
            firstOnpress={() => navigation.openDrawer()}
            // searchTouchable={() => navigation.navigate('Search')}
          />
          <>
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
              <CategoriesList navigation={navigation} data={newData} />
            </View>
          </>
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ImageComponentStyle: {
    width: '87%',
    marginTop: 10,
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
