import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import HeaderBar from '../Components/HeaderBar';
import {Divider} from 'react-native-elements';
import ProfileComponents from '../Components/ProfileComponents';
import IconImg from '../../assets/ProfileSvg/PD.svg';
import Group from '../../assets/ProfileSvg/Group.svg';
import Service from '../../assets/ProfileSvg/service.svg';
import Settings from '../../assets/ProfileSvg/settings.svg';
import Feedback from '../../assets/ProfileSvg/feedback.svg';
import Terms from '../../assets/ProfileSvg/TC.svg';
import Contact from '../../assets/ProfileSvg/contact.svg';
import Poweredby from '../Components/Poweredby';
import {navigationStateType, useApp} from '../../Context/AppContext';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  const {Userdata, UserToken, setNavigationState} = useApp();
  const [checkStatus, setCheckStatus] = useState('');
  const isFocused = useIsFocused();
  console.log(isFocused);
  const checkBusinessStauts = async () => {
    try {
      const URL = 'https://colonyguide.garimaartgallery.com/api/check-business';
      const response = await axios(URL, {
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

  Userdata
    ? isFocused
      ? useEffect(() => {
          checkBusinessStauts();
          return () => {
            setCheckStatus('');
          };
        }, [])
      : useEffect(() => {
          checkBusinessStauts();
          return () => {
            setCheckStatus('');
          };
        }, [])
    : null;

  // const arr = [
  //   {source:<IconImg />,title:"Personal Details",onPressText:'Personal Details',iconName:"chevron-forward-outline"},
  //   {source:<Group />,title:"Business Info",onPressText:'Business Infoo',iconName:"chevron-forward-outline"},
  //   {source:<Service />,title:"Service Info",onPressText:'Service Info',iconName:"chevron-forward-outline"},
  //   {source:<Settings />,title:"Settings",onPressText:'Settings',iconName:"chevron-forward-outline"},
  //   {source:<Feedback />,title:"Feedbacks",iconName:"chevron-forward-outline"},
  //   {source:<Terms />,title:"Terms & Condition",onPressText:'Terms & Condition',iconName:"chevron-forward-outline"},
  //   {source:<Contact />,title:"Contact Us",onPressText:'Contact Us',iconName:"chevron-forward-outline"},
  // ]

  const backToLogin = () => {
    setNavigationState(navigationStateType.AUTH);
  };
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        title="Profile"
        navigation={navigation}
        firstIcon="menu"
        firstOnpress={() => navigation.toggleDrawer()}
      />
      {Userdata !== null ? (
        <ScrollView>
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
          <Divider style={genericStyles.ml(22)} color="#FFEBD9" width={1} />
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
                      : 'Add Service Provider'
                  }
                />
              )}
              <Divider style={styles.Divider} color="#FFEBD9" width={1} />
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
            title="Settings"
          />
          <Divider style={styles.Divider} color="#FFEBD9" width={1} />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Feedback />}
            title="Feedbacks"
            onPress={() =>
              navigation.navigate('Feedbacks', {
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
          <Divider style={styles.Divider} color="#FFEBD9" width={1} />
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={styles.ProfileContanier}>
            <View style={genericStyles.column}>
              <Image source={Images.Ellipse} style={styles.ImageStyle} />
              <View style={[genericStyles.column, {alignSelf: 'center'}]}>
                <TouchableOpacity onPress={() => backToLogin()}>
                  <Text style={styles.subTitle}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Divider style={genericStyles.ml(22)} color="#FFEBD9" width={1} />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<IconImg />}
            title="Personal Details"
            onPress={() => alert('Please Login')}
          />

          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Group />}
            title="Business Information"
            onPress={() => alert('Please Login')}
          />

          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Service />}
            title={'Add Service Provider'}
            onPress={() => alert('Please Login')}
          />
          <Divider style={styles.Divider} color="#FFEBD9" width={1} />

          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Settings />}
            title="Settings"
            onPress={() => alert('Please Login')}
          />
          <Divider style={styles.Divider} color="#FFEBD9" width={1} />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Feedback />}
            title="Feedbacks"
            onPress={() => alert('Please Login')}
          />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Terms />}
            title="Terms & Condition"
            onPress={() => alert('Please Login')}
          />
          <ProfileComponents
            iconName="chevron-forward-outline"
            IconSvg={<Contact />}
            title="Contact Us"
            onPress={() => alert('Please Login')}
          />
          <Divider style={styles.Divider} color="#FFEBD9" width={1} />
        </ScrollView>
      )}
      <Poweredby />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  ProfileContanier: {
    marginTop: 10,
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
    marginBottom: 25,
    alignSelf: 'center',
  },
  Divider: {
    marginLeft: 22,
    marginTop: 20,
  },
  ImageStyle: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    borderRadius: 40,
    marginBottom: 5,
  },
});
