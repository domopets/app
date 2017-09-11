import React, {Component} from "react"
import glamorous, {Text} from "glamorous-native"
import {Icon} from "react-native-elements"

const CenteredView = glamorous.view({
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
})

const AddButton = () =>
  <Icon name="ios-add" type="ionicon" color="white" size={30} />

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Domopets",
    headerStyle: {
      backgroundColor: "#81d580",
      paddingHorizontal: 10,
    },
    headerTintColor: "white",
    headerRight: <AddButton />,
  })

  render() {
    return (
      <CenteredView>
        <Text>😢 You don't have any devices yet...</Text>
      </CenteredView>
    )
  }
}
