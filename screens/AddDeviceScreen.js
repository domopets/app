import Expo from 'expo'
import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'

export default class AddDeviceScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Add a device'
    }
  }

  render() {
    return (
    <View style={styles.view}>
      <ActivityIndicator
        style={styles.spinner}
        size='large'
      />
      <Text>Scanning for devices...</Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  spinner: {
    marginBottom: 10,
  }
})
