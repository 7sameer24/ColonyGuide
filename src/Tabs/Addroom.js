import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import InputComponent from '../Components/InputComponent';
import {CheckBox} from 'react-native-elements';
import ButtonComponent from '../Components/ButtonComponent';

const Addroom = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const checkBoxArr = [
    {title: 'Only boys', value: check2, setValue: setCheck2},
    {title: 'Only girls', value: check3, setValue: setCheck3},
    {title: 'Family', value: check4, setValue: setCheck4},
  ];
  return (
    <View style={genericStyles.Container}>
      <ScrollView>
        <Text style={styles.textStyle}>Room Details</Text>
        <InputComponent placeholder="Building / Hostel Name" />
        <InputComponent placeholder="Contact person’s name" />
        <InputComponent placeholder="Select category" />
        <InputComponent placeholder="Room type" />
        <CheckBox
          title="Only Vegetarian"
          checked={check1}
          onPress={() => setCheck1(!check1)}
          checkedColor={COLORS.primary}
          containerStyle={styles.checkBoxContanier}
          textStyle={styles.CheckText}
        />
        <Text style={styles.textStyle}>SELECT</Text>
        <View style={{flexDirection: 'row'}}>
          {checkBoxArr.map(data => (
            <CheckBox
              key={data.title}
              title={data.title}
              checked={data.value}
              onPress={() => data.setValue(!data.value)}
              checkedColor={COLORS.primary}
              containerStyle={styles.checkBoxContanier}
              textStyle={styles.CheckText}
            />
          ))}
        </View>
        <Text style={styles.textStyle}>Address</Text>
        <InputComponent placeholder="Building / House Number" />
        <InputComponent placeholder="Address Line 1" />
        <InputComponent placeholder="Address Line 2" />
        <InputComponent placeholder="Landmark (optional)" />
        <ButtonComponent title="Save" ButtonContainer={genericStyles.mt(10)} />
        <View style={genericStyles.height(20)} />
      </ScrollView>
    </View>
  );
};

export default Addroom;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginLeft: 20,
    marginTop: 10,
  },
  checkBoxContanier: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    marginBottom: 0,
  },
  CheckText: {
    color: COLORS.third,
    fontSize: 14,
    marginLeft: 2,
    fontFamily: FONTS.InterRegular,
    fontWeight: 'normal',
  },
});
