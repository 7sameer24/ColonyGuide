import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import InputComponent from '../../Components/InputComponent';
import {CheckBox} from 'react-native-elements';
import ButtonComponent from '../../Components/ButtonComponent';

const BusinessDetails = ({navigation, route}) => {
  const {User} = route.params;
  // console.log(User);
  const [check1, setCheck1] = useState(false);

  return (
    <View style={genericStyles.Container}>
      <ScrollView>
        <View style={styles.imageConatiner}>
          <Image
            resizeMode="contain"
            source={Images.BusinessProfile}
            style={styles.imageStyle}
          />
        </View>
        <TouchableOpacity style={genericStyles.selfCenter}>
          <Text style={styles.AddLogoText}>Add image / logo</Text>
        </TouchableOpacity>
        <Text style={styles.BusinessDetails}>
          {User === 'Business Info' || User !== 'Service Info'
            ? 'Business Details'
            : 'Service Info'}
        </Text>
        <InputComponent
          placeholder={
            User === 'Business Info' || User !== 'Service Info'
              ? 'Name of business'
              : 'Shop / Service name (Optional)'
          }
        />
        <InputComponent placeholder="Contact person’s name" />
        <InputComponent placeholder="Contact person’s mobile number" />
        <InputComponent placeholder="Contact person’s whatsapp number" />
        <CheckBox
          title="Same a mobile number"
          checked={check1}
          onPress={() => setCheck1(!check1)}
          checkedColor={COLORS.primary}
          containerStyle={styles.checkBoxContanier}
          textStyle={styles.CheckText}
        />
        <InputComponent
          placeholder={
            User === 'Business Info' || User !== 'Service Info'
              ? 'Select business type'
              : 'Select category'
          }
        />
        <InputComponent
          placeholder={
            User === 'Business Info' || User !== 'Service Info'
              ? 'About business (Optional)'
              : 'About shop or service (Optional)'
          }
        />
        <Text style={styles.BusinessDetails}>
          {User === 'Business Info' || User !== 'Service Info'
            ? 'Business address'
            : 'Shop address'}
        </Text>
        <InputComponent placeholder="Building / Flat Number" />
        <InputComponent placeholder="Address Line 1" />
        <InputComponent placeholder="Address Line 2" />
        <InputComponent placeholder="Landmark (optional)" />
      </ScrollView>
      <ButtonComponent
        title="Save"
        ButtonContainer={styles.ButtonContainer}
        onPress={() =>
          navigation.navigate('Business Saved', {UserDetails: User})
        }
      />
    </View>
  );
};

export default BusinessDetails;

const styles = StyleSheet.create({
  imageConatiner: {
    backgroundColor: COLORS.secondary,
    width: 70,
    height: 70,
    alignSelf: 'center',
    borderRadius: 40,
    marginTop: 10,
  },
  imageStyle: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginTop: 18,
  },
  AddLogoText: {
    fontSize: 12,
    color: COLORS.third,
    fontFamily: FONTS.InterMedium,
  },
  BusinessDetails: {
    fontSize: 16,
    color: COLORS.textColor,
    fontFamily: FONTS.InterMedium,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  checkBoxContanier: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    marginTop: -10,
    marginBottom: 0,
  },
  CheckText: {
    color: COLORS.third,
    fontSize: 15,
    marginLeft: 2,
    fontFamily: FONTS.InterRegular,
    fontWeight: 'normal',
  },
  ButtonContainer: {
    marginVertical: 20,
    marginBottom: 30,
  },
});
