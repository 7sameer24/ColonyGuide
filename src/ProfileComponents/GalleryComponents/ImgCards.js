import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import ImageZoomComponent from '../../Components/ImageZoomComponent';
import HeaderBar from '../../Components/HeaderBar';
import {Card} from 'react-native-elements';

const ImgCards = props => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={genericStyles.container}>
      {props.visible ? (
        <ImageZoomComponent
          visible={props.visible}
          ImageView={props.ImageView}
          imageIndex={props.imageIndex}
          iconOnPress={() => props.setIsvisible(false)}
          onSwipeDown={() => props.setIsvisible(false)}
          onRequestClose={() => props.setIsvisible(false)}
        />
      ) : (
        <>
          <HeaderBar
            firstIcon="arrow-back-outline"
            title={props.name}
            firstOnpress={() => props.navigation.goBack()}
          />
          <ScrollView>
            {props.description && (
              <Card containerStyle={styles.DesContainer}>
                <Text style={styles.title}>{props.description}</Text>
              </Card>
            )}
            {props.description && (
              <Text style={[styles.title, {marginHorizontal: 20}]}>
                More Images
              </Text>
            )}
            <View style={styles.Container}>
              {props.NewData.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => props.ImageZoom(index)}
                  style={styles.containerStyle(width, height)}>
                  <Image
                    source={{
                      uri: props.description
                        ? data.event_image
                        : data.gallery_image,
                    }}
                    style={{width: 64, height: 64, borderRadius: 10}}
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

export default ImgCards;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  containerStyle: (width, height) => ({
    width: width / 5,
    borderRadius: 10,
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  }),
  DesContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.14,
    shadowRadius: 5,

    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,

    marginTop: 15,
    marginBottom: 20,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 14,
    fontFamily: FONTS.InterRegular,
    textAlign: 'left',
    lineHeight: 22,
  },
});
