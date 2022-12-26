import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../../../Components/HeaderBar';
import {COLORS, genericStyles, Images} from '../../../constants';
import CardsListed from '../../../Components/CardsListed';
import axios from 'axios';
import BaseURL from '../../../constants/BaseURL';
import NoDataAni from '../../../Components/NoDataAni';
import SkeletonView from '../../../Components/SkeletonView';
import {Image} from 'react-native-elements';
import ImageZoomComponent from '../../../Components/ImageZoomComponent';

const ServiceList = ({navigation, route}) => {
  const {ID, Name, BannerImg} = route.params;
  const [data, setData] = useState([]);
  const [check, setCheck] = useState('');
  const [visible, setIsvisible] = useState(false);
  const [profileShow, updateProfile] = useState('');

  const FetchData = async () => {
    try {
      const response = await axios
        .post(BaseURL('service-list'), {
          category_id: ID,
        })
        .then(response => {
          if (response.data.success === true) {
            setData(response.data.service);
          } else {
            setCheck(response.data.success);
          }
        });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    FetchData();
    return () => {
      setData([]);
    };
  }, []);
  const ImageView = [{url: profileShow}];

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
          ImageView={
            profileShow === 'https://colonyguide.com/portal/storage'
              ? images
              : ImageView
          }
          imageIndex={0}
          iconOnPress={() => setIsvisible(false)}
          onSwipeDown={() => setIsvisible(false)}
          onRequestClose={() => setIsvisible(false)}
        />
      ) : (
        <>
          <HeaderBar
            firstIcon="arrow-back-outline"
            title={Name}
            // searchIcon="search"
            // bellIcon="filter"
            ThirdType="material-community"
            firstOnpress={() => navigation.goBack()}
          />

          {check === false ? (
            <NoDataAni />
          ) : (
            <>
              {data.length > 0 ? (
                <ScrollView>
                  {/* {BannerImg.includes('jpg') && (
                <Image
                fadeDuration={0}
                source={{uri: BannerImg}}
                style={{width: '100%', height: 180}}
                placeholderStyle={genericStyles.bg(COLORS.white)}
                PlaceholderContent={<ActivityIndicator color={COLORS.primary} />}
              />
              )} */}
                  {data.map((data, index) => (
                    <TouchableOpacity
                      key={data.id}
                      activeOpacity={0.9}
                      onPress={() =>
                        navigation.navigate('Service Information', {
                          ID: data.id,
                          infoData: data,
                        })
                      }>
                      <CardsListed
                        onProfileShow={() => {
                          setIsvisible(true);
                          updateProfile(data.logo_image);
                        }}
                        source={
                          data.logo_image ===
                          'https://colonyguide.com/portal/storage'
                            ? require('../../../../assets/Image_not_available.png')
                            : {uri: data.logo_image}
                        }
                        index={index}
                        title={data.name}
                        subTitle={`${data.house_no}, ${data.address}, ${
                          data.landmark == null ? '' : data.landmark
                        }`}
                        // category={data.about}
                        GeoLocation={data.geolocation}
                        phoneNumber={data.contact_person_mobile}
                        WhatsAppNumber={data.contact_person_whatsapp}
                        // ShortDescription={data.about}
                        navigation={navigation}
                        userId={data.user_id}
                        serviceId={data.id}
                        googleNavigate={`${data.house_no}+${data.address}, Udaipur, Rajasthan`}
                      />
                    </TouchableOpacity>
                  ))}
                  <View style={genericStyles.height(20)} />
                </ScrollView>
              ) : (
                <ScrollView>
                  <SkeletonView />
                  <View style={genericStyles.height(20)} />
                </ScrollView>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ServiceList;
