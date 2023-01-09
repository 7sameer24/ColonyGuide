import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Icon, Image} from 'react-native-elements';
import CounterBox from './CounterBox';
import BaseURL from '../../constants/BaseURL';
import axios from 'axios';
import {useApp} from '../../../Context/AppContext';
import SkeletonView from '../../Components/SkeletonView';
import {ScrollView} from 'react-native';
import ButtonComponent from '../../Components/ButtonComponent';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';
import NoDataAni from '../../Components/NoDataAni';

const Cart = ({navigation}) => {
  const [allData, updateAllData] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [orderLoading, updateOrderLoading] = useState(false);
  const toast = useToast();

  const {Userdata, UserToken, onCartApi, count, updateCount} = useApp();

  const fetchCart = async () => {
    updateAllData([]);
    try {
      updateLoading(true);
      const response = await axios(BaseURL('cart-list'), {
        method: 'post',
        data: {user_id: Userdata.userData.id},
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      updateLoading(false);
      if (response.data.success == true) {
        updateAllData(response.data);
        console.log(response.data.total_price);
      }
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };

  const orderPlace = async () => {
    updateOrderLoading(true);
    try {
      const response = await axios(BaseURL('order-place'), {
        method: 'post',
        data: {user_id: Userdata.userData.id},
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      updateOrderLoading(false);
      if (response.data.success == true) {
        Toast(toast, 'Order Place successfully');
        updateCount(0);
        navigation.navigate('Homee');
      }
    } catch (error) {
      updateOrderLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <View style={genericStyles.container}>
      {allData.data?.length > 0 && (
        <>
          <ScrollView>
            {allData.data.map((d, i) => {
              const key = d.product?.id;
              return (
                <Card
                  key={i}
                  containerStyle={styles.ItemCard}
                  wrapperStyle={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                  }}>
                  <View style={genericStyles.rowWithCenter}>
                    {/* <Image
              source={{
                uri: imageURL(d.product.image),
              }}
              style={styles.orderImg}
            /> */}
                    <View>
                      <Text numberOfLines={1} style={styles.subtitle}>
                        {d.product?.name}
                      </Text>
                      <Text numberOfLines={1} style={styles.subtitle}>
                        {`₹ ${d.product?.price} (${d.product?.variation})`}
                      </Text>
                      <CounterBox
                        plus={() => {
                          onCartApi(key, 'Plus', d.product?.user_id);
                          let price = parseInt(d.product.price);
                          allData.total_price += price;
                        }}
                        minus={() => {
                          onCartApi(key, 'Minus', d.product?.user_id);
                          let price = parseInt(d.product.price);
                          allData.total_price -= price;
                        }}
                        Qnty={count[key]}
                        touch={{paddingVertical: 0}}
                        styleContainer={styles.container}
                        textStyle={genericStyles.color(COLORS.primary)}
                      />
                    </View>
                  </View>
                  <Icon
                    size={25}
                    color="red"
                    name="trash"
                    onPress={() => {
                      onCartApi(key, 'Remove', d.product?.user_id);
                      fetchCart();
                    }}
                    type="ionicon"
                    containerStyle={genericStyles.mb(5)}
                  />
                </Card>
              );
            })}
          </ScrollView>
          <View
            style={[
              genericStyles.rowWithCenterAndSB,
              {marginHorizontal: 20, marginBottom: 10},
            ]}>
            <Text numberOfLines={1} style={styles.subtitle}>
              Payable Amount
            </Text>
            <Text numberOfLines={1} style={styles.subtitle}>
              {allData.total_price}
            </Text>
          </View>
          <ButtonComponent
            title="Place Order"
            loading={orderLoading}
            onPress={() => orderPlace()}
            ButtonContainer={{width: '90%', marginBottom: 10}}
          />
        </>
      )}
      {loading && <SkeletonView />}
      {!loading && allData.data?.length === 0 && <NoDataAni />}
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
