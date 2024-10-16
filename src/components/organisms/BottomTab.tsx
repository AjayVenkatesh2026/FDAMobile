import React, {useLayoutEffect} from 'react';

import {
  type BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import type {BottomTabParamList} from 'src/types/navigator';
import {tabs} from 'src/constants/bottomTab';
import screenNames from 'src/constants/screenNames';
import BottomTabBar from '../molecules/BottomTab/BottomTabBar';
import useGetAppInit from 'src/hooks/useGetAppInit';

const {bottomTabScreenNames} = screenNames;

const Tab = createBottomTabNavigator<BottomTabParamList>();

const renderTabBar = ({
  navigation,
  state,
  descriptors,
  insets,
}: BottomTabBarProps) => {
  return (
    <BottomTabBar
      navigation={navigation}
      state={state}
      descriptors={descriptors}
      insets={insets}
    />
  );
};

export default function BottomTab() {
  const {getInitData} = useGetAppInit();

  useLayoutEffect(() => {
    getInitData();
  }, [getInitData]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={bottomTabScreenNames.HomeScreen}
      tabBar={renderTabBar}>
      {tabs.map(({name, component, options}) => {
        return (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        );
      })}
    </Tab.Navigator>
  );
}
