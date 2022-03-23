import {StatusBar, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {COLORS, genericStyles} from '../constants';

const Spinner = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <LottieView
        source={require('../../assets/animation/loader3.json')}
        autoPlay
        loop={true}
        autoSize
        style={genericStyles.width('70%')}
      />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
