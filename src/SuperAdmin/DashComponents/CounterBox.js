import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {Card} from 'react-native-elements';

const CounterBox = props => {
  const {SvgComponent} = props;
  return (
    <Card containerStyle={[styles.cardContainer, genericStyles.shadow]}>
      <View style={styles.fourCategoriesContainer(props.color)}>
        <Text style={styles.text}>{props.totalNumber}</Text>
      </View>
      <View style={styles.fourCategoriesContainer2}>
        <View style={[genericStyles.row, styles.whiteContainer]}>
          <Card containerStyle={[genericStyles.shadow, styles.iconContainer]}>
            <SvgComponent />
          </Card>
          <View>
            <Text style={styles.text2}>{props.title}</Text>
            <Text style={styles.text2} numberOfLines={1}>
              {props.subTitle}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default CounterBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginBottom: 20,
  },
  fourCategoriesContainer: bg => ({
    backgroundColor: bg,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  }),
  fourCategoriesContainer2: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  text: {
    fontFamily: FONTS.InterMedium,
    fontSize: 20,
    color: COLORS.white,
  },
  text2: {
    fontFamily: FONTS.InterMedium,
    fontSize: 12,
    color: COLORS.black,
    textAlign: 'left',
    width: 70,
  },
  cardContainer: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
    borderRadius: 10,
    width: 160,
    height: 112,
  },
  iconContainer: {
    borderRadius: 50,
    width: 40,
    height: 40,
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  whiteContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
});
