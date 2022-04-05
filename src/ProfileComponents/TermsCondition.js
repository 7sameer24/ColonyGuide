import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS, genericStyles} from '../constants';
import Poweredby from '../Components/Poweredby';

const TermsCondition = () => {
  return (
    <View style={genericStyles.Container}>
      <Text style={styles.Text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id non semper
        nibh porta. Urna, aliquam pharetra dapibus in ac quisque tincidunt
        faucibus. Sem facilisis feugiat interdum at faucibus scelerisque.
        Malesuada tellus eu duis turpis. In urna mauris arcu, ultrices turpis
        cursus quam risus.
      </Text>
      <Text style={styles.Text}>
        Pellentesque id magna ut a tellus ac montes, tortor. Malesuada a quis
        egestas suspendisse feugiat dictum sed lacus. Velit, nibh senectus
        mauris, at vel vestibulum. Euismod nunc dolor, id nunc, rhoncus nec
        consectetur. Dolor ac tristique sed sagittis sem tortor, at. Vitae, a
        semper vitae orci velit, dolor eu.
      </Text>
      <Text style={styles.Text}>
        Fermentum pellentesque sit orci magnis diam, tellus tincidunt volutpat.
        Bibendum in risus nisi, aliquet semper elementum tortor tincidunt. Id
        mus in euismod nunc habitant. Ornare eget felis gravida fames interdum
        id. Ut velit cras nec faucibus malesuada. Aliquam in aliquam dignissim
        rutrum sollicitudin eu quam duis. Ac vulputate quisque vulputate morbi
        elementum lectus et aliquet dui. Vitae elementum, mi ut phasellus lacus
        nam in. Diam gravida pharetra cras faucibus euismod nisl. Cursus diam
        feugiat nunc ut. Aenean facilisis vitae ornare arcu, vitae pulvinar eget
        quam augue. Pellentesque mauris, condimentu
      </Text>
      <Poweredby />
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
