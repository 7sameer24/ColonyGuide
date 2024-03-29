import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {Icon, Image} from 'react-native-elements';
import CustomView from '../DashComponents/CustomView';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import BaseURL from '../../constants/BaseURL';
import Toast from '../../Components/Toast';
import SpinnerModal from '../../Components/SpinnerModal';
import NoDataAni from '../../Components/NoDataAni';
import SkeletonView from '../../Components/SkeletonView';
import {useApp} from '../../../Context/AppContext';

const AdminEvent = ({route, navigation}) => {
  const toast = useToast();
  const {adminData, adminToken} = useApp();
  const [data, updateData] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [deleteLoading, updatedeleteLoading] = useState(false);

  const fetchData = async () => {
    updateLoading(true);
    try {
      const {data} = await axios(BaseURL('admin-event-list'), {
        method: 'post',
        data: {
          locality_id: adminData.userData.locality_id,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      updateLoading(false);
      if (data.success) {
        updateData(data.eventData);
      }
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      updateData([]);
    };
  }, []);

  const openLockAlert2 = id => {
    Alert.alert(
      'Delete gallery',
      'Are you sure you want to delete event ?',
      [
        {text: 'Ok', onPress: () => deleteEvent(id)},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const deleteEvent = async id => {
    try {
      updatedeleteLoading(true);
      const response = await axios(BaseURL('admin-event-delete'), {
        method: 'post',
        data: {
          event_id: id,
        },
        headers: {
          Authorization: `Bearer ${route.params.adminToken}`,
        },
      });
      updatedeleteLoading(false);
      if (response.data.success) {
        updateData([]);
        fetchData();
        Toast(toast, response.data.message);
      }
    } catch (error) {
      updatedeleteLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={genericStyles.container}>
      <CustomView
        text="Events"
        onPress={() => navigation.navigate('Add Event')}
      />
      {loading ? (
        <SkeletonView />
      ) : (
        data.length > 0 && (
          <ScrollView>
            {data.map((items, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EventInfo', {
                    description: items.event_description,
                    NewData: items.event_image,
                    name: items.event_name,
                  })
                }
                activeOpacity={0.9}
                key={index}
                style={styles.slide2}>
                <Image
                  source={
                    items.event_image.length > 0
                      ? {uri: items.event_image[0].event_image}
                      : require('../../../assets/Image_not_available.png')
                  }
                  style={styles.wrap}
                  progressiveRenderingEnabled
                  placeholderStyle={genericStyles.bg(COLORS.white)}
                  PlaceholderContent={
                    <ActivityIndicator color={COLORS.primary} />
                  }
                />
                <View style={styles.IconView}>
                  <Icon
                    name="square-edit-outline"
                    type="material-community"
                    size={18}
                    reverse
                    color={COLORS.primary}
                    onPress={() =>
                      navigation.navigate('Add Event', {
                        eventData: items,
                      })
                    }
                    containerStyle={genericStyles.shadow}
                  />
                  <Icon
                    name="trash"
                    type="ionicon"
                    size={18}
                    color={COLORS.red}
                    reverse
                    onPress={() => openLockAlert2(items.id)}
                    containerStyle={genericStyles.shadow}
                  />
                </View>
                <Text style={styles.title}>{items.event_description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )
      )}
      {!loading && data.length == [] && <NoDataAni />}
      <SpinnerModal visible={deleteLoading} />
    </View>
  );
};

export default AdminEvent;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 140,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    borderColor: COLORS.primary,
  },
  slide2: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 14,
    fontFamily: FONTS.InterRegular,
    marginTop: 10,
  },
  IconView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    right: 10,
  },
});
