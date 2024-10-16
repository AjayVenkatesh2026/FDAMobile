import {View} from 'react-native';
import React, {PropsWithChildren} from 'react';

import {useNavigation} from '@react-navigation/native';
import {Appbar, Text} from 'react-native-paper';

import containers from 'src/styles/containers';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';
import type {THeaderProps} from 'src/types/global';
import CartButton from './CartButton';

const Header = ({
  leadingIcon,
  trailingIcon,
  onPressLeadingIcon,
  onPressTrailingIcon,
  trailingIconStyles = {},
  trailingIconLabel = '',
  children,
  containerStyles = {},
  showBack = false,
  showCart = false,
  leadingIconColor,
  onPressBack,
}: PropsWithChildren<THeaderProps>) => {
  const navigation = useNavigation();
  const theme = useAppSelector(state => state.themeReducer.theme);

  const onPressBackIcon = () => {
    if (onPressBack) {
      onPressBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Appbar.Header style={[containerStyles]}>
      {showBack ? (
        <Appbar.BackAction onPress={onPressBackIcon} color={leadingIconColor} />
      ) : null}
      {leadingIcon ? (
        <Appbar.Action
          icon={leadingIcon}
          color={leadingIconColor || theme?.bgTextHigh}
          onPress={onPressLeadingIcon}
        />
      ) : null}
      {children}
      <View style={containers.columnCenterCenter}>
        {trailingIcon ? (
          <>
            <Appbar.Action
              icon={trailingIcon}
              onPress={onPressTrailingIcon}
              color={theme?.textHigh}
              style={trailingIconStyles}
              size={20}
            />
            {trailingIconLabel ? (
              <Text
                variant="bodySmall"
                style={getThemedStyles({color: theme?.bgTextHigh})}>
                {trailingIconLabel}
              </Text>
            ) : null}
          </>
        ) : null}
      </View>
      {showCart ? <CartButton /> : null}
    </Appbar.Header>
  );
};

export default Header;
