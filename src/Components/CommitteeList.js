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
        <View key={data.id}>
          <Image
            placeholderStyle={genericStyles.bg(COLORS.white)}
            PlaceholderContent={<ActivityIndicator color={COLORS.primary} />}
            resizeMode="contain"
            source={{uri: data.image}}
            style={styles.containerStyle(width, height)}
          />
          <Text style={styles.text}>{data.name}</Text>
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
    alignSelf: 'center',
  },
  containerStyle: (width, height) => ({
    width: width / 5.6,
    height: height / 12,
    marginHorizontal: 30,
  }),
  text: {
    alignSelf: 'center',
    marginBottom: 15,
    fontFamily: FONTS.InterSemiBold,
    color: COLORS.textColor,
    fontSize: 14,
  },
});
