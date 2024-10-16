import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';

import {Menu, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import font from 'src/styles/font';
import {useAppDispatch, useAppSelector} from 'src/hooks/reduxHooks';
import type {TProfileOption} from 'src/types/global';
import type {RootStackParamList} from 'src/types/navigator';

const {width: WINDOW_WIDTH} = Dimensions.get('window');

const ProfileOption = ({option}: {option: TProfileOption}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {name} = option;

  const onClickOption = () => {
    if (option.type === 'Option') {
      option.onClick({navigation, dispatch});
    }
  };

  switch (option.type) {
    case 'Title':
      return (
        <Text
          variant="titleMedium"
          style={[styles.text, {color: theme?.textHigh}]}>
          {name}
        </Text>
      );
    case 'Option':
      return (
        <View style={styles.container}>
          <Menu.Item
            title={name}
            leadingIcon={option.icon}
            trailingIcon={option.trailingIcon}
            contentStyle={styles.contentStyle}
            style={styles.item}
            onPress={onClickOption}
            titleStyle={[font.regular, {color: theme?.textHigh}]}
          />
        </View>
      );
  }
};

export default ProfileOption;

const styles = StyleSheet.create({
  container: {
    maxWidth: WINDOW_WIDTH,
    width: '100%',
  },
  item: {
    maxWidth: WINDOW_WIDTH,
  },
  contentStyle: {
    flex: 1,
    maxWidth: WINDOW_WIDTH,
  },
  text: {
    ...font.bold,
    paddingHorizontal: 16,
    width: '100%',
    textAlign: 'left',
    marginTop: 16,
  },
});
