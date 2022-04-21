import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import BaseURL from '../../constants/BaseURL';
import {useApp} from '../../../Context/AppContext';

const BusinessInformation = ({route, navigation}) => {
  const {ID} = route.params;
  const [busInfoData, setBusData] = useState('');

  const {Userdata} = useApp();

  const callCount = async number => {
    try {
      const response = await axios.post(BaseURL('click-count'), {
        user_id: busInfoData.user_id,
        service_id: ID,
        type: number === 1 ? 1 : 2,
        clicked_user_id: Userdata.userData.id,
      });
      if (response.data.success) {
        number === 1
          ? Linking.openURL(`tel:${busInfoData.contact_person_mobile}`)
          : sendWhatsApp();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const FetchData = async () => {
    try {
      const response = await axios.post(BaseURL('business-view'), {
        business_id: ID,
      });
      setBusData(response.data.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    FetchData();
    return () => {
      setBusData('');
    };
  }, []);

  const sendWhatsApp = () => {
    let msg = 'Hello';
    let phoneWithCountryCode = `91${busInfoData.contact_person_whatsapp}`;
    let mobile =
      Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
        Linking.openURL(url)
          .then(() => {
            ToastAndroid.show('WhatsApp Opened', ToastAndroid.SHORT);
          })
          .catch(() => {
            ToastAndroid.show(
              'Make sure WhatsApp installed on your device',
              ToastAndroid.SHORT,
            );
          });
      } else {
        ToastAndroid.show('Please insert message to send', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Please insert mobile no', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={genericStyles.Container}>
      {busInfoData !== '' ? (
        <>
          <View style={styles.radiusView}>
            <Image
              source={
                busInfoData.logo_image ===
                'https://colonyguide.garimaartgallery.com/storage'
                  ? Images.Ellipse
                  : {uri: busInfoData.logo_image}
              }
              style={styles.ImageStyle}
              fadeDuration={0}
            />
          </View>
          <Text style={styles.title}>{busInfoData.contact_person}</Text>
          <Text style={styles.subTitle}>{busInfoData.name}</Text>
          <View style={styles.DetailsContanier}>
            <View style={genericStyles.column}>
              <TouchableOpacity
                style={styles.firstView}
                onPress={() => callCount(1)}>
                <Icon
                  name="phone-outgoing"
                  type="material-community"
                  color="#407BFF"
                  size={20}
                />
                <Text style={styles.text}>
                  {busInfoData.contact_person_mobile}
                </Text>
              </TouchableOpacity>
              <View style={genericStyles.row}>
                <Icon
                  name="store"
                  type="material-community"
                  size={20}
                  color="#A484FF"
                />
                <Text style={styles.text}>{busInfoData.categoryName}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => callCount()}>
              <View style={genericStyles.row}>
                <Icon
                  name="whatsapp"
                  type="material-community"
                  size={20}
                  color="#25D366"
                />
                <Text style={styles.text}>
                  {busInfoData.contact_person_whatsapp}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={genericStyles.ml(20)}>
            <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
              About business
            </Text>
            <Text style={styles.SubText}>{busInfoData.about}</Text>
            <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
              Business address
            </Text>
            <Text style={[styles.SubText, {fontSize: 14, color: COLORS.third}]}>
              {`${busInfoData.house_no} ${busInfoData.address} ${
                busInfoData.landmark == null ? '' : busInfoData.landmark
              }`}
            </Text>
          </View>
          <View style={styles.buttonView}></View>
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default BusinessInformation;

const styles = StyleSheet.create({
  radiusView: {
    backgroundColor: COLORS.primary,
    height: '8%',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    marginBottom: 50,
  },
  ImageStyle: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 60,
    borderColor: COLORS.white,
    borderWidth: 5,
  },
  title: {
    fontSize: 16,
    color: COLORS.textColor,
    fontFamily: FONTS.InterMedium,
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.textColor,
    fontFamily: FONTS.InterRegular,
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    color: COLORS.textColor,
    fontFamily: FONTS.InterRegular,
    marginLeft: 5,
  },
  DetailsContanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  firstView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  SubText: {
    fontSize: 13,
    fontFamily: FONTS.InterRegular,
    color: '#A1A1A1',
    marginTop: 10,
    width: '90%',
    marginBottom: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  titleStyle: {
    fontFamily: FONTS.InterSemiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
  buttonStyle: {
    paddingVertical: 16,
    borderWidth: 0,
  },
  buttonView: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
});
