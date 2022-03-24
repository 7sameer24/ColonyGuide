import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles, Images} from '../constants';

const CardsListed = ({category, title, subTitle}) => {
  return (
    <Card containerStyle={styles.CardContainer}>
      <View style={genericStyles.row}>
        <Image source={Images.Profile} style={styles.ImageStyle} />
        <View style={styles.View}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <View style={styles.View2}>
            <Text style={styles.subTitle}>{category}</Text>
            <View style={styles.View3}>
              <Icon
                name="phone-outgoing"
                type="material-community"
                color="#407BFF"
                size={17}
                containerStyle={genericStyles.mr(20)}
              />
              <Icon
                name="whatsapp"
                type="material-community"
                size={17}
                color="#25D366"
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
    marginLeft: '45%',
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    width: '80%',
  },
  subTitle: {
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: '#7D7D7D',
  },
});
