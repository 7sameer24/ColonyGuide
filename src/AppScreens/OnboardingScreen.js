import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {FONTS, COLORS, genericStyles, Images} from '../constants/index';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: Images.Onboarding1,
    title: 'Look for the service',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    image: Images.Onboarding2,
    title: 'Call the service provider',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
  },
  {
    id: '3',
    image: Images.Onboarding3,
    title: 'Get direction for the same',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Slide = ({item}) => {
  return (
    <View style={[genericStyles.ai('center'), {justifyContent: 'center'}]}>
      <Image source={item?.image} style={styles.styleImage} />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
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

  const Footer = () => {
    return (
      <View style={styles.FooterCon}>
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
            <View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.GetStartText}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.skipView}>
              <TouchableOpacity activeOpacity={0.8} onPress={skip}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
              {/* <View style={{width: 15}} /> */}
              <Icon
                onPress={goToNextSlide}
                name="arrow-forward-outline"
                type="ionicon"
                color={COLORS.white}
                containerStyle={styles.iconCon}
                iconStyle={genericStyles.mt(10)}
              />
            </View>
          )}
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
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
    fontFamily: FONTS.InterRegular,
  },
  title: {
    color: '#000',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: FONTS.InterSemiBold,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 3,
    borderRadius: 2,
  },
  styleImage: {
    height: '45%',
    width,
    resizeMode: 'contain',
  },
  FooterCon: {
    height: height * 0.25,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
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
  },
  skipText: {
    fontSize: 16,
    color: '#C2C2C2',
    marginTop: 20,
    fontFamily: FONTS.InterRegular,
  },
  iconCon: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default OnboardingScreen;
