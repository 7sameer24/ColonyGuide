import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../../constants';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import ProfileComponents from '../../../Components/ProfileComponents';
import {Image, Divider} from 'react-native-elements';
import Group from '../../../../assets/ProfileSvg/Group.svg';
import Settings from '../../../../assets/ProfileSvg/settings.svg';
import Help from '../../../../assets/ProfileSvg/help.svg';
import HouseOwners from '../../../../assets/ProfileSvg/HouseOwners.svg';
import Logout from '../../../../assets/ProfileSvg/logout.svg';
import {navigationStateType, useApp} from '../../../../Context/AppContext';
import Event from '../../../../assets/ProfileSvg/event.svg';
import Gallery from '../../../../assets/ProfileSvg/Gallery.svg';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../../Components/Toast';

const AdminCustomDrawer = props => {
  const {adminData, setAdminData, setAdminToken, setNavigationState} = useApp();
  const toast = useToast();

  const clearLogin = () => {
    setNavigationState(navigationStateType.AUTH);
    setAdminData(null);
    setAdminToken(null);
    Toast(toast, 'Logout Successfully');
  };

  return (
    <View style={genericStyles.fill}>
      <DrawerContentScrollView>
        <View style={styles.ProfileContanier}>
          <View style={genericStyles.column}>
            <View style={genericStyles.column}>
              <TouchableOpacity>
                <Image
                  source={Images.Ellipse}
                  containerStyle={styles.ImageStyle}
                />
                <Text style={styles.subTitle}>{adminData.userData.name}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ProfileComponents
          title="Our Business"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Group />}
          onPress={() => props.navigation.navigate('Business listed')}
        />
        <ProfileComponents
          title="Resident"
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
        <Divider style={styles.Divider} color="#F3EBF9" width={1} />
        <ProfileComponents
          title="Change Password"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Settings />}
        />
        <Divider style={styles.Divider} color="#F3EBF9" width={1} />
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
        <ProfileComponents
          iconView={genericStyles.mb(10)}
          title="Log Out"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Logout />}
          onPress={() => clearLogin()}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default AdminCustomDrawer;

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
