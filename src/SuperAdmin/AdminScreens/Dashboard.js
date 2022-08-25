import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
import Commercials from '../../../assets/adminSvg/Commercials.svg';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';
import Spinner from '../../Components/Spinner';
const Dashboard = ({navigation}) => {
  const toast = useToast();
  const {adminToken} = useApp();
  const [data, updateData] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const {data} = await axios(BaseURL('admin-dashboard'), {
  //       method: 'post',
  //       data: {
  //         locality_id: 1,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${adminToken}`,
  //       },
  //     });
  //     if (data.success) {
  //       updateData(data.dashboardData);
  //     }
  //   } catch (error) {
  //     Toast(toast, error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <View style={genericStyles.container}>
      <View style={[styles.container, genericStyles.shadow]}>
        <Text style={styles.heading}>Dashboard</Text>
      </View>
      {data ? (
        <>
          <ScrollView
            horizontal
            style={{flexGrow: 0}}
            showsHorizontalScrollIndicator={false}>
            <View style={genericStyles.row}>
              <CounterBox
                title="Total"
                color="#FF6F91"
                subTitle="Registered"
                totalNumber={data.total_user}
                SvgComponent={TotalRegistered}
              />
              <CounterBox
                title="Total"
                color="#D65DB1"
                subTitle="Residence"
                SvgComponent={TotalResident}
                totalNumber={data.total_house_owner}
              />
              <CounterBox
                title="Total"
                color="#FF8066"
                SvgComponent={TotalService}
                subTitle="Service Providers"
                totalNumber={data.total_service}
              />
              <CounterBox
                title="Total"
                color="#00C2A8"
                subTitle="Student"
                SvgComponent={Student}
                totalNumber={data.total_student}
              />
            </View>
          </ScrollView>
          <View style={genericStyles.mh(24)}>
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
                navigation.navigate('Add event', {adminToken: adminToken})
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
              onPress={() => navigation.navigate('BlockUnblock')}
            />
            <SelectTask
              title="Block"
              SvgCompoent={Block}
              onPress={() => navigation.navigate('BlockUnblock')}
            />
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
    marginLeft: 10,
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
