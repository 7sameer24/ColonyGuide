import {Modal, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import LottieView from 'lottie-react-native';
import ButtonComponent from './ButtonComponent';
import {navigationStateType, useApp} from '../../Context/AppContext';

const LoginAnimation = ({visible}) => {
  const {setNavigationState, setIsLoginPop, updateGSaveLocalID} = useApp();

  const Login = () => {
    updateGSaveLocalID(null);
    setIsLoginPop(false);
    setNavigationState(navigationStateType.AUTH);
  };
  return (
    <View style={styles.centeredView}>
      <StatusBar backgroundColor={COLORS.primary} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setIsLoginPop(false)}>
        <View style={styles.View}>
          <View style={styles.modalView}>
            <LottieView
              source={require('../../assets/animation/LoginAnimation.json')}
              autoPlay
              loop={true}
              autoSize
              style={[genericStyles.width('50%')]}
            />
            <Text style={styles.topText}>Please Login</Text>
            <ButtonComponent
              title="Login"
              ButtonContainer={genericStyles.width('50%')}
              onPress={() => Login()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginAnimation;

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
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 20,
    // borderWidth: 1,
    // borderColor: COLORS.primary,
    width: '80%',
    height: '50%',
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
  topText: {
    fontSize: 16,
    fontFamily: FONTS.InterMedium,
    color: COLORS.primary,
    marginBottom: 10,
  },
  View: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(100,100,100, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
