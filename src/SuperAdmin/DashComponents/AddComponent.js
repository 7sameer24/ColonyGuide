import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import DropDownComponent from '../../Components/DropDownComponent';
import {Card, Icon} from 'react-native-elements';

const AddComponent = props => {
  return (
    <View style={genericStyles.Container}>
      <ScrollView style={styles.ScrollView}>
        <Text style={styles.categoryTex}>Choose Category</Text>
        <DropDownComponent
          data={props.dropdownData}
          labelField="name"
          valueField="id"
          // placeholder="Select caste"
          value={props.dropdownValue}
          maxHeight={150}
          placeholderStyle={{fontFamily: FONTS.InterMedium}}
          dropdownStyle={styles.dropdownStyle}
        />
        {props.event && (
          <>
            <Text style={styles.categoryTex}>Event Description</Text>
            <Card
              containerStyle={[styles.textAreaContainer, genericStyles.shadow]}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something (300 characters only allowed)"
                placeholderTextColor="grey"
                numberOfLines={5}
                multiline={true}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </Card>
          </>
        )}
        <Text style={styles.categoryTex}>Upload Images</Text>
        <Text style={styles.categorySub}>{'(PNG, JPG files only)'}</Text>
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
        <Text style={styles.categoryTex}>Uploaded Files</Text>

        <View style={genericStyles.height(20)} />
      </ScrollView>
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
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
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
});
