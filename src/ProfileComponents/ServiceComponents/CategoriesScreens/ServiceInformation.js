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
import {COLORS, FONTS, genericStyles, Images} from '../../../constants';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import Spinner from '../../../Components/Spinner';
import BaseURL from '../../../constants/BaseURL';
import {useApp} from '../../../../Context/AppContext';

const ServiceInformation = ({route, navigation}) => {
  const {ID} = route.params;
  const [infoData, setInfoData] = useState('');
  const {Userdata, setIsLoginPop} = useApp();

  const callCount = async number => {
    try {
      const response = await axios.post(BaseURL('click-count'), {
        user_id: infoData.user_id,
        service_id: ID,
        type: number === 1 ? 1 : 2,
        clicked_user_id: Userdata.userData.id,
      });
      if (response.data.success) {
        number === 1
          ? Linking.openURL(`tel:${infoData.contact_person_mobile}`)
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
      const response = await axios.post(BaseURL('service-view'), {
        service_id: ID,
      });
      setInfoData(response.data.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    FetchData();
    return () => {
      setInfoData('');
    };
  }, []);

  const sendWhatsApp = () => {
    let msg = 'Hello';
    let phoneWithCountryCode = `91${infoData.contact_person_whatsapp}`;
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
      {infoData !== '' ? (
        <>
          <View style={styles.radiusView}>
            <Image
              source={
                infoData.logo_image ===
                'https://colonyguide.garimaartgallery.com/storage'
                  ? Images.Ellipse
                  : {uri: infoData.logo_image}
              }
              style={styles.ImageStyle}
              fadeDuration={0}
            />
          </View>
          {infoData.contact_person !== null ? (
            <Text style={styles.title}>{infoData.contact_person}</Text>
          ) : null}
          {infoData.name !== null ? (
            <Text style={styles.subTitle}>{infoData.name}</Text>
          ) : null}
          <View style={styles.DetailsContanier}>
            <View style={genericStyles.column}>
              <TouchableOpacity
                style={styles.firstView}
                onPress={() =>
                  Userdata === null ? setIsLoginPop(true) : callCount(1)
                }>
                <Icon
                  name="phone-outgoing"
                  type="material-community"
                  color="#407BFF"
                  size={20}
                />
                <Text style={styles.text}>
                  {infoData.contact_person_mobile}
                </Text>
              </TouchableOpacity>
              <View style={genericStyles.row}>
                <Icon
                  name="store"
                  type="material-community"
                  size={20}
                  color="#A484FF"
                />
                <Text style={styles.text}>{infoData.categoryName}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={genericStyles.row}
              onPress={() =>
                Userdata === null ? setIsLoginPop(true) : callCount()
              }>
              <Icon
                name="whatsapp"
                type="material-community"
                size={20}
                color="#25D366"
              />
              <Text style={styles.text}>
                {infoData.contact_person_whatsapp}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={genericStyles.ml(20)}>
            <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
              About service
            </Text>
            <Text style={styles.SubText}>{infoData.about}</Text>
            <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
              Shop address
            </Text>
            <Text style={[styles.SubText, {fontSize: 14, color: COLORS.third}]}>
              {`${infoData.house_no} ${infoData.address} ${
                infoData.landmark == null ? '' : infoData.landmark
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

export default ServiceInformation;

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
