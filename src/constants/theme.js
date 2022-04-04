import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#8937C7', // light blue
  secondary: '#C2C2C2', // gray
  third: '#888888', // gray
  textColor: '#292626',

  // colors
  black: '#000',
  white: '#fff',
  red: '#FF0000',
  blue: '#0000FF',
  RoyalBlue: '#2e64e5',
  MoodyBlue: '#7474d2',

  lightGray: '#F5F5F6',
  lightGray2: '#DCDCDC',
  transparent: 'transparent',
  darkgray: '#898C95',
  opacity: '#f2f2f2',
  newColor: '#F4F5F7',
  lawngreen: '#00FF00',
  success: '#47b913',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 22},
  InterBlack: 'Inter-Black',
  InterBold: 'Inter-Bold',
  InterExtraBold: 'Inter-ExtraBold',
  InterExtraLight: 'Inter-ExtraLight',
  InterLight: 'Inter-Light',
  InterMedium: 'Inter-Medium',
  InterRegular: 'Inter-Regular',
  InterSemiBold: 'Inter-SemiBold',
  InterThin: 'Inter-Thin',
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
