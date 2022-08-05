import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import {useApp} from '../../../Context/AppContext';
import MatrimonialCard from '../Matrimonial/MatrimonialCard';
import NoDataAni from '../../Components/NoDataAni';
import SkeletonView from '../../Components/SkeletonView';

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

  return (
    <View style={genericStyles.Container}>
      {FemaleData.length > 0 && (
        <ScrollView>
          {FemaleData.map((newData, index) => (
            <MatrimonialCard
              key={index}
              userId={newData.id}
              index={index}
              category={`Looking for ${newData.looking_for}`}
              subTitle={newData.education}
              title={newData.name}
              phoneNumber={newData.mobile_no}
              source={
                newData.photo.includes('photo')
                  ? {uri: newData.photo}
                  : require('../../../assets/Image_not_available.png')
              }
            />
          ))}
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
