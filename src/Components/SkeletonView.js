import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Card} from 'react-native-elements';

const SkeletonView = ({containerStyle}) => {
  const skArr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <View style={[{...containerStyle}]}>
      {skArr.map((d, i) => (
        <Card key={i} containerStyle={styles.container}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={50}
                height={50}
                borderRadius={10}
                marginRight={11}
              />
              <SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={260}
                  height={10}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  marginTop={6}
                  width={200}
                  height={10}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  marginTop={6}
                  width={150}
                  height={10}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </Card>
      ))}
    </View>
  );
};

export default SkeletonView;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderColor: COLORS.primary,
    paddingVertical: 13,
  },
});
