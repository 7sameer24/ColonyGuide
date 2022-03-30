import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIslogin} from '../../Context/LoginContext';

const CustomDrawer = props => {
  const {Userdata, UserToken, setNewData} = useIslogin();
  // console.log(Userdata);

  const removeValue = async () => {
    const keys = ['UserLogin', 'UserToken'];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={genericStyles.fill}>
      <DrawerContentScrollView>
        {Userdata !== null ? (
          <>
            <View style={styles.ProfileContanier}>
              <View style={genericStyles.column}>
                <Image
                  source={
                    Userdata.userData.profile_image ===
                    'https://colonyguide.garimaartgallery.com/storage'
                      ? Images.Ellipse
                      : {uri: Userdata.userData.profile_image}
                  }
                  style={styles.ImageStyle}
                />
                <View style={genericStyles.column}>
                  <Text
                    style={
                      Userdata.userData.app_role_id === 4
                        ? styles.Vtitle
                        : styles.title
                    }>
                    {Userdata.userData.app_role_id === 4
                      ? Userdata.userData.mobile_no
                      : Userdata.userData.name}
                  </Text>
                  {Userdata.userData.app_role_id === 4 ? null : (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Personal Details', {
                          userID: Userdata.userData.id,
                          userToken: UserToken,
                        })
                      }>
                      <Text style={styles.subTitle}>View profile</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            {Userdata.userData.app_role_id === 4 || 1 ? null : (
              <ProfileComponents
                title="Business Information"
                ImageContainer={styles.DrawerIcon}
                IconSvg={<Group />}
                onPress={() => props.navigation.navigate('Business Infoo')}
              />
            )}
            <ProfileComponents
              title="Committee"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Committe />}
              onPress={() => props.navigation.navigate('Committee')}
            />
            {Userdata.userData.app_role_id === 4 ? null : (
              <ProfileComponents
                title="House Owners"
                ImageContainer={styles.DrawerIcon}
                IconSvg={<HouseOwners />}
                onPress={() => props.navigation.navigate('House Owners')}
              />
            )}
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
              title="Feedbacks"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Feedback />}
            />
            <ProfileComponents
              title="Log Out"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Logout />}
              onPress={() => {
                removeValue(), setNewData(null);
              }}
            />
          </>
        ) : (
          <>
            <View style={styles.ProfileContanier}>
              <View style={genericStyles.column}>
                <Image source={Images.Ellipse} style={styles.ImageStyle} />
                <View style={genericStyles.column}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.subTitle}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ProfileComponents
              title="Business Information"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Group />}
            />
            <ProfileComponents
              title="Committee"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Committe />}
            />

            <ProfileComponents
              title="House Owners"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<HouseOwners />}
            />

            <ProfileComponents
              title="Helpline"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Help />}
            />
            <Divider style={styles.Divider} color="#FFEBD9" width={1} />
            <ProfileComponents
              title="Settings"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Settings />}
            />
            <Divider style={styles.Divider} color="#FFEBD9" width={1} />
            <ProfileComponents
              title="Contact Us"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Contact />}
            />
            <ProfileComponents
              title="Feedbacks"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Feedback />}
            />
          </>
        )}
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  ProfileContanier: {
    marginTop: 20,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
    alignSelf: 'center',
    marginVertical: 5,
  },
  Vtitle: {
    color: COLORS.textColor,
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    alignSelf: 'center',
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
    borderRadius: 40,
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
