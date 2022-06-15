import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {FONTS, COLORS, genericStyles} from '../constants/index';
import Frame from '../../assets/svg/Frame.svg';
import Frame5 from '../../assets/svg/Frame 5.svg';
import Frame6 from '../../assets/svg/Frame 6.svg';
import {navigationStateType, useApp} from '../../Context/AppContext';
import axios from 'axios';
import BaseURL from '../constants/BaseURL';

const OnboardingScreen = () => {
  const {width, height} = Dimensions.get('window');
  const {setNavigationState} = useApp();
  const [data, setData] = useState([]);

  const slides = [
    {
      id: '1',
      image: <Frame height="50%" width={width} />,
      title: data.title1,
      subtitle: data.description1,
    },
    {
      id: '2',
      image: <Frame5 height="50%" width={width} />,
      title: data.title2,
      subtitle: data.description2,
    },
    {
      id: '3',
      image: <Frame6 height="50%" width={width} />,
      title: data.title3,
      subtitle: data.description3,
    },
  ];

  const Slide = ({item}) => {
    return (
      <View>
        {currentSlideIndex == slides.length - 1 ? null : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => signIn()}
            style={{flexDirection: 'row-reverse'}}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        <View
          style={[
            genericStyles.ai('center'),
            {justifyContent: 'center', flex: 1},
          ]}>
          {item.image}
          <View>
            {item.title || item.subtitle ? (
              <>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.subtitle}>{item?.subtitle}</Text>
              </>
            ) : (
              <ActivityIndicator
                color={COLORS.primary}
                style={genericStyles.mt(20)}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(BaseURL('app-setting'));
      setData(response.data.appSetting);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
    };
  }, []);

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const signIn = () => {
    setNavigationState(navigationStateType.AUTH);
  };

  const Footer = () => {
    return (
      <View style={styles.FooterCon(height)}>
        {/* Indicator container */}
        <View style={styles.indicatorContainer}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.primary,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={genericStyles.mb(20)}>
          {currentSlideIndex == slides.length - 1 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.signinContainer}
              onPress={() => signIn()}>
              <Text style={styles.signIn}>Sign In</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{
          height: height * 0.75,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: '#888888',
    fontSize: 12,
    marginTop: 10,
    maxWidth: 250,
    textAlign: 'center',
    lineHeight: 23,
    fontFamily: FONTS.InterRegular,
    alignSelf: 'center',
  },
  title: {
    color: '#000',
    fontSize: 15,
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: FONTS.InterSemiBold,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 3,
    borderRadius: 2,
  },
  FooterCon: height => ({
    height: height * 0.25,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  }),
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 50,
  },
  GetStartText: {
    fontFamily: FONTS.InterBold,
    fontSize: 15,
    alignSelf: 'center',
    color: COLORS.primary,
  },
  skipView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  skipText: {
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 15,
    fontFamily: FONTS.InterRegular,
    marginRight: 15,
  },
  signIn: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: 'center',
    fontFamily: FONTS.InterMedium,
  },
  iconCon: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    elevation: 4,
  },
  signinContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    width: '95%',
    elevation: 4,
    alignSelf: 'center',
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default OnboardingScreen;
