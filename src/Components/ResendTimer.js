import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import FooterButton from './FooterButton';

const ResendTimer = ({
  activeResend,
  resendingOTP,
  resendStatus,
  targetTime,
  timeLeft,
  resendOtp,
}) => {
  return (
    <View>
      <View style={[genericStyles.row, {alignSelf: 'center', marginTop: 20}]}>
        <Text style={styles.ResendText}>Didn't recevie the OTP</Text>
        {!resendingOTP && (
          <FooterButton
            disabled={!activeResend && true}
            onPress={resendOtp}
            resendTouch={{opacity: !activeResend && 0.5}}
            title="Resend OTP"
            textStyle={{
              marginLeft: 5,
              textDecorationLine: 'underline',
              color: COLORS.primary,
            }}
          />
        )}
        {resendingOTP && (
          <>
            <FooterButton title="Resend OTP" textStyle={genericStyles.ml(5)} />
            <ActivityIndicator />
          </>
        )}
      </View>
      {!activeResend && (
        <Text style={styles.ResendText}>
          in {timeLeft || targetTime} second(s)
        </Text>
      )}
    </View>
  );
};

export default ResendTimer;

const styles = StyleSheet.create({
  ResendText: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: COLORS.third,
    alignSelf: 'center',
  },
});
