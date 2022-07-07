import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import {useApp} from '../../../Context/AppContext';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import MatrimonialCard from '../Matrimonial/MatrimonialCard';
import Spinner from '../../Components/Spinner';
import NoDataAni from '../../Components/NoDataAni';

const MMMale = ({route}) => {
  const {UserToken} = useApp();
  const [loading, setIsloading] = useState(false);
  const [maleData, updateMaleData] = useState([]);

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
        updateMaleData(response.data.family_member);
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
      {maleData.length > 0 && (
        <ScrollView>
          {maleData.map((newData, index) => (
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
      {loading && <Spinner />}
      {!loading && maleData.length == [] && <NoDataAni />}
    </View>
  );
};

export default MMMale;

const styles = StyleSheet.create({});
