import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import FourList from '../Components/FourList';
import CategoriesList from './Categories/CategoriesList';
import HeaderBar from '../Components/HeaderBar';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import {navigationStateType, useApp} from '../../Context/AppContext';
import BaseURL from '../constants/BaseURL';
import {Image} from 'react-native-elements';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import ButtonComponent from '../Components/ButtonComponent';
import LoginAnimation from '../Components/LoginAnimation';
import EmptyView from '../Components/EmptyView';
import ImageZoomComponent from '../Components/ImageZoomComponent';
import Swiper from 'react-native-swiper';
import Toast from '../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import {
  notificationListner,
  requestUserPermission,
} from '../Notification/NotificationServices';

const WIDTH = Dimensions.get('window').width;
const HIGHT = Dimensions.get('window').height;
const HomeScreen = ({navigation}) => {
  const toast = useToast();
  const [newData, setData] = useState([]);
  const [SliderImage, setSliderImg] = useState([]);
  const [visible, setIsvisible] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const [loading, updateLoading] = useState(true);

  const {
    Userdata,
    setNotificationToken,
    notificationToken,
    UserToken,
    loginPop,
    setIsLoginPop,
    GSaveLocalID,
    updateCategories,
    updateLocalData,
    setNavigationState,
    setNewData,
    setUserToken,
  } = useApp();

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('home'), {
        locality_id: GSaveLocalID
          ? GSaveLocalID
          : Userdata.userData.locality_id,
      });
      const response2 = await axios.post(BaseURL('get-all-master'), {
        locality_id: GSaveLocalID
          ? GSaveLocalID
          : Userdata.userData.locality_id,
      });

      const checkStatus =
        Userdata &&
        (await axios.post(BaseURL('check-user-status'), {
          user_id: Userdata.userData.id,
        }));
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
      if (Userdata && checkStatus.data.success) {
        if (checkStatus.data.userData.is_block === 1) {
          setNavigationState(navigationStateType.AUTH);
          setNewData(null);
          setUserToken(null);
          Toast(
            toast,
            'Your account is blocked please contact your administrator',
            'normal',
            5000,
          );
        }
      }
      updateLoading(false);
      setData(response.data.categories);
      updateCategories(response2.data.categories);
      updateLocalData(response2.data.localities);
      setSliderImg(response.data.banners);
    } catch (error) {
      updateLoading(false);
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
        // navigation.navigate('Notification');

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

  const ImageZoom = index => {
    setimageIndex(index);
    setIsvisible(true);
  };

  const ImageView = SliderImage.map(data => ({url: data.banner_image}));

  useEffect(() => {
    idx();
    Userdata && requestUserPermission(setNotificationToken);
    Userdata && notificationListner();
    return () => {
      setData([]);
      setSliderImg([]);
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {!visible && (
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
      )}
      <>
        {visible ? (
          <ImageZoomComponent
            visible={visible}
            ImageView={ImageView}
            imageIndex={imageIndex}
            iconOnPress={() => setIsvisible(false)}
            onSwipeDown={() => setIsvisible(false)}
            onRequestClose={() => setIsvisible(false)}
          />
        ) : (
          <>
            <StatusBar backgroundColor={COLORS.primary} />
            {newData.length > 0 && (
              <ScrollView>
                <>
                  <View style={styles.slide2}>
                    <Swiper
                      automaticallyAdjustContentInsets
                      activeDotColor={COLORS.white}
                      dotColor={COLORS.transparent}
                      dotStyle={styles.dotStyle}
                      showsButtons={false}
                      autoplay={true}>
                      {SliderImage.map((data, imgIndex) => (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          key={imgIndex}
                          onPress={() => ImageZoom(imgIndex)}
                          style={styles.slide2}>
                          <Image
                            resizeMode="stretch"
                            source={{uri: data.banner_image}}
                            style={styles.wrap}
                            placeholderStyle={genericStyles.bg(COLORS.white)}
                            PlaceholderContent={
                              <ActivityIndicator color={COLORS.primary} />
                            }
                          />
                        </TouchableOpacity>
                      ))}
                    </Swiper>
                  </View>
                  <FourList navigation={navigation} />
                  <View style={genericStyles.mh(20)}>
                    <Text style={styles.topText}>Service Provider</Text>
                    <CategoriesList navigation={navigation} data={newData} />
                  </View>
                </>
                {newData.length > 9 && (
                  <ButtonComponent
                    title="View more"
                    ButtonContainer={styles.ButtonContainer}
                    buttonStyle={genericStyles.pv(10)}
                    onPress={() => navigation.navigate('categories')}
                  />
                )}
              </ScrollView>
            )}
          </>
        )}
      </>
      {loading && <Spinner />}
      {!loading && newData.length == [] && (
        <EmptyView heading="No categories found for this locality" />
      )}
      {loginPop && <LoginAnimation visible={loginPop} />}
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
  wrap: {
    width: WIDTH / 1.12,
    height: HIGHT * 0.25,
  },
  slide2: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
