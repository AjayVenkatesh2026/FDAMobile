import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  type GestureResponderEvent,
} from 'react-native';
import React from 'react';

import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';
import copies from 'src/constants/copies';
import font from 'src/styles/font';
import FDATextInput from 'src/components/molecules/FDATextInput';
import {button} from 'src/constants/styles';

const {EXAMPLE_PH_NO, CONTINUE, PHONE_NO, PHILIPPINES_COUNTRY_CODE} = copies;

const LoginContent = ({
  number,
  onNumberChange,
  onPressContinue,
}: {
  number: string;
  onNumberChange: (val: string) => void;
  onPressContinue: (val: GestureResponderEvent) => void;
}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, getThemedStyles({color: theme?.textMid})]}>
              {PHONE_NO}
            </Text>
          </View>
          <FDATextInput
            value={number}
            onChangeText={onNumberChange}
            placeholder={EXAMPLE_PH_NO}
            keyboardType="numeric"
            leftLabel={PHILIPPINES_COUNTRY_CODE}
            maxLength={10}
            containerStyles={getThemedStyles({
              borderColor: theme?.borderSecondary,
            })}
          />
          <TouchableOpacity
            style={[
              styles.button,
              button.buttonStyles,
              getThemedStyles({backgroundColor: theme?.primaryDefault}),
            ]}
            onPress={onPressContinue}>
            <Text
              style={[
                button.buttonTextStyles,
                getThemedStyles({color: theme?.bgTextHigh}),
              ]}>
              {CONTINUE}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 8,
  },
  title: {
    ...font.semiBold,
    fontSize: 32,
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 12,
  },
  textContainer: {
    marginBottom: 12,
  },
  text: {
    ...font.bold,
    fontSize: 13,
  },
  signUpText: {
    ...font.semiBold,
    fontSize: 13,
  },
  button: {
    marginTop: 16,
  },
});
