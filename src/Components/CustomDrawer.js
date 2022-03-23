import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import ProfileComponents from './ProfileComponents';
import {Divider} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';
import Group from '../../assets/ProfileSvg/Group.svg';
import Settings from '../../assets/ProfileSvg/settings.svg';
import Feedback from '../../assets/ProfileSvg/feedback.svg';
import Contact from '../../assets/ProfileSvg/contact.svg';
import Committe from '../../assets/ProfileSvg/committe.svg';
import Help from '../../assets/ProfileSvg/help.svg';
import HouseOwners from '../../assets/ProfileSvg/HouseOwners.svg';
import Logout from '../../assets/ProfileSvg/logout.svg';
import RateStar from '../../assets/ProfileSvg/star.svg';

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
          title="Business Information"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Group />}
          onPress={() => props.navigation.navigate('Business Infoo')}
        />
        <ProfileComponents
          title="Committee"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Committe />}
          onPress={() => props.navigation.navigate('Committee')}
        />
        <ProfileComponents
          title="House Owners"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<HouseOwners />}
          onPress={() => props.navigation.navigate('House Owners')}
        />
        <ProfileComponents
          title="Helpline"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Help />}
          onPress={() => props.navigation.navigate('Helpline')}
        />
        <Divider style={styles.Divider} color="#FFEBD9" width={1} />
        <ProfileComponents
          title="Settings"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Settings />}
          onPress={() => props.navigation.navigate('Settings')}
        />
        <Divider style={styles.Divider} color="#FFEBD9" width={1} />
        <ProfileComponents
          title="Contact Us"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Contact />}
          onPress={() => props.navigation.navigate('Contact Us')}
        />
        <ProfileComponents
          title="Rate Us"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<RateStar />}
          onPress={() => props.navigation.navigate('Rate Us')}
        />
        <ProfileComponents
          title="Feedbacks"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Feedback />}
        />
        <ProfileComponents
          title="Log Out"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Logout />}
          onPress={() =>
            props.navigation.dispatch(
              CommonActions.reset({
                routes: [{name: 'Login'}],
              }),
            )
          }
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
