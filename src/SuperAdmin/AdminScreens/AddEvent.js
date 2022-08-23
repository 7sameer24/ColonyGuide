import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {Icon, Image} from 'react-native-elements';
import CustomView from '../DashComponents/CustomView';

const AddEvent = ({source}) => {
  return (
    <View style={genericStyles.container}>
      <CustomView text="Events" />
      <TouchableOpacity activeOpacity={0.8} style={styles.slide2}>
        <Image
          source={source}
          style={styles.wrap}
          progressiveRenderingEnabled
          placeholderStyle={genericStyles.bg(COLORS.white)}
          PlaceholderContent={<ActivityIndicator color={COLORS.primary} />}
        />
        <View style={styles.IconView}>
          <Icon
            name="square-edit-outline"
            type="material-community"
            size={18}
            reverse
            color={COLORS.primary}
            //   onPress={onEdit}
            containerStyle={genericStyles.shadow}
          />
          <Icon
            name="trash"
            type="ionicon"
            size={18}
            color={COLORS.red}
            reverse
            //   onPress={deleteItem}
            containerStyle={genericStyles.shadow}
          />
        </View>
        <Text style={styles.title}>ss</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: COLORS.MoodyBlue,
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
