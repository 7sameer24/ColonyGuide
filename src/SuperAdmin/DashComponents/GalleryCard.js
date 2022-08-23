import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Image, Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../../constants';

const GalleryCard = ({title, subTitle, source, onEdit, deleteItem}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={genericStyles.mb(10)}>
      <Card containerStyle={[styles.CardContainer, genericStyles.shadow]}>
        <View
          style={[
            genericStyles.row,
            {alignItems: 'center', justifyContent: 'space-between'},
          ]}>
          <View style={[genericStyles.row, {alignItems: 'center'}]}>
            <Image
              source={source}
              fadeDuration={0}
              style={styles.ImageStyle}
              placeholderStyle={genericStyles.bg(COLORS.white)}
              PlaceholderContent={<ActivityIndicator color={COLORS.primary} />}
            />
            <View style={genericStyles.row}>
              <View style={{width: width / 3.1}}>
                <Text style={[styles.title]} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={[styles.subTitle1]} numberOfLines={1}>
                  {subTitle}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.View3}>
            <Icon
              name="square-edit-outline"
              type="material-community"
              size={18}
              reverse
              color={COLORS.primary}
              onPress={onEdit}
              containerStyle={genericStyles.shadow}
            />
            <Icon
              name="trash"
              type="ionicon"
              size={18}
              color={COLORS.red}
              reverse
              onPress={deleteItem}
              containerStyle={genericStyles.shadow}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default GalleryCard;

const styles = StyleSheet.create({
  CardContainer: {
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
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
