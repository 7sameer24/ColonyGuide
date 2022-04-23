import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {Button} from 'react-native-elements';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import ImgIcon from '../../../assets/svg/rafiki.svg';
import Poweredby from '../../Components/Poweredby';
import {navigationStateType, useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';

const SelectRole = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const {width, height} = Dimensions.get('window');

  const {setNavigationState} = useApp();

  const idx = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      setNewData(response.data.roles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setNewData([]);
    };
  }, []);

  const skipToHome = () => {
    setNavigationState(navigationStateType.GUEST);
  };

  return (
    <View style={styles.container}>
      {newData.length > 0 ? (
        <>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => skipToHome()}>
            <Text style={styles.TouchableText}>Skip</Text>
          </TouchableOpacity>
          <View style={styles.imageStyle}>
            <ImgIcon height={160} />
            <Text style={styles.text}>Select your role</Text>
          </View>
          {newData.map(data => (
            <Button
              key={data.id}
              title={data.name}
              buttonStyle={
                data.name == 'Service Provider' || data.name == 'Visitor'
                  ? styles.buttonStyle
                  : styles.buttonStyle1
              }
              containerStyle={
                data.name == ('Service Provider', 'Visitor')
                  ? styles.ButtonContainer
                  : styles.ButtonContainer1
              }
              titleStyle={{
                color:
                  data.name == 'Service Provider' || data.name == 'Visitor'
                    ? COLORS.white
                    : COLORS.primary,
                fontFamily: FONTS.InterSemiBold,
              }}
              onPress={() =>
                navigation.navigate('Register', {role_id: data.id})
              }
            />
          ))}
          <Poweredby />
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default SelectRole;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  TouchableOpacity: {
    flexDirection: 'row-reverse',
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 40,
  },
  TouchableText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
    lineHeight: 19.36,
  },
  imageStyle: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
    marginTop: 20,
    fontFamily: FONTS.InterSemiBold,
  },
  buttonStyle1: {
    paddingVertical: 15,
    backgroundColor: COLORS.transparent,
  },
  ButtonContainer1: {
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
  },
  ButtonContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
});
