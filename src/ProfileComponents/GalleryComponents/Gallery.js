import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import NoDataAni from '../../Components/NoDataAni';
import {Image} from 'react-native-elements';

const Gallery = ({navigation}) => {
  const [imgData, setimgData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const {Userdata, UserToken, adminData, adminToken} = useApp();

  const idx = async () => {
    try {
      setIsLoading(true);
      const response = await axios(BaseURL('gallery'), {
        method: 'post',
        data: {
          locality_id: Userdata
            ? Userdata.userData.locality_id
            : adminData.userData.locality_id
            ? adminData.userData.locality_id
            : 1,
        },
        headers: {
          Authorization: `Bearer ${Userdata ? UserToken : adminToken}`,
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
                style={styles.containerStyle}>
                <View style={{flex: 1, borderRadius: 10, alignItems: 'center'}}>
                  <Image
                    source={{uri: data.gallery_image[0].gallery_image}}
                    style={{width: 64, height: 64, borderRadius: 10}}
                    placeholderStyle={genericStyles.bg(COLORS.white)}
                    PlaceholderContent={
                      <ActivityIndicator color={COLORS.primary} />
                    }
                  />
                  <Text style={styles.title}>{data.gallery_name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      {loading && <Spinner />}
      {!loading && imgData.length == [] && <NoDataAni />}
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  title: {
    fontSize: 11,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginTop: 5,
  },

  containerStyle: {
    width: '25%',
    height: '52%',
    padding: 5,
  },
});
