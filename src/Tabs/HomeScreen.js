import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import {SliderBox} from 'react-native-image-slider-box';
import FourList from '../Components/FourList';
import CategoriesList from './CategoriesList';
import HeaderBar from '../Components/HeaderBar';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import {useApp} from '../../Context/AppContext';
import ImageViewer from 'react-native-image-zoom-viewer';
import BaseURL from '../constants/BaseURL';

const HomeScreen = ({navigation}) => {
  const [newData, setData] = useState([]);
  const [SliderImage, setSliderImg] = useState([]);
  const {Userdata, checkVersion} = useApp();
  console.log(checkVersion);

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('home'));
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

  const imagess = [
    {
      // Simplest usage.
      url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

      // width: number
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      },
    },
  ];

  const ImageZoom = index => {
    return (
      <Modal visible={true} transparent={true}>
        <ImageViewer imageUrls={imagess} index={index} />
      </Modal>
    );
  };

  return (
    <View style={genericStyles.Container}>
      {checkVersion.android_v !== '1' ? (
        alert('s')
      ) : (
        <>
          <StatusBar backgroundColor={COLORS.primary} />
          <>
            {newData.length > 0 ? (
              <ScrollView>
                <HeaderBar
                  bellIcon="bell"
                  thirdOnpress={() =>
                    Userdata === null
                      ? alert('Please Login')
                      : navigation.navigate('Notification')
                  }
                  // searchIcon="search"
                  navigation={navigation}
                  firstIcon="menu"
                  ThirdType="material-community"
                  firstOnpress={() => navigation.openDrawer()}
                />
                <>
                  <SliderBox
                    images={images}
                    sliderBoxHeight={150}
                    dotColor="#fff"
                    inactiveDotColor={COLORS.transparent}
                    autoplay
                    circleLoop
                    imageLoadingColor={COLORS.primary}
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
          </>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ImageComponentStyle: {
    width: '87%',
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
