import React, {Component} from "react"
import glamorous, {Text} from "glamorous-native"
import {Icon} from "react-native-elements"
import CenteredView from "../components/CenteredView"

const AddButton = props =>
  <Icon name="ios-add" type="ionicon" color="white" size={30} {...props} />

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Domopets",
    headerBackTitle: "Back",
    headerStyle: {
      backgroundColor: "#81d580",
      paddingHorizontal: 10,
    },
    headerTintColor: "white",
    headerRight: <AddButton onPress={() => navigation.navigate("AddDevice")} />,
  })

  render() {
    return (
      <CenteredView>
        <Text>😢 You don't have any devices yet...</Text>
      </CenteredView>
    )
  }
}
