import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  ToastAndroid,
  Platform,
} from 'react-native';
import React from 'react';
import {Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../constants';
import BaseURL from '../constants/BaseURL';
import axios from 'axios';
import {useApp} from '../../Context/AppContext';

const CardsListed = ({
  category,
  title,
  subTitle,
  source,
  index,
  phoneNumber,
  WhatsAppNumber,
  GeoLocation,
  ShortDescription,
  userId,
  serviceId,
  businessId,
}) => {
  const alternatingColor = [COLORS.white, COLORS.primary];
  const alternatingTextColor = [COLORS.textColor, COLORS.white];
  const {Userdata} = useApp();

  const callCount = async number => {
    try {
      const response = await axios.post(BaseURL('click-count'), {
        user_id: userId,
        service_id: serviceId,
        businessId: businessId,
        type: number === 1 ? 1 : 2,
        clicked_user_id: Userdata.userData.id,
      });
      if (response.data.success) {
        number === 1 ? Linking.openURL(`tel:${phoneNumber}`) : sendWhatsApp();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const sendWhatsApp = () => {
    let msg = 'Hello';
    let phoneWithCountryCode = `91${WhatsAppNumber}`;
    let mobile =
      Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
        Linking.openURL(url)
          .then(() => {
            ToastAndroid.show('WhatsApp Opened', ToastAndroid.SHORT);
          })
          .catch(() => {
            ToastAndroid.show(
              'Make sure WhatsApp installed on your device',
              ToastAndroid.SHORT,
            );
          });
      } else {
        ToastAndroid.show('Please insert message to send', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Please insert mobile no', ToastAndroid.SHORT);
    }
  };

  // const geolocation = GeoLocation.split(',');

  return (
    <Card containerStyle={[styles.CardContainer]}>
      <View style={genericStyles.row}>
        <Image source={source} style={styles.ImageStyle} fadeDuration={0} />
        <View style={styles.View}>
          <Text style={[styles.title]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.subTitle1]} numberOfLines={1}>
            {subTitle}
          </Text>
          <View style={styles.View2}>
            <Text numberOfLines={1} style={[styles.subTitle]}>
              {category}
            </Text>
            <View style={styles.View3}>
              <Icon
                name="phone-outgoing"
                type="material-community"
                color="#407BFF"
                size={18}
                reverse
                onPress={() => callCount(1)}
                containerStyle={genericStyles.shadow}
              />
              <Icon
                name="whatsapp"
                type="material-community"
                size={18}
                color="#25D366"
                reverse
                onPress={() => sendWhatsApp()}
                containerStyle={genericStyles.shadow}
              />
              {/* <Icon
                name="map-marker-radius"
                type="material-community"
                size={17}
                onPress={() =>
                  Linking.openURL(`geo:${geolocation[0]},${geolocation[1]}`)
                }
                containerStyle={genericStyles.mr(15)}
                color={COLORS.textColor}
              /> */}
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default CardsListed;

const styles = StyleSheet.create({
  CardContainer: {
    borderWidth: 1,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderColor: COLORS.primary,
    paddingVertical: 10,
    alignItems: 'center',
    paddingBottom: 0,
  },
  ImageStyle: {
    width: 54,
    height: 54,
    borderRadius: 10,
    // alignSelf: 'center',
    marginTop: 5,
  },
  View: {
    flexDirection: 'column',
    marginLeft: 11,
  },
  View2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  View3: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    width: 250,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: '#7D7D7D',
  },
  subTitle1: {
    width: 150,
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: '#7D7D7D',
    marginBottom: -15,
  },
  readMoreText: {
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: '#7D7D7D',
    width: 120,
    marginRight: -85,
  },
});
