import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FONTS, genericStyles} from '../constants';
import WebView from 'react-native-webview';

const TermsCondition = () => {
  const runFirst = `
  let selector = document.querySelector("div#Action_bar")
  let selector2 = document.querySelector("div#Top_bar")
  let selector3 = document.querySelector("footer#Footer")
  let selector4 = document.querySelector(".section.mcb-section.mcb-section-g2alo08tk")
  
  selector.style.display = "none"
  selector2.style.display = "none"
  selector3.style.display = "none"
  selector4.style.display = "none"
     
        true; // note: this is required, or you'll sometimes get silent failures
      `;
  return (
    <View style={genericStyles.Container}>
      <WebView
        injectedJavaScript={runFirst}
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
