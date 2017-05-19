import Expo from 'expo'
import React, {Component} from 'react'
import {
  StyleSheet,
  ScrollView,
} from 'react-native'
import BleManager from 'react-native-ble-manager'
import {List, ListItem} from 'react-native-elements'
import base64 from 'base64-js'

export default class ChooseWifiScreen extends Component {
  state = {}

  static route = {
    navigationBar: {
      title: 'Select the Wifi',
    }
  }

  async getCount() {
    const data = await BleManager.read(this.props.deviceId, 'AA00', 'AA04')
    return parseInt(data, 16)
  }

  async getIndex() {
    const data = await BleManager.read(this.props.deviceId, 'AA00', 'AA01')
    return parseInt(data, 16)
  }

  async setIndex(index) {
    const data = base64.fromByteArray([index])
    await BleManager.write(this.props.deviceId, 'AA00', 'AA01', data)
  }

  async getSsid() {
    const data = await BleManager.read(this.props.deviceId, 'AA00', 'AA02')
    const bytes = data.match(/.{1,2}/g).map(s => parseInt(s, 16))
    return String.fromCharCode(...bytes)
  }

  async componentDidMount() {
    await BleManager.connect(this.props.deviceId)
    const count = await this.getCount()
    for (const i = 0; i < count; i++) {
      await this.setIndex(i)
      const ssid = await this.getSsid()
      this.setState({[i]: {ssid}})
    }
  }

  async componentWillUnmount() {
    await BleManager.disconnect(this.props.deviceId)
  }

  render() {
    const wifis = Object.values(this.state)
    return (
      <ScrollView>
        <List
          containerStyle={styles.listStyle}
        >
          {
            wifis.map((w, i) =>
              <ListItem
                title={w.ssid}
                key={i}
              />
            )
          }
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  listStyle: {
    marginTop: 0,
  }
})
