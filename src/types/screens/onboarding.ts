import {ImageSourcePropType} from 'react-native';

interface IOnboardingCarouselItem {
  title: string;
  tag: string;
  description: string;
  image: ImageSourcePropType;
}

interface IOnboardingCarouselItemProps {
  item: IOnboardingCarouselItem;
}

export type {IOnboardingCarouselItem, IOnboardingCarouselItemProps};
