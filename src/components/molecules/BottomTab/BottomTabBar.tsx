import React from 'react';
import {StyleSheet} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {type BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {BottomTabOption} from 'src/types/navigator';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';

const renderTabIcon = ({
  color,
  size,
  icon,
}: {
  color: string;
  size: number;
  icon: string;
}) => {
  return <Icon name={icon} size={size} color={color} />;
};
// TODO: try and resolve Warning: A props object containing a "key" prop is being spread into JSX:
const BottomTabBar = ({
  navigation,
  state,
  descriptors,
  insets,
}: BottomTabBarProps) => {
  const theme = useAppSelector(s => s.themeReducer.theme);

  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      activeColor={theme?.primaryDefault}
      style={[
        styles.bottomTabContainer,
        getThemedStyles({
          backgroundColor: theme?.surface,
          borderColor: theme?.borderPrimary,
        }),
      ]}
      activeIndicatorStyle={getThemedStyles({
        backgroundColor: theme?.surface,
      })}
      onTabPress={({route, preventDefault}) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({route, color}) => {
        const {options} = descriptors[route.key];
        if ((options as BottomTabOption).icon) {
          return renderTabIcon({
            icon: (options as BottomTabOption).icon,
            color,
            size: 24,
          });
        }

        return null;
      }}
      getLabelText={({route}) => {
        const {options} = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route?.name || '';

        return label;
      }}
    />
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    borderTopWidth: 1,
  },
});

export default BottomTabBar;
