import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Image, Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {useApp} from '../../../Context/AppContext';
import SpinnerModal from '../../Components/SpinnerModal';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';

const MemberCard = ({
  category,
  title,
  subTitle,
  source,
  userId,
  fetchMemberList,
  onUpdate,
  onEdit,
  onServiceDelete,
  ServiceId,
  OnRoomDelete,
  RoomId,
}) => {
  const toast = useToast();

  const {width} = useWindowDimensions();
  const {UserToken} = useApp();
  const [loading, updateLoading] = useState(false);

  const openLockAlert = () => {
    Alert.alert(
      'Member',
      'Are you sure you want to delete member ?',
      [
        {text: 'Ok', onPress: () => deleteList()},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };
  const openLockAlert3 = () => {
    Alert.alert(
      'Room',
      'Are you sure you want to delete room/pg ?',
      [
        {text: 'Ok', onPress: () => deleteRoom()},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const deleteRoom = async () => {
    try {
      updateLoading(true);
      const response = await axios(BaseURL('delete-hostel-room'), {
        method: 'post',
        data: {
          id: RoomId,
          user_id: userId,
        },
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      updateLoading(false);
      onUpdate('');
      fetchMemberList();
      Toast(toast, response.data.message);
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };

  const openLockAlert2 = () => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete service ?',
      [
        {text: 'Ok', onPress: () => deleteService()},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const deleteService = async () => {
    try {
      updateLoading(true);
      const response = await axios(BaseURL('delete-service'), {
        method: 'post',
        data: {
          user_id: userId,
          service_id: ServiceId,
        },
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      updateLoading(false);
      onUpdate('');
      fetchMemberList();
      Toast(toast, response.data.message);
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };
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
      onUpdate([]);
      fetchMemberList();
      Toast(toast, response.data.message);
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
            <Image
              source={source}
              fadeDuration={0}
              style={styles.ImageStyle}
              placeholderStyle={genericStyles.bg(COLORS.white)}
              PlaceholderContent={<ActivityIndicator color={COLORS.primary} />}
            />
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
              name="square-edit-outline"
              type="material-community"
              size={18}
              reverse
              color={COLORS.primary}
              onPress={onEdit}
              containerStyle={genericStyles.shadow}
            />
            <Icon
              name="trash"
              type="ionicon"
              size={18}
              color={COLORS.red}
              reverse
              onPress={() => {
                if (onServiceDelete) {
                  openLockAlert2();
                } else if (OnRoomDelete) {
                  openLockAlert3();
                } else {
                  openLockAlert();
                }
              }}
              containerStyle={genericStyles.shadow}
            />
          </View>
        </View>
      </Card>
      <SpinnerModal visible={loading} />
    </View>
  );
};

export default MemberCard;

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
