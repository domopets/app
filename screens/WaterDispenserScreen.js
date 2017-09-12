import React, {Component} from "react"
import glamorous from "glamorous-native"
import {Button} from "react-native-elements"

const MainView = glamorous.view({
  flex: 1,
  justifyContent: "space-around",
})
const WeightText = glamorous.text({
  fontSize: 60,
  textAlign: "center",
})

export default class WaterDispenser extends Component {
  static navigationOptions = {
    title: "Distribution Eau",
  }

  render() {
    return (
      <MainView>
        <WeightText>
          {128 / 10} cL
        </WeightText>
        <Button
          title="Dispense Water"
          backgroundColor="#325f96"
          borderRadius={50}
        />
      </MainView>
    )
  }
}
