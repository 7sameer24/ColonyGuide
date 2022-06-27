import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../../Components/HeaderBar';
import {genericStyles} from '../../constants';
import CategoriesList from './CategoriesList';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import BaseURL from '../../constants/BaseURL';
import {useApp} from '../../../Context/AppContext';
import EmptyView from '../../Components/EmptyView';

const CategoriesScreen = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loading, updateLoading] = useState(true);

  const {GSaveLocalID, Userdata} = useApp();

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'), {
        locality_id: GSaveLocalID
          ? GSaveLocalID
          : Userdata.userData.locality_id,
      });
      updateLoading(false);
      if (response.data.success) {
        setNewData(response.data.categories);
      } else {
        ToastAndroid.show(response.data.message);
      }
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setNewData([]);
    };
  }, []);
  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        title="Categories"
        // searchIcon="search"
        navigation={navigation}
        firstIcon="menu"
        firstOnpress={() => navigation.toggleDrawer()}
      />
      {newData.length > 0 && (
        <ScrollView>
          <CategoriesList
            cardContainer={genericStyles.mh(30)}
            ViewContainer={genericStyles.mt(20)}
            navigation={navigation}
            data={newData}
          />
        </ScrollView>
      )}
      {loading && <Spinner />}
      {!loading && newData.length == [] && (
        <EmptyView heading="No categories found for this locality" />
      )}
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
