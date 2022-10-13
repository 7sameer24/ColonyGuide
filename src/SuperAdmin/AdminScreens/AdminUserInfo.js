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
import ImageZoomComponent from '../../Components/ImageZoomComponent';
import HeaderBar from '../../Components/HeaderBar';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';

const AdminUserInfo = ({route, navigation}) => {
  const toast = useToast();
  const {
    name,
    image,
    contact_person,
    mobileNumber,
    whatsappNumber,
    about,
    houseNumber,
    address,
    landmark,
    categoryName,
  } = route.params;
  const [visible, setIsvisible] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Colony Guide Sharing This ${
          contact_person === null ? '' : contact_person
        } ${name === null ? '' : name} ${
          houseNumber === null ? '' : houseNumber
        } ${address === null ? '' : address} ${
          landmark === null ? '' : landmark
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
    let phoneWithCountryCode = `91${whatsappNumber}`;
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

  const ImageView = [{url: image}];

  const images = [
    {
      props: {
        // Or you can set source directory.
        source: Images.Ellipse,
      },
    },
  ];

  const start = mobileNumber && mobileNumber.slice(0, 2);
  const end = mobileNumber && mobileNumber.slice(8, 10);
  const start2 = whatsappNumber && whatsappNumber.slice(0, 2);
  const end2 = whatsappNumber && whatsappNumber.slice(8, 10);

  return (
    <View style={genericStyles.Container}>
      {visible ? (
        <ImageZoomComponent
          visible={visible}
          ImageView={
            image === 'https://colonyguide.com/portal/storage'
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
            title="User Information"
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
                  image == 'https://colonyguide.com/portal/storage'
                    ? Images.Ellipse
                    : {uri: image}
                }
                style={styles.ImageStyle}
                fadeDuration={0}
              />
            </TouchableOpacity>
          </View>
          {contact_person && <Text style={styles.title}>{contact_person}</Text>}
          <Text style={styles.subTitle}>{name}</Text>
          <View style={styles.DetailsContanier(whatsappNumber, categoryName)}>
            <View style={genericStyles.column}>
              <TouchableOpacity
                style={styles.firstView}
                onPress={() => Linking.openURL(`tel:${mobileNumber}`)}>
                <Icon
                  name="phone-outgoing"
                  type="material-community"
                  color="#407BFF"
                  size={20}
                />
                <Text style={styles.text}>+91-{`${start}xxxxxx${end}`} </Text>
              </TouchableOpacity>
              {categoryName && (
                <View style={genericStyles.row}>
                  <Icon
                    name="store"
                    type="material-community"
                    size={20}
                    color="#A484FF"
                  />
                  <Text style={styles.text}>{categoryName}</Text>
                </View>
              )}
            </View>
            <View>
              {whatsappNumber ? (
                <TouchableOpacity onPress={() => sendWhatsApp()}>
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
              ) : (
                <View style={styles.firstView}>
                  <Icon
                    name="whatsapp"
                    type="material-community"
                    size={20}
                    color="#25D366"
                  />
                  <Text style={styles.text}>No number</Text>
                </View>
              )}
              <TouchableOpacity
                style={genericStyles.row}
                onPress={() => onShare()}>
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
            {about && (
              <>
                <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
                  About
                </Text>
                <Text style={styles.SubText}>{about}</Text>
              </>
            )}
            <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
              Address
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Linking.openURL(
                    `http://maps.apple.com/maps?daddr=${houseNumber}+${address}, Udaipur, Rajasthan`,
                  );
                } else {
                  Linking.openURL(
                    `google.navigation:q=${houseNumber}+${address}, Udaipur, Rajasthan`,
                  );
                }
              }}>
              <Text style={styles.VisitTitle}>
                {`${houseNumber ? houseNumber : ''} ${address} ${
                  landmark == null ? '' : landmark
                }`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}></View>
        </>
      )}
    </View>
  );
};

export default AdminUserInfo;

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
  DetailsContanier: (n, c) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: n && c ? 40 : 40,
  }),
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
