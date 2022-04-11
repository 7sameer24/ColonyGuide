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
import {Icon} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
  const [newData, setData] = useState([]);
  const [SliderImage, setSliderImg] = useState([]);
  const [visible, setIsvisible] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const {Userdata, checkVersion} = useApp();

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
  const ImageView = SliderImage.map(data => ({url: data.banner_image}));

  const ImageZoomComponent = () => {
    return (
      <View style={styles.ImageZoomComponent}>
        <Modal visible={visible} transparent={true} animationType="slide">
          <Icon
            name="close-outline"
            type="ionicon"
            color={COLORS.white}
            size={30}
            onPress={() => setIsvisible(false)}
            containerStyle={styles.iconContainer}
          />
          <ImageViewer
            imageUrls={ImageView}
            enableSwipeDown={true}
            index={imageIndex}
            onSwipeDown={() => setIsvisible(false)}
            useNativeDriver={true}
          />
        </Modal>
      </View>
    );
  };

  const ImageZoom = index => {
    setimageIndex(index);
    setIsvisible(true);
  };

  return (
    <View style={genericStyles.Container}>
      <>
        {visible ? (
          <ImageZoomComponent />
        ) : (
          <>
            <StatusBar backgroundColor={COLORS.primary} />
            {newData.length > 0 ? (
              checkVersion.AppVersion.android_v !== '1' ? (
                alert('ss')
              ) : checkVersion.appSetting.app_status !== 1 ? (
                alert('Maintanndc')
              ) : (
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
                      onCurrentImagePressed={index => ImageZoom(index)}
                    />

                    <FourList navigation={navigation} />
                    <View style={genericStyles.mh(20)}>
                      <Text style={styles.topText}>Top Categories</Text>
                      <CategoriesList navigation={navigation} data={newData} />
                    </View>
                  </>
                </ScrollView>
              )
            ) : (
              <Spinner />
            )}
          </>
        )}
      </>
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
  ImageZoomComponent: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  iconContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 20,
  },
});
