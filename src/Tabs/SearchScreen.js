import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import InputComponent from '../Components/InputComponent';
import ImgIcon from '../../assets/svg/amico.svg';
import axios from 'axios';
import BaseURL from '../constants/BaseURL';
import {Divider, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState('');

  const SearchData = async e => {
    try {
      const response = await axios.post(BaseURL('search-house-owner'), {
        search_text: e,
      });
      if (response.data.success === true) {
        setData(response.data.data);
      } else {
        setData([]);
        setCheck(response.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const SaveSearch = async searchData => {
  //   let currentlyMerged;
  //   // const data = {
  //   //   name: searchData.name,
  //   //   house: searchData.house_no,
  //   // };
  //   // searchData.address,
  //   // searchData.landmark,
  //   // const data2 = {
  //   //   name: searchData.name,
  //   //   house: searchData.house_no,
  //   // };

  //   // const multiSet = [
  //   //   ['@MyApp_USER_1', JSON.stringify(data)],
  //   //   ['@MyApp_USER_2', JSON.stringify(data2)],
  //   // ];

  //   const key = searchData.name + searchData.name;

  //   try {
  //     // await AsyncStorage.multiSet(multiSet);
  //     await AsyncStorage.setItem('@MyApp_USER_1', JSON.stringify(key));
  //     currentlyMerged = await AsyncStorage.getItem('@MyApp_USER_1');
  //   } catch (e) {
  //     //save error
  //   }

  //   console.log(currentlyMerged);
  // };

  // const getMultiple = async () => {
  //   let values;
  //   try {
  //     values = await AsyncStorage.multiGet(['@MyApp_USER_1,@MyApp_USER_2']);
  //   } catch (e) {
  //     // read error
  //   }
  //   console.log(values);
  // };

  return (
    <View style={genericStyles.Container}>
      <InputComponent
        placeholder="Search people, categories..."
        iconName="search"
        onChangeText={text => SearchData(text)}
        inputContainerStyle={styles.inputContainerStyle}
      />

      {check === false ? (
        <View style={styles.imageStyle}>
          <ImgIcon />
          <Text style={styles.topText}> No data found.</Text>
        </View>
      ) : data.length > 0 ? (
        <ScrollView style={genericStyles.mt(20)}>
          <>
            {data.map(newData => (
              <TouchableOpacity
                key={newData.id}
                onPress={() =>
                  navigation.navigate('Search Result', {userData: newData})
                }>
                <View style={styles.mainContainer}>
                  <Icon
                    name="map-marker-radius"
                    type="material-community"
                    size={20}
                    color={COLORS.primary}
                    containerStyle={styles.CutNameConatiner}
                  />
                  <View style={genericStyles.column}>
                    <Text style={styles.title} numberOfLines={1}>
                      {newData.name}
                    </Text>
                    <Text style={styles.subTitle} numberOfLines={1}>
                      {`${newData.house_no == null ? '' : newData.house_no} ${
                        newData.address == null ? '' : newData.address
                      } ${newData.landmark == null ? '' : newData.landmark}`}
                    </Text>
                    <Divider
                      style={{width: 1000, marginTop: 20}}
                      color={COLORS.primary}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        </ScrollView>
      ) : (
        <View style={styles.imageStyle}>
          <ImgIcon />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'center',
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: '#EFEFEF',
    borderRadius: 30,
    elevation: 4,
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    width: 320,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: '#7D7D7D',
    width: 320,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  CutNameConatiner: {
    // alignItems: 'center',
    // justifyContent: 'center',
    marginRight: 30,
    marginLeft: 20,
  },
  topText: {
    fontSize: 18,
    fontFamily: FONTS.InterMedium,
    color: COLORS.primary,
  },
});
