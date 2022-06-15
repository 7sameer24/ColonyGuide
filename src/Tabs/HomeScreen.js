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
import CategoriesList from './Categories/CategoriesList';
import HeaderBar from '../Components/HeaderBar';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import {useApp} from '../../Context/AppContext';
import ImageViewer from 'react-native-image-zoom-viewer';
import BaseURL from '../constants/BaseURL';
import {Icon} from 'react-native-elements';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import ButtonComponent from '../Components/ButtonComponent';
import LoginAnimation from '../Components/LoginAnimation';

const HomeScreen = ({navigation}) => {
  const [newData, setData] = useState([]);
  const [SliderImage, setSliderImg] = useState([]);
  const [visible, setIsvisible] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const [checkVersion, setVersion] = useState([]);

  const {
    Userdata,
    setNotificationToken,
    notificationToken,
    UserToken,
    loginPop,
    setIsLoginPop,
  } = useApp();

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('home'));
      const versionRes = await axios.post(
        'https://colonyguide.garimaartgallery.com/api/app-version',
      );
      Userdata === null
        ? null
        : await axios(BaseURL('update-device-token'), {
            method: 'post',
            data: {
              user_id: Userdata.userData.id,
              device_token: notificationToken,
            },
            headers: {
              Authorization: `Bearer ${UserToken}`,
            },
          });
      setVersion(versionRes.data);
      setData(response.data.categories);
      setSliderImg(response.data.banners);
    } catch (error) {
      console.log(error);
    }
  };

  const checkPermission = () => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          getToken();
        } else {
          requestPermission();
        }
      })
      .catch(error => {
        console.log('error checking permisions ' + error);
      });
  };

  //2
  const requestPermission = () => {
    messaging()
      .requestPermission()
      .then(() => {
        getToken();
      })
      .catch(error => {
        console.log('permission rejected ' + error);
      });
  };

  //3
  const getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        setNotificationToken(token);
      })
      .catch(error => {
        console.log('error getting push token ' + error);
      });
  };

  const PushNotificationUser = () => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('Push Notification:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('onNotification:', notification);
        navigation.navigate('Notification');

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('onAction:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  };

  const ImageZoomComponent = () => {
    return (
      <View style={styles.ImageZoomComponent}>
        <Modal
          visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsvisible(false)}>
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

  const images = SliderImage.map(data => data.banner_image);
  const ImageView = SliderImage.map(data => ({url: data.banner_image}));

  useEffect(() => {
    idx();
    PushNotificationUser();
    checkPermission();
    return () => {
      setData([]);
      setSliderImg([]);
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      <>
        {visible ? (
          <ImageZoomComponent />
        ) : (
          <>
            <StatusBar backgroundColor={COLORS.primary} />
            {newData.length > 0 ? (
              <ScrollView>
                <HeaderBar
                  bellIcon="bell"
                  thirdOnpress={() =>
                    Userdata === null
                      ? setIsLoginPop(true)
                      : navigation.navigate('Notification')
                  }
                  // searchIcon="search"
                  navigation={navigation}
                  firstIcon="menu"
                  ThirdType="material-community"
                  title="Colony Guide"
                  titleStyle={genericStyles.color(COLORS.primary)}
                  firstOnpress={() => navigation.openDrawer()}
                />
                <>
                  <SliderBox
                    images={images}
                    sliderBoxHeight={150}
                    dotColor="#fff"
                    inactiveDotColor={COLORS.transparent}
                    autoplay={true}
                    circleLoop={true}
                    imageLoadingColor={COLORS.primary}
                    ImageComponentStyle={styles.ImageComponentStyle}
                    dotStyle={styles.dotStyle}
                    autoplayInterval={3000}
                    onCurrentImagePressed={index => ImageZoom(index)}
                  />

                  <FourList navigation={navigation} />
                  <View style={genericStyles.mh(20)}>
                    <Text style={styles.topText}>Top Categories</Text>
                    <CategoriesList navigation={navigation} data={newData} />
                  </View>
                </>
                <ButtonComponent
                  title="View more"
                  ButtonContainer={styles.ButtonContainer}
                  buttonStyle={genericStyles.pv(10)}
                  onPress={() => navigation.navigate('categories')}
                />
              </ScrollView>
            ) : (
              <Spinner />
            )}
          </>
        )}
      </>
      {loginPop ? <LoginAnimation visible={loginPop} /> : null}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ImageComponentStyle: {
    width: '87%',
    marginTop: 5,
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
    marginLeft: 5,
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
  ButtonContainer: {
    width: '30%',
    alignSelf: 'center',
    marginBottom: 15,
  },
});
