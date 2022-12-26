import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, SIZES} from '../constants';
import {Image} from 'react-native-elements';

const CommiteeList = ({data}) => {
  return (
    <View style={styles.container}>
      {data.map(data => (
        <View
          key={data.id}
          style={[genericStyles.mb(15), genericStyles.ai('center')]}>
          <Image
            placeholderStyle={genericStyles.bg(COLORS.white)}
            PlaceholderContent={<ActivityIndicator color={COLORS.primary} />}
            resizeMode="cover"
            containerStyle={styles.imageContainer}
            source={{uri: data.image}}
          />
          <Text style={[styles.text, genericStyles.color(COLORS.primary)]}>
            {data.name}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${data.phone_no}`)}>
            <Text
              style={[
                styles.text,
                {fontSize: 12, textDecorationLine: 'underline'},
              ]}>
              {data.phone_no}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default CommiteeList;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    marginHorizontal: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    fontSize: 14,
    width: SIZES.width / 3,
    textAlign: 'center',
    marginTop: 5,
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 100,
  },
});
