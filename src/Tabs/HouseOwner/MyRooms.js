import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import axios from 'axios';
import MemberCard from '../Members/MemberCard';
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
      const response = await axios(BaseURL('get-user-hostel-rooms-list'), {
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
        setUserData(response.data.list);
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
            <TouchableOpacity activeOpacity={0.9} key={newData.id}>
              <MemberCard
                fetchMemberList={fetchMemberList}
                onUpdate={setUserData}
                userId={newData.user_id}
                OnRoomDelete={true}
                RoomId={newData.id}
                index={index}
                category={newData.category === 0 ? 'Hostel' : 'Rooms/Flats'}
                subTitle={newData.contact_person}
                title={newData.building_name}
                onEdit={() =>
                  navigation.navigate('Edit Room Details', {
                    editData: newData,
                  })
                }
                source={
                  newData.logo_image.includes('jpg')
                    ? {uri: newData.logo_image}
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
