import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../constants';

const HouseOnwersList = ({title, subTitle, AddressLine, Landmark}) => {
  return (
    <Card containerStyle={styles.CardContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={genericStyles.column}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <Text style={styles.subTitle}>{AddressLine}</Text>
          <Text style={styles.subTitle}>{Landmark}</Text>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <Icon
            name="share-social"
            type="ionicon"
            color={COLORS.textColor}
            size={20}
          />
          <Icon
            name="map-marker-radius"
            type="material-community"
            size={20}
            color={COLORS.textColor}
          />
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
});
