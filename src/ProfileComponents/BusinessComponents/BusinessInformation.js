import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import BaseURL from '../../constants/BaseURL';

const BusinessInformation = ({route, navigation}) => {
  const {ID} = route.params;
  const [Userdata, setUserData] = useState('');

  const FetchData = async () => {
    try {
      const response = await axios.post(BaseURL('business-view'), {
        business_id: ID,
      });
      setUserData(response.data.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    FetchData();
    return () => {
      setUserData('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {Userdata !== '' ? (
        <>
          <View style={styles.radiusView}>
            <Image
              source={
                Userdata.logo_image ===
                'https://colonyguide.garimaartgallery.com/storage'
                  ? Images.Ellipse
                  : {uri: Userdata.logo_image}
              }
              style={styles.ImageStyle}
              fadeDuration={0}
            />
          </View>
          <Text style={styles.title}>{Userdata.contact_person}</Text>
          <Text style={styles.subTitle}>{Userdata.name}</Text>
          <View style={styles.DetailsContanier}>
            <View style={genericStyles.column}>
              <View style={styles.firstView}>
                <Icon
                  name="phone-outgoing"
                  type="material-community"
                  color="#407BFF"
                  size={20}
                />
                <Text style={styles.text}>
                  {Userdata.contact_person_mobile}
                </Text>
              </View>
              <View style={genericStyles.row}>
                <Icon
                  name="store"
                  type="material-community"
                  size={20}
                  color="#A484FF"
                />
                <Text style={styles.text}>{Userdata.categoryName}</Text>
              </View>
            </View>
            <View style={genericStyles.row}>
              <Icon
                name="whatsapp"
                type="material-community"
                size={20}
                color="#25D366"
              />
              <Text style={styles.text}>
                {Userdata.contact_person_whatsapp}
              </Text>
            </View>
          </View>
          <View style={genericStyles.ml(20)}>
            <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
              About service
            </Text>
            <Text style={styles.SubText}>{Userdata.about}</Text>
            <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
              Shop address
            </Text>
            <Text style={[styles.SubText, {fontSize: 14, color: COLORS.third}]}>
              {`${Userdata.house_no} ${Userdata.address} ${
                Userdata.landmark == null ? '' : Userdata.landmark
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