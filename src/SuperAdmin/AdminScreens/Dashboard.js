import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {useApp} from '../../../Context/AppContext';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import CounterBox from '../DashComponents/CounterBox';
import SelectTask from '../DashComponents/SelectTask';
import Student from '../../../assets/adminSvg/Student.svg';
import TotalRegistered from '../../../assets/adminSvg/TotalRegistered.svg';
import TotalResident from '../../../assets/adminSvg/TotalResident.svg';
import TotalService from '../../../assets/adminSvg/TotalService.svg';
import GalleryUpdate from '../../../assets/adminSvg/GalleryUpdate.svg';
import AddEvent from '../../../assets/adminSvg/AddEvent.svg';
import Approval from '../../../assets/adminSvg/Approval.svg';
import SendNotification from '../../../assets/adminSvg/SendNotification.svg';
import Block from '../../../assets/adminSvg/Block.svg';
import AddUser from '../../../assets/adminSvg/AddUser.svg';
import Commercials from '../../../assets/adminSvg/Commercials.svg';
import Spinner from '../../Components/Spinner';
import {Icon} from 'react-native-elements';
const Dashboard = ({navigation}) => {
  const {adminToken, adminData, onRefresh} = useApp();
  const [data, updateData] = useState([]);

  const fetchData = async () => {
    try {
      const {data} = await axios(BaseURL('admin-dashboard'), {
        method: 'post',
        data: {
          locality_id: adminData.userData.locality_id
            ? adminData.userData.locality_id
            : 1,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (data.success) {
        updateData(data.dashboardData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [onRefresh]);

  return (
    <View style={genericStyles.container}>
      <View style={[styles.container, genericStyles.shadow]}>
        <View style={[genericStyles.row, {alignItems: 'center',marginTop:Platform.OS ==='ios'? 30 : 0}]}>
          <Icon
            color={COLORS.white}
            name="menu"
            type="ionicon"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
          <Text style={styles.heading}>Dashboard</Text>
        </View>
      </View>
      {Object.keys(data).length > 0 ? (
        <>
          <ScrollView
            horizontal
            style={{flexGrow: 0}}
            showsHorizontalScrollIndicator={false}>
            <View style={[genericStyles.row, {marginHorizontal: 20}]}>
              <CounterBox
                title="Total"
                color="#FF6F91"
                subTitle="Registered"
                todayNumber={data.today_user}
                totalNumber={data.total_user}
                activeNumber={data.active_user}
                deactiveNumber={data.deactive_user}
                SvgComponent={TotalRegistered}
              />
              <CounterBox
                title="Total"
                color="#00C2A8"
                subTitle="Residence"
                SvgComponent={TotalResident}
                todayNumber={data.today_house_owner}
                activeNumber={data.active_house_owner}
                deactiveNumber={data.deactive_house_owner}
                totalNumber={data.total_house_owner}
              />
              <CounterBox
                title="Total"
                color="#FF8066"
                SvgComponent={TotalService}
                subTitle="Service Providers"
                totalNumber={data.total_service}
                todayNumber={data.today_service}
                activeNumber={data.active_service}
                deactiveNumber={data.deactive_service}
              />
              <CounterBox
                title="Total"
                color="#D65DB1"
                subTitle="Student"
                SvgComponent={Student}
                totalNumber={data.total_student}
                todayNumber={data.today_student}
                activeNumber={data.active_student}
                deactiveNumber={data.deactive_student}
              />
            </View>
          </ScrollView>
          <View style={genericStyles.ml(30)}>
            <Text style={styles.topText}>Select Task</Text>
          </View>
          <View style={styles.container2}>
            <SelectTask
              title="Gallery"
              SvgCompoent={GalleryUpdate}
              onPress={() =>
                navigation.navigate('Admin gallery', {adminToken: adminToken})
              }
            />
            <SelectTask
              title="Event Add"
              SvgCompoent={AddEvent}
              onPress={() =>
                navigation.navigate('Event', {adminToken: adminToken})
              }
            />
            <SelectTask
              title="Approval"
              SvgCompoent={Approval}
              onPress={() => navigation.navigate('Approvals')}
            />
            <SelectTask
              title="Notification"
              SvgCompoent={SendNotification}
              onPress={() => navigation.navigate('Admin notification')}
            />
            <SelectTask
              title="Commercial"
              SvgCompoent={Commercials}
              onPress={() => navigation.navigate('Commercials')}
            />
            <SelectTask
              title="Block"
              SvgCompoent={Block}
              onPress={() => navigation.navigate('BlockUnblock')}
            />
            {adminData.userData.app_role_id == 6 && (
              <SelectTask
                title="Add Admin User"
                SvgCompoent={AddUser}
                onPress={() =>
                  navigation.navigate('Admin List', {
                    adminToken: adminToken,
                    adminData: adminData,
                  })
                }
              />
            )}
          </View>
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  heading: {
    fontFamily: FONTS.InterMedium,
    fontSize: 20,
    color: COLORS.white,
    marginLeft: 20,
  },
  container: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginBottom: 20,
  },
  text: {
    fontFamily: FONTS.InterMedium,
    fontSize: 20,
    color: COLORS.white,
  },
  text2: {
    fontFamily: FONTS.InterMedium,
    fontSize: 12,
    color: COLORS.black,
    textAlign: 'left',
  },
  topText: {
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginLeft: 5,
    marginTop: 20,
  },
  container2: {
    flex: 1,
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
