import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Text} from 'react-native-paper';
import containers from 'src/styles/containers';
import copies from 'src/constants/copies';
import font from 'src/styles/font';
import {useAppSelector} from 'src/hooks/reduxHooks';

const {EMPTY_RESULTS} = copies;

const EmptySearch = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={[font.medium, {color: theme?.textMid}]}>
        {EMPTY_RESULTS}
      </Text>
    </View>
  );
};

export default EmptySearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...containers.columnCenterCenter,
    paddingTop: 80,
  },
});
