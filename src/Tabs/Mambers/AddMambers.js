import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import axios from 'axios';
import MamberCard from './MamberCard';
import Spinner from '../../Components/Spinner';
import {ScrollView} from 'react-native-gesture-handler';
import BaseURL from '../../constants/BaseURL';
import NoDataAni from '../../Components/NoDataAni';

const AddMambers = ({navigation, route}) => {
  const {userID, userToken} = route.params;
  const [data, setUserData] = useState('');
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
      setUserData(response.data.family_member);
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMemberList();
    return () => {
      setUserData('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {data.length > 0 && (
        <ScrollView>
          {data.map((newData, index) => (
            <MamberCard
              fetchMemberList={fetchMemberList}
              key={newData.id}
              userId={newData.id}
              index={index}
              category={newData.relation}
              subTitle={newData.blood_group}
              title={newData.name}
              source={
                newData.logo_image ===
                'https://colonyguide.garimaartgallery.com/storage'
                  ? require('../../../assets/Image_not_available.png')
                  : {uri: newData.photo}
              }
            />
          ))}
          <View style={genericStyles.mb(20)} />
        </ScrollView>
      )}
      {loading && <Spinner />}
      {!loading && data == '' && <NoDataAni />}
      <ButtonComponent
        title="Add Mamber"
        ButtonContainer={styles.ButtonContainer}
        onPress={() => navigation.navigate('Add Members Details')}
      />
      <Poweredby container={{flex: 0}} />
    </View>
  );
};

export default AddMambers;

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
