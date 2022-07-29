import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import ImageZoomComponent from '../../Components/ImageZoomComponent';
import HeaderBar from '../../Components/HeaderBar';
import {Card, Image} from 'react-native-elements';

const ImgCards = props => {
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
                  style={styles.containerStyle}>
                  <View
                    style={{flex: 1, borderRadius: 10, alignItems: 'center'}}>
                    <Image
                      source={{
                        uri: props.description
                          ? data.event_image
                          : data.gallery_image,
                      }}
                      placeholderStyle={genericStyles.bg(COLORS.white)}
                      PlaceholderContent={
                        <ActivityIndicator color={COLORS.primary} />
                      }
                      style={{width: 64, height: 64, borderRadius: 10}}
                    />
                  </View>
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
    flex: 1,
    padding: 5,
    marginTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  containerStyle: {
    width: '25%',
    height: '52%',
    padding: 5,
  },
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
