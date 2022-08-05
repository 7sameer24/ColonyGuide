import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import {Image} from 'react-native-elements';

const CommiteeList = ({cardContainer, ViewContainer, data}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map(data => (
        <View key={data.id} style={styles.containerStyle(width, height)}>
          <Image
            placeholderStyle={genericStyles.bg(COLORS.white)}
            PlaceholderContent={<ActivityIndicator color={COLORS.primary} />}
            resizeMode="contain"
            containerStyle={styles.imageContainer}
            source={{uri: data.image}}
          />
          <Text style={styles.text} numberOfLines={1}>
            {data.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CommiteeList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  containerStyle: (width, height) => ({
    width: width / 5.6,
    marginHorizontal: 30,
    borderRadius: 10,
  }),
  text: {
    marginTop: 5,
    marginBottom: 10,
    fontFamily: FONTS.InterSemiBold,
    color: COLORS.textColor,
    fontSize: 14,
    width: 100,
  },
  imageContainer: {
    width: 64,
    height: 64,
    alignSelf: 'center',
    borderRadius: 10,
  },
});
