import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  ToastAndroid,
  Platform,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../constants';
import BaseURL from '../constants/BaseURL';
import axios from 'axios';
import {useApp} from '../../Context/AppContext';
import SpinnerModal from './SpinnerModal';

const RoomsCard = ({
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
  is_veg,
  renter_type,
  ID,
  googleNavigate,
}) => {
  const alternatingColor = [COLORS.white, COLORS.primary];
  const alternatingTextColor = [COLORS.textColor, COLORS.white];
  const {width} = useWindowDimensions();
  const {Userdata, setIsLoginPop} = useApp();
  const [loading, updateLoading] = useState(false);

  const callCount = async number => {
    try {
      updateLoading(true);
      const response = await axios.post(BaseURL('click-count'), {
        user_id: userId,
        service_id: serviceId,
        businessId: businessId,
        type: number === 1 ? 1 : 2,
        clicked_user_id: Userdata.userData.id,
        room_id: ID,
      });
      updateLoading(false);
      if (response.data.success) {
        number === 1 ? Linking.openURL(`tel:${phoneNumber}`) : sendWhatsApp();
      } else {
        updateLoading(false);
        alert(response.data.message);
      }
    } catch (error) {
      updateLoading(false);
      alert(error);
    }
  };

  const sendWhatsApp = () => {
    let phoneWithCountryCode = `91${WhatsAppNumber}`;
    let mobile =
      Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    if (mobile) {
      let url = 'whatsapp://send?text=' + '&phone=' + mobile;
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
      ToastAndroid.show('Please insert mobile no', ToastAndroid.SHORT);
    }
  };

  // const geolocation = GeoLocation.split(',');

  return (
    <View>
      <Card containerStyle={[styles.CardContainer]}>
        <View style={[genericStyles.row, {alignItems: 'center'}]}>
          <Image source={source} style={styles.ImageStyle} fadeDuration={0} />
          <View style={genericStyles.row}>
            <View style={genericStyles.mr(10)}>
              <Text
                style={[styles.title, {width: width / 3.2}]}
                numberOfLines={1}>
                {title}
              </Text>
              <Text
                style={[styles.subTitle1, {width: width / 3.2}]}
                numberOfLines={1}>
                {subTitle}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.subTitle, {width: width / 3.2}]}>
                {is_veg}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.subTitle, {width: width / 3.2}]}>
                {renter_type}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.subTitle, {width: width / 3.2}]}>
                {category}
              </Text>
            </View>
            <View style={styles.View3}>
              <Icon
                name="phone-outgoing"
                type="material-community"
                color="#407BFF"
                size={18}
                reverse
                onPress={() =>
                  Userdata === null ? setIsLoginPop(true) : callCount(1)
                }
                containerStyle={genericStyles.shadow}
              />
              <Icon
                name="whatsapp"
                type="material-community"
                size={18}
                color="#25D366"
                reverse
                onPress={() =>
                  Userdata === null ? setIsLoginPop(true) : callCount(2)
                }
                containerStyle={genericStyles.shadow}
              />
              <Icon
                name="navigate"
                type="ionicon"
                size={16}
                color={COLORS.primary}
                reverse
                onPress={() =>
                  Userdata === null
                    ? setIsLoginPop(true)
                    : Linking.openURL(`google.navigation:q=${googleNavigate}`)
                }
                containerStyle={genericStyles.shadow}
              />
            </View>
          </View>
        </View>
      </Card>
      <SpinnerModal visible={loading} />
    </View>
  );
};

export default RoomsCard;

const styles = StyleSheet.create({
  CardContainer: {
    borderWidth: 1,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderColor: COLORS.primary,
    paddingVertical: 13,
  },
  ImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 11,
  },

  View3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: '#7D7D7D',
  },
  subTitle1: {
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: '#7D7D7D',
  },
});
