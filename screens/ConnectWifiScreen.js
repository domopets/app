import Expo from 'expo'
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native'
import {
  Text,
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements'
import BleManager from 'react-native-ble-manager'
import btoa from 'btoa'

export default class ConnectWifiScreen extends Component {
  state = {
    password: '',
    loading: false
  }

  static route = {
    navigationBar: {
      title: 'Connect to Wifi...',
    }
  }

  async connect() {
    const ssid = btoa(this.props.ssid)
    const password = btoa(this.state.password)

    await BleManager.write(this.props.deviceId, 'BB00', 'BB01', ssid, 512)

    try {
      await BleManager.write(this.props.deviceId, 'BB00', 'BB02', password, 512)
    } catch (e) {
      Alert.alert('Error', 'Invalid Password')
      return this.setState({loading: false})
    }

    this.props.navigator.popToTop()
  }

  render() {
    return (
      <View style={styles.view}>
        <FormLabel>Ssid</FormLabel>
        <Text style={styles.text}>
          {this.props.ssid}
        </Text>
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
        />
        <Button
          title="Connect"
          style={{marginTop: 20}}
          backgroundColor="#3f95be"
          onPress={() => this.connect()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 20,
  },
  text: {
    marginHorizontal: 20,
  }
})
