import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Icon, Image} from 'react-native-elements';
import CounterBox from './CounterBox';

const Cart = () => {
  return (
    <View style={genericStyles.container}>
      <Card
        containerStyle={styles.ItemCard}
        wrapperStyle={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
        <View style={genericStyles.rowWithCenter}>
          {/* <Image
                source={{
                  uri: imageURL(x.item_rows.item_images[0].image_name),
                }}
                style={styles.orderImg}
              /> */}
          <View>
            <Text numberOfLines={1} style={styles.subtitle}>
              Paneer
            </Text>
            <Text numberOfLines={1} style={styles.subtitle}>
              30/kg
            </Text>
            <CounterBox
              Qnty="1"
              styleContainer={styles.container}
              touch={{paddingVertical: 0}}
              textStyle={genericStyles.color(COLORS.primary)}
            />
          </View>
        </View>
        <Icon
          size={25}
          color="red"
          name="trash"
          type="ionicon"
          containerStyle={genericStyles.mb(5)}
        />
      </Card>
    </View>
  );
};

export default Cart;

export const styles = StyleSheet.create({
  ItemCard: {
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  orderImg: {
    width: 65,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  subtitle: {
    fontFamily: FONTS.InterRegular,
    fontSize: 16,
    color: COLORS.black,
    marginVertical: 2,
  },
  container: {
    width: 150,
    borderRadius: 5,
    marginVertical: 0,
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: COLORS.primary,
    justifyContent: 'space-around',
    borderWidth: 1,
    marginTop: 10,
  },
  ButtonContainer: {
    width: '43%',
    marginRight: 5,
  },
  ButtonContainer2: {
    width: '43%',
    marginLeft: 5,
  },
  buttonDiraction: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  add: {
    marginBottom: 10,
    marginTop: 5,
  },
  rowAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  plus: {fontSize: 20, marginTop: 2},
});
