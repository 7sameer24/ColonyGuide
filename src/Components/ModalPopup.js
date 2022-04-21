import React from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../constants';

const ModalPopup = ({
  OnPressCancel,
  visible,
  CameraOnpress,
  GalleryOnpress,
  onRequestClose,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(100,100,100, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalView}>
            <Button
              title="Camera"
              icon={{
                name: 'camera',
                type: 'font-awesome',
                size: 15,
                color: COLORS.white,
              }}
              iconRight
              iconContainerStyle={genericStyles.ml(16)}
              titleStyle={styles.titleStyle}
              buttonStyle={styles.buttonStyle}
              onPress={CameraOnpress}
              containerStyle={[genericStyles.width(300), genericStyles.mb(10)]}
            />
            <Button
              title="Gallery"
              icon={{
                name: 'images',
                type: 'ionicon',
                size: 15,
                color: COLORS.white,
              }}
              iconRight
              iconContainerStyle={genericStyles.ml(16)}
              titleStyle={[styles.titleStyle]}
              buttonStyle={[styles.buttonStyle]}
              onPress={GalleryOnpress}
              containerStyle={[genericStyles.width(300), genericStyles.mb(10)]}
            />
            <Button
              title="Cancel"
              icon={{
                name: 'close',
                type: 'font-awesome',
                size: 15,
                color: COLORS.primary,
              }}
              iconRight
              iconContainerStyle={genericStyles.ml(16)}
              titleStyle={[
                styles.titleStyle,
                genericStyles.color(COLORS.primary),
              ]}
              buttonStyle={[styles.buttonStyle, genericStyles.bg(COLORS.white)]}
              containerStyle={genericStyles.width(150)}
              onPress={OnPressCancel}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  titleStyle: {
    fontFamily: FONTS.InterSemiBold,
    fontSize: 14,
  },
});

export default ModalPopup;
