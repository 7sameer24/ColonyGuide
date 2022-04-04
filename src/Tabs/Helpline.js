import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import {Icon} from 'react-native-elements';
import axios from 'axios';

const Helpline = () => {
  const [helpData, setHelpData] = useState('');

  const HelplineData = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/get-helpline';
      const response = await axios.post(URL);
      setHelpData(response.data.helpline);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    HelplineData();
    return () => {
      setHelpData('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      <ScrollView>
        <View style={styles.topTexConyainer}>
          <Text style={styles.topText}>Medical</Text>
        </View>
        <View style={[styles.middComen, {marginBottom: 10}]}>
          <View style={genericStyles.row}>
            <Text style={[styles.topText2]}>1.</Text>
            <Text style={[styles.topText2, {marginRight: 0}]}>Name</Text>
          </View>
          <Text style={[styles.topText2, {marginRight: 0}]}>
            {helpData.department}
          </Text>
          <Icon
            name="phone-outgoing"
            type="material-community"
            color="#407BFF"
            size={20}
          />
        </View>
        <View style={styles.topTexConyainer}>
          <Text style={styles.topText}>Police</Text>
        </View>
        <View style={[styles.middComen, {marginBottom: 10}]}>
          <View style={genericStyles.row}>
            <Text style={[styles.topText2]}>1.</Text>
            <Text style={[styles.topText2, {marginRight: 0}]}>Name</Text>
          </View>
          <Text style={[styles.topText2, {marginRight: 0}]}>Department</Text>
          <Icon
            name="phone-outgoing"
            type="material-community"
            color="#407BFF"
            size={20}
          />
        </View>
        <View style={styles.topTexConyainer}>
          <Text style={styles.topText}>Medical</Text>
        </View>
        <View style={[styles.midd, {justifyContent: 'flex-start'}]}>
          <View style={[genericStyles.row, {marginLeft: 40}]}>
            <Text style={styles.topText2}>SL.</Text>
            <Text style={[styles.topText2, {marginRight: '19%'}]}>Name</Text>
          </View>
          <Text style={[styles.topText2, {marginRight: 0}]}>Department</Text>
        </View>
        <View style={styles.middComen}>
          <View style={genericStyles.row}>
            <Text style={styles.topText2}>1.</Text>
            <Text style={[styles.topText2, {marginRight: 0}]}>Name</Text>
          </View>
          <Text style={[styles.topText2, {marginRight: 0}]}>Department</Text>
          <Icon
            name="phone-outgoing"
            type="material-community"
            color="#407BFF"
            size={20}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Helpline;

const styles = StyleSheet.create({
  topTexConyainer: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 2,
    marginTop: 10,
  },
  topText: {
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    color: COLORS.white,
    alignSelf: 'center',
  },
  topText2: {
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginRight: 27,
  },
  midd: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'flex-start',
    marginLeft: 80,
  },
  middComen: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-evenly',
    paddingVertical: 1,
    backgroundColor: '#FEF6EF',
  },
});
