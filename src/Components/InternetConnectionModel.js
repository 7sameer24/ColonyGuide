import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';
import {Icon} from 'react-native-elements';

const InternetConnectionModel = ({visible, onRequestClose, onPress}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <View style={styles.CardContainer}>
          <View style={[styles.midText]}>
            <Text style={styles.title500}>No Internet Connection</Text>
          </View>
          <Icon
            name="access-point-network-off"
            type="material-community"
            color={COLORS.primary}
            size={50}
            style={styles.iconContainer}
          />
          <Text style={styles.text}>
            Please check your Internet Connection and try again
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default InternetConnectionModel;

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
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  CardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 5,
    width: '90%',
    height: 200,
    alignSelf: 'center',
    paddingHorizontal: 5,
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
