import React, {Component} from "react"
import {ActivityIndicator} from "react-native"
import glamorous, {Text} from "glamorous-native"
import {List, ListItem} from "react-native-elements"

import CenteredView from "../components/CenteredView"
import {getDevices} from "../ble"

const Spinner = glamorous(ActivityIndicator)({
  marginBottom: 10,
})

export default class AddDeviceScreen extends Component {
  state = {}

  static navigationOptions = {
    title: "Add a device",
  }

  handleBleDevice(data) {
    this.setState({[data.id]: data})
  }

  async componentDidMount() {
    const devices = await getDevices()
    console.log(devices)
    this.setState(devices)
  }

  chooseWifi(device) {
    this.props.navigation.navigate("ChooseWifi", {deviceId: device.id})
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
      <List containerStyle={{marginTop: 0}}>
        {devices.map(d =>
          <ListItem
            title={d.advertising.kCBAdvDataLocalName}
            key={d.id}
            subtitle={d.id}
            onPress={() => this.chooseWifi(d)}
          />,
        )}
      </List>
    )
  }
}
