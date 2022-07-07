import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FONTS, genericStyles, Images} from '../../constants';
import HeaderBar from '../../Components/HeaderBar';
import Poweredby from '../../Components/Poweredby';
import ImageZoomComponent from '../../Components/ImageZoomComponent';

const MemberInfo = ({navigation, route}) => {
  const {infoData} = route.params;
  const [visible, setIsvisible] = useState(false);

  const arr = [
    {title: 'Relation', value: infoData.relation},
    {title: 'Name', value: infoData.name},
    {title: 'Gender', value: infoData.gender},
    {title: 'Education', value: infoData.education},
    {title: 'Mobile Number', value: infoData.mobile_no},
    {title: 'Email', value: infoData.email},
    {title: 'Blood Group', value: infoData.blood_group},
    {title: 'DOB', value: infoData.dob},
    {title: 'Current Work', value: infoData.current_work},
    {title: 'Marital Status', value: infoData.marital_status},
    {title: 'Looking For', value: infoData.looking_for},
  ];

  const ImageView = [{url: infoData.photo}];

  const images = [
    {
      props: {
        // Or you can set source directory.
        source: Images.Ellipse,
      },
    },
  ];

  return (
    <View style={genericStyles.Container}>
      {visible ? (
        <ImageZoomComponent
          visible={visible}
          ImageView={infoData.photo.includes('photo') ? ImageView : images}
          imageIndex={0}
          iconOnPress={() => setIsvisible(false)}
          onSwipeDown={() => setIsvisible(false)}
          onRequestClose={() => setIsvisible(false)}
        />
      ) : (
        <>
          <HeaderBar
            firstIcon="arrow-back-outline"
            title="Member Information"
            // bellIcon="create-outline"
            // ThirdType="ionicon"
            // thirdOnpress={() =>
            //   navigation.navigate('Edit Personal Details', {
            //     data: userData,
            //     token: userToken,
            //   })
            // }
            firstOnpress={() => navigation.goBack()}
          />
          <ScrollView>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsvisible(true)}>
              <Image
                source={
                  infoData.photo.includes('photo')
                    ? {uri: infoData.photo}
                    : Images.Ellipse
                }
                style={styles.ImageStyle}
              />
            </TouchableOpacity>
            <View style={styles.midd}>
              {arr.map((data, index) => (
                <View key={index}>
                  <Text style={styles.text}>{data.title}</Text>
                  <View style={styles.viewCon}>
                    <Text style={styles.full}>{data.value}</Text>
                  </View>
                </View>
              ))}
            </View>
            <Poweredby />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default MemberInfo;

const styles = StyleSheet.create({
  ImageStyle: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 100,
  },
  ChangeImgStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  ImageContainer: {
    backgroundColor: '#FEF6EF',
    paddingVertical: 5,
    borderRadius: 8,
    width: 30,
    elevation: 5,
    position: 'absolute',
    right: '30%',
    bottom: -7,
  },
  text: {
    fontSize: 14,
    color: '#666666',
    fontFamily: FONTS.InterMedium,
    marginTop: 5,
  },
  midd: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  full: {
    fontSize: 14,
    color: '#666666',
    fontFamily: FONTS.InterMedium,
  },
  viewCon: {
    borderRadius: 8,
    backgroundColor: '#F3EBF9',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});
