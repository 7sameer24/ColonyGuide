import {Share, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../constants';

const HouseOnwersList = ({title, subTitle, AddressLine, Landmark}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Colony Guide Sharing This ${title} ${subTitle} ${AddressLine} ${Landmark}`,
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

  const CutName = title != null ? title.slice(0, 1) : null;

  return (
    <Card containerStyle={styles.CardContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.CutNameConatiner}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontFamily: FONTS.InterRegular,
            }}>
            {CutName}
          </Text>
        </View>
        <View style={genericStyles.column}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={1}>
            {subTitle}
          </Text>
          <Text style={styles.subTitle} numberOfLines={1}>
            {AddressLine}
          </Text>
          <Text style={styles.subTitle} numberOfLines={1}>
            {Landmark}
          </Text>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <Icon
            name="share-social"
            type="ionicon"
            color={COLORS.textColor}
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
  );
};

export default HouseOnwersList;

const styles = StyleSheet.create({
  CardContainer: {
    borderWidth: 0,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
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
    marginTop: 2,
    width: 250,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
});
