import {
  Image,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {useApp} from '../../../Context/AppContext';
import SpinnerModal from '../../Components/SpinnerModal';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';

const MamberCard = ({
  category,
  title,
  subTitle,
  source,
  userId,
  fetchMemberList,
}) => {
  const {width} = useWindowDimensions();
  const {UserToken} = useApp();
  const [loading, updateLoading] = useState(false);

  const deleteList = async () => {
    try {
      updateLoading(true);
      const response = await axios(BaseURL('delete-family-member'), {
        method: 'post',
        data: {
          id: userId,
        },
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      updateLoading(false);
      fetchMemberList();
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };

  return (
    <View>
      <Card containerStyle={[styles.CardContainer]}>
        <View
          style={[
            genericStyles.row,
            {alignItems: 'center', justifyContent: 'space-between'},
          ]}>
          <View style={[genericStyles.row, {alignItems: 'center'}]}>
            <Image source={source} style={styles.ImageStyle} fadeDuration={0} />
            <View style={genericStyles.row}>
              <View style={{width: width / 3.1}}>
                <Text style={[styles.title]} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={[styles.subTitle1]} numberOfLines={1}>
                  {subTitle}
                </Text>
                <Text numberOfLines={1} style={[styles.subTitle]}>
                  {category}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.View3}>
            <Icon
              name="trash"
              type="ionicon"
              size={16}
              color={COLORS.red}
              reverse
              onPress={deleteList}
              deleteList={() => deleteList()}
              containerStyle={genericStyles.shadow}
            />
          </View>
        </View>
      </Card>
      <SpinnerModal visible={loading} />
    </View>
  );
};

export default MamberCard;

const styles = StyleSheet.create({
  CardContainer: {
    borderWidth: 1,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderColor: COLORS.primary,
    paddingVertical: 13,
  },
  ImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 11,
  },
  View3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: '#7D7D7D',
  },
  subTitle1: {
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: '#7D7D7D',
  },
});
