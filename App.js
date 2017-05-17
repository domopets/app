import Expo from 'expo'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Router from './navigation/Router'

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation'

export default class App extends React.Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')}/>
      </NavigationProvider>
    )
  }
}
