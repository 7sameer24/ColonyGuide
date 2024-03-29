import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import HeaderBar from '../../Components/HeaderBar';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import Poweredby from '../../Components/Poweredby';
import BaseURL from '../../constants/BaseURL';
import {Image} from 'react-native-elements';

const ProfileDetails = ({navigation, route}) => {
  const {userID, userToken} = route.params;
  const [userData, setUserData] = useState('');

  const idx = async () => {
    try {
      const response = await axios(BaseURL('user-profile-data'), {
        method: 'post',
        data: {user_id: userID},
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUserData(response.data.profileData);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setUserData('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {userData !== '' ? (
        <>
          <HeaderBar
            firstIcon="arrow-back-outline"
            title="Personal Details"
            bellIcon="create-outline"
            ThirdType="ionicon"
            thirdOnpress={() =>
              navigation.navigate('Edit Personal Details', {
                data: userData,
                token: userToken,
              })
            }
            firstOnpress={() => navigation.goBack()}
          />
          <ScrollView>
            <View>
              <Image
                source={
                  userData.app_role_id == 2
                    ? {uri: userData.logo_image}
                    : userData.profile_image ===
                      'https://admin.colonyguide.com/storage'
                    ? Images.Ellipse
                    : {uri: userData.profile_image}
                }
                placeholderStyle={genericStyles.bg(COLORS.white)}
                PlaceholderContent={
                  <ActivityIndicator color={COLORS.primary} />
                }
                containerStyle={styles.ImageStyle}
              />
            </View>
            <View style={styles.midd}>
              <Text style={styles.text}>Your Name</Text>
              <View style={styles.viewCon}>
                <Text style={styles.full}>{userData.name}</Text>
              </View>
              <Text style={styles.text}>Mobile Number</Text>
              <View style={styles.viewCon}>
                <Text style={styles.full}>{userData.mobile_no}</Text>
              </View>
              <Text style={styles.text}>Email</Text>
              <View style={styles.viewCon}>
                <Text style={styles.full}>{userData.email}</Text>
              </View>
              <Text style={styles.text}>
                {userData.app_role_id === 1 ? 'Hostel Name' : 'Address'}
              </Text>
              <View style={[styles.viewCon]}>
                <Text style={[styles.full, {width: '85%'}]}>
                  {userData.app_role_id === 1
                    ? userData.hostel_name
                    : `${userData.house_no === null ? '' : userData.house_no} ${
                        userData.address === null ? '' : userData.address
                      } ${userData.landmark === null ? '' : userData.landmark}`}
                </Text>
              </View>
              {userData.app_role_id === 1 ? (
                <>
                  <Text style={styles.text}>Hostel Address</Text>
                  <View style={[styles.viewCon, {marginBottom: 30}]}>
                    <Text style={[styles.full, {width: '85%'}]}>
                      {userData.hostel_address}
                    </Text>
                  </View>
                </>
              ) : null}
              {userData.app_role_id === 1 ? null : (
                <>
                  <Text style={styles.text}>Locality</Text>
                  <View style={styles.viewCon}>
                    <Text style={styles.full}>{userData.localityName}</Text>
                  </View>
                </>
              )}
            </View>
            <Poweredby />
          </ScrollView>
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  ImageStyle: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 100,
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
    marginTop: 10,
    marginHorizontal: 30,
  },
  full: {
    fontSize: 14,
    color: '#666666',
    fontFamily: FONTS.InterMedium,
  },
  viewCon: {
    borderRadius: 8,
    backgroundColor: '#F3EBF9',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});
