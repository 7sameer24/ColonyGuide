import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import HeaderBar from '../Components/HeaderBar';
import {Image, Divider} from 'react-native-elements';
import ProfileComponents from '../Components/ProfileComponents';
import IconImg from '../../assets/ProfileSvg/PD.svg';
import Group from '../../assets/ProfileSvg/Group.svg';
import Service from '../../assets/ProfileSvg/service.svg';
import Settings from '../../assets/ProfileSvg/settings.svg';
import Feedback from '../../assets/ProfileSvg/feedback.svg';
import Terms from '../../assets/ProfileSvg/TC.svg';
import Contact from '../../assets/ProfileSvg/contact.svg';
import AddMember from '../../assets/ProfileSvg/AddMember.svg';
import MM from '../../assets/ProfileSvg/MM.svg';
import Event from '../../assets/ProfileSvg/event.svg';
import Gallery from '../../assets/ProfileSvg/Gallery.svg';
import DeleteAccount from '../../assets/ProfileSvg/DeleteAccount.svg';
import Poweredby from '../Components/Poweredby';
import {navigationStateType, useApp} from '../../Context/AppContext';
import axios from 'axios';
import BaseURL from '../constants/BaseURL';
import SpinnerModal from '../Components/SpinnerModal';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../Components/Toast';

const ProfileScreen = ({navigation}) => {
  const {
    Userdata,
    UserToken,
    setNavigationState,
    setCheckStatus,
    setNewData,
    checkStatus,
    setIsLoginPop,
    updateGSaveLocalID,
    setUserToken,
    updateResumeDtails,
  } = useApp();
  const [loading, updateLoading] = useState(false);
  const toast = useToast();
  const checkBusinessStauts = async () => {
    try {
      const response = await axios(BaseURL('check-business'), {
        method: 'post',
        data: {user_id: Userdata.userData.id},
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      setCheckStatus(response.data.businessStatus);
    } catch (error) {
      alert(error);
    }
  };

  Userdata === null
    ? null
    : useEffect(() => {
        checkBusinessStauts();
        return () => {
          setCheckStatus('');
        };
      }, []);

  const backToLogin = () => {
    updateGSaveLocalID(null);
    setNavigationState(navigationStateType.AUTH);
  };

  const openLockAlert = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account ?',
      [
        {text: 'Ok', onPress: () => deleteAccount()},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const deleteAccount = async () => {
    try {
      updateLoading(true);
      const response = await axios(BaseURL('delete-account'), {
        method: 'post',
        data: {
          user_id: Userdata.userData.id,
        },
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      updateLoading(false);
      if (response.data.success) {
        setNavigationState(navigationStateType.AUTH);
        setNewData(null);
        setUserToken(null);
        updateGSaveLocalID(null);
        updateResumeDtails(null);
        Toast(toast, response.data.message);
      }
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        title="Profile"
        navigation={navigation}
        firstIcon="menu"
        searchIcon="cart"
        ThirdType="ionicon"
        firstOnpress={() => navigation.toggleDrawer()}
      />
      {Userdata !== null ? (
        <ScrollView>
          <View style={styles.ProfileContanier}>
            <View style={genericStyles.column}>
              <Image
                source={
                  Userdata.userData.app_role_id == 2
                    ? {uri: Userdata.userData.logo_image}
                    : Userdata.userData.profile_image ===
                      'https://admin.colonyguide.com/storage'
                    ? Images.Ellipse
                    : {uri: Userdata.userData.profile_image}
                }
                placeholderStyle={genericStyles.bg(COLORS.white)}
                PlaceholderContent={
                  <ActivityIndicator color={COLORS.primary} />
                }
                containerStyle={styles.ImageStyle}
              />
              <View style={[genericStyles.column, {alignSelf: 'center'}]}>
                <Text
                  style={
                    Userdata.userData.app_role_id === 4 || 1
                      ? styles.Vtitle
                      : styles.title
                  }>
                  {Userdata.userData.app_role_id === 4
                    ? Userdata.userData.mobile_no
                    : Userdata.userData.name}
                </Text>
                {Userdata.userData.app_role_id === 4 || 1 ? null : (
                  <Text style={styles.subTitle}>
                    {Userdata.userData.shop_name}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <Divider style={genericStyles.ml(22)} color="#F3EBF9" width={1} />
          {Userdata.userData.app_role_id === 4 ? (
            Userdata.userData.app_role_id == 1 ? (
              <ProfileComponents
                onPress={() =>
                  navigation.navigate('Personal Details', {
                    userID: Userdata.userData.id,
                    userToken: UserToken,
                  })
                }
                iconName="chevron-forward-outline"
                IconSvg={<IconImg />}
                title="Personal Details"
              />
            ) : null
          ) : (
            <>
              <ProfileComponents
                onPress={() =>
                  navigation.navigate('Personal Details', {
                    userID: Userdata.userData.id,
                    userToken: UserToken,
                  })
                }
                iconName="chevron-forward-outline"
                IconSvg={<IconImg />}
                title="Personal Details"
              />
              {Userdata.userData.app_role_id == 2 ||
              Userdata.userData.app_role_id == 1 ? null : (
                <ProfileComponents
                  onPress={() =>
                    checkStatus === 0
                      ? navigation.navigate('Business Infoo')
                      : navigation.navigate('Business Saved', {
                          userID: Userdata.userData.id,
                          userToken: UserToken,
                          Role: Userdata.userData.app_role_id,
                        })
                  }
                  iconName="chevron-forward-outline"
                  IconSvg={<Group />}
                  title="Business Information"
                />
              )}

              {Userdata.userData.app_role_id === 1 ? null : (
                <ProfileComponents
                  onPress={() =>
                    Userdata.userData.app_role_id === 2
                      ? navigation.navigate('ServiceSaved', {
                          userID: Userdata.userData.id,
                          userToken: UserToken,
                        })
                      : navigation.navigate('Service Info', {
                          userID: Userdata.userData.id,
                          Role: Userdata.userData.app_role_id,
                        })
                  }
                  iconName="chevron-forward-outline"
                  IconSvg={<Service />}
                  title={
                    Userdata.userData.app_role_id === 2
                      ? 'Service Information'
                      : 'Service Provider'
                  }
                />
              )}
              {Userdata.userData.app_role_id === 2 && (
                <ProfileComponents
                  onPress={() =>
                    navigation.navigate('Products List', {
                      userID: Userdata.userData.id,
                      userToken: UserToken,
                    })
                  }
                  iconName="chevron-forward-outline"
                  IconSvg={<AddMember />}
                  title="Add Products"
                />
              )}
              <ProfileComponents
                onPress={() =>
                  navigation.navigate('My Orders', {
                    userID: Userdata.userData.id,
                    userToken: UserToken,
                  })
                }
                iconName="chevron-forward-outline"
                IconSvg={<AddMember />}
                title="My Orders"
              />
              {Userdata.userData.app_role_id === 3 && (
                <>
                  <ProfileComponents
                    onPress={() =>
                      navigation.navigate('MyRooms', {
                        userID: Userdata.userData.id,
                        userToken: UserToken,
                      })
                    }
                    iconName="chevron-forward-outline"
                    IconSvg={<AddMember />}
                    title="Rooms/PG"
                  />
                  <ProfileComponents
                    onPress={() =>
                      navigation.navigate('Add Members', {
                        userID: Userdata.userData.id,
                        userToken: UserToken,
                      })
                    }
                    iconName="chevron-forward-outline"
                    IconSvg={<AddMember />}
                    title="Add Members"
                  />
                  <ProfileComponents
                    onPress={() => navigation.navigate('Matrimonial')}
                    iconName="chevron-forward-outline"
                    IconSvg={<MM />}
                    title="Matrimonial"
                  />
                  <ProfileComponents
                    onPress={() => navigation.navigate('Events')}
                    iconName="chevron-forward-outline"
                    IconSvg={<Event />}
                    title="Events"
                  />
                  <ProfileComponents
                    onPress={() => navigation.navigate('Gallery')}
                    iconName="chevron-forward-outline"
                    IconSvg={<Gallery />}
                    title="Gallery"
                  />
                </>
              )}
              <Divider style={styles.Divider} color="#F3EBF9" width={1} />
            </>
          )}
          <ProfileComponents
            onPress={() =>
              navigation.navigate('Settings', {
                userID: Userdata.userData.id,
                userToken: UserToken,
              })
            }
            iconName="chevron-forward-outline"
            IconSvg={<Settings />}
            title="Change Password"
          />
          <Divider style={styles.Divider} color="#F3EBF9" width={1} />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Feedback />}
            title="Feedback"
            onPress={() =>
              navigation.navigate('Feedback', {
                ID: Userdata.userData.id,
                token: UserToken,
              })
            }
          />
          <ProfileComponents
            onPress={() => navigation.navigate('Terms & Condition')}
            iconName="chevron-forward-outline"
            IconSvg={<Terms />}
            title="Terms & Condition"
          />
          <ProfileComponents
            onPress={() =>
              navigation.navigate('Contact Us', {
                userID: Userdata.userData.id,
                userToken: UserToken,
              })
            }
            iconName="chevron-forward-outline"
            IconSvg={<Contact />}
            title="Contact Us"
          />
          <ProfileComponents
            onPress={() => openLockAlert()}
            iconName="chevron-forward-outline"
            IconSvg={<DeleteAccount />}
            title="Delete your account"
            titleStyle={genericStyles.color(COLORS.red)}
          />
          <Divider style={styles.Divider2} color="#F3EBF9" width={1} />
          <Poweredby container={{flex: 0}} />
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={styles.ProfileContanier}>
            <View style={genericStyles.column}>
              <Image
                source={Images.Ellipse}
                containerStyle={styles.ImageStyle}
              />
              <View style={[genericStyles.column, {alignSelf: 'center'}]}>
                <TouchableOpacity onPress={() => backToLogin()}>
                  <Text style={styles.subTitle}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Divider style={genericStyles.ml(22)} color="#F3EBF9" width={1} />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<IconImg />}
            title="Personal Details"
            onPress={() => setIsLoginPop(true)}
          />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Group />}
            title="Business Information"
            onPress={() => setIsLoginPop(true)}
          />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Service />}
            title={'Add Service Provider'}
            onPress={() => setIsLoginPop(true)}
          />
          <Divider style={styles.Divider} color="#F3EBF9" width={1} />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Settings />}
            title="Change Password"
            onPress={() => setIsLoginPop(true)}
          />
          <Divider style={styles.Divider} color="#F3EBF9" width={1} />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Feedback />}
            title="Feedback"
            onPress={() => setIsLoginPop(true)}
          />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Terms />}
            title="Terms & Condition"
            onPress={() => setIsLoginPop(true)}
          />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Contact />}
            title="Contact Us"
            onPress={() => setIsLoginPop(true)}
          />
          <Divider style={styles.Divider2} color="#F3EBF9" width={1} />
          <Poweredby container={{flex: 0}} />
        </ScrollView>
      )}
      <SpinnerModal visible={loading} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  ProfileContanier: {
    // marginTop: 10,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
  },
  Vtitle: {
    color: COLORS.textColor,
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    marginBottom: 15,
  },
  subTitle: {
    color: '#666666',
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    marginBottom: 15,
    alignSelf: 'center',
  },
  Divider: {
    marginLeft: 22,
    marginTop: 20,
  },
  Divider2: {
    marginLeft: 22,
    marginTop: 20,
    marginBottom: 30,
  },
  ImageStyle: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    borderRadius: 40,
    marginBottom: 5,
  },
});
