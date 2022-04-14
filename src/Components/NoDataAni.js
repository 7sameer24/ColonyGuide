import {StatusBar, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';

const NoDataAni = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <LottieView
        source={require('../../assets/animation/NoDataAnimation.json')}
        autoPlay
        loop={false}
        autoSize
        style={[genericStyles.width('80%'), {marginTop: -10}]}
      />
      <Text style={styles.topText}> No data found.</Text>
    </View>
  );
};

export default NoDataAni;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
    color: COLORS.primary,
    marginTop: -30,
  },
});
