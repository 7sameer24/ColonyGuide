import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Button, Icon} from 'react-native-elements';
import {useIslogin} from '../../../Context/LoginContext';

const BusinessSaved = ({route, navigation}) => {
  const {UserDetails} = route.params;
  const {Userdata, UserToken} = useIslogin();
  console.log(Userdata);
  return (
    <View style={genericStyles.Container}>
      <View style={styles.radiusView}>
        <Image source={Images.Ellipse} style={styles.ImageStyle} />
      </View>
      <Text style={styles.title}>
        {UserDetails === 'Business Information' ||
        UserDetails !== 'Service Information'
          ? 'Name of the company / business'
          : Userdata.userData.shop_name}
      </Text>
      <Text style={styles.subTitle}>{Userdata.userData.name}</Text>
      <View style={styles.DetailsContanier}>
        <View style={genericStyles.column}>
          <View style={styles.firstView}>
            <Icon
              name="phone-outgoing"
              type="material-community"
              color="#407BFF"
              size={20}
            />
            <Text style={styles.text}>{Userdata.userData.mobile_no}</Text>
          </View>
          <View style={genericStyles.row}>
            <Icon
              name="store"
              type="material-community"
              size={20}
              color="#A484FF"
            />
            <Text style={styles.text}>
              {UserDetails === 'Business Information' ||
              UserDetails !== 'Service Information'
                ? 'Wholesaler'
                : Userdata.userData.shop_category}
            </Text>
          </View>
        </View>
        <View style={genericStyles.row}>
          <Icon
            name="whatsapp"
            type="material-community"
            size={20}
            color="#25D366"
          />
          <Text style={styles.text}>{Userdata.userData.whatsapp_no}</Text>
        </View>
      </View>
      <View style={genericStyles.ml(20)}>
        <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
          {UserDetails === 'Business Information' ||
          UserDetails !== 'Service Information'
            ? 'About business'
            : 'About service'}
        </Text>
        <Text style={styles.SubText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis, lectus magna fringilla urna,
          porttitor
        </Text>
        <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
          {UserDetails === 'Business Information' ||
          UserDetails !== 'Service Information'
            ? 'Business address'
            : 'Shop address'}
        </Text>
        <Text style={[styles.SubText, {fontSize: 14, color: COLORS.third}]}>
          {Userdata.userData.address}
        </Text>
      </View>
      <View style={styles.buttonView}>
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          type="outline"
          title="Edit"
          onPress={() =>
            navigation.navigate('ServiceEdit', {
              User:
                Userdata.userData.app_role_id == 2
                  ? 'Service Info'
                  : 'Business Info',
              data: Userdata.userData,
              token: UserToken,
            })
          }
        />
      </View>
    </View>
  );
};

export default BusinessSaved;

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
