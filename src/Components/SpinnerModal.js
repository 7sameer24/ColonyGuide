import {Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, genericStyles} from '../constants';
import Spinner from '../Components/Spinner';

const SpinnerModal = ({visible, onRequestClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Spinner container={genericStyles.bg(COLORS.transparent)} />
      </View>
    </Modal>
  );
};

export default SpinnerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(100,100,100, 0.2)',
    justifyContent: 'center',
  },
});
