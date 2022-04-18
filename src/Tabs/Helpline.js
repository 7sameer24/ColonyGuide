import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import {Card, Icon} from 'react-native-elements';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import BaseURL from '../constants/BaseURL';

const Helpline = () => {
  const [helpData, setHelpData] = useState('');
  const [fire_brigade, setFB] = useState('');
  const [other, setOther] = useState('');
  const [policeData, setPolice] = useState('');

  const HelplineData = async () => {
    try {
      const response = await axios.post(BaseURL('get-helpline'));
      setFB(response.data.fire_brigade);
      setOther(response.data.other);
      setPolice(response.data.police);
      setHelpData(response.data.medical);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    HelplineData();
    return () => {
      setHelpData('');
      setFB('');
      setOther('');
      setPolice('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {helpData.length > 0 ? (
        <ScrollView>
          <View style={styles.topTexConyainer}>
            <Text style={styles.topText}>Medical</Text>
          </View>
          {/* <Card containerStyle={styles.cardConatiner}> */}
          {helpData.map(data => (
            <View style={[styles.middComen, {marginBottom: 10}]} key={data.id}>
              <View style={genericStyles.row}>
                <Text style={[styles.topText2]}>{data.id}</Text>
                <Text style={[styles.topText2, {marginRight: 0}]}>
                  {data.name}
                </Text>
              </View>
              <Text style={[styles.topText2, {marginRight: 0}]}>
                {data.department}
              </Text>
              <Icon
                name="phone-outgoing"
                type="material-community"
                color="#407BFF"
                size={20}
                onPress={() => Linking.openURL(`tel:${data.contact_no}`)}
              />
            </View>
          ))}
          {/* </Card> */}
          <View style={styles.topTexConyainer}>
            <Text style={styles.topText}>Police</Text>
          </View>
          {/* <Card containerStyle={styles.cardConatiner}> */}
          {policeData.map(data => (
            <View style={[styles.middComen, {marginBottom: 10}]} key={data.id}>
              <View style={genericStyles.row}>
                <Text style={[styles.topText2]}>{data.id}</Text>
                <Text style={[styles.topText2, {marginRight: 0}]}>
                  {data.name}
                </Text>
              </View>
              <Text style={[styles.topText2, {marginRight: 0}]}>
                {data.department}
              </Text>
              <Icon
                name="phone-outgoing"
                type="material-community"
                color="#407BFF"
                size={20}
                onPress={() => Linking.openURL(`tel:${data.contact_no}`)}
              />
            </View>
          ))}
          {/* </Card> */}
          <View style={styles.topTexConyainer}>
            <Text style={styles.topText}>Fire Brigade</Text>
          </View>
          {/* <Card containerStyle={styles.cardConatiner}> */}
          {fire_brigade.map(data => (
            <View style={[styles.middComen, {marginBottom: 10}]} key={data.id}>
              <View style={genericStyles.row}>
                <Text style={[styles.topText2]}>{data.id}</Text>
                <Text style={[styles.topText2, {marginRight: 0}]}>
                  {data.name}
                </Text>
              </View>
              <Text style={[styles.topText2, {marginRight: 0}]}>
                {data.department}
              </Text>
              <Icon
                name="phone-outgoing"
                type="material-community"
                color="#407BFF"
                size={20}
                onPress={() => Linking.openURL(`tel:${data.contact_no}`)}
              />
            </View>
          ))}
          {/* </Card> */}
          <View style={styles.topTexConyainer}>
            <Text style={styles.topText}>Other</Text>
          </View>
          {/* <Card containerStyle={[styles.cardConatiner, {marginBottom: 10}]}> */}
          {other.map(data => (
            <View style={[styles.middComen, {marginBottom: 10}]} key={data.id}>
              <View style={genericStyles.row}>
                <Text style={[styles.topText2]}>{data.id}</Text>
                <Text style={[styles.topText2, {marginRight: 0}]}>
                  {data.name}
                </Text>
              </View>
              <Text style={[styles.topText2, {marginRight: 0}]}>
                {data.department}
              </Text>
              <Icon
                name="phone-outgoing"
                type="material-community"
                color="#407BFF"
                size={20}
                onPress={() => Linking.openURL(`tel:${data.contact_no}`)}
              />
            </View>
          ))}
          {/* </Card> */}
        </ScrollView>
      ) : (
        <Spinner />
      )}
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
    backgroundColor: '#F3EBF9',
  },
  cardConatiner: {
    padding: 0,
    borderWidth: 0,
    borderRadius: 10,
  },
});
