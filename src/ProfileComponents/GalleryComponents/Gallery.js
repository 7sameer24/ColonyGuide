import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import NoDataAni from '../../Components/NoDataAni';

const Gallery = ({navigation}) => {
  const [imgData, setimgData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const {Userdata, UserToken} = useApp();
  const {width, height} = useWindowDimensions();

  const idx = async () => {
    try {
      setIsLoading(true);
      const response = await axios(BaseURL('gallery'), {
        method: 'post',
        data: {locality_id: Userdata.userData.locality_id},
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      setIsLoading(false);
      if (response.data.success) {
        setimgData(response.data.gallery);
      }
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };
  useEffect(() => {
    idx();
    return () => {
      setimgData([]);
    };
  }, []);
  return (
    <View style={genericStyles.container}>
      {imgData.length > 0 && (
        <ScrollView>
          <View style={styles.Container}>
            {imgData.map(data => (
              <TouchableOpacity
                key={data.id}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('MoreImg', {
                    name: data.gallery_name,
                    NewData: data.gallery_image,
                  })
                }
                style={styles.containerStyle(width, height)}>
                <Image
                  source={{uri: data.gallery_image[0].gallery_image}}
                  style={{width: 64, height: 64, borderRadius: 10}}
                />
                <Text style={styles.title}>{data.gallery_name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      {loading && <Spinner />}
      {!loading && !imgData && <NoDataAni />}
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 11,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginTop: 5,
  },

  containerStyle: (width, height) => ({
    width: width / 5,
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  }),
});
