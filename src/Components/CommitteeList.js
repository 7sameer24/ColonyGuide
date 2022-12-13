import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, SIZES} from '../constants';
import {Image} from 'react-native-elements';

const CommiteeList = ({cardContainer, ViewContainer, data}) => {
  const {width, height} = useWindowDimensions();

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
            <Text style={[styles.text, genericStyles.fontSize(12)]}>
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
    width: SIZES.width / 3,
    height: SIZES.height * 0.2,
    borderRadius: 100,
  },
});
