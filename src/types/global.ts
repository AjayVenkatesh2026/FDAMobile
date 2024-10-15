import type {
  ImageStyle,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
  StyleProp,
  ImageProps,
} from 'react-native';
import {ITheme} from './theme';
import type {JwtPayload} from 'jwt-decode';
import {AppDispatch} from 'src/redux/store';

type Style = ViewStyle | TextStyle | ImageStyle;

type TProfileType = 'Title' | 'Option';

type TProfileOPtionOnClick = (props: {
  navigation?: {navigate: Function; replace: Function};
  dispatch?: AppDispatch;
}) => void;

type TProfileOptionTypeOption = {
  type: 'Option';
  icon: string;
  onClick: TProfileOPtionOnClick;
  trailingIcon?: string;
  iconColor?: keyof ITheme;
};

type TProfileOptionTypeTitle = {
  type: 'Title';
};

type TProfileOption = {id: string; name: string} & (
  | TProfileOptionTypeOption
  | TProfileOptionTypeTitle
);

interface INavigation {
  navigate: Function;
}

type THeaderProps = {
  leadingIcon?: string;
  trailingIcon?: string;
  onPressLeadingIcon?: (event?: GestureResponderEvent) => void;
  onPressTrailingIcon?: (event?: GestureResponderEvent) => void;
  trailingIconStyles?: StyleProp<Style>;
  trailingIconLabel?: string;
  containerStyles?: StyleProp<ViewStyle>;
  showBack?: boolean;
  leadingIconColor?: string;
  showCart?: boolean;
  onPressBack?: () => void;
};

interface FDAImage extends ImageProps {
  url?: string;
}

type TSearchType = 'RESTAURANTS' | 'CATEGORIES' | 'MENU_ITEMS';

interface IJwtPaylod extends JwtPayload {
  id?: string;
  role?: string;
}

export type {
  Style,
  TProfileOption,
  TProfileType,
  INavigation,
  THeaderProps,
  FDAImage,
  TSearchType,
  IJwtPaylod,
};
