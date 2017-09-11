import React, {Component} from "react"
import {
  ActivityIndicator,
  NativeEventEmitter,
  NativeModules,
} from "react-native"
import glamorous, {Text} from "glamorous-native"
import BleManager from "react-native-ble-manager"
import {List, ListItem} from "react-native-elements"

import CenteredView from "../components/CenteredView"

const Spinner = glamorous(ActivityIndicator)({
  marginBottom: 10,
})

const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

export default class AddDeviceScreen extends Component {
  state = {}

  static navigationOptions = {
    title: "Add a device",
  }

  handleBleDevice(data) {
    this.setState({[data.id]: data})
  }

  async componentDidMount() {
    this.subscription = bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      this.handleBleDevice.bind(this),
    )
    await BleManager.start()
    console.log("here")
    await BleManager.scan(["aa00"], 5, true)
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  render() {
    const devices = Object.values(this.state)
    if (devices.length === 0) {
      return (
        <CenteredView>
          <Spinner size="large" />
          <Text>Scanning for devices...</Text>
        </CenteredView>
      )
    }

    return (
      <List>
        {devices.map(d =>
          <ListItem
            title={d.name}
            key={d.id}
            subtitle={d.id}
            onPress={() => this.chooseWifi(d)}
          />,
        )}
      </List>
    )
  }
}
