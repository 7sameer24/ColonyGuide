import {COLORS, FONTS} from '../constants/theme';

const Toast = (toast, msg, type, duration) => {
  toast.show(msg, {
    type: type === undefined || type === null ? 'normal' : type,
    placement: 'bottom',
    duration: duration === undefined || duration === null ? 3000 : duration,
    offset: 50, // offset for both top and bottom toasts
    offsetTop: 30,
    offsetBottom: 40,
    textStyle: {
      color: COLORS.white,
      fontSize: 14,
      fontFamily: FONTS.InterRegular,
    },
    normalColor: COLORS.primary,
    animationType: 'zoom-in',
    successColor: '#55BB62',
  });
};

export default Toast;
