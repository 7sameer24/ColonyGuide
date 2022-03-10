import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Button, Icon} from 'react-native-elements';

const BusinessSaved = ({route}) => {
  const {UserDetails} = route.params;
  // console.log(route);
  return (
    <View style={genericStyles.Container}>
      <View style={styles.radiusView}>
        <Image source={Images.Ellipse} style={styles.ImageStyle} />
      </View>
      <Text style={styles.title}>
        {UserDetails === 'Business Info' || UserDetails !== 'Service Info'
          ? 'Name of the company / business'
          : 'Shop / Service name'}
      </Text>
      <Text style={styles.subTitle}>Nikhil kapoor</Text>
      <View style={styles.DetailsContanier}>
        <View style={genericStyles.column}>
          <View style={styles.firstView}>
            <Icon
              name="phone-outgoing"
              type="material-community"
              color="#407BFF"
              size={20}
            />
            <Text style={styles.text}>987654321</Text>
          </View>
          <View style={genericStyles.row}>
            <Icon
              name="store"
              type="material-community"
              size={20}
              color="#A484FF"
            />
            <Text style={styles.text}>
              {UserDetails === 'Business Info' || UserDetails !== 'Service Info'
                ? 'Wholesaler'
                : 'General store'}
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
          <Text style={styles.text}>987654321</Text>
        </View>
      </View>
      <View style={genericStyles.ml(20)}>
        <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
          {UserDetails === 'Business Info' || UserDetails !== 'Service Info'
            ? 'About business'
            : 'About service'}
        </Text>
        <Text style={styles.SubText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis, lectus magna fringilla urna,
          porttitor
        </Text>
        <Text style={[styles.title, {alignSelf: 'flex-start'}]}>
          {UserDetails === 'Business Info' || UserDetails !== 'Service Info'
            ? 'Business address'
            : 'Shop address'}
        </Text>
        <Text style={[styles.SubText, {fontSize: 14, color: COLORS.third}]}>
          1901 Thornridge Cir. Shiloh, Hawaii 81063
        </Text>
      </View>
      <View style={styles.buttonView}>
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          type="outline"
          title="Edit"
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
    fontSize: 10,
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
