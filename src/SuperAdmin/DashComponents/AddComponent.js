import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import DropDownComponent from '../../Components/DropDownComponent';
import {Card, Icon, Image} from 'react-native-elements';
import ButtonComponent from '../../Components/ButtonComponent';
import ModalPopup from '../../Components/ModalPopup';

const AddComponent = props => {
  return (
    <View style={genericStyles.Container}>
      <ScrollView style={styles.ScrollView}>
        {props.categoryName && (
          <>
            <Text style={styles.categoryTex}>{props.categoryName}</Text>
            <Card
              containerStyle={[
                styles.textAreaContainer,
                genericStyles.shadow,
                {padding: 0, height: 47},
              ]}>
              <DropDownComponent
                data={props.dropdownData}
                labelField="name"
                valueField="id"
                value={props.dropdownValue}
                maxHeight={150}
                onChange={props.onChangeDropDown}
                placeholderStyle={{fontFamily: FONTS.InterMedium}}
                dropdownStyle={styles.dropdownStyle}
              />
            </Card>
          </>
        )}
        {props.description && (
          <>
            <Text style={styles.categoryTex}>{props.description}</Text>
            <Card
              containerStyle={[styles.textAreaContainer, genericStyles.shadow]}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={5}
                multiline={true}
                value={props.msgValue}
                onChangeText={props.onChangeText}
                maxLength={300}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </Card>
            <Text style={styles.allowText}>300 characters only allowed</Text>
          </>
        )}
        <Text style={styles.categoryTex}>Upload Images</Text>
        <Text style={styles.categorySub}>{'(PNG, JPG files only)'}</Text>
        <TouchableOpacity activeOpacity={0.9} onPress={props.onUpload}>
          <Card containerStyle={styles.cardContainer}>
            <View style={genericStyles.selfCenter}>
              <Icon
                type="ionicon"
                name="cloud-upload"
                size={30}
                color={COLORS.primary}
                containerStyle={[styles.iconContainer, genericStyles.shadow]}
              />
              <Text style={styles.uploadText}>Upload</Text>
            </View>
          </Card>
        </TouchableOpacity>
        <ModalPopup
          visible={props.visible}
          CameraOnpress={props.CameraOnpress}
          GalleryOnpress={props.GalleryOnpress}
          OnPressCancel={props.OnPressCancel}
          onRequestClose={props.onRequestClose}
        />
        {props.uploadFiles && (
          <>
            <Text style={styles.categoryTex}>{props.uploadFiles}</Text>
            {props.singleImage && (
              <Card containerStyle={[styles.ImageCard, genericStyles.shadow]}>
                <Image
                  source={{uri: props.singleImage}}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Card>
            )}
          </>
        )}
      </ScrollView>
      <ButtonComponent
        title={props.buttonTitle}
        onPress={props.onPress}
        loading={props.loading}
        ButtonContainer={genericStyles.width('90%')}
      />
      <View style={genericStyles.height(20)} />
    </View>
  );
};

export default AddComponent;

const styles = StyleSheet.create({
  categoryTex: {
    fontFamily: FONTS.InterMedium,
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 20,
  },
  categorySub: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: '#999999',
    marginLeft: 20,
  },
  uploadText: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    marginTop: 5,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  ScrollView: {
    marginVertical: 20,
  },
  dropdownStyle: {
    borderBottomWidth: 0,
  },
  textArea: {
    height: 100,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    color: COLORS.primary,
    fontFamily: FONTS.InterMedium,
  },
  textAreaContainer: {
    borderWidth: 0,
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardContainer: {
    borderWidth: 0,
    elevation: 4,
    borderColor: COLORS.white,
    borderRadius: 5,
    paddingVertical: 25,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    alignSelf: 'center',
    borderRadius: 40,
    marginBottom: 5,
  },
  allowText: {
    color: '#999',
    fontFamily: FONTS.InterRegular,
    fontSize: 13,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 15,
  },
  ImageCard: {
    marginTop: 15,
    width: 350,
    height: 300,
    marginHorizontal: 20,
    alignSelf: 'center',
    margin: 0,
    padding: 0,
    borderRadius: 5,
    marginBottom: 10,
  },
});
