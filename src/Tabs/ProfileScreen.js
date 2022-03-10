import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import HeaderBar from '../Components/HeaderBar';
import {Divider} from 'react-native-elements';
import ProfileComponents from '../Components/ProfileComponents';

const ProfileScreen = ({navigation}) => {
  // const arr = [
  //   {source:Images.Personal,title:"Personal Details",onPressText:'Personal Details',iconName:"chevron-forward-outline"},
  //   {source:Images.Business,title:"Business Info",onPressText:'Business Infoo',iconName:"chevron-forward-outline"},
  //   {source:Images.Service,title:"Service Info",onPressText:'Service Info',iconName:"chevron-forward-outline"},
  //   {source:Images.Settings,title:"Settings",onPressText:'Settings',iconName:"chevron-forward-outline"},
  //   {source:Images.Feedbacks,title:"Feedbacks",iconName:"chevron-forward-outline"},
  //   {source:Images.Terms,title:"Terms & Condition",onPressText:'Terms & Condition',iconName:"chevron-forward-outline"},
  //   {source:Images.Contact,title:"Contact Us",onPressText:'Contact Us',iconName:"chevron-forward-outline"},
  // ]
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        title="Profile"
        titleStyle={genericStyles.mr('60%')}
        navigation={navigation}
        firstIcon="menu"
        firstOnpress={() => navigation.toggleDrawer()}
      />
      <View style={styles.ProfileContanier}>
        <View style={genericStyles.column}>
          <Image source={Images.Profile} style={styles.ImageStyle} />
          <View style={[genericStyles.column, {alignSelf: 'center'}]}>
            <Text style={styles.title}>Jane Cooper</Text>
            <Text style={styles.subTitle}>Service provider</Text>
          </View>
        </View>
      </View>
      <Divider style={genericStyles.ml(22)} color="#FFEBD9" width={1} />
      <ProfileComponents
        onPress={() => navigation.navigate('Personal Details')}
        iconName="chevron-forward-outline"
        source={Images.Personal}
        title="Personal Details"
      />
      <ProfileComponents
        onPress={() => navigation.navigate('Business Infoo')}
        iconName="chevron-forward-outline"
        source={Images.Business}
        title="Business Info"
      />
      <ProfileComponents
        onPress={() => navigation.navigate('Service Info')}
        iconName="chevron-forward-outline"
        source={Images.Service}
        title="Service Info"
      />
      <Divider style={styles.Divider} color="#FFEBD9" width={1} />
      <ProfileComponents
        onPress={() => navigation.navigate('Settings')}
        iconName="chevron-forward-outline"
        source={Images.Settings}
        title="Settings"
      />
      <Divider style={styles.Divider} color="#FFEBD9" width={1} />
      <ProfileComponents
        iconName="chevron-forward-outline"
        source={Images.Feedbacks}
        title="Feedbacks"
      />
      <ProfileComponents
        onPress={() => navigation.navigate('Terms & Condition')}
        iconName="chevron-forward-outline"
        source={Images.Terms}
        title="Terms & Condition"
      />
      <ProfileComponents
        onPress={() => navigation.navigate('Contact Us')}
        iconName="chevron-forward-outline"
        source={Images.Contact}
        title="Contact Us"
      />
      <Divider style={styles.Divider} color="#FFEBD9" width={1} />
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
  subTitle: {
    color: '#666666',
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    marginBottom: 25,
  },
  Divider: {
    marginLeft: 22,
    marginTop: 20,
  },
  ImageStyle: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
});
