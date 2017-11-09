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
    cl: 0,
  }

  static navigationOptions = {
    title: "Distribution Eau",
  }

  get url() {
    return this.props.navigation.state.params.url
  }

  componentWillMount() {
    console.log(this.url)
    this.socket = io(this.url)
    this.socket.on("measure", d => {
      console.log(d)
      const value = parseInt(d)
      if (value < 0) {
        this.setState({cl: 0})
      } else {
        this.setState({cl: value / 10})
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
          {this.state.cl} cL
        </WeightText>
        <View>
          <Button
            title="Dispense Water"
            backgroundColor="#325f96"
            borderRadius={50}
            buttonStyle={{marginBottom: 30}}
          />
          <Button
            title="Tare"
            borderRadius={50}
            onPress={() => this.socket.emit("tare")}
          />
        </View>
      </MainView>
    )
  }
}
