import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {genericStyles} from '../../constants';
import ImgCards from './ImgCards';

const MoreImg = ({navigation, route}) => {
  const [visible, setIsvisible] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const ImageZoom = index => {
    setimageIndex(index);
    setIsvisible(true);
  };

  const ImageView = route.params.NewData.map(data => ({
    url: data.gallery_image,
  }));
  return (
    <View style={genericStyles.container}>
      <ImgCards
        NewData={route.params.NewData}
        setimageIndex={setimageIndex}
        setIsvisible={setIsvisible}
        name={route.params.name}
        navigation={navigation}
        imageIndex={imageIndex}
        ImageZoom={ImageZoom}
        ImageView={ImageView}
        visible={visible}
      />
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
