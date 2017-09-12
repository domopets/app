import React, {Component} from "react"
import {StyleSheet, ScrollView} from "react-native"
import {List, ListItem} from "react-native-elements"
import {
  connectDevice,
  disconnectDevice,
  getCount,
  getIndex,
  setIndex,
  getSsid,
} from "../ble"

export default class ChooseWifiScreen extends Component {
  state = {}

  static navigationOptions = {
    title: "Select the Wifi",
  }

  async componentWillMount() {
    await connectDevice(this.props.navigation.state.params.deviceId)
    const count = await getCount()
    for (const i = 0; i < count; i++) {
      await setIndex(i)
      const ssid = await getSsid()
      this.setState({[i]: {ssid}})
    }
  }

  async componentWillUnmount() {
    await disconnectDevice()
  }

  connectWifi(ssid) {
    this.props.navigation.navigate("ConnectWifi", {ssid})
  }

  render() {
    const wifis = Object.values(this.state)
    console.log(wifis)
    return (
      <ScrollView>
        <List containerStyle={styles.listStyle}>
          {wifis.map((w, i) =>
            <ListItem
              title={w.ssid}
              key={i}
              onPress={() => this.connectWifi(w.ssid)}
            />,
          )}
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  listStyle: {
    marginTop: 0,
  },
})
