import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FONTS, genericStyles} from '../constants';
import WebView from 'react-native-webview';

const TermsCondition = () => {
  return (
    <View style={genericStyles.Container}>
      <WebView
        source={{uri: 'https://www.colonyguide.com/terms-condition.php'}}
      />
    </View>
  );
};

export default TermsCondition;

const styles = StyleSheet.create({
  Text: {
    color: '#BBBBBB',
    fontSize: 14,
    fontFamily: FONTS.InterRegular,
    marginHorizontal: 30,
    marginTop: 10,
  },
});
