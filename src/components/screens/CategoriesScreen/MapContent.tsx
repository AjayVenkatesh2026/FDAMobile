import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React from 'react';

import map from 'src/assets/dummy/maps/dummy-map.png';

const {width: WINDOW_WIDTH} = Dimensions.get('window');

const MapContent = () => {
  return (
    <View style={styles.container}>
      <Image
        source={map}
        style={{width: WINDOW_WIDTH, height: 1.5 * WINDOW_WIDTH}}
        resizeMethod="scale"
        resizeMode="cover"
      />
    </View>
  );
};

export default MapContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
