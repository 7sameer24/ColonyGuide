import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
  Switch,
} from 'react-native';
import React from 'react';
import {Image, Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../../constants';

const GalleryCard = ({
  title,
  subTitle,
  source,
  onEdit,
  deleteItem,
  AddressLine,
  Landmark,
  twoMore,
  iconName,
  iconType,
  iconName2,
  iconType2,
  IconColorChange,
  switchButton,
  toggleSwitch,
  isEnabled,
  longText,
}) => {
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
              <View style={{width: width / longText}}>
                <Text style={[styles.title]} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={[styles.subTitle1]} numberOfLines={1}>
                  {subTitle}
                </Text>
                {twoMore && (
                  <>
                    <Text style={styles.subTitle} numberOfLines={1}>
                      {AddressLine}
                    </Text>
                    {Landmark && (
                      <Text style={styles.subTitle} numberOfLines={1}>
                        {Landmark}
                      </Text>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
          {switchButton ? (
            <Switch
              trackColor={{false: 'red', true: '#6DD351'}}
              thumbColor={'#ffffff'}
              ios_backgroundColor="#fff"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          ) : (
            <View style={styles.View3}>
              {iconName && (
                <Icon
                  name={iconName}
                  type={iconType}
                  size={18}
                  reverse
                  color={IconColorChange ? '#6DD351' : COLORS.primary}
                  onPress={onEdit}
                  containerStyle={genericStyles.shadow}
                />
              )}
              {iconName2 && (
                <Icon
                  name={iconName2}
                  type={iconType2}
                  size={18}
                  color={IconColorChange ? '#6DD351' : COLORS.red}
                  reverse
                  onPress={deleteItem}
                  containerStyle={genericStyles.shadow}
                />
              )}
            </View>
          )}
        </View>
      </Card>
    </View>
  );
};

export default GalleryCard;

const styles = StyleSheet.create({
  CardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderColor: COLORS.primary,
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
