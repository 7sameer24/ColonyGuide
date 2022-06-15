import {
  Linking,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import {Icon} from 'react-native-elements';
import ButtonComponent from './ButtonComponent';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const CheckUpdate = ({visible, onRequestClose, onPress, checkVersionApi}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    checkVersionApi();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[COLORS.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={genericStyles.fill}>
        <View style={styles.container}>
          <View style={styles.CardContainer}>
            <Icon
              name="update"
              type="material-community"
              color={COLORS.primary}
              size={50}
              style={styles.iconContainer}
            />
            <View style={[styles.midText]}>
              <Text style={styles.title500}>
                Please Update Colony Guide app.
              </Text>
            </View>
            <ButtonComponent
              title="Update"
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.colonyguide',
                )
              }
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default CheckUpdate;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.InterRegular,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
    marginHorizontal: 15,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(100,100,100, 0.2)',
    justifyContent: 'center',
  },
  midText: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  CardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 5,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginVertical: 10,
  },
  title500: {
    fontFamily: FONTS.InterRegular,
    fontSize: 17,
    color: COLORS.black,
  },
});
