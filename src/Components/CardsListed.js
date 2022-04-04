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

const CardsListed = ({
  category,
  title,
  subTitle,
  source,
  index,
  phoneNumber,
  WhatsAppNumber,
}) => {
  const alternatingColor = [COLORS.white, COLORS.primary];
  const alternatingTextColor = [COLORS.textColor, COLORS.white];

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

  return (
    <Card
      containerStyle={[
        styles.CardContainer,
        {backgroundColor: alternatingColor[index % alternatingColor.length]},
      ]}>
      <View style={genericStyles.row}>
        <Image source={source} style={styles.ImageStyle} fadeDuration={0} />
        <View style={styles.View}>
          <Text
            style={[
              styles.title,
              {
                color:
                  alternatingTextColor[index % alternatingTextColor.length],
              },
            ]}
            numberOfLines={1}>
            {title}
          </Text>
          <Text
            style={[
              styles.subTitle,
              {
                color:
                  alternatingTextColor[index % alternatingTextColor.length],
              },
            ]}>
            {subTitle}
          </Text>
          <View style={styles.View2}>
            <Text
              style={[
                styles.subTitle,
                {
                  color:
                    alternatingTextColor[index % alternatingTextColor.length],
                },
              ]}>
              {category}
            </Text>
            <View style={styles.View3}>
              <Icon
                name="phone-outgoing"
                type="material-community"
                color="#407BFF"
                size={17}
                onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
                containerStyle={genericStyles.mr(20)}
              />
              <Icon
                name="whatsapp"
                type="material-community"
                size={17}
                color="#25D366"
                onPress={() => sendWhatsApp()}
                containerStyle={genericStyles.mr(20)}
              />
              <Icon
                name="map-marker-radius"
                type="material-community"
                size={17}
                color={COLORS.textColor}
              />
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
    borderWidth: 0,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  ImageStyle: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  View: {
    flexDirection: 'column',
    marginLeft: 11,
  },
  View2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
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
});
