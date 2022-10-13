import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import {useApp} from '../../../Context/AppContext';
import MatrimonialCard from '../Matrimonial/MatrimonialCard';
import NoDataAni from '../../Components/NoDataAni';
import SkeletonView from '../../Components/SkeletonView';
import {TouchableOpacity} from 'react-native';

const MMFemale = ({route}) => {
  const {UserToken} = useApp();
  const [loading, setIsloading] = useState(false);
  const [FemaleData, updateFemaleData] = useState([]);

  const fetchData = async () => {
    try {
      setIsloading(true);
      const response = await axios(BaseURL('matrimonial-list'), {
        method: 'post',
        data: {
          gender: route.name,
        },
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      setIsloading(false);
      if (response.data.success) {
        updateFemaleData(response.data.family_member);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return (
    <View style={genericStyles.Container}>
      {FemaleData.length > 0 && (
        <ScrollView>
          {FemaleData.map((newData, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                onPress={() =>
                  navigation.navigate('Member Information', {infoData: newData})
                }>
                <MatrimonialCard
                  key={index}
                  userId={newData.id}
                  index={index}
                  category={`Age: ${getAge(newData.dob)}`}
                  subTitle={newData.education}
                  title={newData.name}
                  phoneNumber={newData.mobile_no}
                  source={
                    newData.photo.includes('photo')
                      ? {uri: newData.photo}
                      : require('../../../assets/Image_not_available.png')
                  }
                />
              </TouchableOpacity>
            );
          })}
          <View style={genericStyles.height(20)} />
        </ScrollView>
      )}
      {loading && (
        <ScrollView>
          <SkeletonView />
          <View style={genericStyles.height(20)} />
        </ScrollView>
      )}
      {!loading && FemaleData.length == [] && <NoDataAni />}
    </View>
  );
};

export default MMFemale;

const styles = StyleSheet.create({});
