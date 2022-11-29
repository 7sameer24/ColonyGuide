import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {navigationStateType, useApp} from '../../Context/AppContext';
import {COLORS, FONTS, genericStyles} from '../constants';
import BaseURL from '../constants/BaseURL';
import ButtonComponent from './ButtonComponent';
import DropDownComponent from './DropDownComponent';
import {useToast} from 'react-native-toast-notifications';
import Toast from './Toast';

const LocalModal = ({route}) => {
  const [newData, setData] = useState([]);
  const [LocalityValue, setLocality] = useState('');
  const [loading, updateLoading] = useState(false);
  const {
    setNavigationState,
    updateGSaveLocalID,
    setNewData,
    setUserToken,
    resumeDetails,
  } = useApp();
  const toast = useToast();

  const fetchLocalities = async () => {
    try {
      const response = await axios.post(BaseURL('get-all-master'));
      if (response.data.success) {
        setData(response.data.localities);
      } else {
        Toast(toast, response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveVistorLocalId = async () => {
    try {
      updateLoading(true);
      const response = await axios(BaseURL('add-details'), {
        method: 'post',
        data: {
          app_role_id:
            route.params != undefined
              ? route.params.UserData.userData.app_role_id
              : resumeDetails.app_role_id,
          locality_id: LocalityValue,
          user_id:
            route.params != undefined
              ? route.params.UserData.userData.id
              : resumeDetails.user_id,
        },
        headers: {
          Authorization: `Bearer ${
            route.params ? route.params.token : resumeDetails.token
          }`,
        },
      });
      updateLoading(false);
      if (response.data.success) {
        setNewData(response.data);
        setUserToken(
          route.params != undefined ? route.params.token : resumeDetails.token,
        );
      } else {
        Toast(toast, response.data.message);
      }
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLocalities();
    return () => {
      setData([]);
    };
  }, []);

  const goNext = () => {
    if (!LocalityValue) {
      Toast(toast, 'Please select your locality');
    } else {
      if (route.params == undefined && resumeDetails == null) {
        updateGSaveLocalID(LocalityValue);
        setNavigationState(navigationStateType.HOME);
      } else if (route.params) {
        saveVistorLocalId();
      } else if (resumeDetails) {
        saveVistorLocalId();
      }
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.titleStyle}>Please Select Your Locality !</Text>
        <DropDownComponent
          data={newData}
          labelField="name"
          valueField="id"
          placeholder="Locality"
          value={LocalityValue}
          maxHeight={newData.length > 1 ? 150 : 50}
          onChange={item => setLocality(item.id)}
          dropdownStyle={genericStyles.mb(20)}
        />
        <ButtonComponent
          loading={loading}
          title="Next"
          onPress={() => goNext()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: '80%',
    alignSelf: 'center',
  },
  titleStyle: {
    fontFamily: FONTS.InterSemiBold,
    fontSize: 17,
    textAlign: 'center',
    color: COLORS.black,
    marginBottom: 10,
  },
});

export default LocalModal;
