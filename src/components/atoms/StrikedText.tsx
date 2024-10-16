import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Divider, Text} from 'react-native-paper';

import font from 'src/styles/font';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';
import containers from 'src/styles/containers';
import type {IStrikedTextProps} from 'src/types/atoms';

const StrikedText: React.FC<IStrikedTextProps> = ({
  label,
  showDots = false,
  containerStyles = {},
}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);

  return (
    <View style={[styles.container, containerStyles]}>
      {showDots ? (
        <View
          style={[
            styles.dot,
            getThemedStyles({backgroundColor: theme?.textDisabled}),
          ]}
        />
      ) : null}
      <Divider style={styles.divider} />
      <Text
        variant="bodyMedium"
        style={[styles.text, getThemedStyles({color: theme?.textLow})]}>
        {label}
      </Text>
      <Divider style={styles.divider} />
      {showDots ? (
        <View
          style={[
            styles.dot,
            getThemedStyles({backgroundColor: theme?.textDisabled}),
          ]}
        />
      ) : null}
    </View>
  );
};

export default StrikedText;

const styles = StyleSheet.create({
  container: {
    ...containers.rowCenterCenter,
  },
  text: {
    ...font.medium,
    marginHorizontal: 8,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
