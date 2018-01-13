import React, {Component} from "react"
import glamorous, {View} from "glamorous-native"
import {Button} from "react-native-elements"
import {connect} from "react-redux"

const MainView = glamorous.view({
  flex: 1,
  justifyContent: "space-around",
})
const WeightText = glamorous.text({
  fontSize: 60,
  textAlign: "center",
})

class FoodDispenser extends Component {
  static navigationOptions = {
    title: "Food Dispenser",
  }

  get id() {
    return this.props.navigation.state.params.id
  }

  get weight() {
    const weight = this.props.modules[this.id].weight
    return weight < 0 ? 0 : weight
  }

  tare() {
    this.socket.emit("tare")
  }

  dispenseFood() {
    this.socket.emit("dispenseFood")
  }

  render() {
    console.log(this.props)
    return (
      <MainView>
        <WeightText>
          {this.weight} g
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
export default connect(state => ({modules: state}))(FoodDispenser)
