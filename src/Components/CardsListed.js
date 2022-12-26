import {
  StyleSheet,
  Text,
  View,
  Linking,
  Platform,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Card, Icon, Image} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../constants';
import BaseURL from '../constants/BaseURL';
import axios from 'axios';
import {useApp} from '../../Context/AppContext';
import SpinnerModal from './SpinnerModal';
import Toast from './Toast';
import {useToast} from 'react-native-toast-notifications';

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
  googleNavigate,
  onProfileShow,
}) => {
  const toast = useToast();
  const alternatingColor = [COLORS.white, COLORS.primary];
  const alternatingTextColor = [COLORS.textColor, COLORS.white];
  const {width} = useWindowDimensions();
  const {Userdata, setIsLoginPop, adminData} = useApp();
  const [loading, updateLoading] = useState(false);

  const callCount = async number => {
    try {
      updateLoading(true);
      const response = await axios.post(BaseURL('click-count'), {
        user_id: userId,
        service_id: serviceId,
        businessId: businessId,
        type: number === 1 ? 1 : 2,
        clicked_user_id: adminData?.userData?.id ?? Userdata.userData.id,
      });
      updateLoading(false);
      if (response.data.success) {
        number === 1 ? Linking.openURL(`tel:${phoneNumber}`) : sendWhatsApp();
      } else {
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
          Toast(toast, 'WhatsApp Opened');
        })
        .catch(() => {
          Toast(toast, 'Make sure WhatsApp installed on your device');
        });
    } else {
      Toast(toast, 'Please insert mobile no');
    }
  };

  // const geolocation = GeoLocation.split(',');

  return (
    <View>
      <Card containerStyle={[styles.CardContainer]}>
        <View style={styles.mainContainer}>
          <View style={[genericStyles.row, {alignItems: 'center'}]}>
            <Image
              source={source}
              onPress={onProfileShow}
              style={styles.ImageStyle}
              fadeDuration={0}
              placeholderStyle={genericStyles.bg(COLORS.white)}
              PlaceholderContent={<ActivityIndicator color={COLORS.primary} />}
            />
            <View style={{width: width / 3}}>
              <Text style={[styles.title]} numberOfLines={1}>
                {title}
              </Text>
              <Text style={[styles.subTitle1]}>{subTitle}</Text>
              {category && <Text style={[styles.subTitle]}>{category}</Text>}
            </View>
          </View>
          <View style={styles.View3}>
            <Icon
              name="phone-outgoing"
              type="material-community"
              color="#407BFF"
              size={14}
              reverse
              onPress={() => {
                if (adminData !== null) {
                  callCount(1);
                } else if (Userdata !== null) {
                  callCount(1);
                } else {
                  setIsLoginPop(true);
                }
              }}
              containerStyle={genericStyles.shadow}
            />
            <Icon
              name="whatsapp"
              type="material-community"
              size={14}
              color="#25D366"
              reverse
              onPress={() => {
                if (adminData !== null) {
                  callCount(2);
                } else if (Userdata !== null) {
                  callCount(2);
                } else {
                  setIsLoginPop(true);
                }
              }}
              containerStyle={genericStyles.shadow}
            />
            <Icon
              name="navigate"
              type="ionicon"
              size={14}
              color={COLORS.primary}
              reverse
              onPress={() => {
                if (adminData !== null) {
                  if (Platform.OS === 'ios') {
                    Linking.openURL(
                      `http://maps.apple.com/maps?daddr=${googleNavigate}`,
                    );
                  } else {
                    Linking.openURL(`google.navigation:q=${googleNavigate}`);
                  }
                } else if (Userdata !== null) {
                  if (Platform.OS === 'ios') {
                    Linking.openURL(
                      `http://maps.apple.com/maps?daddr=${googleNavigate}`,
                    );
                  } else {
                    Linking.openURL(`google.navigation:q=${googleNavigate}`);
                  }
                } else {
                  setIsLoginPop(true);
                }
              }}
              containerStyle={genericStyles.shadow}
            />
          </View>
        </View>
      </Card>
      <SpinnerModal visible={loading} />
    </View>
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
    paddingVertical: 13,
  },
  ImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 11,
    // marginLeft: 35,
  },
  View3: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 25,
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
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
