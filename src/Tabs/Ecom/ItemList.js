import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {genericStyles} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import {ScrollView} from 'react-native';
import SkeletonView from '../../Components/SkeletonView';
import NoDataAni from '../../Components/NoDataAni';
import MemberCard from '../Members/MemberCard';

const ItemList = ({navigation, route}) => {
  const [data, setUserData] = useState([]);
  const [loading, updateLoading] = useState(false);
  const {userID, userToken} = route.params;

  const fetchProducts = async () => {
    try {
      updateLoading(true);
      const response = await axios(BaseURL('product-list'), {
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
                category={newData.price}
                subTitle={newData.variation}
                title={newData.name}
                onEdit={() =>
                  navigation.navigate('Add Product', {
                    editData: newData,
                  })
                }
                source={{
                  uri: `https://admin.colonyguide.com/storage${newData.image}`,
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
      <ButtonComponent
        title="Add Product"
        ButtonContainer={genericStyles.width('90%')}
        onPress={() => navigation.navigate('Add Product')}
      />
      <Poweredby container={{flex: 0}} />
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({});
