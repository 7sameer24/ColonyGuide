import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, genericStyles} from '../../constants';
import CardsListed from '../../Components/CardsListed';
import ButtonComponent from '../../Components/ButtonComponent';
import axios from 'axios';
import {useApp} from '../../../Context/AppContext';
import ListedAnimation from '../../Components/ListedAnimation';
import Poweredby from '../../Components/Poweredby';
import BaseURL from '../../constants/BaseURL';
import NoDataAni from '../../Components/NoDataAni';
import {Icon} from 'react-native-elements';
import FilterModal from '../../Components/FilterModal';

const HostelListed = ({navigation}) => {
  const {Userdata, setIsvisible, visible} = useApp();
  const [newData, setData] = useState([]);
  const [check, setCheck] = useState('');

  const fetchData = async Filterd => {
    const Fil = Filterd ? Filterd.split(',') : '';
    try {
      const response = await axios.post(BaseURL('filtered-room-hostel-list'), {
        type: 'hostel',
        is_veg: Fil[3] === 'true' ? 1 : Fil[4] === 'true' ? 0 : null,
      });
      if (response.data.success === true) {
        setData(response.data.data);
      } else {
        setCheck(response.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
      setCheck('');
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      <>
        {check === false ? (
          <>
            <NoDataAni />
            {Userdata !== null ? (
              Userdata.userData.app_role_id === 3 ? (
                <>
                  <ButtonComponent
                    title="Add room"
                    ButtonContainer={styles.ButtonContainer}
                    onPress={() => navigation.navigate('Add room')}
                  />
                  <Poweredby container={{flex: 0}} />
                </>
              ) : null
            ) : null}
          </>
        ) : (
          <>
            {newData.length > 0 ? (
              <>
                <ScrollView style={genericStyles.mt(5)}>
                  {newData.map((data, index) => (
                    <CardsListed
                      key={data.id}
                      title={data.building_name}
                      subTitle={data.contact_person}
                      category={data.category === 0 ? 'Hostel' : 'Rooms/Flats'}
                      source={{uri: data.logo_image}}
                      index={index}
                      phoneNumber={data.mobile_no}
                      WhatsAppNumber={data.whatsapp_no}
                      userId={data.user_id}
                    />
                  ))}
                  <View style={genericStyles.height(50)} />
                </ScrollView>
                <Icon
                  color={COLORS.primary}
                  name="filter"
                  type="material-community"
                  size={27}
                  containerStyle={styles.iconContainer}
                  reverse
                  onPress={() => setIsvisible(true)}
                />
                {Userdata !== null ? (
                  Userdata.userData.app_role_id === 3 ? (
                    <>
                      <ButtonComponent
                        title="Add room"
                        ButtonContainer={styles.ButtonContainer}
                        onPress={() => navigation.navigate('Add room')}
                      />
                      <Poweredby container={{flex: 0}} />
                    </>
                  ) : null
                ) : null}
              </>
            ) : (
              <ListedAnimation />
            )}
          </>
        )}
      </>
      {visible ? (
        <FilterModal
          OnPressCancel={() => setIsvisible(false)}
          onRequestClose={() => setIsvisible(false)}
          callData={fetchData}
        />
      ) : null}
    </View>
  );
};

export default HostelListed;

const styles = StyleSheet.create({
  ButtonContainer: {
    width: '90%',
  },
  iconContainer: {
    position: 'absolute',
    bottom: '12%',
    right: 1,
    elevation: 5,
  },
});
