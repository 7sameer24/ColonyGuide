import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import {ScrollView} from 'react-native';
import SkeletonView from '../../Components/SkeletonView';
import NoDataAni from '../../Components/NoDataAni';
import MemberCard from '../Members/MemberCard';
import moment from 'moment';

const MyOrders = ({navigation, route}) => {
  const [data, setUserData] = useState([]);
  const [loading, updateLoading] = useState(false);
  const {userID, userToken} = route.params;

  const fetchProducts = async () => {
    try {
      updateLoading(true);
      const response = await axios(BaseURL('order-list'), {
        method: 'post',
        data: {
          user_id: userID,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      updateLoading(false);
      if (response.data.success == true) {
        setUserData(response.data.data);
      }
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
    return () => {
      setUserData([]);
    };
  }, []);

  const timeFormatter = cell => {
    if (cell !== null || cell !== undefined) {
      let correctDate = moment(new Date(cell)).format('DD-MMM-YYYY');
      return correctDate;
    } else {
      return 'NA';
    }
  };

  return (
    <View style={genericStyles.Container}>
      {data.length > 0 && (
        <ScrollView>
          {data.map((newData, index) => {
            return (
              <MemberCard
                key={index}
                onProductDelete={true}
                fetchMemberList={fetchProducts}
                onUpdate={setUserData}
                userId={newData.user_id}
                id={newData.id}
                myOrders={true}
                subTitle={`${newData.product?.price} (${newData.product?.variation})`}
                category={timeFormatter(newData.created_at)}
                title={newData.product?.name}
                source={{
                  uri: `https://admin.colonyguide.com/storage${newData.product?.image}`,
                }}
              />
            );
          })}
          <View style={genericStyles.mb(20)} />
        </ScrollView>
      )}
      {loading && (
        <ScrollView>
          <SkeletonView />
          <View style={genericStyles.height(20)} />
        </ScrollView>
      )}
      {!loading && data.length == [] && <NoDataAni />}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
