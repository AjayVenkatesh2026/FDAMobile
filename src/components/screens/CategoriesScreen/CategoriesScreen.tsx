import {StyleSheet, View} from 'react-native';
import React, {useMemo, useState} from 'react';

import {Button} from 'react-native-paper';

import HomeScreenHeader from '../HomeScreen/HomeScreenHeader';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';
import ListContent from './ListContent';
import containers from 'src/styles/containers';
import MapContent from './MapContent';
import copies from 'src/constants/copies';

const {LIST, MAP} = copies;

const CategoriesScreen = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const [showMap, setShowMap] = useState<boolean>(false);

  const onPressList = () => {
    setShowMap(false);
  };

  const onPressMap = () => {
    setShowMap(true);
  };

  const map = useMemo(() => <MapContent />, []);
  const list = useMemo(() => <ListContent />, []);

  return (
    <View
      style={[
        styles.container,
        getThemedStyles({backgroundColor: theme?.surface}),
      ]}>
      <HomeScreenHeader />
      <View style={styles.buttonsContainer}>
        <Button
          mode="outlined"
          onPress={onPressList}
          style={[styles.button, {borderColor: theme?.primaryDefault}]}
          buttonColor={showMap ? theme?.surface : theme?.primaryDefault}
          textColor={showMap ? theme?.primaryDefault : theme?.bgTextHigh}>
          {LIST}
        </Button>
        <View style={styles.separator} />
        <Button
          mode="outlined"
          onPress={onPressMap}
          textColor={showMap ? theme?.surface : theme?.primaryDefault}
          buttonColor={showMap ? theme?.primaryDefault : theme?.surface}
          style={[styles.button, {borderColor: theme?.primaryDefault}]}>
          {MAP}
        </Button>
      </View>
      {showMap ? <>{map}</> : <>{list}</>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    ...containers.rowCenterStart,
    paddingHorizontal: 16,
  },
  separator: {
    marginHorizontal: 4,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
});

export default CategoriesScreen;
