import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import BaseURL from '../constants/BaseURL';
import Poweredby from '../Components/Poweredby';
import {useApp} from '../../Context/AppContext';

const Helpline = () => {
  const [helpData, setHelpData] = useState('');
  const [fire_brigade, setFB] = useState('');
  const [other, setOther] = useState('');
  const [policeData, setPolice] = useState('');
  const {Userdata, GSaveLocalID} = useApp();

  const HelplineData = async () => {
    try {
      const response = await axios.post(BaseURL('get-helpline'), {
        locality_id: GSaveLocalID
          ? GSaveLocalID
          : Userdata.userData.locality_id,
      });
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
          {helpData && (
            <View style={styles.topTexConyainer}>
              <Text style={styles.topText}>Medical</Text>
            </View>
          )}
          {helpData &&
            helpData.map(data => (
              <View
                style={[styles.middComen, {marginBottom: 10}]}
                key={data.id}>
                <Text style={[styles.topText2, {width: 20}]}>{data.id}.</Text>
                <Text style={styles.topText2}>{data.name}</Text>
                <Text style={styles.topText3}>{data.department}</Text>
                <Icon
                  name="phone-outgoing"
                  type="material-community"
                  color="#407BFF"
                  size={20}
                  onPress={() => Linking.openURL(`tel:${data.contact_no}`)}
                />
              </View>
            ))}
          {policeData && (
            <View style={styles.topTexConyainer}>
              <Text style={styles.topText}>Police</Text>
            </View>
          )}
          {policeData &&
            policeData.map(data => (
              <View
                style={[styles.middComen, {marginBottom: 10}]}
                key={data.id}>
                <Text style={[styles.topText2, {width: 20}]}>{data.id}.</Text>
                <Text style={styles.topText2}>{data.name}</Text>
                <Text style={styles.topText3}>{data.department}</Text>
                <Icon
                  name="phone-outgoing"
                  type="material-community"
                  color="#407BFF"
                  size={20}
                  onPress={() => Linking.openURL(`tel:${data.contact_no}`)}
                />
              </View>
            ))}
          {fire_brigade && (
            <View style={styles.topTexConyainer}>
              <Text style={styles.topText}>Fire Brigade</Text>
            </View>
          )}
          {fire_brigade &&
            fire_brigade.map(data => (
              <View
                style={[styles.middComen, {marginBottom: 10}]}
                key={data.id}>
                <Text style={[styles.topText2, {width: 20}]}>{data.id}.</Text>
                <Text style={styles.topText2}>{data.name}</Text>
                <Text style={styles.topText3}>{data.department}</Text>
                <Icon
                  name="phone-outgoing"
                  type="material-community"
                  color="#407BFF"
                  size={20}
                  onPress={() => Linking.openURL(`tel:${data.contact_no}`)}
                />
              </View>
            ))}
          {other && (
            <View style={styles.topTexConyainer}>
              <Text style={styles.topText}>Other</Text>
            </View>
          )}
          {other &&
            other.map(data => (
              <View
                style={[styles.middComen, {marginBottom: 10}]}
                key={data.id}>
                <Text style={[styles.topText2, {width: 20}]}>{data.id}.</Text>
                <Text style={styles.topText2} numberOfLines={1}>
                  {data.name}
                </Text>
                <Text style={styles.topText3} numberOfLines={1}>
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
        </ScrollView>
      ) : (
        <Spinner />
      )}
      <Poweredby />
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
    width: 100,
  },
  topText3: {
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    width: 50,
  },
  midd: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'flex-start',
  },
  middComen: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-around',
    paddingVertical: 5,
    // backgroundColor: '#F3EBF9',
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  cardConatiner: {
    padding: 0,
    borderWidth: 0,
    borderRadius: 10,
  },
});
