import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import InputComponent from '../../Components/InputComponent';
import ImgIcon from '../../../assets/svg/amico.svg';
import {Divider, Icon} from 'react-native-elements';

const SearchBus = ({navigation, route}) => {
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState('');

  const setFilter = text => {
    if (text) {
      const newData = route.params.data.filter(item => {
        const itemData = item.name ? item.name.toLowerCase() : ''.toUpperCase();
        const textData = text.toLowerCase();
        return itemData.search(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData([]);
      setSearch(text);
    }
  };

  return (
    <View style={genericStyles.Container}>
      <InputComponent
        placeholder="Search people, categories..."
        iconName="search"
        value={search}
        onChangeText={text => setFilter(text)}
        autoFocus={true}
        inputContainerStyle={styles.inputContainerStyle}
      />

      {filterData.length > 0 ? (
        <ScrollView style={genericStyles.mt(20)}>
          <>
            {filterData.map(newData => (
              <TouchableOpacity
                key={newData.id}
                onPress={() =>
                  navigation.navigate('SearchBusResult', {userData: newData})
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
                      } ${newData.landmark == 'null' ? '' : newData.landmark}`}
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

export default SearchBus;

const styles = StyleSheet.create({
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
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
    width: 270,
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
