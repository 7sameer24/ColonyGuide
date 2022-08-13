import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import axios from 'axios';
import MemberCard from './MemberCard';
import {ScrollView} from 'react-native-gesture-handler';
import BaseURL from '../../constants/BaseURL';
import NoDataAni from '../../Components/NoDataAni';
import SkeletonView from '../../Components/SkeletonView';

const MyRooms = ({navigation, route}) => {
  const {userID, userToken} = route.params;
  const [data, setUserData] = useState([]);
  const [loading, updateLoading] = useState(false);

  const fetchMemberList = async () => {
    try {
      updateLoading(true);
      const response = await axios(BaseURL('family-member-list'), {
        method: 'post',
        data: {
          resident_id: userID,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      updateLoading(false);
      if (response.data.success == true) {
        setUserData(response.data.family_member);
      }
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMemberList();
    return () => {
      setUserData([]);
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {data.length > 0 && (
        <ScrollView>
          {data.map((newData, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Member Information', {infoData: newData})
              }
              activeOpacity={0.9}
              key={newData.id}>
              <MemberCard
                fetchMemberList={fetchMemberList}
                onUpdate={setUserData}
                userId={newData.id}
                index={index}
                category={newData.relation}
                subTitle={newData.education}
                title={newData.name}
                onEdit={() =>
                  navigation.navigate('Edit Member Details', {
                    editData: newData,
                  })
                }
                source={
                  newData.photo.includes('photo')
                    ? {uri: newData.photo}
                    : require('../../../assets/Image_not_available.png')
                }
              />
            </TouchableOpacity>
          ))}
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
        title="Add room"
        ButtonContainer={styles.ButtonContainer}
        onPress={() => navigation.navigate('Add room')}
      />
      <Poweredby container={{flex: 0}} />
    </View>
  );
};

export default MyRooms;

const styles = StyleSheet.create({
  View: {marginTop: 50, alignSelf: 'center', marginBottom: 20},
  title: {
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginTop: 30,
    marginLeft: 20,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: FONTS.InterRegular,
    color: '#888888',
    marginTop: 10,
    marginLeft: 20,
    width: '80%',
    textAlign: 'left',
  },
  ButtonContainer: {
    width: '90%',
  },
});
