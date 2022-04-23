import {Share, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {Card, Icon} from 'react-native-elements';

const SearchResult = ({route}) => {
  const {userData} = route.params;
  const {width} = useWindowDimensions();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Colony Guide Sharing This ${userData.name} ${
          userData.house_no == null ? '' : userData.house_no
        } ${userData.address == null ? '' : userData.address} ${
          userData.landmark == null ? '' : userData.landmark
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

  const CutName = userData.name != null ? userData.name.slice(0, 2) : null;

  return (
    <View style={genericStyles.Container}>
      <Card containerStyle={styles.CardContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.CutNameConatiner}>
            <Text style={styles.CutName}>{CutName}</Text>
          </View>
          <View
            style={[
              genericStyles.column,
              {width: width / 1.8, marginRight: 5},
            ]}>
            <Text style={styles.title} numberOfLines={1}>
              {userData.name}
            </Text>
            <Text style={styles.subTitle} numberOfLines={1}>
              {userData.house_no}
            </Text>
            <Text style={styles.subTitle} numberOfLines={1}>
              {userData.address}
            </Text>
            <Text style={styles.subTitle} numberOfLines={1}>
              {userData.landmark}
            </Text>
          </View>
          <View
            style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
            <Icon
              name="share-social"
              type="ionicon"
              color={COLORS.primary}
              size={20}
              onPress={() => onShare()}
            />
            {/* <Icon
            name="map-marker-radius"
            type="material-community"
            size={20}
            color={COLORS.textColor}
          /> */}
          </View>
        </View>
      </Card>
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  CardContainer: {
    borderWidth: 0,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 0,
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
    marginTop: 2,
  },
  mainContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  CutNameConatiner: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginHorizontal: 20,
  },
  CutName: {
    color: COLORS.white,
    fontSize: 22,
    fontFamily: FONTS.InterRegular,
  },
});
