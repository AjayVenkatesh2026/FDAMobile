import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type ViewStyle,
  type TextInputProps,
} from 'react-native';
import React from 'react';
import font from 'src/styles/font';
import {getThemedStyles} from 'src/utils/theme';
import {useAppSelector} from 'src/hooks/reduxHooks';
import containers from 'src/styles/containers';

interface IFDATextInput extends TextInputProps {
  leftLabel: string;
  containerStyles?: ViewStyle;
  textInputStyles?: TextInputProps;
}

const FDATextInput = ({
  leftLabel = '',
  containerStyles = {},
  textInputStyles = {},
  ...restProps
}: IFDATextInput) => {
  const theme = useAppSelector(state => state.themeReducer.theme);

  return (
    <View style={[styles.container, containerStyles]}>
      {leftLabel ? (
        <Text
          style={[
            styles.label,
            getThemedStyles({
              color: theme?.textHigh,
              backgroundColor: theme?.highlight,
            }),
          ]}>
          {leftLabel}
        </Text>
      ) : null}
      <TextInput
        {...restProps}
        style={[
          styles.textInput,
          getThemedStyles({backgroundColor: theme?.surface}),
          textInputStyles,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...containers.rowCenterStart,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  label: {
    ...font.semiBold,
    fontSize: 16,
    alignSelf: 'stretch',
    textAlignVertical: 'center',
    paddingLeft: 12,
    paddingRight: 8,
    includeFontPadding: false,
  },
  textInput: {
    flex: 1,
    ...font.medium,
    letterSpacing: 0.75,
    fontSize: 16,
    includeFontPadding: false,
    paddingLeft: 8,
  },
});

export default FDATextInput;
