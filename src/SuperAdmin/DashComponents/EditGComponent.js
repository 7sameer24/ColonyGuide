import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Icon, Image} from 'react-native-elements';
import {COLORS, genericStyles} from '../../constants';

const EditGComponent = ({source}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.containerStyle}>
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
          size={20}
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
    width: '25%',
    height: '17%',
    padding: 5,
    backgroundColor: COLORS.RoyalBlue,
  },
  deleteIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.red,
    borderRadius: 50,
    right: 10,
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginTop: 10,
  },
});
