import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import HeaderBody from '../../../Components/HeaderBody';
import {COLORS, FONTS, genericStyles, Images} from '../../../constants';
import InputComponent from '../../../Components/InputComponent';
import {CheckBox} from 'react-native-elements';
import ButtonComponent from '../../../Components/ButtonComponent';

const ServiceDetails = ({navigation}) => {
  const [check1, setCheck1] = useState(false);
  return (
    <View style={genericStyles.Container}>
      <HeaderBody
        source={Images.Student}
        touchableOpacityStyle={genericStyles.mb(30)}
        title="Service Details"
        subTitle="Enter the details below to continue"
        subTitleStyle={genericStyles.mb(0)}
      />
      <InputComponent placeholder="Shop Name (Optional)" />
      <InputComponent placeholder="Select category" />
      <InputComponent placeholder="Whatsapp number" />
      <CheckBox
        title="Same a mobile number"
        checked={check1}
        onPress={() => setCheck1(!check1)}
        checkedColor={COLORS.primary}
        containerStyle={styles.checkBoxContanier}
        textStyle={styles.CheckText}
      />
      <ButtonComponent
        title="Next"
        onPress={() => navigation.navigate('Location')}
      />
    </View>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  checkBoxContanier: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    marginTop: -5,
    marginBottom: 30,
  },
  CheckText: {
    color: COLORS.third,
    fontSize: 15,
    marginLeft: 2,
    fontFamily: FONTS.InterRegular,
    fontWeight: 'normal',
  },
});
