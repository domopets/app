import React, {Component} from "react"
import glamorous, {View} from "glamorous-native"
import {Button} from "react-native-elements"
import io from "socket.io-client"

const MainView = glamorous.view({
  flex: 1,
  justifyContent: "space-around",
})
const WeightText = glamorous.text({
  fontSize: 60,
  textAlign: "center",
})

export default class WaterDispenser extends Component {
  state = {
    g: 0,
  }

  static navigationOptions = {
    title: "Food Dispenser",
  }

  get url() {
    return this.props.navigation.state.params.url
  }

  tare() {
    this.socket.emit("tare")
  }

  dispenseFood() {
    this.socket.emit("dispenseFood")
  }

  componentWillMount() {
    this.socket = io(this.url)
    this.socket.on("measure", d => {
      console.log("measure")
      console.log(d)
      const value = parseInt(d)
      if (value < 0) {
        this.setState({g: 0})
      } else {
        this.setState({g: value})
      }
    })
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  render() {
    return (
      <MainView>
        <WeightText>
          {this.state.g} g
        </WeightText>
        <View>
          <Button
            title="Dispense Food"
            backgroundColor="#325f96"
            borderRadius={50}
            buttonStyle={{marginBottom: 30}}
            onPress={() => this.dispenseFood()}
          />
          <Button title="Tare" borderRadius={50} onPress={() => this.tare()} />
        </View>
      </MainView>
    )
  }
}
