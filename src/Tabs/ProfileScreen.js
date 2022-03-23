import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
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

const ProfileScreen = ({navigation}) => {
  // const arr = [
  //   {source:<IconImg />,title:"Personal Details",onPressText:'Personal Details',iconName:"chevron-forward-outline"},
  //   {source:<Group />,title:"Business Info",onPressText:'Business Infoo',iconName:"chevron-forward-outline"},
  //   {source:<Service />,title:"Service Info",onPressText:'Service Info',iconName:"chevron-forward-outline"},
  //   {source:<Settings />,title:"Settings",onPressText:'Settings',iconName:"chevron-forward-outline"},
  //   {source:<Feedback />,title:"Feedbacks",iconName:"chevron-forward-outline"},
  //   {source:<Terms />,title:"Terms & Condition",onPressText:'Terms & Condition',iconName:"chevron-forward-outline"},
  //   {source:<Contact />,title:"Contact Us",onPressText:'Contact Us',iconName:"chevron-forward-outline"},
  // ]
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        title="Profile"
        navigation={navigation}
        firstIcon="menu"
        firstOnpress={() => navigation.toggleDrawer()}
      />
      <ScrollView>
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
          IconSvg={<IconImg />}
          title="Personal Details"
        />
        <ProfileComponents
          onPress={() => navigation.navigate('Business Infoo')}
          iconName="chevron-forward-outline"
          IconSvg={<Group />}
          title="Business Information"
        />
        <ProfileComponents
          onPress={() => navigation.navigate('Service Info')}
          iconName="chevron-forward-outline"
          IconSvg={<Service />}
          title="Add Service Provider"
        />
        <Divider style={styles.Divider} color="#FFEBD9" width={1} />
        <ProfileComponents
          onPress={() => navigation.navigate('Settings')}
          iconName="chevron-forward-outline"
          IconSvg={<Settings />}
          title="Settings"
        />
        <Divider style={styles.Divider} color="#FFEBD9" width={1} />
        <ProfileComponents
          iconName="chevron-forward-outline"
          IconSvg={<Feedback />}
          title="Feedbacks"
        />
        <ProfileComponents
          onPress={() => navigation.navigate('Terms & Condition')}
          iconName="chevron-forward-outline"
          IconSvg={<Terms />}
          title="Terms & Condition"
        />
        <ProfileComponents
          onPress={() => navigation.navigate('Contact Us')}
          iconName="chevron-forward-outline"
          IconSvg={<Contact />}
          title="Contact Us"
        />
        <Divider style={styles.Divider} color="#FFEBD9" width={1} />
        <Poweredby textStyle={genericStyles.mt(30)} />
      </ScrollView>
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
