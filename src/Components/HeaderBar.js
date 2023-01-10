import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Badge, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../constants';
import axios from 'axios';
import BaseURL from '../constants/BaseURL';
import {useApp} from '../../Context/AppContext';
import {useFocusEffect} from '@react-navigation/native';

const HeaderBar = ({
  firstIcon,
  firstOnpress,
  title,
  bellIcon,
  searchIcon,
  titleStyle,
  searchTouchable,
  iconStyle,
  iconView,
  ThirdType,
  thirdOnpress,
  containerStyle,
  bgContainer,
  iconColorChange,
  searchIconStyle,
  navigation,
}) => {
  const {Userdata, UserToken, onAddCart, count} = useApp();
  const fetchCart = async () => {
    try {
      const response = await axios(BaseURL('cart-list'), {
        method: 'post',
        data: {user_id: Userdata.userData.id},
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      if (response.data.success == true) {
        if (response.data.data.length > 0) {
          const found = response.data.data
            .map(element => element.product)
            .pop();
          onAddCart(found.id);
        }
      }
    } catch (error) {
      console.log('Cart', error);
    }
  };

  useEffect(() => {
    Userdata && fetchCart();
  }, []);

  return (
    <SafeAreaView style={[genericStyles.bg(COLORS.white), {...bgContainer}]}>
      <View style={[styles.iconView, {...iconView}]}>
        <View style={genericStyles.row}>
          <Icon
            color={iconColorChange ? COLORS.white : COLORS.textColor}
            name={firstIcon}
            type="ionicon"
            size={25}
            onPress={firstOnpress}
          />
          <Text style={[styles.title, {...titleStyle}]}>{title}</Text>
        </View>
        <View style={genericStyles.row}>
          <Icon
            color={COLORS.textColor}
            name={bellIcon}
            type={ThirdType}
            size={25}
            onPress={thirdOnpress}
            style={[genericStyles.ml(22), {...iconStyle}]}
          />
          <Icon
            name={searchIcon}
            size={25}
            color={COLORS.textColor}
            type="ionicon"
            containerStyle={searchIconStyle}
            onPress={() => navigation.navigate('Cart')}
          />
          {/* {searchIcon && (
            <Badge
              status="error"
              value={
                Object.keys(count).length === undefined
                  ? 0
                  : Object.keys(count).length
              }
              containerStyle={{position: 'absolute', top: -6, right: -4}}
            />
          )} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.InterSemiBold,
    marginLeft: 30,
    color: COLORS.textColor,
  },
});
