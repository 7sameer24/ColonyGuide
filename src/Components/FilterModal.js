import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import {useApp} from '../../Context/AppContext';
import {COLORS, FONTS, genericStyles} from '../constants';
import ButtonComponent from './ButtonComponent';

const FilterModal = ({OnPressCancel, onRequestClose, callData}) => {
  const [boys, setIsboys] = useState(false);
  const [girlsCheck, setIsgirlsCheck] = useState(false);
  const [familyCheck, setIsfamilyCheck] = useState(false);
  const [veg, setIsveg] = useState(false);
  const [noVeg, setIsnoVeg] = useState(false);
  const {visible, setIsvisible} = useApp();

  const Plus = `${boys},${girlsCheck},${familyCheck},${veg},${noVeg}`;

  const filterbtn = () => {
    setIsvisible(false);
    callData(Plus);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
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
            <View
              style={{
                flexDirection: 'row-reverse',
                elevation: 5,
                marginLeft: 10,
              }}>
              <Icon
                name="close"
                size={17}
                reverse
                onPress={OnPressCancel}
                color={COLORS.primary}
              />
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <CheckBox
                title="Boys"
                checked={boys}
                onPress={() => setIsboys(!boys)}
                checkedColor={COLORS.primary}
                containerStyle={styles.checkBoxContanier}
                textStyle={styles.CheckText}
              />
              <CheckBox
                title="Girls"
                checked={girlsCheck}
                onPress={() => setIsgirlsCheck(!girlsCheck)}
                checkedColor={COLORS.primary}
                containerStyle={styles.checkBoxContanier}
                textStyle={styles.CheckText}
              />
              <CheckBox
                title="Family"
                checked={familyCheck}
                onPress={() => setIsfamilyCheck(!familyCheck)}
                checkedColor={COLORS.primary}
                containerStyle={styles.checkBoxContanier}
                textStyle={styles.CheckText}
              />
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <CheckBox
                title="Vegetarian"
                checked={veg}
                onPress={() => setIsveg(!veg)}
                checkedColor={COLORS.primary}
                containerStyle={styles.checkBoxContanier}
                textStyle={styles.CheckText}
              />
              <CheckBox
                title="No Vegetarian"
                checked={noVeg}
                onPress={() => setIsnoVeg(!noVeg)}
                checkedColor={COLORS.primary}
                containerStyle={styles.checkBoxContanier}
                textStyle={styles.CheckText}
              />
            </View>
            <ButtonComponent
              title="Apply"
              ButtonContainer={styles.ButtonContainer}
              onPress={() => filterbtn()}
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
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 250,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  checkBoxContanier: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    marginBottom: 0,
    margin: 0,
  },
  CheckText: {
    color: COLORS.primary,
    fontSize: 14,
    marginLeft: 2,
    fontFamily: FONTS.InterRegular,
    fontWeight: 'normal',
  },
  ButtonContainer: {
    width: '90%',
    marginTop: 30,
  },
});

export default FilterModal;
