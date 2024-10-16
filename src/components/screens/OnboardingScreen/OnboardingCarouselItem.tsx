import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';

import {Text} from 'react-native-paper';

import background from 'src/assets/onboarding/background.png';
import containers from 'src/styles/containers';
import font from 'src/styles/font';
import {getThemedStyles} from 'src/utils/theme';
import {useAppSelector} from 'src/hooks/reduxHooks';
import type {IOnboardingCarouselItemProps} from 'src/types/screens/onboarding';

const {width: WINDOW_WIDTH} = Dimensions.get('window');
const backgroundWidth = WINDOW_WIDTH - 28 * 2;
const imageWidth = backgroundWidth - 8 * 2;

const OnboardingCarouselItem: React.FC<IOnboardingCarouselItemProps> = ({
  item,
}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {image, description, tag, title} = item;

  return (
    <View style={[containers.columnCenterCenter]}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <Image source={image} style={styles.image} />
      </ImageBackground>
      <Text
        variant="headlineSmall"
        style={[
          font.semiBold,
          getThemedStyles({color: theme?.primaryDefault}),
        ]}>
        {tag}
      </Text>
      <Text
        variant="headlineMedium"
        style={[font.bold, getThemedStyles({color: theme?.textHigh})]}>
        {title}
      </Text>
      <Text
        variant="bodyLarge"
        style={[styles.description, getThemedStyles({color: theme?.textMid})]}>
        {description}
      </Text>
    </View>
  );
};

export default OnboardingCarouselItem;

const styles = StyleSheet.create({
  backgroundImage: {
    ...containers.rowEndCenter,
    width: backgroundWidth,
    aspectRatio: 0.862,
    marginBottom: 16,
  },
  image: {
    width: imageWidth,
  },
  description: {
    ...font.regular,
    marginTop: 28,
    textAlign: 'center',
  },
});
