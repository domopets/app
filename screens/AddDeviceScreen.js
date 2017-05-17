import Expo from 'expo'
import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class AddDeviceScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Add a device'
    }
  }

  render() {
    return (
    <View>
      <Text>Scanning for devices...</Text>
    </View>
    )
  }
}
