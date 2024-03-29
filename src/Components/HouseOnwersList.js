import {
  Linking,
  Share,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {Card, Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../constants';
import {useApp} from '../../Context/AppContext';
import Toast from './Toast';
import {useToast} from 'react-native-toast-notifications';

const HouseOnwersList = ({
  title,
  subTitle,
  AddressLine,
  Landmark,
  phoneNumber,
  hideNumber,
}) => {
  const {width} = useWindowDimensions();
  const {Userdata, setIsLoginPop, adminData} = useApp();
  const toast = useToast();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Colony Guide Sharing This ${title === null ? '' : title} ${
          subTitle === null ? '' : subTitle
        } ${AddressLine === null ? '' : AddressLine} ${
          Landmark === null ? '' : Landmark
        }`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const nameSplit = title && title.split(' ');

  return (
    <Card containerStyle={styles.CardContainer}>
      <View style={styles.mainContainer}>
        <View style={[genericStyles.row, {alignItems: 'center'}]}>
          <View style={styles.CutNameConatiner}>
            <Text style={styles.CutName}>{`${nameSplit[0].slice(0, 1)}${
              nameSplit[1] !== undefined ? nameSplit[1].slice(0, 1) : 'JI'
            }`}</Text>
          </View>
          <View style={{width: width / 2.4}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{`${subTitle}, ${AddressLine}, ${
              Landmark ?? ''
            }`}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Icon
            name="share-social"
            type="ionicon"
            color="#407BFF"
            size={15}
            reverse
            containerStyle={genericStyles.shadow}
            onPress={() => {
              if (adminData !== null) {
                onShare();
              } else if (Userdata !== null) {
                onShare();
              } else {
                setIsLoginPop(true);
              }
            }}
          />
          <Icon
            name="phone-outgoing"
            type="material-community"
            size={15}
            reverse
            containerStyle={genericStyles.shadow}
            color={hideNumber == 1 ? COLORS.darkgray : '#25D366'}
            onPress={() => {
              if (adminData !== null) {
                if (hideNumber == 1) {
                  Toast(toast, 'These user hide their number');
                  return;
                } else {
                  Linking.openURL(`tel:${phoneNumber}`);
                }
              } else if (Userdata !== null) {
                if (Userdata.userData.app_role_id === 2) {
                  Toast(
                    toast,
                    'You are not authorized to call this number',
                    5000,
                  );
                  return;
                } else if (hideNumber == 1) {
                  Toast(toast, 'These user hide their number');
                  return;
                }

                Linking.openURL(`tel:${phoneNumber}`);
              } else {
                setIsLoginPop(true);
              }
            }}
          />
        </View>
      </View>
    </Card>
  );
};

export default HouseOnwersList;

const styles = StyleSheet.create({
  CardContainer: {
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 0,
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
    marginTop: 2,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  CutNameConatiner: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginHorizontal: 13,
  },
  CutName: {
    color: COLORS.white,
    fontSize: 22,
    fontFamily: FONTS.InterRegular,
  },
});
