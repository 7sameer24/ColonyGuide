import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {useApp} from '../../../Context/AppContext';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import CounterBox from '../DashComponents/CounterBox';
import SelectTask from '../DashComponents/SelectTask';

const Dashbord = ({navigation}) => {
  const {adminToken} = useApp();
  // const fetchData = async () => {
  //   const {data} = await axios(BaseURL('admin-user-data'), {
  //     data: {
  //       locality_id: 1,
  //     },
  //     headers: {
  //       Authorization: `Bearer ${adminToken}`,
  //     },
  //   });
  //   console.log(data)
  // };

  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (
    <View style={genericStyles.container}>
      <View style={[styles.container, genericStyles.shadow]}>
        <Text style={styles.heading}>Dashbord</Text>
      </View>
      <View
        style={[
          genericStyles.row,
          {justifyContent: 'space-evenly', marginBottom: 20},
        ]}>
        <CounterBox text="Total Registered" color="#FF6F91" />
        <CounterBox />
      </View>
      <View
        style={[
          genericStyles.row,
          {justifyContent: 'space-evenly', marginBottom: 20},
        ]}>
        <CounterBox />
        <CounterBox />
      </View>
      <View style={genericStyles.mh(24)}>
        <Text style={styles.topText}>Select Task</Text>
      </View>
      <View style={styles.container2}>
        <SelectTask onPress={() => navigation.navigate('Admin gallery')} />
        <SelectTask onPress={() => navigation.navigate('Add event')} />
        <SelectTask />
        <SelectTask onPress={() => navigation.navigate('Admin notification')} />
        <SelectTask />
      </View>
    </View>
  );
};

export default Dashbord;

const styles = StyleSheet.create({
  heading: {
    fontFamily: FONTS.InterMedium,
    fontSize: 20,
    color: COLORS.white,
    marginLeft: 24,
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
  },
  container2: {
    flex: 1,
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
