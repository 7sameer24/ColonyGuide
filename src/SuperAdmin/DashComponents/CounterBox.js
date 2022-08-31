import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {Card} from 'react-native-elements';

const CounterBox = props => {
  const {SvgComponent} = props;

  const mapData = [
    {
      name: 'Active',
      name2: 'Total',
      totalNumber: props.activeNumber,
      totalNumber2: props.totalNumber,
    },
    {
      name: 'Deactive',
      name2: 'Today',
      totalNumber: props.deactiveNumber,
      totalNumber2: props.todayNumber,
    },
  ];
  return (
    <Card containerStyle={[styles.cardContainer, genericStyles.shadow]}>
      <View style={styles.fourCategoriesContainer(props.color)}>
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
      <View style={styles.fourCategoriesContainer2}>
        {mapData.map((d, ind) => (
          <View key={ind} style={genericStyles.mv(10)}>
            <View style={{marginTop: 10, alignItems: 'center'}}>
              <Card
                containerStyle={[
                  genericStyles.shadow,
                  styles.iconContainer,
                  {backgroundColor: props.color, borderRadius: 10},
                ]}>
                <Text style={[styles.text, genericStyles.color(COLORS.white)]}>
                  {d.totalNumber2}
                </Text>
              </Card>
              <Text style={[styles.text, genericStyles.mv(4)]}>{d.name2}</Text>
            </View>
            <View style={genericStyles.ai('center')}>
              <Card
                containerStyle={[
                  genericStyles.shadow,
                  styles.iconContainer,
                  {backgroundColor: props.color, borderRadius: 10},
                ]}>
                <Text style={[styles.text, genericStyles.color(COLORS.white)]}>
                  {d.totalNumber}
                </Text>
              </Card>
              <Text style={[styles.text, genericStyles.mv(4)]}>{d.name}</Text>
            </View>
          </View>
        ))}
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
    // alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  }),
  fourCategoriesContainer2: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontFamily: FONTS.InterMedium,
    fontSize: 12,
    color: COLORS.black,
  },
  text2: {
    fontFamily: FONTS.InterMedium,
    fontSize: 12,
    color: COLORS.white,
    textAlign: 'left',
    width: 70,
  },
  cardContainer: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
    borderRadius: 10,
    width: 170,
    marginHorizontal: 10,
    marginBottom: 10,
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
