import {Pressable, StyleSheet} from 'react-native';
import React from 'react';

import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import font from 'src/styles/font';
import FDAImage from 'src/components/atoms/FDAImage';
import type {ICategoryItemProps} from 'src/types/molecules';
import type {RootStackParamList} from 'src/types/navigator';

const CategoryItem: React.FC<ICategoryItemProps> = ({category}) => {
  const {name, image_url} = category;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = () => {
    navigation.navigate('ProductStack', {
      screen: 'MenuItemsByCategoryScreen',
      params: {
        category,
      },
    });
  };

  return (
    <Pressable onPress={onPress}>
      <FDAImage url={image_url} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  text: {
    ...font.bold,
    fontSize: 6,
    textAlign: 'center',
  },
});
