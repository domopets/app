import React, {Component} from "react"
import {View, StyleSheet, Alert} from "react-native"
import {Text, FormLabel, FormInput, Button} from "react-native-elements"
import btoa from "btoa"
import {setSsid, setPassword} from "../ble"
import {NavigationActions} from "react-navigation"

export default class ConnectWifiScreen extends Component {
  state = {
    password: "",
    loading: false,
  }

  static navigationOptions = {
    title: "Connect to Wifi",
  }

  async connect() {
    const ssid = btoa(this.ssid)
    const password = btoa(this.state.password)

    await setSsid(ssid)

    try {
      await setPassword(password)
    } catch (e) {
      Alert.alert("Error", "Invalid Password")
      return this.setState({loading: false})
    }

    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: "Home"})],
      }),
    )
  }

  get ssid() {
    return this.props.navigation.state.params.ssid
  }

  render() {
    return (
      <View style={styles.view}>
        <FormLabel>Ssid</FormLabel>
        <Text style={styles.text}>
          {this.ssid}
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
  },
})
