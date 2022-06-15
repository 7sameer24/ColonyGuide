import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import BaseURL from '../../constants/BaseURL';
import HeaderBar from '../../Components/HeaderBar';
import Poweredby from '../../Components/Poweredby';

const BusinessSaved = ({route, navigation}) => {
  const {userID, userToken, Role} = route.params;
  const [Userdata, setUserData] = useState('');

  const idx = async () => {
    try {
      const response = await axios(BaseURL('business-details'), {
        method: 'post',
        data: {user_id: userID, app_role_id: Role},
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUserData(response.data.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setUserData('');
    };
  }, []);
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        firstIcon="arrow-back-outline"
        title="Business Information"
        bellIcon="create-outline"
        ThirdType="ionicon"
        thirdOnpress={() =>
          navigation.navigate('BusinessEdit', {
            data: Userdata,
            token: userToken,
          })
        }
        firstOnpress={() => navigation.goBack()}
      />
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
              fadeDuration={0}
              style={styles.ImageStyle}
            />
            <View style={genericStyles.column}>
              <Text style={[styles.title, {color: COLORS.textColor}]}>
                {Userdata.name}
              </Text>
              <Text style={styles.subTitle}>{Userdata.contact_person}</Text>
            </View>
          </View>
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
              About business
            </Text>
            <Text style={styles.SubText}>{Userdata.about}</Text>
            <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
              Business address
            </Text>
            <Text style={[styles.SubText, {fontSize: 14, color: COLORS.third}]}>
              {`${Userdata.house_no === null ? '' : Userdata.house_no} ${
                Userdata.address === null ? '' : Userdata.address
              } ${Userdata.landmark === null ? '' : Userdata.landmark}`}
            </Text>
          </View>
          <Poweredby />
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default BusinessSaved;

const styles = StyleSheet.create({
  radiusView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  ImageStyle: {
    width: 70,
    height: 70,
    borderRadius: 60,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.InterMedium,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.textColor,
    fontFamily: FONTS.InterRegular,
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
});
