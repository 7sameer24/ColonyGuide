import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Icon, Image} from 'react-native-elements';
import {COLORS, genericStyles} from '../../constants';

const EditGComponent = ({source, deleteImage}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.containerStyle}
      onPress={deleteImage}>
      <View style={{flex: 1, borderRadius: 10, alignItems: 'center'}}>
        <Image
          source={source}
          style={styles.img}
          placeholderStyle={genericStyles.bg(COLORS.white)}
          PlaceholderContent={<ActivityIndicator color={COLORS.primary} />}
        />
        <Icon
          name="close-outline"
          type="ionicon"
          size={15}
          color={COLORS.white}
          containerStyle={styles.deleteIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default EditGComponent;

const styles = StyleSheet.create({
  containerStyle: {
    width: 95,
    height: 95,
    padding: 5,
  },
  deleteIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.red,
    borderRadius: 100,
    right: 5,
    top: -8,
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
});
