import {PermissionsAndroid, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, genericStyles, Images} from '../../../constants';
import ButtonComponent from '../../../Components/ButtonComponent';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Location = ({navigation, route}) => {
  const {
    shopName,
    fullName,
    WhatsappNo,
    category,
    userData,
    imageUp,
    shortDes,
  } = route.params;
  const [latitude, setLatitude] = useState(24.5826);
  const [longitude, setLongitude] = useState(73.7191);
  const [pin, setPin] = useState({
    latitude: latitude,
    longitude: longitude,
  });

  const idx = () => {
    setLatitude(latitude);
    setLongitude(longitude);
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(info =>
          setLatitude(info.coords.latitude),
        );
        Geolocation.getCurrentPosition(info =>
          setLongitude(info.coords.longitude),
        );
      } else {
        ToastAndroid.show('Location permission denied', ToastAndroid.SHORT);
      }
    } catch (err) {
      ToastAndroid.show(JSON.stringify(err), ToastAndroid.SHORT);
    }
  };
  return (
    <View style={genericStyles.Container}>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          mapType="standard"
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          userLocationPriority="high"
          showsMyLocationButton={true}
          showsUserLocation={true}
          loadingEnabled={true}
          loadingIndicatorColor={COLORS.primary}>
          {/* <MapView.Marker
            coordinate={pin}
            image={Images.LocationIcon}
            draggable={true}
            onDragStart={e => console.log(e.nativeEvent.coordinate)}
            onDragEnd={e =>
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
            }
          /> */}
        </MapView>
      </View>
      <ButtonComponent
        title="Enter address"
        ButtonContainer={styles.abb}
        onPress={() =>
          navigation.navigate('Address', {
            latitude: latitude,
            longitude: longitude,
            ShopName: shopName,
            FullName: fullName,
            WhatsappNum: WhatsappNo,
            CategoryShop: category,
            UserData: userData,
            imageLogo: imageUp,
            ShortDescription: shortDes,
          })
        }
      />
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  abb: {
    position: 'absolute',
    width: '90%',
    bottom: 20,
  },
  container: {
    width: '100%',
    height: '87%',
    alignSelf: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
