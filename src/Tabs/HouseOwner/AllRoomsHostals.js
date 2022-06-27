import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, genericStyles} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import axios from 'axios';
import {useApp} from '../../../Context/AppContext';
import ListedAnimation from '../../Components/ListedAnimation';
import Poweredby from '../../Components/Poweredby';
import BaseURL from '../../constants/BaseURL';
import NoDataAni from '../../Components/NoDataAni';
import {Icon} from 'react-native-elements';
import FilterModal from '../../Components/FilterModal';
import RoomsCard from '../../Components/RoomsCard';

const AllRoomsHostals = ({navigation}) => {
  const {Userdata, FilterData, setIsFilterData} = useApp();
  const [check, setCheck] = useState('');
  const [loading, setIsloading] = useState(false);
  const [visible, setIsvisible] = useState(false);

  const fetchData = async Filterd => {
    const Fil = Filterd ? Filterd.split(',') : '';
    try {
      setIsloading(true);
      const response = await axios.post(BaseURL('filtered-room-hostel-list'), {
        type: 'room',
        is_veg: Fil[3] === 'true' ? 1 : Fil[4] === 'true' ? 0 : null,
        renter_type:
          Fil[0] === 'true'
            ? 1
            : Fil[1] === 'true'
            ? 2
            : Fil[2] === 'true'
            ? 3
            : null,
      });
      setIsloading(false);
      setIsFilterData(response.data.data);
      setCheck(response.data.success);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    return () => {
      setIsFilterData([]);
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
      {visible ? (
        <FilterModal
          OnPressCancel={() => setIsvisible(false)}
          onRequestClose={() => setIsvisible(false)}
          callData={fetchData}
          Loader={loading}
          visible={visible}
          setIsvisible={setIsvisible}
        />
      ) : check === false ? (
        <>
          <NoDataAni />
          <Icon
            color={COLORS.primary}
            name="filter"
            type="material-community"
            size={27}
            containerStyle={[
              styles.iconContainer,
              {bottom: Userdata.userData.app_role_id === 3 ? '12%' : '1%'},
            ]}
            reverse
            onPress={() => setIsvisible(true)}
          />
          {Userdata !== null ? (
            Userdata.userData.app_role_id === 3 ? (
              <>
                <ButtonComponent
                  title="Add room"
                  ButtonContainer={genericStyles.width('90%')}
                  onPress={() => navigation.navigate('Add room')}
                />
                <Poweredby container={{flex: 0}} />
              </>
            ) : null
          ) : null}
        </>
      ) : (
        <>
          {FilterData.length > 0 ? (
            <>
              <ScrollView style={genericStyles.mt(5)}>
                {FilterData.map((data, index) => (
                  <RoomsCard
                    key={data.id}
                    title={data.building_name}
                    subTitle={data.contact_person}
                    category={data.category === 0 ? 'Hostel' : 'Rooms/Flats'}
                    source={{uri: data.logo_image}}
                    index={index}
                    phoneNumber={data.mobile_no}
                    WhatsAppNumber={data.whatsapp_no}
                    userId={data.user_id}
                    is_veg={data.is_veg === 0 ? 'Non-Vegetarian' : 'Vegetarian'}
                    renter_type={
                      data.renter_type === 1
                        ? 'Only Boys'
                        : data.renter_type === 2 && 'Only Girls'
                    }
                    ID={data.id}
                    googleNavigate={`${data.house_no}+${data.address}, Udaipur, Rajasthan`}
                  />
                ))}
                <View style={genericStyles.height(50)} />
              </ScrollView>
              <Icon
                color={COLORS.primary}
                name="filter"
                type="material-community"
                size={27}
                containerStyle={[
                  styles.iconContainer,
                  {bottom: Userdata.userData.app_role_id === 3 ? '12%' : '1%'},
                ]}
                reverse
                onPress={() => setIsvisible(true)}
              />
              {Userdata !== null ? (
                Userdata.userData.app_role_id === 3 ? (
                  <>
                    <ButtonComponent
                      title="Add room"
                      ButtonContainer={genericStyles.width('90%')}
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
    </View>
  );
};

export default AllRoomsHostals;

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    bottom: '12%',
    right: 1,
    elevation: 5,
    marginBottom: 20,
  },
});
