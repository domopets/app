import React, {Component} from "react"
import glamorous, {Text} from "glamorous-native"
import {Icon} from "react-native-elements"
import CenteredView from "../components/CenteredView"
import {List, ListItem} from "react-native-elements"
import Zeroconf from "react-native-zeroconf"

const zeroconf = new Zeroconf()

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
    devices: [],
  }

  serviceFound(service) {
    const {devices} = this.state
    switch (service.name) {
      case "DOMOPETS_FoodDispenser": {
        let url = `${service.addresses[0]}:${service.port}`
        this.setState({
          devices: [
            ...devices,
            {
              name: "Food Dispenser",
              icon: {
                type: "material-community",
                name: "silverware-variant",
              },
              component: "FoodDispenser",
              url,
            },
          ],
        })
        break
      }
      case "DOMOPETS_WaterDispenser": {
        let url = `${service.addresses[0]}:${service.port}`
        this.setState({
          devices: [
            ...devices,
            {
              name: "Water Dispenser",
              icon: {
                type: "simple-line-icon",
                name: "drop",
              },
              component: "WaterDispenser",
              url,
            },
          ],
        })
        break
      }
    }
  }

  componentWillMount() {
    zeroconf.scan()
    zeroconf.on("resolved", this.serviceFound.bind(this))
  }

  componentWillUnmoun() {
    zeroconf.stop()
  }

  render() {
    if (this.state.devices.length === 0) {
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
            onPress={() => navigate(d.component, {url: d.url})}
          />,
        )}
      </List>
    )
  }
}
