import Expo from 'expo'
import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { withNavigation } from '@expo/ex-navigation'
import { Ionicons } from '@expo/vector-icons'

import Router from '../navigation/Router'

const AddButton = withNavigation(({navigator}) => (
  <TouchableOpacity
    style={styles.buttonContainer}
    onPress={() => navigator.push(Router.getRoute('addDevice'))}
  >
    <Ionicons
      name="ios-add"
      size={40}
      color="white"
      style={styles.addButton}
    />
  </TouchableOpacity>
))

export default class HomeScreen extends Component {
  static route = {
    navigationBar: {
      title: 'DomoPets',
      backgroundColor: '#81d580',
      tintColor: '#fff',
      renderRight: () => <AddButton/>,
    }
  }

  render() {
    return (
      <View style={styles.text}>
        <Text>😢 You don't have any devices yet...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    marginRight: 14,
  }
})
