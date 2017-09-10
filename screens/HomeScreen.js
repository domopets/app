import React, {Component} from "react"
import glamorous, {Text} from "glamorous-native"

const CenteredView = glamorous.view({
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
})

export default class HomeScreen extends Component {
  render() {
    return (
      <CenteredView>
        <Text>😢 You don't have any devices yet...</Text>
      </CenteredView>
    )
  }
}
