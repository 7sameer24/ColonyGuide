import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import ProfileComponents from './ProfileComponents';
import {Divider} from 'react-native-elements';
import Group from '../../assets/ProfileSvg/Group.svg';
import Settings from '../../assets/ProfileSvg/settings.svg';
import Feedback from '../../assets/ProfileSvg/feedback.svg';
import Contact from '../../assets/ProfileSvg/contact.svg';
import Committe from '../../assets/ProfileSvg/committe.svg';
import Help from '../../assets/ProfileSvg/help.svg';
import HouseOwners from '../../assets/ProfileSvg/HouseOwners.svg';
import Logout from '../../assets/ProfileSvg/logout.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationStateType, useApp} from '../../Context/AppContext';
import Terms from '../../assets/ProfileSvg/TC.svg';

const CustomDrawer = props => {
  const {Userdata, UserToken, setNewData, setUserToken, setNavigationState} =
    useApp();

  const removeValue = async () => {
    const keys = ['UserLogin', 'UserToken'];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      alert(e);
    }
  };
  const backToLogin = () => {
    setNavigationState(navigationStateType.AUTH);
  };
  const clearLogin = () => {
    removeValue(), setNewData(null);
    setUserToken(null);
    setNavigationState(navigationStateType.AUTH);
    ToastAndroid.show('Logout Successfully', ToastAndroid.SHORT);
  };
  return (
    <View style={genericStyles.fill}>
      <DrawerContentScrollView>
        {Userdata !== null ? (
          <>
            <View style={styles.ProfileContanier}>
              <View style={genericStyles.column}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Personal Details', {
                      userID: Userdata.userData.id,
                      userToken: UserToken,
                    })
                  }>
                  <Image
                    source={
                      Userdata.userData.profile_image ===
                      'https://colonyguide.garimaartgallery.com/storage'
                        ? Images.Ellipse
                        : {uri: Userdata.userData.profile_image}
                    }
                    style={styles.ImageStyle}
                  />
                  {/* <View style={genericStyles.column}> */}
                  <Text
                    numberOfLines={1}
                    style={
                      Userdata.userData.app_role_id === 4
                        ? styles.Vtitle
                        : styles.title
                    }>
                    {Userdata.userData.app_role_id === 4
                      ? Userdata.userData.mobile_no
                      : Userdata.userData.name}
                  </Text>
                </TouchableOpacity>
                {/* {Userdata.userData.app_role_id === 4 ? null : (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Personal Details', {
                          userID: Userdata.userData.id,
                          userToken: UserToken,
                        })
                      }>
                      <Text style={styles.subTitle}>View profile</Text>
                    </TouchableOpacity>
                  )} */}
                {/* </View> */}
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
                title="Resident"
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
            <Divider style={styles.Divider} color="#F3EBF9" width={1} />
            <ProfileComponents
              title="Change Password"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Settings />}
              onPress={() =>
                props.navigation.navigate('Settings', {
                  userID: Userdata.userData.id,
                  userToken: UserToken,
                })
              }
            />
            <Divider style={styles.Divider} color="#F3EBF9" width={1} />
            <ProfileComponents
              title="Feedback"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Feedback />}
              onPress={() =>
                props.navigation.navigate('Feedback', {
                  ID: Userdata.userData.id,
                  token: UserToken,
                })
              }
            />
            <ProfileComponents
              onPress={() => props.navigation.navigate('Terms & Condition')}
              IconSvg={<Terms />}
              title="Terms & Condition"
            />
            <ProfileComponents
              title="Contact Us"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Contact />}
              onPress={() =>
                props.navigation.navigate('Contact Us', {
                  userID: Userdata.userData.id,
                  userToken: UserToken,
                })
              }
            />
            <ProfileComponents
              title="Log Out"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Logout />}
              onPress={() => clearLogin()}
            />
          </>
        ) : (
          <>
            <View style={styles.ProfileContanier}>
              <View style={genericStyles.column}>
                <Image source={Images.Ellipse} style={styles.ImageStyle} />
                <View style={genericStyles.column}>
                  <TouchableOpacity onPress={() => backToLogin()}>
                    <Text style={styles.subTitle}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ProfileComponents
              title="Business Information"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Group />}
              onPress={() => alert('Please Login')}
            />
            <ProfileComponents
              title="Committee"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Committe />}
              onPress={() => alert('Please Login')}
            />

            <ProfileComponents
              title="Resident"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<HouseOwners />}
              onPress={() => alert('Please Login')}
            />

            <ProfileComponents
              title="Helpline"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Help />}
              onPress={() => alert('Please Login')}
            />
            <Divider style={styles.Divider} color="#F3EBF9" width={1} />
            <ProfileComponents
              title="Change Password"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Settings />}
              onPress={() => alert('Please Login')}
            />
            <Divider style={styles.Divider} color="#F3EBF9" width={1} />
            <ProfileComponents
              title="Contact Us"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Contact />}
              onPress={() => alert('Please Login')}
            />
            <ProfileComponents
              title="Feedback"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Feedback />}
              onPress={() => alert('Please Login')}
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
    backgroundColor: '#F3EBF9',
    padding: 10,
    borderRadius: 7,
  },
  Divider: {
    marginLeft: 22,
    marginTop: 20,
  },
});
