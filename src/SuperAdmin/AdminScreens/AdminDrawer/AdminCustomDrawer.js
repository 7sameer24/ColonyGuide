import {StyleSheet, Text, View} from 'react-native';
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
import DropDownComponent from '../../../Components/DropDownComponent';
import {useState} from 'react';
import BaseURL from '../../../constants/BaseURL';
import axios from 'axios';
import {useEffect} from 'react';

const AdminCustomDrawer = props => {
  const toast = useToast();
  const [LocalityValue, setLocality] = useState(1);
  const [localityData, setLocalityData] = useState([]);
  const {
    adminData,
    setAdminData,
    setAdminToken,
    setNavigationState,
    onRefresh,
    setRefresh,
  } = useApp();

  const clearLogin = () => {
    setNavigationState(navigationStateType.AUTH);
    setAdminToken(null);
    setAdminData(null);
    Toast(toast, 'Logout Successfully');
  };
  const updateResponse = ID => {
    adminData.userData.locality_id = ID ? ID : '1';
    setLocality(1);
    return true;
  };

  const CategoryFetch = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      setLocalityData(response.data.localities);
      updateResponse();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    adminData.userData.app_role_id === 6 && CategoryFetch();
    return () => {
      setLocalityData([]);
    };
  }, []);

  return (
    <View style={genericStyles.fill}>
      <DrawerContentScrollView>
        <View style={styles.ProfileContanier}>
          <View style={genericStyles.column}>
            <View style={genericStyles.column}>
              <Image
                source={Images.Ellipse}
                containerStyle={styles.ImageStyle}
              />
              <Text style={styles.subTitle}>{adminData.userData.name}</Text>
              {adminData.userData.app_role_id === 6 && (
                <DropDownComponent
                  data={localityData}
                  labelField="name"
                  valueField="id"
                  placeholder="Select Locality"
                  value={LocalityValue}
                  maxHeight={100}
                  onChange={item => {
                    setLocality(item.id);
                    updateResponse(item.id);
                    setRefresh(!onRefresh);
                    Toast(
                      toast,
                      `Locality successfully changed to ${item.name}!`,
                    );
                  }}
                />
              )}
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

        <Divider style={styles.Divider} color="#F3EBF9" width={1} />
        {/* <ProfileComponents
        //   title="Change Password"
        //   ImageContainer={styles.DrawerIcon}
        //   IconSvg={<Settings />}
        // /> */}
        <ProfileComponents
          onPress={() => props.navigation.navigate('Gallery')}
          IconSvg={<Gallery />}
          title="Gallery"
        />
        <ProfileComponents
          onPress={() => props.navigation.navigate('Events')}
          IconSvg={<Event />}
          title="Events"
        />
        <Divider style={styles.Divider} color="#F3EBF9" width={1} />
        <ProfileComponents
          title="Helpline"
          ImageContainer={styles.DrawerIcon}
          IconSvg={<Help />}
          onPress={() => props.navigation.navigate('Helpline')}
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
    marginTop: 10,
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
