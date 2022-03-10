import {StyleSheet} from 'react-native';

export const genericStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleStyle: {
    color: 'white',
  },
  fill: {
    flex: 1,
  },
  header: {
    marginTop: 0,
  },
  fontFamily: {
    // fontFamily: 'Roboto',
  },
  ph: paddingHorizontal => ({
    paddingHorizontal,
  }),
  bg: backgroundColor => ({
    backgroundColor,
  }),
  color: color => ({
    color,
  }),
  ph20: {
    paddingHorizontal: 20,
  },
  rowWithCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowWithCenterAndSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowWithSB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontSize: fontSize => ({
    fontSize,
  }),
  height: height => ({
    height,
  }),
  borderColor: borderColor => ({
    borderColor,
  }),
  width: width => ({
    width,
  }),
  pr: paddingRight => ({
    paddingRight,
  }),
  pb: paddingBottom => ({
    paddingBottom,
  }),

  pt: paddingTop => ({
    paddingTop,
  }),
  pv: paddingVertical => ({
    paddingVertical,
  }),

  pl: paddingLeft => ({
    paddingLeft,
  }),
  mb: marginBottom => ({
    marginBottom,
  }),
  mt: marginTop => ({
    marginTop,
  }),
  ml: marginLeft => ({
    marginLeft,
  }),
  mr: marginRight => ({
    marginRight,
  }),
  mh: marginHorizontal => ({
    marginHorizontal,
  }),
  mv: marginVertical => ({
    marginVertical,
  }),
  m: margin => ({
    margin,
  }),
  jc: justifyContent => ({
    justifyContent,
  }),
  ai: alignItems => ({
    alignItems,
  }),
  padding: padding => ({
    padding,
  }),
  row: {
    flexDirection: 'row',
  },
  Textbold: fontWeight => ({
    fontWeight,
  }),
  darkTilet: (height, width) => ({
    backgroundColor: 'rgba(0,0,0,0.4)',
    height,
    width,
    position: 'absolute',
  }),
  upperCase: {
    textTransform: 'uppercase',
  },
  rowWithWrap: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  rowWithWrapCenter: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  offerText: {
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  textCenter: {
    textAlign: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  selfStart: {
    alignSelf: 'flex-start',
  },
  selfEnd: {
    alignSelf: 'flex-end',
  },
  zIndex: zIndex => ({
    zIndex,
  }),
  tintColor: tintColor => ({
    tintColor,
  }),
  borderWidth: borderWidth => ({
    borderWidth,
  }),
  textDecorationLine: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.14,
    shadowRadius: 5,

    elevation: 5,
    // backgroundColor: '#fff',
  },
  headerIcon: backgroundColor => ({
    backgroundColor,
    padding: 10,
    borderRadius: 100,
  }),
  iconBg: backgroundColor => ({
    padding: 10,
    backgroundColor,
    borderRadius: 50,
  }),
  bbw: borderBottomWidth => ({
    borderBottomWidth,
  }),
  borderRadius: borderRadius => ({
    borderRadius,
  }),
  positionRelative: {
    position: 'relative',
  },
  badgeStyle: {
    position: 'absolute',
    top: -3,
    right: -3,
  },
  rowText: {
    // color: BASIC_COLORS.REGENT_GRAY,
    fontSize: 12,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 14,
    paddingBottom: 10,
    paddingLeft: 6,
  },
  headerPadding: {
    marginTop: 5,
    paddingHorizontal: 16,
  },
  modalHeaderPadding: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  flexWrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
  top: top => ({top}),
  fr: {
    flexDirection: 'row-reverse',
  },
  left: left => ({
    left,
  }),
  bottom: bottom => ({
    bottom,
  }),
  FD: flexDirection => ({
    flexDirection,
  }),
  right: right => ({
    right,
  }),
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  column: {
    flexDirection: 'column',
  },
});
