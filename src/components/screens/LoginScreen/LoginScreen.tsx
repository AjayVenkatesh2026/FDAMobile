import {
  StyleSheet,
  View,
  ToastAndroid,
  Image,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

import {StackActions, useNavigation} from '@react-navigation/native';

import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';
import containers from 'src/styles/containers';
import LoginContent from './LoginContent';
import {ActivityIndicator} from 'react-native-paper';
import OTPContent from './OTPContent';
import StrikedText from 'src/components/atoms/StrikedText';
import copies from 'src/constants/copies';
import font from 'src/styles/font';
import useLogin from 'src/services/hooks/useLogin';

import logoOutlined from 'src/assets/logo-white-bg.png';
import googleLogo from 'src/assets/sigin/google-logo.png';
import appleLogo from 'src/assets/sigin/apple-logo.png';
import facebookLogo from 'src/assets/sigin/facebook-logo.png';

const {
  SIGN_IN,
  OR,
  BY_CONTINUING_YOU_AGREE_TO_OUT,
  TERMS_AND_SERVICES,
  PRIVACY_POLICY,
  CONTENT_POLICIES,
  SIGN_IN_WITH_EMAIL,
  SIGN_UP,
} = copies;

const LoginScreen = () => {
  const [number, setNumber] = useState<string>('');
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const theme = useAppSelector(state => state.themeReducer.theme);
  const navigation = useNavigation();

  const onCompleted = () => {
    navigation.dispatch(StackActions.replace('BottomTab'));
  };

  const {loginUser, loading} = useLogin({onCompleted});

  const onNumberChange = (value: string) => {
    const newValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    setNumber(newValue);
  };

  const onPressContinue = () => {
    if (number && number.length === 10) {
      setShowOTP(true);
    } else {
      ToastAndroid.show('Please enter a valid mobile number!', 500);
    }
  };

  // TODO: on press for all the buttons

  return (
    <View
      style={[
        styles.container,
        getThemedStyles({backgroundColor: theme?.primaryDark}),
      ]}>
      <View
        style={[
          styles.logo,
          getThemedStyles({backgroundColor: theme?.surface}),
        ]}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} color={theme?.primaryDark} />
          </View>
        ) : (
          <ScrollView style={styles.contentContainer}>
            <Image source={logoOutlined} style={styles.image} />
            <StrikedText label={SIGN_IN} showDots />
            {showOTP ? (
              <OTPContent number={number} login={loginUser} />
            ) : (
              <LoginContent
                number={number}
                onNumberChange={onNumberChange}
                onPressContinue={onPressContinue}
              />
            )}
            <StrikedText label={OR} containerStyles={styles.or} />
            <View style={styles.footerContainer}>
              <View style={styles.iconsContainer}>
                <Pressable
                  style={[
                    styles.iconButton,
                    getThemedStyles({borderColor: theme?.borderTertiary}),
                  ]}>
                  <Image source={googleLogo} style={styles.imageIcon} />
                </Pressable>
                <Pressable
                  style={[
                    styles.iconButton,
                    getThemedStyles({borderColor: theme?.borderTertiary}),
                  ]}>
                  <Image source={appleLogo} style={styles.imageIcon} />
                </Pressable>
                <Pressable
                  style={[
                    styles.iconButton,
                    getThemedStyles({borderColor: theme?.borderTertiary}),
                  ]}>
                  <Image source={facebookLogo} style={styles.imageIcon} />
                </Pressable>
              </View>
              <Text
                style={[
                  styles.footerText,
                  getThemedStyles({color: theme?.textMid}),
                ]}>
                {BY_CONTINUING_YOU_AGREE_TO_OUT}
              </Text>
              <View style={containers.rowCenterCenter}>
                <Pressable style={styles.textButton}>
                  <Text
                    style={[
                      styles.underlinedText,
                      getThemedStyles({color: theme?.textLow}),
                    ]}>
                    {TERMS_AND_SERVICES}
                  </Text>
                </Pressable>
                <Pressable style={styles.textButton}>
                  <Text
                    style={[
                      styles.underlinedText,
                      getThemedStyles({color: theme?.textLow}),
                    ]}>
                    {PRIVACY_POLICY}
                  </Text>
                </Pressable>
                <Pressable style={styles.textButton}>
                  <Text
                    style={[
                      styles.underlinedText,
                      getThemedStyles({color: theme?.textLow}),
                    ]}>
                    {CONTENT_POLICIES}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.otherMethodsContainer}>
              <Pressable>
                <Text style={styles.otherMethodText}>{SIGN_IN_WITH_EMAIL}</Text>
              </Pressable>
              <Pressable>
                <Text
                  style={[
                    styles.otherMethodText,
                    styles.signUp,
                    getThemedStyles({color: theme?.primaryDefault}),
                  ]}>
                  {SIGN_UP}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 160,
  },
  loaderContainer: {
    ...containers.rowCenterCenter,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  image: {
    alignSelf: 'center',
    width: 186,
    height: 120,
  },
  or: {
    marginTop: 24,
  },
  footerContainer: {
    ...containers.columnCenterCenter,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  footerText: {
    ...font.semiBold,
    fontSize: 14,
  },
  textButton: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  underlinedText: {
    ...font.medium,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  iconsContainer: {
    ...containers.rowCenterCenter,
    marginBottom: 24,
  },
  imageIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  iconButton: {
    padding: 12,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    marginHorizontal: 8,
  },
  otherMethodsContainer: {
    flex: 1,
    ...containers.columnCenterCenter,
    marginTop: 16,
  },
  otherMethodText: {
    ...font.bold,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  signUp: {
    marginTop: 8,
  },
});
