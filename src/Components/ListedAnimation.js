import {StatusBar, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {COLORS, genericStyles} from '../constants';

const ListedAnimation = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <LottieView
        source={require('../../assets/animation/Listed.json')}
        autoPlay
        loop={true}
        autoSize
        style={genericStyles.width('90%')}
      />
    </View>
  );
};

export default ListedAnimation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: 10,
    alignSelf: 'center',
  },
});
