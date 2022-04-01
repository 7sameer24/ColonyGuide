import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../constants';
import InputComponent from '../Components/InputComponent';
import {CheckBox} from 'react-native-elements';
import ButtonComponent from '../Components/ButtonComponent';
import Poweredby from '../Components/Poweredby';
import {launchImageLibrary} from 'react-native-image-picker';
import DropDownComponent from '../Components/DropDownComponent';
import {useApp} from '../../Context/AppContext';

const Addroom = ({navigation}) => {
  const [spinner, setSpinner] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [Category, setCategory] = useState('');
  const [roomType, setRoomType] = useState('');
  const [imageUp, setImage] = useState('');
  const [building_name, setBN] = useState('');
  const [PersonName, setPersonName] = useState('');
  const [buildFL, setBuildFL] = useState('');
  const [AL1, setAL1] = useState('');
  const [AL2, setAL2] = useState('');
  const [Landmark, setLandmark] = useState('');
  const {Userdata, UserToken} = useApp();

  const CategoryData = [
    {label: 'Hostel', value: '0'},
    {label: 'Rooms/Flates', value: '1'},
  ];
  const RoomType = [
    {label: '1 BHk', value: '1'},
    {label: '2 BHK', value: '2'},
    {label: '3 BHk', value: '3'},
    {label: '4 BHk', value: '4'},
  ];

  const checkBoxArr = [
    {title: 'Only boys', value: check2, setValue: setCheck2},
    {title: 'Only girls', value: check3, setValue: setCheck3},
    {title: 'Family', value: check4, setValue: setCheck4},
  ];

  const openImage = () => {
    let opetions = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeExtra: true,
    };
    launchImageLibrary(opetions, response => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image ErrorCode', response.errorCode);
      } else if (response.errorMessage) {
        console.log('Image error Message', response.errorMessage);
      } else {
        const source = response.assets;
        setImage(source);
      }
    });
  };

  const SaveDetail = async () => {
    try {
      setSpinner(true);
      const URL =
        'https://colonyguide.garimaartgallery.com/api/add-room-hostel';

      const data = new FormData();
      data.append('user_id', Userdata.userData.id);
      data.append('building_name', Userdata.userData.app_role_id);
      data.append('contact_person', PersonName);
      data.append('category', Category);
      data.append('room_type_id', Category === 1 ? roomType : '');
      data.append('is_veg', 1);
      data.append('renter_type', 1);
      data.append('address', `${buildFL},${AL1},${AL2},${Landmark}`);
      data.append(
        'logo_image',
        imageUp !== ''
          ? {
              uri: imageUp[0].uri,
              type: imageUp[0].type,
              name: imageUp[0].fileName,
            }
          : '',
      );
      const res = await fetch(URL, {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${UserToken}`,
        },
      });
      let response = await res.json();
      setSpinner(false);
      if (response.success === true) {
        navigation.navigate('Feed');
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      } else {
        console.log(response);
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setSpinner(false);
      alert(error);
    }
  };

  return (
    <View style={genericStyles.Container}>
      <ScrollView>
        <TouchableOpacity
          style={genericStyles.selfCenter}
          activeOpacity={0.5}
          onPress={() => openImage()}>
          <View style={styles.imageConatiner(imageUp)}>
            <Image
              source={imageUp ? imageUp : Images.BusinessProfile}
              style={styles.imageStyle(imageUp)}
            />
          </View>
          <Text style={styles.AddLogoText}>Add image / logo</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>Room Details</Text>
        <InputComponent
          placeholder="Building / Hostel Name"
          value={building_name}
          onChangeText={text => setBN(text)}
          autoCapitalize="words"
        />
        <InputComponent
          placeholder="Contact person’s name"
          value={PersonName}
          onChangeText={text => setPersonName(text)}
          autoCapitalize="words"
        />
        <DropDownComponent
          placeholder="Select category"
          labelField="label"
          valueField="value"
          data={CategoryData}
          value={Category}
          maxHeight={110}
          onChange={item => setCategory(item.value)}
        />
        {Category == 0 ? null : (
          <>
            <DropDownComponent
              placeholder="Room type"
              data={RoomType}
              value={roomType}
              onChange={item => setRoomType(item.value)}
              labelField="label"
              valueField="value"
              maxHeight={170}
            />
            <CheckBox
              title="Only Vegetarian"
              checked={check1}
              onPress={() => setCheck1(!check1)}
              checkedColor={COLORS.primary}
              containerStyle={styles.checkBoxContanier}
              textStyle={styles.CheckText}
            />
          </>
        )}
        <Text style={styles.textStyle}>SELECT</Text>
        <View style={genericStyles.row}>
          {checkBoxArr.map(data => (
            <CheckBox
              key={data.title}
              title={data.title}
              checked={data.value}
              onPress={() => data.setValue(!data.value)}
              checkedColor={COLORS.primary}
              containerStyle={styles.checkBoxContanier}
              textStyle={styles.CheckText}
            />
          ))}
        </View>
        <Text style={styles.textStyle}>Address</Text>
        <InputComponent
          placeholder="Building / Flat Number"
          value={buildFL}
          onChangeText={text => setBuildFL(text)}
          autoCapitalize="words"
        />
        <InputComponent
          placeholder="Address Line 1"
          value={AL1}
          autoCapitalize="words"
          onChangeText={text => setAL1(text)}
        />
        <InputComponent
          placeholder="Address Line 2"
          value={AL2}
          autoCapitalize="words"
          onChangeText={text => setAL2(text)}
        />
        <InputComponent
          placeholder="Landmark (optional)"
          value={Landmark}
          autoCapitalize="words"
          containerStyle={genericStyles.mb(10)}
          onChangeText={text => setLandmark(text)}
        />
        <ButtonComponent
          title="Save"
          ButtonContainer={genericStyles.mb(30)}
          loading={spinner ? true : false}
          onPress={() => SaveDetail()}
        />
        <Poweredby container={genericStyles.mb(5)} />
      </ScrollView>
    </View>
  );
};

export default Addroom;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontFamily: FONTS.InterMedium,
    color: COLORS.textColor,
    marginLeft: 20,
    marginTop: 10,
  },
  checkBoxContanier: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    marginBottom: 0,
  },
  CheckText: {
    color: COLORS.third,
    fontSize: 14,
    marginLeft: 2,
    fontFamily: FONTS.InterRegular,
    fontWeight: 'normal',
  },
  imageConatiner: imageUp => ({
    backgroundColor: imageUp ? COLORS.white : COLORS.secondary,
    padding: imageUp ? 0 : 15,
    borderRadius: 50,
    alignSelf: 'center',
  }),
  imageStyle: imageUp => ({
    width: imageUp ? 70 : 40,
    height: imageUp ? 70 : 40,
    borderRadius: imageUp ? 50 : 0,
  }),
  AddLogoText: {
    fontSize: 12,
    color: COLORS.third,
    marginBottom: 10,
    fontFamily: FONTS.InterMedium,
  },
});
