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

const AllRoomsHostals = ({navigation}) => {
  const {Userdata} = useApp();
  const [newData, setData] = useState([]);
  const [check, setCheck] = useState('');
  const [visible, setIsvisible] = useState(false);
  const [boysCheck, setIsboysCheck] = useState(false);
  const [girlsCheck, setIsgirlsCheck] = useState(false);
  const [familyCheck, setIsfamilyCheck] = useState(false);
  const [veg, setIsveg] = useState(false);
  const [noVeg, setIsnoVeg] = useState(false);

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('room-hostel-list'));
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
    idx();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <View style={genericStyles.Container}>
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
      <FilterModal
        visible={visible}
        boysCheck={boysCheck}
        girlsCheck={girlsCheck}
        familyCheck={familyCheck}
        veg={veg}
        noVeg={noVeg}
        // boysOnpress={() => setIsboysCheck(!boysCheck)}
        // girlsOnpress={() => setIsgirlsCheck(!girlsCheck)}
        // familyOnpress={() => setIsfamilyCheck(!familyCheck)}
        // vegOnpress={() => setIsveg(!veg)}
        // noVegOnpress={() => setIsnoVeg(!noVeg)}
        OnPressCancel={() => setIsvisible(false)}
        onRequestClose={() => setIsvisible(false)}
      />
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
  },
});
