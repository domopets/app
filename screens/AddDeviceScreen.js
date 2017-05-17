import Expo from 'expo'
import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  NativeAppEventEmitter,
} from 'react-native'
import BleManager from 'react-native-ble-manager'
import {List, ListItem} from 'react-native-elements'

function keys() {
  Object.keys(this)
}

export default class AddDeviceScreen extends Component {
  state = {}

  static route = {
    navigationBar: {
      title: 'Add a device'
    }
  }

  handleBleDevice(data) {
    this.setState({[data.id]: data})
  }

  async componentDidMount() {
    this.subscription = NativeAppEventEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      ::this.handleBleDevice
    )
    await BleManager.start()
    await BleManager.scan(['aa00'], 5, true)
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  render() {
    const devices = Object.values(this.state)
    if (devices.length === 0) {
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

    return (
      <List
        containerStyle={styles.listStyle}
      >
        {
        devices.map((d) => 
          <ListItem
            title={d.name}
            key={d.id}
            subtitle={d.id}
          />
        )
        }
      </List>
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
  },
  listStyle: {
    marginTop: 0,
  }
})
