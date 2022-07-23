import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {Image} from 'react-native-elements';
import {useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import NoDataAni from '../../Components/NoDataAni';

const Gallery = ({navigation}) => {
  const [imgData, setimgData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const {Userdata, UserToken} = useApp();

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
                onPress={() =>
                  navigation.navigate('MoreImg', {
                    name: data.gallery_name,
                    NewData: data.gallery_image,
                  })
                }
                style={genericStyles.ai('center')}>
                <Image
                  source={require('../../../assets/Rectangle.png')}
                  style={{width: 64, height: 64}}
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
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 13,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
  },
});
