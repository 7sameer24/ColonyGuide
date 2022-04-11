import {StatusBar, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {COLORS, genericStyles} from '../constants';

const NoDataAni = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <LottieView
        source={require('../../assets/animation/NoDataAnimation.json')}
        autoPlay
        loop={false}
        autoSize
        style={genericStyles.width('80%')}
      />
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
});
