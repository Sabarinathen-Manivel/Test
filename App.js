/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import AppNavigator from './src/Navigator/navigation';
const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'#163357'} />
      <AppNavigator />
    </>


  );
};

export default App;
