import React, {Component} from "react"
import glamorous, {Text} from "glamorous-native"
import {Icon} from "react-native-elements"
import CenteredView from "../components/CenteredView"
import {List, ListItem} from "react-native-elements"

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

  state = {
    devices: [
      {
        name: "Water Dispenser",
        icon: {
          type: "simple-line-icon",
          name: "drop",
        },
        component: "WaterDispenser",
      },
    ],
  }

  render() {
    if (this.state.devices === 0) {
      return (
        <CenteredView>
          <Text>😢 You don't have any devices yet...</Text>
        </CenteredView>
      )
    }

    const {navigate} = this.props.navigation

    return (
      <List>
        {this.state.devices.map(d =>
          <ListItem
            key={d.name}
            title={d.name}
            leftIcon={d.icon}
            onPress={() => navigate(d.component)}
          />,
        )}
      </List>
    )
  }
}
