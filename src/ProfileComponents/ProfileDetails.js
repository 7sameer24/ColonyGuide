import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS, genericStyles, Images} from '../constants';
import {Icon} from 'react-native-elements';

const ProfileDetails = ({route}) => {
  return (
    <ScrollView style={genericStyles.Container}>
      <View>
        <Image source={Images.Profile} style={styles.ImageStyle} />
        <View style={styles.ImageContainer}>
          <Image
            source={Images.Camera}
            resizeMode="contain"
            style={styles.ChangeImgStyle}
          />
        </View>
      </View>
      <View style={styles.midd}>
        <Text style={styles.text}>Your Name</Text>
        <View style={styles.viewCon}>
          <Text style={styles.full}>Cameron Williamson</Text>
          <Icon
            name="create-outline"
            type="ionicon"
            color="#666666"
            size={20}
            containerStyle={genericStyles.selfCenter}
          />
        </View>
        <Text style={styles.text}>Mobile Number</Text>
        <View style={styles.viewCon}>
          <Text style={styles.full}>987654321</Text>
          <Icon
            name="create-outline"
            type="ionicon"
            color="#666666"
            size={20}
            containerStyle={genericStyles.selfCenter}
          />
        </View>
        <Text style={styles.text}>Email</Text>
        <View style={styles.viewCon}>
          <Text style={styles.full}>example@gmail.com</Text>
          <Icon
            name="create-outline"
            type="ionicon"
            color="#666666"
            size={20}
            containerStyle={genericStyles.selfCenter}
          />
        </View>
        <Text style={styles.text}>Address</Text>
        <View style={styles.viewCon}>
          <Text style={[styles.full, {width: '85%'}]}>
            3891 Ranchview Dr. Richardson, California 62639
          </Text>
          <Icon
            name="create-outline"
            type="ionicon"
            color="#666666"
            size={20}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  ImageStyle: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  ChangeImgStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  ImageContainer: {
    backgroundColor: '#FEF6EF',
    paddingVertical: 5,
    borderRadius: 8,
    width: 30,
    elevation: 5,
    position: 'absolute',
    right: '30%',
    bottom: -7,
  },
  text: {
    fontSize: 14,
    color: '#666666',
    fontFamily: FONTS.InterMedium,
    marginTop: 5,
  },
  midd: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  full: {
    fontSize: 14,
    color: '#666666',
    fontFamily: FONTS.InterMedium,
  },
  viewCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: '#FEF6EF',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});
