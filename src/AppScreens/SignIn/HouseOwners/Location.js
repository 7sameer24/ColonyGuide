import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, genericStyles, Images} from '../../../constants';
import ButtonComponent from '../../../Components/ButtonComponent';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Location = ({navigation}) => {
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
  const location = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        switch (result) {
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });
  };
  Geolocation.getCurrentPosition(info => setLatitude(info.coords.latitude));
  Geolocation.getCurrentPosition(info => setLongitude(info.coords.longitude));

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
          showsUserLocation={true}>
          <MapView.Marker
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
          />
        </MapView>
      </View>
      <ButtonComponent
        title="Enter address"
        ButtonContainer={styles.abb}
        onPress={() => location()}
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
    // ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '87%',
    alignSelf: 'center',
    // marginTop: 15,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
