import React, {Component} from "react"
import glamorous, {View} from "glamorous-native"
import {Button} from "react-native-elements"
import io from "socket.io-client"
import {connect} from "react-redux"
import socket from "../socket"

const MainView = glamorous.view({
  flex: 1,
  justifyContent: "space-around",
})
const WeightText = glamorous.text({
  fontSize: 60,
  textAlign: "center",
})

class Litter extends Component {
  static navigationOptions = {
    title: "Litter",
  }

  get id() {
    return this.props.navigation.state.params.id
  }

  get weight() {
    const weight = this.props.modules[this.id].weight
    return weight < 0 ? 0 : weight
  }

  tare() {
    socket.emit("dispatch", {
      action: "tare",
      id: this.id,
    })
  }

  render() {
    return (
      <MainView>
        <WeightText>
          {this.weight} g
        </WeightText>
        <View>
          <Button title="Tare" borderRadius={50} onPress={() => this.tare()} />
        </View>
      </MainView>
    )
  }
}

export default connect(state => ({modules: state}))(Litter)
