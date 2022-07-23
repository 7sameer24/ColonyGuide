import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {genericStyles} from '../../constants';
import {Image} from 'react-native-elements';
import HeaderBar from '../../Components/HeaderBar';
import ImageZoomComponent from '../../Components/ImageZoomComponent';

const MoreImg = ({navigation, route}) => {
  const [visible, setIsvisible] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);

  const ImageZoom = index => {
    setimageIndex(index);
    setIsvisible(true);
  };

  const ImageView = route.params.NewData.map(data => ({
    url: data.gallery.gallery_image,
  }));
  return (
    <View style={genericStyles.container}>
      {visible ? (
        <ImageZoomComponent
          visible={visible}
          ImageView={ImageView}
          imageIndex={imageIndex}
          iconOnPress={() => setIsvisible(false)}
          onSwipeDown={() => setIsvisible(false)}
          onRequestClose={() => setIsvisible(false)}
        />
      ) : (
        <>
          <HeaderBar
            firstIcon="arrow-back-outline"
            title={route.params.name}
            firstOnpress={() => navigation.goBack()}
          />
          <ScrollView>
            <View style={styles.Container}>
              {route.params.NewData.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => ImageZoom(index)}
                  style={genericStyles.ai('center')}>
                  <Image
                    source={require('../../../assets/Rectangle.png')}
                    style={{width: 64, height: 64}}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default MoreImg;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-around',
  },
});
