import {Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Icon} from 'react-native-elements';

const ImageZoomComponent = ({
  ImageView,
  visible,
  onRequestClose,
  iconOnPress,
  onSwipeDown,
  imageIndex,
  ImageZoomComponentStyle,
  iconContainer,
}) => {
  return (
    <View style={[styles.ImageZoomComponent, {...ImageZoomComponentStyle}]}>
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onRequestClose}>
        <Icon
          name="close-outline"
          type="ionicon"
          color={COLORS.white}
          size={30}
          onPress={iconOnPress}
          containerStyle={[styles.iconContainer, {...iconContainer}]}
        />
        <ImageViewer
          imageUrls={ImageView}
          enableSwipeDown={true}
          index={imageIndex}
          onSwipeDown={onSwipeDown}
          useNativeDriver={true}
        />
      </Modal>
    </View>
  );
};

export default ImageZoomComponent;

const styles = StyleSheet.create({
  ImageZoomComponent: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  iconContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 20,
  },
});
