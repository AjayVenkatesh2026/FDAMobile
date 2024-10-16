import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {ApolloProvider} from '@apollo/client';

import RootStack from './src/navigator/RootStack';
import store from './src/redux/store';
import client from 'src/services';

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <Provider store={store}>
          <SafeAreaView style={styles.mainContainer}>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </SafeAreaView>
        </Provider>
      </PaperProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default App;
