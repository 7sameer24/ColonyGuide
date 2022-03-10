import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import ProfileComponents from './ProfileComponents';
import {Divider} from 'react-native-elements';

const CustomDrawer = props => {
  return (
    <View style={genericStyles.fill}>
      <DrawerContentScrollView>
        <View style={styles.ProfileContanier}>
          <View style={genericStyles.column}>
            <Image source={Images.Profile} style={styles.ImageStyle} />
            <View style={genericStyles.column}>
              <Text style={styles.title}>Jane Cooper</Text>
              <Text style={styles.subTitle}>View profile</Text>
            </View>
          </View>
        </View>
        <ProfileComponents
          title="Business Info"
          ImageContainer={styles.DrawerIcon}
          source={Images.Business}
          onPress={() => props.navigation.navigate('Business Infoo')}
        />
        <ProfileComponents
          title="Committee"
          ImageContainer={styles.DrawerIcon}
          source={Images.Committee}
          onPress={() => props.navigation.navigate('Committee')}
        />
        <ProfileComponents
          title="House Owners"
          ImageContainer={styles.DrawerIcon}
          source={Images.HouseOwners}
          onPress={() => props.navigation.navigate('House Owners')}
        />
        <ProfileComponents
          title="Helpline"
          ImageContainer={styles.DrawerIcon}
          source={Images.Helpline}
          onPress={() => props.navigation.navigate('Helpline')}
        />
        <Divider style={styles.Divider} color="#FFEBD9" width={1} />
        <ProfileComponents
          title="Settings"
          ImageContainer={styles.DrawerIcon}
          source={Images.Settings}
          onPress={() => props.navigation.navigate('Settings')}
        />
        <Divider style={styles.Divider} color="#FFEBD9" width={1} />
        <ProfileComponents
          title="Contact Us"
          ImageContainer={styles.DrawerIcon}
          source={Images.ContactUs}
          onPress={() => props.navigation.navigate('Contact Us')}
        />
        <ProfileComponents
          title="Rate Us"
          ImageContainer={styles.DrawerIcon}
          source={Images.RateUs}
          onPress={() => props.navigation.navigate('Rate Us')}
        />
        <ProfileComponents
          title="Feedbacks"
          ImageContainer={styles.DrawerIcon}
          source={Images.Feedbacks}
        />
        <ProfileComponents
          title="Log Out"
          ImageContainer={styles.DrawerIcon}
          source={Images.LogOut}
          onPress={() => props.navigation.navigate('Login')}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  ProfileContanier: {
    marginVertical: 20,
    borderTopEndRadius: 20,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
    alignSelf: 'center',
    marginVertical: 5,
  },
  subTitle: {
    color: '#666666',
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    alignSelf: 'center',
  },
  ImageStyle: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
  DrawerIcon: {
    backgroundColor: '#FEF6EF',
    padding: 10,
    borderRadius: 7,
  },
  Divider: {
    marginLeft: 22,
    marginTop: 20,
  },
});
