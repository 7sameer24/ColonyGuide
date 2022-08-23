import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, genericStyles} from '../../constants';
import HeaderBar from '../../Components/HeaderBar';
import HouseOnwersList from '../../Components/HouseOnwersList';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import NoDataAni from '../../Components/NoDataAni';
import {useApp} from '../../../Context/AppContext';
import SkeletonView from '../../Components/SkeletonView';
import DropDownComponent from '../../Components/DropDownComponent';

const HouseOwners = ({navigation}) => {
  const [newData, setData] = useState([]);
  const [loading, updateLoading] = useState(true);
  const {Userdata, GSaveLocalID} = useApp();
  const [casteData, setCasteData] = useState([]);
  const [caste, setCaste] = useState([]);

  const idx = async casteId => {
    try {
      const response = await axios.post(BaseURL('house-owner-list'), {
        locality_id: GSaveLocalID
          ? GSaveLocalID
          : Userdata.userData.locality_id,
        caste_id: casteId,
      });
      updateLoading(false);
      if (response.data.success) {
        setData(response.data.houseowner);
      }
    } catch (error) {
      updateLoading(false);
      alert(error);
    }
  };

  const fetchCasteData = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      setCasteData(response.data.caste);
    } catch (error) {
      Toast(toast, error);
    }
  };

  useEffect(() => {
    idx();
    fetchCasteData();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      <HeaderBar
        firstIcon="arrow-back-outline"
        title="Resident"
        searchIcon="search"
        searchTouchable={() => navigation.navigate('Search')}
        // bellIcon="filter"
        ThirdType="material-community"
        firstOnpress={() => navigation.goBack()}
      />
      <DropDownComponent
        data={casteData}
        labelField="name"
        valueField="id"
        placeholder="Select caste"
        value={caste}
        maxHeight={150}
        dropdownStyle={styles.dropdownStyle}
        onChange={item => {
          setCaste(item.id);
          idx(item.id);
        }}
      />
      {newData.length > 0 && (
        <ScrollView>
          {newData.map((data, index) => (
            <HouseOnwersList
              title={data.name}
              AddressLine={data.address}
              Landmark={data.landmark}
              key={data.id}
              subTitle={data.house_no}
              phoneNumber={data.mobile_no}
              hideNumber={data.is_private}
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
      {!loading && newData.length == [] && <NoDataAni />}
    </View>
  );
};

export default HouseOwners;

const styles = StyleSheet.create({
  dropdownStyle: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 16,
    marginHorizontal: 20,
  },
});
