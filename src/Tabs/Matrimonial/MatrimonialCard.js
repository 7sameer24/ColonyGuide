import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Image, Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../../constants';

const MatrimonialCard = ({category, title, subTitle, source, phoneNumber}) => {
  const {width} = useWindowDimensions();

  return (
    <View>
      <Card containerStyle={[styles.CardContainer]}>
        <View
          style={[
            genericStyles.row,
            {alignItems: 'center', justifyContent: 'space-between'},
          ]}>
          <View style={[genericStyles.row, {alignItems: 'center'}]}>
            <Image
              source={source}
              style={styles.ImageStyle}
              fadeDuration={0}
              placeholderStyle={genericStyles.bg(COLORS.white)}
              PlaceholderContent={<ActivityIndicator color={COLORS.primary} />}
            />
            <View style={genericStyles.row}>
              <View style={{width: width / 2.4}}>
                <Text style={[styles.title]} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={[styles.subTitle1]} numberOfLines={1}>
                  {subTitle}
                </Text>
                <Text numberOfLines={1} style={[styles.subTitle]}>
                  {category}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.View3}>
            <Icon
              name="phone-outgoing"
              type="material-community"
              color="#407BFF"
              size={16}
              reverse
              onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
              containerStyle={genericStyles.shadow}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default MatrimonialCard;

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
    marginRight: 10,
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
