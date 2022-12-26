import {
  Image,
  Linking,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import BaseURL from '../../constants/BaseURL';
import {useApp} from '../../../Context/AppContext';
import SpinnerModal from '../../Components/SpinnerModal';
import ImageZoomComponent from '../../Components/ImageZoomComponent';
import HeaderBar from '../../Components/HeaderBar';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';

const BusinessInformation = ({route, navigation}) => {
  const toast = useToast();

  const {ID, busInfoData} = route.params;
  const [loading, updateLoading] = useState(false);
  const [visible, setIsvisible] = useState(false);

  const {Userdata, setIsLoginPop, adminData} = useApp();

  const callCount = async number => {
    try {
      updateLoading(true);
      const response = await axios.post(BaseURL('click-count'), {
        user_id: busInfoData.user_id,
        service_id: ID,
        type: number === 1 ? 1 : 2,
        clicked_user_id: adminData?.userData?.id ?? Userdata.userData.id,
      });
      updateLoading(false);
      if (response.data.success) {
        number === 1
          ? Linking.openURL(`tel:${busInfoData.contact_person_mobile}`)
          : sendWhatsApp();
      } else {
        updateLoading(false);
        alert(response.data.message);
      }
    } catch (error) {
      updateLoading(false);
      alert(error);
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Colony Guide Sharing This ${
          busInfoData.contact_person === null ? '' : busInfoData.contact_person
        } ${busInfoData.name === null ? '' : busInfoData.name} ${
          busInfoData.house_no === null ? '' : busInfoData.house_no
        } ${busInfoData.address === null ? '' : busInfoData.address} ${
          busInfoData.landmark === null ? '' : busInfoData.landmark
        }`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const sendWhatsApp = () => {
    let phoneWithCountryCode = `91${busInfoData.contact_person_whatsapp}`;
    let mobile =
      Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    if (mobile) {
      let url = 'whatsapp://send?text=' + '&phone=' + mobile;
      Linking.openURL(url)
        .then(() => {
          Toast(toast, 'WhatsApp Opened');
        })
        .catch(() => {
          Toast(toast, 'Make sure WhatsApp installed on your device');
        });
    } else {
      Toast(toast, 'Please insert mobile no');
    }
  };

  const ImageView = [{url: busInfoData.logo_image}];

  const images = [
    {
      props: {
        // Or you can set source directory.
        source: Images.Ellipse,
      },
    },
  ];

  const start = busInfoData && busInfoData.contact_person_mobile.slice(0, 2);
  const end = busInfoData && busInfoData.contact_person_mobile.slice(8, 10);
  const start2 = busInfoData && busInfoData.contact_person_whatsapp.slice(0, 2);
  const end2 = busInfoData && busInfoData.contact_person_whatsapp.slice(8, 10);

  return (
    <View style={genericStyles.Container}>
      {visible ? (
        <ImageZoomComponent
          visible={visible}
          ImageView={
            busInfoData.logo_image === 'https://colonyguide.com/portal/storage'
              ? images
              : ImageView
          }
          imageIndex={0}
          iconOnPress={() => setIsvisible(false)}
          onSwipeDown={() => setIsvisible(false)}
          onRequestClose={() => setIsvisible(false)}
        />
      ) : (
        <>
          <HeaderBar
            IconColor={COLORS.white}
            bgContainer={genericStyles.bg(COLORS.primary)}
            firstIcon="arrow-back-outline"
            title="Business Information"
            iconColorChange={true}
            titleStyle={genericStyles.color(COLORS.white)}
            firstOnpress={() => navigation.goBack()}
          />
          <View style={styles.radiusView}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsvisible(true)}>
              <Image
                source={
                  busInfoData.logo_image ===
                  'https://colonyguide.com/portal/storage'
                    ? Images.Ellipse
                    : {uri: busInfoData.logo_image}
                }
                style={styles.ImageStyle}
                fadeDuration={0}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{busInfoData.contact_person}</Text>
          <Text style={styles.subTitle}>{busInfoData.name}</Text>
          <View style={styles.DetailsContanier}>
            <View style={genericStyles.column}>
              <TouchableOpacity
                style={styles.firstView}
                onPress={() => {
                  if (adminData !== null) {
                    callCount(1);
                  } else if (Userdata !== null) {
                    callCount(1);
                  } else {
                    setIsLoginPop(true);
                  }
                }}>
                <Icon
                  name="phone-outgoing"
                  type="material-community"
                  color="#407BFF"
                  size={20}
                />
                <Text style={styles.text}>+91-{`${start}xxxxxx${end}`} </Text>
              </TouchableOpacity>
              <View style={genericStyles.row}>
                <Icon
                  name="store"
                  type="material-community"
                  size={20}
                  color="#A484FF"
                />
                <Text style={styles.text}>{busInfoData.categoryName}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (adminData !== null) {
                    callCount(2);
                  } else if (Userdata !== null) {
                    callCount(2);
                  } else {
                    setIsLoginPop(true);
                  }
                }}>
                <View style={styles.firstView}>
                  <Icon
                    name="whatsapp"
                    type="material-community"
                    size={20}
                    color="#25D366"
                  />
                  <Text style={styles.text}>
                    +91-{`${start2}xxxxxx${end2}`}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={genericStyles.row}
                onPress={() => {
                  if (adminData !== null) {
                    onShare();
                  } else if (Userdata !== null) {
                    onShare();
                  } else {
                    setIsLoginPop(true);
                  }
                }}>
                <Icon
                  name="share-social"
                  type="ionicon"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.text}>Share Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={genericStyles.ml(20)}>
            <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
              About business
            </Text>
            <Text style={styles.SubText}>{busInfoData.about}</Text>
            <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
              Business address
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Linking.openURL(
                    `http://maps.apple.com/maps?daddr=${busInfoData.house_no}+${busInfoData.address}, Udaipur, Rajasthan`,
                  );
                } else {
                  Linking.openURL(
                    `google.navigation:q=${busInfoData.house_no}+${busInfoData.address}, Udaipur, Rajasthan`,
                  );
                }
              }}>
              <Text style={styles.VisitTitle}>
                {`${busInfoData.house_no} ${busInfoData.address} ${
                  busInfoData.landmark == null ? '' : busInfoData.landmark
                }`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}></View>
        </>
      )}

      <SpinnerModal visible={loading} />
    </View>
  );
};

export default BusinessInformation;

const styles = StyleSheet.create({
  radiusView: {
    backgroundColor: COLORS.primary,
    height: '8%',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    marginBottom: 50,
  },
  ImageStyle: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 60,
    borderColor: COLORS.white,
    borderWidth: 5,
  },
  title: {
    fontSize: 16,
    color: COLORS.textColor,
    fontFamily: FONTS.InterMedium,
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.textColor,
    fontFamily: FONTS.InterRegular,
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    color: COLORS.textColor,
    fontFamily: FONTS.InterRegular,
    marginLeft: 5,
  },
  DetailsContanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  firstView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  SubText: {
    fontSize: 13,
    fontFamily: FONTS.InterRegular,
    color: '#A1A1A1',
    marginTop: 10,
    width: '90%',
    marginBottom: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  titleStyle: {
    fontFamily: FONTS.InterSemiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
  buttonStyle: {
    paddingVertical: 16,
    borderWidth: 0,
  },
  buttonView: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  VisitTitle: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: '#7E7E7E',
    textAlign: 'left',
    marginTop: 10,
    textDecorationLine: 'underline',
    lineHeight: 22,
  },
});
