import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import ProfileComponents from './ProfileComponents';
import {Image, Divider} from 'react-native-elements';
import Group from '../../assets/ProfileSvg/Group.svg';
import Settings from '../../assets/ProfileSvg/settings.svg';
import Feedback from '../../assets/ProfileSvg/feedback.svg';
import Contact from '../../assets/ProfileSvg/contact.svg';
import Committe from '../../assets/ProfileSvg/committe.svg';
import Help from '../../assets/ProfileSvg/help.svg';
import HouseOwners from '../../assets/ProfileSvg/HouseOwners.svg';
import Logout from '../../assets/ProfileSvg/logout.svg';
import {navigationStateType, useApp} from '../../Context/AppContext';
import Terms from '../../assets/ProfileSvg/TC.svg';
import MM from '../../assets/ProfileSvg/MM.svg';
import Event from '../../assets/ProfileSvg/event.svg';
import Gallery from '../../assets/ProfileSvg/Gallery.svg';
import {useToast} from 'react-native-toast-notifications';
import Toast from './Toast';

const CustomDrawer = props => {
  const {
    Userdata,
    UserToken,
    setNewData,
    setUserToken,
    setNavigationState,
    setIsLoginPop,
    updateGSaveLocalID,
    updateResumeDtails,
  } = useApp();
  const toast = useToast();

  const backToLogin = () => {
    updateGSaveLocalID(null);
    setNavigationState(navigationStateType.AUTH);
  };
  const clearLogin = () => {
    setNavigationState(navigationStateType.AUTH);
    setNewData(null);
    setUserToken(null);
    updateGSaveLocalID(null);
    updateResumeDtails(null);
    Toast(toast, 'Logout Successfully');
  };
  return (
    <View style={genericStyles.fill}>
      <DrawerContentScrollView showsVerticalScrollIndicator={false}>
        {Userdata !== null ? (
          <>
            <View style={styles.ProfileContanier}>
              <View style={genericStyles.column}>
                <TouchableOpacity
                  activeOpacity={Userdata.userData.app_role_id === 4 && 2}
                  onPress={() =>
                    Userdata.userData.app_role_id === 4
                      ? null
                      : props.navigation.navigate('Personal Details', {
                          userID: Userdata.userData.id,
                          userToken: UserToken,
                        })
                  }>
                  <Image
                    placeholderStyle={genericStyles.bg(COLORS.white)}
                    PlaceholderContent={
                      <ActivityIndicator color={COLORS.primary} />
                    }
                    source={
                      Userdata.userData.app_role_id == 2
                        ? {uri: Userdata.userData.logo_image}
                        : Userdata.userData.profile_image ===
                          'https://colonyguide.com/portal/storage'
                        ? Images.Ellipse
                        : {uri: Userdata.userData.profile_image}
                    }
                    containerStyle={styles.ImageStyle}
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
                  <Text style={styles.subTitle}>View profile</Text>
                </TouchableOpacity>
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
            {Userdata.userData.app_role_id === 3 && (
              <>
                <ProfileComponents
                  onPress={() => props.navigation.navigate('Matrimonial')}
                  IconSvg={<MM />}
                  title="Matrimonial"
                />
                <ProfileComponents
                  onPress={() => props.navigation.navigate('Events')}
                  IconSvg={<Event />}
                  title="Events"
                />
                <ProfileComponents
                  onPress={() => props.navigation.navigate('Gallery')}
                  IconSvg={<Gallery />}
                  title="Gallery"
                />
              </>
            )}
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
            {/* <ProfileComponents
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
            /> */}
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
              iconView={genericStyles.mb(10)}
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
                <Image
                  source={Images.Ellipse}
                  containerStyle={styles.ImageStyle}
                />
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
              onPress={() => setIsLoginPop(true)}
            />
            <ProfileComponents
              title="Committee"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Committe />}
              onPress={() => setIsLoginPop(true)}
            />

            <ProfileComponents
              title="Resident"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<HouseOwners />}
              onPress={() => setIsLoginPop(true)}
            />

            <ProfileComponents
              title="Helpline"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Help />}
              onPress={() => setIsLoginPop(true)}
            />
            <Divider style={styles.Divider} color="#F3EBF9" width={1} />
            <ProfileComponents
              title="Change Password"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Settings />}
              onPress={() => setIsLoginPop(true)}
            />
            <Divider style={styles.Divider} color="#F3EBF9" width={1} />
            <ProfileComponents
              title="Contact Us"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Contact />}
              onPress={() => setIsLoginPop(true)}
            />
            <ProfileComponents
              title="Feedback"
              ImageContainer={styles.DrawerIcon}
              IconSvg={<Feedback />}
              onPress={() => setIsLoginPop(true)}
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
